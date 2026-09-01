---
title: "What's Ushasvi Building? — Causal Couture, Phase 3"
seoTitle: "Causal Couture Phase 3: A Business Health Score"
description: "Causal Couture turns a small shop's own sales, inventory, social, and web data into a business health score and plain-English recommendation."
summary: "Phase 3 of Causal Couture adds a decision layer that scores a small business's health and recommends inventory actions in plain English, built on the shop's own data."
keywords: ["causal couture small business analytics", "business health score inventory recommendation", "causal inference small business data", "schema validated csv data ingestion", "date by sku unified dataset", "ai business analytics fellow project", "plain english business insight ai", "causal analysis social media sales correlation"]
generated: "article"
---

Small business owners generate plenty of their own data: sales records, inventory counts, social posts, web analytics. What they usually don't have is a system that reads all of it together and tells them, in plain language, what's actually working. Causal Couture is a Humanitarians AI Fellow project built to be exactly that system, and Phase 3 is where it starts making real recommendations rather than just organizing data.

## Building in order: why phase matters

Ushasvi Rachel Peeka built Causal Couture in a specific sequence, and that order is part of what makes Phase 3 credible. Phase one was the skeleton: a back-end API, a front-end interface, and CSV upload with schema validation, checking required columns, date formats, and SKU IDs before a single row of data gets accepted into the system. Phase two was the pipeline: cleaning and standardizing uploaded files, computing rolling sales averages and spike detection, and combining everything into one unified date-by-SKU view of the whole business. Only with that foundation in place does Phase three become possible.

## Phase 3: the decision layer

Phase three is described as the part that thinks. A starter analysis engine reads the unified dataset and generates four categories of signals: demand, inventory, engagement, and conversion. Those signals roll up into a single overall business health score, along with an initial inventory recommendation, giving the shop owner one scorecard for the whole business rather than four disconnected metrics to interpret separately.

Ushasvi is explicit about where this sits on the road to a fully causal system, labeling the current scoring as heuristic starter scores, ahead of full causal effect modeling. That's a meaningful distinction: the system organizes and weighs signals now, but it isn't yet proving that one thing causes another, and the project's own documentation says so directly rather than overstating what Phase 3 delivers.

## Why plain English matters here

A health score without an explanation is just a number, so the system also generates a plain-English interpretation of its own results, translating analytical output into business-friendly language instead of returning raw figures. That's a deliberate design choice aimed at who this tool is actually for: shop owners, not data analysts. The interface itself went through a redesign this phase too, integrating the complete workflow from file upload through scorecard generation to the written explanation into one polished front end.

## The unedited report

The fellow's own five-minute report walks through a live demo of the working prototype: uploading each data file (sales, inventory, social, and web), building the unified dataset, selecting it, naming it, and running the starter analysis to generate both the scorecard and its plain-English explanation. Running the same dataset twice in the demo doesn't show much variation, since it's the same underlying values, but the workflow itself, upload to unified dataset to scorecard to explanation, runs end-to-end locally, with all of the implementation pushed to GitHub.

## Feedback: the score has to show its work

The project review that follows the report is direct about what's working and what isn't yet. Three phases in, this is a genuine end-to-end prototype, and the discipline of validating schemas before ingestion is called out specifically as the unglamorous choice that prevents problems later. Date-by-SKU is affirmed as the right level of granularity for this kind of analysis, and the plain-English layer is credited as evidence the system knows who its actual audience is.

The pushback is equally direct: today, causal is a promise, not yet a property. The engine currently produces heuristic signals folded into a composite score, and while the interface is honest on-screen about that limitation, a health score still has to show its work. Which signals moved the score, weighted how, based on what. The suggested test for the next demo is bringing two genuinely contrasting datasets, since running the same file twice can't demonstrate that the explanation layer is actually earning its keep.

## What's next

Three concrete next steps come out of the review. First, pick a single, narrow causal question, such as whether a social media spike actually causes an increase in add-to-cart activity, or merely tends to happen alongside it, and answer that one question properly before generalizing the approach to the rest of the system. Second, start scenario simulation with one specific decision: the reorder quantity for the shop's top-selling SKU. Third, define a validation story by back-testing recommendations against the six months of data already collected, so the system's output can be measured against outcomes rather than just judged by feel.

## Key takeaways

- Causal Couture reads a small business's own sales, inventory, social, and web data to generate a single business health score.
- The system was built in a deliberate order: schema-validated ingestion first, a unified date-by-SKU dataset second, and the decision layer (scoring and recommendations) third.
- Current scoring is explicitly heuristic, not yet based on full causal effect modeling, and the interface says so on screen.
- A plain-English interpretation layer translates analytical output into business language instead of raw numbers.
- Next steps include testing one narrow causal question properly, simulating a single reorder-quantity scenario, and back-testing recommendations against six months of historical data.

## Try it yourself

The video closes with a prompt you can run on your own numbers: gather six months of your shop's sales, inventory, social, and web data as CSVs, build one unified daily view per product, score the business's health, then ask which signals merely correlate with sales versus which plausibly cause them, and what you'd need to check before trusting any recommendation. That question, correlation versus causation, is the whole reason Causal Couture exists, and it's a useful exercise for any small business owner working with Humanitarians AI Fellows on similar data problems.
