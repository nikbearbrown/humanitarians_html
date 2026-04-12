# Fellows Tracking — Schema & Auth Probe
Date: 2026-04-06

---

## 1. Current Auth System

### Admin auth (`lib/admin-auth.ts` + `middleware.ts`)

Single-password system. No per-user admin identity.

- **Secret**: `ADMIN_PASSWORD` environment variable
- **Token**: HMAC-SHA256 of the literal string `"admin_session"` keyed with `ADMIN_PASSWORD`, encoded as hex. The token never changes — it is deterministic. Any valid session is identical.
- **Cookie**: `admin_session` (HttpOnly implied via Next.js middleware)
- **Where checked**:
  - `middleware.ts` — Edge middleware protecting all routes matching `/admin/dashboard/:path*`. Redirects to `/admin/login` on failure and clears the cookie.
  - `lib/admin-auth.ts → isAdmin()` — Called inline at the top of every admin API route handler.
- **Login route**: `POST /api/admin/login` — verifies the submitted password, sets the cookie on success.
- **Multi-user**: No. There is exactly one admin. No user table, no role system, no per-user sessions for admin.

### Fellow auth (`lib/fellow-auth.ts`)

Per-fellow, database-backed, bcrypt password.

- **Secret**: `FELLOW_SESSION_SECRET` environment variable (separate from admin secret). Must be set or the server throws at runtime.
- **Password storage**: bcrypt (12 rounds) stored in `fellows.password_hash`
- **Token structure**: `base64(fellow_id):hmac_signature` — the fellow's UUID is embedded in the cookie value and HMAC-signed with `FELLOW_SESSION_SECRET`
- **Cookie**: `fellow_session` — HttpOnly, Secure (prod), SameSite=Lax, 30-day expiry
- **Where checked**: `getFellowFromSession(req)` is called at the top of every fellow-facing API route. It decodes the cookie, verifies the signature, then fetches the fellow row from the DB (excluding `password_hash`).
- **Session resolution**: Live DB lookup on every request — no token expiry in the DB, only the cookie maxAge.

### ⚠️ Known bug in password-change route

`app/api/fellows/me/password/route.ts` calls `verifyPassword(current_password, fellow.password_hash)`, but `getFellowFromSession` returns `Omit<Fellow, 'password_hash'>` — `password_hash` is never fetched. At runtime this passes `undefined` to `bcrypt.compare`, which will always fail. The route needs to re-query the DB for `password_hash` by fellow ID before verifying.

---

## 2. Current Database Schema

### Connection (`lib/db.ts`)

Lazy Proxy pattern. A `neon()` client is created on first use, sourced from `DATABASE_URL`. No connection pooling config beyond Neon's serverless defaults. No ORM, no migration runner — raw tagged-template SQL via `@neondatabase/serverless`.

### Tables (confirmed via `sql/001_fellows_projects.sql` and API route queries)

#### `blog_posts`
Inferred from INSERT/SELECT queries in `app/api/admin/blog/`.

| Column | Type | Notes |
|--------|------|-------|
| id | serial/uuid | primary key |
| title | text | required |
| subtitle | text | nullable |
| slug | text | unique |
| byline | text | nullable |
| cover_image | text | nullable, URL |
| content | text | HTML/TipTap output |
| excerpt | text | nullable |
| published | boolean | default false |
| published_at | timestamptz | nullable |
| tags | text[] | array |
| created_at | timestamptz | |
| updated_at | timestamptz | |

#### `videos`
Inferred from INSERT/SELECT queries in `app/api/admin/videos/`.

| Column | Type | Notes |
|--------|------|-------|
| id | serial/uuid | primary key |
| title | text | required |
| description | text | nullable |
| youtube_id | text | unique |
| tags | text[] | array |
| pinned | boolean | default false |
| published | boolean | default true |
| published_at | timestamptz | nullable |
| created_at | timestamptz | |
| updated_at | timestamptz | |

#### `tools`
Inferred from INSERT/SELECT queries in `app/api/admin/tools/`.

| Column | Type | Notes |
|--------|------|-------|
| id | serial/uuid | primary key |
| name | text | required |
| slug | text | unique |
| description | text | nullable |
| tool_type | text | default 'link' |
| claude_url | text | nullable |
| artifact_id | text | nullable |
| artifact_embed_code | text | nullable |
| tags | text[] | array |
| created_at | timestamptz | |

#### `projects` (confirmed — `sql/001_fellows_projects.sql`)

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, `gen_random_uuid()` |
| name | text | NOT NULL |
| slug | text | NOT NULL UNIQUE |
| elevator_pitch | text | NOT NULL |
| url | text | NOT NULL |
| substack_url | text | nullable |
| active | boolean | NOT NULL DEFAULT true |
| open | boolean | NOT NULL DEFAULT true |
| created_at | timestamptz | NOT NULL DEFAULT now() |

#### `fellows` (confirmed — `sql/001_fellows_projects.sql`)

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, `gen_random_uuid()` |
| name | text | NOT NULL |
| slug | text | NOT NULL UNIQUE |
| email | text | NOT NULL UNIQUE |
| password_hash | text | NOT NULL |
| bio | text | nullable |
| photo_url | text | nullable |
| status | text | NOT NULL DEFAULT 'current', CHECK IN ('current','alumni') |
| joined_date | timestamptz | NOT NULL DEFAULT now() |
| linkedin_url | text | nullable |
| employer | text | nullable |
| employer_role | text | nullable |
| willing_to_be_contacted | boolean | NOT NULL DEFAULT false |
| created_at | timestamptz | NOT NULL DEFAULT now() |

#### `fellow_projects` (confirmed — `sql/001_fellows_projects.sql`)

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, `gen_random_uuid()` |
| fellow_id | uuid | NOT NULL FK → fellows(id) ON DELETE CASCADE |
| project_id | uuid | NOT NULL FK → projects(id) ON DELETE CASCADE |
| role | text | NOT NULL DEFAULT 'fellow', CHECK IN ('fellow','pm') |
| created_at | timestamptz | NOT NULL DEFAULT now() |
| — | — | UNIQUE (fellow_id, project_id) |

#### `reports` (confirmed — `sql/001_fellows_projects.sql`)

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, `gen_random_uuid()` |
| fellow_id | uuid | NOT NULL FK → fellows(id) ON DELETE CASCADE |
| project_id | uuid | nullable FK → projects(id) ON DELETE SET NULL |
| content | text | NOT NULL (min 100 chars enforced in API) |
| created_at | timestamptz | NOT NULL DEFAULT now() |

### Indexes (confirmed)
```sql
idx_fellows_slug       ON fellows (slug)
idx_fellows_email      ON fellows (email)
idx_fellows_status     ON fellows (status)
idx_fp_fellow_id       ON fellow_projects (fellow_id)
idx_fp_project_id      ON fellow_projects (project_id)
idx_reports_fellow_id  ON reports (fellow_id)
```

### ⚠️ Schema/type discrepancy

`types/fellows.ts` declares `tiers: number[]` on the `Project` type, but the `projects` table has no `tiers` column. The column does not exist in the migration file and no query references it. This field is currently phantom — it exists in TypeScript but not in the database.

---

## 3. Existing Data Models (TypeScript)

### `types/index.ts`
Legacy interfaces — not connected to the DB. Used for static data in `/data`.

```typescript
interface BlogPost { id, title, slug, excerpt, content, image, category, date, author }
interface Project  { id, title, slug, description, fullDescription, image, category, year, icon }
```

### `types/fellows.ts`
Live DB-backed types for the fellows system.

```typescript
type Project           // DB projects table + phantom tiers: number[]
type Fellow            // DB fellows table (includes password_hash — never send to client)
type FellowProject     // DB fellow_projects join table
type Report            // DB reports table

type PublicFellow      // Fellow without password_hash or email
type AlumniFellow      // PublicFellow + employer/linkedin fields
type FellowProjectWithProject  // FellowProject + nested Project
type FellowWithProjects        // PublicFellow + projects array
type ProjectWithFellows        // Project + fellows array + pm pointer
type ReportWithProject         // Report + project name/slug
```

Also exports `TIER_LABELS: Record<number, string>` mapping tier numbers 1–7 to Irreducibly Human capacity names.

### `/data` directory
- `data/blogPosts.ts` — static fallback blog post array (pre-DB era, likely unused)
- `data/projects.ts` — static projects array (pre-DB era, likely unused in favor of DB)

---

## 4. Existing API Routes

### Public routes (no auth)
| Route | Method | Description |
|-------|--------|-------------|
| `GET /api/blog` | GET | Returns all published posts (id, title, subtitle, slug, excerpt, published_at) |
| `GET /api/blog/[slug]` | GET | Returns single published post by slug |
| `GET /api/videos` | GET | Returns published videos, pinned first |
| `POST /api/fellows/auth/login` | POST | Fellow login — email+password → sets `fellow_session` cookie |
| `POST /api/fellows/auth/logout` | POST | Clears `fellow_session` cookie |

### Fellow-authenticated routes (require `fellow_session` cookie)
| Route | Method | Description |
|-------|--------|-------------|
| `GET /api/fellows/me` | GET | Returns current fellow's profile (no password_hash) |
| `PATCH /api/fellows/me` | PATCH | Update own bio, photo, linkedin, employer (alumni only), willing_to_be_contacted. Accepts multipart/form-data for photo upload to Vercel Blob. |
| `PATCH /api/fellows/me/password` | PATCH | Change own password (⚠️ has runtime bug — see §1) |
| `GET /api/fellows/me/projects` | GET | Returns list of projects this fellow is assigned to |
| `GET /api/fellows/reports` | GET | Returns all of this fellow's reports, newest first |
| `POST /api/fellows/reports` | POST | Submit a new Addams report (min 100 chars, project_id verified against assignments) |

### Admin-authenticated routes (require `admin_session` cookie)
| Route | Method | Description |
|-------|--------|-------------|
| `POST /api/admin/login` | POST | Admin login → sets `admin_session` cookie |
| `GET /api/admin/blog` | GET | All blog posts (including unpublished) |
| `POST /api/admin/blog` | POST | Create new blog post |
| `GET/PATCH/DELETE /api/admin/blog/[id]` | * | Read, update, delete a post |
| `GET /api/admin/blog/export` | GET | Export posts as JSON (filterable by tags) |
| `POST /api/admin/blog/import-json` | POST | Bulk import posts from JSON |
| `POST /api/admin/blog/import-substack` | POST | Import posts from Substack export |
| `POST /api/admin/notes/sync` | POST | Sync notes (purpose unclear without reading) |
| `GET /api/admin/tools` | GET | All tools |
| `POST /api/admin/tools` | POST | Create tool |
| `GET/PATCH/DELETE /api/admin/tools/[id]` | * | Read, update, delete a tool |
| `GET /api/admin/tools/all` | GET | All tools including artifact metadata |
| `POST /api/admin/tools/bulk-tag` | POST | Bulk-update tags on tools |
| `POST /api/admin/tools/sync-artifacts` | POST | Sync HTML artifacts from public/artifacts to tools table |
| `GET /api/admin/videos` | GET | All videos |
| `POST /api/admin/videos` | POST | Create video |
| `PATCH/DELETE /api/admin/videos/[id]` | * | Update, delete a video |
| `POST /api/admin/videos/bulk-delete` | POST | Delete multiple videos |
| `POST /api/admin/videos/bulk-update` | POST | Bulk update video fields |
| `POST /api/admin/videos/import-youtube` | POST | Import videos from YouTube playlist |
| `GET /api/admin/videos/youtube-playlists` | GET | List YouTube playlists for a channel |
| `POST /api/admin/upload` | POST | Upload image file → Vercel Blob → returns URL |
| `GET/POST /api/admin/substack/sections` | * | Manage Substack sections |
| `GET/PATCH/DELETE /api/admin/substack/sections/[id]` | * | CRUD a section |
| `POST /api/admin/substack/upload` | POST | Upload Substack content |
| **Fellows management** | | |
| `GET /api/admin/fellows/list` | GET | Paginated fellow list with project_count |
| `GET /api/admin/fellows/projects` | GET | All active projects (for dropdowns) |
| `POST /api/admin/fellows` | POST | Create fellow, auto-generates temp password, assigns to projects |
| `PATCH/DELETE /api/admin/fellows/[id]` | * | Update or delete a fellow (supports photo upload) |
| `GET /api/admin/fellows/[id]/detail` | GET | Fellow detail with project assignments |
| `PATCH /api/admin/fellows/[id]/reset-password` | PATCH | Generate and set new temp password for a fellow |
| `POST /api/admin/fellows/bulk` | POST | Bulk-import fellows from CSV (name, email, project_slug, role) → returns results CSV |
| `GET/POST /api/admin/projects` | * | List all projects with fellow count; create project |
| `PATCH/DELETE /api/admin/projects/[id]` | * | Update or delete a project |

---

## 5. Blob Storage Pattern

Vercel Blob (`@vercel/blob`) is used in two contexts:

**1. Admin image uploads** (`POST /api/admin/upload`)
```
const blob = await put(file.name, file, { access: 'public', addRandomSuffix: true })
return blob.url
```
Accepts any image file. The returned URL is stored in the DB (e.g., `blog_posts.cover_image`).

**2. Fellow photo uploads** (`PATCH /api/admin/fellows/[id]` and `PATCH /api/fellows/me`)
```
const blob = await put(`fellows/${fellowId}/${photo.name}`, photo, { access: 'public' })
body.photo_url = blob.url
```
Namespaced under `fellows/<uuid>/`. The URL is stored in `fellows.photo_url`.

**Pattern to reuse**: Accept `multipart/form-data`, extract the file with `formData.get('photo') as File`, check `file.size > 0`, call `put(path, file, { access: 'public' })`, store the returned `.url` in the DB. No cleanup of old blobs on update.

---

## 6. What Already Exists That Fellows Tracking Can Reuse

The fellows tracking system is **substantially complete** at the API layer. The following are fully implemented and ready to use:

| Piece | Status |
|-------|--------|
| DB schema (`sql/001_fellows_projects.sql`) | Complete — 4 tables, all indexes |
| `lib/fellow-auth.ts` | Complete — bcrypt, signed cookies, session resolution |
| `types/fellows.ts` | Complete — all 9 types + TIER_LABELS |
| Admin: create/edit/delete fellows | Complete (`/api/admin/fellows`) |
| Admin: bulk CSV import | Complete (`/api/admin/fellows/bulk`) |
| Admin: reset fellow password | Complete (`/api/admin/fellows/[id]/reset-password`) |
| Admin: create/edit/delete projects | Complete (`/api/admin/projects`) |
| Fellow login/logout | Complete (`/api/fellows/auth/`) |
| Fellow: view/edit own profile | Complete (`/api/fellows/me`) |
| Fellow: photo upload to Vercel Blob | Complete (in PATCH /me) |
| Fellow: view own project assignments | Complete (`/api/fellows/me/projects`) |
| Fellow: submit/list Addams reports | Complete (`/api/fellows/reports`) |
| Vercel Blob upload pattern | Established in 2 places |

---

## 7. What Does Not Exist and Must Be Built

| Gap | Notes |
|-----|-------|
| **`tiers` column on `projects` table** | In `types/fellows.ts` but missing from the DB migration. Need `ALTER TABLE projects ADD COLUMN tiers int[] NOT NULL DEFAULT '{}'`. |
| **Fellow-facing UI** | No pages at `/fellows/login`, `/fellows/dashboard`, `/fellows/reports`, etc. All API routes exist; no UI consuming them. |
| **Admin Fellows UI** | No admin dashboard pages for managing fellows/projects. The API is complete but the admin frontend is absent. |
| **Password-change bug fix** | `PATCH /api/fellows/me/password` needs to re-fetch `password_hash` from DB before calling `verifyPassword`. |
| **Report detail / edit / delete** | `reports` table exists, POST and GET list work. No GET single, PATCH, or DELETE route for reports. |
| **Public fellows directory** | No public-facing `GET /api/fellows` or `GET /api/fellows/[slug]` route for rendering a public directory page. |
| **Public projects directory** | `/api/admin/projects` exists but is admin-gated. No public `GET /api/projects` route. |
| **Middleware protection for fellow routes** | `middleware.ts` only protects `/admin/dashboard/**`. Fellow-facing pages (once built) will need their own middleware matcher or client-side redirect logic. |
| **Email / onboarding flow** | Admin creates fellow with temp password, but there is no email delivery — the temp password is returned in the API response only. An email step (or manual delivery workflow) is missing. |
| **`sql/001_fellows_projects.sql` not yet run against live DB** | Cannot confirm — no migration runner is configured. Must be verified against the live Neon instance. |

---

## 8. Full SQL — Current Schema

See companion file: [`fellows-tracking-current-schema.sql`](./fellows-tracking-current-schema.sql)
