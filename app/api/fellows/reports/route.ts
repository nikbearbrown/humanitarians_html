import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { getFellowFromSession } from '@/lib/fellow-auth'

// Monday of the work week containing the given date.
function mondayOf(date: Date): string {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  // getDay(): Sunday=0, Monday=1, ... Saturday=6. Treat Sunday as end of previous work week.
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  return d.toISOString().slice(0, 10) // YYYY-MM-DD
}

export async function GET(req: NextRequest) {
  const fellow = await getFellowFromSession(req)
  if (!fellow) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const rows = await sql`
      SELECT id, fellow_id, project_id, content, filed_date, created_at
      FROM reports
      WHERE fellow_id = ${fellow.id}
      ORDER BY filed_date DESC, created_at DESC
    `
    return NextResponse.json(rows)
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Database error' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  const fellow = await getFellowFromSession(req)
  if (!fellow) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { project_id, content, filed_date } = await req.json()

    if (!content || content.length < 100) {
      return NextResponse.json(
        { error: 'Report content must be at least 100 characters' },
        { status: 400 }
      )
    }

    // If project_id provided, verify the fellow is assigned to it
    if (project_id) {
      const assignment = await sql`
        SELECT id FROM fellow_projects
        WHERE fellow_id = ${fellow.id} AND project_id = ${project_id}
        LIMIT 1
      `
      if (assignment.length === 0) {
        return NextResponse.json(
          { error: 'You are not assigned to this project' },
          { status: 403 }
        )
      }
    }

    // Normalize filed_date to the Monday of the chosen work week.
    // If not provided, default to the Monday of this week.
    let workWeek: string
    if (filed_date && /^\d{4}-\d{2}-\d{2}$/.test(filed_date)) {
      workWeek = mondayOf(new Date(filed_date))
    } else {
      workWeek = mondayOf(new Date())
    }

    const rows = await sql`
      INSERT INTO reports (fellow_id, project_id, content, filed_date)
      VALUES (${fellow.id}, ${project_id || null}, ${content}, ${workWeek})
      RETURNING id, filed_date, created_at
    `

    return NextResponse.json(rows[0], { status: 201 })
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Database error' },
      { status: 500 }
    )
  }
}
