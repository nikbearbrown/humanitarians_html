---
title: "Build the Door First: Centralizing and Ingesting Clean Training Data by Nikhil"
seoTitle: "Building a Clean Training Data Intake Pipeline"
description: "A weekly HAI fellow update on building a centralized image repository and a mechanical quality script before training any model."
summary: "This fellow update walks through building a centralized image repository, a script that screens for sharpness, size, and exact duplicates, and a mocked-up human-in-the-loop review app before any model gets built."
keywords: ["how to build a training data ingestion pipeline", "centralized image repository for machine learning", "detect blurry or duplicate images before training", "human in the loop review for training data", "why build data pipeline before the model", "script to check image sharpness and size", "exact duplicate detection vs near duplicate images", "lovable app mockup for dataset review workflow"]
generated: "article"
---

This weekly fellow update covers three things built for a bird-image training dataset: a centralized repository, a script that screens images before they can become training data, and a mockup of the review app all of it feeds into. The premise is direct: the model is not the hard part yet, someone first has to decide which images are allowed to become training data and write that decision down.

## Why centralizing the images comes first

Every image now lives in one place with one known shape, which sounds like housekeeping but is not. A dataset scattered across laptops and shared drives has no answer to the question that matters later: which images did we actually train on. Without a single known location, that question becomes unanswerable after the fact, which is why this comes before any modeling work.

## Guarding the door with a quality script

The first half of the screening script asks two mechanical questions about each image: is it sharp enough, not smeared by drone motion, and is it big enough, shot close enough that the subject is more than a few gray pixels. These are simple, checkable criteria applied automatically before an image is even considered for the dataset.

## Catching duplicates, exact and near

The second half of the script compares files to catch duplicates, but today it only compares the file itself. That catches the common case of the same file uploaded twice. It does not catch two frames from one burst, or the same subject photographed again on a second pass. The presenter is explicit about this limit: identical files are caught, nearly identical pictures are not caught yet, and that near-duplicate problem is flagged as next week's harder half.

## Mocking up the human-in-the-loop review app

The third piece is a mockup, built in Lovable this week, of the app all of this data feeds into. It is described as a demo for the team itself, not a build. The promise on the front page of the mock is that every detection gets reviewed by a researcher before it becomes data, with a flow of analyze, review, then dataset. Every figure on the mocked screens is a placeholder Lovable filled in and none of it is measured yet. What is real is the shape of the flow: nothing reaches the dataset without passing a person first.

## Key takeaways

- Centralizing images in one known location is what makes it possible to answer which images were actually trained on later.
- A screening script checks two mechanical properties, sharpness and size, before an image can enter the pipeline.
- Exact duplicate detection by comparing files is working now; near-duplicate detection, like burst frames, is not built yet.
- The review app mockup establishes the intended flow, analyze then review then dataset, before any of its numbers are real.
- The stated order is deliberate: build the data intake and review process before building the model.

## Who this is for

This is for teams building a machine learning training dataset who want a concrete example of screening and review infrastructure built before, not after, model development starts.
