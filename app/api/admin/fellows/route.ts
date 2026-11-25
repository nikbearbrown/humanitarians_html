import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { dashboardAccess } from '@/lib/dashboard-auth'
import { hashPassword } from '@/lib/fellow-auth'
import { identityWriteAccess, auditStatement, ACTIVATION_NOTE } from '@/lib/identity-admin'
import crypto from 'crypto'

function generateTempPassword(): string {
  return crypto.randomBytes(12).toString('base64url').slice(0, 16)
}

// Create one member. Timesheets off: owner admin, temporary password returned (as before).
// Timesheets on: a named identity admin (lib/identity-admin.ts); no password is shown.
export async function POST(req: NextRequest) {
  const access = await identityWriteAccess(req, async () => await dashboardAccess(req, 'identity-admin'))
  if (!access.ok) return access.response
  const admin = access.admin

  try {
    const body = await req.json()
    const { name, email, status, joined_date, project_ids, pm_project_id } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    const tempPassword = generateTempPassword()
    const password_hash = await hashPassword(tempPassword)
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const fellowStatus = status || 'current'
    const joinedDate = joined_date || new Date().toISOString()

    // Check if email already exists
    const existing = await sql`SELECT id FROM fellows WHERE email = ${email} LIMIT 1`
    if (existing.length > 0) {
      return NextResponse.json({ error: 'A fellow with this email already exists' }, { status: 409 })
    }

    // Member, assignments and (when timesheets are on) the audit row commit together.
    const fellowId = crypto.randomUUID()
    const projects: string[] = Array.isArray(project_ids) ? project_ids.map(String) : []
    const statements = [
      sql`INSERT INTO fellows (id, name, slug, email, password_hash, status, joined_date)
          VALUES (${fellowId}, ${name}, ${slug}, ${email}, ${password_hash}, ${fellowStatus}, ${joinedDate})`,
      ...projects.map((projectId) => sql`
          INSERT INTO fellow_projects (fellow_id, project_id, role)
          VALUES (${fellowId}, ${projectId}, ${projectId === pm_project_id ? 'pm' : 'fellow'})`),
    ]
    if (admin) statements.push(auditStatement(admin, 'create', fellowId, { projects, pm_project_id: pm_project_id || null }))
    await sql.transaction(statements)

    return admin
      ? NextResponse.json({ id: fellowId, activation: ACTIVATION_NOTE }, { status: 201 })
      : NextResponse.json({ id: fellowId, temp_password: tempPassword }, { status: 201 })
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Database error' },
      { status: 500 }
    )
  }
}
