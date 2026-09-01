---
title: "Bhavana's Week 05: Swap the Variable"
seoTitle: "Swap the Variable: Reusing a Web Page Pattern"
description: "A Humanitarians AI Fellow explains how swapping one variable in a router config turns a single landing page template into an entire page family."
summary: "Bhavana Bhariday shows how a single well-built page template, with one variable swapped, generates an entire family of job-search landing pages and a master directory."
keywords: ["h1b landing page generator", "opt resolver template pattern", "dry code page generation", "seo landing page family", "master sponsor directory", "job seo engineer fellowship", "reusable router config pattern", "city page role page swap"]
generated: "article"
---

How do you know a code pattern is actually good, rather than just good enough to ship once? Bhavana Bhariday, a Humanitarians AI Fellow working as the SEO engineer on the job seeker project, answers that question in week five of her build by testing an old pattern against a new problem, and watching it hold.

## Reusing patterns instead of reinventing them

Bhavana's role is making sure Google can find and rank the job listings her team publishes. In earlier weeks, that meant building city pages, one for each location a user might search job listings by. This week's task looked different on the surface: build role pages instead of city pages. But she found that the two problems share an identical shape. A role page is a city page with a single word swapped. That's the whole insight this video walks through, and it's why she frames the week as proof rather than a plot twist.

## The test: is the next build boring?

The real test of whether a pattern is well designed isn't whether it works the first time. It's whether reusing it for the next similar problem feels boring. Bhavana lays this out side by side using two resolver functions: the H-1B resolver, which finds a city, and the OPT resolver, which finds a role. Both functions have the exact same shape. Both start with "find," both return either a config object or null, and the only thing that changes between them is a single variable: city becomes role. If a second implementation requires that little new thinking, the first one was built right.

She's careful to name the limit of this approach, too. The swap only works because the underlying data shape is genuinely identical between city pages and role pages. If a new page type needed a different kind of data entirely, that wouldn't be a swap of one pattern, it would call for a new template. Recognizing that distinction is part of what makes the pattern trustworthy rather than a shortcut applied where it doesn't belong.

## From constants to a whole page family

Because the shape was truly the same, one function was enough to turn a short list of constants into an entire family of pages. Cities become H-1B pages and new grad pages. Roles become OPT pages and internship pages. Adding a single new city or role to the list is all it takes for every page type built on top of that list to pick it up automatically. The list itself stays small; what it generates does not.

## The Master Sponsor Directory

The one genuinely new piece of work this week wasn't another swap, it was a hub page: the Master Sponsor Directory. This page pulls from the same underlying cities and roles data and links out to the entire family of generated pages in one place. Its purpose is navigational as much as structural. Without it, the site would just be a pile of separate landing pages with no way for a visitor, or a search engine crawler, to move between them. The directory turns that pile into something that can actually be browsed and indexed as a coherent whole.

## Key takeaways

- A pattern is proven right when reusing it for a similar problem feels boring rather than difficult.
- The OPT resolver reused the H-1B resolver's exact shape, with only one variable swapped: city became role.
- A swap only works when the underlying data shape is truly identical; different data calls for a new template, not a forced reuse.
- One function turning a small list of constants into an entire page family scales the site without scaling the codebase.
- The Master Sponsor Directory was the one new page needed this week, tying the whole generated family together for visitors and search crawlers alike.

## Try it yourself

Bhavana's closing challenge is worth running on your own recent work: look at the last few things you built, ask Claude to find the one shape hiding inside them, and then ask what single variable you'd need to swap to generate the next one for free. If reusing the pattern feels boring, you built it right. This kind of reflection is part of the practical, build-by-doing approach that runs through the Humanitarians AI Fellows program.
