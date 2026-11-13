import assert from 'node:assert/strict'
import { before, test } from 'node:test'
import { randomUUID } from 'node:crypto'
import { db, setupSynthetic, actors } from './fixture'
import { adminRosterHandler, listAdminRoster } from '../../lib/admin-roster'
import { rosterView } from '../../lib/roster-filters'
before(setupSynthetic)
test('global roster denies non-admin before reading any people or project associations', async () => {
  let reads = 0
  const response = await adminRosterHandler({authorized: async () => false, list: async () => { reads++; return [] }})()
  assert.equal(response.status, 401); assert.equal(reads, 0)
  assert.equal(response.headers.get('cache-control'), 'private, no-store')
})
test('roster errors hide database details and authorized responses are not cached', async () => {
  const fail = await adminRosterHandler({authorized: async () => true, list: async () => { throw new Error('private SQL detail') }})()
  assert.equal(fail.status, 503); assert.doesNotMatch(await fail.text(), /private SQL/)
  const ok = await adminRosterHandler({authorized: async () => true, list: async () => []})()
  assert.equal(ok.headers.get('vary'), 'Cookie'); assert.equal(ok.headers.get('cache-control'), 'private, no-store')
})
test('SQL projects and filters distinguish current PM, alumni PM, archived assignments and unknown board', async () => {
  const unassigned = randomUUID(), alumnus = randomUUID(), archived = randomUUID(), oldProject = randomUUID()
  for (const [id, name, status] of [[unassigned,'Unassigned person','current'],[alumnus,'Alumni manager','alumni'],[archived,'Former project manager','current']])
    await db.query('INSERT INTO fellows(id,name,slug,email,password_hash,status) VALUES($1::uuid,$2,$1::text,$3,$4,$5)',[id,name,id+'@example.org','synthetic',status])
  await db.query("INSERT INTO projects(id,name,slug,elevator_pitch,url,active) VALUES($1,'Archived project','archived','Synthetic','https://example.org',false)",[oldProject])
  for (const [id, project] of [[alumnus,actors.project],[archived,oldProject]]) await db.query("INSERT INTO fellow_projects(fellow_id,project_id,role) VALUES($1,$2,'pm')",[id,project])
  const rows = await listAdminRoster()
  assert.equal(rows.length,6)
  assert.deepEqual(Object.keys(rows[0]).sort(),['id','name','email','status','joined_date','project_count','projects','board_classification'].sort())
  assert.equal(rows.find(r=>r.id===unassigned)?.projects.length,0)
  assert.equal(rows.find(r=>r.id===actors.pm)?.projects[0].role,'pm')
  const managers=rosterView(rows,'all','pm','')
  assert.deepEqual(new Set(managers.rows.map(r=>r.id)),new Set([actors.pm,actors.outsider]))
  assert.equal(rosterView(rows,'all','pm','other project').rows.length,1)
  assert.equal(rosterView(rows,'current','all','ARCHIVED').rows.length,1)
  assert.equal(rosterView(rows,'current','unassigned','').rows.length,2)
  const board=rosterView(rows,'current','board','')
  assert.equal(board.rows.length,0);assert.equal(board.counts.board,null);assert.equal(board.counts.boardUnknown,5)
  assert.equal(rosterView(rows,'alumni','all','').rows.length,1)
  await db.query('DELETE FROM fellow_projects WHERE fellow_id=$1',[actors.pm])
  assert.equal(rosterView(await listAdminRoster(),'current','pm','').rows.length,1)
})
