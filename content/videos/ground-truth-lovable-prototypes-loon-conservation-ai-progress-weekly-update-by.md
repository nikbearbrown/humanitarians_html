---
title: "Ground Truth & Lovable Prototypes: Loon Conservation AI Progress | Weekly Update by Komal"
seoTitle: "Loon Conservation AI: Ground Truth Before Model Code"
description: "A weekly update on the Madison Loon Conservation AI project covering CVAT annotation, labeling consistency, and a Lovable review prototype."
summary: "Liam narrates a weekly progress update on the Madison Loon Conservation AI project, covering why the team annotated ground truth before writing model code."
keywords: ["why annotate ground truth before training", "how to draw bounding boxes for objects", "cvat annotation consistency for wildlife detection", "madison loon conservation ai project update", "lovable prototype for computer vision review", "labeling rule for partially visible objects", "why is my object detector inconsistent", "how to build a wildlife detection dataset"]
generated: "article"
---

This weekly update tracks the Madison Loon Conservation AI project as it moves from setup into real annotation work. Liam narrates the recap, covering what team members Sai and Sara Joshi shipped this week: three repositories, an architecture document grounded in current research, and the first hand-drawn bounding boxes on drone footage of loons on open water.

## Ground truth before model code

The team made a deliberate choice about order: repositories first, then the architecture document, then hand-drawn labels, and only after that, model code. The reasoning is that a detector inherits whatever its training data believes about the world. Writing model code before the labeling standard is settled means training on data that may not reflect the rules you actually want the model to learn. So the project spent its first week on what looks like housekeeping, repository setup and documentation, precisely because that groundwork determines what the model can later be trusted to do.

## The small target problem

Drawing bounding boxes on loons floating on open water turns out to be harder than it sounds. The bird is a small, dark shape on a surface that keeps moving, and most of each frame is water, not bird. Every box is a person deciding exactly where the animal ends and the lake begins. At roughly 10 percent into the annotation work, the team is still at the point where the labeling standard is cheap to change. Every box drawn after that standard hardens gets drawn against a fixed rule; every box drawn before it may need to be redone. That is why the team is treating early annotation decisions as high-stakes even though the dataset is still small.

## Consistency rules in CVAT

Sara Joshi's annotation work in CVAT focused on consistency: how tightly a box should fit an object, how to handle loons that are partially hidden or only partly visible, and keeping those choices the same across the whole dataset. Inconsistent labels now produce a weaker model later, so the annotation standard is being written down as instructions another annotator could follow exactly, not left as an implicit judgment call.

## The Lovable prototype

Alongside annotation, the team is refining a researcher-facing prototype built in Lovable. The design question that came up repeatedly was whether researchers should see how the machine learning works underneath. The answer the team settled on is no. The workflow stays simple: upload an image, select what to detect, analyze it, and review the AI's results, with a human verification step before results are saved as structured research data. No trained model exists yet, and the team says that is the plan rather than a delay, since the prototype's workflow is being built to match the real computer vision pipeline once more drone imagery is available for training.

## Key takeaways

- The team locked repositories, an architecture document, and hand-drawn labels before writing any model code, because a detector inherits whatever its dataset believes.
- Small, partially visible targets like loons on open water make bounding-box consistency the hardest and most consequential early decision.
- Labeling rules are being written as explicit instructions another annotator could follow, since inconsistent labels now mean a weaker model later.
- The Lovable prototype deliberately hides the machine learning behind a simple upload, analyze, review, and save workflow for researchers.
- No model has been trained yet; the current work is building the dataset and prototype workflow needed once more drone imagery arrives.

## Who this is for

Anyone building a computer vision project from scratch, especially one with small or hard-to-see targets, will find a concrete example here of why annotation standards and dataset consistency come before model training, not after it.
