---
title: "Why Backtesting on Revised Financial Data is \"Look-Ahead Bias\""
seoTitle: "Why Backtesting on Revised Data Is Look-Ahead Bias"
description: "Aishwarya Patil explains how restated earnings quietly leak future information into financial models, and how point-in-time data stores fix it."
summary: "A $30M gap between reported and restated earnings shows how backtests can quietly train on information that didn't exist yet."
keywords: ["look ahead bias backtesting", "point in time financial data", "restated earnings bias", "compustat point in time database", "backtest data integrity", "financial ai model training data", "point in time vs restated data", "quantitative finance data bias", "audit backtest with claude", "survivorship bias look ahead bias"]
generated: "article"
---
A company reports Q1 earnings of $310 million. Months later, after corrections and restatements, that same quarter shows up in the data as $340 million. If a financial model gets trained or backtested on the second number while pretending to predict the first period, it has quietly been handed information from the future. Aishwarya Patil from the Mycroft team walks through exactly how that happens and why it's a routine, ongoing problem rather than a rare edge case.

## The $30 million difference

The gap between what a company reported at the time and what the same filing shows today isn't a rounding error. It's the difference between $310 million and $340 million on a single quarter, and it captures the core problem in one number. Financial data gets revised constantly after the fact: restated earnings, corrected filings, updated economic indicators. The version of a dataset you pull today often isn't the version that existed on the date it claims to describe. A model trained on today's version is being trained on a number that, at the historical date in question, nobody actually had.

## How restated earnings leak the future into the past

This is the mechanism of look-ahead bias. A model trained or backtested on today's restated numbers is quietly given information from the future relative to the date it's supposedly predicting. Because restatements are a normal, continuous part of financial reporting rather than a rare correction, this isn't a hypothetical risk that shows up occasionally. It's baked into how financial data is stored and pulled by default, which means any backtest built on a live, current database is at risk unless someone has specifically guarded against it.

## The fix: point-in-time data stores

The fix is a specific kind of data architecture: a point-in-time data store. Instead of overwriting a value when a correction comes in, the system stores the value as it was known on that date, and stores any later revision as a separate, dated entry alongside it, never replacing the original. A model trained on this kind of store can only ever see what someone actually could have seen at the time, because the corrected numbers are dated and separated rather than silently merged into history.

## Inside Compustat's point-in-time database

This isn't a theoretical fix either. Commercial products exist specifically to solve this problem, and Compustat's point-in-time database is a clear example. It tracks both a company's originally reported numbers and every later restatement as separate, dated records, letting researchers reconstruct exactly what was known at any past month-end rather than what is known now. Its stated purpose is to help researchers avoid both survivorship bias and look-ahead bias. The fact that a dedicated commercial product exists around this one problem is itself a strong signal of how routinely restatements distort naive backtests that don't account for them.

## Auditing your own data

The practical takeaway is a question you can ask about any dataset you're using for a backtest: does this reflect the value as it was reported on the date in question, or has it been silently updated with later corrections? If you can't answer that, the safest assumption is that the backtest built on it may be using information from the future. Checking this is described as something you can do directly with Claude, asking it to help audit whether a financial dataset reflects point-in-time values or restated ones.

## Key takeaways

- Restated earnings can differ from originally reported earnings by tens of millions of dollars on a single quarter.
- Training or backtesting on today's restated data silently leaks future information into a model meant to predict the past.
- Point-in-time data stores solve this by keeping the original reported value and storing any later correction as a separate, dated entry.
- Compustat's point-in-time database is a commercial example built specifically to help researchers avoid survivorship and look-ahead bias.
- Before trusting a backtest, check whether the underlying dataset was restated after the fact, and treat undated or silently updated data as a potential source of look-ahead bias.

## Who this is for

This is aimed at anyone building or evaluating financial AI models, quant researchers running backtests, and Humanitarians AI Fellows working on data integrity for the Mycroft project. If you work with historical financial data at all, the audit question raised here, whether your dataset reflects what was known at the time or what's known now, is worth asking before you trust any backtest result.
