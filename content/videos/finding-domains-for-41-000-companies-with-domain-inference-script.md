---
title: "Finding Domains for 41,000 Companies with Domain Inference Script"
seoTitle: "Finding Domains for 41,000 Companies with a Script"
description: "A domain inference script finds a working website for all 41,299 companies in a dataset, setting up the next step: crawling to verify each match."
summary: "A Python domain inference script found at least one live website for all 41,299 companies in a dataset by guessing and checking common domain patterns, setting up a crawling and verification pass next."
keywords: ["domain inference script python", "find company website from name", "domain pattern matching http check", "web crawling company verification", "infer company domain from name", "job page discovery web crawler", "company career page crawler script", "verify company domain with crawling"]
generated: "article"
---

Turning a spreadsheet of 41,299 company names into a list of working websites sounds tedious, but it's exactly the kind of problem a script can chew through overnight. This late-night walkthrough runs a domain inference script against that full dataset and gets a working domain for every single company, then lays out what comes next to make sure each domain is actually correct.

## What domain inference does

The script takes each company name and guesses at likely domain patterns built from it, then checks whether any of those guessed domains actually has a live website behind it. If a pattern gets back a legitimate HTTP response, that URL gets saved. Because a company can own more than one variant of its name as a domain, the script sometimes keeps two or three URLs for a single company rather than assuming there's only one right answer.

## A 100% success rate

Run against all 41,299 companies in the dataset, the script found at least one working URL for every single one. That's a strong result, but it comes with an immediate caveat: finding a domain that responds isn't the same as confirming it belongs to the right company. A name like "Whisker Acquisition" could plausibly belong to a pet care company, a hedge fund, or a whiskey company, and pattern matching alone can't tell those apart.

## Why crawling comes next

The next stage is web crawling and verification. The plan is to start at each discovered domain's homepage, follow its internal links, and extract the text from those pages, specifically watching for key pages like jobs, careers, team or people pages, and about pages. From that text, the process checks whether the page actually mentions the company by name, confirming the match, and then infers what the company does and whether it's likely to be hiring, based on industry, size, and content signals.

## A worked example: Clever Care Health Plan

The walkthrough traces this process for one company, Clever Care Health Plan. Domain inference finds a candidate domain like clevercare.com, the crawler visits the homepage and follows links to pages like /about, /careers, /team, and /contact, extracts the text from those pages, and verifies that the text actually mentions "Clever Care Health Plan." From there it finds a jobs page and infers that this is a healthcare company, likely at a Series B stage, probably hiring.

## What crawling will extract

Once verification runs at scale, the crawl is expected to surface job page URLs pointing directly to career opportunities, the ATS platforms companies use (Greenhouse, Lever, Workday, and similar systems), plain-language company descriptions pulled from the site's own copy, team pages that carry size and diversity signals, about pages with mission and funding stage mentions, and contact information for additional validation.

## Key takeaways

- Domain inference guesses likely domain patterns from a company name and checks each one for a live HTTP response.
- The script achieved a 100% success rate, finding at least one working URL for all 41,299 companies in the dataset.
- A responding domain isn't automatically the right company; ambiguous names like "Whisker Acquisition" need content verification.
- The next stage, crawling, follows internal links from each homepage and extracts text to confirm the company name appears on the site.
- Crawling is designed to surface job pages, ATS platforms, company descriptions, team pages, and funding or mission signals in one pass.
- This is a standard pipeline: domain inference, web crawling, content extraction, verification, and enrichment.

## Who this is for

This is a practical, code-adjacent walkthrough for anyone building a data enrichment pipeline from a large company list, particularly useful for projects connecting company data to hiring signals, such as identifying which companies are likely to sponsor or hire international students, a use case referenced directly in this Humanitarians AI project.
