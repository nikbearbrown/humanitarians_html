import { NextRequest, NextResponse } from 'next/server'
import { getLedgerViewer, ledgerDenied } from '@/lib/ledger-viewer'

export async function GET(req: NextRequest) {
  const viewer = await getLedgerViewer(req)
  if (typeof viewer === 'string') return ledgerDenied(viewer)
  return NextResponse.json({ user: { id: viewer.fellowId, name: viewer.name, admin: viewer.admin } })
}
