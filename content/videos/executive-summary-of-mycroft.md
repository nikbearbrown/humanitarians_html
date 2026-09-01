---
title: "Executive Summary of Mycroft"
seoTitle: "Mycroft: Tracking AI Sentiment via Hacker News"
description: "Mycroft turns Hacker News discussion into a deterministic buzz score and grounded sentiment reading for 12 AI companies, plus an honest look at its attribution bug."
summary: "Mycroft scores 12 AI companies' Hacker News attention with a deterministic buzz score and a Llama 3 grounded sentiment read, then honestly walks through an attribution bug that misread an unrelated viral post."
keywords: ["mycroft hacker news ai signal", "buzz score deterministic calculation", "llama 3 groq sentiment analysis", "hacker news ai market sentiment", "ai attention signal dashboard", "hacker news attribution bug fix", "ai investing hacker news signal", "grounded sentiment community opinion ai", "mycroft financial ai project", "humanitarians ai fellows hacker news project"]
generated: "article"
---

Wall Street reacts to AI news on its own schedule, but engineers argue about it on Hacker News first. Mycroft is built on that gap, an experiment using AI to invest in AI by turning free public discussion into a structured, daily attention signal for the AI sector. Om Mali's week eight update walks through how the pipeline scores buzz, reads community opinion, and one honest place where it still gets attribution wrong.

## What Mycroft actually tracks

Mycroft's Hacker News agent runs end-to-end every day, producing a buzz score for 12 companies plus a comment-grounded read of what the community actually thinks about each one. The underlying hypothesis is that argument volume on Hacker News is a leading indicator of what matters in the AI sector, and the project is built to explicitly test that idea rather than assume it. As Om puts it, AI made execution cheap, but it didn't make judgment cheap, which is the gap this project is trying to close with real engineering rather than vibes.

## Computing a deterministic buzz score

Every day, a scheduled trigger walks all 12 companies through a Hacker News search, using an entity-and-term pair for each one, for example OpenAI paired with GPT-5, so the search catches relevant discussion under multiple phrasings. Quoting each search term forces exact phrase matching, which matters because without it, a term like AMD would match hundreds of unrelated posts. The pipeline deduplicates stories by ID, so a single post matched by two different search terms only counts once, then sums points and comments and keeps each entity's top three stories by score. If fewer than three stories turn up for a company, that result gets flagged as low confidence right away.

From there, a deterministic buzz score from 0 to 100 gets computed with no model involved, built from four capped components worth up to 30 points each for volume and engagement, 20 for front-page impact, and 20 for acceleration. Story counts are log-scaled, so a company with 100 stories in a week doesn't drown out everyone else in the ranking. Acceleration is measured against the previous day's score with that day's own acceleration already stripped out, specifically so momentum can't compound on itself artificially. With no history yet, an entity's acceleration component simply reads zero.

## Reading community sentiment with Llama 3

The buzz score measures how much attention a company is getting; a separate step tries to capture what people actually think. Before the model sees anything, the pipeline fetches every comment on each entity's top stories, cleans and groups them by company, strips HTML, removes duplicates, drops deleted comments, and caps how many comments any one company can contribute. Up to 15 real comments per entity go into building an opinion prompt, which calls a Llama 3 70B model running on Groq, chosen specifically for speed since a full run makes over a dozen of these calls. The prompt is strict: summarize the community's opinion grounded only in what commenters actually wrote, and never invent a fact. The output includes a summary, a sentiment label, recurring themes, and notable opinions, and the pipeline enforces its own confidence rule here too, an opinion built on fewer than three comments gets flagged so a single comment can't pose as the community's view.

That strict grounding created a real bug along the way: Groq's strict JSON mode kept rejecting quote-heavy comment text, causing every single entity to fail. The fix was to drop strict mode, parse the output leniently, and ask for paraphrased highlights instead of verbatim quotes, which took that part of the pipeline from zero working entities to nine out of 12.

## Week eight's dashboard

This week's work centered on building the AI buzz tracker dashboard itself. A leaderboard ranks every company by its buzz score with breakouts flagged, seven-day trend plots show each company's score across the past week so direction is visible rather than just a single day's number, and a theme breakdown tallies the model's theme tags, launches, funding, outages, controversy, to show what kind of news is actually driving the week. A community opinion card shows entity-by-entity reads: AMD came back negative from real skepticism in the comments, Nvidia's single comment was correctly flagged as low confidence rather than treated as a verdict, and Mistral showed a mixed read on valuation and competition drawn from five real comments. Every run lands as one row in Postgres, so the score, the narrative, and the opinion are logged and comparable day over day.

## An honest finding about attribution

The most valuable part of this update might be the bug it admits to rather than hides. The pipeline currently picks each company's top story by Hacker News points, with no check that the story is actually about that company. A Show HN post for a slide tool called Bento hit over 1,000 points while only name-dropping OpenAI and Anthropic in passing, and because it was the most popular matching post, it became the top story for both companies. The community opinion step then summarized Bento's own comments as if they were opinions about OpenAI and Anthropic, and both came back reading positive, effectively praised for presentation software they had nothing to do with. The existing low-confidence guard didn't catch it, because 15 real comments existed; that guard only catches cases with fewer than three. The planned fix is to require the company's name appear in the story title itself, which is scheduled as the next piece of work after this week's dashboard build.

## Key takeaways

- Mycroft scores 12 AI companies daily using a deterministic 0-100 buzz score built from volume, engagement, front-page impact, and acceleration, with no model involved in that calculation.
- Community sentiment is read separately using a Llama 3 70B model on Groq, grounded strictly in real comments and flagged as low confidence under three comments.
- A strict JSON parsing bug on Groq initially caused every entity's sentiment analysis to fail; switching to lenient parsing with paraphrased highlights fixed nine of 12.
- Week eight added a leaderboard, seven-day trend plots, a theme breakdown, and a per-company community opinion card, all logged to Postgres for day-over-day comparison.
- An honest attribution bug let an unrelated viral Show HN post become the "top story" for OpenAI and Anthropic, producing a false positive sentiment read; the fix is requiring the company name in the story title.

## Who this is for

This is for anyone interested in how AI-driven market signals actually get engineered, warts and all, including the kind of honest bug-hunting that separates a real pipeline from a polished demo. It's part of the Mycroft Financial AI project within the Humanitarians AI Fellows program.
