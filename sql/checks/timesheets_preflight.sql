-- READ-ONLY. Safe to run any number of times, on production or a backup branch.
-- Run this BEFORE applying 004, 005, 007 or 008, and again AFTER, and keep both outputs.
-- It changes nothing: it only reads the system catalogs and counts rows.
--
-- How to read the result (one row per check):
--   prerequisites   every row must say 'ok'
--   004/005/007/008 'not applied' -> run that file
--                   'applied'     -> skip that file (do NOT run it again)
--                   'PARTIAL'     -> STOP. Something was half-applied by hand; ask before continuing.
--   timesheet data  how many timesheet rows exist (decides whether rollback is still possible)
--   roles           who you are connected as, and who owns the tables (for sql/grants/)
WITH expected(migration, kind, name) AS (VALUES
  ('004','table','timesheet_sessions'), ('004','table','timesheet_board_viewers'),
  ('004','table','timesheets'), ('004','table','timesheet_versions'),
  ('004','table','timesheet_events'), ('004','table','timesheet_requests'),
  ('004','index','timesheet_project_week'), ('004','index','timesheet_event_sheet'),
  ('004','function','timesheet_protect_version()'), ('004','function','timesheet_event_immutable()'),
  ('004','function','timesheet_can_read(uuid,uuid,uuid)'), ('004','function','timesheet_can_read_project(uuid,uuid)'),
  ('004','function','timesheet_validate_entries(jsonb,date,boolean)'),
  ('004','function','timesheet_command(uuid,uuid,uuid,integer,text,jsonb)'),
  ('004','trigger','timesheet_version_guard'), ('004','trigger','timesheet_event_guard'),
  ('005','column','github_url'), ('005','column','website_url'), ('005','column','youtube_url'),
  ('007','function','timesheet_check_daily_total()'), ('007','trigger','timesheet_daily_total'),
  ('008','table','identity_admin_grants'), ('008','table','identity_admin_audit'),
  ('008','index','identity_admin_one_active_grant'), ('008','index','identity_admin_audit_target'),
  ('008','function','identity_admin_grant_history()'), ('008','function','identity_admin_audit_immutable()'),
  ('008','trigger','identity_admin_grant_guard'), ('008','trigger','identity_admin_audit_guard')
), present AS (
  SELECT migration, name, CASE kind
    WHEN 'table'    THEN to_regclass('public.' || name) IS NOT NULL
    WHEN 'index'    THEN to_regclass('public.' || name) IS NOT NULL
    WHEN 'function' THEN to_regprocedure('public.' || name) IS NOT NULL
    WHEN 'trigger'  THEN EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = name AND NOT tgisinternal)
    WHEN 'column'   THEN EXISTS (SELECT 1 FROM information_schema.columns
                                  WHERE table_schema = 'public' AND table_name = 'fellows' AND column_name = name)
  END AS found
  FROM expected
), status AS (
  SELECT migration, count(*) FILTER (WHERE found) AS have, count(*) AS want,
         string_agg(name, ', ' ORDER BY name) FILTER (WHERE NOT found) AS missing
  FROM present GROUP BY migration
), prereq(name, ok) AS (VALUES
  ('table fellows (001)',           to_regclass('public.fellows') IS NOT NULL),
  ('table projects (001)',          to_regclass('public.projects') IS NOT NULL),
  ('table fellow_projects (001)',   to_regclass('public.fellow_projects') IS NOT NULL),
  ('table ledger_entries (003)',    to_regclass('public.ledger_entries') IS NOT NULL),
  ('table ledger_updates (003)',    to_regclass('public.ledger_updates') IS NOT NULL),
  ('table developer_grants (006)',  to_regclass('public.developer_grants') IS NOT NULL),
  ('gen_random_uuid() available',   to_regprocedure('gen_random_uuid()') IS NOT NULL),
  ('PostgreSQL 13 or newer',        current_setting('server_version_num')::int >= 130000)
)
SELECT 1 AS step, 'prerequisite' AS check_name, name AS item, CASE WHEN ok THEN 'ok' ELSE 'MISSING - stop' END AS result
  FROM prereq
UNION ALL
SELECT 2, 'migration ' || migration, have || ' of ' || want || ' objects',
       CASE WHEN have = 0 THEN 'not applied'
            WHEN have = want THEN 'applied'
            ELSE 'PARTIAL - stop (missing: ' || missing || ')' END
  FROM status
UNION ALL
SELECT 3, 'timesheet data', 'rows in timesheets',
       CASE WHEN to_regclass('public.timesheets') IS NULL THEN 'no table yet'
            ELSE (xpath('/table/row/n/text()', query_to_xml('SELECT count(*) AS n FROM public.timesheets', false, false, '')))[1]::text END
UNION ALL
SELECT 4, 'roles', 'connected as', current_user::text
UNION ALL
SELECT 4, 'roles', 'owner of table fellows',
       coalesce((SELECT pg_get_userbyid(relowner)::text FROM pg_class WHERE oid = to_regclass('public.fellows')), 'n/a')
ORDER BY 1, 2, 3;
