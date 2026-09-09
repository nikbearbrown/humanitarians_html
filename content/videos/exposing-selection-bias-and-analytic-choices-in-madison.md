---
title: "Exposing Selection Bias and Analytic Choices in Madison"
seoTitle: "How Selection Bias Flips Your Data Analysis"
description: "Sai builds a synthetic dataset with a known true effect and shows how ordinary analytic choices, not fabricated numbers, produce opposite conclusions."
summary: "Sai walks through a synthetic dataset with a known $1,400 true effect and shows how twelve legitimate analytic choices can make it look like an $8,000 gain or a $5,600 loss."
keywords: ["how selection bias distorts program evaluation", "how to detect analytic choice manipulation", "how to check for selection bias in data", "synthetic dataset known true effect", "questions to ask about a data chart", "post data analytic choices in research", "why do two studies reach opposite conclusions", "chart looks manipulated but numbers are real"]
generated: "article"
---

Sai, a Humanitarians AI fellow, walks through a post built entirely around a synthetic dataset where the true answer is already known. The point isn't to catch someone faking numbers. It's to show the far more common and much harder to catch version of data manipulation: choosing, after the fact, which correct analysis to publish.

## Two press releases, one dataset, opposite conclusions

Sai generated the data himself, so the true effect of the program he's modeling is exactly $1,400 a year, the same for every participant. Every other number that comes out of the same 12,000 rows is also real, computed correctly using standard analytical methods. Applying twelve common analytical choices to that one dataset produces results ranging from about $1,100 to nearly $8,000, and two of those results point in opposite directions. A program-office framing claims graduates outearn everyone else by $7,988. An opposition framing claims participants fall $5,647 behind. Both numbers are computed correctly. Both are publishable. Neither is anywhere near the true $1,400.

## The choice hiding underneath the effect

The reason both flawed results are possible comes down to one thing: people don't enroll in a program at random. In Sai's model, the program recruits hardest where need is greatest, meaning participants start out poorer than non-participants before the program does anything at all. Ignore that fact and the estimated effect can land anywhere from roughly negative $6,000 to positive $8,000. Account for it, using standard adjustment methods, and nearly every version of the analysis lands close to the true $1,500 figure. Sai is explicit that none of this requires a bad actor: it's simply what happens when someone with a preferred conclusion gets to make analytic choices after already seeing the data. Which rows to include, which time window, which denominator, which average, where the axis starts: each individual choice has a justification someone could say out loud in a meeting, even when the combination of choices is misleading.

## The fix is about twenty lines of code

Sai's proposed antidote is straightforward: run every defensible version of the analysis and plot all of them together rather than picking one. When you do that with this dataset, the versions that ignore selection scatter across both sides of zero, while the versions that account for it cluster tightly within a few hundred dollars of the true value. Once every analysis is visible at once, quoting only the most flattering one requires an explanation that wasn't needed before.

## Three questions for reading any chart

Sai closes with a practical checklist for anyone reading a data-backed claim, not just a nonprofit's own reporting: who is in each group and how did they get there, what happened to everyone who dropped out, and how many analyses were run before the one being shown. His underlying argument is that a number, on its own, is a claim about a procedure, what was measured, who was included, what was tried first, and that the procedure is usually the part that isn't shown alongside the result.

## Key takeaways

- A dataset with a known true effect can produce a wide range of "correct" results depending on which analytic choices are made.
- Selection bias, when participants aren't random, can flip an estimate's direction even when every calculation is technically valid.
- Running and plotting every defensible analysis, rather than one, exposes which results are outliers driven by choice rather than signal.
- Ask who is in each group, what happened to dropouts, and how many analyses preceded the one shown.
- A published number is a claim about a procedure, not just an outcome; the procedure is what deserves scrutiny.

## Who this is for

This video is for anyone who reads or produces data-driven claims, including nonprofit researchers, program evaluators, and Humanitarians AI fellows working with real-world datasets where selection effects are common.
