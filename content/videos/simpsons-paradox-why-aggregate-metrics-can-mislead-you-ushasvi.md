---
title: "Simpson's Paradox: Why Aggregate Metrics Can Mislead You | Ushasvi"
seoTitle: "Simpson's Paradox: Why Aggregate Metrics Mislead"
description: "A campaign performance example shows how Simpson's Paradox lets an aggregate metric reverse the true winner hidden inside every subgroup."
summary: "Using a hypothetical marketing example, Ushasvi Rachel shows how Simpson's Paradox can make one campaign look better overall while the other wins in every customer subgroup."
keywords: ["what is simpsons paradox explained", "why aggregate metrics can be misleading", "simpsons paradox marketing campaign example", "how to spot confounding in kpi data", "aggregate data vs subgroup analysis", "questions to ask before trusting a kpi", "high intent vs low intent conversion rates", "why trend reverses in subgroup data"]
generated: "article"
---

An aggregate KPI can say campaign A is the clear winner while campaign B actually performs better within every customer segment that matters. Both numbers can be calculated correctly at the same time. Using a hypothetical marketing example, Ushasvi Rachel walks through how this happens and why it is not a calculation error.

## The reversal, in numbers

Across all customers in the example, campaign A converts at 68 percent and campaign B converts at 42 percent. Looking only at that aggregate, campaign A looks like the obvious winner. But that comparison hides how differently the two campaigns were distributed. Campaign A was shown mostly to high-intent customers, and campaign B was shown mostly to low-intent customers, two groups that start with very different propensities to convert before either campaign even runs.

## What the subgroups actually show

Split the results by customer intent and the picture flips. Among high-intent customers, campaign A converts at 80 percent and campaign B converts at 90 percent, so B wins that group. Among low-intent customers, campaign A converts at 20 percent and campaign B converts at 30 percent, so B wins that group too. Campaign B is stronger in both meaningful segments, even though campaign A leads once everyone is aggregated together. This is Simpson's Paradox: a pattern observed in aggregated data changes, weakens, or fully reverses once the data is split into the groups that actually matter. Nothing here is a math error. The aggregate rate and the subgroup rates are each calculated correctly; they just answer different questions.

## Why the population mix causes it

The reversal happens because of audience composition. Campaign A received a much larger share of high-intent customers, who convert more easily under either campaign. Campaign B received mostly low-intent customers, who are harder to convert regardless of which campaign they see. That mix pulled campaign A's overall average up and campaign B's overall average down, independent of how good either campaign actually was. Customer intent matters here because it is tied to both the composition of each campaign's audience and to the outcome being measured. That can create a composition effect and hint at confounding, but Simpson's Paradox by itself does not prove a specific confounder or establish causation.

## Two correct answers to two different questions

The aggregate comparison weights each segment by the campaign's actual audience mix, which is the real-world exposure. The subgroup comparison asks how the campaigns differ among customers with similar intent, holding that variable constant. Both are legitimate statistical views. Which one should drive a decision depends on which question the decision actually needs answered. This is not limited to marketing; the same composition problem can distort healthcare comparisons, hiring metrics, product experiments, and regional sales figures whenever groups differ in baseline outcomes and are unevenly distributed across whatever is being compared.

## Five questions before trusting an aggregate KPI

The video closes with a checklist to run before acting on any single aggregate number: which populations were combined, do the groups have different baseline outcomes, were the options exposed to different group proportions, does the pattern persist within meaningful subgroups, and which comparison actually answers the decision at hand. Simpson's Paradox does not mean aggregate metrics are always wrong, and subgroup analysis does not automatically hand you a causal answer either. Selection, measurement, sample size, and decision context still need scrutiny either way.

## Key takeaways

- Simpson's Paradox happens when a trend in aggregated data reverses, weakens, or disappears once the data is split into meaningful subgroups, without any calculation error.
- In the example, campaign A wins the aggregate 68 percent to 42 percent, but campaign B wins both the high-intent subgroup (90 to 80) and the low-intent subgroup (30 to 20).
- The cause is uneven audience composition: campaigns that reach different mixes of easy-to-convert and hard-to-convert customers will show different aggregate averages regardless of true performance.
- Aggregate and subgroup comparisons answer different questions, and picking the right one depends on the decision being made, not on which number looks better.
- Before trusting a KPI, check what populations were combined, whether their baseline outcomes differ, and whether the pattern holds up once the data is broken into meaningful groups.

## Who this is for

This is for anyone who reads marketing, product, healthcare, or hiring metrics and needs a way to check whether an aggregate number is hiding a reversed pattern underneath it.
