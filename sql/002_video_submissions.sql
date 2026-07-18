-- Migration: Fellow video submissions (research explainer videos → YouTube)
-- Run against Neon PostgreSQL

BEGIN;

-- Videos fellows submit via /fellows/submit-video.
-- The publisher script (scripts/fellows-publisher/) drains status='pending'
-- rows to the humanitarians ai YouTube channel.
CREATE TABLE video_submissions (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  fellow_id     uuid        NOT NULL REFERENCES fellows(id) ON DELETE CASCADE,
  title         text        NOT NULL,
  description   text        NOT NULL DEFAULT '',
  tags          text[]      NOT NULL DEFAULT '{}',
  blob_url      text        NOT NULL,
  blob_pathname text        NOT NULL,
  file_size     bigint,
  status        text        NOT NULL DEFAULT 'pending'
                            CHECK (status IN ('pending', 'published', 'failed')),
  youtube_id    text,
  error         text,
  created_at    timestamptz NOT NULL DEFAULT now(),
  published_at  timestamptz
);

CREATE INDEX idx_video_submissions_status    ON video_submissions (status);
CREATE INDEX idx_video_submissions_fellow_id ON video_submissions (fellow_id);

COMMIT;
