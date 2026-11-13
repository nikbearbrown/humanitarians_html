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
3. **Never handle passwords.** New members and password resets get an unusable random password that nobody sees. The member sets their own with **"Forgot password?"**. A reset also ends the member's current sessions.
4. **Can't change their own account.** No email, status, password or project/PM role changes on themselves. Another identity admin has to do it.
5. **Email or status changes end the member's sessions,** so they sign in again.
6. **No hard deletes.** Members are set to **alumni** instead, which removes their access. This keeps work records and sign-ins attributable.
7. **Every change is audited.** One row in `identity_admin_audit` records who acted, under which grant, what kind of change, on whom, and when. It also records which fields changed and the new project/PM roles. It never stores passwords, emails or request bodies.
   - The audit row commits in the same transaction as the change, so there is never a change without an audit row.
   - The audit table is append-only.
8. **Same-origin requests only** (CSRF protection), and any error fails closed.

## Database (migration `sql/008_identity_admin.sql`)

008 adds two tables:
- `identity_admin_grants`: who, granted by, reason, expiry, one-way revocation. Rows can't be deleted, and only revocation can change a row; both are enforced by a trigger.
- `identity_admin_audit`: append-only.

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
- A password reset changes the hash, ends the member's sessions, returns no password and is audited.
- An email change ends sessions, updates roles, and the audit row contains no email address.
- With timesheets off, a grant on its own does nothing, and the owner path is unchanged.

`tests/timesheets/security.test.ts` confirms the shared admin password is still refused, with no side effects and no audit rows.

`tests/timesheets/migrations.test.ts` checks:

- The grants allow the app role to read grants and append audit rows, but not to create grants or edit the audit.
- The grant history and immutability rules hold.
- 008's rollback refuses once it has been used.
