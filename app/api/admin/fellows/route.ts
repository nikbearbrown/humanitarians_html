import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { isAdmin } from '@/lib/admin-auth'
import { hashPassword } from '@/lib/fellow-auth'
import crypto from 'crypto'

function generateTempPassword(): string {
  return crypto.randomBytes(12).toString('base64url').slice(0, 16)
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { name, email, status, joined_date, project_ids, pm_project_id, is_admin: isAdminFlag } = body

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

    // Insert fellow
    const rows = await sql`
      INSERT INTO fellows (name, slug, email, password_hash, status, joined_date, is_admin)
      VALUES (${name}, ${slug}, ${email}, ${password_hash}, ${fellowStatus}, ${joinedDate}, ${Boolean(isAdminFlag)})
      RETURNING id
    `
    const fellowId = (rows[0] as Record<string, unknown>).id as string

    // Insert project assignments
    if (Array.isArray(project_ids)) {
      for (const projectId of project_ids) {
        const role = projectId === pm_project_id ? 'pm' : 'fellow'
        await sql`
          INSERT INTO fellow_projects (fellow_id, project_id, role)
          VALUES (${fellowId}, ${projectId}, ${role})
        `
      }
    }

    return NextResponse.json({ id: fellowId, temp_password: tempPassword }, { status: 201 })
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Database error' },
      { status: 500 }
    )
  }
}
