---
title: "The Verifier Never Sees Your Thinking"
seoTitle: "Why Claude's Proof Verifier Never Sees the Reasoning"
description: "Liam explains how Claude's math-olympiad skill hides all reasoning from its own verifier, checking only the finished proof against a checklist of known mistakes."
summary: "Liam breaks down Claude's math-olympiad skill, which checks problem interpretation first, runs parallel solvers, then strips away all reasoning before a fresh verifier attacks only the bare finished proof."
keywords: ["how does claude verify competition math proofs", "why hide reasoning from an ai verifier", "claude math olympiad skill explained", "asymmetric voting for proof verification", "why ai checkers agree with visible reasoning", "parallel solvers with self-check in claude", "checking a proof without seeing how it was built", "claude plugins adversarial proof check"]
generated: "article"
---

Someone might assume that showing an AI checker everything, the full reasoning behind a proof, would help it decide whether that proof is correct. Liam explains why Claude's math-olympiad skill does the opposite: its verifier only ever sees the finished proof, never the thinking that produced it.

## Checking the reading before solving anything

Before attempting to solve a competition math problem at all, Claude first checks how the problem could be interpreted. Competition problems often bury an easy reading right next to a harder one, and in past runs, most errors traced back to solving the wrong reading entirely rather than making a mathematical mistake. Settling the intended interpretation first heads off an entire category of error before any actual solving begins.

## Solving the same problem many ways in parallel

Once the intended reading is settled, eight to twelve solvers tackle the problem in parallel. Each one works independently, iterating through solve, self-check, and revise cycles, up to five rounds, using reasoning only, with no calculator and no code. This parallel, self-checking approach produces multiple independent attempts at the same problem rather than relying on a single pass.

## Hiding the reasoning before verification

Here is the key step: before any proof reaches a verifier, everything except the finished argument gets deleted, every false start and every scratch note. A verifier that saw the reasoning behind a proof tends to agree with it, whether that reasoning is actually right or wrong. A verifier that sees only the clean, finished proof has nothing to agree with except the logic laid out on the page.

## An asymmetric vote among fresh verifiers

Fresh verifiers then attack the bare proof against a checklist of known mistakes. The vote that follows is asymmetric: four clean checks are needed to confirm a proof, but just two flagged holes are enough to send it back for reconsideration. That asymmetry means the system is built to be more suspicious of a proof than confident in it, tilting toward catching subtle errors rather than waving them through.

## Why hiding the reasoning actually matters

A verifier reading a full page of confident-sounding reasoning tends to start nodding along before it even reaches the last line, agreeing with the flow of the argument rather than checking it line by line. That is exactly what happens when reasoning stays visible to the checker. Show the verifier only the bare proof instead, and it has no choice but to find any gap on its own, using the checklist of known mistakes rather than following along with reasoning it never saw being built. That is precisely the condition under which the checklist catches something a nodding-along verifier would have missed.

## The result: a verifier that would rather abstain than guess

Claude checks a competition proof only after hiding the reasoning that built it, using a verifier that cannot agree with logic it has never seen, and one that would rather return no confident solution than guess. This architecture exists precisely because a single unchecked pass through a problem can be wrong, and the whole point of hiding the reasoning is to force a genuinely independent check rather than a rubber stamp.

## Key takeaways

- Claude's math-olympiad skill checks problem interpretation first, since most past errors came from solving the wrong reading rather than making a math mistake.
- Eight to twelve solvers work the problem in parallel, each iterating through solve, self-check, and revise cycles using reasoning alone.
- Every false start and scratch note is deleted before a proof reaches a verifier, leaving only the finished argument.
- A verifier that sees reasoning tends to agree with it regardless of correctness; a verifier that sees only the bare proof has to evaluate the logic itself.
- The verification vote is asymmetric: four clean checks confirm a proof, but just two flagged holes are enough to send it back.

## Who this is for

Anyone curious about how Claude's Skills architecture builds genuine self-checking into a reasoning task, particularly people interested in AI verification design, competition mathematics, or building adversarial review steps into their own AI workflows.
