---
title: "Are You Supervising Claude at the Right Level?"
seoTitle: "Matching AI Supervision to the Task Stakes"
description: "Liam explains the Sheridan-Verplank automation levels applied to Claude, and a flag rule for catching high-stakes work checked too quickly."
summary: "Liam applies the 1978 Sheridan-Verplank automation framework to Claude, showing how the same quick glance can be fine for a variable rename but dangerous for a full architecture proposal."
keywords: ["how much should i check claude ai output", "sheridan verplank levels of automation explained", "how to calibrate trust in ai answers", "checking ai output matched to task stakes", "why does a quick glance miss high stakes ai errors", "three levels of ai supervision copy paste research collaboration", "ai supervision self audit last ten interactions", "flag rule for catching under checked ai work"]
generated: "article"
---

Liam, in for Professor Bear, tackles a question that sounds simple but usually is not: are you trusting Claude the same amount every time, or the right amount for what you actually asked it to do.

## The assumption that falls apart

Most people treat trust in AI as a single comfort level they set once and keep steady. But renaming a variable and asking Claude to propose a whole system architecture are not the same task. One is quick and low stakes; the other hands over a real decision. A fixed comfort level cannot tell the two apart, and the mismatch stays invisible until someone actually compares what was asked for against how closely it got checked.

## The three levels that matter

Liam draws on Sheridan and Verplank, who catalogued ten levels of automation back in 1978 for humans supervising machines generally. Applied to AI, three of those levels matter. Level one is copy-paste use, a quick edit you could just as easily have made yourself. Level two is research-level use, leaning on the model to gather or summarize something you would otherwise have to dig for. Level three is true collaboration, where the model is proposing the approach rather than just executing yours.

## Priya's afternoon

The video's anchor example is Priya on one ordinary afternoon. She asks Claude to rename a variable, level one, and gives it a quick glance, which is fine and calibrated. She asks it to cite a market size, level two, and gives it that same quick glance, which falls below the line. She asks it to propose a whole system architecture, level three, and gives it that same quick glance again, which falls far below the line. Same glance every time, three very different amounts of trust actually handed over.

## The flag rule

The fix Liam offers is a simple rule: flag any interaction where the checking was short but the task handed over a real decision, high stakes barely glanced at. That is the dangerous case, not necessarily the careful one. Liam is explicit about one limit here: Sheridan and Verplank never wrote this framework with AI chat in mind, so applying their 1978 automation levels to Claude is an adaptation, not something they specified themselves.

## What the flag proves, and what it does not

Running the rule on Priya's afternoon catches exactly what you would expect: the market-size answer and the architecture proposal both light up, and the variable rename does not. But Liam is careful about the limits of the flag in both directions. A flag proves only that the checking did not match what was handed over, not that the answer itself was wrong. And no flag on the variable rename does not prove nothing was missed there either; it just means this particular rule was not built to catch that kind of mistake.

## Key takeaways

- Trusting AI the right amount is not one fixed habit, it is calibrated to the specific task, task by task.
- The three levels that matter for AI use are copy-paste, research-level, and true collaboration.
- A quick glance can be calibrated for a level-one task and dangerously insufficient for a level-three task.
- The flag rule catches high-stakes work that got short checking, which is the dangerous mismatch to watch for.
- A flag proves the checking effort did not match the stakes; it does not prove the answer was actually wrong.

## Who this is for

This is for anyone using Claude or a similar assistant across a range of tasks who wants a concrete way to check whether their review effort actually matches how much they are handing over.
