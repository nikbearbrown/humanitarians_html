-- Migration: Fellows and Projects directory schema
-- Run against Neon PostgreSQL

BEGIN;

-- Project entries shown on /projects and used in fellow assignments
CREATE TABLE projects (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name           text        NOT NULL,
  slug           text        NOT NULL UNIQUE,
  elevator_pitch text        NOT NULL,
  url            text        NOT NULL,
  substack_url   text,
  active         boolean     NOT NULL DEFAULT true,
  open           boolean     NOT NULL DEFAULT true,
  created_at     timestamptz NOT NULL DEFAULT now()
);

-- Individual fellows (current or alumni) with login credentials
CREATE TABLE fellows (
  id                      uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name                    text        NOT NULL,
  slug                    text        NOT NULL UNIQUE,
  email                   text        NOT NULL UNIQUE,
  password_hash           text        NOT NULL,
  bio                     text,
  photo_url               text,
  status                  text        NOT NULL DEFAULT 'current'
                                      CHECK (status IN ('current', 'alumni')),
  is_admin                boolean     NOT NULL DEFAULT false,
  is_super_admin          boolean     NOT NULL DEFAULT false,
  joined_date             timestamptz NOT NULL DEFAULT now(),
  linkedin_url            text,
  employer                text,
  employer_role           text,
  willing_to_be_contacted boolean     NOT NULL DEFAULT false,
  created_at              timestamptz NOT NULL DEFAULT now()
);

-- Many-to-many: which fellows work on which projects, and in what role
CREATE TABLE fellow_projects (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  fellow_id  uuid        NOT NULL REFERENCES fellows(id)  ON DELETE CASCADE,
  project_id uuid        NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  role       text        NOT NULL DEFAULT 'fellow'
                         CHECK (role IN ('fellow', 'pm')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (fellow_id, project_id)
);

-- Weekly Addams reports: markdown learning documentation submitted by fellows.
-- filed_date stores the WORK WEEK the report is for (Monday of that week).
-- A work week runs Monday → Sunday. Default is the Monday of the current week.
CREATE TABLE reports (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  fellow_id  uuid        NOT NULL REFERENCES fellows(id)  ON DELETE CASCADE,
  project_id uuid                 REFERENCES projects(id) ON DELETE SET NULL,
  content    text        NOT NULL,
  filed_date date        NOT NULL DEFAULT (date_trunc('week', now()))::date,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_fellows_slug       ON fellows (slug);
CREATE INDEX idx_fellows_email      ON fellows (email);
CREATE INDEX idx_fellows_status     ON fellows (status);
CREATE INDEX idx_fellows_is_admin       ON fellows (is_admin);
CREATE INDEX idx_fellows_is_super_admin ON fellows (is_super_admin);
CREATE INDEX idx_fp_fellow_id       ON fellow_projects (fellow_id);
CREATE INDEX idx_fp_project_id      ON fellow_projects (project_id);
CREATE INDEX idx_reports_fellow_id  ON reports (fellow_id);
CREATE INDEX idx_reports_filed_date ON reports (filed_date);
CREATE INDEX idx_reports_created_at ON reports (created_at);

COMMIT;
