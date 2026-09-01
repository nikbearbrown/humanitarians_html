---
title: "Mycroft Update by Anjana: ECIS Episode 2"
seoTitle: "Mycroft ECIS Episode 2: Scaling to 25 Companies"
description: "Anjana details how the Earnings Call Intelligence System scaled from two tickers to 25 companies using two independent models to flag ambiguous guidance."
summary: "The Earnings Call Intelligence System now cross-checks two independent models across 25 companies to catch exactly where earnings call language is ambiguous."
keywords: ["earnings call intelligence system", "ecis mycroft financial ai", "llama vs mistral cross checking", "earnings call guidance maintained or nothing", "ai earnings call transcript analysis", "multi model financial ai reader", "live queryable dashboard earnings calls", "guidance boundary detection ai"]
generated: "article"
---

Six months ago, this system was a proof of concept watching two stock tickers. This update shows what it looks like at a scale that actually matters: a full sector, two independent language models cross-checking each other, and a dashboard built to answer the one question static reports never quite settle, where exactly does the language of an earnings call get ambiguous.

## From four readers to a two-model reader

The Earnings Call Intelligence System, ECIS, reads earnings calls using four independent readers and one triangulator that weighs their output. That was version one. In version two, the piece that used to be a single language model reading each transcript chunk is now two: Llama and Mistral, each processing every chunk independently through the same pipeline, the same prompts, and the same self-consistency checks. Critically, they do not share answers with each other before the triangulator sees them. When the two models agree, confidence in that reading goes up. When they disagree, the system knows precisely where the underlying language is genuinely ambiguous, rather than guessing.

## Scaling from two tickers to a full sector

The pipeline that once covered two companies now runs across 20 to 25 companies, processing hundreds of transcripts and thousands of chunks through the same four readers, the same routing logic, and the same scorecard used in version one. That jump from a handful of tickers to a full sector is the real test of whether the design holds, since a method that works cleanly on two companies can still fall apart once volume and variety increase.

## Drawing the line between maintained and nothing

At this scale, the hardest classification call is not whether guidance was raised or lowered, it is the boundary between "maintained" and "nothing." When a CEO says "we are comfortable with our current outlook," is that a reaffirmation of guidance or just a sentence with no formal signal behind it? The system now draws that boundary precisely: maintained means the company actively reaffirmed its guidance, nothing means there was no guidance given at all. Every signal behind that call, every reader's vote, every calibration curve, every model's performance, and every decision the feedback loops make, lands in one place rather than being buried across separate outputs.

## A live dashboard instead of a static report

Rather than producing a report generated after the fact, the output is a live system that can be queried, drilled into, and interrogated directly. Two models, 25 companies, one scorecard that stays current rather than going stale the moment it is published. That live, queryable structure is the point: a static report answers the questions someone thought to ask before generating it, while a live dashboard can answer the questions that come up afterward.

## Key takeaways

- ECIS version 2 replaces its single-model reader with two independent models, Llama and Mistral, cross-checked against each other on every transcript chunk.
- Model disagreement is treated as a signal: it marks exactly where the earnings call language is genuinely ambiguous, rather than being averaged away.
- The pipeline scaled from two tickers to a full sector of 20 to 25 companies without changing its core reader and triangulator structure.
- The system draws a precise line between "maintained" guidance, an active reaffirmation, and "nothing," where no guidance was given at all.
- Output lands in a live, queryable dashboard rather than a static report generated after the fact.

## Try it yourself

Think of one process at work where you currently trust a single judgment call, one model, one reviewer, one gut check, that you have never actually questioned. Ask Claude to help you define what a genuine second, independent check would look like, what counts as agreement versus disagreement between the two, and whether disagreement would be rare enough that adding a second check is not worth the cost. This kind of systems thinking is part of the work happening on Mycroft Financial AI within the Humanitarians AI Fellows program.
