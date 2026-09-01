---
title: "Filtering 500K SEC Companies to Find Job Opportunities Using Claude AI"
seoTitle: "Filtering 500K SEC Companies for Job Leads with AI"
description: "A walkthrough of filtering over 500,000 SEC Form D filings into a targeted job-search list, using Claude AI to write and iterate on the filtering script."
summary: "Instead of applying to the usual top 100 companies, this video filters over half a million SEC filings into a targeted list of lesser-known, funded companies to apply to."
keywords: ["sec form d filings job search", "filtering sec company data with ai", "claude ai script writing data", "job search beyond top 100 companies", "funded startups hiring database", "80 days to stay project", "sec filings to csv python", "iterative ai script debugging", "show ai your data first", "visa sponsorship company filtering"]
generated: "article"
---

Most job seekers apply to the same short list of well-known companies everyone else is already applying to. This video takes a different approach: instead of guessing which companies might be hiring, it filters more than 500,000 SEC Form D filings down to a targeted, lesser-known set of funded companies that job seekers can actually work through, and it uses Claude AI to write the filtering script in real time.

## Show the AI your data first

The core technique demonstrated here is deceptively simple: before asking Claude to write a filtering script, paste in the actual JSON structure the script needs to work with, including a few real example entries. Skipping that step means the AI has to guess at the data's shape, which leads to a slow back-and-forth of trial, error, and re-explaining. Showing the real data upfront means the script has a much better chance of working on the first try, because the AI can see exactly what fields exist and how they're formatted rather than assuming.

## Filtering by real criteria

The filtering criteria are practical and specific: a minimum funding amount of $1 million or more, geographic focus on states with strong tech hubs (Massachusetts, California, New York, Washington, Texas, and Illinois), and industry exclusions to cut out real estate, retail, restaurants, and pooled investment funds, none of which are likely to be hiring the kind of talent this list is meant to serve. The goal isn't a perfect dataset on the first pass, it's a workable one that gets refined as issues turn up.

## Catching mistakes and fixing them fast

Running the first version of the script surfaces useful output almost immediately: companies across categories like biotech, healthcare, investing, financial, manufacturing, and pharmaceuticals. But it also surfaces a mistake, restaurants showing up in results they should have been excluded from. Rather than treating that as a major setback, the fix is treated as trivial: check whether the script is using a keyword list for exclusions, and if so, just add "restaurants" to that list and rerun it. The AI wrote the original script in about two seconds, so updating it takes about the same amount of time.

## From filtered data to a usable file

The end goal isn't a clean spreadsheet for its own sake, it's something people can act on immediately. Once the filtering criteria are dialed in, probably one or two more refinement passes, the plan is to export everything into a CSV file that can go straight to job seekers, letting them start researching and applying to companies beyond the usual oversaturated top-tier names.

## Key takeaways

- Sharing your actual data format with an AI system before asking it to write a script avoids slow, repeated debugging cycles.
- The filtering pipeline starts with roughly 568,707 SEC Form D filings and narrows toward a much smaller, targeted set.
- Filtering criteria include a $1 million-plus funding threshold, specific tech-hub states, and exclusions for industries unlikely to hire this audience.
- Iterative fixes, like adding a missed keyword such as "restaurants" to an exclusion list, take seconds to apply and rerun.
- The final output is a CSV file meant to be used immediately by job seekers researching companies to apply to.

## Who this is for

This video is part of the 80 Days to Stay project, an initiative from Humanitarians AI helping international students find companies capable of visa sponsorship before their OPT expires. It's a useful watch for anyone curious about practical AI-assisted data workflows, not just the job seekers the resulting list is built for, since the underlying lesson, give the AI your real data before asking it to write code, applies far beyond this one dataset.
