---
title: "When AI Agents Disagree: Part 1 — The Mechanics of Cross-Agent Validation in Mycroft"
seoTitle: "Cross-Agent Validation: When AI Agents Disagree"
description: "HAI Fellow Divij explains why detecting disagreement between AI agents is easier and more useful than checking correctness, and where naive fixes go wrong."
summary: "HAI Fellow Divij explains why checking whether AI agents disagree is more tractable than checking correctness, and walks through the traps that make naive fixes worse than nothing."
keywords: ["cross agent validation ai", "self consistency sampling ai limitations", "information asymmetry ai debate", "adversarial debate ai agents", "ensembling correlated errors ai", "ai agent disagreement types", "ablation study ai validation", "mycroft financial ai validation"]
generated: "article"
---

Two AI agents look at the same company and produce two different numbers for revenue growth. One says 12%, the other says eight. There's no way to know which one is right just by looking at them, and neither does the system that produced them. But you can know, with certainty, that at least one of them is wrong. That gap, between not knowing which answer is correct and knowing for certain that something is off, is the entire foundation of this video's argument about how to validate AI systems in practice.

## Why correctness is the wrong first question

Checking whether an AI's answer is correct requires ground truth you usually don't have. If an agent produces a paragraph of confident financial analysis, there's almost no direct way to verify it; you could read its reasoning, but that reasoning is also generated text, and a model that confabulated its conclusion will just as happily confabulate a convincing explanation for it. That's not described as a rare edge case but as the default behavior of these systems: any system graded only by its own output will always look consistent, because consistency is all it was ever asked to produce. A system running smoothly and self-report being fine was never proof that it's actually right.

## The asymmetry that makes disagreement useful

The cheapest way to sanity-check a model is self-consistency sampling: ask the same model the same question twice and see whether the answers match. But two samples pulled from one model aren't two independent opinions, they're two draws from the same underlying distribution. The key insight is an asymmetry: high consistency between those two draws is only weak positive evidence that the answer is correct, since two identical hallucinations are still hallucinations, but low consistency is strong negative evidence that something is wrong. Disagreement, in other words, tells you something real, without requiring any external ground truth at all. That's what makes checking for disagreement a more tractable strategy than checking for correctness.

## Two traps that make the obvious fix worse

The natural next step, once you buy the disagreement argument, is to have two different agents compare answers and flag mismatches. That fix runs into two traps. The first is information asymmetry: adversarial debate between agents only surfaces truth when the agents have actually seen different evidence. If they've seen the same evidence, their "debate" is really just a persuasion contest, functionally one witness being asked twice in two different accents. The second trap is worse because it looks like a reasonable fix: when two agents disagree, the instinct is to average their outputs or bring in a third agent to vote. But averaging and majority voting only cancel out errors when those errors are independent, and correlated agents produce correlated mistakes. A majority built from correlated agents isn't really a majority at all.

## Sorting disagreement into four types

Once you're detecting disagreement rather than trying to resolve it outright, the research sorts most disagreements into four categories. Stylistic disagreement is the same substance expressed in different words, and doesn't need to be flagged. Noise is disagreement that, if flagged every time, will train you to ignore real alerts, essentially crying wolf. Reasoning disagreement happens when two agents follow genuinely different paths to different, high-confidence, mutually exclusive conclusions, and that is the real signal worth surfacing rather than papering over with a false consensus. A fourth category covers adversarial agents that fake agreement rather than genuinely converging.

## A cheap classifier that saves real money

A staged detection approach, where a cheap classifier handles the bulk of the sorting work, is presented as the practical path forward. In the research cited, a lightweight classifier handled about 73% of agent-response pairs with no model call required at all, escalating only the genuinely uncertain cases to a more expensive check. That approach produced a 62% reduction in cost while holding accuracy at 90.8%. The broader principle behind that number: a cheap check you can afford to run on every single case beats a more sophisticated check you can only afford to run on a sample.

## What the ablation study actually shows

The most mature systems in this space run many specialized agents across multiple phases, evaluated against hundreds of questions, and one published ablation study makes clear what actually drives performance. Removing the adversarial debate component dropped faithfulness by 0.119, by far the largest drop measured. Removing a more elegant source-weighting matrix cost only 0.006, essentially nothing. The conclusion drawn from that gap is pointed: the sophisticated machinery matters far less than simply having something in the system whose entire job is to disagree.

## Key takeaways

- Correctness requires ground truth you usually don't have; detecting disagreement between agents requires none at all.
- Self-consistency sampling has a built-in asymmetry: agreement is weak positive evidence, disagreement is strong negative evidence.
- Adversarial debate only produces useful signal when agents have seen genuinely different evidence; otherwise it's a persuasion contest, not validation.
- Averaging or majority-voting across agents can amplify shared, correlated errors instead of canceling them out.
- Disagreements sort into four types: stylistic, noise, reasoning, and adversarial, and only reasoning disagreement should be surfaced rather than smoothed over.
- A staged, cheap classifier that screens most pairs before escalating uncertain ones can cut validation cost significantly while holding accuracy steady.

## Try it yourself

The video closes with a direct exercise: paste a prompt into Claude describing two AI agents you already run, and ask what different evidence each would need to see for their disagreement to mean something about the world rather than something about your prompt. If Claude can't name two genuinely different evidence sources for your setup, you don't have two independent witnesses, you have one witness asked twice. This is part of ongoing cross-agent validation work within the Mycroft Financial AI project at Humanitarians AI Fellows, with a follow-up video covering the actual implementation.
