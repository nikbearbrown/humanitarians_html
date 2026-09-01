---
title: "Bhavana's Week 10: Ship it or Scope it"
seoTitle: "Ship It or Scope It: An Honest SEO Audit"
description: "A Humanitarians AI Fellow audits a job search app against its SEO acceptance criteria, hits a 100/100 Lighthouse score, and scopes out one unready page."
summary: "Bhavana Bhariday runs a full audit against acceptance criteria, hits 100/100 on Lighthouse, and scopes out a company page rather than shipping it thin."
keywords: ["lighthouse 100 seo score audit", "json-ld job listings schema", "noindex inactive job listings", "sitemap index seo audit", "google indexing api job postings", "canonical url seo job pages", "scope out thin content page", "seo acceptance criteria checklist", "job search app seo audit", "noindex page not enough content"]
generated: "article"
---

Marking a feature "done" and actually knowing it works are two different claims, and the gap between them is exactly what a checking week is supposed to close. Ten weeks into building SEO for a job search app, the work wasn't to add anything new, it was to verify what had already been built and honestly defer what wasn't ready yet.

## Checking assumptions against reality

The discipline here is narrow on purpose: two things, and only two. First, a full audit confirming every acceptance criterion actually holds on the running site rather than in memory. Second, an independent tool run against that same site to check the self-assessment for blind spots. A self-assessment is easy to fool, which is exactly why the second check exists.

## Running the full audit

The spec carries a real acceptance checklist, and going through it one item at a time is boring but essential work. JSON-LD structured data on every job page, noindex tags on inactive listings, a working sitemap index, correct robots rules, canonical URLs, and the indexing API, each one gets checked against the live site rather than assumed from memory.

## Hitting 100/100 on Lighthouse

The independent check ran Google's own Lighthouse tool against the three page types that matter most: a job page, the landing templates, and the master directory. The result held steady across all three: 100 out of 100 on SEO, a score anyone else can reproduce by running the same tool, not a self-graded opinion of the work.

## Scoping the company page honestly

Company detail pages were on the original list, meant to get the same meta and canonical treatment as job pages. But a meta tag needs a real page behind it, and the sponsorship data that would make that page substantive isn't in place yet. Rather than ship a thin page just to check a box, the page noindexes itself until it actually has content worth showing to a crawler.

## Key takeaways

- A checking week means auditing what's already built against the running site, not adding new features.
- The acceptance checklist includes JSON-LD, noindex on inactive listings, sitemap index, robots rules, canonical URLs, and the indexing API.
- Lighthouse scored 100 out of 100 on SEO across job pages, landing templates, and the master directory.
- A page without real content behind it gets noindexed rather than shipped as a hollow pass.
- The rule: ship it or scope it, but don't fake it.

## Try it yourself

Take a feature you've already marked done and ask Claude for the difference between its assumed status and its real status, then check what an independent tool would actually report. Find the item you're tempted to check off cheaply and decide honestly whether it's shippable or whether the right move is to scope it out until the data exists. This is a Humanitarians AI Fellow's weekly report from the Fellows program, where the work is documented in public as it happens.
