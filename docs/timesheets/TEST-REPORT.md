# PR #16 test report

**Date:** 2026-11-13. **Branch:** `timesheets/daily-hours-and-summary`.
**Environment:** local only. Synthetic in-memory PostgreSQL (PGlite) with the real migration files. Real Next.js route handlers, and the real React timesheet screen in headless Chrome. Fictional people and evidence.

No staging or production database was used; staging is point 3 and is still pending.

## Results

| Suite | Command | Result |
|---|---|---|
| Timesheets (API, database, security, migrations, identity admin) | `npm run test:timesheets` | **70 / 70 pass** |
| Developer access | `npm run test:developer-access` | **25 / 25 pass** |
| Timesheets typecheck | `npm run typecheck:timesheets` | **clean** |
| Developer-access typecheck | `npm run typecheck:developer-access` | **clean** |
| End-to-end in the browser | `npm run test:timesheets:browser` | **pass, 0 page errors** |
| Production build | `npm run build` | **compiles** |
| GitHub CI | *Developer access regression* (existing) and *Timesheets regression* (new: tests, typecheck and the browser run) | Both run on every PR to `main` |

## What Nik asked to be exercised

| Flow | How it was tested | Result |
|---|---|---|
| **Sign-in** | Browser: real `POST /api/fellows/auth/login`. A wrong password is refused (401); the right one issues the work-record session used for the rest of the run | ✅ |
| **Volunteer submission with evidence** | Browser: create a draft, add hours, a description and 2 evidence links, save, attest, submit | ✅ `01-fellow-draft.png` |
| **PM returns with a reason** | Browser: the PM returns version 1 with a written reason. The volunteer sees it, writes a correction reason, edits and resubmits version 2 | ✅ |
| **PM approves** | Browser: approve stays disabled until every entry, the evidence and the discussion are confirmed. After approval, the exported record shows v1 returned, v2 approved and submitted by the volunteer | ✅ `02-supervisor-review.png`, `03-approved-version.png` |
| **Self-approval denied** | Browser: a PM submits their own timesheet on their own project. The page shows no Approve or Return controls, and a direct approve request through the API is refused, leaving it submitted with no reviewer. The database rule is also covered by `workflow.test.ts` (*self-review denied even when fellow also has PM assignment*) | ✅ `08-self-approval-blocked.png` |
| **Daily limit across projects** | Browser: the volunteer, already approved for 1:15 on one project, submits 23:00 for the same day on a second project. The submission is refused with *"Your hours on 2026-11-09 add up to 24:15 across all your projects…"* and stays a draft. Database: 3 tests (approved hours count; drafts and returned versions don't; an amendment isn't counted twice) | ✅ `09-daily-limit.png` |
| **My hours** | Browser: the volunteer sees Approved 1:15, plus waiting, returned and draft totals | ✅ `10-my-hours.png` |
| **Cross-team privacy** | Browser: a PM of another project sees *No records in this view* | ✅ |
| **Mobile** | Browser: 390 px wide, no horizontal scroll | ✅ `04-mobile-amendment.png` |
| **Existing ledger access unchanged (point 1)** | Timesheets off: `/api/ledger/projects` works as on `main`. A developer reads it read-only in both modes and can't write | ✅ `access.test.ts` |
| **Admin permissions (point 2)** | The shared admin password is refused with no side effects. Without a grant, fellows and PMs are refused. A named identity admin can create (incl. PM role), import, edit, change email/roles and reset passwords, never sees a password, can't change their own account, and can't hard-delete; each change is audited. A grant does nothing while timesheets are off | ✅ `identity-admin.test.ts` (10 tests), `security.test.ts` |
| **Developer permissions** | Read-only roster and Ledger; account changes denied; Grants read-only; sessions die on password, email or status change | ✅ `access.test.ts` (25 tests) |
| **Migrations (point 4)** | Preflight, apply, rerun refused, partial detected, website-role grants (refused without, full flow with), rollback refused with data, down/up when empty, legacy data checksums unchanged | ✅ `migrations.test.ts` (8 tests) |

Screenshots are in `docs/timesheets/screenshots/`. CI also uploads them from every run.

## Not covered yet

- **Staging (point 3).** None of this has run against a real Neon database, through Vercel, or on the production domain. The same browser run should be repeated on the isolated staging preview once it exists.
- Real email delivery for "Forgot password?" (the reset email) was not sent. The tests check that no password is shown and that reset links are the only way to set one.
- Concurrency is tested on a single database connection, not under parallel production load.
