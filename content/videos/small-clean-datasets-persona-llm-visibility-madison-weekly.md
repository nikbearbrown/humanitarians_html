---
title: "Small, Clean Datasets & Persona LLM Visibility | Madison Weekly"
seoTitle: "Small Clean Datasets & Persona LLM Visibility"
description: "Komal's weekly update on a 136-image loon dataset, why scale variance splits it into two problems, and a new persona-based LLM visibility study."
summary: "Komal reviews a completed 136-image hand-annotated loon dataset, explains why extreme scale variance in the bounding boxes creates two distinct detection problems, and previews a new persona-based LLM brand visibility study."
keywords: ["how many images needed to train yolo model", "why run yolo on a small dataset first", "hand annotated bounding box dataset quality check", "bounding box scale variance computer vision problem", "persona based llm brand visibility study", "jungian brand archetype diagnostic tool", "how to test dataset labeling before training", "llm visibility score hides target segment"]
generated: "article"
---

Komal gives the weekly Madison update on two parallel workstreams: finishing a hand-annotated bird dataset for a conservation computer vision project, and designing a new way to measure how visible a brand is to specific customer personas rather than to a generic average user.

## Closing the annotation set

The team closed out an annotation set of 136 quality-checked loon images this week, with every bounding box drawn by hand. The images come from a mix of sources, frames pulled from the web, shore-based shots, and drone footage over water, all labeled under a single class: common loon. Nothing in the set was labeled and then discarded; quality control ran before the boxes were finalized, not after.

## Why the scale range is really two problems

Looking across the 136 images reveals a wide range in how much of the frame the bird actually occupies. In close-up shots, the bird fills a large portion of the picture and details like the collar, the beak, and the red eye are clearly visible. In distant shots over open water, the same bird is reduced to a dark smudge only a few pixels wide, and the water's motion and glare add noise on top of that. Komal's point is that these aren't the same detection problem with different difficulty levels, they're two distinct problems being trained under one label.

## Why the team is training now instead of waiting

With only 136 images, there's a natural pull to keep annotating until the dataset is larger before running any model. The team's call is to run a first YOLO model now anyway, not because 136 images is enough to produce a strong detector, but because the first run is a test of the pipeline itself: label formatting, parsing, class mapping, whether loss actually moves during training. Catching a plumbing problem now, while the dataset is still small and clean, is far cheaper than catching it after a thousand more boxes have been added on top of a broken pipeline.

## The persona visibility study

Alongside the imaging work, the team opened a second research thread: a persona-based LLM visibility study. The question isn't only which brands an AI model recommends, but who it recommends them to. A brand can score well in a general visibility measure and still be effectively invisible to a specific segment that matters to it, such as students, developers, creative professionals, or enterprise buyers. This week's work was research design; prompt sets and an evaluation prototype come next.

## A rigor-first brand archetype tool

The team also sketched a plan for a brand archetype diagnostic based on Jungian archetype theory. Most existing tools in this space ask a founder for a handful of adjectives and return a label, which Komal flags as the core gap: there's no rigor behind the output. The plan instead is to score a brand's actual language, return both a primary and secondary archetype with the tension between them named explicitly, and finish with practical guidance on voice pillars and the common trap associated with that archetype. Before building anything further, the plan calls for validating the approach by hand against a few real brands first.

## Key takeaways

- The team completed a 136-image hand-annotated loon dataset with quality control applied before finalizing the boxes, not after.
- Extreme scale variance between close-up and distant frames means the dataset is really training two distinct detection problems under one class label.
- Running a first YOLO model on a small, clean dataset is a deliberate test of the labeling and training pipeline, not an attempt to produce a strong detector yet.
- A new persona-based LLM visibility study aims to measure whether a brand is visible to specific customer segments, not just in a general average score.
- The planned brand archetype diagnostic scores actual brand language rather than adjectives, and will be validated by hand before any further build.

## Who this is for

This is for people following the Madison project's computer vision and brand research work, and for anyone building a small labeled dataset or a brand visibility evaluation who wants a concrete example of testing infrastructure before scaling up.
