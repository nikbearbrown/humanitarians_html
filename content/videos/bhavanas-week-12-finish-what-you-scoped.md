---
title: "Bhavana's Week 12: Finish What You Scoped"
seoTitle: "Week 12: Finish What You Scoped"
description: "The finale of a 12-week SEO engineering series shows how rechecking a stale blocker unlocked the company detail page using only proven, already-built patterns."
summary: "In the last week of her SEO engineering series, Bhavana Bhariday rechecks an old blocker, finds it no longer applies, and builds the company page from patterns proven over the previous 11 weeks."
keywords: ["seo engineer job listings project", "rechecking a project blocker", "slug collision deterministic fix", "isr cache seo page pattern", "company detail page seo", "job seeker report fellows series", "job listing seo system", "canonical url noindex pattern"]
generated: "article"
---

The most common way a project stays stuck isn't a new obstacle showing up, it's an old one that nobody rechecks. That's the exact trap Bhavana Bhariday calls out in the finale of her twelve-week series as a Humanitarians AI Fellow: a blocker she hit in week 10 was still treated as active in week 12, purely out of habit, even though the reason behind it had quietly stopped applying.

## A blocker is a fact about a moment, not forever

The instinct, as Bhavana puts it, is to trust past decisions: it was blocked before, so it must still be blocked now. In week 10, building the company detail page had been paused because it seemed to depend on sponsorship tier data that wasn't ready yet. By week 12, instead of assuming that dependency was still missing, she actually went and checked. It wasn't. The company page had never truly needed to wait on that data at all.

## Building from parts that already existed

Once she looked past the outdated assumption, the build itself turned out to be straightforward. The base companies table already held everything a genuinely useful first version of the page needed: name, slug, logo, verification status, and job count, none of which depended on the sponsorship tier data that had caused the original pause. The page follows the same meta pattern already established for job pages in earlier weeks: a clean title, a canonical URL, and a noindex directive until a company is actually verified and has jobs attached. It's also wired to the cookie-less client built the week before, so the page is genuinely ISR cached rather than merely configured to look that way. As Bhavana notes, the whole point of twelve weeks of building consistent patterns is that the next page becomes mostly assembly rather than fresh design work.

## Resolving a real edge case: slug collisions

One genuine design question did surface during the build. The companies table is only guaranteed unique per source and slug together, not on the slug alone, which means two different scrape sources could in theory produce the exact same slug string. Rather than assuming any single matching row is automatically the correct one to display, the query orders candidates by job count and deterministically takes the top match, so the most substantial company record for that slug wins every time. It's a small fix, but it closes a gap that could otherwise have shown a thin or stale record instead of the most complete one.

## An honest caveat, kept to the end

Bhavana is careful to name a limitation rather than paper over it: the dev database still has no company rows in it, so the real happy path, an actual company with live jobs rendering on the page, hasn't been observed firsthand yet. That's not a new problem; it's the same empty-database limitation she flagged back in week three. The page is built and cache-verified, but it hasn't yet met real data.

## Key takeaways

- A blocker recorded in week 10 was assumed to still apply in week 12, but rechecking showed the underlying reason no longer held.
- The company page was built entirely from existing, proven data: name, slug, logo, verification status, and job count.
- It reuses the same meta pattern as job pages (clean title, canonical URL, noindex until verified) and the prior week's cookie-less ISR caching fix.
- Slug collisions across different scrape sources are resolved deterministically by ordering on job count and taking the top match.
- The dev database still lacks company rows, so the full happy path with real data hasn't been observed yet.
- Twelve weeks of consistent patterns turned this final page into mostly assembly work rather than new design.

## Try it yourself

Bhavana's closing challenge is worth applying to your own backlog: find something you scoped out months ago, and before assuming it's still blocked, check whether the original reason still holds or whether the data or dependency you were waiting on has quietly arrived. This kind of disciplined, pattern-driven engineering work is representative of the projects tackled in the Humanitarians AI Fellows program.
