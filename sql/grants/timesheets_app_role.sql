-- Grants the website's database role exactly what the timesheet code uses.
-- Run AFTER 004, 007 and 008, as the role that ran them (the table owner).
--
-- 1. Run sql/checks/timesheets_preflight.sql and compare the two 'roles' rows:
--      'connected as'            = the role the SQL editor uses (owner)
--      'owner of table fellows'  = the owner of the existing tables
--    Then check which role the website connects as: the user name inside
--    DATABASE_URL in Vercel (do not paste the password anywhere).
-- 2. If the website connects as the SAME role that owns the tables, it already has
--    every right it needs: you can skip this file (running it anyway is harmless).
-- 3. Otherwise put the website's role name on the line marked EDIT and run the file.
--
-- Least privilege: no DELETE and no TRUNCATE anywhere (history is append-only),
-- and board viewers stay read-only for the app (grants are made by a DBA).
-- Safe to run more than once. One transaction: an error changes nothing.
BEGIN;
DO $grants$
DECLARE
  app_role text := 'REPLACE_WITH_APP_ROLE';   -- EDIT: the user name from DATABASE_URL
BEGIN
  IF app_role = 'REPLACE_WITH_APP_ROLE' THEN
    RAISE EXCEPTION 'Edit app_role first (the user name in the website''s DATABASE_URL). Nothing was changed.';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = app_role) THEN
    RAISE EXCEPTION 'Role % does not exist. Nothing was changed.', app_role;
  END IF;
  IF to_regclass('public.timesheets') IS NULL OR to_regprocedure('public.timesheet_check_daily_total()') IS NULL
     OR to_regclass('public.identity_admin_grants') IS NULL THEN
    RAISE EXCEPTION 'Apply 004, 007 and 008 before granting. Nothing was changed.';
  END IF;
  -- Sign-in sessions for work records: created, checked, revoked.
  EXECUTE format('GRANT SELECT, INSERT, UPDATE ON public.timesheet_sessions TO %I', app_role);
  -- Board viewers: read only.
  EXECUTE format('GRANT SELECT ON public.timesheet_board_viewers TO %I', app_role);
  -- Timesheets and their versions: created and moved through draft/submit/review.
  -- Database triggers (004, 007) still block edits to submitted or approved content.
  EXECUTE format('GRANT SELECT, INSERT, UPDATE ON public.timesheets, public.timesheet_versions TO %I', app_role);
  -- History and request receipts: append only.
  EXECUTE format('GRANT SELECT, INSERT ON public.timesheet_events, public.timesheet_requests TO %I', app_role);
  EXECUTE format('GRANT USAGE ON SEQUENCE public.timesheet_events_id_seq TO %I', app_role);
  -- Functions the code calls directly.
  EXECUTE format('GRANT EXECUTE ON FUNCTION public.timesheet_command(uuid,uuid,uuid,integer,text,jsonb) TO %I', app_role);
  EXECUTE format('GRANT EXECUTE ON FUNCTION public.timesheet_validate_entries(jsonb,date,boolean) TO %I', app_role);
  EXECUTE format('GRANT EXECUTE ON FUNCTION public.timesheet_can_read(uuid,uuid,uuid) TO %I', app_role);
  EXECUTE format('GRANT EXECUTE ON FUNCTION public.timesheet_can_read_project(uuid,uuid) TO %I', app_role);
  -- Identity administration (008): the app checks grants (read only; grants are made
  -- by the database owner) and appends audit rows.
  EXECUTE format('GRANT SELECT ON public.identity_admin_grants TO %I', app_role);
  EXECUTE format('GRANT SELECT, INSERT ON public.identity_admin_audit TO %I', app_role);
  EXECUTE format('GRANT USAGE ON SEQUENCE public.identity_admin_audit_id_seq TO %I', app_role);
  RAISE NOTICE 'Timesheet grants applied to %.', app_role;
END $grants$;
COMMIT;
-- Existing tables need only the rights the website already has today, because the
-- admin dashboard reads and edits them: SELECT and UPDATE on fellows, projects and
-- fellow_projects. (timesheet_command locks those rows with FOR SHARE, which
-- PostgreSQL allows only with UPDATE rights.) Nothing new is granted there.
-- Check, if unsure (each must return true; replace the role name):
--   SELECT has_table_privilege('APP_ROLE','public.fellows','SELECT,UPDATE'),
--          has_table_privilege('APP_ROLE','public.projects','SELECT,UPDATE'),
--          has_table_privilege('APP_ROLE','public.fellow_projects','SELECT,UPDATE');
