-- READ-ONLY. Point-in-time restore test on STAGING (sql/staging/README.md, step 10).
-- Run it three times and save each output:
--   (a) on staging, just before the restore point          -> "before"
--   (b) on staging, after adding one more synthetic record  -> "after"
--   (c) on the Neon branch restored to the restore point    -> must equal (a), not (b)
SELECT now() AS checked_at,
  (SELECT count(*) FROM timesheets) AS timesheets,
  (SELECT count(*) FROM timesheet_versions) AS versions,
  (SELECT count(*) FROM timesheet_events) AS history_events,
  (SELECT max(id) FROM timesheet_events) AS last_event_id,
  (SELECT count(*) FROM fellows) AS fellows,
  (SELECT count(*) FROM identity_admin_audit) AS audit_rows,
  (SELECT md5(coalesce(string_agg(t::text, '|' ORDER BY t.id), '')) FROM timesheets t) AS timesheets_checksum,
  (SELECT md5(coalesce(string_agg(v::text, '|' ORDER BY v.sheet_id, v.version), '')) FROM timesheet_versions v) AS versions_checksum;
