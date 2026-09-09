---
title: "Transitioning from Raw Images to Structured Labeled Data in Loon Conservation"
seoTitle: "Loon Conservation AI: From Raw Images to Labeled Data"
description: "Swara Joshi covers finishing CVAT annotation on all loon images and why a small dataset shouldn't be trained too early."
summary: "A weekly update on the Loon Conservation AI project covering the completion of CVAT image annotation and why the team is holding off on training a detection model until the dataset grows."
keywords: ["how to annotate images in cvat", "when to start training a detection model", "loon conservation ai project update", "cvat image annotation for conservation", "why small datasets shouldn't be trained early", "building a researcher upload verification interface", "raw images to labeled dataset workflow", "national loon center feedback on ai tool"]
generated: "article"
---

Swara Joshi gives a weekly update on the Loon Conservation AI project, where two tracks, the annotated dataset and the researcher-facing prototype, are converging toward the same system. The headline milestone is finishing CVAT annotation on every image currently available, which moves the project from raw footage to a structured, labeled dataset.

## Finishing annotation in CVAT

Joshi and a collaborator, Nikhil, completed labeling every image the team currently has access to in CVAT, the annotation tool used to mark loons in the footage. The work meant handling real inconsistencies across the images: differences in object size, visibility, image quality, framing, lighting, reflections, and environmental conditions. Each of these has to be treated consistently, because consistency across the dataset matters more as the dataset grows. The stated pipeline is simple: raw images go through annotation, become a labeled dataset, and eventually feed model training and detection. Finishing this round of annotation is what pushes the project past the raw-image stage into having real structured data, which is the prerequisite for any training work.

## Why the team isn't training a model yet

Finishing annotation naturally raises the question of whether it's time to start training a detection model. Joshi's answer is not yet. The dataset is still relatively small, and the plan is to keep annotating and building before attempting any training or evaluation. The reasoning is direct: a weak model trained too early would tell the team less than having no model at all. Rather than rush to a first training run, the strategy is to wait until there is enough loon-specific data to make that first attempt meaningful.

## Prototyping the researcher-facing interface

In parallel with the annotation work, Joshi kept refining a prototype aimed at the researchers who will eventually use the tool. The prototype isn't wired to a real computer vision model yet, but it simulates how footage uploads, metadata, detections, observations, and verification will connect once the system is live. Even without a working model behind it, the prototype is already useful for identifying where the researcher experience needs to change before the real detection pipeline is built.

## What comes next

The next phase depends on two things happening together: more footage being sourced and gathered, and feedback from the National Loon Center and Nikhil shaping the front end. Once there is enough loon-specific data, the plan calls for experimenting with detection and counting. Joshi frames the current state honestly: there's no trained model yet, and the dataset is still relatively small, but completing annotation on every currently available image is a genuine milestone that moves the project from raw images to structured, labeled data.

## Key takeaways

- Every currently available image has been fully annotated in CVAT, completing the shift from raw images to a structured labeled dataset.
- Consistency in handling variation, size, visibility, lighting, framing, reflections, is treated as essential groundwork before training.
- The team is deliberately not training a detection model yet because the dataset is still too small to produce a useful result.
- A researcher-facing prototype is being refined in parallel, simulating the upload, detection, and verification workflow even without a live model.
- Progress depends on sourcing more footage and incorporating feedback from the National Loon Center before moving to detection and counting experiments.

## Who this is for

This update is for anyone following the Loon Conservation AI project, or for conservation and citizen-science teams building their own image-based monitoring tools who want a concrete example of sequencing annotation, prototyping, and training decisions.
