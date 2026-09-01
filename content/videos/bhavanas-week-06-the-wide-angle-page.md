---
title: "Bhavana's Week 06: The Wide-Angle Page"
seoTitle: "The Wide-Angle Page: Catching Bugs Whole-System"
description: "Building a company directory page forces a whole-system review that catches a crashing date formatter and a dead sitemap link before they ship."
summary: "Finishing a directory page forces a whole-surface review, and that wider view catches a hard-crash date bug and a dead sitemap link a narrow check missed."
keywords: ["date formatter crash job listing page", "dead link in sitemap seo", "site directory seo wide view", "whole surface review web app bugs", "cross linking city and role pages seo", "sitemap pages xml broken link", "seo directory page job listings", "catching bugs whole system review", "malformed date crash fix javascript", "job seeker app seo directory"]
generated: "article"
---

Some bugs only show up once you stop staring at one page and look at the whole system at the same time. Building the directory page for a job search app, the page meant to tie every listing together, forced exactly that kind of review, and the wider view caught two bugs that a narrow, file-by-file check had missed entirely.

## The directory as a wide-angle view

The directory brings every verified company into one place, with each entry cross-linked back to the city and role pages it belongs to. Before the directory existed, those pages were disconnected islands with no path between them. Finishing the directory turned scattered pages into a surface that reinforces itself for both visitors and search crawlers, and building it required the first whole-surface review of the system.

## What a whole-surface review actually means

The method is simple to describe and easy to skip: trace the system end to end, check that every cross-file reference actually resolves, and check every input that could throw an error, all at once rather than one template at a time. That discipline, reviewing the whole surface instead of one page in isolation, is what caught the two bugs hiding in the gaps between pages.

## The hard crash: a date formatter with no guard

The first bug was in the date formatter, caught while reviewing it one more time before calling the JSON-LD work finished. There was no guard against a malformed date. A single bad value on one job record wouldn't just skip that field quietly, it would throw and take the entire page down in a hard crash. The fix itself is small: catch the invalid date and fall back cleanly instead of crashing.

## The dead link sitting in the sitemap

The second bug had been sitting there since week two. Walking the sitemap end to end while wiring in the new directory revealed that the master sitemap index pointed at a sub-sitemap, sitemap-pages.xml, that had never actually been built. That is a live dead link sitting exactly where every crawler looks first, and it stayed invisible until someone followed the whole chain rather than checking one entry at a time.

## Key takeaways

- A directory page that cross-links every company to its city and role pages turns disconnected listings into a reinforcing SEO surface.
- Finishing a system forces the first whole-surface review, which is what surfaces gaps between individually correct parts.
- An unguarded date formatter could crash an entire page on a single malformed value; the fix is a clean fallback instead of a throw.
- A sitemap index pointing at a sub-sitemap that was never built creates a dead link exactly where crawlers look first.
- Widen the review when integrating a system; keep it narrow when patching a one-line fix.

## Who this is for

This is for anyone building or auditing a multi-page site who wants a repeatable way to catch integration bugs before they ship. It comes from a Humanitarians AI Fellow's weekly report on building SEO for a job search app, and the same wide-angle discipline applies to any system with enough moving parts that a bug can hide in the seams between them.
