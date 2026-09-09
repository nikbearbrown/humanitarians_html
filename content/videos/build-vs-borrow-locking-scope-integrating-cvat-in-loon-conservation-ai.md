---
title: "Build vs. Borrow: Locking Scope & Integrating CVAT in Loon Conservation AI"
seoTitle: "Build vs. Borrow: Choosing CVAT for Wildlife AI"
description: "A Madison weekly update on choosing the open-source CVAT annotator over a custom-built tool, and the three-week plan that follows the decision."
summary: "Liam recaps the Madison wildlife-monitoring team's decision to adopt the open-source CVAT annotator instead of building one from scratch, plus the resulting three-week build plan and a second track on brand frameworks."
keywords: ["how to decide build vs borrow for a software project", "cvat open source annotation tool for wildlife images", "why use an existing annotator instead of building one", "free licensed image provenance for training data", "wildlife conservation ai model development roadmap", "avoiding ego projects that duplicate solved tools", "three week software build plan example", "brand framework options mbti jungian archetypes maslow"]
generated: "article"
---

Liam, filling in for Komal, gives a weekly progress update on the Madison wildlife-monitoring project, walking through a scope decision the team made and what it unlocks for the next three weeks.

## Locking scope before building

The team's first move this week was finalizing project scope and turning it into milestones, then sending that plan to supervisor Nenina so everyone works from the same map before the build accelerates. Before the timeline could stick, one alignment question had to be answered: build an end-to-end annotation and detection tool from scratch, or use an existing annotator and put limited developer hours into the machine learning models and workflow gaps instead.

## Why CVAT won the build-versus-borrow call

The team chose to borrow. Open-source annotation tooling already does the job well, so CVAT was slotted in to own annotation, freeing the development team to focus on the machine learning models and the parts of the workflow that do not already have a strong open-source answer. The reasoning is explicit: building an entire platform from scratch is not the best use of limited hands right now. This is a build-versus-borrow decision made on the basis of where the team's time actually adds value, not on preference for owning every layer of the stack.

## The three-week plan that follows

With CVAT settled, the near-term plan takes shape in three stages. Week one produces a working demo, a GitHub repo, and a confirmed technical stack. Week two produces a scalable project structure captured in a design document. Week three delivers the first core feature, most likely frame extraction or frame annotation. The plan only hardens because the scope question got answered first, the milestones are downstream of the build-versus-borrow decision, not parallel to it.

## Image provenance, not just image volume

In parallel with the technical build, the team keeps collecting free-licensed images to train the model, but the video is careful to separate "free" from "free to train on." Provenance still matters: an image being freely available does not automatically mean it comes with a trail that supports using it for model training, so gathering images is treated as its own tracked task rather than an assumed given.

## A second track: brand frameworks

Separately from the wildlife-detection build, Komal is drafting framework options for marketing and brand tools under Madison, options named include Jungian archetypes, Big Five, MBTI, Enneagram, VALS, Maslow's hierarchy, Aaker's brand model, StoryBrand, and jobs-to-be-done. The next Madison meeting will pick a direction, after which a detailed feature plan gets written. This track is explicitly separate from the CVAT decision, run in parallel rather than in sequence.

## Key takeaways

- The team chose to use CVAT for annotation rather than build a custom annotator, to protect limited developer hours for the harder, unsolved parts of the workflow.
- The three-week plan is: week one a demo and confirmed stack, week two a scalable design document, week three the first core feature.
- Free-licensed images are being collected, but provenance is tracked separately from availability.
- A second, parallel track is evaluating brand frameworks (MBTI, Jungian archetypes, Maslow, and others) for Madison's marketing tools.
- The stated design judgment is to avoid rebuilding a tool that an existing open-source project already solves well.

## Who this is for

Anyone running a small technical team who needs a concrete example of how to frame a build-versus-borrow decision, and Madison project followers tracking the wildlife-monitoring build's weekly status.
