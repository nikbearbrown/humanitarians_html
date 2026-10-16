// lib/ledger-viewer.ts
// Who may use the Project Ledger: admins, and fellows who are the PM of at least
// one project. Other fellows don't sign in to it; their PM logs their work.

import { NextRequest, NextResponse } from 'next/server'
import { getFellowFromSession } from '@/lib/fellow-auth'
import { isAdmin } from '@/lib/admin-auth'
import { isProjectManager, type Viewer } from '@/lib/ledger'

export type LedgerDenied = 'signed-out' | 'not-pm'

export async function getLedgerViewer(req: NextRequest): Promise<Viewer | LedgerDenied> {
  const fellow = await getFellowFromSession(req)
  const admin = await isAdmin()
  if (!fellow && !admin) return 'signed-out'
  if (!admin && !(await isProjectManager(fellow!.id))) return 'not-pm'
  return { fellowId: fellow?.id ?? null, name: fellow?.name || 'Admin', admin }
}

export function ledgerDenied(reason: LedgerDenied): NextResponse {
  return reason === 'signed-out'
    ? NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    : NextResponse.json({ error: 'The Project Ledger is for project managers.' }, { status: 403 })
}
