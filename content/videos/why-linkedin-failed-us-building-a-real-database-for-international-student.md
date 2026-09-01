---
title: "Why LinkedIn Failed Us: Building a Real Database for International Student Hiring (80 Days to Stay)"
seoTitle: "Why LinkedIn's API Fails International Student Hiring"
description: "LinkedIn's API is built for spam outreach, not research, so this project drops LinkedIn and builds a company database from SEC Form D filings instead."
summary: "After LinkedIn's API proved useless for identifying visa-sponsoring companies, this update outlines a new plan using SEC filings, domain checks, and Common Crawl data."
keywords: ["linkedin api useless nonprofit research", "sec form d international student hiring", "80 days to stay database build", "visa sponsoring company database", "common crawl company domain matching", "google search api company verification", "international student hiring data pipeline", "linkedin premium api restrictions"]
generated: "article"
---

The original plan sounded reasonable: use LinkedIn to identify companies likely to sponsor international students, by looking at company pages, then at individual employees, and inferring from their educational and immigration backgrounds whether a company had a track record of hiring internationally. That plan is dead, and this update explains why, and what's replacing it.

## Why the LinkedIn approach broke down

LinkedIn does have an API, but it's built for one purpose: allowing outreach at scale, the kind of behavior that looks a lot like spam. It is not built for research access, and there's no way to pay LinkedIn for the kind of data access this project would need, even as a paying customer. Building a crawler to get around that restriction was considered and rejected. Beyond the API restriction, the broader experience of using LinkedIn as a platform reinforced the decision: a feed dominated by irrelevant sponsored messages and generic corporate language, and even a case where LinkedIn removed a post for describing cold outreach accurately as what it is, unsolicited messaging hoping for a small percentage of responses. The frustrating part is that LinkedIn has the underlying data to offer something genuinely useful, tailored job matching for individual users, but has chosen a different, spam-oriented business model instead.

## The new approach: filtering SEC Form D data

With LinkedIn ruled out, the new plan starts from a completely different data source: SEC Form D filings, which cover roughly 500,000 companies. The first step is filtering that list down aggressively, removing companies based outside the US, excluding industries unlikely to sponsor international hires, such as dining services and industries requiring security clearances that international candidates typically can't obtain, and narrowing the full set down to a target range of 10,000 to 20,000 high-value prospects.

## Verifying companies through domain matching

Once the filtered list exists, the next step is domain verification: inferring a likely website based on each company's name, and checking whether that guess actually resolves to a real site. Where a match is found, the site itself gets crawled, and the text on the site is checked against what's expected for that company, confirming the match before treating the company as verified. This step, cheap and mechanical as it sounds, does real work: pure name-guessing catches a meaningful share of legitimate matches on its own.

## Layering in Common Crawl and paid search

Beyond direct domain guessing, the plan brings in Common Crawl data as an additional source, accessed through its API rather than downloading and processing the full raw data files directly, since those files run into the gigabytes per file across thousands of files, a scale that isn't practical to work through by hand at this stage. If free options don't cover a company, the plan allows for falling back to the Google Search API as a paid option, which includes a free daily allotment of searches and a modest per-search cost beyond that, to be used only after the free approaches have been exhausted.

## Why crawling company sites pays off twice

Crawling a company's own website isn't just about confirming a name match. It also surfaces the company's actual jobs pages, which is valuable in its own right. Job listings that mention visa sponsorship or openness to international candidates are a direct, strong signal, stronger than an inference based on any individual employee's background, and finding those listings is a natural byproduct of the same crawl used for verification.

## Bringing in student verification

The final piece of the plan is human verification, sourced from the existing network of students who've been part of this work in the past. The idea is to send out batches of company URLs and ask students to check and report back on what they find, supported by a purpose-built Vercel website where people can submit a URL along with information about whether they believe that company has hired internationally, using an already-developed outreach message for that request.

## Key takeaways

- LinkedIn's API is designed for outreach at scale, not research access, and there's no paid tier that unlocks the kind of data this project needs.
- The replacement approach starts from SEC Form D filings, roughly 500,000 companies, filtered down to a target of 10,000 to 20,000 high-value prospects.
- Domain matching by company name, followed by crawling and text verification, is the first and cheapest verification layer.
- Common Crawl's API and, as a paid fallback, the Google Search API extend coverage beyond direct domain guessing.
- Crawling a verified company's site also surfaces job listings, which offer a stronger direct signal of visa sponsorship than inferring from employee backgrounds.
- A student-network verification step, supported by a purpose-built Vercel site, adds human confirmation on top of the automated pipeline.

## Who this is for

This update is part of the 80 Days to Stay initiative, which supports international students navigating visa deadlines around employment. It's a useful look for anyone building data pipelines from public filings on a limited nightly time budget, and it reflects the kind of practical, incremental engineering work Humanitarians AI documents in public as it happens.
