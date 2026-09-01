---
title: "Mycroft's ECIS Ep. 3: Scaling to Three Models & Verifying AI Uncertainty"
seoTitle: "ECIS Ep. 3: Scaling to Three Models & Uncertainty"
description: "ECIS adds a third model, Qwen 2.5 14B, and builds input gating, uncertainty exclusion, and full provenance so every extracted signal can be audited later."
summary: "Anjana walks through adding a third model to the ECIS pipeline and building input gating, uncertainty exclusion, and full provenance so no extracted signal stays a black box."
keywords: ["ecis multi model pipeline", "qwen 2.5 14b earnings call", "ai uncertainty exclusion pipeline", "provenance tracking ai signals", "brier score model calibration", "triangulator multi model ai", "mycroft financial ai ecis", "input gating llm pipeline", "auditing ai black box", "calibration curves ai dashboard"]
generated: "article"
---

Adding a second AI model to a pipeline is a useful test of whether independent readings agree. Adding a third is a different problem entirely: more models means more signals, but it also means more noise, and more opportunities for one model's confident mistake to slip through unnoticed. Episode 3 of the ECIS project takes on that problem directly, and the fix has less to do with model choice and more to do with discipline.

## From two models to three

The previous episode had ECIS running two models, Llama and Mistral, side by side across 25 companies, reading every earnings call independently. This episode adds a third: Qwen 2.5 14B, a model roughly twice the size of the other two. It runs through the same pipeline, the same prompts, and the same self-consistency checks as the others, but produces more reliable unstructured output with fewer retries. Getting to three models required reworking the underlying architecture so that multi-model support is native rather than bolted on, with model identity flowing through the pipeline state and a triangulator weighing all three models' outputs independently.

## Gating noise before it becomes a false signal

More signals from more models is only useful if the noise gets filtered out before it pollutes the results. The pipeline now gates its own input: chunks of earnings call text that are empty, mostly boilerplate, or too short get rejected before any model even reads them. On the output side, any signal that falls below a minimum confidence threshold is logged for later review but excluded from the scorecard entirely. That distinction matters. The system tracks what it is uncertain about without letting that uncertainty quietly drag down its accuracy metrics, which is a very different approach from simply averaging every output together and hoping the noise cancels out.

## Full provenance for every signal

Every signal ECIS produces now stores exactly how it was produced: the system prompt, the few-shot examples retrieved, the temporal context from prior quarters, and the original chunk of text itself. The practical value of that record shows up months later. If a signal looks wrong after the fact, the exact conditions that produced it can be rebuilt and rerun, same model, same prompt, same answer, rather than guessing at what might have gone wrong. Nothing in the pipeline is a black box; every decision leaves a receipt that can be checked.

## A dashboard built for comparison

With three models now running in parallel, the dashboard shows all of them in one view: calibration curves overlaid on the same chart, Brier scores displayed side by side, and signal counts broken out per model. Filtering by ticker, by model, or by confidence range makes it possible to drill into any individual signal and see its full provenance. The result is a single screen that shows how three different models are reading the same market at the same moment, rather than three disconnected outputs that require separate review.

## Key takeaways

- ECIS now runs three models, Llama, Mistral, and Qwen 2.5 14B, with native multi-model support built into the pipeline architecture.
- Input gating rejects empty, boilerplate, or too-short chunks before any model processes them.
- Low-confidence signals are logged for audit but excluded from the accuracy scorecard, keeping uncertainty separate from performance metrics.
- Every signal stores full provenance, including the exact prompt, examples, and context that produced it, so it can be reproduced later.
- The dashboard overlays calibration curves and Brier scores for all three models, filterable by ticker, model, and confidence range.

## Try it yourself

The episode closes with a direct challenge: think about a process at work whose outputs you trust without ever checking why it is uncertain or being able to reproduce a specific result. Sketch out how you would log low-confidence outputs separately instead of silently averaging them in, define what full provenance would mean for that process, and be honest about whether the extra record-keeping is worth the overhead for how often you would actually need to look back. This project is part of the Mycroft Financial AI work within the Humanitarians AI Fellows program.
