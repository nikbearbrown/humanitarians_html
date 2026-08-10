# Fellows Research Publisher

Fellows upload finished explainer videos at **humanitarians.ai/fellows/submit-video**
(logged in with their existing fellow credentials). Files go straight from the
browser to Vercel Blob; a `video_submissions` row lands in Neon with
`status='pending'`. This script drains the queue: it downloads each pending
video, uploads it to the **humanitarians ai** YouTube channel, adds it to the
**Fellows Research** playlist, and marks the row `published`.

Fellows never touch channel credentials. The only machine that holds a YouTube
token is the one running this script.

## How the pieces fit

```
fellow browser ──▶ Vercel Blob (direct client upload, no size-limit issues)
       │
       └────────▶ POST /api/fellows/videos  ──▶ Neon: video_submissions (pending)

this script (cron) ──▶ reads pending rows ──▶ downloads blob ──▶ YouTube API
                                                │
                                                ├─▶ adds to "Fellows Research" playlist
                                                └─▶ marks row published / failed
```

## One-time setup

### 1. Run the database migration

Open the Neon SQL editor (or psql) and run the migration:

```bash
psql "$DATABASE_URL" -f sql/002_video_submissions.sql
```

### 2. Deploy the site changes

```bash
git add app/api/fellows/videos app/fellows/submit-video app/explainers sql/002_video_submissions.sql scripts/fellows-publisher && git commit -m "Fellow video submissions + explainers page + YouTube publisher" && git push
```

No new Vercel environment variables are needed — the flow reuses the existing
Blob store, `DATABASE_URL`, and `FELLOW_SESSION_SECRET`.

### 3. Install publisher dependencies (on the machine that will run it)

```bash
cd scripts/fellows-publisher && pip3 install -r requirements.txt
```

> **Already authorized?** The script defaults to the existing channel token at
> `books/brutalist-art/youtube/credentials/humanitarians/youtube_token.json`
> (refresh token + upload/playlist scopes — verified working). If that token
> keeps working, **skip steps 4–8** and go straight to step 9. To point at a
> different token, set `YT_TOKEN_FILE=/path/to/token.json` in `.env`.

### 4. (Only if re-authorizing) Create a Google Cloud project and enable the YouTube Data API

In [Google Cloud console](https://console.cloud.google.com/):
create a project (e.g. `hai-fellows-publisher`), then enable
**YouTube Data API v3** under APIs & Services → Library.

### 5. Configure the OAuth consent screen

APIs & Services → OAuth consent screen: choose **External**, fill in the app
name and support email, and add the Google account that manages the
humanitarians ai channel as a **test user**. (Testing mode is fine — only you
ever authorize.)

### 6. Create OAuth credentials

APIs & Services → Credentials → Create credentials → **OAuth client ID** →
Application type **Desktop app**. Download the JSON and save it as:

```
scripts/fellows-publisher/client_secret.json
```

### 7. Create the .env file

Create `scripts/fellows-publisher/.env` with the same `DATABASE_URL` the site
uses (Vercel dashboard → project → Settings → Environment Variables):

```
DATABASE_URL=postgres://USER:PASSWORD@HOST/neondb?sslmode=require
```

### 8. Authorize the channel (one time)

```bash
python3 authorize.py
```

A browser opens. **Pick the "humanitarians ai" channel** in the account
chooser — not your personal channel. This writes `token_youtube.json`.

### 9. Test run

```bash
python3 publish_new.py
```

With an empty queue it prints `Queue clean — nothing to publish.` Upload a
test video at `/fellows/submit-video` and run it again.

### 10. Schedule it (hourly)

```bash
crontab -e
```

Add this line (adjust the path):

```
0 * * * * cd /Users/bear/Documents/CoWork/bear-textbooks/books/humanitarians_html/scripts/fellows-publisher && /usr/bin/python3 publish_new.py >> publish.log 2>&1
```

## Things to know

**Videos land as `private`.** Two reasons. First, it's a review gate — you
check a fellow's video in YouTube Studio before flipping it public. Second,
YouTube **locks API uploads from unaudited projects to private** regardless of
what you request. File the
[API compliance audit](https://support.google.com/youtube/contact/yt_api_form)
once (it's a form, free); after approval you can change `PRIVACY_STATUS` in
`publish_new.py` to `public` or `unlisted` if you want to skip the manual
review. Until the audit clears, videos uploaded via the API may not be
flippable to public — worst case, download from Blob and drag into Studio
for the few made before approval.

**Quota is ~6 uploads/day.** Each upload costs 1,600 of the default 10,000
daily units. The script stops cleanly when quota runs out and picks up the
remainder on the next run. Request a quota increase through the same audit
form if the fellows program outgrows this.

**The playlist must exist.** Create a playlist named exactly
`Fellows Research` on the channel (the script matches by name,
case-insensitive).

**Failed rows don't retry.** A row marked `failed` (bad file, rejected by
YouTube) is skipped so it can't poison the queue. Fix the cause, then reset it:

```sql
UPDATE video_submissions SET status='pending', error=NULL WHERE id='<row-id>';
```

**Storage cost is a non-issue.** Explainers run a few MB; Blob at
$0.023/GB-month means even hundreds of videos cost pennies. Delete old blobs
from the Vercel dashboard if you ever care.
