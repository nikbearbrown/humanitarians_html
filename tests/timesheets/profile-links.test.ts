import assert from 'node:assert/strict'
import { before, test } from 'node:test'
import { readFile } from 'node:fs/promises'
import { NextRequest } from 'next/server'
import { db, setupSynthetic, actors, cookies } from './fixture'
import { normalizeProfileLink, safeProfileLink, parseProfileLinkPatch } from '../../lib/profile-links'
import { GET, PATCH } from '../../app/api/fellows/me/route'
import { getFellowBySlug, getAllFellows } from '../../lib/fellows'
before(setupSynthetic)
const origin='https://timesheets.example.org'
function request(body?: unknown, actor=actors.fellow, requestOrigin=origin) {
 return new NextRequest(origin+'/api/fellows/me',{method:body===undefined?'GET':'PATCH',headers:{cookie:'fellow_session='+cookies.get(actor),origin:requestOrigin,'content-type':'application/json'},...(body===undefined?{}:{body:JSON.stringify(body)})})
}
const links={github_url:'https://github.com/synthetic-fellow',linkedin_url:'https://www.linkedin.com/in/synthetic-fellow',website_url:'https://example.org/about',youtube_url:'https://www.youtube.com/@synthetic-fellow'}
test('four optional URL fields: normalization, clearing, missing fields and strict service boundaries',()=>{
 assert.equal(normalizeProfileLink('github_url','  https://github.com/synthetic-fellow  '),links.github_url)
 for(const value of ['', '  ', null]) assert.equal(normalizeProfileLink('website_url',value),null)
 assert.deepEqual(parseProfileLinkPatch({bio:'Keep all links'}),{})
 for(const value of ['javascript:alert(1)','data:text/html,x','//example.org','ftp://example.org','https://user:pass@example.org','https://example.org/\npath','https://example.org/\\evil',{},33,'https://localhost','https://example.org/'+ 'x'.repeat(2048)])
   assert.throws(()=>normalizeProfileLink('website_url',value))
 for(const [key, value] of [['github_url','https://github.com.evil.example/name'],['linkedin_url','https://linkedin.com@evil.example/name'],['youtube_url','https://youtu.be/video'],['youtube_url','https://youtube.com/watch?v=video']] as const)
   assert.throws(()=>normalizeProfileLink(key,value))
 for(const path of ['/@channel','/channel/UCsynthetic','/c/synthetic','/user/synthetic']) assert.ok(normalizeProfileLink('youtube_url','https://www.youtube.com'+path))
 assert.equal(safeProfileLink('linkedin_url','javascript:alert(1)'),null)
})
test('authenticated owner saves, reloads, clears and publishes only explicit public fields; no identity override',async()=>{
 const result=await PATCH(request({...links,bio:'Synthetic biography',id:actors.pm,email:'override@example.org',status:'alumni',custom_links:[{url:'https://other.example'}]}))
 assert.equal(result.status,200)
 const loaded=await (await GET(request())).json()
 for(const [key,value] of Object.entries(links)) assert.equal(loaded[key],value)
 assert.ok(loaded.joined_date && !Number.isNaN(Date.parse(loaded.joined_date)));
 assert.equal(loaded.status,'current');assert.notEqual(loaded.email,'override@example.org')
 const publicFellow=await getFellowBySlug(actors.fellow)
 for(const [key,value] of Object.entries(links)) assert.equal((publicFellow as any)[key],value)
 assert.equal('email' in publicFellow!,false);assert.equal('password_hash' in publicFellow!,false);assert.equal('custom_links' in publicFellow!,false)
 assert.equal((await db.query<{github_url:string|null}>('SELECT github_url FROM fellows WHERE id=$1',[actors.pm])).rows[0].github_url,null)
 assert.equal((await PATCH(request({website_url:''}))).status,200)
 const cleared=await (await GET(request())).json();assert.equal(cleared.website_url,null);assert.equal(cleared.github_url,links.github_url);assert.equal(cleared.bio,'Synthetic biography')
 assert.equal((await getAllFellows()).find(f=>f.id===actors.fellow)?.youtube_url,links.youtube_url)
})
test('invalid link rejects entire save; cross-origin and unauthenticated requests cannot write',async()=>{
 const beforeRow=(await db.query('SELECT * FROM fellows WHERE id=$1',[actors.fellow])).rows[0]
 for(const bad of [{github_url:'https://evil.example',bio:'Must not save'},{youtube_url:'javascript:alert(1)'},{website_url:['https://example.org']},null,[]])
  assert.equal((await PATCH(request(bad))).status,400)
 const form=new FormData();form.set('github_url','https://evil.example');form.set('photo',new File(['not an image'],'test.png',{type:'image/png'}))
 const invalidBeforeUpload=await PATCH(new NextRequest(origin+'/api/fellows/me',{method:'PATCH',headers:{cookie:'fellow_session='+cookies.get(actors.fellow),origin},body:form}))
 assert.equal(invalidBeforeUpload.status,400);assert.match((await invalidBeforeUpload.json()).error,/GitHub/)
 assert.equal((await PATCH(request(links,actors.fellow,'https://evil.example'))).status,403)
 assert.equal((await PATCH(new NextRequest(origin+'/api/fellows/me',{method:'PATCH',headers:{origin,'content-type':'application/json'},body:JSON.stringify(links)}))).status,401)
 assert.deepEqual((await db.query('SELECT * FROM fellows WHERE id=$1',[actors.fellow])).rows[0],beforeRow)
})
test('additive migration can be replayed without changing existing profiles',async()=>{
 const beforeRows=(await db.query('SELECT * FROM fellows ORDER BY id')).rows
 await db.exec(await readFile('sql/005_standard_profile_links.sql','utf8'))
 assert.deepEqual((await db.query('SELECT * FROM fellows ORDER BY id')).rows,beforeRows)
})
