-- Additive profile fields. Apply before releasing code that selects these columns.
-- Existing profile data, roles, passwords and assignments are unchanged.
BEGIN;
ALTER TABLE fellows ADD COLUMN IF NOT EXISTS github_url TEXT;
ALTER TABLE fellows ADD COLUMN IF NOT EXISTS website_url TEXT;
ALTER TABLE fellows ADD COLUMN IF NOT EXISTS youtube_url TEXT;
COMMIT;
