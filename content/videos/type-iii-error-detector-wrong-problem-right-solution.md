---
title: "Type III Error Detector, Wrong Problem, Right Solution"
seoTitle: "The Type III Error: Getting the Right Answer, Wrong Problem"
description: "Liam explains Type III errors, solving the wrong problem correctly, and a reframing test that checks whether an AI answer actually addresses the real issue."
summary: "Liam uses a support-ticket example to explain Howard Raiffa's Type III error, then walks through a reframing test that states a problem several honest ways to check whether a candidate answer solves the real problem or just satisfies the literal ask."
keywords: ["what is a type iii error howard raiffa", "how to check if ai solved the right problem", "reframing test for ai problem solving", "why hiding a support button is the wrong fix", "solving the wrong problem correctly explained", "how to test an answer against multiple framings", "ai optimizes stated objective not real goal", "prompt for testing claude answer against reframings"]
generated: "article"
---

Ask Claude to cut support-ticket volume, and one answer comes back fast: hide the contact button. Tickets really do drop, from 300 a week to under 50. The ask is technically satisfied. Liam explains why that answer is still wrong, and names the pattern behind it.

## What a Type III error actually is

Statistician Howard Raiffa had a name for solving the wrong problem correctly: a Type III error. Hiding the contact button satisfies the literal instruction to reduce ticket count, and the numbers prove it. But nothing about why people needed help in the first place got addressed. The button hid the problem from view without fixing it. AI systems are particularly prone to this failure mode, because they optimize the objective that was written down, not the one that was actually meant.

## Why the natural check fails

The obvious way to check an answer is to ask: does this satisfy what I asked for? Hide the button, and the ticket count says yes. But ask the same underlying problem a second, honest way, why do people need support in the first place, and hiding the button answers nothing. It only stops the counting. This shows why a single check against the literal ask is not enough on its own.

## The reframing test

The fix is to state the problem more than one honest way and see which candidate answers survive all of them. Concretely: state the problem several distinct ways, zoom out to the bigger underlying goal, zoom in to specifics, swap who is doing the acting, and write one candidate answer for each framing. Then test every answer against every framing, not just the one it was generated for.

## Reading divergence and collapse correctly

An answer that only survives its own framing has taught you something real: it reveals that the framings actually differ from each other. An answer that survives all the framings usually means the framings never genuinely differed in the first place, which is itself a warning sign that the test was not rigorous enough.

Answers that diverge across framings do not prove you have found the right problem. They only prove that the framings were genuinely different questions. Deciding which one to actually act on is still a judgment call that belongs to the person, not the test.

Answers that collapse into one do not mean nothing else exists to be discovered. It means the framing needs to keep going. Adding a question like why is self-service blocked can surface a different fix entirely, such as better search, one that survives some framings and fails others. That kind of partial survival is exactly the signal the button-hiding fix never produced.

## Why this matters

Getting the right answer to the wrong problem is still getting it wrong. Reframing the problem before trusting the answer is what catches this, because a technically correct response to a poorly stated problem can look successful by every literal measure while leaving the actual issue untouched.

## Key takeaways

- A Type III error, a term from Howard Raiffa, means solving the wrong problem correctly, satisfying the literal ask while missing the real issue.
- AI systems are especially prone to Type III errors because they optimize the objective as written, not the intent behind it.
- The reframing test states a problem several honest ways, zooming out, zooming in, or swapping who is acting, and tests each candidate answer against every framing.
- An answer surviving only its own framing reveals the framings genuinely differ; an answer surviving every framing suggests the framings were not different enough.
- When answers collapse into one across framings, the fix is to add another honest framing and keep testing, not to treat it as a dead end.

## Who this is for

Anyone using AI to solve business or operational problems who wants a concrete method for checking whether a technically satisfying answer actually addresses the underlying issue, rather than just the literal request.
