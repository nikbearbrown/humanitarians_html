// lib/identity-admin.ts
// Account administration (create/import members, edit email/status/profile,
// project and PM assignments, password resets, deletion).
//
// TIMESHEETS_ENABLED off (today's site): unchanged. The owner admin, through
//   dashboardAccess(req, 'identity-admin'), may do all of it.
// TIMESHEETS_ENABLED on: the shared admin password may not, because nobody could
//   tell which of the people who know it changed whose access, and a known
//   temporary password would let them sign in as that fellow and submit hours.
//   Instead a NAMED fellow may, when all of these hold:
//     - signed in with their own password (a timesheet work-record session, which
//       dies at sign-out, after 12 hours, or when their password changes);
//     - an unrevoked, unexpired row in identity_admin_grants (sql/008), created
//       by the database owner; there is no web endpoint that grants it;
//     - same-origin request.
//   They never see or set anyone's password: new accounts and resets get an
//   unusable random password and the fellow sets their own with "Forgot password?".
//   They may not change their own account or assignments here, and members are
//   marked alumni rather than deleted. Every change is written to
//   identity_admin_audit (actor, grant, action, target; never passwords or bodies).

import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { sameOriginMutation } from '@/lib/developer-access-core'
import { getTimesheetActor, getTimesheetActorFromCookies } from '@/lib/timesheets/session'

export type IdentityAdmin = { fellowId: string; grantId: string; name: string }
export type IdentityAction = 'create' | 'import' | 'edit' | 'reset-password'
export type IdentityAccess =
  | { ok: true; admin: IdentityAdmin | null } // admin null: owner path while timesheets are off
  | { ok: false; response: NextResponse }

const noStore = { 'Cache-Control': 'private, no-store' }
export const timesheetsOn = () => process.env.TIMESHEETS_ENABLED === 'true'

async function grantFor(fellow: { id: string; name: string } | null): Promise<IdentityAdmin | null> {
  if (!fellow) return null
  const rows = await sql`
    SELECT g.id FROM identity_admin_grants g JOIN fellows f ON f.id = g.fellow_id
    WHERE g.fellow_id = ${fellow.id}::uuid AND g.revoked_at IS NULL AND g.expires_at > now()
      AND f.status = 'current' LIMIT 1`
  return rows.length ? { fellowId: fellow.id, grantId: String(rows[0].id), name: fellow.name } : null
}

// The named identity admin behind this request, or null. Fails closed on any error.
export async function identityAdmin(req: NextRequest): Promise<IdentityAdmin | null> {
  if (!timesheetsOn() || !sameOriginMutation(req)) return null
  try { return await grantFor(await getTimesheetActor(req)) } catch { return null }
}
// Same, for server components (dashboard layout).
export async function identityAdminFromCookies(): Promise<IdentityAdmin | null> {
  if (!timesheetsOn()) return null
  try { await cookies(); return await grantFor(await getTimesheetActorFromCookies()) } catch { return null }
}

// Gate for every account-administration handler.
export async function identityWriteAccess(req: NextRequest, ownerAllowed: () => Promise<boolean>): Promise<IdentityAccess> {
  if (!timesheetsOn()) {
    return (await ownerAllowed())
      ? { ok: true, admin: null }
      : { ok: false, response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  }
  const admin = await identityAdmin(req)
  if (admin) return { ok: true, admin }
  return {
    ok: false,
    response: NextResponse.json(
      { error: 'While evidence timesheets are on, account changes need your own sign-in and an identity-admin grant. The shared admin password cannot make them.' },
      { status: 403, headers: noStore },
    ),
  }
}

export function selfChangeDenied(): NextResponse {
  return NextResponse.json(
    { error: 'You cannot change your own account, status or project roles here. Ask another identity admin.' },
    { status: 403, headers: noStore },
  )
}

// One audit row; returned as a statement so callers can put it in the same transaction.
export function auditStatement(admin: IdentityAdmin, action: IdentityAction, targetId: string | null, detail: Record<string, unknown> = {}) {
  return sql`INSERT INTO identity_admin_audit(actor_id, grant_id, action, target_id, detail)
    VALUES (${admin.fellowId}::uuid, ${admin.grantId}::uuid, ${action}, ${targetId}, ${JSON.stringify(detail)}::jsonb)`
}

// Sign the member out of work records (email/status/password changes).
export function revokeWorkSessions(fellowId: string) {
  return sql`UPDATE timesheet_sessions SET revoked_at = now() WHERE fellow_id = ${fellowId}::uuid AND revoked_at IS NULL`
}

export const ACTIVATION_NOTE = 'No password is shown. The member sets their own with "Forgot password?" on the fellow sign-in page.'
