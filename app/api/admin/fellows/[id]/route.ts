import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { dashboardAccess } from '@/lib/dashboard-auth'
import { put } from '@vercel/blob'
import { identityWriteAccess, auditStatement, revokeWorkSessions, resolveTarget, canonicalUuid } from '@/lib/identity-admin'
import { appBase, emailChangeMail, emailChangeMailer, emailChangeStatements, normalEmail, sensitiveReason, validEmail } from '@/lib/email-change'

const noStore = { 'Cache-Control': 'private, no-store' }

// Edit a member's profile, email, status and project/PM assignments.
// Timesheets off: owner admin (as before). Timesheets on: a named identity admin,
// never on their own account; an email change is only a request the member confirms
// from their current address, and is refused for sensitive accounts; a status change
// ends the member's work-record sessions; changes and audit rows commit together.
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const access = await identityWriteAccess(req, async () => await dashboardAccess(req, 'identity-admin'))
  if (!access.ok) return access.response
  const admin = access.admin

  try {
    // Canonical target ID (any accepted UUID spelling) and the self-change check,
    // before the body or any upload is read.
    const target = await resolveTarget((await params).id, admin)
    if ('response' in target) return target.response
    const id = target.id
    const contentType = req.headers.get('content-type') || ''
    let body: Record<string, unknown>
    let photo: File | null = null

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      body = Object.fromEntries(formData.entries())
      // The photo is uploaded only after the checks below pass.
      const file = formData.get('photo') as File | null
      if (file && file.size > 0) photo = file
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
      name, email, bio, status, joined_date,
      linkedin_url, employer, employer_role, willing_to_be_contacted,
      project_ids, pm_project_id,
    } = body as Record<string, string | boolean | string[] | null | undefined>
    let photo_url = body.photo_url as string | null | undefined

    const before = (await sql`SELECT name, email, status FROM fellows WHERE id = ${id} LIMIT 1`)[0] as { name: string; email: string; status: string } | undefined
    if (!before) return NextResponse.json({ error: 'Fellow not found' }, { status: 404 })

    // Timesheets on: an identity admin cannot set an email directly (review finding #2).
    // It becomes a request the member confirms from their current address, and is
    // refused outright for sensitive accounts (lib/email-change.ts).
    const requestedEmail = typeof email === 'string' && email.trim() ? normalEmail(email) : null
    const emailRequest = !!admin && requestedEmail !== null && requestedEmail !== normalEmail(before.email)
    if (admin && emailRequest && requestedEmail) {
      if (!validEmail(requestedEmail)) return NextResponse.json({ error: 'Enter a valid email address' }, { status: 400, headers: noStore })
      const reason = (await sensitiveReason(id)) || (pm_project_id ? 'being made a project manager in this change' : null)
      if (reason) {
        return NextResponse.json(
          { error: `This member is ${reason}. Only the owner can change their email. No changes were saved.` },
          { status: 403, headers: noStore },
        )
      }
      const taken = await sql`SELECT 1 FROM fellows WHERE lower(email) = ${requestedEmail} AND id <> ${id}::uuid LIMIT 1`
      if (taken.length) return NextResponse.json({ error: 'A fellow with this email already exists. No changes were saved.' }, { status: 409, headers: noStore })
      if (!emailChangeMailer.configured()) {
        return NextResponse.json({ error: 'Email changes need the mail service, which is not configured. No changes were saved.' }, { status: 503, headers: noStore })
      }
    }

    if (photo) {
      const blob = await put(`fellows/${id}/${photo.name}`, photo, { access: 'public' })
      photo_url = blob.url
    }

    // Update fellow fields. With an identity admin the email column is never written here.
    const directEmail = admin ? null : ((email as string) ?? null)
    const statements = [sql`
      UPDATE fellows SET
        name = COALESCE(${name as string ?? null}, name),
        email = COALESCE(${directEmail}, email),
        bio = ${bio as string ?? null},
        photo_url = COALESCE(${photo_url ?? null}, photo_url),
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

    let token: string | null = null
    if (admin) {
      const statusChanged = typeof status === 'string' && status !== before.status
      if (statusChanged) statements.push(revokeWorkSessions(id))
      if (emailRequest && requestedEmail) {
        const change = emailChangeStatements(admin, id, before.email, requestedEmail)
        token = change.token
        statements.push(...change.statements, auditStatement(admin, 'email-change-requested', id))
      }
      statements.push(auditStatement(admin, 'edit', id, {
        fields: Object.keys(body).filter((k) => !['project_ids', 'pm_project_id', 'email'].includes(k)).sort(),
        email_change_requested: emailRequest,
        status: statusChanged ? status : undefined,
        projects: Array.isArray(project_ids) ? project_ids : undefined,
        pm_project_id: Array.isArray(project_ids) ? (pm_project_id || null) : undefined,
      }))
    }
    await sql.transaction(statements)

    // The confirmation goes to the CURRENT address. If it cannot be sent, the
    // request is cancelled (the other changes stay saved) and the admin is told.
    let emailChange: 'pending' | 'not-sent' | undefined
    if (token && requestedEmail) {
      let sent = false
      try {
        sent = (await emailChangeMailer.send(emailChangeMail(appBase(req.nextUrl.origin), before.name, before.email, requestedEmail, token))) === 'sent'
      } catch { /* never log addresses, tokens or SMTP responses */ }
      if (!sent) {
        await sql`UPDATE fellow_email_changes SET cancelled_at = now()
          WHERE fellow_id = ${id}::uuid AND confirmed_at IS NULL AND cancelled_at IS NULL`
      }
      emailChange = sent ? 'pending' : 'not-sent'
    }

    // Return updated fellow (no password_hash)
    const rows = await sql`
      SELECT id, name, slug, email, bio, photo_url, status, joined_date,
             linkedin_url, employer, employer_role, willing_to_be_contacted, created_at
      FROM fellows WHERE id = ${id} LIMIT 1
    `
    if (rows.length === 0) return NextResponse.json({ error: 'Fellow not found' }, { status: 404 })

    if (emailChange === 'pending') {
      return NextResponse.json({ ...rows[0], email_change: 'pending',
        email_change_note: 'Saved. The email will change only after the member confirms from their current address.' })
    }
    if (emailChange === 'not-sent') {
      return NextResponse.json({ ...rows[0], email_change: 'not-sent',
        email_change_note: 'Other changes were saved, but the confirmation email could not be sent, so the email was not changed. Try again later.' }, { status: 502 })
    }
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
    const id = canonicalUuid((await params).id)
    if (!id) return NextResponse.json({ error: 'Fellow not found' }, { status: 404 })
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
