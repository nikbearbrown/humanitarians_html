# CLAUDE.md — Humanitarians AI Website

## What this is

Next.js 15 (app router) website for Humanitarians AI, a 501(c)(3) nonprofit. The site presents the Irreducibly Human framework, fellow projects, blog, tools, videos, and donation pages. Deployed on Vercel.

## Commands

```bash
npm run dev      # Dev server on port 3000
npm run build    # Production build — run after every change to verify
npm run lint     # ESLint
npm install --legacy-peer-deps  # Required flag (see .npmrc)
```

No test suite is configured.

## Tech stack

- **Framework**: Next.js 15.3, React 19, TypeScript 5
- **Styling**: Tailwind CSS 3.4 + shadcn/ui (Radix primitives) + CSS variables (HSL) in `globals.css`
- **Dark mode**: class-based via `next-themes`
- **Icons**: lucide-react
- **Database**: Neon (serverless PostgreSQL) — connection in `lib/db.ts`
- **Editor**: TipTap (blog editor)
- **Storage**: Vercel Blob for uploads
- **Analytics**: Google Analytics (GA4) + Vercel Analytics

## Project structure

```
app/                  # File-based routing (95+ routes)
  layout.tsx          # Root layout: Header → main → Spotify → Footer
  page.tsx            # Homepage
  api/                # API routes (admin, blog, videos)
  admin/              # Admin dashboard (middleware-protected)
components/
  ui/                 # shadcn primitives (button, card, dialog, etc.)
  Header/             # Sticky nav with mobile menu
  Footer/             # Site footer
  BlogEditor/         # TipTap-based rich text editor
lib/
  utils.ts            # cn() helper, getReadingTime()
  db.ts               # Neon DB connection (lazy proxy)
  admin-auth.ts       # HMAC-SHA256 session auth
data/                 # Static data (blogPosts.ts, projects.ts)
types/index.ts        # Shared TypeScript interfaces
hooks/                # use-toast, use-mobile
middleware.ts         # Admin route protection
```

## Heavy content lives on subdomains, never in this repo

This site is the Ad Grants landing surface, so it stays small. Anything over a few MB gets its own
repo + Vercel project under `nik-bear-brown`, and this site only links or redirects to it
(redirects in `next.config.mjs`, always `permanent: false`):

| Subdomain | Repo | What |
|---|---|---|
| loonnet.humanitarians.ai | nikbearbrown/loonnet | LoonNet Godot games (~170 MB) |
| lectures.humanitarians.ai | nikbearbrown/lectures | AI+1 narrated lecture decks (~1.2 GB) |

Do not add game builds, lecture decks, videos, or other large static trees under `public/`.

## YouTube videos → pages → Ad Grants (updated often)

Every public upload on the Humanitarians AI channel gets its own page at `/videos/<slug>`, and every
YouTube playlist is one Google Ad Grants campaign. Bear adds videos to YouTube constantly, so this
pipeline is re-run whenever the channel has changed. Never edit `data/youtube/*.json` by hand.

```bash
python3 scripts/youtube/sync.py                  # 1. yt-dlp scrape → data/youtube + content/videos/<slug>.md
#   writes a script FALLBACK article (keywords: [], generated: "fallback") only for NEW slugs; never clobbers
grep -l '^generated: "fallback"' content/videos/*.md   # 2. these need real articles
#   write each one from its transcript, in place: 8 long-tail phrase keywords, 450–900 words, generated: "article"
#   (Sep 2026: done with Sonnet subagents from a spec; the keywords feed the phrase-match campaigns)
python3 scripts/youtube/build-adgrants-plan.py   # 3. regenerate adgrants/*.csv + adgrants/README.md
npm run build                                    # 4. verify, then commit data/, content/, adgrants/
```

Rules:
- One campaign per playlist, whatever its size. Never split a playlist into numbered campaigns.
  Videos in no playlist go in the single `LT | More Videos` catch-all.
- A video that sits in several playlists gets ONE ad group, in its smallest playlist.
- Fallback articles produce no ad groups (empty keywords), so step 2 is not optional.
- Ads land only on humanitarians.ai pages, never on YouTube. Flagship hand-written campaigns live in
  `adgrants/campaigns/*.json` (e.g. OPT) and claim their video slugs out of the playlist campaigns.
- Slugs are pinned in `data/youtube/slugs.json`; a renamed video keeps its URL.

## Typography — current state (facts, measured 2026-09-23)

**Next.js app: one font, Inter.** Loaded in `app/layout.tsx` via `next/font/google` as `Inter({ subsets: ["latin"] })` (variable font, no weights pinned) and applied to `<body>` with `inter.className`. `tailwind.config.ts` defines no `fontFamily`, so `font-sans` and `font-mono` are Tailwind defaults. No other file in `app/` or `components/` imports `next/font` or sets `font-family`.

**Standalone HTML under `public/` (236 files) loads its own fonts** — these pages do not inherit Inter:

| Folder | Fonts loaded (Google Fonts unless noted) |
|---|---|
| `public/artifacts/*-tool.html` (≈40 files) | Inter; some also Playfair Display, EB Garamond, DM Serif Display, Spectral; Courier Prime for typewriter blocks |
| `public/artifacts/*-reference.html` | Helvetica Neue / Arial stack (system); EB Garamond |
| `public/ai1/simulations/` | Montserrat (33 files), Inter (11), Spectral (a few) |
| `public/ai1/visualization/` | JetBrains Mono + Inter |
| older tool pages | `'Courier New', monospace` (system, ~650 declarations) |

Counts of Google Fonts `<link>` loads across `public/`: JetBrains Mono 60, Inter 49, Montserrat 33, Playfair Display 5, EB Garamond 5, Spectral 1, DM Serif Display 1.

## Logos and wordmarks — files in `public/`

| Path | What it is | Source |
|---|---|---|
| `public/logos/humanitarians/hai-monogram.svg` | Humanitarians AI "H/A" monogram, vector, fill `#171717`, 311×368 | `brutalist.art/logos/humanitarians/humanitarians-logo-1.svg` |
| `public/logos/humanitarians/hai-wordmark.svg` | "HUMANITARIANS AI" wordmark, outlined paths (no live text), fill `#171717`, 1061×133 | `brutalist.art/runtime/remotion/public/hai-wordmark-outlined.svg` |
| `public/logos/bear-brown/bear-brown-monogram.svg` | "BB" script monogram | `brutalist.art/logos/bear-brown/bear-brown-logo-1.svg` |
| `public/logos/bear-brown/bear-brown-signature.svg` | "Bear Brown" signature | `brutalist.art/logos/bear-brown/bear-brown-logo-2.svg` |
| `public/logos/musinique/musinique-logo-1.svg`, `-2.svg` | Musinique headphone "M", two versions | `brutalist.art/logos/musinique/` |
| `public/logos/medhavy/` (44 files) | Medhavy "M" + book + circuit concepts, `medhavy-logo-NN` and `medhavy-selected-*` | `brutalist.art/logos/medhavy/` + `brutalist-art/logos/medhavy/` (retired tree) |
| `public/svg-logos/Humanitarians_{black,white}_logo.svg` | older traced HAI logo, 7680×2497, ~260 KB each | pre-existing |
| `public/svg-logos/NikBearBrown_*`, `bearbrown_*` | older traced Bear Brown logos | pre-existing |

Medhavy drafts left out of `public/` because the name is misspelled or different: `medhavy-logo-01` ("Medhaay"), `-08` ("MEDHVAY"), `-30`–`-33` and `medhavy-selected-2-06`–`-09` ("sandamcat" / "SANDANCAT"). They remain in the toolkit. The toolkit also holds audio logo stings (`brutalist.art/logos/<brand>/*.mp3`) and Northeastern / SEIS marks (`logos/northeastern/`, `logos/seis/`); none were copied here.

## Color palette — HAI (Le Monde / walnut)

CSS variables are in `app/globals.css`; named Tailwind tokens (`obsidian`, `blood-red`, `warm-clay`, `dim-gray`, `mist`, `silver`) are in `tailwind.config.ts`. There are no `walnut` or `sky-faint` Tailwind tokens ("walnut" is the palette's name). `tailwind.config.ts` maps `chart-1`…`chart-5` and `sidebar-*` colors to CSS variables that `globals.css` does not define.

| Token | Hex | Mapped to | Contrast on white |
|---|---|---|---|
| `obsidian` | `#1B1B1B` | `--foreground` (`#1C1C1C`) | 17.2:1 |
| `blood-red` | `#7A0000` | `--primary`, `--destructive`, `--ring` | 11.5:1 |
| `dim-gray` | `#4A4D4F` | named token only (`text-dim-gray`, 50 uses) | 8.5:1 |
| `warm-clay` | `#A89068` | `--accent` | 3.1:1 |
| `mist` | `#797C7F` | nearest to `--muted-foreground`, which resolves to `#7D7D7D` | 4.2:1 (`#7D7D7D`: 4.1:1) |
| `silver` | `#8F8F8F` | `--border`, `--input` | 3.2:1 |
| `pure-white` | `#FFFFFF` | `--background` | — |

`--muted` / `--secondary` = `38 40% 97%` = `#FAF8F4` (section alt background). Dark mode (`.dark`): background `#171717`, card `#212121`, muted `#2B2B2B`, foreground `#F5F5F5`, muted-foreground `#A1A1A1`, primary `#B20000`, destructive `#C20000`, accent `#645640`, border `#4C4C4C`, ring `#B20000`.

**Avoid hardcoding hex values.** Use semantic tokens (`bg-primary`, `text-muted-foreground`, `bg-destructive`) or named palette tokens instead.

## Accessibility — WCAG facts (measured 2026-09-23)

Ratios are computed from the resolved CSS variables (sRGB relative luminance). WCAG 2.2 AA thresholds: normal text 4.5:1; large text (≥ 24px, or ≥ 18.66px bold) 3:1; non-text UI such as input borders and focus rings 3:1.

| Pair | Light | Dark |
|---|---|---|
| `foreground` on `background` | 17.0:1 pass | 16.4:1 pass |
| `foreground` on `muted` | 16.1:1 pass | 12.9:1 pass |
| `primary-foreground` on `primary` (buttons) | 11.5:1 pass | 7.2:1 pass |
| `accent-foreground` on `accent` | 5.5:1 pass | 6.5:1 pass |
| `muted-foreground` on `background` | 4.1:1 — large text only | 6.9:1 pass |
| `muted-foreground` on `muted` | 3.9:1 — large text only | 5.4:1 pass |
| `primary` as text/link on `background` | 11.5:1 pass | 2.5:1 fail |
| `ring` (focus) on `background` | 11.5:1 pass | 2.5:1 fail |
| `border` / `input` on `background` | 3.2:1 pass | 2.1:1 fail |

The `globals.css` comment says `accent-foreground` on warm-clay is 4.9:1; measured is 5.5:1.

**Codebase counts (`app/` + `components/`):**
- `text-muted-foreground`: 1,000 uses; 385 of them on the same element as `text-sm` or `text-xs`.
- `text-primary`: 419 uses.
- `<html lang="en">` is set in `app/layout.tsx`.
- `<main>` appears in 2 files. No skip-to-content link exists.
- `focus-visible:` utilities: 73 uses. 24 files use `outline-none` without any `focus-visible:` style.
- `prefers-reduced-motion` / `motion-reduce:` / `motion-safe:`: 0 uses.
- `<iframe>`: 90, of which 81 have no `title`.
- `<img>` without `alt`: 10. `next/image` is imported in 37 files.

## Key patterns

- **Button components**: Use `PrimaryButton` (`@/components/ui/primary-button`) and `SecondaryButton` (`@/components/ui/secondary-button`) for CTAs — both use `bg-primary` (walnut). The base shadcn `Button` (`@/components/ui/button`) uses CVA variants.
- **Container pattern**: `<div className="container px-4 md:px-6 mx-auto">`
- **Section pattern**: Full-width sections alternate `bg-background dark:bg-gray-800` / `bg-muted dark:bg-gray-900`
- **Grid layouts**: Typically `lg:grid-cols-3` (1+2 split for text+video) or `md:grid-cols-2` (card grids)
- **Links**: Internal = Next.js `Link`, external = `<a>` with `target="_blank" rel="noopener noreferrer"`
- **Path alias**: `@/*` maps to project root
- **Primary email**: `hr@humanitarians.ai` is the one address used across `app/` and `components/` (info@ and contact@ were replaced 2026-09-23). Personal addresses in `public/` reports and tools, the Ad Grants files, and synced YouTube descriptions in `data/youtube/videos.json` were not changed.
- **Email hours ("When We're Open")**: Monday to Wednesday, business hours; the board is 100% volunteer. The wording lives in `components/OpenHours.tsx`, which is placed under the last humanitarians.ai email on all 34 pages that show one (inserted by `scripts/add_open_hours.py`, dry run by default, `--apply` to write). `/contact` has its own full "When We're Open" card (second section), and `components/Footer/Footer.tsx` has a one-line version.

## Environment variables

- `DATABASE_URL` — Neon PostgreSQL connection string
- `ADMIN_PASSWORD` — HMAC secret for admin sessions

## Build config notes

- `next.config.mjs` ignores ESLint and TypeScript errors during build
- Images are unoptimized (`unoptimized: true`) for Vercel compatibility
- `.npmrc` sets `legacy-peer-deps=true`

## Content model

- **Homepage** (`app/page.tsx`): Hero → The Problem (tier cards) → Key Programs (2×2) → Addams section → Substack Directory → Donate
- **Projects** (`app/projects/page.tsx`): Grid of fellow projects with Irreducibly Human tier badges
- **Blog**: Dynamic routes at `/blog/[slug]`, editor at `/admin/dashboard`
- **Tools**: Dynamic at `/tools/[slug]`, browsable at `/tools`
- **Talks**: Static HTML presentations served from `public/talks/`; browsable at `/talks` via `TalksBrowser`; deep-links via `/talks/[...slug]`; filter tags from `public/talks/filters.json`
- **Footer** (`components/Footer/Footer.tsx`): 6-column link grid + legal + copyright

## Irreducibly Human framework context

The site is built around the Irreducibly Human framework (irreducibly.xyz). Key concepts:
- **Tier 1**: Pattern recognition, fact retrieval — what machines do well
- **Tiers 3–6**: Judgment, causal reasoning, ethics, collaboration — what machines cannot do
- **Tier 7**: Practical wisdom under genuine stakes — what machines cannot have
- **Addams**: The learning documentation system fellows use weekly
- **Botspeak**: AI fluency / Tier 1 operational skill (entry point, not sufficient)

Copy throughout the site should reflect this framing: we teach what AI cannot do, the portfolio is evidence, the capacities are the product.
