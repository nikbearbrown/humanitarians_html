---
title: "\"Verified\" Isn't Evidence, How to Build a Real Verification Protocol with Claude"
seoTitle: "Building a Real AI Agent Verification Protocol"
description: "Liam explains why an agent's self-check can't catch its own errors and shows a four-field verification protocol you plan before the task starts."
summary: "Liam, in for Professor Bear, explains why asking an agent to recheck its own work isn't independent verification, and walks through a four-field protocol applied to both a research task and a code change."
keywords: ["how to verify ai agent output", "why cant an ai check its own work", "independent verification protocol for claude", "what does verified actually mean ai", "citation checking with ai agents", "four field verification protocol claude", "self verification bias in llm agents", "how to check ai generated code changes"]
generated: "article"
---

Liam, in for Professor Bear, opens with a common assumption: when an agent says a task is "verified," people take that to mean the claim is true. It doesn't. Verified only means something checkable, an artifact named before the task ever started, and this video walks through what building that artifact actually looks like.

## The four-field protocol

Before an agent starts a task, the fix is to ask it to generate a verification protocol with four fields: the output type, the independent evidence that would confirm it worked, the specific check for the likeliest failure, and the artifact that has to exist afterward. Applied to a citation-summary task, the evidence is a source map, a record of which file backs which claim. Naming these fields up front, before any work begins, is what turns "verified" from a word the agent uses into something a person can go check.

## Why the obvious shortcut fails

The natural shortcut is to let the agent re-read its own summary and confirm the citations hold, since it already read every source once. If it says verified, that should be enough, except that check runs on the same reasoning that wrote the summary in the first place. A citation matched against the agent's own training data, instead of the actual paper, can get reconfirmed as verified by that exact same process. Independent evidence has to come from outside the agent's own say-so, which in this case means someone opening the cited document directly rather than trusting the agent's re-read. That's the reason the protocol is designed before the agent starts work, not bolted on after it finishes.

## What a pass actually proves

A checked artifact only proves what its specific check covers. The source map proves every claim traces back to a real document, it does not prove that the summary's interpretation of those documents is fair or complete. That limit cuts both ways: an artifact that looks different on another task isn't a verdict on the agent's reliability in general.

## The same structure on a different task

Reapplying the identical four-field card to a code change shows the fields swap entirely while the structure holds. The evidence becomes running the tests and reading the diff, and the required artifact becomes that test output plus the diff itself. Same four fields, same independent-check requirement, completely different fills depending on what the task actually is.

## Key takeaways

- "Verified" means checkable, not true, an artifact named before the task starts, not a word the agent applies after finishing.
- The four fields are output type, independent evidence, the specific check for the likeliest failure, and the required artifact.
- A self-check that reuses the same reasoning that produced the original work can reconfirm its own error as "verified."
- Independent evidence has to come from outside the agent, such as opening the actual cited document rather than trusting a re-read.
- The same four-field structure applies to very different tasks, a research summary and a code change get different fills but the identical shape.

## Who this is for

This is for anyone building or supervising agent workflows with Claude who wants a concrete, repeatable way to define what "verified" means before trusting an agent's output on a citation, a summary, or a code change.
