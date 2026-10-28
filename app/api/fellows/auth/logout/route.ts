import { clearDeveloperSession } from '@/lib/dashboard-auth'
import { sameOriginMutation } from '@/lib/developer-access-core'
import { NextRequest, NextResponse } from 'next/server'
import { clearFellowSession } from '@/lib/fellow-auth'

export async function POST(req: NextRequest) {
  if (!sameOriginMutation(req)) return NextResponse.json({ error: 'Invalid request origin' }, { status: 403 })
  const res = NextResponse.json({ success: true })
  clearFellowSession(res)
  try { await clearDeveloperSession(req, res) }
  catch {
    const failed = NextResponse.json({ error: 'Browser sign-out completed, but server session revocation could not be confirmed. Contact an administrator if you suspect another copy of this session is in use.' }, { status: 503 })
    // Keep both deletion headers even when the database cannot revoke a copied token.
    for (const cookie of res.cookies.getAll()) failed.cookies.set(cookie)
    return failed
  }
  return res
}
