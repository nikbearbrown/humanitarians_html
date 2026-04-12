-- ============================================================
-- Humanitarians AI — Current Database Schema
-- Generated: 2026-04-06
-- Source: sql/001_fellows_projects.sql (confirmed) +
--         app/api/**/*.ts INSERT/SELECT queries (inferred)
--
-- Tables marked [CONFIRMED] were defined in a migration file.
-- Tables marked [INFERRED] were reconstructed from API queries;
-- exact types (especially id column) may differ slightly from
-- the live DB.
-- ============================================================

-- ============================================================
-- [INFERRED] blog_posts
-- Source: app/api/admin/blog/route.ts
--         app/api/blog/route.ts
-- ============================================================
CREATE TABLE blog_posts (
  id           serial      PRIMARY KEY,            -- inferred; may be uuid
  title        text        NOT NULL,
  subtitle     text,
  slug         text        NOT NULL UNIQUE,
  byline       text,
  cover_image  text,                               -- URL (Vercel Blob or external)
  content      text        NOT NULL,               -- TipTap HTML
  excerpt      text,
  published    boolean     NOT NULL DEFAULT false,
  published_at timestamptz,
  tags         text[]      NOT NULL DEFAULT '{}',
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- [INFERRED] videos
-- Source: app/api/admin/videos/route.ts
-- ============================================================
CREATE TABLE videos (
  id           serial      PRIMARY KEY,            -- inferred; may be uuid
  title        text        NOT NULL,
  description  text,
  youtube_id   text        NOT NULL UNIQUE,
  tags         text[]      NOT NULL DEFAULT '{}',
  pinned       boolean     NOT NULL DEFAULT false,
  published    boolean     NOT NULL DEFAULT true,
  published_at timestamptz,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- [INFERRED] tools
-- Source: app/api/admin/tools/route.ts
-- ============================================================
CREATE TABLE tools (
  id                  serial      PRIMARY KEY,     -- inferred; may be uuid
  name                text        NOT NULL,
  slug                text        NOT NULL UNIQUE,
  description         text,
  tool_type           text        NOT NULL DEFAULT 'link',
  claude_url          text,
  artifact_id         text,
  artifact_embed_code text,
  tags                text[]      NOT NULL DEFAULT '{}',
  created_at          timestamptz NOT NULL DEFAULT now()
  -- updated_at not observed in queries
);

-- ============================================================
-- [CONFIRMED] projects
-- Source: sql/001_fellows_projects.sql
--
-- NOTE: types/fellows.ts declares `tiers: number[]` on the
-- Project type, but this column is NOT in the migration.
-- Add the line below once confirmed with team:
--   tiers  int[]  NOT NULL DEFAULT '{}',
-- ============================================================
CREATE TABLE projects (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name           text        NOT NULL,
  slug           text        NOT NULL UNIQUE,
  elevator_pitch text        NOT NULL,
  url            text        NOT NULL,
  substack_url   text,
  -- tiers       int[]       NOT NULL DEFAULT '{}',  -- in types/fellows.ts but NOT in migration
  active         boolean     NOT NULL DEFAULT true,
  open           boolean     NOT NULL DEFAULT true,
  created_at     timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- [CONFIRMED] fellows
-- Source: sql/001_fellows_projects.sql
-- ============================================================
CREATE TABLE fellows (
  id                      uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name                    text        NOT NULL,
  slug                    text        NOT NULL UNIQUE,
  email                   text        NOT NULL UNIQUE,
  password_hash           text        NOT NULL,   -- bcrypt, 12 rounds
  bio                     text,
  photo_url               text,                   -- URL (Vercel Blob)
  status                  text        NOT NULL DEFAULT 'current'
                                      CHECK (status IN ('current', 'alumni')),
  joined_date             timestamptz NOT NULL DEFAULT now(),
  linkedin_url            text,
  employer                text,                   -- alumni only (editable)
  employer_role           text,                   -- alumni only (editable)
  willing_to_be_contacted boolean     NOT NULL DEFAULT false,
  created_at              timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- [CONFIRMED] fellow_projects
-- Source: sql/001_fellows_projects.sql
-- ============================================================
CREATE TABLE fellow_projects (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  fellow_id  uuid        NOT NULL REFERENCES fellows(id)  ON DELETE CASCADE,
  project_id uuid        NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  role       text        NOT NULL DEFAULT 'fellow'
                         CHECK (role IN ('fellow', 'pm')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (fellow_id, project_id)
);

-- ============================================================
-- [CONFIRMED] reports
-- Source: sql/001_fellows_projects.sql
--
-- NOTE: project_id is nullable in the DB (ON DELETE SET NULL),
-- but the submit API enforces that project_id is provided and
-- verified against fellow_projects before insert.
-- types/fellows.ts marks project_id as required (non-null).
-- ============================================================
CREATE TABLE reports (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  fellow_id  uuid        NOT NULL REFERENCES fellows(id)  ON DELETE CASCADE,
  project_id uuid                 REFERENCES projects(id) ON DELETE SET NULL,
  content    text        NOT NULL,                -- markdown, min 100 chars (API-enforced)
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- Indexes (CONFIRMED — from sql/001_fellows_projects.sql)
-- ============================================================
CREATE INDEX idx_fellows_slug      ON fellows (slug);
CREATE INDEX idx_fellows_email     ON fellows (email);
CREATE INDEX idx_fellows_status    ON fellows (status);
CREATE INDEX idx_fp_fellow_id      ON fellow_projects (fellow_id);
CREATE INDEX idx_fp_project_id     ON fellow_projects (project_id);
CREATE INDEX idx_reports_fellow_id ON reports (fellow_id);

-- ============================================================
-- Pending migration — add tiers column to projects
-- Run this once confirmed with team:
-- ============================================================
-- ALTER TABLE projects ADD COLUMN tiers int[] NOT NULL DEFAULT '{}';
-- COMMENT ON COLUMN projects.tiers IS 'Irreducibly Human tier numbers (1-7) this project exercises';
