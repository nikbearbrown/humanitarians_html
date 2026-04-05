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
      SELECT id, name, slug, elevator_pitch, url, substack_url, active, open, created_at
      FROM projects WHERE id = ${id} LIMIT 1
    `
    if (rows.length === 0) return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    return NextResponse.json(rows[0])
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Database error' }, { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await params
    const body = await req.json()
    const { name, slug, elevator_pitch, url, substack_url, active, open } = body

    const rows = await sql`
      UPDATE projects SET
        name = COALESCE(${name ?? null}, name),
        slug = COALESCE(${slug ?? null}, slug),
        elevator_pitch = COALESCE(${elevator_pitch ?? null}, elevator_pitch),
        url = COALESCE(${url ?? null}, url),
        substack_url = ${substack_url ?? null},
        active = COALESCE(${active ?? null}, active),
        open = COALESCE(${open ?? null}, open)
      WHERE id = ${id}
      RETURNING id, name, slug, elevator_pitch, url, substack_url, active, open, created_at
    `
    if (rows.length === 0) return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    return NextResponse.json(rows[0])
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Database error' }, { status: 500 })
  }
}
