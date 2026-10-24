import { NextRequest, NextResponse } from 'next/server'
import { listLedger, saveLedgerProject, LedgerError } from '@/lib/ledger'
import { getLedgerViewer, ledgerDenied } from '@/lib/ledger-viewer'

// Saves one project from the ledger page and sends back its stored version,
// so the page carries the database ids and times from then on.
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const viewer = await getLedgerViewer(req)
  if (typeof viewer === 'string') return ledgerDenied(viewer)
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
