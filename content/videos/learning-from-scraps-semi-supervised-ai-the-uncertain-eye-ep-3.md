---
title: "Learning from Scraps: Semi-Supervised AI | The Uncertain Eye Ep. 3"
seoTitle: "Semi-Supervised AI for Glaucoma Detection Explained"
description: "Varun explains how a glaucoma detector trained on only 350 labeled OCT scans using semi-supervised learning and a pseudo-supervisor network."
summary: "Varun walks through how a glaucoma classifier trained on just 350 labeled scans reached 0.85 AUROC using semi-supervised learning and a pseudo-supervisor architecture."
keywords: ["train a model with few labeled examples", "what is semi-supervised learning in medical ai", "pseudo-supervisor network for glaucoma detection", "efficientnet v2s for oct scan classification", "why auroc instead of accuracy for diagnosis", "how does semi-supervised learning work", "why raw accuracy is misleading in diagnosis", "training a classifier on unlabeled medical scans"]
generated: "article"
---

Varun explains how his team built a glaucoma classifier from a dataset most people would consider too small to work with: 350 labeled OCT scans, plus a much larger pool of unlabeled ones. The video walks through why semi-supervised learning made that possible and how the team measured whether the result was actually useful.

## The constraint: 350 labeled scans

Most AI results people hear about are trained on mountains of labeled data. This project did not have one. Out of the available patient scans, only 350 had confirmed answers, glaucoma or not. The rest were unlabeled, and glaucoma is a disease that can hide in the data, making the labeled set even more precious. The team's response was not to shrink the ambition of the model, but to build a system that could learn from the unlabeled scans as well as the labeled ones.

## What semi-supervised learning does differently

A fully supervised model only learns from answered questions, the scans where a human has already confirmed a diagnosis. A semi-supervised model uses those few answers as anchors, then studies the shape of the entire unlabeled dataset: how scans cluster, which patterns repeat, and bootstraps understanding from that structure. Varun compares it to a student given ten worked problems and a thousand blank ones, who mines the blank problems for patterns instead of ignoring them because they lack answers.

## The pseudo-supervisor architecture

The specific engine behind this is a pseudo-supervisor design. One network learns to detect glaucoma directly. A second network learns to generate training signals from the unlabeled scans, effectively teaching the first network what to pay attention to in data that has no ground-truth label. The two networks improve each other. Sitting on top of this pair is EfficientNet-V2S, a modern vision network, reading the OCT scan itself.

## Why accuracy is the wrong metric

Raw accuracy is misleading in a dataset like this one. If most patients in the data are healthy, a model that predicts "healthy" every single time will score high on accuracy while catching no actual disease. Instead, the team used AUROC: take a random healthy eye and a random diseased eye, and ask how often the model correctly ranks the diseased one as riskier. A score of 0.5 is a coin flip; 1.0 is perfect. The classifier reached about 0.85 AUROC on patients it had never seen, a result Varun describes as specialist-adjacent, built from a fraction of the labeled data a fully supervised approach would need.

## What the single number was hiding

The model outputs a single probability per eye, and in that number the team noticed something worth paying attention to: the model was not just stating its answer, it was implicitly signaling how much to trust that answer. That observation is set up as the thread the next episode in the series picks up.

## Key takeaways

- The team trained a glaucoma classifier using only 350 labeled OCT scans out of a much larger patient pool.
- Semi-supervised learning uses the few labeled examples as anchors and learns additional structure from unlabeled data by studying how scans cluster.
- The pseudo-supervisor architecture pairs a detection network with a second network that generates training signals from unlabeled scans, running on EfficientNet-V2S.
- Raw accuracy is misleading on imbalanced medical data; AUROC measures whether the model correctly ranks a diseased case as riskier than a healthy one.
- The classifier reached about 0.85 AUROC, a specialist-adjacent result built from a small fraction of the labeled data a fully supervised model would require.

## Who this is for

Anyone working with a medical imaging dataset that has far more unlabeled examples than labeled ones, or anyone trying to understand why accuracy is a poor metric for imbalanced diagnostic data, will get a concrete worked example here.
