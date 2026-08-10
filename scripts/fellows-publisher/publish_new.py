#!/usr/bin/env python3
"""
Fellows Research publisher.

Drains pending rows from the video_submissions table (Neon), downloads each
video from Vercel Blob, uploads it to the humanitarians ai YouTube channel,
adds it to the Fellows Research playlist, and marks the row published.

Run by hand or on a cron schedule. Safe to re-run: only status='pending'
rows are touched, and each row is marked before moving on.

Requires:
  .env (or environment)  DATABASE_URL=postgres://... (same as the site)
  client_secret.json     OAuth desktop client from Google Cloud console
  token_youtube.json     created by: python3 authorize.py
"""

import json
import os
import sys
import time
import tempfile
from pathlib import Path

import psycopg2
import psycopg2.extras
import requests as http
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from googleapiclient.errors import HttpError

# ----------------------------------------------------------------------
# Config
# ----------------------------------------------------------------------
BASE = Path(__file__).resolve().parent

PLAYLIST_NAME = "Fellows Research"   # matched by title, case-insensitive
PRIVACY_STATUS = "private"           # review gate; see README before changing
CATEGORY_ID = "27"                   # Education
MAX_PER_RUN = 6                      # default YouTube quota ~= 6 uploads/day

DEFAULT_TAGS = [
    "HumanitariansAI", "FellowsResearch", "ClaudeCode",
    "ExplainerVideo", "AIResearch",
]
BOILERPLATE = (
    "Humanitarians AI Fellows Series — helping researchers share their "
    "work with the world.\n\n"
    "#HumanitariansAI #FellowsResearch #ClaudeCode #ExplainerVideo #AIResearch"
)

YT_SCOPES = [
    "https://www.googleapis.com/auth/youtube.upload",
    "https://www.googleapis.com/auth/youtube",
]

# Default token: the existing brutalist-art channel credentials.
# Override with YT_TOKEN_FILE in .env, or drop a token_youtube.json
# next to this script (created by authorize.py).
DEFAULT_TOKEN_FILE = (
    "/Users/bear/Documents/CoWork/bear-textbooks/books/brutalist-art/"
    "youtube/credentials/humanitarians/youtube_token.json"
)


# ----------------------------------------------------------------------
# Env / auth
# ----------------------------------------------------------------------
def load_env():
    env_file = BASE / ".env"
    if env_file.exists():
        for line in env_file.read_text().splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, _, v = line.partition("=")
                os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


def youtube_client():
    candidates = [
        Path(os.environ.get("YT_TOKEN_FILE", DEFAULT_TOKEN_FILE)),
        BASE / "token_youtube.json",
    ]
    token_path = next((p for p in candidates if p.exists()), None)
    if token_path is None:
        sys.exit(
            "No YouTube token found. Looked for:\n  " +
            "\n  ".join(str(p) for p in candidates) +
            "\nSet YT_TOKEN_FILE in .env, or run: python3 authorize.py"
        )
    print(f"Using YouTube token: {token_path}")
    creds = Credentials.from_authorized_user_file(str(token_path), YT_SCOPES)
    if creds.expired and creds.refresh_token:
        creds.refresh(Request())
        token_path.write_text(creds.to_json())
    return build("youtube", "v3", credentials=creds)


# ----------------------------------------------------------------------
# YouTube helpers
# ----------------------------------------------------------------------
def find_playlist_id(youtube):
    page_token = None
    while True:
        resp = youtube.playlists().list(
            part="snippet", mine=True, maxResults=50, pageToken=page_token
        ).execute()
        for pl in resp.get("items", []):
            if pl["snippet"]["title"].strip().lower() == PLAYLIST_NAME.lower():
                return pl["id"]
        page_token = resp.get("nextPageToken")
        if not page_token:
            return None


def build_description(row):
    desc = (row["description"] or "").strip()
    fellow = (row["fellow_name"] or "").strip()
    parts = [p for p in [desc] if p]
    if fellow:
        parts.append(f"A Fellows Research video by {fellow}.")
    parts.append(BOILERPLATE)
    return "\n\n".join(parts)[:5000]


def upload_video(youtube, path: Path, row) -> str:
    tags = list(row["tags"] or [])
    for t in DEFAULT_TAGS:
        if t not in tags:
            tags.append(t)
    body = {
        "snippet": {
            "title": row["title"][:100],
            "description": build_description(row),
            "tags": tags[:30],
            "categoryId": CATEGORY_ID,
        },
        "status": {
            "privacyStatus": PRIVACY_STATUS,
            "selfDeclaredMadeForKids": False,
        },
    }
    media = MediaFileUpload(str(path), chunksize=8 * 1024 * 1024, resumable=True)
    request = youtube.videos().insert(part="snippet,status", body=body, media_body=media)
    response = None
    while response is None:
        status, response = request.next_chunk()
        if status:
            print(f"    upload {int(status.progress() * 100)}%", end="\r")
    print()
    return response["id"]


def http_error_reason(e: HttpError) -> str:
    try:
        return json.loads(e.content)["error"]["errors"][0]["reason"]
    except Exception:
        return str(e)


QUOTA_REASONS = {"quotaExceeded", "uploadLimitExceeded",
                 "dailyLimitExceeded", "rateLimitExceeded"}


# ----------------------------------------------------------------------
# Main
# ----------------------------------------------------------------------
def main():
    load_env()
    db_url = os.environ.get("DATABASE_URL")
    if not db_url:
        sys.exit("DATABASE_URL not set (put it in scripts/fellows-publisher/.env)")

    youtube = youtube_client()
    playlist_id = find_playlist_id(youtube)
    if not playlist_id:
        print(f"warning: playlist '{PLAYLIST_NAME}' not found on this channel; "
              "videos will upload but won't be added to a playlist.")

    conn = psycopg2.connect(db_url)
    conn.autocommit = True
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    cur.execute("""
        SELECT vs.id, vs.title, vs.description, vs.tags, vs.blob_url,
               f.name AS fellow_name, f.email AS fellow_email
        FROM video_submissions vs
        JOIN fellows f ON f.id = vs.fellow_id
        WHERE vs.status = 'pending'
        ORDER BY vs.created_at
        LIMIT %s
    """, (MAX_PER_RUN,))
    rows = cur.fetchall()

    if not rows:
        print("Queue clean — nothing to publish.")
        return

    print(f"{len(rows)} submission(s) pending.")
    for row in rows:
        print(f"\n-> {row['title']}  (by {row['fellow_name']})")
        try:
            with tempfile.TemporaryDirectory() as tmp:
                local = Path(tmp) / "video.mp4"
                with http.get(row["blob_url"], stream=True, timeout=300) as r:
                    r.raise_for_status()
                    with local.open("wb") as f:
                        for chunk in r.iter_content(chunk_size=16 * 1024 * 1024):
                            f.write(chunk)
                yt_id = upload_video(youtube, local, row)
        except HttpError as e:
            reason = http_error_reason(e)
            if reason in QUOTA_REASONS:
                print(f"    STOP: {reason} — quota spent for today. "
                      "Remaining submissions stay queued for the next run.")
                return
            print(f"    ERROR: {reason} — marking failed.")
            cur.execute(
                "UPDATE video_submissions SET status='failed', error=%s WHERE id=%s",
                (reason[:500], row["id"]),
            )
            continue
        except Exception as e:  # download or filesystem failure
            print(f"    ERROR: {e} — leaving queued for the next run.")
            continue

        cur.execute("""
            UPDATE video_submissions
            SET status='published', youtube_id=%s, error=NULL, published_at=now()
            WHERE id=%s
        """, (yt_id, row["id"]))
        print(f"    https://youtu.be/{yt_id}  ({PRIVACY_STATUS})")

        if playlist_id:
            try:
                youtube.playlistItems().insert(
                    part="snippet",
                    body={"snippet": {
                        "playlistId": playlist_id,
                        "resourceId": {"kind": "youtube#video", "videoId": yt_id},
                    }},
                ).execute()
                print(f"    added to '{PLAYLIST_NAME}'")
            except HttpError as e:
                print(f"    warning: playlist add failed "
                      f"({http_error_reason(e)}); video is uploaded.")

    print("\nDone.")


if __name__ == "__main__":
    main()
