import { NextRequest, NextResponse } from 'next/server'
import { saveDecision, GrantError } from '@/lib/grants'
import { getGrantsViewer, grantsDenied } from '@/lib/grants-viewer'
import { sameOriginMutation } from '@/lib/developer-access-core'

// Records one decision (pursue, applied, ...) and a note for a grant.
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!sameOriginMutation(req)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const viewer = await getGrantsViewer(req)
  if (typeof viewer === 'string') return grantsDenied(viewer)
  if (viewer.readOnly) return NextResponse.json({ error: 'Developer grant access is read-only.' }, { status: 403 })
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
