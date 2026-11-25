-- STAGING ONLY (humanitarians-ledger-staging). Never run on production.
-- Fictional people and projects for testing PR #16. Every address is @example.org,
-- so with the test mail sink no email can reach a real person.
--
-- Passwords: every account starts with an UNUSABLE password (a bcrypt hash of a
-- random value that was never stored or shown). Each tester sets their own through
-- "Forgot password?" on the preview, which also exercises reset-email delivery.
-- No password exists in this file, the repository, email or chat.
--
-- Run as the owner after 01_create_staging_app.sql. Guards: refuses to run if any
-- non-synthetic account exists or if this seed was already loaded. One transaction.
BEGIN;
DO $guard$ BEGIN
  IF to_regclass('public.identity_admin_grants') IS NULL THEN
    RAISE EXCEPTION 'Apply 004, 005, 007, 008 first. Nothing was changed.';
  END IF;
  IF EXISTS (SELECT 1 FROM fellows WHERE email NOT LIKE '%@example.org') THEN
    RAISE EXCEPTION 'This database has non-synthetic accounts. It is not the empty staging database. Nothing was changed.';
  END IF;
  IF EXISTS (SELECT 1 FROM fellows WHERE email LIKE '%@example.org') THEN
    RAISE EXCEPTION 'The synthetic seed is already loaded. Nothing was changed.';
  END IF;
END $guard$;

INSERT INTO projects (id, name, slug, elevator_pitch, url) VALUES
  ('5a000000-0000-4000-8000-000000000001', 'Staging Project Alpha', 'staging-alpha', 'Synthetic project for staging tests.', 'https://example.org/alpha'),
  ('5a000000-0000-4000-8000-000000000002', 'Staging Project Beta',  'staging-beta',  'Synthetic project for staging tests.', 'https://example.org/beta');

INSERT INTO fellows (id, name, slug, email, password_hash) VALUES
  ('5f000000-0000-4000-8000-000000000001', 'Pat Alpha (PM, synthetic)',      'staging-pm-alpha',      'pm.alpha@example.org',      '$2b$12$nHYUeXDV64iKR5v6HVA2FuHkQcIw5ZYivOiUV9dirJgyPqS6ISYju'),
  ('5f000000-0000-4000-8000-000000000002', 'Bo Beta (PM, synthetic)',        'staging-pm-beta',       'pm.beta@example.org',       '$2b$12$nHYUeXDV64iKR5v6HVA2FuHkQcIw5ZYivOiUV9dirJgyPqS6ISYju'),
  ('5f000000-0000-4000-8000-000000000003', 'Val One (volunteer, synthetic)', 'staging-volunteer-one', 'volunteer.one@example.org', '$2b$12$nHYUeXDV64iKR5v6HVA2FuHkQcIw5ZYivOiUV9dirJgyPqS6ISYju'),
  ('5f000000-0000-4000-8000-000000000004', 'Vic Two (volunteer, synthetic)', 'staging-volunteer-two', 'volunteer.two@example.org', '$2b$12$nHYUeXDV64iKR5v6HVA2FuHkQcIw5ZYivOiUV9dirJgyPqS6ISYju'),
  ('5f000000-0000-4000-8000-000000000005', 'Ida Admin (identity admin, synthetic)', 'staging-identity-admin', 'identity.admin@example.org', '$2b$12$nHYUeXDV64iKR5v6HVA2FuHkQcIw5ZYivOiUV9dirJgyPqS6ISYju'),
  ('5f000000-0000-4000-8000-000000000006', 'Bea Board (board viewer, synthetic)',    'staging-board-viewer',   'board.viewer@example.org',   '$2b$12$nHYUeXDV64iKR5v6HVA2FuHkQcIw5ZYivOiUV9dirJgyPqS6ISYju'),
  ('5f000000-0000-4000-8000-000000000007', 'Dev Reader (developer, synthetic)',     'staging-developer',      'developer@example.org',      '$2b$12$nHYUeXDV64iKR5v6HVA2FuHkQcIw5ZYivOiUV9dirJgyPqS6ISYju');

-- Assignments:
--   Alpha: PM Pat; volunteers Val and Vic.   Beta: PM Bo; volunteer Val.
--   Val is on both projects, for the 24-hour limit across projects.
--   Pat is also a volunteer on Beta, so Pat can submit their own hours (self-approval test).
INSERT INTO fellow_projects (fellow_id, project_id, role) VALUES
  ('5f000000-0000-4000-8000-000000000001', '5a000000-0000-4000-8000-000000000001', 'pm'),
  ('5f000000-0000-4000-8000-000000000002', '5a000000-0000-4000-8000-000000000002', 'pm'),
  ('5f000000-0000-4000-8000-000000000003', '5a000000-0000-4000-8000-000000000001', 'fellow'),
  ('5f000000-0000-4000-8000-000000000003', '5a000000-0000-4000-8000-000000000002', 'fellow'),
  ('5f000000-0000-4000-8000-000000000004', '5a000000-0000-4000-8000-000000000001', 'fellow'),
  ('5f000000-0000-4000-8000-000000000001', '5a000000-0000-4000-8000-000000000002', 'fellow');

-- Access grants, the same way the owner would make them on production.
INSERT INTO identity_admin_grants (fellow_id, granted_by, reason, expires_at) VALUES
  ('5f000000-0000-4000-8000-000000000005', 'Mohan T. (staging)', 'Staging test of identity administration', now() + interval '14 days');
INSERT INTO timesheet_board_viewers (fellow_id, granted_by, reason) VALUES
  ('5f000000-0000-4000-8000-000000000006', 'Mohan T. (staging)', 'Staging test of board read-only view');
INSERT INTO developer_grants (fellow_id, granted_by, reason, expires_at) VALUES
  ('5f000000-0000-4000-8000-000000000007', 'Mohan T. (staging)', 'Staging test of developer read-only access', now() + interval '14 days');
COMMIT;

-- Expected afterwards: 7 fellows (all @example.org), 2 projects, 6 assignments,
-- 1 identity admin, 1 board viewer, 1 developer.
