-- REVIEW REQUIRED: additive; never auto-run at startup or deployment. Apply after 004.
-- (Numbered 007: 006 is sql/006_developer_access.sql.)
-- One day can hold at most 24 hours across ALL of a fellow's projects.
-- 004 already enforces 24 hours per day inside one timesheet; this adds the
-- cross-project check when a version is submitted. Only the fellow's own claims
-- count: the latest submitted or approved version of each of their other
-- timesheets. Drafts are still being written and returned versions await
-- correction, so they do not count.
-- Run only when sql/checks/timesheets_preflight.sql says '004 applied' and
-- '007 not applied'. A second run is refused and changes nothing.
BEGIN;
SET LOCAL lock_timeout = '5s';
DO $guard$ BEGIN
  IF to_regclass('public.timesheet_versions') IS NULL OR to_regclass('public.timesheets') IS NULL THEN
    RAISE EXCEPTION '007 needs 004 first. Nothing was changed.';
  END IF;
  IF to_regprocedure('public.timesheet_check_daily_total()') IS NOT NULL
     OR EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'timesheet_daily_total' AND NOT tgisinternal) THEN
    RAISE EXCEPTION '007 is already applied. Nothing was changed. Run sql/checks/timesheets_preflight.sql.';
  END IF;
END $guard$;
CREATE FUNCTION timesheet_check_daily_total() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE owner uuid; over record;
BEGIN
 IF OLD.state <> 'draft' OR NEW.state <> 'submitted' THEN RETURN NEW; END IF;
 SELECT fellow_id INTO owner FROM timesheets WHERE id=NEW.sheet_id;
 -- Serialize one fellow's submissions, so two projects submitted at the same
 -- time cannot each pass without seeing the other.
 PERFORM pg_advisory_xact_lock(hashtextextended('timesheet-daily-total:' || owner::text, 0));
 SELECT day, sum(minutes)::integer AS total INTO over FROM (
   SELECT e->>'date' AS day, (e->>'minutes')::integer AS minutes
     FROM jsonb_array_elements(NEW.entries) e
   UNION ALL
   SELECT e->>'date', (e->>'minutes')::integer
     FROM timesheets s
     JOIN LATERAL (SELECT v.entries FROM timesheet_versions v
                    WHERE v.sheet_id=s.id AND v.state IN ('submitted','approved')
                    ORDER BY v.version DESC LIMIT 1) claimed ON true
     CROSS JOIN jsonb_array_elements(claimed.entries) e
    WHERE s.fellow_id=owner AND s.id<>NEW.sheet_id
 ) days GROUP BY day HAVING sum(minutes)>1440 ORDER BY day LIMIT 1;
 IF FOUND THEN
  -- Names only the fellow's own date and total, so the API may show it to them.
  RAISE EXCEPTION 'Your hours on % add up to % across all your projects, which is more than 24 hours. Check your other timesheets for that day.',
    over.day, (over.total/60) || ':' || lpad((over.total%60)::text, 2, '0')
    USING ERRCODE='HT001';
 END IF;
 RETURN NEW;
END $$;
CREATE TRIGGER timesheet_daily_total BEFORE UPDATE ON timesheet_versions FOR EACH ROW EXECUTE FUNCTION timesheet_check_daily_total();
REVOKE ALL ON FUNCTION timesheet_check_daily_total() FROM PUBLIC;
COMMIT;
