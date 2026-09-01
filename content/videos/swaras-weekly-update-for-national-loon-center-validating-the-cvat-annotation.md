---
title: "Swara's Weekly Update for National Loon Center: Validating the CVAT Annotation Workflow"
seoTitle: "CVAT Annotation Workflow for Wildlife Data"
description: "A Humanitarians AI Fellow validates CVAT as an annotation platform for loon drone footage, testing YOLOv7 labeling, HEIC conversion, and YOLO dataset export."
summary: "Before any loon drone footage arrives, this update walks through validating CVAT end to end as the annotation platform for the National Loon Center project."
keywords: ["cvat annotation workflow", "cvat segment anything yolov7", "heic to jpeg cvat conversion", "yolo dataset structure export", "wildlife drone footage annotation", "cvat project task label setup", "ai assisted image annotation tool", "national loon center computer vision"]
generated: "article"
---

Building a machine learning pipeline before the real data arrives sounds backwards, but it's actually the more disciplined order of operations. If the annotation workflow has gaps, unsupported file formats, or export structures that don't match what a training script expects, it's far better to find that out on placeholder images than on the drone footage a project has been waiting for.

## Why validation comes before training

This update centers on a simple but important distinction: the goal this week wasn't training a model, it was confirming that the entire annotation workflow functions end to end before real loon footage arrives. Since enough labeled footage doesn't exist yet, the priority was making sure that creating projects and tasks, configuring labels, and understanding how datasets import and export in CVAT all work as expected. That sequencing matters because a broken or misunderstood pipeline discovered after drone data comes in would cost far more time than catching the same issues now.

## Testing CVAT's built-in AI assistance

Part of the validation involved exploring the AI-assisted annotation models built directly into CVAT, including Segment Anything, YOLOv7, and TransT. Automatic annotation was tested specifically with the built-in YOLOv7 model, checking how its predictions map onto the project's own custom labels and evaluating whether a trained model could eventually speed up the labeling process. This is a meaningful distinction from manual annotation alone: if a general-purpose model's predictions align reasonably well with the labels a project needs, it can dramatically cut down the manual effort required once real footage starts coming in.

## The data path: building from scratch

CVAT supports two fundamentally different ways data can enter a project: importing a dataset that's already annotated, or uploading raw images and annotating them manually from the start. Because no labeled loon data exists yet, the path forward for now is the second one, uploading raw images and building out annotations from scratch. That's a more labor-intensive route, but it's the honest one given the current state of the data, and setting up that workflow correctly now means the annotation process can move quickly once footage is available.

## Technical fixes surfaced during testing

Real testing surfaced concrete, practical problems that documentation alone wouldn't have revealed. The sample images used for testing were HEIC files, a format CVAT could not parse directly, meaning they need to be converted to JPEG or PNG before they can be used in the platform. Working through the required YOLO dataset structure also clarified what a clean, training-ready export needs to contain, information that's essential for making sure the eventual annotated dataset can actually be used to train a custom YOLO model rather than getting stuck in an incompatible format.

## An honest verdict

Rather than overstate progress, the update is explicit about where things stand: no training has started because there isn't enough labeled data yet. What has been accomplished is validation of the annotation pipeline itself, a clear understanding of the tooling, and a mapped-out set of requirements and likely issues, all worked through before the drone footage arrives. That kind of groundwork, while less visible than a working model, is what prevents a project from stalling out once real data shows up and something in the pipeline turns out not to work.

## What comes next

The next steps are to finalize the annotation schema for labeling loons specifically, prepare a suitable sample wildlife dataset, begin creating annotations directly in CVAT, and establish a clean export process into a format usable for training a custom YOLO model. Anyone interested in contributing is invited to start by proposing the label schema for loons, a concrete and approachable way to get involved before the heavier annotation work begins.

## Key takeaways

- The priority this week was validating the CVAT annotation workflow end to end, not training a model, since there isn't enough labeled loon footage yet.
- CVAT's built-in AI models, including Segment Anything, YOLOv7, and TransT, were tested to see if their predictions could speed up manual labeling.
- Because no pre-labeled loon dataset exists, the project will build annotations from scratch by uploading raw images into CVAT.
- Testing revealed that HEIC image files need conversion to JPEG or PNG before CVAT can process them.
- Next steps include finalizing the loon label schema, preparing a sample wildlife dataset, and establishing a clean YOLO-compatible export.

## Who this is for

This update is aimed at anyone following computer vision or conservation-tech projects, and it's part of the work coming out of the Humanitarians AI Fellows program. Those interested in contributing can start by proposing a label schema for loons.
