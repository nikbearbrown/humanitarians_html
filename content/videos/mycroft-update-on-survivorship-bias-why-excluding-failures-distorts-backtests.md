---
title: "Mycroft Update on Survivorship Bias: Why Excluding Failures Distorts Backtests"
seoTitle: "Survivorship Bias in Backtests Explained"
description: "Aishwarya Patil explains how financial datasets silently drop bankrupt and delisted companies, making backtested strategies look safer than they were."
summary: "A dataset built from today's list of companies only shows survivors, which quietly inflates how safe and profitable a backtested strategy looks."
keywords: ["survivorship bias backtesting", "survivorship bias free dataset", "delisted companies backtest", "mycroft financial ai", "backtest data quality", "historical stock data bias", "point in time company list", "bankrupt companies dataset", "backtest returns inflation", "responsible ai finance research"]
generated: "article"
---

A strategy that returned 12% annually over 20 years sounds like a strong track record, until you ask which companies were actually included in that measurement. If the dataset only contains companies still around today, the number isn't measuring what the strategy would have done in the real market. It's measuring performance among the survivors, a much easier and much rosier question.

## How the bias sneaks into a dataset

Aishwarya Patil from the Mycroft team walks through the mechanism: a historical dataset built from today's list of companies only ever includes the ones that survived long enough to still be on that list. If a company went bankrupt, was delisted, or got acquired out of distress somewhere along the way, it's often silently missing from the data, not flagged as absent, just never there at all. A backtest run against that kind of dataset isn't testing how a strategy would have performed in the real, messy market. It's testing performance among companies that happened to survive, which is a fundamentally different and more forgiving question than the one investors actually care about.

## The fix: build forward, not backward

The correction is to construct a survivorship bias free dataset that includes delisted and bankrupt companies at the point in time they were still active, rather than erasing them because they later failed. That distinction matters: the dataset has to be built forward from a real, point in time list of companies that existed at each moment in history, not backward from a list of today's survivors. Building forward preserves the failures inside the historical record instead of quietly editing them out after the fact.

## How big is the distortion, really

The honest answer is that it depends heavily on the dataset. Research cited in the video shows a wide range: Grinblatt and Titman found the effect as small as a few tenths of a percentage point per year in some contexts, while Carhart, Shanken, and Sloan found excluded firms' returns differed by 9 to 10 percentage points in equity data in a mutual fund study. Hedge fund researchers have estimated an average distortion closer to 2% per year across peer indices. The size varies by asset class and time period, but the direction never flips: leaving out the failures always makes the past look safer and more profitable than it actually was.

## Auditing your own data

The practical takeaway is a question anyone can ask about a dataset they're using or considering: does it include delisted, bankrupt, or acquired companies at the point in time they were active, or does it only reflect companies that exist today? If that question can't be answered confidently, any backtest run on that data should be treated as optimistic until proven otherwise. This kind of dataset auditing is part of the work happening in Mycroft, the Humanitarians AI financial research initiative, where the team builds tools with Claude to check whether financial data and the strategies tested against it hold up to scrutiny.

## Key takeaways

- A dataset built from today's surviving companies silently drops the bankrupt, delisted, and acquired ones, inflating apparent returns.
- A survivorship bias free dataset must be built forward from real point in time company lists, not backward from today's survivors.
- Academic estimates of the distortion range from a few tenths of a percent to 9-10 percentage points, with hedge fund peer indices averaging closer to 2% a year.
- The size of the bias varies, but it always pushes historical performance to look safer and more profitable than it really was.
- Auditing a dataset starts with one question: does it include the companies that failed, at the time they were still active?

## Who this is for

This update is aimed at anyone building or evaluating financial backtests, whether for research or for a live strategy, and it's part of the ongoing work from Mycroft, Humanitarians AI's financial AI research program.
