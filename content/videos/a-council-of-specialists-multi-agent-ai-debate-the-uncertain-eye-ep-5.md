---
title: "A Council of Specialists: Multi-Agent AI Debate | The Uncertain Eye Ep. 5"
seoTitle: "Multi-Agent AI Debate for Hard Eye Cases"
description: "Varun explains how a three-agent AI council debates ambiguous eye scans over three rounds to catch blind spots a single model misses."
summary: "Varun walks through building a three-agent vision language model council that debates uncertain eye scans over three rounds before reaching a verdict."
keywords: ["how to build a multi-agent ai council", "vision language model vs image classifier", "why do ai models disagree on medical scans", "multi-agent debate for uncertain classifier cases", "structural and functional specialist ai agents", "how does a director agent resolve ai disagreement", "ai classifier flags uncertain eye scan cases", "three round critique for medical ai diagnosis"]
generated: "article"
---

Varun introduces a different way to handle the eye scans a standard classifier could not confidently call. Instead of building a bigger, more powerful classifier, his team built a conversation: three AI specialists that look at the same scan, argue about what they see, and reach a joint verdict.

## Why a single classifier was not enough

A plain image classifier turns a scan into a list of numbers. It can be accurate, but it cannot explain its reasoning, and a number without a reason is hard to trust or audit in a medical setting. For the cases the classifier flagged as uncertain, Varun's team wanted something that could reason in words the way a clinician does, not just output a probability.

## Vision language models as the building block

The shift starts with a different kind of model: a vision language model, trained on images and text together. Rather than producing a silent score, it can look at a scan, read the relevant measurements, and describe its reasoning in language. That difference matters most exactly where a plain classifier struggles, because a written rationale can be checked and challenged in a way a bare number cannot.

## Building the three-agent council

Instead of relying on one vision language model, the team built three, each with a distinct role. A structural specialist reads the OCT nerve map. A functional specialist reads the visual field test. A director weighs both of their reads and delivers the final call. This mirrors how difficult medical decisions get made in practice: a tumor board, a panel, specialists challenging each other until a clearer picture emerges.

## How the three-round critique works

The council does not just vote once. Each specialist gives its initial read, then sees what the others concluded, reconsiders its own position, and revises before the director makes the final decision. This structure forces disagreement into the open. A single model has one blind spot and no way to notice it; three models with different areas of focus have to make their disagreement explicit before they can resolve it, and that is where errors a lone model would sail past get caught.

## Early results, and why they got nervous

The team ran the council specifically on the flagged uncertain cases, the exact eyes the original classifier could not confidently call. The early results were striking, genuinely and excitingly so. Varun frames that as the moment to get nervous rather than celebrate, since in research a result that looks too good is often the signal to start hunting for what was missed. The team was proud enough of the approach to submit it for peer review, and Varun notes that submission is where an expert reviewer asked a question the team had not considered, setting up the next episode.

## Key takeaways

- A vision language model can explain its reasoning in words, unlike a plain classifier that only outputs a score.
- The council splits diagnostic work by specialty: a structural reader, a functional reader, and a director who weighs both.
- Three rounds of critique force each specialist to reconsider its read after seeing the others' opinions.
- Multi-agent critique catches errors a single model has no way to see on its own.
- A striking early result is a prompt to look harder for what might be wrong, not a reason to stop checking.

## Who this is for

This is for people building or evaluating AI systems for high-stakes decisions, especially in medical imaging, who want a concrete example of multi-agent design that goes beyond a single model's blind spots.
