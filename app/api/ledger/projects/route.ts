import { NextRequest, NextResponse } from 'next/server'
import { listLedger, currentFellows } from '@/lib/ledger'
import { listLegacyRecords } from '@/lib/timesheets/legacy-records'
import { getLedgerViewer, ledgerDenied, timesheetsEnabled } from '@/lib/ledger-viewer'

const headers = { 'Cache-Control': 'private, no-store' }

// Timesheets off: the editable Ledger exactly as shipped (developers read-only).
// Timesheets on: old records are read-only, project-scoped history; the approved
// developer keeps the same read-only view it had before the switch.
export async function GET(req: NextRequest) {
  const viewer = await getLedgerViewer(req)
  if (typeof viewer === 'string') return ledgerDenied(viewer)
  try {
    if (timesheetsEnabled() && !viewer.readOnly) {
      return NextResponse.json({ projects: await listLegacyRecords(viewer) }, { headers })
    }
    const [projects, fellows] = await Promise.all([listLedger(viewer), currentFellows()])
    return NextResponse.json({ projects, fellows }, { headers })
  } catch (error: unknown) {
    console.error('ledger list failed', error)
    return NextResponse.json({ error: 'Could not load the ledger' }, { status: 500, headers })
  }
}
