---
title: "When AI Agents Disagree: Part 2 — Building the Code in Mycroft"
seoTitle: "When AI Agents Disagree: Building the Code"
description: "Divij Pawar builds a lightweight cross-agent validation layer using set arithmetic, shared run IDs, and database triggers that block editing history."
summary: "Divij Pawar builds the smallest honest cross-agent validation layer he could: two agents, a symmetric-difference comparison, and a database that refuses to let anyone quietly edit its own history."
keywords: ["cross agent validation code", "mycroft ai agent disagreement", "symmetric difference agent comparison", "sqlite append only trigger", "null vs false testing distinction", "ai agent provenance tracking", "divij pawar mycroft", "set arithmetic agent validation", "auditing ai agent contradictions", "fixture agent testing methodology"]
generated: "article"
---

Building something that catches AI agents disagreeing sounds like it should require another AI, a judge model that reads two conclusions and decides which one is right. Part 2 of this project makes the opposite case: the honest version of cross-agent validation needs no judge at all, just set arithmetic, a fixture you fully control, and a database that will not let you quietly rewrite what happened.

## Starting from an empty specification

The project already had an accountability layer that made an agent's reasoning permanently part of the record, but that layer could only prove what an agent said, never whether it was actually true. Cross-agent validation was already named on the architecture diagram, fully specified, but completely unimplemented, 21,824 bytes of specification and 16 scaffolded scripts with zero shared logic connecting any of them. That gap, well-documented but never built, is what this part of the project set out to close, with the smallest honest version possible: run two agents, compare their numbers, write down where they disagree, and stop. No judge, no model, just set arithmetic.

## Reusing what already existed

Four pieces were already in place before this build started. A reasoning object held one frozen record per agent attempt, including the conclusion, the steps taken, the confidence level, and the sources used. A validation loop required output to parse into a specific structure, allowing one retry before halting, with both attempts recorded either way, since a failed attempt is itself evidence worth keeping. A SQLite store used database-level triggers to abort any update or delete, so history could not be quietly edited after the fact. And a consistency probe already scored similarity using 60% number overlap and 40% word overlap across three thresholds, previously only ever pointed at one agent compared against a repeat of itself.

## The design cuts that made this honest

Three deliberate cuts shaped the final design. First, one of the two producers being compared is a real agent already wired to live data, while the second is a handwritten fixture that returns a conclusion chosen in advance. That might sound like cheating, but it is the opposite: if both producers were real and the comparator flagged a contradiction, there would be no way to tell whether the agents genuinely disagreed or the comparator itself was broken. With a fixture in place, a wrong result can only be the comparator's fault, which makes the system testable in a way two live agents never could be.

Second, contradiction is defined strictly as numeric divergence, nothing else. There is no entailment model and no judge weighing subjective meaning. Third, the system only writes a record and stops. There is no escalation, no alert, and no new HTTP route added, which matters because the layer already had four open critical security findings, and adding no new route means adding no new exposure.

## Comparing with symmetric difference

The actual comparison logic extracts the numbers from both agents' conclusions and takes their symmetric difference, anything present in exactly one of the two sets counts as a divergence. No model interprets the numbers, no judge weighs which one is right, just set arithmetic applied directly. The existing scoring logic was not rewritten, it was repointed, using the same weights and thresholds unmodified. One rule now covers two different failure cases at once: a genuinely different value gets caught, and a missing number gets caught by that same rule too. Both agents share a single run ID, because in this design the comparison itself is the evidence. Flagging a contradiction without keeping both underlying conclusions on record would mean publishing an accusation with no exhibits to back it up.

## Twenty-one tests, and breaking them on purpose

A passing test suite by itself proves almost nothing, it only shows that the tests agree with the code, not that either one would catch a real mistake. So the tests were deliberately broken to check that they actually mattered: swapping the symmetric difference for an intersection caused seven tests to fail, and returning false instead of null when no comparison had actually run caused three more to fail. That second case points at a subtler distinction that runs through the whole design: false claims a check happened and came back clean, while null says the check could not run at all. A system that silently converts the second into the first manufactures a false sense of confidence out of what was actually a failure to check anything.

## What this build is not

The finished system has clear limits, stated plainly rather than glossed over. The comparison is numeric only, so two conclusions that disagree completely while citing the same underlying figure will pass straight through undetected. The second producer is still a fixture, so no genuine disagreement between two live agents has actually been observed yet on real data. The results are not SQL-queryable, and a flagged contradiction does not trigger any downstream action on its own.

## Key takeaways

- Cross-agent validation was fully specified on the architecture diagram but had zero implementation before this build.
- Using a handwritten fixture as one of the two producers makes the comparator itself testable, since any wrong result can only be the comparator's fault.
- Contradiction is defined strictly as numeric divergence using symmetric difference, with no judge model or entailment logic involved.
- SQLite triggers make the validation records append-only, so a flagged disagreement cannot be quietly edited or deleted later.
- Deliberately breaking the 21 passing tests, swapping logic and return values, confirmed the tests would actually catch real regressions.
- The system distinguishes null (a check that could not run) from false (a check that ran and passed), a distinction that matters for avoiding false confidence.

## Try it yourself

Paste this into Claude: find one place in your own system where a check returns false when it actually means the check could not run. That null-versus-false distinction, applied to your own code, often surfaces a hidden black box you did not know was there. This project is part of the Mycroft Financial AI work within the Humanitarians AI Fellows program.
