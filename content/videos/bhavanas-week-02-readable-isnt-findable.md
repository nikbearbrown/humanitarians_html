---
title: "Bhavana's Week 02: Readable Isn't Findable"
seoTitle: "SEO Crawlers: Robots.txt, Sitemap & Noindex Guide"
description: "HAI Fellow Bhavana Bhariday breaks down how search crawlers use robots.txt, sitemap.xml, and noindex tags to find and index a job search site."
summary: "A readable page isn't necessarily a findable one. Bhavana Bhariday walks through the three questions a crawler asks when it lands on a site."
keywords: ["robots txt sitemap noindex", "sitemap xml 50000 url cap", "canonical tag job listing seo", "search crawler discovery process", "seo engineer job search app", "noindex nofollow inactive listing", "humanitarians ai fellows seo", "job seeker app seo audit"]
generated: "article"
---

Getting Google to correctly read a single page is only half the job. The harder problem is getting Google to find that page in the first place, and then to trust that what it found is still the live, current version. That gap between readable and findable is the subject of this week's SEO update from Humanitarians AI Fellow Bhavana Bhariday, working as the SEO engineer on Job Seeker, a job search application.

## Three questions every crawler asks

Bhavana frames the whole discovery problem around three questions a search crawler runs through the moment it lands on a site: what am I allowed to see, where is everything, and is this the real, live version of the page. The previous week's work made a single job page readable to Google. This week is about answering those three questions across the entire site, not just one page, so that every listing worth finding actually gets found.

## Robots.txt sets the boundary

The first question, what's allowed, gets answered by robots.txt, described as the bouncer standing at the door. It waves crawlers toward the pages meant to be public, job listings, companies, and sponsor pages, while turning them away from dashboards, user profiles, analytics, and authentication flows. None of that internal, login-gated material belongs in a search index, and robots.txt is the mechanism that draws that line before a crawler ever gets that far.

## A sitemap index under the 50,000-URL cap

The second question, where is everything, is answered by sitemap.xml. Rather than one enormous file listing every URL on the site, Job Seeker uses a small index file that points out to four specialized lists: jobs, companies, landing pages, and static pages. That split isn't just tidiness. Google caps each individual sitemap at 50,000 URLs, and the job listings alone were already climbing toward that ceiling, so splitting the sitemap into separate lists keeps every section safely under the limit as the site grows.

## Canonical tags and a same-day noindex flip

The third question, is this the real version and should it even be shown, gets answered through two metadata tags. A canonical tag stops a single job listing from competing against itself if it happens to be reachable through more than one URL. A noindex, nofollow tag handles the opposite problem: the moment a listing goes inactive, the page needs to stop showing up in search results so job seekers aren't sent to a dead end. The catch Bhavana caught was timing. Flipping that tag only helps if it happens the same day the listing closes, not whenever the page next happens to rebuild on its own schedule. The fix ties the noindex flag directly to the job's own active status flag, so a closed listing goes noindex the same day it closes, catching a real edge case before it could ship as a bug.

## Key takeaways

- A page being readable to Google says nothing about whether Google can actually discover it.
- Robots.txt answers "what am I allowed to see," steering crawlers toward public pages and away from dashboards, profiles, and auth flows.
- A sitemap index split into four specialized lists (jobs, companies, landing pages, static pages) keeps each file under Google's 50,000-URL cap.
- Canonical tags prevent a page from competing with itself, while noindex/nofollow removes stale listings from search results.
- The noindex flag needs to fire the same day a listing goes inactive, tied directly to the listing's active status rather than a rebuild schedule.

## Try it yourself

Bhavana's closing challenge is worth running on your own site: check what your robots.txt actually allows, confirm your sitemap can be found and stays under the URL cap, and verify that pages which should no longer be indexed are actually flagged that way. This update is part of the Humanitarians AI Fellows program, where fellows document and share this kind of hands-on engineering work as they build it.
