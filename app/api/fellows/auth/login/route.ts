import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { verifyPassword, createFellowSession } from '@/lib/fellow-auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const rows = await sql`
      SELECT id, password_hash FROM fellows WHERE email = ${email} LIMIT 1
    `
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const fellow = rows[0] as Record<string, unknown>
    const valid = await verifyPassword(password, fellow.password_hash as string)
    if (!valid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const res = NextResponse.json({ success: true })
    await createFellowSession(fellow.id as string, res)
    return res
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Server error' },
      { status: 500 }
    )
  }
}
