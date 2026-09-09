---
title: "Every Box Checked: Closing the Promise on Ground-Truth Data | Nikhil"
seoTitle: "Finishing loon annotation before training YOLO"
description: "Sai Nikhil finishes hand-annotating 136 quality-checked loon images and explains why extreme scale variance makes it two problems, not one."
summary: "Sai Nikhil completes hand annotation of 136 quality-checked common loon images across web, shore, and drone frames, and explains why the extreme size range between close birds and distant smudges means the dataset should be treated as two problems and tested with a small first training run."
keywords: ["how to annotate a small object detection dataset", "why train small and clean before scaling a dataset", "yolo dataset scale variance large and small objects", "common loon detection dataset annotation", "quality check before labeling images", "how to test dataset plumbing before full training", "sorting bounding boxes by area to check dataset", "annotating drone and shore imagery for bird detection"]
generated: "article"
---

Sai Nikhil closes out a promise from the previous week: every image that passed quality control has now been annotated, roughly 136 of them, one class, common loon, with every box drawn by hand. That set is ready for the first YOLO training run, and 136 is deliberately a small number, because each image had to clear a quality check before it was allowed to count.

## What's actually in the dataset

The frames come from three sources: pulled off the web, shot from shore on a Nikon, and flown over open water by drone, all carrying one label across the entire set, common loon. The order this week matters: the quality check ran first, and only images that cleared it got annotated. Nothing was labeled that was going to be thrown away later, which keeps annotation effort from being wasted on frames that would never make it into training.

## Why extreme scale variance is really two problems

Looking at the range of what got labeled reveals the central challenge. In some frames, the bird fills half the picture. In others, the box is smaller than its own caption, a dark smudge a few pixels across on open water, carrying the same label. The same model has to find both. That is described as not one detection problem but two wearing one name. Close in, the bird is unmistakable, with the collar, the beak, and the red eye providing hundreds of pixels of evidence. Far out, all of that detail is gone, and what remains sits on water that moves and glints, offering almost nothing for the model to grab onto. The near frames will make an early model look good; the far frames are where it actually gets judged.

## Train now, or keep annotating

With only 136 frames, there is a natural pull to wait until the set is larger before running anything. The reasoning against waiting is that the first training run is not really a test of the detector's accuracy. It is a test of the plumbing, whether the labels parse, whether the class mapping is correct, whether the loss actually moves during training. It is better to catch a plumbing problem now, while there are 136 boxes to fix, than after a thousand more have been added on top of a broken pipeline.

## Where the dataset stands

By the end of this update, every quality-checked image has been hand-annotated, about 136 of them, one class, ready for the next YOLO iteration. Nothing has been trained yet. The set is small and clean, and small and clean is described as the only version of this dataset that can still be fixed cheaply, before scale makes correcting a plumbing or labeling problem far more expensive.

## A diagnostic worth running on any dataset

The practical exercise offered is to take a labeled set sitting ready to train and, before training it, open the label file and sort every box by area. Look at the smallest tenth and the largest tenth. If those two groups do not look like the same problem, meaning the visual evidence available to detect them is fundamentally different, the dataset isn't one problem, it's two, and a single average accuracy score will hide whichever of the two groups is actually failing.

## Key takeaways

- 136 images were hand-annotated with one class label (common loon) after passing a quality check that ran before annotation, not after.
- Frames came from three sources: web images, shore photography, and drone footage over open water.
- The dataset spans an extreme size range, from birds filling half the frame to pixel-sized smudges, which functions as two distinct detection problems under one label.
- The first training run is meant to test the pipeline (label parsing, class mapping, loss movement), not final model accuracy.
- Sorting bounding boxes by area and comparing the smallest and largest tenths reveals whether a dataset is secretly two problems hiding behind one average score.

## Who this is for

Anyone building an object detection dataset, particularly for wildlife or small-object detection, who wants a practical process for validating dataset quality and scale variance before committing to a large-scale training run.
