-- Rights for the website's own database role (the user name in Vercel's DATABASE_URL).
-- Steps A3 and B5 of docs/timesheets/MIGRATIONS.md. Run AFTER 004, 007 and 008, as the
-- database owner, on staging first and then on production.
--
-- Why a separate role: the timesheet guarantees (history cannot be deleted,
-- approved versions cannot change, board access and admin grants are made only by
-- the owner) are enforced with privileges and triggers. The OWNER of the tables can
-- drop triggers and bypass all of that, so the website must NOT connect as the
-- owner. This script refuses to run for a role that owns the tables, is a member of
-- the owner role, or has superuser-like attributes.
--
-- What it grants:
--   - existing tables (fellows, projects, blog, …): SELECT, INSERT, UPDATE, DELETE,
--     the everyday rights the site uses today, but no ownership or schema changes;
--   - timesheet and identity tables: exactly what the code uses, nothing more.
--     Any earlier broader grant on them is removed first.
-- Safe to run more than once. One transaction: an error changes nothing.
-- Verify afterwards with sql/checks/app_role_check.sql.
BEGIN;
DO $grants$
DECLARE
  app_role text := 'REPLACE_WITH_APP_ROLE';   -- EDIT: the website's role name
  owner_oid oid;
  r record;
  new_tables text[] := ARRAY['timesheet_sessions','timesheet_board_viewers','timesheets','timesheet_versions',
    'timesheet_events','timesheet_requests','identity_admin_grants','identity_admin_audit','fellow_email_changes'];
BEGIN
  IF app_role = 'REPLACE_WITH_APP_ROLE' THEN
    RAISE EXCEPTION 'Edit app_role first (the website''s role name). Nothing was changed.';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = app_role) THEN
    RAISE EXCEPTION 'Role % does not exist. Create it first (MIGRATIONS.md step A1 or B1). Nothing was changed.', app_role;
  END IF;
  IF to_regclass('public.timesheets') IS NULL OR to_regprocedure('public.timesheet_check_daily_total()') IS NULL
     OR to_regclass('public.identity_admin_grants') IS NULL THEN
    RAISE EXCEPTION 'Apply 004, 007 and 008 before granting. Nothing was changed.';
  END IF;
  SELECT relowner INTO owner_oid FROM pg_class WHERE oid = 'public.fellows'::regclass;
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = app_role
             AND (rolsuper OR rolcreaterole OR rolcreatedb OR rolbypassrls OR rolreplication))
     OR pg_has_role(app_role, owner_oid, 'MEMBER')
     OR EXISTS (SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
                WHERE n.nspname = 'public' AND c.relowner = (SELECT oid FROM pg_roles WHERE rolname = app_role)) THEN
    RAISE EXCEPTION 'Role % owns tables or has admin-level rights; the website must use a separate least-privilege role. Nothing was changed.', app_role;
  END IF;

  EXECUTE format('GRANT USAGE ON SCHEMA public TO %I', app_role);
  -- Existing tables and their sequences: today's everyday rights.
  FOR r IN SELECT c.relname, c.relkind FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
           WHERE n.nspname = 'public' AND c.relkind IN ('r','p','S')
             AND NOT (c.relname = ANY (new_tables))
             AND c.relname NOT IN ('timesheet_events_id_seq','identity_admin_audit_id_seq') LOOP
    IF r.relkind = 'S' THEN
      EXECUTE format('GRANT USAGE, SELECT ON SEQUENCE public.%I TO %I', r.relname, app_role);
    ELSE
      EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO %I', r.relname, app_role);
    END IF;
  END LOOP;

  -- New tables: exact rights only.
  EXECUTE format('REVOKE ALL ON public.timesheet_sessions, public.timesheet_board_viewers, public.timesheets,
    public.timesheet_versions, public.timesheet_events, public.timesheet_requests, public.identity_admin_grants,
    public.identity_admin_audit, public.fellow_email_changes FROM %I', app_role);
  -- Sign-in sessions for work records: created, checked, revoked.
  EXECUTE format('GRANT SELECT, INSERT, UPDATE ON public.timesheet_sessions TO %I', app_role);
  -- Board viewers: read only (grants are made by the owner).
  EXECUTE format('GRANT SELECT ON public.timesheet_board_viewers TO %I', app_role);
  -- Timesheets and their versions: created and moved through draft/submit/review.
  -- Triggers (004, 007) still block edits to submitted or approved content.
  EXECUTE format('GRANT SELECT, INSERT, UPDATE ON public.timesheets, public.timesheet_versions TO %I', app_role);
  -- History and request receipts: append only.
  EXECUTE format('GRANT SELECT, INSERT ON public.timesheet_events, public.timesheet_requests TO %I', app_role);
  EXECUTE format('GRANT USAGE ON SEQUENCE public.timesheet_events_id_seq TO %I', app_role);
  -- Functions the code calls directly.
  EXECUTE format('GRANT EXECUTE ON FUNCTION public.timesheet_command(uuid,uuid,uuid,integer,text,jsonb) TO %I', app_role);
  EXECUTE format('GRANT EXECUTE ON FUNCTION public.timesheet_validate_entries(jsonb,date,boolean) TO %I', app_role);
  EXECUTE format('GRANT EXECUTE ON FUNCTION public.timesheet_can_read(uuid,uuid,uuid) TO %I', app_role);
  EXECUTE format('GRANT EXECUTE ON FUNCTION public.timesheet_can_read_project(uuid,uuid) TO %I', app_role);
  -- Identity administration (008): read grants (made by the owner), append audit rows.
  EXECUTE format('GRANT SELECT ON public.identity_admin_grants TO %I', app_role);
  EXECUTE format('GRANT SELECT, INSERT ON public.identity_admin_audit TO %I', app_role);
  EXECUTE format('GRANT USAGE ON SEQUENCE public.identity_admin_audit_id_seq TO %I', app_role);
  -- Email changes: requested, then confirmed or cancelled (never deleted).
  EXECUTE format('GRANT SELECT, INSERT, UPDATE ON public.fellow_email_changes TO %I', app_role);
  RAISE NOTICE 'Website role % granted.', app_role;
END $grants$;
COMMIT;
-- Tables added by FUTURE migrations need their own grants for this role.
