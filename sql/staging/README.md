# Staging for PR #16, step by step

For the temporary Neon project **`humanitarians-ledger-staging`** only. This follows Professor Nik's instructions of Nov 24 and Part A of [`docs/timesheets/MIGRATIONS.md`](../../docs/timesheets/MIGRATIONS.md).

**Never on production.** Do not merge, run production SQL or change production settings.

**Secrets:** passwords and connection strings are typed only into Neon, your own terminal or Vercel. Never into email, chat, files or the repository.

**SQL steps:** Neon console → project `humanitarians-ledger-staging` → **SQL Editor** (as the owner). Open each file on GitHub, copy all of it, paste it and click **Run**. Every file is one transaction: an error means nothing from that file was applied, so copy the error and stop.

## A. Database

**1. Confirm the place.** At the top of the SQL Editor, the project must be `humanitarians-ledger-staging`. Note the database name shown there.

**2. Base schema, in this order:**
1. `sql/001_fellows_projects.sql`
2. `sql/003_project_ledger.sql`
3. `sql/006_developer_access.sql`

**3. Preflight.** Run `sql/checks/timesheets_preflight.sql`.
- Every prerequisite row must be `ok`.
- 004, 005, 007 and 008 must all be `not applied`.

**4. Migrations, in this order:**
1. `sql/004_evidence_timesheets.sql`
2. `sql/005_standard_profile_links.sql`
3. `sql/007_timesheet_daily_total.sql`
4. `sql/008_identity_admin.sql`

Then run the preflight again: all four must be `applied`, and `timesheet data` must be `0`.

**5. Website login.** Open `sql/staging/01_create_staging_app.sql`.
- Replace `REPLACE_WITH_A_NEW_PASSWORD` with a new random password of at least 24 characters, then run it.
- Keep the password only in a password manager.
- This creates `staging_app` **through SQL**, so it is not a member of `neon_superuser`.

**6. Grants.** In `sql/grants/timesheets_app_role.sql`, set `app_role` to `staging_app` and run it. Then run `sql/checks/app_role_check.sql` with `staging_app`: all **10** rows must be `ok`.

**7. Verify while connected as `staging_app`** (on your computer, in the repository folder).

Build the connection string from the owner's string in Neon → **Connect**: keep the host and database, and replace the user and password:

```
postgresql://staging_app:<the password from step 5>@<host>/<database>?sslmode=require
```

Then in PowerShell:

```
$env:STAGING_APP_DATABASE_URL = "<that string>"
npx tsx scripts/staging/verify-app-role.mts
```

All **17** checks must say `ok`. The script only reads; actions that must be refused are attempted in a form that cannot change anything. Then clear the variable: `Remove-Item Env:STAGING_APP_DATABASE_URL`.

**8. Synthetic data.** Run `sql/staging/02_seed_synthetic.sql`. It creates 7 fictional `@example.org` accounts, 2 projects and the grants:

| Account | Role |
|---|---|
| `pm.alpha@example.org` | PM of Staging Project Alpha (also a volunteer on Beta, for the self-approval test) |
| `pm.beta@example.org` | PM of Staging Project Beta |
| `volunteer.one@example.org` | Volunteer on **both** projects (24-hour limit test) |
| `volunteer.two@example.org` | Volunteer on Alpha |
| `identity.admin@example.org` | Identity admin |
| `board.viewer@example.org` | Board viewer |
| `developer@example.org` | Developer (read-only) |

Every account starts with an **unusable** password. Each one is set through "Forgot password?" in step 11, which is also the reset-delivery test.

**9. Isolation check (database side).** Run `sql/staging/03_isolation_check.sql`.
- Row 1 shows the database name: confirm it is the one from step 1.
- Rows 2–8 must be `ok`: synthetic accounts only, migrations applied, and `staging_app` able to log in, not a superuser, not in `neon_superuser`, and owning nothing.

## B. Vercel preview (Nik sets these; send him names and the branch, never values)

**10. Preview-only variables for the PR #16 branch `timesheets/daily-hours-and-summary`.** Confirm in Vercel how the fork deployment's branch is named.

| Variable | Staging value |
|---|---|
| `DATABASE_URL` | The `staging_app` string from step 7 |
| `FELLOW_SESSION_SECRET` | New random value |
| `ADMIN_PASSWORD` | New value |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` | A **test mail sink** (an inbox that captures all mail and delivers none) |
| `APP_URL` | The preview's branch URL |
| `TIMESHEETS_ENABLED`, `DEVELOPER_ACCESS_ENABLED` | `true` |
| `ISOLATED_STAGING_DATABASE` | `true`, **last**, only after the checks below |

**Must not reach the preview:** the production `DATABASE_URL`, production `SMTP_*`, `BLOB_READ_WRITE_TOKEN` (photo uploads would write to production storage), and the production `FELLOW_SESSION_SECRET` and `ADMIN_PASSWORD`.

**Before `ISOLATED_STAGING_DATABASE=true`:**
- In Vercel, list the variables a Preview of that branch receives. Each one above must be the staging value.
- The `DATABASE_URL` host (`ep-…`) must differ from production's, and its user must be `staging_app`.
- None of the "must not reach" variables may apply to that Preview.

Then set the flag and authorize the deployment. Record the preview URL.

## C. Tests on the deployed preview

**11. Run each test and note the result** in `docs/timesheets/STAGING-REPORT.md`.

- **Sign-in and reset:** for each account, "Forgot password?" → the email arrives in the mail sink → set a password → sign in. A wrong password is refused. A 4th reset email within 15 minutes is not sent.
- **Volunteer flow:** `volunteer.two` submits with evidence. `pm.alpha` returns it with a reason. `volunteer.two` corrects and resubmits. `pm.alpha` approves.
- **Self-approval:** `pm.alpha` submits their own Beta timesheet and sees no Approve or Return. `pm.beta` approves it.
- **Cross-team:** `pm.beta` cannot see Alpha's timesheets.
- **Board and developer:** `board.viewer` reads everything and can change nothing. `developer` has read-only Ledger and roster access, and account changes are refused.
- **Identity admin:**
  - creates a member (no password shown);
  - resets `volunteer.two`'s password (sessions end);
  - requests an email change for `volunteer.two`, and the confirmation in the mail sink applies it;
  - an email change for `pm.alpha` is refused.
- **Unsaved edits:** type hours, click Back to timesheets → Save / Discard / Keep editing.
- **Concurrent 24-hour limit** (two sessions):

  ```
  $env:PREVIEW_URL = "<preview URL>"
  $env:VOLUNTEER_PASSWORD = "<volunteer.one's password>"
  npx tsx scripts/staging/concurrent-limit.mts
  ```

  It must print `PASS: exactly one accepted, the other refused by the 24-hour limit`. Then clear both variables.

## D. Restore test

**12. Point-in-time restore on staging:**
1. Run `sql/staging/04_restore_check.sql` and save the output as **before**. Note the exact time.
2. Wait a minute, then create and submit one more synthetic timesheet on the preview. Run `04_restore_check.sql` again: this is **after**, and it must differ.
3. Neon → Branches → create a branch of staging **from the noted time** (point in time).
4. Run `04_restore_check.sql` on that branch. It must match **before** exactly, not **after**.
5. Record how long the restore took.

## E. Report

**13.** Fill in `docs/timesheets/STAGING-REPORT.md` and send it to Nik: commit SHA, preview URL, CI, test results and the restore result.

Do not merge or touch production. Nik retires the preview and deletes the temporary database after review.
