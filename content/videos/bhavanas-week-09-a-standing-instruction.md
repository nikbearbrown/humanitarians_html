---
title: "Bhavana's Week 09: A Standing Instruction"
seoTitle: "GitHub Actions Cron: Turn Scripts Into Automation"
description: "A Humanitarians AI fellow explains how staggered GitHub Actions cron schedules and a manual trigger turn a hand-run script into a real system."
summary: "Week nine of an SEO engineer's fellowship report shows how a cron schedule, timed 30 minutes after a dependent scrape, turns a manual script into a standing instruction."
keywords: ["github actions cron schedule tutorial", "workflow_dispatch manual trigger", "stagger cron jobs dependent data", "json-ld sitemap indexing api seo", "cron job seo automation fellow", "github actions architecture documentation", "google indexing api automation", "run script automatically cron"]
generated: "article"
---

A script that no one runs does nothing. That's the problem Bhavana Bhariday, a Humanitarians AI Fellow working as the SEO engineer on a job-listings project, set out to fix in week nine of her report: not building a new feature, but making sure the features already built actually run on their own.

## Cron as a standing instruction

The core idea is simple once it's stated plainly. Instead of a person checking a clock and running a script by hand, a cron schedule is a standing instruction: run this automatically, at these times, forever. Nobody has to remember, and nobody has to be awake for it to happen. Bhavana set up a GitHub Actions workflow with a schedule line in cron syntax to run the job's submitter four times a day, alongside a manual workflow_dispatch trigger so the same automation could be fired on demand for testing instead of waiting for the next scheduled slot.

## Why the timing had to be staggered

The interesting part isn't that the job runs on a schedule, it's when. Submissions run about 30 minutes after each scrape cycle finishes, so there's always freshly scraped data waiting by the time the submitter runs. Flip that order, run the submitter before the scraper, and you'd be querying for jobs that don't exist yet. The stagger is the whole point: a dependent job has to run after the thing it depends on, not just on its own convenient schedule.

## Documenting how the pieces fit together

Alongside the cron work, Bhavana started an architecture document. Nine weeks into the project, there are five features in place: JSON-LD structured data, sitemaps, landing pages, the Google indexing API integration, and now the cron automation. Each one makes sense read in isolation, but what triggers what, and what depends on what, is invisible if you're reading five separate files. The architecture doc is what turns five individual features into one legible system that someone else could actually understand.

## Key takeaways

- A cron schedule turns a manually run script into an automation that fires on its own, without anyone remembering to trigger it.
- A workflow_dispatch manual trigger lets you fire the same job on demand for testing, without waiting for the next scheduled run.
- Stagger dependent jobs deliberately: this project runs its submitter about 30 minutes after each scrape cycle finishes, so fresh data is always ready.
- Get the order wrong and a dependent job will query for data that hasn't been scraped yet.
- An architecture document is what turns a set of individually shipped features into one system other people can reason about.

## Try it yourself

If you have a script you still run by hand, the exercise here is to ask an AI assistant to turn it into a standing instruction: a cron schedule with a manual trigger alongside for testing. Then ask the harder question: what does that script depend on, and does your schedule actually run it after that dependency, not before? This kind of practical, ship-it engineering work is what Humanitarians AI Fellows take on as part of their fellowship projects.
