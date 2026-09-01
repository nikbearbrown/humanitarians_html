---
title: "Computer Use: Demo to Production."
seoTitle: "Computer Use Agents: Demo to Production"
description: "Seven changes that turn a naive computer-use agent loop into a production system, cutting screenshot token costs 70 to 80 percent and adding trajectory logging."
summary: "A working computer-use demo isn't production ready just because it runs longer. This breaks down the seven changes that make the loop cheaper and its actions auditable."
keywords: ["computer use agent production", "claude computer use token cost", "reduce screenshot tokens claude", "computer use trajectory logging", "agentic loop cost optimization", "claude vision screenshot resize", "computer use sandbox best practices", "claude system prompt caching"]
generated: "article"
---

There's a common assumption that a computer-use demo becomes production-ready simply by letting it run longer. It doesn't work that way. The naive loop, take a screenshot, send the full image to Claude, get an action back, repeat, has a running bill that gets worse the longer the task goes, and running longer just means paying that bill more times. The real fix isn't more runtime, it's a leaner loop.

## The naive loop's real cost

A full-resolution screenshot costs around 1,200 tokens on its own, before Claude has taken a single action. That adds up fast: a 10-step loop already spends 12,000 tokens purely on screenshots before any useful work happens. Scale that further and the problem compounds. A 20-step task with no changes made along the way burns something like 40,000 tokens on screenshots alone, before a single action token is spent. That's the demo's real bill, and it only grows as the task gets longer, which is precisely why "just run it longer" is the wrong instinct.

## Seven changes that make it production-grade

The production version of the loop makes seven specific changes:

1. **Resize every screenshot** to about 1568 pixels wide, the resolution Claude's vision already performs best at, so you're not paying for pixels that don't improve the model's read of the screen.
2. **Drop screenshots older than the last few steps**, since a stale image from ten steps ago rarely still matters to the current decision.
3. **Batch tool calls** instead of sending them one at a time.
4. **Cache the system prompt** so it isn't resent and re-processed on every single step.
5. **Compact the history server-side** rather than letting the full conversation grow unchecked.
6. **Run actions in a sandbox**, isolating what the agent can actually touch.
7. **Record every action as a structured trajectory event**, creating a log of what the agent did at each step.

## What the savings actually look like

Applied to that same 20-step task, resizing and pruning screenshots alone cut the screenshot bill by 70 to 80 percent. The reason the number is that dramatic is that the savings compound rather than simply add together: a smaller image costs less per screenshot, and dropping older screenshots means fewer images are being paid for at all, so the two effects multiply against each other rather than stacking linearly.

## The seventh change answers a different question

The first six changes are about cost. The seventh, trajectory recording, isn't. A logged run proves what the agent did, not that it did the right thing, which is an important distinction to hold onto. But the flip side matters just as much: a run with no log doesn't mean nothing went wrong. It means you can't tell either way. Structured trajectory logging, capturing things like action type, the target element, and screenshot state before and after, is what turns an autonomous run from a black box into something you can actually review.

## Production means leaner and logged, not just longer

The core distinction this walkthrough draws is that production isn't the demo running longer, it's every screenshot made leaner and every action logged, so the cost holds up over time and so does the record of what happened. Those are two separate engineering problems, and both need to be solved before a computer-use agent is genuinely ready to run unattended.

## Key takeaways

- A naive computer-use loop costs around 1,200 tokens per full-resolution screenshot, which compounds fast: 12,000 tokens for a 10-step task, roughly 40,000 for a 20-step task, before any action tokens are spent.
- Resizing screenshots to about 1568px wide and dropping older screenshots cut the screenshot bill 70 to 80 percent in the source's reported case, because the two savings compound rather than add.
- The other production changes are batching tool calls, caching the system prompt, compacting history server-side, and running actions in a sandbox.
- Trajectory logging, the seventh change, addresses oversight rather than cost: a logged run proves what happened, not that it was correct.
- An unlogged run isn't necessarily error-free, it's simply unverifiable.

## Try it yourself

The video closes with a concrete exercise: design a trajectory logging schema for a computer-use agent, covering action type, target element, screenshot hash before and after, a confidence score, and whether human confirmation was requested, then ask what else the log needs to make oversight meaningful rather than just nominal. Run that against your own computer-use or agentic-loop setup today. This walkthrough is part of the Claude Basics playlist from Humanitarians AI, with code available in the linked GitHub repository.
