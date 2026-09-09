---
title: "Solve-Verify Asymmetry"
seoTitle: "Why Verifying AI Answers Takes Longer"
description: "Liam measures how much longer it takes to verify an AI answer than to produce one, across ten problems of rising difficulty."
summary: "Liam times ten problems of rising difficulty two ways, how fast Claude answers and how long a strict deterministic check takes, and finds verification can cost far more than solving."
keywords: ["why does verifying ai answers take longer", "solve verify asymmetry explained", "how long to check an ai answer", "deterministic check vs ai answer speed", "does a faster ai model help verification", "checking hard math problems takes longer", "verifying combinatorics and algebra answers", "measuring solve verify gap in ai work"]
generated: "article"
---

If Claude solves a problem in seconds, it seems reasonable to assume checking that answer should be just as fast. For hard problems, it is not. Liam runs a direct measurement across ten problems of rising difficulty, timing how fast the AI answers against how long a strict deterministic check takes to confirm it.

## The experiment

The method is simple: take ten problems of increasing difficulty, time two things for each, how fast the AI produces an answer and how long a strict deterministic check takes to confirm that answer is correct, then divide the two. For simple arithmetic, the check ran about three times as long as producing the answer. For hard combinatorics, the check ran about 100 times as long. The natural assumption, that confirming an answer should be roughly as fast as glancing over work already done, does not hold up against those measured ratios.

## Why checking costs more than answering

For many hard problems, producing one plausible answer is comparatively cheap. Actually confirming that answer is correct means redoing the real computation, and that recomputation is the expensive part. The gap is not uniform across problem types, either. Once a hidden startup cost inside the checker itself was identified and stripped out, arithmetic checking dropped to close to a one-to-one ratio with answering. Algebra, quadratics, and combinatorics did not move at all after that fix, which shows the larger gap on harder problems was never a measurement artifact.

## What a big ratio does and does not mean

A large solve-to-verify ratio on a hard problem does not mean the AI's answer was wrong. It only means that confirming correctness costs more computation, regardless of whether the answer turns out to be right or wrong. That distinction matters because it separates two different questions: whether an answer needs checking at all, and how expensive that checking will be once you decide to do it.

## A faster model does not close the gap

A faster AI model does not shrink this asymmetry, and it can make the practical problem worse. A faster model produces more candidate answers per second, and each one still requires the same expensive check to confirm. Speeding up the answering side while the verification cost per answer stays fixed just means a larger backlog of unverified answers piling up behind the checker.

## The pattern holds after correcting for measurement error

After correcting the checker's hidden startup cost, the pattern held: arithmetic checking near one-to-one, algebra and combinatorics unchanged, and a full proof sketch running about 300 times longer to check than to produce, an outlier large enough to sit off the chart entirely. For hard problems, checking an answer costs far more than producing one, and that cost does not go away just because the model producing answers gets faster.

## Key takeaways

- Verifying an AI answer is not automatically as fast as producing it; on hard combinatorics problems in this test, the check took about 100 times longer than the answer.
- A large solve-to-verify time ratio does not mean the answer is wrong, only that confirming correctness requires real recomputation.
- Correcting for a hidden startup cost in the checker brought arithmetic close to a one-to-one ratio, while algebra, combinatorics, and proof sketches stayed far more expensive to verify than to solve.
- A faster AI model does not close the solve-verify gap, and can widen the practical bottleneck by generating more answers that each still need the same expensive check.
- The suggested way to apply this is to time a deterministic check against AI answer speed on a trivial, a medium, and a hard task in your own work, and see how large the ratio actually is.

## Who this is for

This is for anyone deciding how much to trust or automate AI-produced answers on harder problems, and who wants a concrete way to measure how expensive real verification is before assuming a fast answer means a cheap check.
