# Staging report: PR #16 (to fill in)

Steps: [`sql/staging/README.md`](../../sql/staging/README.md). Record only what was actually seen; write "not run" where a test was not run.

## Identification

| | |
|---|---|
| Commit tested (full SHA) | |
| Preview URL | |
| CI on that commit | Timesheets regression: · Developer access regression: |
| Staging project / database | `humanitarians-ledger-staging` / |
| Date | |

## Setup (steps 1–9)

| Step | Result |
|---|---|
| 2. Base schema 001 → 003 → 006 | |
| 3. Preflight before (004/005/007/008 `not applied`) | |
| 4. Migrations 004 → 005 → 007 → 008; preflight after (`applied`, data `0`) | |
| 5. `staging_app` created through SQL | |
| 6. Grants applied; `app_role_check.sql` 10/10 `ok` | |
| 7. `verify-app-role.mts` connected as `staging_app`: 17/17 `ok` | |
| 8. Synthetic seed (7 accounts, 2 projects, 3 grants) | |
| 9. `03_isolation_check.sql` rows 2–8 `ok`; database name confirmed | |

## Preview isolation (step 10)

| Check | Result |
|---|---|
| Preview `DATABASE_URL` host differs from production; user `staging_app` | |
| Fresh `FELLOW_SESSION_SECRET`, `ADMIN_PASSWORD` | |
| Mail goes to the test sink only | |
| Production `DATABASE_URL`, `SMTP_*`, `BLOB_READ_WRITE_TOKEN` not inherited | |
| `ISOLATED_STAGING_DATABASE=true` set only after the above | |

## Tests on the deployed preview (step 11)

| Test | Result | Notes |
|---|---|---|
| Reset email delivered to the sink; password set; sign-in works | | |
| Wrong password refused | | |
| 4th reset email within 15 min not sent | | |
| Submit with evidence → return with reason → correct → approve | | |
| Self-approval: no controls for own sheet; other PM approves | | |
| Cross-team access refused | | |
| Board viewer read-only | | |
| Developer read-only; account changes refused | | |
| Identity admin: create (no password shown), reset (sessions end) | | |
| Email change confirmed from the current address; PM email change refused | | |
| Unsaved-edits prompt | | |
| Concurrent 24-hour limit (`concurrent-limit.mts` output) | | |

## Restore (step 12)

| | timesheets | versions | history events | checksums |
|---|---|---|---|---|
| Before (time: ) | | | | |
| After the extra timesheet | | | | |
| Restored branch | | | | |

The restored branch matches "before": yes / no. Time taken:

## Problems found

-

## Not run, and why

-
