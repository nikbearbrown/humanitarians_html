import { NextRequest, NextResponse } from 'next/server'
import { saveDecision, GrantError } from '@/lib/grants'
import { getLedgerViewer, ledgerDenied } from '@/lib/ledger-viewer'

// Records one decision (pursue, applied, ...) and a note for a grant.
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const viewer = await getLedgerViewer(req)
  if (typeof viewer === 'string') return ledgerDenied(viewer)
  const { id } = await params
  try {
    let body: unknown
    try { body = await req.json() } catch { throw new GrantError('Send JSON with a decision and notes.') }
    await saveDecision(id, body, viewer)
    return NextResponse.json({ ok: true })
  } catch (error: unknown) {
    if (error instanceof GrantError) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }
    console.error('grant decision failed', error)
    return NextResponse.json({ error: 'That change did not save. Try again in a moment.' }, { status: 500 })
  }
}
