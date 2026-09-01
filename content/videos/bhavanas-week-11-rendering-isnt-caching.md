---
title: "Bhavana's Week 11: Rendering isn't Caching"
seoTitle: "Rendering Isn't Caching: Debugging Next.js ISR"
description: "Bhavana Bhariday traces why a Next.js ISR config was never actually caching pages, tracked down to a silent cookie read forcing routes fully dynamic."
summary: "A Humanitarians AI Fellow discovers her Next.js caching config had never worked, and traces the bug to a single silent cookie read three layers deep."
keywords: ["nextjs isr not caching", "x-nextjs-cache header debugging", "revalidate not working nextjs", "cookie read forces dynamic route", "cache-control no-cache no-store nextjs", "verify isr with response headers", "nextjs cookieless client fix", "row level security tracking table"]
generated: "article"
---

A config file can say a page revalidates every hour and still never once get cached. That is the gap this week's update closes: a caching setting that looked correct on paper, and the discovery, only after checking the actual HTTP response, that it had never been doing what it claimed.

## The trap: rendering correctly is not the same as caching correctly

Back in week four, a caching setting had been chosen for a set of job listing pages, with a flag noting that choosing a setting and verifying it works are two different things. This week's check confirmed the pages had never been cached at all. Every earlier check had confirmed the pages rendered correctly, and they did. But rendering correctly and being cached correctly are separate claims, and only one of them had ever actually been verified. A config line reading "revalidate every hour" is a stated intention. It is not proof that a single response was ever cached.

## Reading the real headers

To settle the question, the actual HTTP response headers got pulled and compared directly against the config. On one side sat the config set back in week four: revalidate equals 3600, rebuild the cache every hour. On the other side sat what the wire actually returned: Cache-Control set to no-cache, no-store, and no X-Nextjs-Cache header present at all. The pages were configured to cache and had never been cached, which is exactly the kind of gap that a glance at the config file alone would never reveal.

## The culprit: a silent cookie read

Tracing the cause led somewhere genuinely sneaky. The data-fetching client these pages used read cookies internally, and in Next.js, touching cookies anywhere in a route's render path silently forces the entire route to be treated as fully dynamic, overriding the revalidate setting. There is no warning and no error. The caching directive simply gets ignored, because of a cookie read three layers down in a client the page itself never appeared to touch directly.

## The fix and what it uncovered

The fix matched the actual problem: these landing pages are read-only and public, so they never needed per-request cookie access in the first place. Switching them to a plain cookie-less client was enough to let Next.js finally honor ISR, confirmed the same way the bug was found, by checking that the real header now read X-Nextjs-Cache: HIT. Turning that same skepticism on the rest of the backend surfaced three more gaps worth closing: no graceful handling if Google's credentials were not yet set, which would crash instead of skipping cleanly; no chunking on database lookups checking submission history, fine at current scale but fragile as it grows; and no row-level security on a new tracking table, out of step with every other table in the schema. All three got fixed, and the architecture doc, which had still called the feature "templates pending" weeks after it went live, was brought back in sync with reality.

## Key takeaways

- A config setting like revalidate is a stated intention, not proof that caching is actually happening; only the response headers prove it.
- Check Cache-Control and X-Nextjs-Cache directly against the wire response rather than trusting the config file alone.
- In Next.js, reading cookies anywhere in a route's render path silently forces that route fully dynamic, overriding revalidate with no warning.
- Read-only, public pages that do not need per-request state should use a cookie-less data client to avoid this silent override.
- Applying the same skepticism to the rest of a system, not just the bug you were chasing, can surface real gaps: missing credential handling, unchunked queries, missing row-level security.

## Try it yourself

Pick a config value you have trusted but never actually verified, a cache setting, a timeout, a feature flag, and ask Claude how to observe its real effect from outside the app: the actual header, the actual timing, the actual behavior. Then ask what invisible thing upstream could be silently overriding it, the way one cookie read overrode this ISR config. This kind of verification work is a regular part of the Humanitarians AI Fellows program.
