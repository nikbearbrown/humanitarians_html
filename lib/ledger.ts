// lib/ledger.ts
// Project Ledger data: weekly work and hours for each project's PM and fellows.
//
// The ledger page (public/scripts/ledger.js) works with one nested object per
// project. listLedger() builds that shape from the real tables (projects,
// fellows, fellow_projects, ledger_entries, ledger_updates), and saveLedgerProject()
// turns a saved project back into row changes. Only the ledger's own data is
// written: project names, descriptions, PMs and emails stay managed in the admin
// dashboard. The ledger columns and tables are described in sql/003_project_ledger.sql.

import { sql } from '@/lib/db'

export const PHASES = ['Idea', 'Active', 'Blocked', 'Paused', 'Done']

export type LedgerItem = { week: string; hours: number; task: string; next: string }
export type LedgerLog = LedgerItem & { who: string; at: string }
export type LedgerMember = {
  id: string; name: string; role: string; next: string; added: string
  weeks: LedgerItem[]; log: LedgerLog[]
}
export type LedgerNote = { id: string; who: string; text: string; when: string; week: string; createdAt: string }
export type LedgerProject = {
  id: string; name: string; blurb: string; pm: string; pmId: string; email: string
  strands: string[]; phase: string; next: string; due: string; target: number; touched: string
  canEdit: boolean
  team: LedgerMember[]
  notes: LedgerNote[]
  weeks: (LedgerItem & { who: string })[]
  pmLog: (LedgerLog & { items: { task: string; next: string; hours: number }[] })[]
}

// Who is looking: a signed-in fellow, or an admin (who may not be a fellow).
export type Viewer = { fellowId: string | null; name: string; admin: boolean }

export class LedgerError extends Error {
  constructor(message: string, public status = 400) { super(message) }
}

type Row = Record<string, unknown>
const iso = (v: unknown) => (v ? new Date(v as string).toISOString() : '')
const text = (v: unknown) => (v == null ? '' : String(v))

export async function listLedger(viewer: Viewer): Promise<LedgerProject[]> {
  const [projects, members, entries, updates] = await Promise.all([
    sql`SELECT id, name, elevator_pitch, phase, next_step, weekly_hours_target, strands
        FROM projects WHERE active = true ORDER BY name`,
    sql`SELECT fp.project_id, fp.role, fp.created_at, f.id, f.name, f.email
        FROM fellow_projects fp JOIN fellows f ON f.id = fp.fellow_id
        WHERE f.status = 'current'
        ORDER BY fp.created_at, f.name`,
    sql`SELECT e.project_id, e.fellow_id, to_char(e.week, 'YYYY-MM-DD') AS week,
               e.worked_on, e.next_step, e.hours, e.updated_at, w.name AS entered_by_name
        FROM ledger_entries e LEFT JOIN fellows w ON w.id = e.entered_by
        ORDER BY e.week, e.created_at, e.id`,
    sql`SELECT u.id, u.project_id, u.content, to_char(u.week, 'YYYY-MM-DD') AS week,
               to_char(u.created_at, 'Mon DD') AS short_date, u.created_at, a.name AS author_name
        FROM ledger_updates u LEFT JOIN fellows a ON a.id = u.author_id
        ORDER BY u.created_at, u.id`,
  ])

  const byId = new Map<string, LedgerProject>()
  const pmIds = new Map<string, Set<string>>()
  for (const p of projects as Row[]) {
    byId.set(p.id as string, {
      id: p.id as string, name: text(p.name), blurb: text(p.elevator_pitch),
      pm: '', pmId: '', email: '',
      strands: Array.isArray(p.strands) ? (p.strands as string[]) : [],
      phase: text(p.phase) || 'Active', next: text(p.next_step), due: '',
      target: Number(p.weekly_hours_target ?? 20), touched: '',
      canEdit: viewer.admin, team: [], notes: [], weeks: [], pmLog: [],
    })
    pmIds.set(p.id as string, new Set())
  }

  // The project's PM is its first fellow with the 'pm' role; anyone else on the
  // project (including a second PM) is listed as a team member.
  const memberOf = new Map<string, LedgerMember>()
  for (const m of members as Row[]) {
    const proj = byId.get(m.project_id as string)
    if (!proj) continue
    if (m.role === 'pm') pmIds.get(proj.id)!.add(m.id as string)
    if (m.role === 'pm' && !proj.pmId) {
      proj.pmId = m.id as string
      proj.pm = text(m.name)
      proj.email = text(m.email)
      continue
    }
    const member: LedgerMember = {
      id: m.id as string, name: text(m.name), role: '', next: '',
      added: iso(m.created_at), weeks: [], log: [],
    }
    memberOf.set(proj.id + ':' + member.id, member)
    proj.team.push(member)
  }
  for (const proj of byId.values()) {
    if (viewer.fellowId && pmIds.get(proj.id)!.has(viewer.fellowId)) proj.canEdit = true
  }

  const touch = (proj: LedgerProject, at: string) => { if (at > proj.touched) proj.touched = at }

  for (const e of entries as Row[]) {
    const proj = byId.get(e.project_id as string)
    if (!proj) continue
    const item = { week: text(e.week), hours: Number(e.hours) || 0, task: text(e.worked_on), next: text(e.next_step) }
    const at = iso(e.updated_at)
    if (e.fellow_id === proj.pmId) {
      proj.weeks.push({ ...item, who: proj.pm })
      proj.pmLog.push({ ...item, who: text(e.entered_by_name) || proj.pm, at,
        items: [{ task: item.task, next: item.next, hours: item.hours }] })
    } else {
      const member = memberOf.get(proj.id + ':' + e.fellow_id)
      if (!member) continue // no longer on the project: kept in the database, not shown
      member.weeks.push(item)
      member.log.push({ ...item, who: text(e.entered_by_name), at })
    }
    touch(proj, at)
  }

  for (const u of updates as Row[]) {
    const proj = byId.get(u.project_id as string)
    if (!proj) continue
    const createdAt = iso(u.created_at)
    proj.notes.push({
      id: u.id as string, who: text(u.author_name) || 'Admin', text: text(u.content),
      when: text(u.short_date), week: text(u.week), createdAt,
    })
    touch(proj, createdAt)
  }

  return Array.from(byId.values())
}

export async function isProjectManager(fellowId: string): Promise<boolean> {
  const rows = await sql`SELECT 1 FROM fellow_projects WHERE fellow_id = ${fellowId} AND role = 'pm' LIMIT 1`
  return rows.length > 0
}

export async function currentFellows(): Promise<{ id: string; name: string }[]> {
  const rows = await sql`SELECT id, name FROM fellows WHERE status = 'current' ORDER BY name`
  return (rows as Row[]).map((r) => ({ id: r.id as string, name: text(r.name) }))
}

const WEEK = /^\d{4}-\d{2}-\d{2}$/
const cleanItem = (raw: Partial<LedgerItem>) => ({
  week: text(raw.week),
  task: text(raw.task).trim(),
  next: text(raw.next).trim(),
  hours: Math.min(999, Math.max(0, Math.round((Number(raw.hours) || 0) * 10) / 10)),
})
const isBlank = (it: { task: string; next: string; hours: number }) => !it.task && !it.next && !(it.hours > 0)
const sameItem = (row: Row, it: { task: string; next: string; hours: number }) =>
  text(row.worked_on) === it.task && text(row.next_step) === it.next && Number(row.hours) === it.hours

// Saves one project as the ledger page sent it. Rows that did not change are
// left alone, so their "updated" time and "by" name stay as they were.
export async function saveLedgerProject(projectId: string, body: Partial<LedgerProject>, viewer: Viewer): Promise<void> {
  const [projRows, memberRows, entryRows, updateRows, fellows] = await Promise.all([
    sql`SELECT id FROM projects WHERE id = ${projectId} AND active = true LIMIT 1`,
    sql`SELECT fellow_id, role FROM fellow_projects WHERE project_id = ${projectId} ORDER BY created_at`,
    sql`SELECT id, fellow_id, to_char(week, 'YYYY-MM-DD') AS week, worked_on, next_step, hours
        FROM ledger_entries WHERE project_id = ${projectId} ORDER BY created_at, id`,
    sql`SELECT id, content, to_char(week, 'YYYY-MM-DD') AS week FROM ledger_updates WHERE project_id = ${projectId}`,
    sql`SELECT id, name FROM fellows WHERE status = 'current'`,
  ])
  if (!projRows.length) throw new LedgerError('This project is not in the ledger.', 404)

  const pmRows = (memberRows as Row[]).filter((m) => m.role === 'pm')
  const pmId = pmRows.length ? (pmRows[0].fellow_id as string) : ''
  const allowed = viewer.admin || (!!viewer.fellowId && pmRows.some((m) => m.fellow_id === viewer.fellowId))
  if (!allowed) throw new LedgerError('Only this project’s PM can change it.', 403)

  const by = viewer.fellowId
  const statements = []

  // 1. The ledger's own project fields.
  const phase = PHASES.includes(text(body.phase)) ? text(body.phase) : 'Active'
  const target = Math.min(200, Math.max(0, Math.round(Number(body.target) || 0)))
  const strands = (Array.isArray(body.strands) ? body.strands : []).map((s) => text(s).trim()).filter(Boolean).slice(0, 50)
  statements.push(sql`
    UPDATE projects SET phase = ${phase}, next_step = ${text(body.next).trim()},
           weekly_hours_target = ${target}, strands = ${strands}::text[]
    WHERE id = ${projectId}`)

  // 2. Team. A volunteer is a fellow: a row already on the project keeps its id,
  //    and a newly added name must match exactly one current fellow.
  const memberIds = new Set((memberRows as Row[]).map((m) => m.fellow_id as string))
  const fellowsByName = new Map<string, string[]>()
  for (const f of fellows as Row[]) {
    const key = text(f.name).trim().toLowerCase()
    fellowsByName.set(key, [...(fellowsByName.get(key) || []), f.id as string])
  }
  const team = new Map<string, LedgerItem[]>() // fellow id -> weeks
  for (const m of Array.isArray(body.team) ? body.team : []) {
    let fellowId = memberIds.has(text(m.id)) ? text(m.id) : ''
    if (!fellowId) {
      const matches = fellowsByName.get(text(m.name).trim().toLowerCase()) || []
      if (matches.length === 0) {
        throw new LedgerError('No fellow is called “' + text(m.name).trim() + '”. Volunteers must have a fellow account; HR adds them in the admin dashboard.')
      }
      if (matches.length > 1) {
        throw new LedgerError('More than one fellow is called “' + text(m.name).trim() + '”. Ask an admin to add the right one to this project.')
      }
      fellowId = matches[0]
    }
    if (fellowId === pmId) continue
    team.set(fellowId, [...(team.get(fellowId) || []), ...(Array.isArray(m.weeks) ? m.weeks : [])])
  }
  for (const fellowId of team.keys()) {
    if (!memberIds.has(fellowId)) {
      statements.push(sql`
        INSERT INTO fellow_projects (fellow_id, project_id, role) VALUES (${fellowId}, ${projectId}, 'fellow')
        ON CONFLICT (fellow_id, project_id) DO NOTHING`)
    }
  }
  // Removed from the team: the membership goes, their past entries stay.
  for (const m of memberRows as Row[]) {
    if (m.role === 'fellow' && !team.has(m.fellow_id as string)) {
      statements.push(sql`
        DELETE FROM fellow_projects
        WHERE fellow_id = ${m.fellow_id as string} AND project_id = ${projectId} AND role = 'fellow'`)
    }
  }

  // 3. Weekly entries, matched week by week against what is stored.
  const existing = new Map<string, Row[]>() // fellow id + week -> rows
  for (const r of entryRows as Row[]) {
    const key = r.fellow_id + ' ' + r.week
    existing.set(key, [...(existing.get(key) || []), r])
  }
  const syncWeek = (fellowId: string, week: string, wanted: ReturnType<typeof cleanItem>[]) => {
    const rows = existing.get(fellowId + ' ' + week) || []
    existing.delete(fellowId + ' ' + week)
    const unused = rows.slice()
    const leftover: typeof wanted = []
    // Same text first (a PM's unchanged work items), then reuse any remaining row.
    for (const it of wanted) {
      const i = unused.findIndex((r) => text(r.worked_on) === it.task)
      if (i === -1) { leftover.push(it); continue }
      const row = unused.splice(i, 1)[0]
      if (!sameItem(row, it)) statements.push(updateEntry(row.id as string, it))
    }
    for (const it of leftover) {
      const row = unused.shift()
      if (row) statements.push(updateEntry(row.id as string, it))
      else statements.push(sql`
        INSERT INTO ledger_entries (project_id, fellow_id, week, worked_on, next_step, hours, entered_by)
        VALUES (${projectId}, ${fellowId}, ${week}, ${it.task}, ${it.next}, ${it.hours}, ${by})`)
    }
    for (const row of unused) statements.push(sql`DELETE FROM ledger_entries WHERE id = ${row.id as string}`)
  }
  const updateEntry = (id: string, it: ReturnType<typeof cleanItem>) => sql`
    UPDATE ledger_entries SET worked_on = ${it.task}, next_step = ${it.next}, hours = ${it.hours},
           entered_by = ${by}, updated_at = now()
    WHERE id = ${id}`
  const byWeek = (items: Partial<LedgerItem>[]) => {
    const weeks = new Map<string, ReturnType<typeof cleanItem>[]>()
    for (const raw of items) {
      const it = cleanItem(raw)
      if (!WEEK.test(it.week) || isBlank(it)) continue
      weeks.set(it.week, [...(weeks.get(it.week) || []), it])
    }
    return weeks
  }

  // A fellow has one row per week (several typed rows are added together);
  // the PM may have several work items in the same week.
  for (const [fellowId, weeks] of team) {
    const wanted = byWeek(weeks)
    for (const [week, items] of wanted) {
      const merged = items.reduce((a, b) => ({
        week, hours: Math.round((a.hours + b.hours) * 10) / 10,
        task: [a.task, b.task].filter(Boolean).join('; '), next: b.next || a.next,
      }))
      syncWeek(fellowId, week, [merged])
    }
    for (const key of Array.from(existing.keys())) {
      if (key.startsWith(fellowId + ' ')) syncWeek(fellowId, key.slice(fellowId.length + 1), [])
    }
  }
  const pmWeeks = byWeek(Array.isArray(body.weeks) ? body.weeks : [])
  if (pmWeeks.size && !pmId) throw new LedgerError('This project has no PM yet, so there is no one to log PM hours for.')
  if (pmId) {
    for (const [week, items] of pmWeeks) syncWeek(pmId, week, items)
    for (const key of Array.from(existing.keys())) {
      if (key.startsWith(pmId + ' ')) syncWeek(pmId, key.slice(pmId.length + 1), [])
    }
  }
  // Rows still in `existing` belong to people no longer on the project: untouched.

  // 4. Project updates (notes): kept, added or deleted; never edited in place.
  const unusedNotes = (updateRows as Row[]).slice()
  for (const n of Array.isArray(body.notes) ? body.notes : []) {
    const content = text(n.text).trim()
    if (!content || !WEEK.test(text(n.week))) continue
    let i = unusedNotes.findIndex((r) => r.id === n.id)
    if (i === -1) i = unusedNotes.findIndex((r) => text(r.content) === content && r.week === n.week)
    if (i !== -1) { unusedNotes.splice(i, 1); continue }
    statements.push(sql`
      INSERT INTO ledger_updates (project_id, author_id, week, content)
      VALUES (${projectId}, ${by}, ${text(n.week)}, ${content})`)
  }
  for (const r of unusedNotes) statements.push(sql`DELETE FROM ledger_updates WHERE id = ${r.id as string}`)

  await sql.transaction(statements)
}
