# Timesheets release checklist

**This is the only release procedure for PR #16.** Other documents (`ROLLOUT.md`, the PR description) point here; if anything disagrees with this page, this page wins.

The order is fixed: **Part A on staging, then Part B on production**, with Nik's go-ahead between them. Nothing here runs automatically: merging the PR or deploying runs no SQL.

SQL steps run in the **Neon SQL Editor** as the database **owner**. To run a file, open it in GitHub, copy all of it, paste it and click **Run**. Every file is one transaction: if it shows an error, nothing from it was applied; copy the error and stop.

## The files

| File | Purpose | Run twice? |
|---|---|---|
| `sql/checks/timesheets_preflight.sql` | Read-only: what is installed (`not applied` / `applied` / `PARTIAL - stop`), row counts, roles | Any time |
| `sql/checks/backup_fingerprint.sql` | Read-only: row counts and checksums of existing tables | Any time |
| `sql/004_evidence_timesheets.sql` | 6 timesheet tables, 6 functions, 2 triggers, 2 indexes | **Refused**, nothing changed |
| `sql/005_standard_profile_links.sql` | 3 empty profile-link columns on `fellows` | Safe |
| `sql/007_timesheet_daily_total.sql` | 24-hour daily limit across projects (1 function, 1 trigger) | **Refused**, nothing changed |
| `sql/008_identity_admin.sql` | Identity-admin grants, audit, email-change requests (3 tables, 2 functions, 2 triggers, 3 indexes); creates no grant | **Refused**, nothing changed |
| `sql/grants/timesheets_app_role.sql` | Rights for the website's own least-privilege role | Safe |
| `sql/checks/app_role_check.sql` | Read-only: proves that role is least-privilege | Any time |
| `sql/rollback/008_down.sql`, `007_down.sql`, `004_down.sql` | Remove the schema, only while unused (they refuse otherwise) | Safe |

Migrations always run in this order: **004 → 005 → 007 → 008**.

---

## Part A: staging (isolated, synthetic data only)

**A1. Separate staging environment (Nik).** Nothing in staging may point to production.

- A **new Neon database** for staging: a new project, or a schema-only branch. **Not** a copy of production data; no real volunteers, emails or password hashes.
- Its own **owner** and its own **website role**, created in Neon → Roles, e.g. `staging_app`.
- In Vercel → Settings → Environment Variables, set these for **Preview only**, each different from production:

  | Variable | Value |
  |---|---|
  | `DATABASE_URL` | Connection string of `staging_app` on the staging database |
  | `FELLOW_SESSION_SECRET` | A new random value |
  | `ADMIN_PASSWORD` | A new value |
  | `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `MAIL_FROM` | A **test mail sink**, so no email reaches a real person |
  | `APP_URL` | The staging/preview URL |
  | `TIMESHEETS_ENABLED`, `DEVELOPER_ACCESS_ENABLED` | `true` |

- Production's variables stay on **Production only** (untick Preview on every one).
- Do **not** set `ISOLATED_STAGING_DATABASE` yet.

**A2. Schema.** On the staging database: run the preflight, then 004 → 005 → 007 → 008 (step B4 below explains each), and the preflight again. All four must be `applied`.

**A3. Website role.** Run `sql/grants/timesheets_app_role.sql` with `staging_app`, then `sql/checks/app_role_check.sql` with `staging_app`. All 10 rows must be `ok`.

**A4. Prove the isolation before enabling the preview.**

1. In Vercel, compare the **Preview** and **Production** `DATABASE_URL` values. The host (`ep-…`), the user and the database must all differ, and the Preview user must be `staging_app`.
2. On staging: `SELECT count(*) FROM fellows WHERE email NOT LIKE '%@example.org';` must return **0**: synthetic accounts only.
3. Run `sql/checks/backup_fingerprint.sql` on **production** and save the output. Step A7 compares against it.
4. Only now set `ISOLATED_STAGING_DATABASE=true` (**Preview only**) and authorize the preview deployment on the PR.

**A5. Synthetic data.** Create a few `@example.org` members, two projects, one PM per project, one identity admin and one board viewer. Use the owner SQL from `IDENTITY-ADMIN.md` for the grants.

**A6. Test the deployed preview.**

- Sign-in with real cookies, and a wrong password refused.
- "Forgot password?" email arrives in the mail sink; at most 3 per address per 15 minutes.
- Volunteer submits with evidence; PM returns with a reason; volunteer corrects; PM approves.
- Self-approval and cross-team access refused.
- Two submissions at the same moment for the same day on two projects: only one passes the 24-hour limit.
- Identity admin: create a member; reset a password; request an email change, then confirm it from the mail sink; email change for a PM refused.
- Unsaved-changes prompt.

Record the results in `TEST-REPORT.md`.

**A7. Production untouched.** Run `sql/checks/backup_fingerprint.sql` on production again. It must be identical to A4.3: the preview never wrote to production.

**A8. Restore test (real, on staging).**

1. Note the time.
2. Submit one more synthetic timesheet.
3. In Neon, create a branch of staging from the **noted time** (point-in-time restore).
4. Run `sql/checks/backup_fingerprint.sql` and `SELECT count(*) FROM timesheets;` on that branch and on staging. The branch must show the state **before** the extra timesheet.
5. Write down how long the restore took. That is the expected recovery time for production.

**A9. Review.** Send Nik the exact commit, the passing CI checks and the staging results. **Part B starts only after his go-ahead.**

---

## Part B: production

**B1. Website role.** In Neon → Roles, create the production website role, e.g. `humanitarians_app`. Keep its connection string private.

**B2. Backup, and prove it is good.**

1. Neon → Branches → Create branch: parent production, *current point in time*, name `backup-before-timesheets-YYYY-MM-DD`.
2. Run `sql/checks/backup_fingerprint.sql` on production and on the backup branch. Every row must match; otherwise stop.
3. Keep the production output for B6.

**B3. Preflight.** Run `sql/checks/timesheets_preflight.sql`.

- Every `prerequisite` row must be `ok`.
- Skip any migration that says `applied`.
- Stop on any `PARTIAL`.

**B4. Migrations, in this order:**

1. `sql/004_evidence_timesheets.sql`
2. `sql/005_standard_profile_links.sql`
3. `sql/007_timesheet_daily_total.sql`
4. `sql/008_identity_admin.sql`

**B5. Website role rights.**

1. Run `sql/grants/timesheets_app_role.sql` with `humanitarians_app`.
2. Run `sql/checks/app_role_check.sql` with `humanitarians_app`. All 10 rows must be `ok`.
3. Only then, in Vercel, set **Production** `DATABASE_URL` to the `humanitarians_app` connection string.

The owner's connection string is used only in the SQL editor, never by the website.

**B6. Confirm.**

1. The preflight shows all four migrations `applied` and `timesheet data` = `0`.
2. The fingerprint is identical to B2, except the `fellows` checksum if 005 just added its columns. `fellows (core columns)` must be identical.

**B7. Deploy.** Merge PR #16 and let Vercel deploy. `TIMESHEETS_ENABLED` is still off, so the site behaves as today. Check that sign-in, `/ledger` and the admin dashboard work.

**B8. Assignments and grants.**

- In the admin dashboard, while timesheets are off: assign each project's PM and add the volunteers.
- Owner SQL (`IDENTITY-ADMIN.md`): identity-admin grants, and any board viewers.

**B9. Switch on.** Set `TIMESHEETS_ENABLED=true` (**Production**) and redeploy. Everyone signs in again.

Smoke test with one real PM and one volunteer: submit, then approve.

**B10. Announce.** Tell Nina and the PMs. Keep the B2 backup branch for at least 30 days.

---

## Rollback, smallest first

1. **Switch off.** Set `TIMESHEETS_ENABLED=false` and redeploy.
   - `/ledger` returns to today's Project Ledger. No data is touched, and submitted timesheets are kept.
   - Use this first for any problem.
2. **Remove the schema, only if nobody has used it.** With the switch off, run `sql/rollback/008_down.sql`, then `007_down.sql`, then `004_down.sql`.
   - Each refuses, changing nothing, once real records, grants or audit history exist. Deleting those is a records decision for Nik, not a rollback step.
   - Legacy Ledger tables are never touched.
   - Leave 005 in place: three empty columns that the profile pages use.
3. **Restore the backup, only if existing data was damaged.** Restore production from the B2 branch, the same way as in A8.
   - Anything written after the backup is lost, including timesheets. Agree a reconciliation plan with Nik first.

## How this procedure is tested

`tests/timesheets/migrations.test.ts` runs these exact files on a fresh PostgreSQL shaped like production (001, 003 and 006 applied). It checks:

- The preflight reports `not applied`, `applied` and `PARTIAL` correctly.
- 004 → 005 → 007 → 008 leaves every legacy table's checksum unchanged.
- Rerunning 004, 007 or 008, or running them out of order, is refused.
- A website role with **no** rights cannot use timesheets. After the grants file alone, it can sign in, create, save, submit and approve, and `app_role_check.sql` shows all `ok`. It still cannot delete history, grant board access or edit the audit.
- The table owner, and any member of the owner role, are refused by the grants file and flagged by the check.
- Rollbacks refuse while records exist. On an empty install, down then up works.

**Not yet done:** Part A on a real Neon/Vercel staging environment, including the restore test A8.
