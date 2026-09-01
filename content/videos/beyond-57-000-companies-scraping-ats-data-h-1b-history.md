---
title: "Beyond 57,000 Companies: Scraping ATS Data & H-1B History"
seoTitle: "Beyond 57,000 Companies: ATS Data & H-1B History"
description: "An 80 Days to Stay update walks through turning 57,000 SEC-filed companies into hiring leads by adding website data, ATS tracking, and H-1B filing history."
summary: "This 80 Days to Stay update explains how a database of 57,000 funded companies is being expanded with missing websites, ATS tracking, and H-1B filing history to target companies likely to hire."
keywords: ["80 days to stay project", "h-1b sponsorship history database", "ats tracking greenhouse lever", "startup company database job search", "sec filed companies visa sponsorship", "uscis department of labor visa data", "domain inference google api", "job search data engineering pipeline"]
generated: "article"
---

A list of 57,000 companies that have raised funding sounds like a goldmine for job seekers, until you realize a name on a spreadsheet doesn't tell you where to apply, whether the company sponsors visas, or what kind of roles it's hiring for. This 80 Days to Stay update, from Professor Nik Bear Brown, walks through the next phase of turning that raw list into something international students and tech job seekers can actually use.

## From a list of names to a list of leads

The starting point is roughly 57,000 companies pulled from SEC filings, each of which has raised at least some funding, with websites already identified for about half of them. The problem is that a company name alone isn't enough to act on. The goal for this phase of the project is explicit: transform the raw data into hiring leads by figuring out exactly which companies have a track record of sponsoring visas and what technology stacks they work in.

## Filling in the missing websites

For the roughly half of companies without a confirmed website, the current approach is a mix of automated guessing and manual fallback. The system tries to guess a likely domain first, and when that guess misses, as it does with a company that should have been guessed as "lamininaire.ai" but wasn't, the next step is pasting the company's information into Google and checking the first meaningful result, filtering out sources like CB Insights or SEC filings that show up but aren't the company's own site. Where the automated guesses keep failing, the plan is to fall back on the Google API directly to search for a real website, which is described as the next concrete build step.

## Tracking which companies actually sponsor visas

Two additional data sources are being layered on. The first is Applicant Tracking System identification, figuring out which platform, Greenhouse, Lever, or similar, each company uses to post and manage job applications, which helps applicants optimize how they apply. The second, and the one most directly tied to the "80 Days to Stay" framing, is H-1B historical data pulled from USCIS and Department of Labor datasets. The plan is to calculate two summary statistics per company: how many visas that company files in a typical year, and how recent their most recent filing is, whether that's within the last six months, the last year, or the last five years. Together, those numbers turn a company name into a signal: not just "has this company raised money," but "has this company actually sponsored visas, and recently."

## Sorting by role and technology

Once the website, ATS, and visa data are all attached to a company record, the plan is to let users filter by what they actually care about: biotechnology, ML Ops, DevOps, data science, web development, and other niches. The framing here is deliberate: this isn't meant to replace scrolling through LinkedIn job posts, it's meant to replace that scrolling with something closer to targeted lead generation, pointing users toward companies that are statistically more likely to hire for their specific skill set, backed by real funding, visa history, and technology data rather than guesswork.

## Key takeaways

- The project starts from roughly 57,000 SEC-filed companies with confirmed funding, about half of which already have a known website.
- Missing websites are being filled in through automated domain guessing, manual Google lookups, and a planned fallback to the Google API.
- ATS platform identification (Greenhouse, Lever, and others) is being added to help applicants understand how each company handles applications.
- H-1B history from USCIS and Department of Labor data will show how many visas a company files per year and how recent its most recent filing is.
- The end goal is letting users filter companies by technical niche, ML Ops, DevOps, data science, biotech, and more, to find realistic hiring targets.
- The project frames this as modern lead generation: using data to find companies statistically likely to hire, rather than relying on browsing job boards alone.

## Who this is for

This is aimed squarely at international students and tech job seekers who need to identify companies with a real history of visa sponsorship, not just companies that happen to have funding. It's part of Humanitarians AI's ongoing 80 Days to Stay project, and the underlying scripts are shared publicly for anyone who wants to learn how to build similar data pipelines through the organization's upskilling resources.
