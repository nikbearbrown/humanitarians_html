---
title: "Building a Visa Sponsorship Database from SEC Data | 80 Days to Stay Project"
seoTitle: "Building a Visa Sponsorship Database from SEC Data"
description: "A walkthrough of pulling SEC Form D filings by quarter, deduplicating funding data, and identifying companies likely to sponsor visas for hires."
summary: "This video builds a company database from quarterly SEC Form D filings, then shows how LinkedIn hiring patterns can flag which funded companies actually sponsor visas."
keywords: ["sec form d filings by quarter script", "80 days to stay project", "visa sponsorship company database", "opt students job search data", "sec edgar data deduplication script", "linkedin hiring pattern visa sponsorship", "international student employment gap", "funded startups likely to sponsor visa", "sec filings state and industry breakdown", "predictive model international hiring"]
generated: "article"
---

International students face a real employment gap, and part of the reason is invisible rather than structural: the funded companies most likely to actually sponsor a visa are largely absent from the job boards students already search. This video is day two of the 80 Days to Stay project, and it walks through the first real technical step: pulling raw SEC filing data by quarter, cleaning it up, and starting to figure out which of those companies have a track record of hiring internationally.

## Pulling filings quarter by quarter

SEC filings are organized by quarter, so the script built here works by iterating through each quarter going back roughly ten years, far enough to capture companies with an established funding history without reaching all the way back to when SEC filing data begins. For each quarter, the script pulls how much money a company raised in that filing period. Because a company can raise money in multiple quarters, for example once in Q1 and again in Q3 of the same year, the script updates that company's totals rather than treating each filing as a separate entity, removing duplicates and adding up funding across filings as it goes. At this stage nothing gets filtered out; the goal is to keep everything, across every industry and every state, and let the data volume settle before deciding what to cut.

## Descriptive statistics as a first checkpoint

Once the pull finishes, the script outputs descriptive statistics on the result: total company counts, funding by state, and breakdowns like how many companies raised above $1 million or above $5 million. This run turned up a little over 500,000 companies, with about 250,000 of them having raised over $5 million. A meaningful chunk of that total, flagged under an SEC filing code referred to as "E9," corresponds to companies based in Europe, which get set aside since the project's focus is US-based employers. Looking at concentration by state lines up with expectations: California, Massachusetts, New York, and Texas show up as major hubs, alongside states like Texas and Illinois more broadly.

## Narrowing by industry

A parallel breakdown looks at industries, aiming to identify the sectors most likely to actually hire recent graduates and international students specifically. Pharmaceuticals, biotech, and computers stand out as strong likely candidates, while others need more digging, investment funds are assumed to be finance-related and might hire analysts and programmers, while real estate looks like a weaker fit. Adding a handful of these promising industries together lands on a working set of roughly 50,000 companies as a realistic starting point for the next stage of filtering.

## Checking for a real hiring signal via LinkedIn

Counting funded companies in the right states and industries only gets you a list of plausible candidates, not evidence that a company actually hires internationally. The next step described is a manual, illustrative pass through LinkedIn data at a real, already-identified startup, looking at employee profiles for a specific pattern: a US-based master's degree paired with an undergraduate degree earned overseas, plus signals like language skills listed on a profile. That combination is treated as a reasonably strong indicator that a person came to the US in part for graduate study, which in turn means that if a company has hired someone matching that pattern, it has functionally demonstrated willingness to hire international candidates, since it has already done so. The same logic extends to recent-graduate hiring: if a profile shows a bachelor's degree from just a couple of years ago, that's evidence the company is open to hiring people early in their careers too.

## Where this is heading

The plan is to automate this LinkedIn-pattern check across the full filtered company list, likely pulling company websites and public profile data to look for the same degree and language signals at scale, in order to build a predictive score for how likely a company is to sponsor a visa or hire someone with a similar academic background. The mission for the full 80 Days to Stay project is to facilitate at least one successful sponsorship match using only public data and open-source tools, on a stated budget of zero dollars per month.

## Key takeaways

- SEC Form D filings are organized by quarter, so the data pipeline pulls, deduplicates, and aggregates funding totals quarter by quarter across roughly a ten-year window.
- An initial, unfiltered pull turned up a little over 500,000 companies, with about 250,000 having raised over $5 million; European filings (flagged under a code called "E9") are excluded from the US-focused target list.
- Industry filtering narrows the target list toward sectors most likely to hire recent graduates and international students, landing near 50,000 companies as a starting point.
- A manual LinkedIn review technique looks for employees with a US master's degree and an overseas undergraduate degree as a signal that a company has already hired internationally.
- The next planned step is automating that LinkedIn-pattern check at scale to build a predictive score for sponsorship likelihood across the full company list.

## Who this is for

This video is part of the 80 Days to Stay project from Humanitarians AI, aimed at international students facing OPT deadlines who need a more targeted way to find companies actually capable of and open to visa sponsorship, beyond the well-known names everyone already applies to. It's also a useful watch for anyone interested in building a public-data pipeline from scratch using SEC filings and open-source tools on a zero-dollar budget.
