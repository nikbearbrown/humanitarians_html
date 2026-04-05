import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { getFellowFromSession } from '@/lib/fellow-auth'

export async function GET(req: NextRequest) {
  const fellow = await getFellowFromSession(req)
  if (!fellow) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const rows = await sql`
      SELECT id, fellow_id, project_id, content, created_at
      FROM reports
      WHERE fellow_id = ${fellow.id}
      ORDER BY created_at DESC
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
    const { project_id, content } = await req.json()

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

    const rows = await sql`
      INSERT INTO reports (fellow_id, project_id, content)
      VALUES (${fellow.id}, ${project_id || null}, ${content})
      RETURNING id, created_at
    `

    return NextResponse.json(rows[0], { status: 201 })
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Database error' },
      { status: 500 }
    )
  }
}
