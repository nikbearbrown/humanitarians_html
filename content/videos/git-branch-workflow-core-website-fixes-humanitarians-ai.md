---
title: "Git Branch Workflow & Core Website Fixes | Humanitarians AI"
seoTitle: "Git Branch Workflow for Website Bug Fixes"
description: "Rushali walks through her one-branch-per-bug git workflow for fixing 404 redirects, the donate page array, and footer links on the Humanitarians AI site."
summary: "Rushali explains how she isolated three unrelated website bugs into separate git branches, verified each with simple local checks, and left a clean trail for the next developer."
keywords: ["how to organize git branches by bug", "how to fix 404 redirects in nextjs", "how to refactor a donation page array", "git status diff stat and log", "donate page dark mode button fix", "footer branding cleanup for nonprofit site", "one branch per bug git workflow", "next config redirect not working"]
generated: "article"
---

Rushali, a Humanitarians AI fellow working on the organization's website, walks through how she handled three unrelated bugs in one week without letting the fixes blur into each other. The video is less about the bugs themselves and more about the discipline of keeping each fix isolated, verifiable, and easy to hand off.

## One branch per bug, not one branch for the week

Instead of batching every fix into a single branch, Rushali started from `main`, pulled the latest code, and created a separate branch for each issue: broken routes, footer inconsistencies, and the donate page. The reasoning is practical rather than stylistic. A branch that answers one question clearly can be reviewed by someone else without them having to guess which changes belong together. When several fixes move in parallel, mixing them into one branch turns a five-minute review into a puzzle.

Before treating any branch as ready, she ran three quick local checks: `git status` to confirm only the expected files were touched, `git diff --stat` to see the size of the change at a glance, and `git log --oneline` to confirm the branch still told one clean story. None of these are sophisticated tools, but running them consistently is what catches an accidental extra file or a commit that drifted off-topic before it reaches review.

## Fixing the 404 on /80-days-to-stay

One of the three bugs was a broken route around the `/80-days-to-stay` page. The URL naming had become inconsistent across the site, so Rushali picked `/80-days-to-stay` as the canonical path, added a redirect from the older `/80-days` variant, and aligned the navigation so old links still land in the right place instead of breaking. The fix touches three specific files: the canonical page lives in `app/80-days-to-stay/page.tsx`, the redirect is defined in `next.config.mjs`, and the footer navigation link was updated in `footer.tsx`. Framing it this way, as a small route-system cleanup across the files that control routing and navigation, makes the fix easier for the next developer to find and confirm.

## Refactoring the donate page instead of deleting a card

The donate page needed the GoFundMe option removed from view, but rather than deleting that card outright, Rushali refactored the section into an array of donation options. Each option can now be enabled or disabled from one place, and the array is filtered and rendered consistently rather than hand-edited in the markup. That structure means adding or retiring a donation option in the future is a one-line change instead of a rewrite. She also fixed a related styling bug where donate button text disappeared in dark mode.

## Cleaning up the footer

The footer got two changes. First, the branding was simplified to match the header more closely, removing extra theme-based logo logic that had accumulated over time. Second, links to features that were not ready yet, including notes, newsletter, and a few unfinished project pages, were hidden rather than left live and confusing to visitors. The goal in both cases was a footer that only exposes what actually works.

## Verifying before calling it done

Rushali's closing point is about handoff quality, not code cleverness. After each isolated fix, she checked that `/80-days-to-stay` redirects correctly, that the donate page shows only active options and reads clearly in dark mode, and that the footer exposes only finished links. That verification step is what turns a code change into something a teammate can trust without re-testing it themselves.

## Key takeaways

- Isolate unrelated bugs into separate branches so each one can be reviewed and explained on its own.
- Use `git status`, `git diff --stat`, and `git log --oneline` as quick sanity checks before calling a branch ready.
- Prefer refactoring a section into a filterable array over hard-deleting a UI element you might need again.
- Document exactly which files a fix touches (page, config, component) so the next developer can find it fast.
- Verify each fix's actual behavior after merging, not just that the code compiles.

## Who this is for

This video is for Humanitarians AI fellows and volunteer developers who are picking up website tasks and want a concrete, repeatable git workflow for keeping unrelated fixes separate and reviewable.
