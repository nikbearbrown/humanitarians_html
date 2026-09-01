---
title: "Scraping 25K Startup Sites & Preparing Them for a Language Model"
seoTitle: "Scraping 25K Startup Sites for LLM Analysis"
description: "A behind-the-scenes look at scraping 25,000 startup sites from SEC data, merging JSON with HTML, and prepping the dataset for a language model."
summary: "After a 59-hour scrape pulled almost half a million pages from 25,000 startups sourced from SEC data, the next step is turning that raw mess into a clean dataset a language model can query."
keywords: ["scraping startup company data", "sec filings web scraping", "building leads dataset from scratch", "merging json html for llm", "h1b sponsorship company data", "startup lead generation dataset", "ats detection from company website", "prepping scraped data for llm queries"]
generated: "article"
---

Scraping thousands of company websites is the easy part. The hard part starts after the bot stops running, when you are staring at hundreds of thousands of raw HTML pages and need to turn them into something a language model can actually reason about. That is exactly the stage covered here: what happens on day four of an 80-day project after a scraper finishes pulling data from roughly 25,000 to 26,000 startups sourced from SEC filings.

## What the scrape actually produced

The run collected close to half a million HTML pages, averaging around 16 to 17 pages per company, and it took about 59 hours running on and off on a single laptop. That volume matters because it is not just a list of company names. Each company now has a stack of raw pages sitting alongside the structured SEC data that seeded the search in the first place: company name, funding raised, and address. The first move after a run like that is a simple insurance policy: back everything up to Google Drive before touching it with any script, so an accidental delete does not erase 60 hours of collection work.

## Turning raw pages into one clean file per company

The real work is converting scattered JSON and web content into something usable. That means combining the SEC-derived JSON data with the scraped web content, stripping out the HTML markup, and merging everything into a single markdown file per company. This step exists specifically so the result can be handed to a language model and queried with plain questions, rather than requiring anyone to manually dig through dozens of raw pages per company.

## The questions the dataset needs to answer

Once the data is in a queryable shape, the plan is to annotate every company by asking a language model a consistent set of questions: What does this company actually do? Do they hire recent graduates? Do they hire internationally? Do they have current job openings, and what are those roles? Because most companies have an "about" page describing what they do and who their people are, that page becomes a key source for these answers, layered on top of the roughly 16 pages already gathered per company.

## Extracting contact information and signals

Beyond the core questions, the dataset also gets enriched with anything that can be found in the raw pages: emails, addresses, and social links like Twitter, Instagram, or Facebook. On top of that, the plan includes tracking signals like which applicant tracking system (ATS) a company uses and whether it has filed for H-1B sponsorship, since that kind of filing data is publicly available through separate government databases. All of this turns a bare SEC record into a much richer profile of each company.

## The endgame: a smaller, higher-quality list

The goal is not to keep all 25,000 companies in play forever. It is to take everything through one full pass and end up with somewhere between 10,000 and 15,000 high-quality leads, prioritizing getting something useful out quickly rather than perfecting domain inference first. Since the initial 25,000 companies were found by guessing at domains, a more sophisticated pass later could likely uncover another 25,000 that were missed the first time around, but that refinement comes after the first useful dataset ships.

## Key takeaways

- A 59-hour scrape on a single laptop pulled roughly 25,000 to 26,000 companies from SEC data and close to half a million HTML pages.
- Back up raw scraped data immediately, before writing any processing script that could accidentally delete it.
- Merging JSON and web content into one markdown file per company, with HTML stripped, is what makes the dataset queryable by a language model.
- Planned annotations include what the company does, hiring practices, open jobs, contact info, ATS used, and H-1B filing history.
- The target is 10,000 to 15,000 high-quality leads from a first pass, with room to recover more companies through better domain inference later.

## Who this is for

This is for anyone building a lead generation pipeline, working with public SEC filings, or curious about the practical, unglamorous steps between "the scraper finished" and "the dataset is actually useful."
