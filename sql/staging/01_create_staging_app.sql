-- STAGING ONLY (humanitarians-ledger-staging). Never run on production.
-- Creates the website's own login, staging_app, through SQL (not the Neon Roles UI),
-- so it is NOT a member of neon_superuser and owns nothing.
--
-- Before running:
--   1. Run this on the staging database, as the owner, AFTER 001 -> 003 -> 006 and
--      004 -> 005 -> 007 -> 008 (sql/staging/README.md, steps 2-4).
--   2. Replace REPLACE_WITH_A_NEW_PASSWORD below with a new long random password,
--      typed only here. Never send it by email or chat; it goes only into the
--      Preview DATABASE_URL in Vercel.
-- The guards refuse to run on a database that holds any non-synthetic account,
-- with the placeholder password, or if staging_app already exists. One transaction.
BEGIN;
DO $create$
DECLARE
  pw text := 'REPLACE_WITH_A_NEW_PASSWORD';   -- EDIT: a new random password
BEGIN
  IF pw = 'REPLACE_WITH_A_NEW_PASSWORD' OR length(pw) < 24 THEN
    RAISE EXCEPTION 'Set a new random password of at least 24 characters first. Nothing was changed.';
  END IF;
  IF to_regclass('public.fellows') IS NULL OR to_regclass('public.identity_admin_grants') IS NULL THEN
    RAISE EXCEPTION 'Load 001, 003, 006 and apply 004, 005, 007, 008 first. Nothing was changed.';
  END IF;
  IF EXISTS (SELECT 1 FROM fellows WHERE email NOT LIKE '%@example.org') THEN
    RAISE EXCEPTION 'This database has non-synthetic accounts. It is not the empty staging database. Nothing was changed.';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'staging_app') THEN
    RAISE EXCEPTION 'staging_app already exists. Nothing was changed.';
  END IF;
  EXECUTE format('CREATE ROLE staging_app LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS PASSWORD %L', pw);
  EXECUTE format('GRANT CONNECT ON DATABASE %I TO staging_app', current_database());
  RAISE NOTICE 'staging_app created. Next: sql/grants/timesheets_app_role.sql with app_role = staging_app.';
END $create$;
COMMIT;
