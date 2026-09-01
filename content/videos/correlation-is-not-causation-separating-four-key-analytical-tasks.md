---
title: "Correlation is Not Causation: Separating Four Key Analytical Tasks"
seoTitle: "Correlation vs Causation: 4 Analytical Tasks"
description: "HAI Fellow Ushasvi Rachel separates descriptive analytics, association, causal inference, and forecasting using a retail confounding example."
summary: "Rising lines on a dashboard tempt an easy causal story. Ushasvi Rachel breaks down why correlation, causal inference, and forecasting answer different questions."
keywords: ["correlation is not causation retail", "dashboard confounding variable example", "descriptive analytics vs causal inference", "seasonality promotions confounder sales", "forecasting versus causal inference", "correlation association business analytics", "humanitarians ai data literacy", "confounding problem dashboard metrics"]
generated: "article"
---

Picture a business dashboard where engagement and sales are both climbing at the same time. The temptation to connect those two lines is immediate: engagement went up, so engagement must have caused the increase in sales. HAI Fellow Ushasvi Rachel uses that exact temptation as the entry point for a clear-eyed breakdown of what a rising chart can and cannot actually tell you.

## What correlation really says

Correlation means two variables show a statistical relationship in the data available. They might rise together, move in opposite directions, or follow some other consistent pattern. That relationship can be genuinely useful: it reveals patterns, flags unusual relationships, and points analysts toward questions worth investigating further. Correlation is not useless, and it's often the right place to start an analysis. The problem begins the moment it gets treated as the end of the analysis instead of the beginning. Saying that engagement and sales rose together is accurate. Saying that higher engagement caused higher sales is a different, stronger claim, one the two rising lines alone don't establish.

## The confounding problem, made concrete

A dashboard showing both signals clearly cannot, by itself, explain why sales increased. Ushasvi walks through three plausible alternative explanations a retailer would need to rule out first. Seasonality could be driving both variables independently: during a holiday or high-demand period, more people naturally engage with a brand while more people also buy its products, with the season itself, not engagement, explaining both changes. Promotions could increase attention and purchases simultaneously, with a pricing change affecting sales on its own regardless of engagement. A product launch could generate both conversation and purchases at once, driven by the external event itself rather than by any causal link between the two metrics. If factors like these go unconsidered, their effects can get incorrectly credited to the engagement signal instead. This is the basic confounding problem: a third factor influences both the suspected cause and the outcome, and the result can look exactly like a direct causal relationship even when the underlying process is considerably more complicated.

## Four distinct analytical tasks

The core organizing idea of the video is that four different analytical tasks can use the same underlying data while answering four different questions. Descriptive analytics asks what happened in the available data. Association, which includes correlation, asks which variables displayed a relationship with each other. Both of those are genuinely valuable for understanding business conditions, but neither one establishes why a change occurred. Causal inference asks what effect a specific intervention or change would produce, using assumptions and methods designed specifically for that question rather than borrowed from descriptive or associative analysis. Forecasting asks what is likely to happen next; a forecast can be accurate without ever identifying a causal effect, and a causal estimate is not automatically a forecast either. Keeping these four tasks separate matters most at the exact point where analytics turns into a business recommendation.

## Asking the harder questions before recommending

Before turning any observed pattern into a recommendation, Ushasvi's framework is to ask what the evidence actually supports, what other explanations remain plausible, and how much uncertainty is still on the table. "Engagement and sales increase together" is an association, fully supported by the observed pattern. "Increasing engagement caused higher sales" is a causal claim, and that second statement demands a stronger methodology and more evidence than two lines moving in the same direction on a chart. Correlation stays useful for finding patterns and generating better questions to investigate. It just can't, on its own, prove cause and effect.

## Key takeaways

- Correlation describes an observed statistical relationship between variables; it does not by itself establish that one caused the other.
- Confounders like seasonality, promotions, and product launches can make two unrelated metrics rise in near-perfect unison.
- Descriptive analytics, association, causal inference, and forecasting are four distinct tasks that can share data but answer different questions.
- A forecast can be accurate without identifying a causal effect, and a causal finding is not automatically a forecast.
- Before recommending an action from a pattern, ask what the evidence supports, what else could explain it, and how much uncertainty remains.

## Who this is for

This breakdown is aimed at anyone who works with dashboards or business metrics and has felt the pull to read a causal story into two rising lines, whether in a retail context or elsewhere. It's part of the analytical work HAI Fellows like Ushasvi Rachel document as they build data literacy resources for Humanitarians AI, and it pairs directly with her follow-up work implementing scenario intelligence for the Causal Couture project.
