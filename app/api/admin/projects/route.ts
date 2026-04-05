import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { isAdmin } from '@/lib/admin-auth'

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const rows = await sql`
      SELECT p.id, p.name, p.slug, p.elevator_pitch, p.url, p.substack_url,
             p.active, p.open, p.created_at,
             COUNT(fp.id)::int AS fellows_count
      FROM projects p
      LEFT JOIN fellow_projects fp ON fp.project_id = p.id
      GROUP BY p.id
      ORDER BY p.name ASC
    `
    return NextResponse.json(rows)
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Database error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { name, slug, elevator_pitch, url, substack_url, active, open } = body

    if (!name || !slug || !elevator_pitch || !url) {
      return NextResponse.json({ error: 'Name, slug, elevator pitch, and URL are required' }, { status: 400 })
    }

    const existing = await sql`SELECT id FROM projects WHERE slug = ${slug} LIMIT 1`
    if (existing.length > 0) {
      return NextResponse.json({ error: 'A project with this slug already exists' }, { status: 409 })
    }

    const rows = await sql`
      INSERT INTO projects (name, slug, elevator_pitch, url, substack_url, active, open)
      VALUES (${name}, ${slug}, ${elevator_pitch}, ${url}, ${substack_url || null}, ${active ?? true}, ${open ?? true})
      RETURNING id, name, slug
    `

    return NextResponse.json(rows[0], { status: 201 })
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Database error' }, { status: 500 })
  }
}
