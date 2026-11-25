-- READ-ONLY. Run on the STAGING database before ISOLATED_STAGING_DATABASE is set
-- (sql/staging/README.md, step 7). Every row must say 'ok'.
-- The Vercel half of the check (that Preview cannot see production values) is done
-- by comparing settings, not by SQL; see the README.
WITH r AS (SELECT * FROM pg_roles WHERE rolname = 'staging_app'),
checks(step, item, ok) AS (
  SELECT 2, 'only synthetic accounts (@example.org)',
    NOT EXISTS (SELECT 1 FROM fellows WHERE email NOT LIKE '%@example.org')
  UNION ALL SELECT 3, 'synthetic seed loaded (7 accounts)',
    (SELECT count(*) FROM fellows) = 7
  UNION ALL SELECT 4, 'all four migrations applied',
    to_regclass('public.timesheets') IS NOT NULL AND to_regclass('public.fellow_email_changes') IS NOT NULL
    AND to_regprocedure('public.timesheet_check_daily_total()') IS NOT NULL
    AND EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'fellows' AND column_name = 'github_url')
  UNION ALL SELECT 5, 'staging_app exists and can log in',
    EXISTS (SELECT 1 FROM r WHERE rolcanlogin)
  UNION ALL SELECT 6, 'staging_app is not superuser and cannot create roles or databases',
    NOT EXISTS (SELECT 1 FROM r WHERE rolsuper OR rolcreaterole OR rolcreatedb OR rolbypassrls OR rolreplication)
  UNION ALL SELECT 7, 'staging_app is not a member of neon_superuser',
    NOT EXISTS (SELECT 1 FROM pg_roles s, r WHERE s.rolname = 'neon_superuser' AND pg_has_role(r.oid, s.oid, 'MEMBER'))
  UNION ALL SELECT 8, 'staging_app owns no tables',
    NOT EXISTS (SELECT 1 FROM pg_class c, r WHERE c.relowner = r.oid)
)
-- Row 1 is information: confirm in the Neon console that this database belongs to
-- the humanitarians-ledger-staging project (the editor shows project and branch).
SELECT 1 AS step, 'database name (confirm it belongs to humanitarians-ledger-staging)' AS item, current_database()::text AS result
UNION ALL
SELECT step, item, CASE WHEN ok THEN 'ok' ELSE 'FAIL - stop' END FROM checks
ORDER BY step;
