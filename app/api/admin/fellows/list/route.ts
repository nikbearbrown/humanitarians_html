import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { isAdmin } from '@/lib/admin-auth'

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const rows = await sql`
      SELECT f.id, f.name, f.slug, f.email, f.status, f.joined_date,
             COUNT(fp.id)::int AS project_count
      FROM fellows f
      LEFT JOIN fellow_projects fp ON fp.fellow_id = f.id
      GROUP BY f.id
      ORDER BY f.name ASC
    `
    return NextResponse.json(rows)
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Database error' },
      { status: 500 }
    )
  }
}
