import { NextRequest, NextResponse } from 'next/server'
import { listLedger, currentFellows } from '@/lib/ledger'
import { getLedgerViewer, ledgerDenied } from '@/lib/ledger-viewer'

export async function GET(req: NextRequest) {
  const viewer = await getLedgerViewer(req)
  if (typeof viewer === 'string') return ledgerDenied(viewer)
  try {
    const [projects, fellows] = await Promise.all([listLedger(viewer), currentFellows()])
    return NextResponse.json({ projects, fellows })
  } catch (error: unknown) {
    console.error('ledger list failed', error)
    return NextResponse.json({ error: 'Could not load the ledger' }, { status: 500 })
  }
}
