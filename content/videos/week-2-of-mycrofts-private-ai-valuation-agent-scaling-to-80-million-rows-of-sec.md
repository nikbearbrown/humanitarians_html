---
title: "Week 2 of Mycroft's Private AI Valuation Agent: Scaling to 80 Million Rows of SEC Data"
seoTitle: "Scaling a Private AI Valuation Agent to 80M SEC Rows"
description: "How scaling a private AI valuation agent from one hand-checked company to 80.5 million rows of SEC filings exposed pricing patterns and hidden data bugs."
summary: "Om Mali scales Mycroft's private AI valuation agent from one hand-checked company to 80.5 million rows of SEC data, revealing Anthropic's staircase price history and three bugs a manual check was too small to catch."
keywords: ["sec form 13f bulk data analysis", "private company valuation from sec filings", "anthropic private valuation history", "sec edgar publication lag", "private ai valuation agent mycroft", "13f filing share price reconciliation", "spacex share class sec filing bug", "fidelity variable insurance products naming", "sec bulk data 80 million rows", "private market valuation staircase pattern"]
generated: "article"
---

Last week, one company, checked entirely by hand, proved that SEC filings can reveal a share price for companies that have no public price at all. This week, that same approach got scaled from a single hand-verified case to 14 quarters of bulk SEC data, and the machine immediately caught three things the hand check had completely missed.

Om Mali's second week on Mycroft's private AI valuation agent project is a clean demonstration of what scale actually buys you in data work: not just more data points, but the ability to see the shape a private valuation moves in and to catch mistakes a manual check was simply too small to notice.

## From one company to 80 million rows

The jump in scale here is stark. Fourteen quarters of the SEC's bulk data, about 6 gigabytes, contain 80.5 million individual holdings, representing every position held by every registered fund in the country. That enormous starting point filters down through a funnel: first to 22 million private positions, then down to roughly 5,800 actual marks on the specific companies the project tracks. Every stage of that funnel reconciles against the stage above it, so nothing gets lost silently on the way down. What that funnel buys is a full price history for a company like Anthropic, rebuilt entirely from filings, with 33 separate observation dates.

## The Anthropic staircase

That rebuilt price history runs from about $12 a share in 2023 to over $300 this past April, and the shape of it is a staircase, not a smooth line. The price sits flat for months and then jumps, because these marks only move when there's a new funding round to trigger a new valuation. At the $259 step in that staircase, seven completely independent fund managers, including BlackRock, Fidelity, T. Rowe Price, and Capital Group, all reported the identical price to the cent on the same date. That's the number worth trusting: not because one source said so, but because seven unrelated decision-makers landed on exactly the same figure independently.

## The publication lag trap

Scaling up also surfaced a gap that a single hand-checked data point couldn't reveal. A $589 mark verified by hand the previous week doesn't appear anywhere in this bulk dataset, because the bulk archive is organized by when a fund files, not by the period the filing actually covers. Funds file roughly eight weeks late, so the newest data in a given quarter's archive only reaches back to about six weeks before the quarter closes. That means the data you pull is almost never as recent as the date printed on the file, a trap worth checking for in any dataset built from regulatory filings rather than live reporting.

## Two logic bugs caught before they did damage

Scale caught two more problems that a small manual sample would never have surfaced. Four of Fidelity's funds file under names that never mention Fidelity at all, listed instead as Variable Insurance Products 1 through 4. Left unchecked, the code counted those as five separate managers instead of recognizing them as one, which would have inflated the exact independent-agreement number this whole project exists to measure. Separately, in a single SpaceX filing, one company's common stock was priced at $112 and its preferred stock at $1,120, exactly ten times apart, and that ten-times pattern repeated 309 times across the filing. No other company in the entire dataset does this at all, which is exactly the kind of anomaly that only becomes visible once you're looking across millions of rows instead of a handful.

## Key takeaways

- Scaling from one hand-checked company to 80.5 million rows of SEC bulk data reveals both the true shape of private valuations and errors too small for manual review to catch.
- The data funnel goes from 80.5 million holdings to 22 million private positions to about 5,800 tracked marks, reconciling at every stage.
- Anthropic's rebuilt price history moves in a staircase pattern, from about $12 a share in 2023 to over $300 by this April, jumping only at new funding rounds.
- Agreement between seven independent fund managers on an identical price is the strongest signal of an honest number.
- The SEC's bulk archive is organized by filing date, not by the period covered, so newest available data can lag the true period end date by roughly eight weeks.
- Naming inconsistencies, such as Fidelity's Variable Insurance Products funds, and share-class pricing bugs, such as the SpaceX common-versus-preferred pattern, are the kind of defects only large-scale reconciliation surfaces.

## Try it yourself

Take a fund you know, pull its last two Form 13F filings from SEC Edgar, and compare the period-end date printed inside the filing with the date the filing was actually accepted. Then ask what that gap means for any conclusion you'd draw from the latest available data. This kind of scaled reconciliation work is central to the Mycroft financial AI project at Humanitarians AI, where the next phase moves from bulk archives to live filings to reach more recent valuation data.
