# Human-approved migration, backfill and rollback plan

> **Step-by-step database runbook:** [MIGRATIONS.md](MIGRATIONS.md) (preflight check, verified backup, apply order, role grants, tested rollback scripts).

Status: code and synthetic tests only. No production migration, import, role grant, notification or deployment has been performed. `TIMESHEETS_ENABLED` defaults closed; the application must not enable it automatically.

## Before approving rollout

1. Review the branch and `DESIGN.md`, including whether board view may include drafts and historical inactive members. Confirm the actual fellows who supervise each project. Audit existing addresses, PM/board assignments and credential provenance. Establish fellow-controlled credentials through a separately approved process before enabling. A shared admin secret is not a role assignment.
2. Confirm the authoritative production revision and database schema with a read-only inspection. Check migration number 004 for conflicts. Obtain a recoverable database snapshot and verify restoration in an isolated staging environment.
3. Review applicable record-retention, correction, signatory and jurisdiction requirements with qualified human advisers. The factual attestations are not a claim of legal compliance.
4. Identify the application's server database principal without copying its credentials into chat or files. The migration uses SECURITY INVOKER functions and revokes PUBLIC privileges on new tables/functions. The application principal must receive only the reviewed table/sequence/function permissions needed by these queries. If migration and application use different roles, the database owner must explicitly grant access; absence must remain a 503/denial, not a fallback to shared admin.
5. Run the actual migration in staging, verify fresh install and backup restoration, then run application tests with separate production-like PostgreSQL connections and synthetic accounts. Validate request origin handling through the real proxy/domain, cookie security and session revocation, caching and telemetry behavior. Never use real performance notes in a public preview.

## Approved execution sequence (not executed)

- Keep `TIMESHEETS_ENABLED=false` during deployment and database work. The new Ledger APIs and UI fail closed until ready. Deploying this code freezes legacy Ledger writes. Enabling the flag also stops the shared admin password from making fellow create/import/edit/delete/password-reset changes before side effects; a named identity admin with an individual grant does them instead (see [IDENTITY-ADMIN.md](IDENTITY-ADMIN.md), migration 008). Communicate that cutover separately with explicit authorization.
- Have the authorized operator apply `sql/004_evidence_timesheets.sql` once in a transaction. It creates new tables/functions/triggers only. It must not be run by an app startup hook or browser request. Review execution rights for the server principal, including the `timesheet_events` identity sequence and `timesheet_command`, `timesheet_can_read`, `timesheet_can_read_project`, `timesheet_validate_entries` functions, plus session-table SELECT/INSERT/UPDATE.
- Then apply `sql/007_timesheet_daily_total.sql` once, the same way. It adds one trigger function (`timesheet_check_daily_total`) on `timesheet_versions`; it changes no data.
- Do **not** convert, copy, attest or approve legacy hours. No automatic backfill is needed. Compare pre/post counts of legacy tables; the migration must leave them identical.
- Review any proposed `timesheet_board_viewers` records as a separate access-grant action: identified existing fellow ID, named approving person, grant reason and date. Table starts empty; no default board identities, name matching or email-domain grants. Existing PM assignments also require a human-approved audit, not guessed role mapping.
- Require fresh password sign-in after cutover: old signed fellow cookies do not authorize work records. Work-record tokens expire after 12 hours, are revoked at sign-out/account switch, and become invalid after a password change. Review approved cleanup/retention for expired session rows separately; never delete timesheet records as session cleanup.
- Enable the feature only after approval, staging checks and access validation. Then verify signed-out rejection, fellow-own access, PM team scope, no self-approval, board read-only scope, no public report leakage, and export caching headers.
- Send any cutover/access notices only after explicit approval of recipients and message. This branch sends none.

## Rollback

- First set `TIMESHEETS_ENABLED=false` to stop new Ledger operations safely. Retain all new and legacy tables, versions, approvals, history and receipts. This flag also restores the old shared-admin account-management paths; do not re-enable timesheets without repeating the credential/address/assignment audit, or maintain a separately approved identity-change freeze throughout rollback.
- Roll back UI/application code only to a reviewed build that preserves the new tables and private scopes. Do not re-enable the older unrestricted PM list or legacy manager-entry writes as an automatic fallback.
- Diagnose with synthetic copies. Take another protected snapshot before repair. Never restore an old database snapshot over newly submitted/approved records without a human-approved reconciliation plan.
- Do not DROP the migration tables as a routine rollback. If no records exist and a true schema rollback is needed, a DBA should review the dependency-aware removal separately. Any removal after real submissions is a retention/destruction decision requiring separate approval.

No command here requires the nontechnical user to operate a terminal. The agent/operator performs an approved rollout; approval is for a concrete reviewed release and named access changes.
