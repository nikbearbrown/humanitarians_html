import { NextRequest, NextResponse } from 'next/server'
import { listLedger } from '@/lib/ledger'
import { getLedgerViewer, ledgerDenied } from '@/lib/ledger-viewer'

export async function GET(req: NextRequest) {
  const viewer = await getLedgerViewer(req)
  if (typeof viewer === 'string') return ledgerDenied(viewer)
  try {
    const projects = await listLedger(viewer)
    return NextResponse.json({ projects }, { headers: { 'Cache-Control': 'private, no-store' } })
  } catch {
    return NextResponse.json({ error: 'Could not load the ledger' }, { status: 503, headers: { 'Cache-Control': 'private, no-store' } })
  }
}
