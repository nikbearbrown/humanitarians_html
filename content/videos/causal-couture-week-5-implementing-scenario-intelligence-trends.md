---
title: "Causal Couture Week 5: Implementing Scenario Intelligence & Trends"
seoTitle: "Causal Couture Week 5: Scenario Intelligence"
description: "Ushasvi Rachel ships Causal Couture's scenario intelligence engine, trend comparisons, and a rule-based alert engine on a redesigned FastAPI frontend."
summary: "Week five turns Causal Couture into a full decision intelligence system: what-if scenarios, trend comparisons, business alerts, and a rebuilt frontend."
keywords: ["scenario intelligence engine fashion retail", "what if simulation business analytics", "rule based alert engine retail", "fastapi decision intelligence backend", "structured recommendation action priority", "causal couture phase 4 system", "demand pressure stock risk conversion", "humanitarians ai causal couture project"]
generated: "article"
---

Week four of the Causal Couture project left the design and back-end architecture ready but unbuilt. Week five is where HAI Fellow Ushasvi Rachel turned that design into a working, end-to-end decision intelligence system, moving the platform beyond a static scorecard into something that supports current condition analysis, pattern detection, hypothetical simulation, and structured recommendations all in one place.

## A reusable analytical layer

The foundation of the week's work is a finalized analytical layer built around five primary signals: demand pressure, stock risk, engagement momentum, conversion strength, and an overall combined signal. On top of that layer sits a structured recommendation framework where every recommendation carries four fixed components: an action, a priority, a confidence level, and a reason. Actions are drawn from a fixed set of categories, reorder, monitor, hold, or deprioritize, which keeps recommendations consistent and machine-readable rather than free-form text. That same structured output is reused across both the executive dashboard and the scenario analysis workflow, so the decision-support format stays identical no matter which part of the platform a user is looking at.

## An interactive scenario intelligence engine

The headline addition for phase four is the scenario intelligence engine, an interactive what-if system for testing how the analytical framework responds to hypothetical business assumptions. Users can apply percentage changes across four dimensions, demand, inventory, engagement, and conversion, letting a simulated business state diverge from the current baseline. For each simulation, the system first calculates the current baseline, applies the selected assumptions, and recalculates the full analytical scorecard under those hypothetical conditions. It then compares baseline against scenario, measures the magnitude and direction of the change, updates the recommendation accordingly, and returns a scenario confidence score along with a plain-language explanation. Input validation prevents unsupported scenario values from ever entering the analytical workflow. Ushasvi is explicit about the boundary here: this is what-if simulation, not forecasting. It evaluates how the framework responds to user-defined assumptions without claiming those conditions will actually occur, or that one variable causally produces another.

## Trend intelligence and temporal context

Alongside the scenario engine, trend intelligence adds temporal context by dividing available chronological data into previous and recent periods, then comparing demand, inventory, engagement, and conversion across them. Trends get summarized with a percentage change and a readable direction, increasing, declining, or stable, giving users a snapshot of recent movement sitting right alongside the current analytical state.

## A rule-based alert engine

The third major addition is a rule-based business alert engine that evaluates combinations of analytical and trend signals together to surface conditions that may need attention. Supported conditions include high demand paired with falling inventory, high stock risk on its own, high engagement paired with weak conversion, conversion decline, demand acceleration, and engagement momentum. When none of the supported conditions is detected, the system explicitly communicates that no major alerts are currently present, rather than staying silent in a way that could be mistaken for a system failure.

## Bringing it together on a redesigned frontend

An executive dashboard aggregation layer combines the major outputs, KPIs, trends, recommendations, alerts, dataset summary, and data source status, into a single response. The dataset summary itself reports row count, column count, unique SKU count, and date range, while source status tracks whether sales, inventory, social, and web data are all present in the unified dataset. These capabilities were wired into the backend through dedicated phase-four FastAPI endpoints for dashboard intelligence and scenario analysis, plus four scenario presets, demand surge, inventory pressure, engagement without conversion, and softening demand, that let users explore common fashion retail situations without manually configuring every variable, while still allowing manual adjustment of any individual control.

The backend was then integrated into a redesigned frontend organized around five sections: Overview for primary KPIs and analytical state, Data for source processing and unified dataset generation, Intelligence for recommendations and context, Scenario Lab for the interactive controls, and Insights for alerts and supporting analysis. The redesign adds sticky navigation, active section highlighting, smooth scrolling, page progress, responsive layouts, loading and notification states, empty states, collapsible technical output, scenario feedback, interaction feedback, keyboard focus, and back-to-top navigation.

## Testing the complete workflow

Ushasvi tested the whole pipeline end to end: upload data, validate and process it, build the unified dataset, load intelligence, analyze trends, review alerts, configure a scenario, run the simulation, and compare results, testing both manual scenario controls and the presets. She also verified frontend-to-backend communication and confirmed the returned analytical results displayed correctly through the redesigned interface.

## Key takeaways

- Phase four combines five analytical signals into a reusable layer feeding a structured, four-part recommendation format used consistently across the platform.
- The scenario intelligence engine simulates hypothetical demand, inventory, engagement, and conversion changes without claiming to forecast the future.
- Trend intelligence compares previous and recent periods to summarize direction and percentage change for each key signal.
- A rule-based alert engine surfaces specific risk combinations, and explicitly reports when no major alerts are present.
- The redesigned five-section frontend (Overview, Data, Intelligence, Scenario Lab, Insights) was built on dedicated FastAPI endpoints and tested end to end.

## Who this is for

This update is for anyone following the Causal Couture project or curious about how a fashion retail decision-support system moves from a static scorecard to an interactive scenario tool. It's part of the applied analytics work HAI Fellows produce for Humanitarians AI, with the next planned phase moving from these observed and hypothetical signals toward formally estimated causal effects.
