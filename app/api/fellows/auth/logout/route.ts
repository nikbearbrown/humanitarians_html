import { clearDeveloperSession } from '@/lib/dashboard-auth'
import { sameOriginMutation } from '@/lib/developer-access-core'
import { NextRequest, NextResponse } from 'next/server'
import { clearFellowSession } from '@/lib/fellow-auth'

export async function POST(req: NextRequest) {
  if (!sameOriginMutation(req)) return NextResponse.json({ error: 'Invalid request origin' }, { status: 403 })
  const res = NextResponse.json({ success: true })
  clearFellowSession(res)
  try { await clearDeveloperSession(req, res) }
  catch { return NextResponse.json({ error: 'Could not revoke dashboard session. Try signing out again.' }, { status: 503 }) }
  return res
}
