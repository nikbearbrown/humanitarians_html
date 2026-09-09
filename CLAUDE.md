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

## Color palette — HAI (Le Monde / walnut)

This is the canonical palette going forward. All new pages and components must use these tokens.

| Token | Hex | Role | WCAG on bg |
|---|---|---|---|
| `obsidian` | `#1B1B1B` | primary text | 17.22:1 AAA |
| `blood-red` | `#7A0000` | buttons + danger/emphasis (→ `bg-primary`, `bg-destructive`) | 11.5:1 AAA |
| `warm-clay` | `#A89068` | callout surface (→ `bg-accent`) | 3.06:1 AA large |
| `dim-gray` | `#4A4D4F` | secondary accent | 8.52:1 AAA |
| `mist` | `#797C7F` | muted text (→ `text-muted-foreground`) | 4.2:1 AA large |
| `silver` | `#8F8F8F` | borders only (→ `border-silver`) | 3.23:1 AA large |
| `pure-white` | `#FFFFFF` | page background (→ `bg-background`) | — |

**Section alt bg** uses `bg-muted` (→ `--muted: 38 40% 97%`, a warm-white tint derived from warm-clay). `silver` is a mid-gray border color — do not use it as a section or badge background.

CSS variables are defined in `app/globals.css`. Named Tailwind tokens (`bg-walnut`, `bg-sky-faint`, `bg-silver`, etc.) are available via `tailwind.config.ts`.

**Avoid hardcoding hex values.** Use semantic tokens (`bg-primary`, `text-muted-foreground`, `bg-destructive`) or named palette tokens (`bg-walnut`, `bg-silver`, `bg-sky-faint`) instead.

## Key patterns

- **Button components**: Use `PrimaryButton` (`@/components/ui/primary-button`) and `SecondaryButton` (`@/components/ui/secondary-button`) for CTAs — both use `bg-primary` (walnut). The base shadcn `Button` (`@/components/ui/button`) uses CVA variants.
- **Container pattern**: `<div className="container px-4 md:px-6 mx-auto">`
- **Section pattern**: Full-width sections alternate `bg-background dark:bg-gray-800` / `bg-muted dark:bg-gray-900`
- **Grid layouts**: Typically `lg:grid-cols-3` (1+2 split for text+video) or `md:grid-cols-2` (card grids)
- **Links**: Internal = Next.js `Link`, external = `<a>` with `target="_blank" rel="noopener noreferrer"`
- **Path alias**: `@/*` maps to project root

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
