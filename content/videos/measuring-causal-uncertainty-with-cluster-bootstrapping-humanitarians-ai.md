---
title: "Measuring Causal Uncertainty with Cluster Bootstrapping | Humanitarians AI"
seoTitle: "SKU-Level Cluster Bootstrap for Causal Uncertainty"
description: "HAI Fellow Ushasvi Rachel explains a SKU-level cluster bootstrap that measures how repeated product observations affect causal uncertainty estimates."
summary: "Fellow Ushasvi Rachel walks through why row-level bootstrap resampling can understate uncertainty when the same product appears across many dates, and how a SKU-level cluster bootstrap in Python addresses it."
keywords: ["how to implement cluster bootstrap in python", "sku level cluster bootstrap causal inference", "row level bootstrap vs cluster bootstrap", "how to measure causal uncertainty with clustered data", "bootstrap standard error for repeated observations", "fixed effect collapse in bootstrap resampling", "why does row bootstrap understate uncertainty", "causal effect estimation with clustered product data"]
generated: "article"
---

HAI Fellow Ushasvi Rachel walks through a methodological refinement to an existing causal analysis project, Causal Couture, which estimates the effect of social engagement on product sales. The prior week's work established the observational effect estimate along with row-level bootstrap uncertainty. This week's addition does not change the causal question; it changes how the uncertainty around that estimate is measured when the underlying data has repeated structure.

## The problem with treating every row as independent

The existing validation workflow measured uncertainty by resampling eligible observations, re-estimating the engagement effect on each resample, and building an empirical distribution of those estimates. The data's analytical grain is date by SKU, meaning the same product appears repeatedly across different dates. Treating every date-SKU row as an independently resampled unit overlooks the fact that multiple rows belonging to the same product often share persistent characteristics: baseline demand, historical popularity, engagement behavior, and inventory patterns. When observations within a SKU are related to each other in these ways, independent row resampling can give an incomplete picture of the true uncertainty.

## Building the SKU-level cluster bootstrap

To address this, Rachel implemented a new cluster bootstrap procedure in `app/api/causal_cluster_bootstrap.py`. The key change is what gets resampled: instead of resampling individual date-SKU rows, the procedure resamples entire SKU clusters. It first identifies every unique SKU in the eligible causal analysis dataset, then samples those SKU clusters with replacement. All observations belonging to a sampled SKU are retained together, and a new bootstrap dataset is reconstructed from those clusters before the existing causal estimator re-runs on it. This repeats across bootstrap iterations to produce a new empirical distribution of estimated effects, this time built from resampled products rather than resampled rows.

## Avoiding fixed-effect collapse

Because sampling happens with replacement, the same SKU can be selected more than once within a single bootstrap iteration. Each sampled copy of that SKU receives a unique bootstrap cluster identifier so that duplicate copies do not collapse into a single SKU category when the estimator constructs its SKU fixed effects. Without that identifier, resampling the same product twice would effectively be treated as one observation instead of two, undermining the point of the cluster resampling.

## Integrating both methods side by side

The new method was integrated into the phase 5 causal validation endpoint without removing the original row-level output. The API response now distinguishes the two: `uncertainty` refers to the original row-level bootstrap, and `cluster_uncertainty` refers to the new SKU-level method. Keeping both available makes direct comparison possible. The goal is not to replace one method with the other by default, but to test how sensitive the uncertainty estimate is to the choice of resampling unit. If the row-level and cluster estimates land close together, the effect looks less sensitive to that choice. If the cluster bootstrap produces a substantially wider interval, that gap suggests within-SKU dependence matters and the row-level method may have understated the true uncertainty. A wider interval on its own does not mean the point estimate is wrong; it is a robustness diagnostic, not a correction to the causal identification.

## What this method does and does not establish

The cluster bootstrap output reports the number of available SKU clusters, the requested iterations, and the successful estimations, along with the mean effect, median effect, bootstrap standard error, and 95 percent interval. Built-in checks for insufficient clusters or failed samples let the system fail transparently rather than return a misleading number. Rachel documented the comparison guidance and its limits directly in the project's phase 5 cluster bootstrap refinement notes: this comparison does not remove unobserved confounding, does not prove the causal DAG, and does not guarantee treatment positivity. It refines how uncertainty is estimated, which is a distinct question from whether the underlying causal identification is correct.

## Key takeaways

- Row-level bootstrap resampling can understate uncertainty when observations from the same product repeat across dates and share unmeasured characteristics.
- A SKU-level cluster bootstrap resamples entire products with replacement instead of individual rows, better preserving repeated product structure.
- Each resampled copy of a SKU needs a unique cluster identifier, or duplicate selections collapse into one category during fixed-effect estimation.
- The API now reports both `uncertainty` (row-level) and `cluster_uncertainty` (SKU-level) so the two can be compared directly.
- A wider cluster-bootstrap interval flags sensitivity to the resampling unit; it does not by itself prove the row-level estimate was wrong, and it does not address confounding or causal identification.

## Who this is for

Analysts and researchers working with causal effect estimates on panel or repeated-unit data, particularly anyone whose bootstrap uncertainty intervals may be too narrow because the resampling unit does not match the data's actual clustering structure.
