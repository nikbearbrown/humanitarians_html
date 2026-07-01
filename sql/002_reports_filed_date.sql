-- Migration: add filed_date column to reports.
-- Run this against an existing DB that was created from 001_fellows_projects.sql
-- *before* the filed_date column was added. Fresh installs from the updated 001
-- file already include the column and don't need to run this.

BEGIN;

ALTER TABLE reports
  ADD COLUMN IF NOT EXISTS filed_date date;

-- Backfill existing rows: set filed_date to the Monday of the week they were created.
UPDATE reports
  SET filed_date = (date_trunc('week', created_at))::date
  WHERE filed_date IS NULL;

ALTER TABLE reports
  ALTER COLUMN filed_date SET NOT NULL,
  ALTER COLUMN filed_date SET DEFAULT (date_trunc('week', now()))::date;

CREATE INDEX IF NOT EXISTS idx_reports_filed_date ON reports (filed_date);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports (created_at);

COMMIT;
