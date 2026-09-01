---
title: "Mycroft Thesis Guard: Fighting Thesis Drift in Investment Research"
seoTitle: "Mycroft Thesis Guard: Fighting Investment Thesis Drift"
description: "Dhrumil Shah introduces Mycroft Thesis Guard, a review layer that checks whether your investment thesis still holds against verified market evidence."
summary: "Mycroft Thesis Guard is not a buy-or-sell engine. It's an evidence-first audit layer that checks whether your original investment thesis still holds, and stops when the evidence is missing."
keywords: ["thesis drift investment research", "mycroft thesis guard review", "evidence first investment audit", "logistic regression stock prediction roc", "184000 rows 120 tickers backtest", "human in the loop investment agents", "confirmation bias investment research", "audit your own investment thesis"]
generated: "article"
---

Investors buy a stock for a reason. Then the facts underneath that reason move, and the story quietly gets rewritten to fit the new facts, without anyone logging the change. A growth story becomes a value story and nobody notices the shift happened. Dhrumil Shah calls this thesis drift, and it's the problem he built Mycroft Thesis Guard to catch.

## What Thesis Guard actually is

The first thing to understand about Mycroft Thesis Guard is what it isn't: it's not a buy-or-sell engine, and it doesn't generate trading signals. It's a review layer that asks one specific question, over and over, for every position: is your original thesis still supported by the evidence? That framing matters, because it puts the system in the role of an auditor rather than a decision-maker. It organizes evidence and checks it against what you originally believed. It does not act on your behalf.

## Building the data honestly

Before any of that review logic runs, the system starts with validated market data, 184,000 rows across 120 tickers, with every price checked before a model ever sees it. The features built on top of that data only use information that was actually knowable at the time, things like returns, volatility, drawdowns, and sector-relative moves. No future data is allowed to leak backward into the inputs, which is a common way backtests quietly cheat without anyone intending it. The data is also split by time rather than randomly, 70% for training, 15% for validation, 15% held back, and any labels that cross a time boundary get purged rather than kept.

## Why the plain model won

Five different models competed against each other, and the plain baseline, logistic regression, was deliberately allowed to win if it could, because added complexity should have to earn its place rather than being assumed to be better. It did win. But the headline number from that competition isn't a triumphant one: the held-out ROC score came in at 0.58, barely above a coin flip. Dhrumil is upfront that this is the finding, not a failure of the project. Short-horizon price direction simply wasn't reliably predictable from this dataset, and reporting that honestly is more valuable than dressing up a weak result to look stronger.

## Treating uncertainty as a signal, not a footnote

Feature drift in the data came back moderate, and rather than burying a number like that, the system treats it as a governance signal worth surfacing, not something to quietly footnote. That same honesty shapes one of the system's more pointed design choices: the bias-checking agent will not try to diagnose an investor's psychology from a price chart. Confirmation bias, sunk cost thinking, and overconfidence are all real risks, but a price chart isn't evidence of any of them, so the system says so directly rather than pretending to detect something it can't.

## Five agents, zero automated decisions

The actual review process runs through five agents per company: one captures the original thesis, one retrieves the relevant evidence, one detects contradictions between thesis and evidence, one checks for bias, and the process then hands the decision to a human. Across the system's use so far, that's produced 120 reports and 600 trace events, and zero automated decisions. Where evidence is missing entirely, no thesis on file, no filings, no decision history, the system doesn't guess. It returns a placeholder instead of a verdict and stops.

## Key takeaways

- Mycroft Thesis Guard is a review layer, not a buy-or-sell engine; it checks whether your original thesis is still supported by the evidence.
- The underlying data (184,000 rows, 120 tickers) was validated and split by time, with no future information leaking into the features.
- Logistic regression beat four more complex models, but its held-out ROC of 0.58 shows short-horizon price direction wasn't reliably predictable from this data, and that finding is reported honestly rather than hidden.
- The bias-checking agent refuses to diagnose investor psychology from price data alone, naming what it can't determine instead of guessing.
- Five agents review each company and the system produced 120 reports and 600 trace events with zero automated decisions; missing evidence produces a placeholder, not a verdict.

## Try it yourself

You can run a version of this audit on your own thinking without any code at all. Write down the claim behind a position you hold, write down what would actually change your mind, date your evidence, and when you can't find a source for something, stop and say so. That discipline, showing your evidence, naming your uncertainty, and leaving the judgment to a person, is the core idea behind the Mycroft Financial AI work at Humanitarians AI.
