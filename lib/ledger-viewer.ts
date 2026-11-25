// lib/ledger-viewer.ts
// Who may use the Ledger API (/api/ledger/me, /api/ledger/projects).
//
// TIMESHEETS_ENABLED off (today's site): the shipped Ledger rules, unchanged.
//   Owner admins and assigned PMs read and edit; an explicitly granted developer
//   ('legacy-ledger-read') reads read-only, without becoming a PM.
// TIMESHEETS_ENABLED on: old records are read-only history. Assigned PMs and board
//   viewers read them through a timesheet work-record session (project-scoped in
//   SQL); the shared admin cookie and old fellow cookies are not accepted. The
//   granted developer keeps the same read-only view it had before the switch.
//
// Merging timesheets therefore removes nobody's existing access.

import { NextRequest, NextResponse } from 'next/server'
import { getFellowFromSession } from '@/lib/fellow-auth'
import { isValidSession } from '@/lib/admin-auth'
import { sql } from '@/lib/db'
import { authorizeDeveloper, DEVELOPER_COOKIE, type Query } from '@/lib/developer-access-core'
import { getTimesheetActor } from '@/lib/timesheets/session'
import { isProjectManager, type Viewer } from '@/lib/ledger'

export type LedgerDenied = 'signed-out' | 'not-pm'

export const timesheetsEnabled = () => process.env.TIMESHEETS_ENABLED === 'true'

// An approved developer reads the Ledger read-only in either mode.
async function developerReader(req: NextRequest): Promise<Viewer | null> {
  if (process.env.DEVELOPER_ACCESS_ENABLED !== 'true') return null
  try {
    const actor = await authorizeDeveloper(req, req.cookies.get(DEVELOPER_COOKIE)?.value, 'legacy-ledger-read', sql as unknown as Query)
    if (actor) return { fellowId: actor.fellow_id, name: actor.name, admin: false, readOnly: true }
  } catch { /* unavailable role/session storage fails closed */ }
  return null
}

export async function getLedgerViewer(req: NextRequest): Promise<Viewer | LedgerDenied> {
  if (!timesheetsEnabled()) {
    const fellow = await getFellowFromSession(req)
    let admin = false
    try { admin = isValidSession(req.cookies.get('admin_session')?.value || '') } catch { /* invalid cookie */ }
    if (admin || (fellow && await isProjectManager(fellow.id))) {
      return { fellowId: fellow?.id ?? null, name: fellow?.name || 'Admin', admin }
    }
    const developer = await developerReader(req)
    if (developer) return developer
    return fellow ? 'not-pm' : 'signed-out'
  }

  let signedIn = false
  try {
    const fellow = await getTimesheetActor(req)
    if (fellow && fellow.status === 'current') {
      signedIn = true
      const board = await sql`SELECT 1 FROM timesheet_board_viewers WHERE fellow_id=${fellow.id}::uuid AND revoked_at IS NULL`
      if (board.length || await isProjectManager(fellow.id)) {
        return { fellowId: fellow.id, name: fellow.name, admin: board.length > 0 }
      }
    }
  } catch { /* timesheet storage unavailable: fall through, fail closed */ }
  const developer = await developerReader(req)
  if (developer) return developer
  return signedIn ? 'not-pm' : 'signed-out'
}

export function ledgerDenied(reason: LedgerDenied): NextResponse {
  const headers = { 'Cache-Control': 'private, no-store' }
  return reason === 'signed-out'
    ? NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers })
    : NextResponse.json({ error: 'Project Ledger requires a PM assignment or approved developer read access.' }, { status: 403, headers })
}
