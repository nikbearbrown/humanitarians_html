import { NextRequest, NextResponse } from 'next/server'
import { confirmEmailChange } from '@/lib/email-change'
import { sameOrigin } from '@/lib/timesheets/session'

const headers = { 'Cache-Control': 'private, no-store' }

// The member confirms an email change requested by an identity admin, from the
// link sent to their CURRENT address (lib/email-change.ts). POST only, from this
// site's own page, so opening the link (or a mail scanner opening it) changes nothing.
export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Use the confirmation page on this site.' }, { status: 403, headers })
  try {
    const { token } = await req.json()
    const result = await confirmEmailChange(token)
    if (result === 'confirmed') return NextResponse.json({ confirmed: true }, { headers })
    if (result === 'taken') return NextResponse.json({ error: 'Another account already uses that email. Ask HR for help.' }, { status: 409, headers })
    return NextResponse.json({ error: 'This link has expired, was replaced or was already used.' }, { status: 400, headers })
  } catch {
    // Never log tokens or addresses.
    return NextResponse.json({ error: 'Could not confirm right now. Try again in a few minutes.' }, { status: 503, headers })
  }
}
