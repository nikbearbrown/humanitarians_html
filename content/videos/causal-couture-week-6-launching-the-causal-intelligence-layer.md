---
title: "Causal Couture Week 6: Launching the Causal Intelligence Layer"
seoTitle: "Causal Couture Week 6: The Causal Intelligence Layer"
description: "Ushasvi Rachel details how Causal Couture moves toward observational causal effect estimation, with bootstrap uncertainty and placebo tests."
summary: "Causal Couture's week six build estimates whether social engagement actually causes next-day sales, using regression, bootstrap uncertainty, placebo tests, and a stockout diagnostic."
keywords: ["causal couture causal intelligence layer", "observational causal effect estimation retail", "bootstrap uncertainty regression analysis", "placebo test causal inference", "stockout diagnostic suppressed demand", "confounders vs mediators causal diagram", "social engagement sales causal effect", "temporal causal dataset retail sku"]
generated: "article"
---

There's a meaningful difference between noticing that two things happened together, simulating what might happen under a hypothetical change, and actually estimating whether one thing causes another. Week six of Causal Couture, detailed by HAI Fellow Ushasvi Rachel, is the point where the platform stops blurring those three ideas together and builds a dedicated system for the third one: an observational causal effect estimator.

## Three claims that are not the same thing

Causal Couture now explicitly separates three different kinds of analytical output. An observed signal describes what's present in historical retail data, a pattern that already happened. A scenario simulation asks how the existing analytical framework responds to a user-defined hypothetical change; it's not a forecast, it's a what-if run through the existing model. An estimated causal effect is something different again: an observational estimate of how changing one factor may relate to a later outcome, made under explicit, stated assumptions. The goal of week six isn't to declare that causality has been proven. It's to build the technical and methodological foundation that makes rigorous causal analysis possible at all, and to keep these three outputs from being treated as interchangeable.

## The first causal question: does engagement drive next-day sales?

The question the platform tackles first is whether social engagement for a product has a causal effect on that product's sales the following day. The data stays at the same grain the platform already uses, one row per date and SKU. The treatment is social engagement for a product on a given date; the outcome is units sold for that same product on the following day. That creates a clean, ordered relationship: engagement at time T, followed by sales at time T plus one day.

## Getting the temporal structure right

A dedicated temporal causal dataset was built from the platform's unified retail data specifically to support this question, including current and prior engagement, current and prior sales, current inventory, and validity and inventory-constraint indicators. One correction mattered a lot here: simply shifting a sales column by one row can silently treat the next available record as if it were the next calendar day, even when there are gaps in the dates. The updated pipeline instead checks the actual next observed date for each SKU and only populates next-day sales when that date is exactly one calendar day later. That keeps the treatment-outcome relationship temporally honest instead of quietly corrupted by missing dates.

## Confounders, mediators, and why the distinction matters

Before estimating anything, the team built a causal diagram to make its assumptions visible rather than implicit. Prior sales may influence both current engagement and later sales. Prior engagement may carry forward its own effect. Inventory availability can constrain how many units actually get sold regardless of demand. SKU-specific characteristics and calendar effects may influence both engagement and purchasing behavior. Web variables, like product views or view-to-cart rate, get treated with particular caution, since they may occur after social engagement but before the purchase itself, making them possible mediators rather than confounders. If that pathway, engagement leads to web behavior leads to purchase, is real, then automatically controlling for those web variables could strip out part of the very effect being studied.

## Estimating the effect, honestly

The first effect estimator uses linear regression, with a preferred adjustment structure that includes current engagement, prior sales, prior engagement, current inventory when available, SKU fixed effects, and day-of-week effects. Observations where inventory was constrained can be excluded from the primary estimate, so periods where nothing was available to sell don't distort the measured relationship. The output reports the estimated engagement effect, the number of observations used, which adjustment variables and fixed effects were applied, and general model information. The interpretation stays deliberately limited: this is an observational estimate from uploaded retail data, not experimental proof of causation.

## Guarding against false precision

A single point estimate can create a misleading sense of exactness, so the system adds bootstrap uncertainty analysis, repeatedly resampling the available observations, re-estimating the model each time, and examining the resulting distribution of effect estimates to report a mean, a median, a standard error, and a percentile interval. It also runs a shuffled-treatment placebo test, where the observed engagement values are randomly shuffled and the model is re-estimated; if a similarly large relationship still shows up after the real treatment structure has been destroyed, that result needs more scrutiny, while a weaker shuffled result offers additional reassurance without proving identification on its own. A separate check confirms engagement actually contains meaningful variation, looking at its range, distribution, and number of unique values, as a basic global check rather than formal proof of overlap across every confounder group.

## The stockout diagnostic

Retail data adds a specific complication: observed sales can be capped by inventory rather than by demand. Low sales don't necessarily mean low demand if a product simply wasn't available to buy. The stockout diagnostic identifies normal inventory periods, low-stock periods, inventory pressure, and full stockouts, evaluating where observed sales may be an unreliable stand-in for real demand and assigning a suppressed-demand risk classification. It doesn't try to recover or impute the true underlying demand, only to flag where inventory constraints make interpretation harder.

## Bringing it together on the front end

All of these components, the unified retail dataset, the temporal causal dataset, the adjusted effect estimate, bootstrap uncertainty, the placebo test, treatment variation checks, stockout diagnostics, and comparisons across alternative model specifications, feed into one coordinated causal intelligence workflow, exposed through a new backend route and a dedicated frontend experience. To make the number easier to interpret, the platform translates the raw coefficient into a business-scale figure: the estimated sales effect associated with a 10 percentage point increase in engagement rate, rather than a full one-point increase. The resulting evidence categories, stronger, moderate, weak, or insufficient observational support, are diagnostic summaries, not probabilities that the relationship is truly causal.

## Key takeaways

- Causal Couture now explicitly separates observed signals, scenario simulations, and estimated causal effects as three distinct, non-interchangeable outputs.
- The first causal question tested is whether social engagement causally affects next-day sales, using a properly time-ordered temporal dataset that checks actual calendar gaps rather than just shifting rows.
- A causal diagram distinguishes confounders (like prior sales and inventory) from possible mediators (like web behavior), since controlling for mediators could remove part of the real effect.
- Linear regression estimates the effect, but bootstrap uncertainty analysis and a shuffled-treatment placebo test guard against false precision and spurious findings.
- A stockout diagnostic flags periods where inventory constraints, not real demand, may be suppressing observed sales, without trying to impute the true demand.
- All outputs are framed as observational estimates with explicit assumptions, not experimental proof of causation, and results are compared across multiple model specifications for robustness.

## Who this is for

This update is for anyone following the Causal Couture project's progression from decision intelligence toward genuine causal analysis, and for readers interested in how a retail analytics platform can honestly separate correlation, simulation, and causal estimation. It's part of the broader HAI Fellows work coming out of Humanitarians AI.
