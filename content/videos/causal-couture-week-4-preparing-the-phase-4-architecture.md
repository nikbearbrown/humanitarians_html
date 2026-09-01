---
title: "Causal Couture Week 4: Preparing the Phase 4 Architecture"
seoTitle: "Causal Couture Week 4: Phase 4 Architecture Plan"
description: "A fashion analytics project designs a modular 0-100 scorecard and structured recommendation layer ahead of building its phase 4 intelligence system."
summary: "Ushasvi Rachel lays out the backend blueprint for Causal Couture's Phase 4 decision intelligence layer, built around a modular scorecard and structured recommendations."
keywords: ["modular scorecard architecture design", "structured recommendation output ai", "causal couture fashion analytics", "0-100 scoring scale design", "defensive engineering missing data", "scenario intelligence dashboard architecture", "reusable analytical functions backend", "fashion business data pipeline"]
generated: "article"
---

By week three of this project, the scenario intelligence framework, user experience, and modular backend direction were already designed. Week four is where that design turns into an actual architectural plan: the analytical and backend structure needed to build phase four without duplicating work already done in earlier phases.

## Why reuse, not rebuild

The starting point was reviewing how the existing phase three analytical logic could support several downstream capabilities without being rebuilt from scratch for each one. The central architectural goal was to reuse underlying calculations instead of duplicating them across different parts of the application. The existing business scorecard already evaluated four analytical dimensions: demand pressure, stock risk, engagement momentum, and conversion strength. Those four dimensions remain the foundation the planned phase four intelligence layer builds on top of, feeding into an overall signal that gets translated into a business recommendation.

## A modular, reusable scorecard structure

Keeping that scorecard-to-recommendation flow consistent as the platform grows required rethinking the scorecard's structure. The plan calls for each analytical signal to be calculated independently rather than bundled together, which lets the same signals get reused by different parts of the platform instead of being recalculated separately each time. That includes defining reusable analytical functions for individual score components, so downstream features can rely on the same analytical foundation instead of rebuilding a calculation from scratch every time a new feature needs it. Underpinning this is a consistent 0 to 100 scoring structure, which lets different analytical outputs be compared and presented consistently without changing what each one is individually responsible for.

## Structuring recommendations, not just returning text

The recommendation layer also needed more structure than plain text output. The plan defines a consistent output organized around four fields: action, priority, confidence, and reason. The eventual system would be able to distinguish between action categories such as reorder, monitor, hold, and deprioritize. It's worth being clear that these are defined as possible structured outputs for the architecture, not observed recommendations that have already come out of this period of work. The benefit of structuring recommendations this way is that a dashboard, scenario analysis, alerts, and the front end can all consume the same structured recommendation consistently, interpreting the same fields without each one inventing its own recommendation format.

## Defensive engineering for incomplete data

Because fashion business datasets are often small or incomplete, the analytical functions also needed defensive handling for missing or non-numeric values. This wasn't an afterthought; it was treated as necessary so incomplete data doesn't make the entire analytical workflow unstable.

## Five responsibilities and the data flow

The planned phase four architecture organizes around five responsibilities: core analytics, scenario intelligence, trend intelligence, alert intelligence, and dashboard aggregation. Core analytics provides reusable baseline scores and recommendation logic, while the other four components apply hypothetical changes, evaluate period-to-period patterns, identify signal combinations that need attention, and aggregate results for the front end. Because these components depend on some of the same underlying calculations, the architecture uses one shared analytical layer instead of separate versions of the scorecard for the dashboard and the scenario lab. The intended flow runs from the unified dataset into core analytics, then into trends, alerts, and scenario analysis, then into the dashboard, and finally into a business decision. This preserves the existing phase one through phase three ingestion and preprocessing pipeline rather than rebuilding the data foundation; phase four adds a new intelligence layer on top of it.

A methodological line is drawn deliberately here too: observed signals describe patterns in uploaded data, scenario simulations are user-driven hypothetical changes, and causal effects require a separate causal inference methodology that this architecture does not itself produce.

## Key takeaways

- The central goal of week four was architectural reuse: sharing analytical calculations across features instead of duplicating them.
- A modular scorecard separates four analytical dimensions (demand pressure, stock risk, engagement momentum, conversion strength) into independently reusable components on a consistent 0-100 scale.
- Recommendations are structured into four fields, action, priority, confidence, and reason, so different parts of the platform can consume them consistently.
- Defensive handling for missing or non-numeric values keeps the analytical workflow stable on small or incomplete datasets.
- The architecture organizes around five responsibilities, feeding a unified dataset through core analytics into trends, alerts, scenario analysis, and finally a dashboard.
- Observed signals, scenario simulations, and causal effects are treated as methodologically distinct, with causal effects explicitly requiring separate causal inference methods.

## Who this is for

This is a useful watch for anyone interested in how a small analytics team plans a backend architecture before building it, particularly in data-constrained domains like fashion retail. This update comes from Ushasvi Rachel as part of the Humanitarians AI Fellows Causal Couture project.
