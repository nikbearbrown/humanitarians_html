import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { isSuperAdmin } from '@/lib/admin-auth'
import { hashPassword } from '@/lib/fellow-auth'
import crypto from 'crypto'

function generateTempPassword(): string {
  return crypto.randomBytes(12).toString('base64url').slice(0, 16)
}

export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isSuperAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await params
    const tempPassword = generateTempPassword()
    const password_hash = await hashPassword(tempPassword)

    const rows = await sql`
      UPDATE fellows SET password_hash = ${password_hash}
      WHERE id = ${id} RETURNING id
    `
    if (rows.length === 0) return NextResponse.json({ error: 'Fellow not found' }, { status: 404 })

    return NextResponse.json({ temp_password: tempPassword })
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Database error' },
      { status: 500 }
    )
  }
}
