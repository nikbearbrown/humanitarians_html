---
title: "Causal Couture Week 1: Building the Phase 3 Analytical Prototype"
seoTitle: "Causal Couture Week 1: Fashion Data Prototype"
description: "How four retail data sources were unified into one date-by-SKU dataset and turned into a heuristic scorecard with FastAPI, Polars, and DuckDB."
summary: "Ushasvi Rachel walks through week one of Causal Couture, integrating sales, inventory, social, and web data into a unified dataset and heuristic business scorecard."
keywords: ["causal couture humanitarians ai", "date by sku data integration", "heuristic business scorecard retail", "fastapi polars duckdb pipeline", "fashion retail data pipeline", "demand pressure stock risk scorecard", "sell through view to cart conversion", "descriptive heuristics vs causal forecasts"]
generated: "article"
---

Building an analytical system for a fashion retail business starts long before any forecasting or causal modeling happens. Week one of Causal Couture, a four-part progress series from Humanitarians AI Fellow Ushasvi Rachel, is about integration: taking four separate categories of retail data and bringing them together into a single working, end-to-end prototype.

## Four data sources, one business

The starting point was four distinct categories of fashion business data: sales, inventory, social engagement, and web activity. Each represents a different part of the business. Sales and inventory describe commercial activity and product availability, the operational side of the business. Social engagement and web activity add signals about attention and online behavior, the demand side. Together, these four sources provide the raw inputs the rest of the prototype builds on.

## Getting everything to the same grain

Integration alone wasn't enough to make the data usable. The ingestion and preprocessing workflow had to standardize the four sources and prepare them for downstream analysis, creating a consistent path from incoming data through validation and preprocessing, without assuming the original sources already shared a common structure. After preprocessing, the sources were combined into a unified analytical dataset at the date-by-SKU level. That common grain connects different business signals around the same product and date, giving the analytical layer one consistent foundation to build on.

## Building the feature layer

From that unified dataset, the decision-support feature layer took shape. One group of features represented sales and demand activity. Another captured inventory availability and low-stock conditions, describing pressure on demand and possible risk on the stock side. The feature layer also included social engagement and web conversion behavior, covering sales and social spikes, sell-through behavior, and view-to-cart conversion. At this stage, these are analytical signals derived from the integrated data, explicitly not causal effects and not forecasts.

## The heuristic scorecard and the tech stack

Those features fed into the phase three heuristic business scorecard, which organizes the available information into four primary signals: demand pressure, stock risk, engagement momentum, and conversion strength. The four signals combine into an overall score and a rule-based recommendation, translating several analytical signals into something easier to interpret as business decision support. Python and FastAPI provide the API layer connecting the analytical workflow to an interactive front end, while the data processing itself uses tools including pandas, polars, CSV and parquet data structures, and DuckDB-related architecture.

## Where the methodological boundary sits

The most important point in this update is a boundary, not a feature. The phase three scores are heuristic decision-support signals. They are not causal estimates, and they are not demand forecasts. The prototype can organize and summarize the available signals, but it cannot establish cause and effect or predict future demand. That distinction matters because it's easy for a scorecard that looks authoritative to get treated as more predictive than it actually is. Naming the boundary explicitly, in the same week the scorecard first goes live, is what keeps the tool honest about what it can and can't tell a retail team.

## Why the end-to-end shape matters

By the end of the week, the broader workflow could move in one continuous path: from raw source data, through validation and preprocessing, into the unified date-by-SKU dataset, then through the analytical scorecard and recommendation layer, and finally out to the interactive front end. That end-to-end shape is itself the deliverable for week one, separate from any individual score the scorecard produces. Having sales, inventory, social, and web data all resolve into one connected pipeline, rather than four disconnected sources someone has to manually reconcile, is what makes the next phase of the project possible at all. Without that integration work, there would be no consistent foundation to build a more rigorous causal or forecasting layer on top of later.

## Key takeaways

- Four data sources, sales, inventory, social engagement, and web activity, were standardized and combined into one date-by-SKU dataset.
- A consistent grain (date by SKU) lets different business signals connect around the same product and date.
- The feature layer separates demand pressure, stock risk, engagement momentum, and conversion strength into distinct signal groups.
- Those four signals combine into a rule-based scorecard and recommendation, built on FastAPI, Polars, and DuckDB.
- The scores are explicitly heuristic decision-support signals, not causal estimates or demand forecasts.
- By the end of week one, the full pipeline ran from raw source data through the scorecard to an interactive front end.

## Who this is for

This is for anyone interested in how a real analytical prototype gets built in a retail context, week by week, including the judgment calls about what a system can and can't claim to predict. It's part of the Causal Couture progress series from the Humanitarians AI Fellows program.
