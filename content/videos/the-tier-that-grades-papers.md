---
title: "The Tier That Grades Papers"
seoTitle: "A Three-Tier Framework for Grading Research Trust"
description: "Liam tests a three-tier framework for grading trustworthiness of machine learning research on SERS chemical sensing, chemical-signal AI."
summary: "A published framework grades machine learning research on chemical sensing into three trust tiers, and testing it against real claims shows almost nothing reaches the top tier."
keywords: ["three tier research trust framework", "sers machine learning validation", "svm vs deep learning small datasets", "ai generated methodology red flag", "research trustworthiness grading scale", "tier 1 tier 2 tier 3 research", "chemical sensing machine learning accuracy", "identifying ai written research sections"]
generated: "article"
---

Not every published "90%+ accuracy" result in machine learning research means what it appears to mean. A research review on using machine learning to interpret SERS, a chemical sensing signal, offers something more useful than another new algorithm: a three-tier framework for grading whether a published result is actually trustworthy, tested here against real claims.

## A framework for grading trust, not just accuracy

SERS spectra carry a huge amount of information, but they're also packed with noise from the substrate, the instrument, and the sample itself, all bleeding into the same signal. Machine learning is supposed to separate the real signal from that noise, but a strong accuracy number alone doesn't tell you whether a result generalizes or was validated properly. The paper's contribution is a scale for grading exactly that, sorting results into three tiers rather than treating every accuracy claim the same way.

## Classical methods holding their own

Before getting to the grading itself, the video makes a point about method choice. Support vector machines and random forests remain the most validated approaches and work reliably with the small, noisy datasets that are actually typical in this field. Deep learning approaches like CNNs and transformers can hit over 90% accuracy on large, single-site datasets, but on the smaller datasets most studies in this field actually run, deep learning holds no consistent edge over classical methods at all.

## Applying the tiers to real studies

Putting real published claims through the framework produces a sobering result. One study using serum spectra across two independent patient cohorts reaches 95.8% accuracy and lands in tier two. Another study, working with 66,000 spectra and reporting 97% accuracy, sits right on the border between tier two and tier three, because despite its huge dataset size, it draws from just one site and one time period. Almost everything else surveyed in the field lands in tier three: hypothesis-generating, not validated. Not one published study reviewed reaches tier one.

## Catching AI-generated methodology

A separate thread in the review turns the scrutiny back on the paper making the argument. Its methodology section listed techniques used but never actually argued for why those particular methods were chosen, reading, on inspection, like it had been AI-generated. That suspicion was raised, confirmed by a project manager, and then independently reached by a second teammate who reviewed the same section without being told about the earlier finding. A first rewrite pass still carried citation inaccuracies, which a review process flagged directly; a second pass built on that diagnosis came back clean.

## Why the fix was rigor, not polish

Importantly, the paper's real limitations, including no external validation for wastewater deployment and no cross-site testing, were left honestly in the text rather than smoothed over. The fix wasn't about making the writing sound better. It was about applying the same discipline the paper itself argues the field needs: not new architectures, but harder validation standards, since most of what gets published currently falls short of that bar.

## Key takeaways

- A three-tier framework grades machine learning research trustworthiness rather than relying on raw accuracy figures alone.
- Classical methods like SVMs and random forests match or beat deep learning on the small, noisy datasets typical of this field.
- Applying the framework to real studies found that not one reviewed publication reached tier one.
- A methodology section that read as AI-generated, lacking justification for method choices, was independently confirmed by two reviewers.
- The eventual fix was increased rigor and honest disclosure of limitations, not surface-level polish.

## Who this is for

This is useful for anyone evaluating machine learning claims in scientific literature, or working within the Humanitarians AI Fellows program on research review and revision, where this kind of diagnose-confirm-fix process directly supports a fellow's project renewal.
