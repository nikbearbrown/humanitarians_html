---
title: "Fast Radio Bursts: Real-Time Sky Triage"
seoTitle: "Fast Radio Bursts: How CHIME Triages Data Live"
description: "Om Mali explains how a real-time neural network triages CHIME telescope data, deciding in about 20 seconds what to keep and what interference to delete forever."
summary: "A real-time neural network gives the CHIME telescope about 20 seconds to decide which fast radio burst candidates are real and which are Earth interference, before the raw data is gone."
keywords: ["fast radio burst detection ai", "chime telescope data pipeline", "real time neural network astronomy", "dispersion curve fast radio burst", "radio telescope interference filtering", "chime petabytes per day", "simulated bursts neural network training", "ring buffer real time triage", "fast radio burst false positive rate"]
generated: "article"
---

Most data problems let you take your time. Store everything, analyze it later, rerun the model when you have a better one. Fast radio bursts don't allow that luxury. A burst lasts a few thousandths of a second, the telescope cannot keep the raw data it arrives in, and something has to decide within about 20 seconds whether tonight's sky was worth saving. That single constraint changes what the machine is actually for.

## A shape stretched by space itself

The detection method starts with a physical fact about how these bursts travel. A fast radio burst leaves its source at every frequency at once, then crosses thousands of light years of thin plasma on its way to Earth, and that plasma slows the low frequencies more than the high ones. By the time the burst arrives, it isn't a single flash anymore; it's a curve, with high frequencies arriving first and low frequencies trailing behind. The steeper that curve, called the dispersion curve, the more space the signal crossed to reach the telescope. That curve is the shape the whole detection system is built to search for.

## The scale of the problem

The CHIME telescope takes in about one and a half petabytes of data a day, and its search pipeline computes roughly 100 billion signal-to-noise values every second. That produces something like 100,000 candidate signals a day, and almost none of them are actually astronomical. Most of what a radio telescope picks up is us: phones, satellites, and power lines, all arriving at every frequency at once with no dispersion curve at all. The most memorable illustration of this problem is a real case at the Parkes Observatory, where a signal that looked almost right for years turned out to be the observatory's own microwave oven, opened before its timer finished.

## How the triage actually works

The method runs on a strict clock. Raw voltages land in a ring buffer that holds about 35 seconds of data. The search de-disperses the stream across a bank of trial delays, and anything that peaks becomes a candidate, rendered as two images for a neural network to judge. One image shows the dispersion sweep itself, peaking at a particular trial delay value. The second plots signal strength against trial delay, where a real burst collapses to a sharp point and local interference never does. The network looks at both images and makes a call: yes writes about 100 milliseconds of data to disk, no lets the buffer move on and that raw data is gone.

## Training a model with almost no real examples

There simply are not enough confirmed real bursts to train a classifier directly, so the training data is built differently. Positive examples are simulated bursts, injected into genuine telescope noise. Negative examples are real interference recorded at the dish. The simulated bursts teach the network what to want; the real interference teaches it what to reject. The published results from this approach are strong: recall above 99% while cutting the roughly 100,000 daily false candidates down to a small handful. CHIME's first catalog, built this way, held 536 bursts, 62 of them repeating sources.

## What this approach cannot prove

The video is careful to name two real limits. First, because the positive training examples are simulated, the pipeline is sharpest on bursts that resemble the ones someone thought to simulate, and weaker on anything genuinely novel. Second, and more fundamentally, the rejections are not archived. They are overwritten by the next 35 seconds of buffer. Every other method in this kind of series can, in principle, be rerun against last year's stored data if a better model comes along later. This one cannot, because the data a rejected candidate was built from no longer exists once the buffer moves on.

## Key takeaways

- A fast radio burst arrives as a dispersion curve, with low frequencies delayed relative to high frequencies by the plasma it passed through in space.
- CHIME processes about 1.5 petabytes a day and generates roughly 100,000 candidate signals daily, almost all of them Earth-based interference.
- A 35-second ring buffer and a two-image neural network judge each candidate in real time; rejected data is deleted, not archived.
- The classifier is trained on simulated bursts injected into real noise, paired with real interference recordings, reaching above 99% recall.
- The system's two honest limits are a bias toward bursts resembling the simulated training set, and the permanent, unrecoverable loss of every rejected candidate.

## Try it yourself

The video closes with a design prompt for anyone working with real-time detection systems: if your pipeline has to discard most of its input because storing everything is impossible, name a concrete cost for a missed detection, build a way to measure what was lost, and keep a small random sample of raw input as a control, so your threshold choice can actually be audited later. This video is part of a Humanitarians AI Fellows series on real-time AI methods in astronomy.
