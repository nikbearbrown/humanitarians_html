import { assertDatabaseEnvironment } from '../../lib/db'
import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { readFile, readdir } from 'node:fs/promises'
import { before, after, test } from 'node:test'
import { PGlite } from '@electric-sql/pglite'
import { neonConfig } from '@neondatabase/serverless'
import { NextRequest } from 'next/server'
import { hashPassword } from '../../lib/fellow-auth'
import { generateSessionToken } from '../../lib/admin-auth'
import { dashboardAccess } from '../../lib/dashboard-auth'
import { issueDeveloperSession, resolveDeveloper, revokeDeveloperSession, developerMay, sameOriginMutation, tokenDigest, type Query } from '../../lib/developer-access-core'
import { POST as login } from '../../app/api/fellows/auth/login/route'
import { POST as logout } from '../../app/api/fellows/auth/logout/route'
import { GET as roster } from '../../app/api/admin/fellows/list/route'
import { PATCH as editMember, DELETE as deleteMember } from '../../app/api/admin/fellows/[id]/route'
import { PATCH as resetMember } from '../../app/api/admin/fellows/[id]/reset-password/route'
import { POST as createMember } from '../../app/api/admin/fellows/route'
import { POST as bulkMembers } from '../../app/api/admin/fellows/bulk/route'
import { POST as createProject } from '../../app/api/admin/projects/route'
import { GET as ledgerProjects } from '../../app/api/ledger/projects/route'
import { PUT as ledgerWrite } from '../../app/api/ledger/projects/[id]/route'
import { saveLedgerProject } from '../../lib/ledger'
import { POST as filters } from '../../app/api/admin/filters/route'

const db = new PGlite(), origin = 'https://synthetic.example.org'
const developer = randomUUID(), member = randomUUID(), project = randomUUID()
let passwordHash = '', cookie = '', grant = ''
const query: Query = async (parts, ...params) => {
  const q = parts.reduce((a, s, i) => a + (i ? '$' + i : '') + s, '')
  return (await db.query(q, params)).rows
}
process.env.DATABASE_URL = 'postgresql://synthetic:synthetic@developer.invalid/synthetic'
process.env.FELLOW_SESSION_SECRET = randomUUID() + randomUUID()
process.env.ADMIN_PASSWORD = randomUUID()
process.env.DEVELOPER_ACCESS_ENABLED = 'true'
neonConfig.fetchEndpoint = 'https://developer.invalid/sql'
neonConfig.fetchFunction = async (url: string | URL | Request, init?: RequestInit) => {
  assert.equal(new URL(String(url)).hostname, 'developer.invalid')
  const { query, params } = JSON.parse(String(init?.body))
  try {
    const result = await db.query(query, params)
    return new Response(JSON.stringify({ fields: result.fields, rows: result.rows.map((row: any) => result.fields.map(field => {
      const value = row[field.name]
      if (value === null || value === undefined) return null
      if (value instanceof Date) return value.toISOString().replace('T', ' ').replace('Z', '+00')
      if (typeof value === 'boolean') return value ? 't' : 'f'
      return typeof value === 'object' ? JSON.stringify(value) : String(value)
    })), command: result.command, rowCount: result.rows.length }), { status: 200 })
  } catch (error: any) { return new Response(JSON.stringify({ message: error.message, code: error.code }), { status: 400 }) }
}
function req(path: string, method = 'GET', body?: unknown, options: {cookie?: string, origin?: string, site?: string} = {}) {
 return new NextRequest(origin + path, { method, headers: {
   cookie: options.cookie ?? cookie, origin: options.origin ?? origin,
   'content-type': 'application/json', 'sec-fetch-site': options.site ?? 'same-origin',
 }, ...(body !== undefined ? {body: JSON.stringify(body)} : {}) })
}
function params(id = member) { return {params: Promise.resolve({id})} }
async function snapshot() { return {
 fellows: (await db.query('SELECT * FROM fellows ORDER BY id')).rows,
 projects: (await db.query('SELECT * FROM fellow_projects ORDER BY id')).rows,
} }
async function grantRole(id: string) {
 return (await db.query<{id:string}>("INSERT INTO developer_grants(fellow_id,granted_by,reason,expires_at) VALUES($1,'synthetic owner','test',now()+interval '7 days') RETURNING id",[id])).rows[0].id
}
before(async () => {
 await db.exec(await readFile('sql/001_fellows_projects.sql','utf8'))
 await db.exec(await readFile('sql/003_project_ledger.sql','utf8'))
 await db.exec(await readFile('sql/006_developer_access.sql','utf8'))
 passwordHash = await hashPassword('synthetic-test-only-password')
 for (const id of [developer,member]) await db.query("INSERT INTO fellows(id,name,slug,email,password_hash) VALUES($1::uuid,'Synthetic member',$1::text,$2,$3)",[id,id+'@example.org',passwordHash])
 await db.query("INSERT INTO projects(id,name,slug,elevator_pitch,url) VALUES($1,'Test','test','Test','https://example.org')",[project])
 await db.query("INSERT INTO fellow_projects(fellow_id,project_id,role) VALUES($1,$2,'pm')",[developer,project])
 grant = await grantRole(developer)
})
after(()=>db.close())

test('ordinary member login issues developer session only after password verification and existing grant; preserves simultaneous PM role',async()=>{
 const before=await snapshot()
 const bad=await login(req('/api/fellows/auth/login','POST',{email:developer+'@example.org',password:'wrong'}))
 assert.equal(bad.status,401);assert.equal(bad.cookies.get('developer_session'),undefined)
 const good=await login(req('/api/fellows/auth/login','POST',{email:developer+'@example.org',password:'synthetic-test-only-password',role:'owner'}))
 assert.equal(good.status,200)
 const token=good.cookies.get('developer_session')!
 assert.match(token.value,/^[a-f0-9]{64}$/);assert.equal(token.httpOnly,true);assert.equal(token.sameSite,'strict')
 cookie='developer_session='+token.value
 assert.ok(good.cookies.get('fellow_session'))
 assert.equal((await resolveDeveloper(token.value,query))?.fellow_id,developer)
 assert.deepEqual(await snapshot(),before)
 const plain=await login(req('/api/fellows/auth/login','POST',{email:member+'@example.org',password:'synthetic-test-only-password',role:'developer'},{cookie:''}))
 assert.equal(plain.status,200);assert.equal(plain.cookies.get('developer_session')?.value,'')
})
test('developer can read roster and create a project through actual handlers without owner cookie',async()=>{
 assert.equal((await roster(req('/api/admin/fellows/list'))).status,200)
 const result=await createProject(req('/api/admin/projects','POST',{name:'Developer project',slug:'developer-project',elevator_pitch:'Synthetic',url:'https://example.org'}))
 assert.equal(result.status,201)
 assert.equal((await db.query<{n:number}>("SELECT count(*)::int n FROM projects WHERE slug='developer-project'")).rows[0].n,1)
 const audit=(await db.query<{event:string}>('SELECT event FROM developer_access_audit ORDER BY id')).rows
 assert.ok(audit.some(a=>a.event==='authorize:POST'))
})
test('identity edits, delete, reset, new account and bulk upload all deny before touching data even with spoofed actor/role',async()=>{
 const before=await snapshot(), body={name:'Injected',email:'attacker@example.org',role:'owner',fellow_id:developer,project_ids:[],password:'ignored'}
 for(const response of [await editMember(req('/api/admin/fellows/'+member,'PATCH',body),params()),await deleteMember(req('/api/admin/fellows/'+member,'DELETE'),params()),await resetMember(req('/api/admin/fellows/'+member+'/reset-password','PATCH',body),params()),await createMember(req('/api/admin/fellows','POST',body)),await bulkMembers(req('/api/admin/fellows/bulk','POST',body))]) assert.equal(response.status,401)
 assert.deepEqual(await snapshot(),before)
})
test('anonymous, fabricated, fellow-only and malformed cookies cannot authorize; CSRF is denied',async()=>{
 for(const c of ['', 'developer_session='+ 'a'.repeat(64),'developer_session=bad','fellow_session=spoofed','role=developer']) assert.equal((await roster(req('/api/admin/fellows/list','GET',undefined,{cookie:c}))).status,401)
 const response=await createProject(req('/api/admin/projects','POST',{name:'CSRF'},{origin:'https://evil.example'}));assert.equal(response.status,401)
 assert.equal((await filters(req('/api/admin/filters','POST',['x'],{cookie:''}))).status,401)
 assert.equal((await login(req('/api/fellows/auth/login','POST',{email:developer+'@example.org',password:'synthetic-test-only-password'},{origin:'https://evil.example'}))).status,403)
 assert.equal(sameOriginMutation(new Request(origin,{method:'POST'})),false)
})
test('feature disabled fails closed for developer but preserves legacy owner access; owner writes also require origin',async()=>{
 process.env.DEVELOPER_ACCESS_ENABLED='false'
 assert.equal(await dashboardAccess(req('/api/admin/fellows/list'),'roster-read'),false)
 const owner='admin_session='+generateSessionToken()
 assert.equal(await dashboardAccess(req('/api/admin/fellows/list','GET',undefined,{cookie:owner}),'roster-read'),true)
 assert.equal(await dashboardAccess(req('/api/admin/fellows','POST',{}, {cookie:owner,origin:'https://evil.example'}),'identity-admin'),false)
 process.env.DEVELOPER_ACCESS_ENABLED='true'
})
test('no cookie contains role or grants; token database stores only digest and logs no secret',async()=>{
 const token=cookie.split('=')[1]
 assert.equal(await tokenDigest('garbage'),null)
 const sessions=JSON.stringify((await db.query('SELECT * FROM developer_sessions')).rows)
 assert.ok(!sessions.includes(token));assert.ok(sessions.includes((await tokenDigest(token))!))
 const audit=JSON.stringify((await db.query('SELECT * FROM developer_access_audit')).rows)
 assert.ok(!audit.includes(token));assert.ok(!audit.includes(passwordHash))
 assert.equal(developerMay('identity-admin','POST'),false)
 for(const cap of ['content','projects'] as const) for(const method of ['GET','POST','PUT','PATCH','DELETE']) assert.equal(developerMay(cap,method),true)
})
test('password/email/status changes invalidate elevated sessions; returning to current cannot revive old cookie',async()=>{
 const token=cookie.split('=')[1]
 await db.query("UPDATE fellows SET status='alumni' WHERE id=$1",[developer])
 assert.equal(await resolveDeveloper(token,query),null)
 await db.query("UPDATE fellows SET status='current' WHERE id=$1",[developer])
 assert.equal(await resolveDeveloper(token,query),null)
 let fresh=await issueDeveloperSession(developer,passwordHash,query);assert.ok(fresh)
 await db.query("UPDATE fellows SET email='synthetic.changed@example.org' WHERE id=$1",[developer])
 assert.equal(await resolveDeveloper(fresh!,query),null)
 fresh=await issueDeveloperSession(developer,passwordHash,query);assert.ok(fresh)
 await db.query("UPDATE fellows SET password_hash='synthetic-changed-hash' WHERE id=$1",[developer])
 assert.equal(await resolveDeveloper(fresh!,query),null)
 assert.equal(await issueDeveloperSession(developer,passwordHash,query),null)
 await db.query('UPDATE fellows SET password_hash=$1 WHERE id=$2',[passwordHash,developer])
})
test('expiration, revoke and regrant never revive old sessions; append-only grant/audit history retained',async()=>{
 let token=(await issueDeveloperSession(developer,passwordHash,query))!
 await db.query("UPDATE developer_sessions SET expires_at=now()-interval '1 second' WHERE token_hash=$1",[await tokenDigest(token)])
 assert.equal(await resolveDeveloper(token,query),null)
 token=(await issueDeveloperSession(developer,passwordHash,query))!
 await db.query("UPDATE developer_grants SET revoked_at=now(),revoked_by='synthetic owner' WHERE id=$1",[grant])
 assert.equal(await resolveDeveloper(token,query),null)
 await assert.rejects(db.query('UPDATE developer_grants SET revoked_at=NULL,revoked_by=NULL WHERE id=$1',[grant]),/immutable/)
 grant=await grantRole(developer)
 assert.equal(await resolveDeveloper(token,query),null)
 await assert.rejects(db.query('DELETE FROM developer_grants WHERE id=$1',[grant]),/do not delete/)
 await assert.rejects(db.query("UPDATE developer_access_audit SET event='forged'"),/append-only/)
 const fresh=(await issueDeveloperSession(developer,passwordHash,query))!
 assert.ok(await resolveDeveloper(fresh,query))
 cookie='developer_session='+fresh
})
test('logout revokes server session, including replayed cookies; duplicate revoke is harmless',async()=>{
 const token=cookie.split('=')[1]
 const response=await logout(req('/api/fellows/auth/logout','POST',{}))
 assert.equal(response.status,200);assert.equal(response.cookies.get('developer_session')?.value,'')
 assert.equal(await resolveDeveloper(token,query),null)
 await revokeDeveloperSession(token,query)
 assert.equal(await dashboardAccess(req('/api/admin/fellows/list'),'roster-read'),false)
})
test('every admin handler except explicit login has server authorization; PM/legacy Ledger authorization remains separate',async()=>{
 async function walk(dir:string):Promise<string[]> { const entries=await readdir(dir,{withFileTypes:true});return (await Promise.all(entries.map(e=>e.isDirectory()?walk(dir+'/'+e.name):Promise.resolve([dir+'/'+e.name])))).flat() }
 for(const path of (await walk('app/api/admin')).filter(f=>f.endsWith('/route.ts')&&!f.endsWith('/login/route.ts'))){
  const source=await readFile(path,'utf8')
  const handlers=source.matchAll(/export async function (GET|POST|PATCH|PUT|DELETE)\([^]*?(?=export async function|$)/g)
  for(const match of handlers) assert.match(match[0],/await dashboardAccess\(req, '(content|projects|roster-read|identity-admin)'\)/,path+' '+match[1])
 }
 const ledger=await readFile('lib/ledger-viewer.ts','utf8')
 assert.match(ledger,/isProjectManager/);assert.match(ledger,/'legacy-ledger-read'/)
})

test('missing migration or database failure denies developer authorization',async()=>{
 const token=(await issueDeveloperSession(developer,passwordHash,query))!
 await db.exec('ALTER TABLE developer_grants RENAME TO developer_grants_unavailable')
 try { assert.equal(await dashboardAccess(req('/api/admin/fellows/list','GET',undefined,{cookie:'developer_session='+token}),'roster-read'),false) }
 finally { await db.exec('ALTER TABLE developer_grants_unavailable RENAME TO developer_grants') }
})

test('developer without PM assignment can read Ledger but cannot edit or forge supervisor approval',async()=>{
 const id=randomUUID()
 await db.query("INSERT INTO fellows(id,name,slug,email,password_hash) VALUES($1::uuid,'Synthetic reader',$1::text,$2,$3)",[id,id+'@example.org',passwordHash])
 await grantRole(id)
 const token=(await issueDeveloperSession(id,passwordHash,query))!
 const readCookie='developer_session='+token
 const read=await ledgerProjects(req('/api/ledger/projects','GET',undefined,{cookie:readCookie}))
 assert.equal(read.status,200)
 const payload=await read.json()
 assert.ok(payload.projects.length>0)
 assert.ok(payload.projects.every((p:any)=>p.canEdit===false))
 const before=await snapshot()
 const write=await ledgerWrite(req('/api/ledger/projects/'+project,'PUT',{admin:true,fellowId:developer,phase:'Done'},{cookie:readCookie}),params(project))
 assert.ok([401,403].includes(write.status))
 await assert.rejects(saveLedgerProject(project,{}, {fellowId:id,name:'Synthetic reader',admin:true,readOnly:true}),/read-only/)
 assert.deepEqual(await snapshot(),before)
})

test('preview refuses an inherited database until isolation has been explicitly verified',()=>{
 const prior=process.env.VERCEL_ENV, isolated=process.env.ISOLATED_STAGING_DATABASE
 try {
  process.env.VERCEL_ENV='preview';delete process.env.ISOLATED_STAGING_DATABASE
  assert.throws(()=>assertDatabaseEnvironment(),/isolated staging/)
  process.env.ISOLATED_STAGING_DATABASE='true';assert.doesNotThrow(()=>assertDatabaseEnvironment())
 } finally {
  if(prior===undefined) delete process.env.VERCEL_ENV;else process.env.VERCEL_ENV=prior
  if(isolated===undefined) delete process.env.ISOLATED_STAGING_DATABASE;else process.env.ISOLATED_STAGING_DATABASE=isolated
 }
})

test('logout while role feature is disabled permanently revokes copied cookie',async()=>{
 const token=(await issueDeveloperSession(developer,passwordHash,query))!
 process.env.DEVELOPER_ACCESS_ENABLED='false'
 try {
  const response=await logout(req('/api/fellows/auth/logout','POST',{}, {cookie:'developer_session='+token}))
  assert.equal(response.status,200)
 } finally {process.env.DEVELOPER_ACCESS_ENABLED='true'}
 assert.equal(await resolveDeveloper(token,query),null)
})
