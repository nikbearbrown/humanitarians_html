-- Undo 004 (evidence timesheets). ONLY for the case where 004 was applied and has to
-- be taken out again BEFORE anyone used timesheets.
--
-- Before running: set TIMESHEETS_ENABLED=false (or unset) in Vercel and redeploy, and
-- run sql/rollback/007_down.sql. The guard below refuses, and changes nothing, if
-- 007 is still installed or if ANY timesheet, version, history entry, request receipt
-- or board-viewer grant exists. Real timesheet records are never dropped by a script:
-- removing them is a records-retention decision for Nik, not a rollback step.
-- Legacy Ledger tables (ledger_entries, ledger_updates) are not touched.
BEGIN;
SET LOCAL lock_timeout = '5s';
DO $guard$
DECLARE n bigint := 0;
BEGIN
  IF to_regclass('public.timesheets') IS NULL THEN
    RAISE EXCEPTION '004 is not applied. Nothing was changed.';
  END IF;
  IF to_regprocedure('public.timesheet_check_daily_total()') IS NOT NULL THEN
    RAISE EXCEPTION 'Run sql/rollback/007_down.sql first. Nothing was changed.';
  END IF;
  SELECT (SELECT count(*) FROM public.timesheets) + (SELECT count(*) FROM public.timesheet_versions)
       + (SELECT count(*) FROM public.timesheet_events) + (SELECT count(*) FROM public.timesheet_requests)
       + (SELECT count(*) FROM public.timesheet_board_viewers) INTO n;
  IF n > 0 THEN
    RAISE EXCEPTION 'Timesheet records exist (% rows). Refusing to drop them. Nothing was changed. Turn TIMESHEETS_ENABLED off instead.', n;
  END IF;
END $guard$;
-- Sign-in session tokens only (no work records); they are useless without 004.
DROP TABLE public.timesheet_requests, public.timesheet_events, public.timesheet_versions,
           public.timesheets, public.timesheet_board_viewers, public.timesheet_sessions;
DROP FUNCTION public.timesheet_command(uuid,uuid,uuid,integer,text,jsonb),
              public.timesheet_validate_entries(jsonb,date,boolean),
              public.timesheet_can_read(uuid,uuid,uuid),
              public.timesheet_can_read_project(uuid,uuid),
              public.timesheet_protect_version(),
              public.timesheet_event_immutable();
COMMIT;
