import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { dashboardAccess } from '@/lib/dashboard-auth'
import { put } from '@vercel/blob'
import { identityWriteAccess, auditStatement, revokeWorkSessions, selfChangeDenied } from '@/lib/identity-admin'

// Edit a member's profile, email, status and project/PM assignments.
// Timesheets off: owner admin (as before). Timesheets on: a named identity admin,
// never on their own account; an email or status change ends the member's
// work-record sessions; the change and its audit row commit together.
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const access = await identityWriteAccess(req, async () => await dashboardAccess(req, 'identity-admin'))
  if (!access.ok) return access.response
  const admin = access.admin

  try {
    const { id } = await params
    if (admin && id === admin.fellowId) return selfChangeDenied()
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
    } else {
      body = await req.json()
    }

    const {
      name, email, bio, photo_url, status, joined_date,
      linkedin_url, employer, employer_role, willing_to_be_contacted,
      project_ids, pm_project_id,
    } = body as Record<string, string | boolean | string[] | null | undefined>

    const before = (await sql`SELECT email, status FROM fellows WHERE id = ${id} LIMIT 1`)[0] as { email: string; status: string } | undefined
    if (!before) return NextResponse.json({ error: 'Fellow not found' }, { status: 404 })

    // Update fellow fields
    const statements = [sql`
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
        willing_to_be_contacted = COALESCE(${willing_to_be_contacted as boolean ?? null}, willing_to_be_contacted)
      WHERE id = ${id}
    `]

    // Update project assignments if provided
    if (Array.isArray(project_ids)) {
      statements.push(sql`DELETE FROM fellow_projects WHERE fellow_id = ${id}`)
      for (const projectId of project_ids as string[]) {
        const role = projectId === pm_project_id ? 'pm' : 'fellow'
        statements.push(sql`
          INSERT INTO fellow_projects (fellow_id, project_id, role)
          VALUES (${id}, ${projectId}, ${role})
        `)
      }
    }

    if (admin) {
      const emailChanged = typeof email === 'string' && email !== before.email
      const statusChanged = typeof status === 'string' && status !== before.status
      if (emailChanged || statusChanged) statements.push(revokeWorkSessions(id))
      statements.push(auditStatement(admin, 'edit', id, {
        fields: Object.keys(body).filter((k) => !['project_ids', 'pm_project_id'].includes(k)).sort(),
        email_changed: emailChanged,
        status: statusChanged ? status : undefined,
        projects: Array.isArray(project_ids) ? project_ids : undefined,
        pm_project_id: Array.isArray(project_ids) ? (pm_project_id || null) : undefined,
      }))
    }
    await sql.transaction(statements)

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
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const access = await identityWriteAccess(req, async () => await dashboardAccess(req, 'identity-admin'))
  if (!access.ok) return access.response
  const admin = access.admin

  try {
    const { id } = await params
    if (admin) {
      // While timesheets are on, members are never hard-deleted: their sign-ins and
      // work records must stay attributable. Setting status to alumni removes access
      // (and ends their sessions) instead.
      return NextResponse.json(
        { error: 'Members are not deleted while timesheets are on. Set their status to alumni instead.' },
        { status: 409, headers: { 'Cache-Control': 'private, no-store' } },
      )
    }
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
