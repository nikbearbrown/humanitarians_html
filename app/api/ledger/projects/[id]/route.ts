import { NextRequest, NextResponse } from 'next/server'
import { listLedger, saveLedgerProject, LedgerError } from '@/lib/ledger'
import { getLedgerViewer, ledgerDenied, timesheetsEnabled } from '@/lib/ledger-viewer'

// Saves one project from the ledger page and sends back its stored version,
// so the page carries the database ids and times from then on.
// Once timesheets are on, manager-entered records are frozen: they are preserved
// and never converted into fellow attestations.
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const viewer = await getLedgerViewer(req)
  if (typeof viewer === 'string') return ledgerDenied(viewer)
  if (viewer.readOnly) {
    return NextResponse.json({ error: 'Developer Ledger access is read-only.' }, { status: 403 })
  }
  if (timesheetsEnabled()) {
    return NextResponse.json(
      { error: 'Legacy records are read-only. Fellows must enter and attest their own evidence timesheets.' },
      { status: 410, headers: { 'Cache-Control': 'private, no-store' } },
    )
  }
  const { id } = await params
  try {
    await saveLedgerProject(id, await req.json(), viewer)
    const project = (await listLedger(viewer)).find((p) => p.id === id) || null
    return NextResponse.json({ ok: true, project })
  } catch (error: unknown) {
    if (error instanceof LedgerError) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }
    console.error('ledger save failed', error)
    return NextResponse.json({ error: 'That change did not save. Try again in a moment.' }, { status: 500 })
  }
}
