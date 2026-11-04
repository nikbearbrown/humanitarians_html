# Timesheets with evidence — implementation checkpoint

This feature replaces manager-authored hours with fellow-authored weekly timesheets. The fellow supplies work dates, descriptions, precise minutes and external HTTPS evidence links. Submission records their personal attestation. An assigned project manager reviews each entry and evidence, discusses the timesheet with the fellow, then approves that version or returns it with a reason. Links support human review; their existence never proves hours or triggers approval.

## Scope and decisions

- One timesheet per fellow, project and Monday-starting week. No inferred GitHub identity or folder mapping. Fellows supply their own evidence links.
- H:MM and decimal hours are accepted only when they resolve to whole minutes. Store integer minutes, not floating point hours. At most 24 hours per day within one timesheet, 100 entries per sheet, 10 links per entry. Cross-project overlap is not yet detected; supervisors should check it.
- Empty/zero-hour drafts are permitted. Submission requires a positive duration, description and at least one evidence URL on every entry. No work means do not fabricate an entry. No zero-work attestation is implemented in this slice.
- No on-behalf entry path. A manager cannot author, alter or attest a fellow's timesheet. A manager recording their own work needs another assigned manager to approve; there is no self-approval or board override.
- Draft → submitted → approved/returned. Returned and approved versions remain immutable. A reasoned correction creates a new numbered draft; personal submission and review are required again. A submitted version must be returned by a supervisor before correction. No retroactive approval of legacy data.
- The public `reports` learning-report workflow is unchanged. Timesheets and evidence have separate tables and private API responses.
- The review queue is the delivery mechanism. No email, reminder, invitation or external notification is sent or scheduled.
- This is a factual work-record and review workflow, not a representation of statutory, immigration or payroll compliance. Applicable retention, signatory and jurisdiction requirements need separate qualified review.

## Access model

Every new API requires a dedicated work-record session issued only after a fresh password login. It is an opaque 256-bit random token; only its digest is stored in `timesheet_sessions`. The server enforces a 12-hour expiry, current-account status and binding to the current password hash. Logout revokes the token server-side; every successful login clears/revokes the previous token before optionally issuing a new one. Legacy fellow cookies and the shared owner/admin cookie cannot upgrade into this session. Membership is checked on reads, mutations and exports, not copied into a long-lived role cookie. Login and work-record mutations require same-origin JSON.

While enabled, the older shared-admin fellow create/import/edit/delete/password-reset routes are frozen before side effects: a shared admin credential must not be able to act as an individual fellow or reviewer. This is an intentional cutover restriction, not a new individual-admin workflow. Credential provenance and existing email/role assignments need a human-approved audit before rollout. No actual credentials or grants were changed.

| Actor | Access |
|---|---|
| Current fellow, assigned to project | Own timesheets; draft edits and own attestation |
| Current assigned PM | Read that project's fellows' records; approve/return submitted versions other than their own |
| Current fellow with explicit board-view grant | Read-only organization-wide records, including historical records; no implied review power |
| Signed out, unassigned, revoked or inactive | Denied; no cross-team listing or evidence export |

`timesheet_board_viewers` is empty on migration. A named human-approved grant is required before anyone receives board view. The production principal mapping and actual grants have not been decided or applied. There is deliberately no API to grant this role. Inactive fellows and revoked memberships lose ordinary access; an authorized board viewer can retain historical visibility. Project membership supervision comes from existing `fellow_projects.role='pm'`; assignments must be audited before rollout.

## Integrity and concurrency

`timesheet_command` is one PostgreSQL transaction: authenticated session actor → authorization → row/membership locks → expected `lock_version` → version transition → append-only action event → idempotency receipt. The API never trusts a body-supplied actor. An exact JSON command fingerprint distinguishes identical retries from reused request IDs with changed content. Create has a unique fellow/project/week key. Row locking and optimistic versions prevent stale overwrites and duplicate reviews.

Submitted content, submitter, time and attestation cannot change. An approval stores reviewer, time, discussion date, per-entry review IDs and factual sign-off against the immutable `(sheet_id, version)`. A database trigger rejects changes to reviewed versions and updates/deletion of history. Every draft save stores its snapshot in history. This is not a cryptographic signature or a tamper-proof store against the database owner.

Read scope is in SQL. Exports include all permitted versions, actors, times, attestations, review decisions and history as JSON with private/no-store headers. Evidence links use `noopener noreferrer` and a no-referrer policy. There is no remote fetch, URL probe, upload or automatic evidence analysis. Link contents may change externally; immutable evidence snapshots are outside this slice. Timesheet routes require same-origin JSON mutations. Private data is never placed in public learning reports.

## Legacy preservation

`/ledger/legacy` labels old records as manager-reported, not fellow-attested or approved. Assigned supervisors see their own projects; explicit board viewers can see all. Former-member hours and archived projects remain visible. The legacy save endpoint is frozen (410), its old mutation helper removed, and the global fellow-name suggestion list removed. Tables `ledger_entries` and `ledger_updates` are neither migrated nor rewritten.

## Files

- `sql/004_evidence_timesheets.sql`: additive schema, database invariants, access predicate and atomic commands.
- `lib/timesheets/session.ts`: dedicated expiring/revocable work-record sessions and shared-admin identity-write freeze.
- `lib/timesheets/domain.ts`: duration, date, evidence and entry validation; attestation text.
- `lib/timesheets/server.ts`: verified actor, private responses, scoped detail/export and mutation adapter.
- `app/api/timesheets/`: list/create, detail/commands and versioned JSON export.
- `components/timesheets/Timesheets.tsx`, `app/ledger/page.tsx`: fellow workflow, supervisor queue/review, corrections and history.
- `lib/ledger.ts`, `lib/ledger-viewer.ts`, `/ledger/legacy`: scoped read-only legacy access.
- `tests/timesheets/`: SQL/domain tests, actual route-handler tests and synthetic browser harness.

## Known limits before production

The public fellow login still verifies the existing credentials, while work records require the stricter dedicated session described above. No actual account credentials or session keys were changed. Production credential provenance/session policy, role assignment audit, least-privilege database grants and multi-connection load/revocation-race testing still require deployment-environment review. Requests already authenticated before a logout/password change or read-snapshot revocation may finish afterward; this does not promise in-flight cancellation. The embedded PostgreSQL tests serialize calls on one engine; they exercise stale competing actions but do not reproduce separate network connections.

There is no evidence-content verification, cross-project overlapping-time detection, evidence retention policy, automated notification or roster importer overhaul. Exports are JSON, preserving version/history relationships without CSV formula injection. The legacy viewer is intentionally a read-only record view rather than an editable project-management dashboard.
