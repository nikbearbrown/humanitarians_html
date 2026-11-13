# Timesheet migrations: check, back up, apply, grant, roll back

This covers four database files: `sql/004_evidence_timesheets.sql`, `sql/005_standard_profile_links.sql`, `sql/007_timesheet_daily_total.sql` and `sql/008_identity_admin.sql`.

Everything runs in the **Neon SQL Editor**, connected to the **production branch**, as the database owner. That is the role the editor uses by default, and the same role that ran 001–003 and 006. To run a file, open it in GitHub, copy all of it, paste it into the editor and click **Run**. Each file is one transaction: if it fails, nothing is changed.

Merging PR #16 does not run any SQL, and nothing runs automatically at deploy time.

## What each file does

| File | Adds | Changes existing data? | Run twice? |
|---|---|---|---|
| 004 | 6 new tables (`timesheet_*`), 6 functions, 2 triggers, 2 indexes | No | **Refused** by a guard, nothing changed |
| 005 | 3 empty columns on `fellows`: `github_url`, `website_url`, `youtube_url` | No | Safe (`IF NOT EXISTS`) |
| 007 | 1 function and 1 trigger (24-hour daily limit across projects) | No | **Refused** by a guard, nothing changed |
| 008 | 2 tables (`identity_admin_grants`, `identity_admin_audit`), 2 functions, 2 triggers, 2 indexes for named account administration ([IDENTITY-ADMIN.md](IDENTITY-ADMIN.md)) | No, and it creates no grant | **Refused** by a guard, nothing changed |

## Step 1: Check what is already there (read-only)

Run `sql/checks/timesheets_preflight.sql` and save the output (a screenshot is fine).

- Every `prerequisite` row must say `ok`.
- For each migration:
  - `not applied`: run it in step 3.
  - `applied`: skip it.
  - `PARTIAL - stop`: do not continue. Someone created part of it by hand. Send me the output.
- The two `roles` rows are needed in step 4.

This file only reads. It changes nothing and can be run any number of times.

## Step 2: Back up, and prove the backup is good

1. In the Neon console, go to **Branches**, then **Create branch**.
   - Parent: `production` (or `main`).
   - Data: *current point in time*.
   - Name: `backup-before-timesheets-YYYY-MM-DD`.
2. Run `sql/checks/backup_fingerprint.sql` on **production**, then switch the editor to the **backup branch** and run it again.
   - Every row (`row_count` and `checksum`) must match.
   - If any row differs, stop: the backup is not a good copy.
3. Keep the production output. Step 5 compares against it.

Neon also keeps point-in-time history, but this named branch is the backup we have checked.

## Step 3: Apply, in this order

1. `sql/004_evidence_timesheets.sql`
2. `sql/005_standard_profile_links.sql`
3. `sql/007_timesheet_daily_total.sql`
4. `sql/008_identity_admin.sql`

Skip any file that step 1 reported as `applied`.

If a file shows an error, nothing from that file was applied. Copy the error message and stop. The guards give plain errors, for example `004 is already applied… Nothing was changed`.

## Step 4: Database grants (only if the website uses a different role)

Compare the website's role with the table owner:

- The website's role is the user name in Vercel's `DATABASE_URL` (the part before `:`). Don't copy the password anywhere.
- The table owner is the `owner of table fellows` row from step 1.

**If they are the same role** (the usual Neon setup), skip this step. The owner already has every right it needs.

**If they are different:**
1. Open `sql/grants/timesheets_app_role.sql`.
2. Replace `REPLACE_WITH_APP_ROLE` with the website's role name.
3. Run it.

It grants only what the code uses:

| Object | Grant |
|---|---|
| `timesheet_sessions` | SELECT, INSERT, UPDATE |
| `timesheets`, `timesheet_versions` | SELECT, INSERT, UPDATE |
| `timesheet_events`, `timesheet_requests` | SELECT, INSERT |
| The events sequence | USAGE |
| `timesheet_board_viewers` | SELECT |
| The four functions the code calls | EXECUTE |
| `identity_admin_grants` | SELECT (only the database owner creates grants) |
| `identity_admin_audit` and its sequence | SELECT, INSERT, USAGE |

There is no DELETE or TRUNCATE on anything, so history stays append-only. The database triggers still block edits to submitted or approved timesheets. The comment at the end of the file shows how to check that the website role already has its usual rights on `fellows`, `projects` and `fellow_projects`.

## Step 5: Confirm

1. Run `sql/checks/timesheets_preflight.sql` again. It must show 004, 005, 007 and 008 as `applied` and `timesheet data` as `0`.
2. Run `sql/checks/backup_fingerprint.sql` again and compare it with step 2.
   - Every row must be identical, except `fellows`, whose checksum changes only if 005 added its three empty columns.
   - `fellows (core columns)` must be identical.

The site keeps working as it does today: `TIMESHEETS_ENABLED` is still off.

## Rolling back, from smallest to largest

1. **Turn the feature off.** Set `TIMESHEETS_ENABLED` to `false` (or remove it) in Vercel and redeploy.
   - `/ledger` goes back to today's Project Ledger.
   - No data is touched, and any timesheets already entered are kept.
   - Use this first for any problem after go-live.
2. **Remove the schema, only if nobody has used timesheets yet.** With the flag off:
   - Run `sql/rollback/008_down.sql`, then `sql/rollback/007_down.sql`, then `sql/rollback/004_down.sql`.
   - 008's rollback refuses once any identity-admin grant or audit row exists, because that is the record of who changed whose access.
   - 004's rollback refuses, and changes nothing, if any timesheet, version, history row, receipt or board-viewer grant exists. Deleting real work records is a records decision for Nik, not a rollback step.
   - Legacy Ledger tables are never touched.
   - Leave 005 in place. Its columns are empty, harmless and used by the profile pages.
3. **Restore the backup, only if existing data was damaged.**
   - In Neon, restore production from `backup-before-timesheets-YYYY-MM-DD`: open the branch, choose **Restore**, then *restore to parent*. Neon keeps a copy of the replaced state.
   - Anything written after the backup is lost, including timesheets. Agree a reconciliation plan with Nik first.

## How this was tested

`tests/timesheets/migrations.test.ts` runs these exact files against a fresh PostgreSQL shaped like production (001, 003 and 006 applied). Run it with `npm run test:timesheets`. It checks that:

- The preflight reports `not applied` on today's schema and `applied` afterwards. A half-applied 004 shows as `PARTIAL`.
- Applying 004 → 005 → 007 → 008 leaves every legacy table's row count and checksum unchanged.
- Rerunning 004, 007 or 008 is refused and changes nothing, and 007 or 008 before 004 is refused. 005 is safe to rerun.
- A separate website role cannot use timesheets without the grants. With exactly the documented grants, it can sign in, create, save, submit and approve. It still cannot delete history or grant board access, and the grants file can be run twice.
- Rollback refuses while records exist. On an empty install, down then up works and legacy tables stay identical.

Not covered by these tests: running against the real Neon project and restoring a real Neon branch. Step 2's fingerprint comparison checks the backup on the day.
