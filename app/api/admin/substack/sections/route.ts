import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { isSuperAdmin } from '@/lib/admin-auth'

export async function GET() {
  if (!(await isSuperAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try { const data = await sql`SELECT * FROM substack_sections ORDER BY created_at DESC`; return NextResponse.json(data) } catch (error: unknown) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Database error' }, { status: 500 }) }
}

export async function POST(req: NextRequest) {
  if (!(await isSuperAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { title, slug, description, substack_url } = body
  if (!title || !slug || !substack_url) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  try { const rows = await sql`INSERT INTO substack_sections (title, slug, description, substack_url) VALUES (${title}, ${slug}, ${description || null}, ${substack_url}) RETURNING *`; return NextResponse.json(rows[0]) } catch (error: unknown) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Database error' }, { status: 500 }) }
}
