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

## Color palette — HAI (Le Monde / walnut)

This is the canonical palette going forward. All new pages and components must use these tokens.

| Token | Hex | Role | WCAG on bg |
|---|---|---|---|
| `obsidian` | `#1B1B1B` | primary text | 18.2:1 AAA |
| `walnut` | `#5C3317` | primary accent (→ `bg-primary`) | 10.7:1 AAA |
| `blood-red` | `#B52C2C` | danger/emphasis (→ `bg-destructive`) | 5.8:1 AA |
| `sky-faint` | `#F7FAFD` | section alt bg, callouts | bg only |
| `dim-gray` | `#4A4D4F` | secondary accent | 9.4:1 AAA |
| `mist` | `#797C7F` | muted text (→ `text-muted-foreground`) | 4.6:1 AA |
| `silver` | `#EDEDED` | borders, tag bg (→ `bg-secondary`, `bg-border`) | bg only |
| `pure-white` | `#FFFFFF` | page background (→ `bg-background`) | — |

CSS variables are defined in `app/globals.css`. Named Tailwind tokens (`bg-walnut`, `bg-sky-faint`, `bg-silver`, etc.) are available via `tailwind.config.ts`.

**Avoid hardcoding hex values.** Use semantic tokens (`bg-primary`, `text-muted-foreground`, `bg-destructive`) or named palette tokens (`bg-walnut`, `bg-silver`, `bg-sky-faint`) instead.

## Key patterns

- **Button components**: Use `PrimaryButton` (`@/components/ui/primary-button`) and `SecondaryButton` (`@/components/ui/secondary-button`) for CTAs — both use `bg-primary` (walnut). The base shadcn `Button` (`@/components/ui/button`) uses CVA variants.
- **Container pattern**: `<div className="container px-4 md:px-6 mx-auto">`
- **Section pattern**: Full-width sections alternate `bg-background dark:bg-gray-800` / `bg-sky-faint dark:bg-gray-900` / `bg-silver dark:bg-gray-900`
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
