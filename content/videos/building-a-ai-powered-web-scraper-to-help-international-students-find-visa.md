---
title: "Building a AI-Powered Web Scraper to Help International Students Find Visa Sponsors | 80 Days 2 Stay"
seoTitle: "AI Web Scraper for Visa Sponsor Companies"
description: "A progress update on an asynchronous web scraper analyzing 20,000+ company sites from SEC Form D data to find international student visa sponsors."
summary: "This progress update shows an asynchronous scraper pulling careers pages from 20,000+ funded startups, feeding an LLM analysis to find visa-sponsoring employers."
keywords: ["ai web scraper visa sponsors", "80 days to stay project", "sec form d company data scraping", "async web scraping python startups", "llm analyze company careers pages", "find companies that sponsor visas", "international student job search ai", "botspeak ai fluency framework"]
generated: "article"
---

Finding a company willing to sponsor a work visa is one of the hardest parts of an international student's job search, largely because that information isn't published anywhere in a searchable form. This progress update walks through a system built to solve that problem directly: an asynchronous scraper pulling data from thousands of company websites, feeding a pipeline that will eventually use language models to answer the exact questions a job-seeking student actually needs answered.

## Starting from SEC Form D data

The project, part of the 80 Days to Stay initiative at Humanitarians AI, starts from a list of company URLs confirmed to exist, drawn from SEC Form D filings, a dataset of over 20,000 funded startups. The scraper works through each URL and grabs whatever relevant pages it can find: careers pages, about-us pages, internship listings, customer and partner pages, clinical trials or solutions pages, and contact information. The goal at this stage isn't deep analysis, it's simply pulling in as much raw material as possible from each site quickly.

## Why asynchronous matters here

The scraper runs 50 requests in parallel rather than working through the list of 20,000+ companies one at a time. That's the difference between a job that finishes in hours and one that would take days running sequentially. Not every site yields useful data on the first pass; some don't return much of anything, and the plan is to circle back to those 10,000 to 20,000 sites later and see what can be recovered with a second, more targeted attempt. The priority for the first pass is speed and coverage: get a usable list of companies into people's hands quickly, then come back and clean up the gaps.

## What happens after the scrape

Once the raw pages are collected, the next stage combines the SEC filing data with whatever page content was captured, strips out extraneous HTML, and hands the combined text to a language model. The model is asked a small set of specific questions about each company: What does this company do? Are they likely to hire international students, and why? Are they likely to hire recent graduates, and why? The model is given guidance on how to evaluate a company's page the way a human reviewer would, essentially acting as a stand-in for a person manually reading through thousands of company sites, a task that would be impractical to do by hand at this scale.

## The reasoning matters as much as the answer

A key detail here is that the system isn't just producing a yes-or-no label for each company. It's asked to provide reasoning: why it believes a company is or isn't likely to hire international students or recent graduates. That reasoning is what turns a raw classification into something a student can actually evaluate and trust, rather than a black-box score with no explanation behind it.

## Timeline and goal

The stated target is delivering a list of 5,000 to 15,000 qualified prospects, companies with strong evidence they've hired international students and strong evidence they've hired recent graduates, by the middle of the following week. The scraping stage alone is expected to run for several hours, potentially up to ten, given the number of domains being processed asynchronously.

## Key takeaways

- The scraper starts from SEC Form D data, a public record of company funding, to build a target list of over 20,000 startups.
- Running 50 requests in parallel is what makes scraping tens of thousands of sites feasible in a reasonable timeframe.
- The plan explicitly favors an imperfect first pass covering the most companies over a slower, complete pass, with cleanup planned as a second phase.
- A language model is used to answer specific, practical questions about each company (does it hire international students, does it hire recent graduates) rather than just summarizing the page.
- The system asks for reasoning behind each answer, not just a classification, so the output can be evaluated rather than blindly trusted.

## Who this is for

This project is built for international students navigating the work visa sponsorship process, and this update is useful for anyone interested in how automation and language models can be applied to a concrete social-good problem. It's part of the 80 Days to Stay initiative at Humanitarians AI, developed alongside the organization's Botspeak AI Fluency Framework.
