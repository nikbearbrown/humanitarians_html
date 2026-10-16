-- Project Ledger: additions to the existing database.
-- Only adds columns and tables, nothing existing is changed or removed.
-- Run on the production database on 2026-10-09.

-- 1. fellows: GitHub username (empty if not entered)
ALTER TABLE public.fellows
  ADD COLUMN IF NOT EXISTS github_username text NOT NULL DEFAULT '';

-- 2. projects: fields the ledger tracks per project
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS phase text NOT NULL DEFAULT 'Active'
    CHECK (phase IN ('Idea', 'Active', 'Blocked', 'Paused', 'Done')),
  ADD COLUMN IF NOT EXISTS next_step text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS weekly_hours_target integer NOT NULL DEFAULT 20,
  ADD COLUMN IF NOT EXISTS strands text[] NOT NULL DEFAULT '{}';  -- sub-projects under the PM

-- 3. ledger_entries: weekly work and hours for each PM and volunteer
CREATE TABLE IF NOT EXISTS public.ledger_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  fellow_id uuid NOT NULL REFERENCES public.fellows(id) ON DELETE CASCADE,  -- who did the work
  week date NOT NULL,                                                       -- Monday of the week
  worked_on text NOT NULL DEFAULT '',
  next_step text NOT NULL DEFAULT '',
  hours numeric(5,1) NOT NULL DEFAULT 0 CHECK (hours >= 0),
  entered_by uuid REFERENCES public.fellows(id) ON DELETE SET NULL,         -- who typed it in
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 4. ledger_updates: PM's weekly notes about a project
CREATE TABLE IF NOT EXISTS public.ledger_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  author_id uuid REFERENCES public.fellows(id) ON DELETE SET NULL,
  week date NOT NULL,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
