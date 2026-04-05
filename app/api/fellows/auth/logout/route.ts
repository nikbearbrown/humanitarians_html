import { NextResponse } from 'next/server'
import { clearFellowSession } from '@/lib/fellow-auth'

export async function POST() {
  const res = NextResponse.json({ success: true })
  clearFellowSession(res)
  return res
}
