import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { dashboardAccess } from '@/lib/dashboard-auth'
import { hashPassword } from '@/lib/fellow-auth'
import { identityWriteAccess, auditStatement, revokeWorkSessions, resolveTarget, ACTIVATION_NOTE } from '@/lib/identity-admin'
import crypto from 'crypto'

function generateTempPassword(): string {
  return crypto.randomBytes(12).toString('base64url').slice(0, 16)
}

// Timesheets off: owner admin sets a temporary password and sees it (as before).
// Timesheets on: a named identity admin replaces the password with an unusable random
// one that nobody sees, which also ends the member's sessions; the member then sets
// their own password with "Forgot password?".
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const access = await identityWriteAccess(req, async () => await dashboardAccess(req, 'identity-admin'))
  if (!access.ok) return access.response
  const admin = access.admin

  try {
    // Canonical target ID (any accepted UUID spelling) and the self-change check.
    const target = await resolveTarget((await params).id, admin)
    if ('response' in target) return target.response
    const id = target.id
    const tempPassword = generateTempPassword()
    const password_hash = await hashPassword(tempPassword)

    const statements = [sql`UPDATE fellows SET password_hash = ${password_hash} WHERE id = ${id}`]
    if (admin) statements.push(revokeWorkSessions(id), auditStatement(admin, 'reset-password', id))
    await sql.transaction(statements)

    return admin
      ? NextResponse.json({ reset: true, activation: ACTIVATION_NOTE })
      : NextResponse.json({ temp_password: tempPassword })
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Database error' },
      { status: 500 }
    )
  }
}
