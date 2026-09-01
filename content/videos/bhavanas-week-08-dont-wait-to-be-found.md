---
title: "Bhavana's Week 08: Don't Wait to be Found"
seoTitle: "Google Indexing API for Time-Sensitive Content"
description: "Bhavana Bhariday explains how she wired the Google Indexing API with a service account and tracking table so new job listings get found within hours."
summary: "Time-sensitive content like job listings cannot wait for Google's normal crawl schedule, so this week's build knocks on Google's door directly instead."
keywords: ["google indexing api tutorial", "service account google indexing", "index job listings fast", "google search console indexing api", "tracking table indexing quota", "seo for job listings", "200 url daily quota google", "humanitarians ai fellows", "fast indexing new pages", "backend job seo automation"]
generated: "article"
---

A job listing that takes days to show up in Google search results might as well not exist by the time it's indexed. Job postings, event pages, and price changes all share the same problem: they have a shelf life, and the normal way search engines discover content, a crawler working through a site on its own schedule, is built for pages that stay useful indefinitely, not ones that need to be seen today.

## Knocking instead of waiting

Bhavana Bhariday, a Humanitarians AI Fellow working on a job search platform, frames the difference clearly. A crawler is like a mail carrier on a regular route: it reaches your street eventually, which works fine for a page meant to stay relevant. But a job listing that gets filled shouldn't linger in search results, and a brand new one shouldn't sit for days waiting to be discovered. The fix is the Google Indexing API, which knocks on Google's door directly instead of waiting for the crawler to wander by. This week's build turned that idea from a design on paper into three working pieces: an identity, a script, and a memory.

## Identity: proving the script is allowed to speak for the site

An unattended backend script can't log into Google the way a person would, so it needs a different kind of credential. The system uses a service account, essentially a robot identity, to prove to Google that it's authorized to act on behalf of the site. The script loads a service account key, requests the indexing scope, and gets an authorized session with no human involved in any individual run. That's what makes it possible to submit URLs automatically after every scrape, rather than requiring someone to manually flag new listings.

## The indexing script: telling Google what changed

With identity in place, the second piece is the script that does the actual telling. After each scrape, it queries the database for jobs created in the last six hours that are still active, converts each one into its public URL, and batches those URLs to Google's indexing API. The practical effect is that a newly scraped listing can be known to Google within the hour, instead of waiting on whatever schedule the crawler happens to be running.

## Memory: why a tracking table isn't optional

The third piece is the one that makes the whole system sustainable rather than a one-time trick. A tracking table records every URL already sent to the indexing API, along with what happened and when: the job ID, the URL, whether it was an update or a removal, the API response, and the timestamp. This table lives on the backend only, locked to the service role, and it's the difference between a system that submits once and one that keeps submitting correctly forever.

The reason this matters comes down to quota. Google caps the Indexing API at 200 URLs a day by default. Without a memory of what's already been sent, every run would resubmit every job the system has ever seen, burning through the entire daily quota on repeats before it ever reached the genuinely new listings the system exists to surface. The tracking table is what makes the quota survivable, because it lets the script tell the difference between a job that needs submitting and one it already handled.

## Putting it together

The recap ties the three pieces into a single flow: the Indexing API turns waiting into knocking, the service account gives an unattended script the identity to speak for the site, the script pushes new and removed jobs to Google within hours instead of days, and the tracking table remembers what's already been sent so the 200-a-day quota goes toward new listings rather than duplicates. The system is built and wired to run automatically after every scrape, with the live service account credential as the last step before it goes fully live.

## Key takeaways

- Time-sensitive content like job listings needs direct indexing, not the standard crawl schedule.
- A service account gives an unattended backend script the identity to submit URLs to Google without a human in the loop.
- The indexing script queries for recently created, still-active listings and batches their URLs to Google's Indexing API.
- A tracking table recording every submitted URL is what prevents the system from burning its daily quota on duplicate submissions.
- Google's Indexing API defaults to a 200-URL daily cap, making that tracking memory a requirement, not an optimization.

## Who this is for

This build log is aimed at developers working on SEO or backend systems for time-sensitive content, from job boards to event listings, and it comes out of the Humanitarians AI Fellows program, where Fellows document their weekly technical progress in public.
