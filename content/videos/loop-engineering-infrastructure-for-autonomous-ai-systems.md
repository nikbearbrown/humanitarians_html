---
title: "Loop Engineering: Infrastructure for Autonomous AI Systems"
seoTitle: "Loop Engineering: Infrastructure for Autonomous AI"
description: "A framework for deciding when an AI system should trigger and check itself, built around two hard requirements and a four-question test."
summary: "Loop engineering replaces turn-by-turn prompting with self-triggering, self-checking AI systems, but only earns its cost when a task passes a specific four-question test."
keywords: ["loop engineering ai automation", "when to automate ai tasks", "autonomous ai agent triggers", "verifiable exit condition ai loop", "ai automation cost vs time", "boris cherny claude code loops", "nightly dependency update automation", "ai iteration caps and spend control", "self checking ai systems"]
generated: "article"
---

The first reaction to loop engineering is almost always about money: won't a system that runs itself repeatedly just burn through more tokens than a single prompt? That reaction is understandable, and also the wrong place to focus, because token cost was never the variable that decides whether a loop is worth building.

## What a loop actually is

A loop replaces turn-by-turn prompting with a system that prompts itself. Instead of a person typing a request each time work is needed, the system triggers on its own, runs, checks its own output, and decides the next step, with no human involved in any individual run. Boris Cherny, who leads Claude Code, is cited as saying his job now is writing loops, which signals how far this pattern has moved from an experimental idea into a real day-to-day engineering practice.

## The real cost question

Loops genuinely do cost more per task than a single prompt: repeated context, extra tool calls, and iteration all add up. But that's not the number that should decide whether to build one. The actual question is whether the time saved is worth what the loop costs to run. A loop that's more expensive per execution but eliminates hours of manual, repetitive work can still be a clear win; a cheap loop that saves nobody meaningful time is still a bad investment.

## The two non-negotiable requirements

Before building any loop, two things have to be true. First, there needs to be a clear trigger, something concrete that starts the run: a schedule, a GitHub event, a file change. Miss this and the loop simply never runs. Second, there needs to be a verifiable exit condition, some way the system can determine it is actually done: tests passing, a metric clearing a threshold, or a human giving explicit approval. Miss this and the loop never knows when to stop, which is arguably the more dangerous failure mode of the two.

## A worked example: nightly dependency updates

The case study run through this framework is nightly dependency updates, and it's tested against four direct yes-or-no questions. Is there a clear trigger? Yes, a nightly schedule. Is there a verifiable exit? Yes, the test suite passing. Can the system check itself? Yes, because tests are deterministic. Does the task repeat often enough to be worth the setup? Yes, every night, across every repository. Four yeses means this task earns a loop. That's described as the sweet spot for automation generally: repetitive, well-defined, high-volume work, things like nightly refactors, babysitting pull request reviews and test runs, reconciling invoices or data, or overnight code that gets reviewed the next morning.

## Where loops quietly fail

The framework is just as specific about where loops go wrong. One-off, judgment-heavy work is the first failure mode, tasks with no reliable, automatic way to check whether the output is actually correct. The second is high-frequency runs with no caps in place, where an agent gets stuck retrying without a stopping point and quietly burns real money in the background. The line that captures the risk best: looking busy is not the same as being done. A loop that appears to be working through iterations isn't evidence of progress unless there's a deterministic way to confirm the output actually improved.

## Keeping a loop's cost under control

For any loop that does earn its place, the framework lays out concrete guardrails: cap iterations, time, and total spend before the loop ever runs; use cheaper models to generate candidate work and reserve stronger, more expensive models for verification; externalize repeated context into reusable skills or caching rather than re-sending the same material on every run; and prefer deterministic checks, like tests and linters, over having the AI grade its own output. That last point matters because self-grading is exactly the kind of soft, unverifiable check that lets a loop keep running long after it should have stopped.

## The audit prompt

The framework closes with a compact, three-question test meant to be run against any task someone is tempted to automate: is there a trigger and a stop condition, can verification run on its own, and does the task repeat enough to earn the setup. If all three can be answered clearly, build the loop. If not, a plain, one-off prompt is still the better tool.

## Key takeaways

- Loop engineering means building a system that triggers, runs, and checks itself, rather than being prompted turn by turn.
- Per-task token cost is not the deciding factor; the real question is whether the time saved justifies the setup and running cost.
- Every loop needs both a clear trigger and a verifiable, deterministic exit condition before it's worth building.
- The best fit for automation is repetitive, well-defined, high-volume work; one-off, judgment-heavy tasks are where loops break down.
- Cost discipline matters even for loops that earn their place: iteration caps, cheap-to-generate/strong-to-verify model pairing, and deterministic checks over AI self-grading.

## Who this is for

This is for anyone building agentic or automated AI workflows and trying to decide which tasks actually deserve a self-running loop versus a simple prompt. It comes from Muskan, a fellow in the Humanitarians AI Fellows program, breaking down a framework meant to be applied directly to your own automation candidates before you build anything.
