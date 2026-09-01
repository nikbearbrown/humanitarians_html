---
title: "Domain Inference Complete: 62% Hit Rate | Now Using LLMs to Analyze Hiring Likelihood"
seoTitle: "Domain Inference Bot: 62% Hit Rate on Startup Domains"
description: "A walkthrough of how a domain-guessing bot matched 25,748 funded startups to real websites, and the LLM pipeline built to judge who hires."
summary: "A domain inference bot just matched over 25,000 funded startups to real websites. The next step feeds those pages to an LLM to judge who is actually likely to hire international talent."
keywords: ["sec form d filings", "domain inference bot", "startup visa sponsorship jobs", "opt international students jobs", "f1 visa hiring startups", "llm hiring signal analysis", "web scraping company websites", "80 days to stay initiative", "h1b sponsorship startups", "python domain verification", "funded startups database"]
generated: "article"
---

If you are trying to find which funded startups might actually sponsor a work visa, the first problem is not analysis, it is identification. Thousands of companies file SEC Form D paperwork every year, but a filing only gives you a name, a state, an industry code, and a funding amount. It does not tell you whether the company has a careers page, whether it lists technical roles, or whether it has ever hired someone on OPT. Before any of that can be judged, you first need to find out if the company even has a live website.

This video picks up right after a domain inference bot finished its run, and it walks through both the result of that step and the plan for the step that comes next: turning raw web pages into an actual judgment about hiring likelihood, using a language model instead of a human reading company by company.

## Narrowing 568,000 filings down to a working list

The starting point was the full set of SEC Form D filings, roughly 568,000 companies. That list was filtered down to about 41,299 companies based on relevant states and industries, since the goal is to find companies that are both funded and plausible employers of international students and recent graduates in tech and research fields. That filtered set became the input for a domain inference bot, a script built to guess the most likely website for each company based on its name.

## What the domain inference bot actually did

The bot's job was simple in concept: take a company name and generate plausible domain candidates, then check them with HTTP requests to see which ones actually resolve to a live site. Out of 41,299 companies, it found working websites for 25,748 of them, a 62% hit rate. A few examples from the run show why this approach works as well as it does. "Crossbow Therapeutics," a biotechnology company, matched to crossbowtherapeutics.com on the first try. "Agent Smith Inc." matched to agentsmith.com. "Corrine NX" matched to a domain built the same way. Because many of these company names are distinctive rather than generic, a name-based guess has a real chance of landing on the correct domain. That said, the plan is still to verify each match rather than trust the inference alone, since a working URL is not proof it is the right company.

## The scraping pipeline that comes next

With verified domains in hand, the next stage is to actually visit each site and collect content. The plan calls for grabbing up to 50 pages per domain, a cap chosen specifically to avoid infinite loops on sites with unbounded internal linking. Each page gets saved locally as HTML, organized into directories under a structure like WWW/domain.com, so the raw material is preserved before any processing happens. From there, the HTML gets stripped down to plain text, discarding markup and keeping just the content a human reader would actually see.

## Feeding company pages to a language model

The final step in the pipeline is where the real analysis happens. The plan is to feed the cleaned website text to a language model alongside SEC metadata about the company, things like funding amount, industry, and location, and ask it to analyze the company roughly the way a person would read a LinkedIn profile. The specific questions the model will be asked include what the company actually does, whether the site plausibly matches the company named in the SEC filing, whether the industry is one that tends to hire international students, and whether it tends to hire recent tech or research graduates, along with reasoning for each answer. The model is also asked to look for concrete signals: job pages, people or team pages, mentions of visa sponsorship, the composition of the team, and the degrees or academic backgrounds the company tends to emphasize.

Rather than running this prompt across all 25,000 companies right away, the plan is to test it by hand on a handful of companies first, refining the prompt until the output is reliable before automating it at scale. That sequencing, verify manually before scaling, is a small detail but it is the difference between a pipeline that produces noise and one that produces something people can actually use.

## Why this matters

This work is part of the "80 Days to Stay" initiative through Humanitarians AI, which is aimed at helping international students find funded startups that might realistically sponsor a work visa. Guessing which companies might hire is not good enough when someone's timeline is measured in a limited number of days after graduation. By grounding the analysis in actual SEC filings and actual website content, the goal is to produce a curated list of real, checkable opportunities instead of a generic list of "funded companies" that may or may not be hiring anyone at all.

## Key takeaways

- A domain inference bot matched 25,748 of 41,299 funded startups (62%) to live websites by guessing domains from company names and verifying them with HTTP requests.
- Distinctive company names, like Crossbow Therapeutics or Agent Smith Inc., produce especially reliable domain matches.
- The next stage scrapes up to 50 pages per verified domain, saves them as HTML locally, then converts them to plain text.
- An LLM will read that text alongside SEC metadata to judge whether a company is real, what it does, and whether it is likely to hire international students or recent graduates.
- The analysis prompt is being hand-tested on individual companies before being automated across all 25,000 verified sites.
- The end goal is a curated, evidence-based list of startups worth applying to, built for the 80 Days to Stay initiative.

## Who this is for

This is useful to anyone curious about how a real data pipeline gets built step by step, from a bulk government filing down to individual company judgments. It is especially relevant to international students, OPT and F1 visa holders, and career advisors trying to understand how a tool like this identifies startups worth targeting, and it documents ongoing work under the 80 Days to Stay initiative at Humanitarians AI.
