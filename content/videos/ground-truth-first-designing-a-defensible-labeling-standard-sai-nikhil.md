---
title: "Ground Truth First: Designing a Defensible Labeling Standard | Sai Nikhil"
seoTitle: "Ground Truth First: A Defensible Labeling Standard"
description: "Sai explains why a loon detector's data labeling rules must be written before any model code, and what makes a bounding box defensible."
summary: "Sai walks through a week-one loon detector update showing why labeling rules, written down and reproducible, must come before model code or the dataset's bias becomes the model's bias."
keywords: ["how to write labeling rules for object detection", "why write annotation guidelines before training a model", "how to draw bounding boxes for small moving targets", "dataset bias in wildlife detector training", "reproducible image labeling standard example", "loon detector ground truth annotation", "manual bounding box annotation challenges", "labeling rules not reproducible problem"]
generated: "article"
---

Before writing any model code, Sai spent the first week of a loon detection project building the foundation that decides whether the model can be trusted later: the ground truth. The video walks through why detector accuracy is really a question about labeling discipline, not architecture, and what it looks like to write annotation rules someone else could follow.

## Why the data comes before the model

A detector learns whatever its training data implies, including its mistakes. If the bounding boxes are inconsistent, the model absorbs that inconsistency as if it were signal. Sai's argument is that the order of work should be: gather the footage, decide the architecture and write down why, then start labeling, and only after that write model code. Writing model code first skips the step where most of the eventual errors get introduced.

## The hidden difficulty of a bounding box

Drawing a box around a loon on open water sounds simple until you try it. The bird is a small, dark shape on a surface that never stops moving, and most of any given frame is water, not bird. Every box is really a person making a judgment call about exactly where the animal ends and the background begins. Sai points out that this decision, repeated across thousands of images, is where a labeling standard either holds up or falls apart.

## Why the standard has to be written early

The project was described as roughly 10 percent through its annotation work at the time of recording, which sounds small, but that is the moment the labeling standard is still cheap to change. Once a set of rules hardens and more images get labeled against it, every earlier box that does not match the new rule becomes a box that may need to be redrawn. Fixing the standard after the fact is expensive in a way that writing it down early is not.

## What a defensible label actually requires

A model whose architecture nobody can explain is a model nobody can defend when someone asks a hard question about it later. Sai treats the architecture choice and the labeling standard the same way: both are being written down as they are decided, not reconstructed afterward. This is what makes the eventual detector auditable rather than a black box that happened to produce reasonable-looking output.

## The 100-image test

The video ends with a direct challenge for anyone currently annotating data: stop after the next 100 images and write the labeling rule down as instructions another person could follow. That means specifying what counts as one instance of the target object, what to do with a subject that is half hidden, and where the box edge goes when the subject blurs into its background. Then look at those rules and ask which ones you would regret having written that way.

## Key takeaways

- A detector inherits the bias and inconsistency baked into its training labels, so the labeling standard matters more than the model architecture.
- Labeling rules are cheap to change early in a project and expensive to change after many images have already been annotated against them.
- A defensible label is one where the rule for edge cases, like a half-hidden or blurry subject, is written down before it is needed.
- Writing down why an architecture was chosen, not just what was chosen, is what makes a model explainable later.
- A useful test for any annotation effort is to stop every 100 images and write the current rule as instructions someone else could follow.

## Who this is for

Anyone building a computer vision dataset, supervising annotators, or starting a detection project who wants to avoid discovering labeling inconsistencies after the model has already been trained on them.
