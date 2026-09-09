---
title: "The Honest Machine: Building Medical AI to Trust | The Uncertain Eye Ep. 8"
seoTitle: "Honest Medical AI Evaluation: Uncertain Eye Ep. 8"
description: "Varun rebuilds a glaucoma detection model with strict patient splits and honest confidence intervals, then tests whether hand-computed features actually help."
summary: "Varun explains how rebuilding the evaluation with strict patient splits and confidence intervals produced a trustworthy 0.86 AUROC glaucoma model and why hand-computed features added nothing."
keywords: ["how to prevent testing bias in ai", "why use confidence intervals not accuracy scores", "strict patient splits machine learning evaluation", "oct scan glaucoma detection ai model", "do hand-computed features improve neural networks", "the uncertain eye glaucoma research series", "how reliable is 0.86 auroc glaucoma classifier", "why medical ai results seem too good"]
generated: "article"
---

Varun presents the rebuilt version of a glaucoma-detection system in this episode of The Uncertain Eye, after catching a flaw in the earlier evaluation. The fix wasn't a smarter model. It was a stricter, more honest way of testing the one they already had.

## Why the evaluation had to be rebuilt

The team had previously caught their own testing trap, so they rebuilt the whole evaluation pipeline slower and stricter. The core change was keeping training and held-out test data cleanly separated by patient, so no patient's scans could leak between the two sets. That single change closes off a common way medical AI results look better in testing than they turn out to be in practice.

## Confidence intervals instead of a single lucky number

Rather than reporting one accuracy figure, the rebuilt system reports a confidence interval, a range that shows how much the result would shift if the evaluation were run again. Varun frames this as replacing a single lucky number with an honesty band attached to every result. Their clean OCT-only classifier lands around 0.86 AUROC with that band attached, a number they present as one that can actually be trusted, rather than one that happened to look good once.

## Testing whether hand-computed features actually help

The team also tested a common shortcut: fusing the raw OCT image with hand-computed structural measurements, the kind of numeric features a specialist might calculate directly from a scan. The result was that these engineered features added almost nothing. The network had already learned that structural information directly from the image itself. Varun calls this a quietly important result: knowing that a technique doesn't help is real progress too, not a wasted experiment.

## The open frontier: reasoning models on hard cases

The next test is still running. The team is checking whether today's most capable reasoning models, given only the honest structural signal, can deliberate over the hard cases the way a specialist would and explain every call. Varun is direct that there's no final answer yet, and frames that openness as what ongoing research actually looks like, a careful climb rather than a triumphant reveal.

## The vision: a tireless first reader

The episode closes with the goal this rebuild is aimed at. A patient gets a quick, cheap OCT scan anywhere. A fast model clears the easy cases and flags the uncertain ones. The flagged cases go to a reasoning model that lays out the evidence, then to a human specialist with the case already worked up. The machine isn't positioned as the doctor. It's framed as a tireless first reader that never gets bored, never skips a scan, and knows the edge of its own knowledge, buying back time against a disease Varun calls a silent thief.

## Key takeaways

- Splitting training and test data strictly by patient prevents a common source of inflated results in medical AI evaluation.
- Reporting a confidence interval instead of a single accuracy number shows how much a result would wobble on a repeat run.
- The rebuilt OCT-only glaucoma classifier reaches about 0.86 AUROC with that honesty band attached.
- Adding hand-computed structural features on top of the image did not improve performance, since the network had already learned that information.
- The next open question is whether reasoning models can deliberate over hard cases and explain their calls, and that test is still in progress.

## Who this is for

Viewers following The Uncertain Eye series on AI-assisted glaucoma detection, and anyone interested in how rigorous evaluation practices, like patient-level splits and confidence intervals, separate trustworthy medical AI results from ones that only look good once.
