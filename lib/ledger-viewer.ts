// lib/ledger-viewer.ts
// Legacy Ledger: owner admins and assigned PMs retain existing access.
// An explicitly granted developer can inspect it read-only, without becoming a PM.

import { NextRequest, NextResponse } from 'next/server'
import { getFellowFromSession } from '@/lib/fellow-auth'
import { isValidSession } from '@/lib/admin-auth'
import { sql } from '@/lib/db'
import { authorizeDeveloper, DEVELOPER_COOKIE, type Query } from '@/lib/developer-access-core'
import { isProjectManager, type Viewer } from '@/lib/ledger'

export type LedgerDenied = 'signed-out' | 'not-pm'

export async function getLedgerViewer(req: NextRequest): Promise<Viewer | LedgerDenied> {
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

export function ledgerDenied(reason: LedgerDenied): NextResponse {
  return reason === 'signed-out'
    ? NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    : NextResponse.json({ error: 'Project Ledger requires a PM assignment or approved developer read access.' }, { status: 403 })
}
