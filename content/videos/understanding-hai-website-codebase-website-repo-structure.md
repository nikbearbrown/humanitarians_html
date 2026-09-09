---
title: "Understanding HAI Website Codebase & Website Repo Structure"
seoTitle: "How the Humanitarians AI Website Repo Is Structured"
description: "Rushali maps the Humanitarians AI Next.js website repository into layers so new contributors know where to look before making changes."
summary: "Rushali explains how she built a mental map of the Humanitarians AI website codebase in her first week, tracing routes, components, API handlers, and support folders before editing any live code."
keywords: ["how to onboard onto a next.js codebase", "understanding app router folder structure", "where do api routes live in next.js", "how to trace a page from url to component", "next.js layout.tsx vs page.tsx explained", "humanitarians ai website repo structure", "onboarding new contributors to a codebase", "reading a next.js project before making changes"]
generated: "article"
---

Rushali spent her first week on the Humanitarians AI website project not shipping a feature, but reading the codebase closely enough to know where changes belong before touching anything. She walks through the mental map she built of the repository's layers, and the exercise she recommends to any new contributor.

## Building a mental map before making changes

Most of the first week went into reading the repo: tracing how pages and components connect, understanding the branch-based workflow, and forming a clear picture of the codebase's layers. The goal was not speed, it was safety. Knowing where an edit belongs before making it prevents a lot of the confusion and breakage that comes from guessing.

## The four layers of the repository

At a high level, the repository breaks into a handful of layers. The `app` folder defines routes and pages. `components` holds reusable interface pieces that pages assemble together. `app/api` and `lib` handle server-side logic and shared data code. Folders like `public` and `assets` support what the site actually serves to visitors, static files and media. Thinking about the project in these layers made it much easier to navigate without getting lost in individual files.

## Where a new contributor should start: the app folder

For onboarding a new contributor, the recommended starting point is the `app` folder. In Next.js, many folders inside `app` map directly to URL routes, and a `page.tsx` file inside a folder is what creates the actual page at that route. From there, `layout.tsx` files define shared wrappers around those pages, and `components` holds the reusable pieces that the pages assemble.

## How API routes differ from page routes

The API side of the codebase works differently from page routes. Files under `app/api` are server handlers, code that returns data or performs actions rather than rendering a page, and they often pull shared logic from `lib`. Recognizing this distinction, page routes render UI while API routes handle server logic, matters for knowing which folder to open depending on what kind of change is needed.

## Support folders worth tracking

Beyond the core app and API layers, a few support folders matter whenever a task touches static files, automation, or database work: `public` and `assets` for static content, and `scripts` and `SQL` for automation and database-related tasks. Keeping track of where these live means not having to rediscover them each time a task calls for them.

## The tracing exercise for new contributors

The recommended way to internalize this structure is hands-on: pick one real page on the site, and trace it from its URL into the `app` folder, then to its `layout.tsx`, then to the components it assembles, and finally to any API calls behind it. Running through that single exercise surfaces where most future changes will actually belong, faster than reading documentation alone.

## Key takeaways

- The Humanitarians AI website repo breaks into four practical layers: `app` for routes and pages, `components` for reusable UI, `app/api` and `lib` for server logic, and `public`/`assets` for static content.
- `page.tsx` files create the actual page at a route; `layout.tsx` files define the shared wrapper around those pages.
- API routes under `app/api` are server handlers that return data or perform actions, distinct from the page routes that render UI.
- Support folders like `scripts` and `SQL` matter for automation and database-related tasks.
- Tracing one real page from its URL through layout, components, and API calls is a fast way to learn where changes belong in an unfamiliar codebase.

## Who this is for

New contributors joining the Humanitarians AI website project, or any developer onboarding onto an unfamiliar Next.js app-router codebase, will find this a practical starting map before making their first edit.
