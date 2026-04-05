import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { getFellowFromSession, verifyPassword, hashPassword } from '@/lib/fellow-auth'

export async function PATCH(req: NextRequest) {
  const fellow = await getFellowFromSession(req)
  if (!fellow) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { current_password, new_password } = await req.json()

    if (!current_password || !new_password) {
      return NextResponse.json({ error: 'Current and new password are required' }, { status: 400 })
    }

    if (new_password.length < 8) {
      return NextResponse.json({ error: 'New password must be at least 8 characters' }, { status: 400 })
    }

    const valid = await verifyPassword(current_password, fellow.password_hash)
    if (!valid) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 })
    }

    const newHash = await hashPassword(new_password)
    await sql`UPDATE fellows SET password_hash = ${newHash} WHERE id = ${fellow.id}`

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Server error' },
      { status: 500 }
    )
  }
}
