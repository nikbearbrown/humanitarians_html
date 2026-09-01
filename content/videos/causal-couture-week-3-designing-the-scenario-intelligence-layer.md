---
title: "Causal Couture Week 3: Designing the Scenario Intelligence Layer"
seoTitle: "Designing a What-If Scenario Engine for Retail"
description: "Ushasvi Rachel designs a scenario intelligence layer for Causal Couture, letting users test what-if changes to demand, inventory, engagement, and conversion."
summary: "Ushasvi Rachel designs the conceptual scenario intelligence layer for Causal Couture, a controlled what-if engine for testing fashion demand and inventory assumptions against a live baseline."
keywords: ["scenario what-if simulation design", "causal couture fashion ai", "demand inventory scenario modeling", "baseline vs scenario recalculation", "scenario validation boundaries design", "modular backend architecture design", "fashion inventory decision intelligence", "humanitarians ai fellows scenario lab", "heuristic analytical framework design"]
generated: "article"
---

There is an important difference between a dashboard that tells you what is happening right now and one that lets you test what might happen if something changed. Week three of the Causal Couture project is entirely about designing that second kind of system: a scenario intelligence layer built to let users explore hypothetical business assumptions without ever confusing those hypotheticals with observed reality.

## Why a scenario layer, not more dashboards

By the end of week two, the project's phase three prototype had already been reviewed and its limitations documented, which surfaced a clear need: a scenario-based decision intelligence layer that could move Causal Couture beyond simply displaying current business signals. The task for week three was to design that layer conceptually before implementing it, focusing on how the system could support structured what-if analysis for fashion inventory and demand decisions rather than just reporting on the present.

## Four variables users can adjust

The initial design centers on four adjustable variables: demand change, inventory change, engagement change, and conversion change. Together, these define the first set of assumptions a user can explore. Every scenario starts from the same two ingredients: the current baseline and the user's hypothetical assumptions layered on top of it. Those assumptions then pass into the analytical workflow to produce recalculated scenario signals, which means the same underlying analytical engine that reads real business data also powers the hypothetical exploration.

## Keeping baseline and scenario side by side

The resulting view is designed to show the difference between baseline and scenario clearly: the direction of change, a resulting recommendation, an explanation for that recommendation, and enough confidence or context information for a user to actually interpret it. This structure exists specifically to keep the current business state visible while the hypothetical state sits beside it, so a user can compare what changed without mistaking the simulation for observed performance. A concrete example illustrates the intent: a user could increase the demand assumption while simultaneously decreasing available inventory, and the scenario view would show whether stock risk and recommendation signals became more urgent under those combined assumptions.

## Explicitly not forecasting or causal inference

One of the more disciplined parts of this design is what it refuses to claim. The scenario layer is controlled what-if simulation, not forecasting. It does not assert that a hypothetical situation is likely to occur. It is also not causal inference, and it does not claim that one variable produced another. The proposed layer initially uses the existing heuristic analytical framework, and its stated purpose is to recalculate decision support signals under controlled assumptions, not to predict the future or establish cause and effect. Alongside that, validation boundaries were planned for scenario inputs specifically so that unrealistic or malformed assumptions get controlled before they enter the analytical workflow and distort a simulated result.

## Restructuring the front end and the back end together

The front end design work went beyond the scenario layer itself. Five primary sections were planned: overview, data, intelligence, scenario lab, and insights, mapping to an intended user journey of upload, validate, integrate, analyze, simulate, and decide. The scenario lab specifically was planned as the future interactive space for modifying assumptions and comparing baseline against simulated states before a decision gets made. The broader UX plan also included clearer functional separation, KPI presentation, structured recommendation cards, source availability indicators, progressive disclosure, sticky navigation, responsive layouts, system feedback, and a stronger fashion-oriented visual identity. On the back end, scenario intelligence required a more modular architecture, with separate responsibilities outlined for core scorecard calculations, scenario simulation, trend analysis, alert generation, and dashboard aggregation, a separation designed so the same analytical calculations could support both the baseline dashboard and future scenario analysis without duplicating logic.

## Key takeaways

- The scenario intelligence layer lets users adjust four variables, demand, inventory, engagement, and conversion, and see recalculated signals against a live baseline.
- The design explicitly frames itself as controlled what-if simulation, not forecasting and not causal inference.
- Validation boundaries were planned to prevent unrealistic or malformed scenario inputs from corrupting the analytical workflow.
- The front end was restructured into five sections, overview, data, intelligence, scenario lab, and insights, mapping to an upload-to-decide user journey.
- A modular back end architecture separates scorecard calculations, scenario simulation, trend analysis, alert generation, and dashboard aggregation so logic can be reused rather than duplicated.

## Who this is for

This is for Humanitarians AI Fellows and contributors following the Causal Couture project, and for product designers or engineers interested in how to structure a what-if scenario system that stays clearly separated from forecasting or causal claims.
