---
title: "Causal Couture Week 2: Evaluating the Scorecard & Identifying Limitations"
seoTitle: "Causal Couture Week 2: Auditing the Scorecard"
description: "Ushasvi Rachel audits the Causal Couture phase 3 prototype, separating descriptive signals from causal claims and scoping a scenario-based next phase."
summary: "Instead of adding new features, week two of Causal Couture systematically reviews the phase 3 prototype, exposing the gap between descriptive scorecards and real causal reasoning."
keywords: ["causal couture phase 3 prototype", "descriptive vs causal reasoning data", "heuristic scorecard limitations", "scenario based decision intelligence", "business signal scoring api audit", "demand pressure stock risk scorecard", "what if scenario analysis business data", "humanitarians ai fellows causal couture"]
generated: "article"
---

It's tempting to keep adding features once a prototype is working, but that's not always the right next move. Week two of the Causal Couture project takes the opposite approach: instead of expanding the platform, HAI Fellow Ushasvi Rachel stepped back to systematically audit what had already been built, and the review surfaced a limitation that will shape everything that comes next.

## Auditing the phase 3 prototype

By the end of week one, Causal Couture had a functioning phase 3 analytical prototype: multiple business data sources connected into a unified dataset, a scorecard, a recommendation layer, an API, and an interactive front end. Rather than immediately adding more, week two focused on reviewing the full architecture end to end, data ingestion, preprocessing, feature engineering, the unified dataset, business signal scoring, API outputs, and the front-end prototype, treating each stage as part of one connected analytical workflow.

## Inside the heuristic scorecard

A major focus of the review was the heuristic scorecard built during phase three. That meant examining its demand pressure, stock risk, engagement momentum, conversion strength, and overall signal calculations to understand exactly what information each one provided and how it functioned within the broader system, along with how those signals were being translated into business recommendations. The scorecard condensed several dimensions of the available data into an understandable summary, while the recommendation layer tried to turn that summary into actual decision support.

## The core limitation: descriptive, not causal

The review reinforced an important methodological boundary: the phase 3 scores were descriptive and heuristic decision-support signals, not causal effects, and not forecasts. They could summarize patterns in the available data, but they could not establish why those patterns occurred or predict what would happen next. The example used to illustrate this is engagement and sales: stronger engagement might appear alongside higher sales, but that correlation alone doesn't show that engagement caused the increase. The two signals can move together without any causal relationship being demonstrated, and recognizing that distinction is essential to interpreting the scorecard correctly. The existing recommendation framework had a related limitation: it could summarize current conditions represented in the data, but it had limited ability to evaluate how a recommendation might change under different hypothetical business conditions.

## Designing the path forward: scenario intelligence

That limitation defines the direction for the next phase. Instead of treating the static scorecard as the end point, the plan is to extend Causal Couture toward a more interactive scenario and decision intelligence layer. Several capabilities were identified for that next stage: what-if scenario analysis, baseline-versus-scenario comparison, recent-period trend analysis, and business condition alerts. These are requirements for future work, not features completed during week two. The review also flagged a need for more structured recommendations and a clearer separation between analytical calculations and API logic, which would give the next phase a more deliberate architectural structure.

## UX and UI: separating system responsibilities

The front end was reviewed from a usability angle as well. Data management, intelligence outputs, scenarios, and technical information all needed clearer separation and a stronger information hierarchy, rather than appearing as one continuous, undifferentiated prototype workflow. Improved front-end presentation became another requirement carried into the next phase.

## Key takeaways

- Week two prioritized systematically auditing the completed phase 3 prototype over adding new features.
- The scorecard's demand pressure, stock risk, engagement momentum, and conversion strength signals are descriptive and heuristic, not causal and not forecasts.
- Correlated signals, like engagement and sales moving together, don't establish that one caused the other.
- The recommendation layer could summarize current data but had limited ability to evaluate hypothetical business conditions.
- The next phase is scoped around what-if scenario analysis, baseline-versus-scenario comparisons, trend analysis, and business condition alerts.
- The front end needs clearer separation between data management, intelligence outputs, scenarios, and technical information.

## Who this is for

This update from the Humanitarians AI Fellows program is useful for anyone building data products who wants a concrete example of the difference between descriptive analytics and causal reasoning, and why that distinction has to be resolved before a scorecard tool can responsibly support real business decisions.
