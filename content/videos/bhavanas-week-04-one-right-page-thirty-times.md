---
title: "Bhavana's Week 04: One Right Page Thirty Times"
seoTitle: "Scaling One Page to Thirty with Next.js ISR"
description: "How a job search app turned one correct page template into thirty city pages using Incremental Static Regeneration, and how to pick a revalidation cadence."
summary: "Bhavana Bhariday explains how she scaled a single working page into thirty city pages with Next.js ISR, and why she chose a one-hour revalidation cadence."
keywords: ["nextjs incremental static regeneration", "isr revalidation cadence", "scaling one page template seo", "next js revalidate 3600 seconds", "caching database queries nextjs", "job search app seo pages", "isr vs server side rendering cost", "city pages seo template"]
generated: "article"
---

Getting one page right is the easy part. The harder problem shows up once that page needs to become thirty, or three hundred, and every one of them still needs to be fast, accurate, and cheap to serve. That's the problem Bhavana Bhariday tackled in week four of building a job search app's SEO system: turning one correct page into a growth engine without letting the database bill grow along with it.

## Turning a template into a machine

The previous week had produced a single correct page. This week's job was multiplying it. Thirty city pages needed to exist, built from the same underlying template, along with role types layered on top. The first move was deliberately boring: pulling thirty city names, and later fifteen role types, into one central file instead of retyping or subtly mistyping them across thirty separate pages. That single decision is the difference between fixing a wrong city name once and hunting it down thirty times later.

## The cost of being right on demand

Here's the part that isn't boring. Thirty pages, each backed by a live database query, is nothing at ten visitors a day. At real traffic, where every single visit triggers a fresh database read, that becomes a real cost. A page that's cheap to be right once becomes expensive to be right on demand every single time a visitor loads it.

## Choosing an ISR cadence: the one-hour rule

The fix is Incremental Static Regeneration, or ISR: build the page once, hand every visitor the cached copy instantly, and only occasionally check in the background whether the underlying data has changed and needs a rebuild. Every visitor gets a fast page, and the database gets a break. But "occasionally" is a number that has to be chosen, and that choice was the real decision of the week. A 60-second cadence keeps listings nearly live but rebuilds constantly under any real traffic. A full-day cadence is cheap but lets job counts sit stale for hours. An hour splits the difference: fresh enough for listings that shift through the day, loose enough not to hammer the database on every load. The number that came out of that reasoning was 3,600 seconds, one hour.

## An honest thread left dangling

Worth noting directly: choosing this cadence and the cadence actually being honored turned out to be two different things. That gap didn't surface until later, and the story picks it back up when it matters. It's a useful reminder that setting a configuration value and verifying it's actually working as intended are separate steps, not the same step.

## Key takeaways

- Centralizing repeated data, like city names and role types, in one file prevents errors from multiplying across every generated page.
- A page backed by a live database query is cheap at low traffic but expensive at scale if every visit triggers a fresh read.
- Incremental Static Regeneration serves cached pages instantly and rebuilds them in the background on a schedule, protecting the database from load.
- The revalidation cadence is a real trade-off: too short rebuilds constantly, too long lets data go stale.
- A one-hour cadence (3,600 seconds) balanced freshness against database load for listings that shift throughout the day.
- Setting a cadence and confirming it's actually being honored in production are two separate things to verify.

## Try it yourself

Take a page in your own app that reads from a database on every request and ask whether it could be cached and rebuilt on a schedule instead. Then argue the cadence out loud: how stale is too stale, and how often is too often, before you settle on a number. This walkthrough comes from the Humanitarians AI Fellows program, where Fellows document real engineering decisions like this one as they build.
