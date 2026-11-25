# Rollout policy

> **The release steps, their order and the rollback steps are in one place only: [MIGRATIONS.md](MIGRATIONS.md)** (Part A staging, Part B production). This page holds the policy decisions around them and contains no sequence of its own.

Status: code and synthetic tests only. No production migration, import, role grant, notification or deployment has been performed. `TIMESHEETS_ENABLED` defaults to off; the application never turns it on by itself.

## Decisions to make before Part B

1. **Reviewers and assignments.** Review the branch and `DESIGN.md`, including whether board view may include drafts and historical inactive members. Confirm the actual fellow who supervises each project, and audit existing addresses and PM/board assignments. A shared admin secret is not a role assignment.
2. **Records.** Review record-retention, correction and signatory requirements with qualified advisers. The factual attestations are not a claim of legal compliance.
3. **Access grants.** Board viewers and identity admins are separate, approved grants for a named existing fellow, with approver, reason and date (see `IDENTITY-ADMIN.md`). Both tables start empty: no default identities, name matching or email-domain grants.
4. **Notices.** Cutover and access notices go out only after the recipients and message are approved. This branch sends none.

## Rules that hold throughout

- **Legacy hours are not converted.** Manager-entered Ledger records are not copied, attested or approved as timesheets; no backfill is needed. While timesheets are off, the existing Ledger works exactly as before; once on, it remains as read-only history.
- **Account changes.** While timesheets are on, the shared admin password cannot change accounts; a named identity admin does (`IDENTITY-ADMIN.md`, migration 008).
- **Fresh sign-in after the switch.** Old signed fellow cookies do not authorize work records. What each kind of session allows, and what ends it, is in `IDENTITY-ADMIN.md`, "Sessions: what ends what".
- **The website never uses the owner role.** It connects as a separate least-privilege role (`MIGRATIONS.md`, steps A3 and B5); the owner's connection string is for the SQL editor only.
- **Rollback never destroys records.** Switching off keeps every table, version, approval and history row. Restoring an old snapshot over newly submitted or approved records needs a reconciliation plan approved by Nik. Session cleanup never deletes timesheet records.
