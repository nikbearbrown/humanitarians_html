// lib/email-change.ts
// Email changes made by an identity admin while TIMESHEETS_ENABLED is on.
//
// Risk (review finding #2): an admin sets a member's email to an address they
// control, then uses "Forgot password?" to receive the reset link and sign in as
// that member, who may be a PM able to approve hours. The audit log would record
// it but not prevent it. So:
//
//  1. Sensitive accounts are out of scope for identity admins: a PM on any
//     project, an active board viewer, an active identity admin or an active
//     developer. Their email can only be changed by the owner (documented SQL).
//  2. For every other member the change is only a REQUEST. fellows.email stays
//     the same, so reset links keep going to the current address, until the
//     member confirms from that current address. The link only shows a page; the
//     change happens on an explicit POST, so mail scanners that open links cannot
//     confirm it. Requests expire after 48 hours; a new request replaces an open one.
//  3. Confirmation ends the member's work-record sessions and is audited.
//
// If the member has lost access to their current address, an identity admin
// cannot help; the owner changes it after verifying the member another way.

import crypto from 'crypto'
import { sql } from '@/lib/db'
import { auditStatement, type IdentityAdmin } from '@/lib/identity-admin'
import { mailConfigured, sendMail } from '@/lib/mail'

// Indirection so tests can capture the confirmation email instead of sending it.
export const emailChangeMailer = { configured: mailConfigured, send: sendMail }

export const EMAIL_CHANGE_HOURS = 48
const digest = (token: string) => crypto.createHash('sha256').update(token).digest('hex')
export const normalEmail = (value: unknown) => String(value ?? '').trim().toLowerCase()
export const validEmail = (value: string) => value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

// Why this account's email is reserved for the owner, or null if it is not.
export async function sensitiveReason(fellowId: string): Promise<string | null> {
  const rows = await sql`
    SELECT
      EXISTS (SELECT 1 FROM fellow_projects WHERE fellow_id = ${fellowId}::uuid AND role = 'pm') AS pm,
      EXISTS (SELECT 1 FROM timesheet_board_viewers WHERE fellow_id = ${fellowId}::uuid AND revoked_at IS NULL) AS board,
      EXISTS (SELECT 1 FROM identity_admin_grants WHERE fellow_id = ${fellowId}::uuid AND revoked_at IS NULL AND expires_at > now()) AS identity_admin,
      EXISTS (SELECT 1 FROM developer_grants WHERE fellow_id = ${fellowId}::uuid AND revoked_at IS NULL AND expires_at > now()) AS developer`
  const r = rows[0] as Record<string, boolean>
  if (r.pm) return 'a project manager'
  if (r.board) return 'a board viewer'
  if (r.identity_admin) return 'an identity administrator'
  if (r.developer) return 'a developer'
  return null
}

// Statements that open a request (replacing any open one) plus its audit row, and
// the token to email. The caller runs them in its transaction, then sends the mail.
export function emailChangeStatements(admin: IdentityAdmin, fellowId: string, oldEmail: string, newEmail: string) {
  const token = crypto.randomBytes(32).toString('hex')
  const statements = [
    sql`UPDATE fellow_email_changes SET cancelled_at = now()
        WHERE fellow_id = ${fellowId}::uuid AND confirmed_at IS NULL AND cancelled_at IS NULL`,
    sql`INSERT INTO fellow_email_changes (fellow_id, old_email, new_email, token_hash, requested_by, grant_id, expires_at)
        VALUES (${fellowId}::uuid, ${oldEmail}, ${newEmail}, ${digest(token)}, ${admin.fellowId}::uuid, ${admin.grantId}::uuid,
                now() + make_interval(hours => ${EMAIL_CHANGE_HOURS}))`,
  ]
  return { token, statements }
}

export function emailChangeMail(base: string, name: string, oldEmail: string, newEmail: string, token: string) {
  const link = `${base}/fellows/confirm-email?token=${encodeURIComponent(token)}`
  const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)
  return {
    to: oldEmail,
    subject: 'Confirm the change to your Humanitarians AI email',
    text: `Hi ${name},\n\nAn administrator asked to change the email on your Humanitarians AI fellow account to:\n\n  ${newEmail}\n\nNothing changes unless you confirm. To confirm, open this link and press "Confirm" (expires in ${EMAIL_CHANGE_HOURS} hours):\n\n${link}\n\nIf you did not expect this, do not confirm. Ignore this email and tell HR.`,
    html: `<p>Hi ${esc(name)},</p><p>An administrator asked to change the email on your Humanitarians AI fellow account to <strong>${esc(newEmail)}</strong>.</p><p>Nothing changes unless you confirm. <a href="${esc(link)}">Review and confirm the change</a> (expires in ${EMAIL_CHANGE_HOURS} hours).</p><p>If you did not expect this, do not confirm. Ignore this email and tell HR.</p>`,
  }
}

type OpenRequest = { id: string; fellow_id: string; old_email: string; new_email: string; requested_by: string; grant_id: string }

async function openRequest(token: unknown): Promise<OpenRequest | null> {
  if (typeof token !== 'string' || !/^[a-f0-9]{64}$/.test(token)) return null
  const rows = await sql`
    SELECT c.id::text, c.fellow_id::text, c.old_email, c.new_email, c.requested_by::text, c.grant_id::text
    FROM fellow_email_changes c JOIN fellows f ON f.id = c.fellow_id
    WHERE c.token_hash = ${digest(token)} AND c.confirmed_at IS NULL AND c.cancelled_at IS NULL
      AND c.expires_at > now() AND f.email = c.old_email AND f.status = 'current' LIMIT 1`
  return (rows[0] as OpenRequest | undefined) ?? null
}

// For the confirmation page: what would change, or null if the link is not usable.
export async function describeEmailChange(token: unknown): Promise<{ newEmail: string } | null> {
  const r = await openRequest(token)
  return r ? { newEmail: r.new_email } : null
}

// Applies the change. 'invalid': expired, used, replaced, or the email already
// changed some other way. 'taken': another account now uses the new address.
export async function confirmEmailChange(token: unknown): Promise<'confirmed' | 'invalid' | 'taken'> {
  const r = await openRequest(token)
  if (!r) return 'invalid'
  const taken = await sql`SELECT 1 FROM fellows WHERE lower(email) = ${r.new_email} AND id <> ${r.fellow_id}::uuid LIMIT 1`
  if (taken.length) return 'taken'
  const admin: IdentityAdmin = { fellowId: r.requested_by, grantId: r.grant_id, name: '' }
  try {
    await sql.transaction([
      // Both updates re-check their conditions inside the transaction.
      sql`UPDATE fellows SET email = ${r.new_email}
          WHERE id = ${r.fellow_id}::uuid AND email = ${r.old_email} AND status = 'current'
            AND EXISTS (SELECT 1 FROM fellow_email_changes WHERE id = ${r.id}::uuid
                        AND confirmed_at IS NULL AND cancelled_at IS NULL AND expires_at > now())`,
      sql`UPDATE fellow_email_changes SET confirmed_at = now()
          WHERE id = ${r.id}::uuid AND confirmed_at IS NULL AND cancelled_at IS NULL AND expires_at > now()`,
      // Abort the whole transaction (division by zero, 22012) unless the email really
      // changed under this request, so sessions and audit are never touched otherwise.
      sql`SELECT 1 / (SELECT count(*)::int FROM fellow_email_changes c JOIN fellows f ON f.id = c.fellow_id
                      WHERE c.id = ${r.id}::uuid AND c.confirmed_at IS NOT NULL AND f.email = c.new_email) AS ok`,
      sql`UPDATE timesheet_sessions SET revoked_at = now() WHERE fellow_id = ${r.fellow_id}::uuid AND revoked_at IS NULL`,
      auditStatement(admin, 'email-confirmed', r.fellow_id, { confirmed_by: 'member' }),
    ])
    return 'confirmed'
  } catch (error) {
    const code = (error as { code?: string })?.code
    if (code === '23505') return 'taken' // another account took the address meanwhile
    if (code === '22012') return 'invalid'
    throw error
  }
}

export function appBase(origin: string) {
  return process.env.APP_URL || (process.env.NODE_ENV === 'production' ? 'https://www.humanitarians.ai' : origin)
}
