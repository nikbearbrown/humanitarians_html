// lib/grants-viewer.ts
// Who may use Grant opportunities (/ledger/grants): owner admins and assigned PMs,
// plus an explicitly granted developer read-only. These are the access rules the
// grants page shipped with; they stay separate from the timesheet Ledger's
// supervisor/board scope in lib/ledger-viewer.ts, so grants keep working whether
// or not TIMESHEETS_ENABLED is on.

import { NextRequest, NextResponse } from 'next/server'
import { getFellowFromSession } from '@/lib/fellow-auth'
import { isValidSession } from '@/lib/admin-auth'
import { sql } from '@/lib/db'
import { authorizeDeveloper, DEVELOPER_COOKIE, type Query } from '@/lib/developer-access-core'
import { isProjectManager, type Viewer } from '@/lib/ledger'

export type GrantsDenied = 'signed-out' | 'not-pm'

export async function getGrantsViewer(req: NextRequest): Promise<Viewer | GrantsDenied> {
  const fellow = await getFellowFromSession(req)
  let admin = false
  try { admin = isValidSession(req.cookies.get('admin_session')?.value || '') } catch { /* invalid cookie */ }
  if (admin || (fellow && await isProjectManager(fellow.id))) {
    return { fellowId: fellow?.id ?? null, name: fellow?.name || 'Admin', admin }
  }
  if (process.env.DEVELOPER_ACCESS_ENABLED === 'true') {
    try {
      const actor = await authorizeDeveloper(req, req.cookies.get(DEVELOPER_COOKIE)?.value, 'legacy-ledger-read', sql as unknown as Query)
      if (actor) return { fellowId: actor.fellow_id, name: actor.name, admin: false, readOnly: true }
    } catch { /* unavailable role/session storage fails closed */ }
  }
  return fellow ? 'not-pm' : 'signed-out'
}

export function grantsDenied(reason: GrantsDenied): NextResponse {
  return reason === 'signed-out'
    ? NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    : NextResponse.json({ error: 'Grant opportunities require a PM assignment or approved developer read access.' }, { status: 403 })
}
