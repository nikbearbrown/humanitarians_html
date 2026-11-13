-- Undo 007 (the 24-hour cross-project daily limit). Removes one trigger and one
-- function; no data is stored by 007, so nothing is lost. Safe to run more than once.
-- Run this BEFORE sql/rollback/004_down.sql. The site keeps working; submissions are
-- then only limited to 24 hours per day inside one timesheet (004's own check).
BEGIN;
SET LOCAL lock_timeout = '5s';
DROP TRIGGER IF EXISTS timesheet_daily_total ON public.timesheet_versions;
DROP FUNCTION IF EXISTS public.timesheet_check_daily_total();
COMMIT;
