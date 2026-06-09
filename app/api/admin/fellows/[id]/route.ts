import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { isSuperAdmin } from '@/lib/admin-auth'
import { put } from '@vercel/blob'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isSuperAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await params
    const contentType = req.headers.get('content-type') || ''
    let body: Record<string, unknown>

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      body = Object.fromEntries(formData.entries())

      // Handle photo upload
      const photo = formData.get('photo') as File | null
      if (photo && photo.size > 0) {
        const blob = await put(`fellows/${id}/${photo.name}`, photo, { access: 'public' })
        body.photo_url = blob.url
      }
      delete body.photo

      // Parse project data from form
      if (typeof body.project_ids === 'string') {
        body.project_ids = JSON.parse(body.project_ids as string)
      }
      if (typeof body.willing_to_be_contacted === 'string') {
        body.willing_to_be_contacted = body.willing_to_be_contacted === 'true'
      }
      if (typeof body.is_admin === 'string') {
        body.is_admin = body.is_admin === 'true'
      }
    } else {
      body = await req.json()
    }

    const {
      name, email, bio, photo_url, status, joined_date,
      linkedin_url, employer, employer_role, willing_to_be_contacted,
      is_admin: isAdminFlag,
      project_ids, pm_project_id,
    } = body as Record<string, string | boolean | string[] | null | undefined>

    // Update fellow fields
    await sql`
      UPDATE fellows SET
        name = COALESCE(${name as string ?? null}, name),
        email = COALESCE(${email as string ?? null}, email),
        bio = ${bio as string ?? null},
        photo_url = COALESCE(${photo_url as string ?? null}, photo_url),
        status = COALESCE(${status as string ?? null}, status),
        joined_date = COALESCE(${joined_date as string ?? null}, joined_date),
        linkedin_url = ${linkedin_url as string ?? null},
        employer = ${employer as string ?? null},
        employer_role = ${employer_role as string ?? null},
        willing_to_be_contacted = COALESCE(${willing_to_be_contacted as boolean ?? null}, willing_to_be_contacted),
        is_admin = COALESCE(${isAdminFlag as boolean ?? null}, is_admin)
      WHERE id = ${id}
    `

    // Update project assignments if provided
    if (Array.isArray(project_ids)) {
      await sql`DELETE FROM fellow_projects WHERE fellow_id = ${id}`
      for (const projectId of project_ids as string[]) {
        const role = projectId === pm_project_id ? 'pm' : 'fellow'
        await sql`
          INSERT INTO fellow_projects (fellow_id, project_id, role)
          VALUES (${id}, ${projectId}, ${role})
        `
      }
    }

    // Return updated fellow (no password_hash)
    const rows = await sql`
      SELECT id, name, slug, email, bio, photo_url, status, joined_date,
             linkedin_url, employer, employer_role, willing_to_be_contacted, created_at
      FROM fellows WHERE id = ${id} LIMIT 1
    `
    if (rows.length === 0) return NextResponse.json({ error: 'Fellow not found' }, { status: 404 })

    return NextResponse.json(rows[0])
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Database error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isSuperAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await params
    const rows = await sql`DELETE FROM fellows WHERE id = ${id} RETURNING id`
    if (rows.length === 0) return NextResponse.json({ error: 'Fellow not found' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Database error' },
      { status: 500 }
    )
  }
}
