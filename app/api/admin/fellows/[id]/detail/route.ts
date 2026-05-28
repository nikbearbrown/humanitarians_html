import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { isAdmin } from '@/lib/admin-auth'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await params
    const rows = await sql`
      SELECT id, name, email, bio, photo_url, status, is_admin, is_super_admin,
             joined_date, linkedin_url, employer, employer_role,
             willing_to_be_contacted, created_at
      FROM fellows WHERE id = ${id} LIMIT 1
    `
    if (rows.length === 0) return NextResponse.json({ error: 'Fellow not found' }, { status: 404 })

    const fellow = rows[0] as Record<string, unknown>

    const projectRows = await sql`
      SELECT project_id, role FROM fellow_projects WHERE fellow_id = ${id}
    `

    return NextResponse.json({ ...fellow, projects: projectRows })
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Database error' },
      { status: 500 }
    )
  }
}
