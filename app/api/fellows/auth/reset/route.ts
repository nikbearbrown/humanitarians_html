import { NextRequest, NextResponse } from 'next/server'
import { resetFellowPassword } from '@/lib/fellow-reset'

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json()
    if (typeof password !== 'string' || password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
    }
    if (!(await resetFellowPassword(String(token || ''), password))) {
      return NextResponse.json(
        { error: 'This link has expired or was already used. Ask for a new one.' },
        { status: 400 }
      )
    }
    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error('password reset failed', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
