---
title: "The Trap in the Data: Finding and Fixing Data Leakage | The Uncertain Eye Ep. 7"
seoTitle: "Finding Data Leakage in Medical AI: Uncertain Eye Ep. 7"
description: "Varun explains how a glaucoma AI model was accidentally trained on data that leaked its own answer key, and what happened when the shortcut was removed."
summary: "Varun describes discovering that a glaucoma model's near-perfect score came from data leakage, since the ground truth label was itself derived from a test the model was given as input, and what its real performance looked like once the shortcut was removed."
keywords: ["what is data leakage in machine learning", "how to detect data leakage in ai", "glaucoma structural vs functional test difference", "why does my model score too well", "how to fix data leakage in training", "the uncertain eye glaucoma ai series", "oct scan versus visual field test glaucoma", "why medical ai results look too good"]
generated: "article"
---

Varun explains a data leakage problem that quietly wrecked an earlier version of the glaucoma-detection project in this episode of The Uncertain Eye, and walks through how the team found it and what the model's honest performance looked like once it was fixed.

## The trap: an answer key hidden in the input

Glaucoma is confirmed with two different kinds of tests: structural ones, like an OCT scan of the eye's tissue, and functional ones, like a visual field exam that measures what a patient can actually see. The team discovered that in their dataset, the ground truth label used to say "glaucoma or not" was itself derived from the visual field test. Structure and function are related measurements, but they are not the same thing, and treating the label as independent of the input data was the mistake.

## The perfect score that meant nothing

To test this, the team trained a simple model on the visual field data alone, and it scored almost perfectly. Varun is direct about why: not because the model understood glaucoma, but because it had effectively been handed the very measurement the label was computed from. In machine learning terms, this is data leakage, when information about the answer sneaks into the input and a high score stops meaning what it appears to mean.

## What that meant for the reasoning agents

This discovery reframed the rest of the project. The reasoning agents in the system had also been given the visual field data as input, so part of what looked like impressive, careful deliberation on their part wasn't reasoning at all. It was the same leakage, just harder to spot because it was buried inside a more complex system.

## Stripping the shortcut and rerunning on structure alone

To test the honest version of the question, whether a machine can reason about glaucoma from structure alone, the team stripped the visual field data away and reran the agents on the OCT scan only. Their performance dropped toward chance. Varun calls this a hard result to sit with, but treats finding it as exactly what makes the rest of the project's results trustworthy going forward. The genuinely hard problem, predicting the diagnosis from nerve structure independent of the signal that defined the label in the first place, was left standing unsolved, but now honestly so.

## Key takeaways

- The dataset's ground truth glaucoma label was derived from the visual field test, which had also been given to the model as an input feature.
- A model trained on visual field data alone scored almost perfectly, not from understanding glaucoma but from reading the same data the label was computed from.
- This is a textbook case of data leakage: information about the answer sneaking into the model's input, making the score meaningless as a measure of real understanding.
- The reasoning agents in the broader system had also been given the leaked feature, meaning part of their apparent performance was leakage rather than reasoning.
- Retesting on OCT structural data alone, with the leaked feature removed, dropped performance toward chance, leaving the real research question open and honestly stated.

## Who this is for

Viewers following The Uncertain Eye series on AI-assisted glaucoma detection, and anyone building or evaluating medical machine learning models who wants a concrete example of how data leakage produces misleadingly high scores and how to catch it before publication.
