# Account administration while timesheets are on

**Problem.** Once `TIMESHEETS_ENABLED` is on, timesheets are signed records: a fellow attests their hours and a PM approves them. The shared admin password can't be allowed to change accounts after that, for two reasons:

- Several people know it, so nobody could tell who changed whose access.
- Its password reset shows a temporary password. Whoever saw it could sign in as that fellow and submit or approve hours in their name.

Freezing the shared path entirely (PR #15) stopped HR from adding volunteers, fixing emails and assigning PMs.

**Solution.** The same operations stay available to a **named person** with an **individual grant**, and every change is recorded.

## Who can do what

| | Timesheets **off** (today) | Timesheets **on** |
|---|---|---|
| Shared admin password | Everything, as today | Read-only for accounts |
| Named identity admin (own sign-in + grant) | — | Create and import members, edit profile/email/status, project and PM assignments, start password resets, read the roster |
| Developer role | View-only for accounts | View-only for accounts |

## Rules for the identity admin

1. **Signed in as themselves.** They use the normal fellow sign-in with their own password. The session ends at sign-out, after 12 hours, or when their password changes.
2. **Explicit grant.** They need an unrevoked, unexpired row in `identity_admin_grants`. There is no web page or API that creates one; the database owner adds it.
3. **Never handle passwords.** New members and password resets get an unusable random password that nobody sees. The member sets their own with **"Forgot password?"**. A reset also ends the member's work-record and developer sessions (see [Sessions](#sessions-what-ends-what)).
4. **Can't change their own account.** No email, status, password or project/PM role changes on themselves. Another identity admin has to do it.
5. **Emails cannot be redirected (account takeover).** Changing someone's email and then using "Forgot password?" would hand their account to whoever controls the new address. So:
   - **Sensitive accounts are owner-only.** An identity admin cannot change the email of a PM on any project, a board viewer, another identity admin or a developer, or of someone being made a PM in the same change. The whole request is refused and nothing is saved.
   - **For every other member, an email change is only a request.** The address does not change, so reset emails keep going to the current address. A confirmation link is sent **to the current address**, and the email changes only when the member opens it and presses **Confirm** (a POST, so mail scanners that open links can't confirm it). Requests expire after 48 hours, and a newer request replaces an older one. Confirming ends the member's work-record and developer sessions and is audited.
   - If the confirmation email can't be sent, the request is cancelled and the admin is told. Other fields in the same edit are still saved.
   - **Member lost access to their old address?** An identity admin can't help. The owner changes it after verifying the member another way (see the SQL below).
6. **A status change ends the member's work-record and developer sessions,** so they sign in again for timesheets.
7. **No hard deletes.** Members are set to **alumni** instead, which removes their access. This keeps work records and sign-ins attributable.
8. **Every change is audited.** One row in `identity_admin_audit` records who acted, under which grant, what kind of change, on whom, and when. It also records which fields changed and the new project/PM roles. It never stores passwords, emails or request bodies.
   - The audit row commits in the same transaction as the change, so there is never a change without an audit row.
   - The audit table is append-only.
9. **Same-origin requests only** (CSRF protection), and any error fails closed.

## Sessions: what ends what

There are three separate sign-in mechanisms. The new controls apply to the first two only.

| Session (cookie) | What it allows | Ends when |
|---|---|---|
| **Work record** (`timesheet_session`, server-side, 12 h) | Timesheets; the Ledger while timesheets are on; identity administration | Sign-out, account switch, 12 hours, any password change (including an admin reset), a confirmed email change, a status change by an identity admin |
| **Developer** (`developer_session`, server-side, 8 h) | The developer dashboard role | Sign-out, 8 hours, grant revoked or expired, any password, email or status change (database trigger from 006) |
| **Legacy fellow** (`fellow_session`, signed cookie, 30 days, no server record) | The member's own profile page, weekly reports and video submissions; the existing Ledger while timesheets are **off** | Sign-out in that browser, or after 30 days. **Not** ended by a password reset, email change, status change or grant revocation, because nothing is stored on the server to revoke |

The legacy cookie never authorizes timesheets, the Ledger while timesheets are on, or any account administration; those require a work-record session. To end every legacy cookie at once, for example after a suspected compromise, rotate `FELLOW_SESSION_SECRET` in Vercel and redeploy. That signs every fellow out of the legacy pages, and they sign in again. Making legacy sessions individually revocable would need a server-side session table; that is not part of this PR.

## Database (migration `sql/008_identity_admin.sql`)

008 adds three tables:
- `identity_admin_grants`: who, granted by, reason, expiry, one-way revocation. Rows can't be deleted, and only revocation can change a row; both are enforced by a trigger.
- `identity_admin_audit`: append-only.
- `fellow_email_changes`: email-change requests (old and new address, a digest of the confirmation token, requester, expiry, confirmed or cancelled). Never deleted.

Granting, revoking or deleting a grant is recorded in the audit table too. 008 needs 004 first and refuses to run twice. Its rollback (`sql/rollback/008_down.sql`) refuses once any grant or audit row exists.

## Granting and revoking (database owner, Neon SQL Editor)

```sql
-- 1. Find the person's exact fellow id (check the name and email by eye).
SELECT id, name, email, status FROM fellows WHERE lower(email) = lower('person@example.org');

-- 2. Grant: always with an expiry date. Must affect exactly 1 row.
INSERT INTO identity_admin_grants (fellow_id, granted_by, reason, expires_at)
SELECT id, 'Nik Bear Brown', 'HR roster administration', now() + interval '90 days'
FROM fellows WHERE id = '<fellow id from step 1>' AND status = 'current';

-- Revoke (takes effect on their next request; history is kept):
UPDATE identity_admin_grants SET revoked_at = now(), revoked_by = 'Nik Bear Brown'
WHERE fellow_id = '<fellow id>' AND revoked_at IS NULL;

-- Owner only: change a SENSITIVE account's email (PM, board viewer, identity admin,
-- developer), or any member who lost their old mailbox, AFTER verifying the person
-- another way (video call, known phone). Ends their sessions. Must affect exactly 1 row.
UPDATE fellows SET email = lower('new.address@example.org')
WHERE id = '<fellow id>' AND status = 'current';
UPDATE timesheet_sessions SET revoked_at = now() WHERE fellow_id = '<fellow id>' AND revoked_at IS NULL;

-- Review recent changes:
SELECT a.created_at, actor.name AS by, a.action, target.name AS member, a.detail
FROM identity_admin_audit a
LEFT JOIN fellows actor ON actor.id = a.actor_id
LEFT JOIN fellows target ON target.id = a.target_id
ORDER BY a.id DESC LIMIT 50;
```

The person signs in again at `/fellows/login` and opens `/admin/dashboard/fellows`.

Suggested setup: one or two HR people, each with a 90-day grant, renewed deliberately.

## Tested

`tests/timesheets/identity-admin.test.ts` (real route handlers, synthetic database) checks:

- Without a grant, a fellow or PM gets 403 and nothing changes. A revoked grant, a cross-site request or no sign-in is refused.
- Create with a PM role and CSV import return no password and write one audit row each.
- The roster is readable.
- Self-changes are refused, delete returns 409 ("set alumni"), and the record stays.
- A password reset changes the hash, ends the member's work-record session, returns no password and is audited.
- An email change ends sessions, updates roles, and the audit row contains no email address.
- With timesheets off, a grant on its own does nothing, and the owner path is unchanged.

`tests/timesheets/security.test.ts` confirms the shared admin password is still refused, with no side effects and no audit rows.

`tests/timesheets/migrations.test.ts` checks:

- The grants allow the app role to read grants and append audit rows, but not to create grants or edit the audit.
- The grant history and immutability rules hold.
- 008's rollback refuses once it has been used.
