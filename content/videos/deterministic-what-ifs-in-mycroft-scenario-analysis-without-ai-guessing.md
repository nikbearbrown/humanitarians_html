---
title: "Deterministic What-Ifs in Mycroft: Scenario Analysis Without AI Guessing"
seoTitle: "Deterministic What-If Scenarios Without AI Guessing"
description: "Onyx walks through how Mycroft's finance engine runs what-if scenarios with strict deterministic math, verified baselines, and no model guessing at all."
summary: "Mycroft's scenario engine answers financial what-ifs with pure deterministic arithmetic bound to a hashed, verified baseline, refusing to forecast or recommend."
keywords: ["deterministic financial scenario analysis", "mycroft finance investigator what if", "ebitda scenario modeling no ai", "baseline file hash verification finance", "financial scenario simulation not forecast", "percent of actual assumption modeling", "ai agent refuses to forecast", "financial modeling without llm guessing"]
generated: "article"
---

Finance teams ask what-if questions constantly: what happens to EBITDA if revenue moves, or if costs move. The danger is subtle but real, an AI agent asked that question can quietly let an illustrative assumption slide into sounding like a forecast, or worse, a recommendation. This update walks through an engine built specifically to do the arithmetic and refuse to do the deciding.

## The temptation an agent has to resist

The failure mode this system is designed against is easy to miss. You ask an agent what happens if revenue rises 5%, it answers, and somewhere in the phrasing the assumption quietly becomes a forecast, or a suggestion to actually go do it. A scenario is a hypothetical by definition. The moment a system implies a probability or picks a winner among outcomes, it has crossed from arithmetic into a kind of judgment it was never authorized to make.

## Binding every scenario to a verified baseline

Every scenario in this system is bound to an exact baseline run, and the CSVs behind that baseline are rehashed and checked against the run log before a single number is allowed to move. If a source file has changed by even one byte, the scenario refuses to run at all, on the principle that you cannot run a what-if on data you have not verified. The assumptions layered onto that baseline are just as constrained: only two methods are allowed, an explicit dollar amount or a percent of the verified actual, and every assumption carries its own reasoning and source so its lineage survives. Duplicate categories are rejected, non-finite values are rejected, and any assumption that would push a category negative is rejected outright.

## Boring, deterministic math on purpose

The arithmetic itself is deliberately unremarkable: a percent assumption scales the verified actual, an amount adds a fixed figure, and every result is quantized to the cent. No sampling, no model involvement, no randomness anywhere in the calculation. Run the same scenario a thousand times and you get the identical result in cents every time, which is exactly the property you want from a system whose entire job is to compute, not to estimate.

## Three exercises against one verified baseline

The demonstration runs three scenarios against a verified actual EBITDA of 230,000. A 5 percent revenue recovery exercise lifts that figure to 275,500. A $20,000 reduction in COGS brings it to 250,000. A balanced operating exercise, combining a little more revenue, a little more payroll, and a little less overhead, lands at 252,300. Each of the three is traceable back to its exact assumption, with the engine writing two artifacts for every run: a machine log and a human-readable decision pack.

## Refusing to choose

Every output carries the same four labels regardless of which scenario produced it: this is a simulation, not a forecast; recommendation, none; decision, human required; adequacy, pending human review. The numbers land on the page, but the choice of what to do with them is explicitly handed back to a person. This update also adds a full scenario test suite, bringing the project to 32 passing tests covering the hashing, the rejected inputs, the deterministic arithmetic, and the labeling itself, so the guardrails are enforced and checked rather than living only as a comment in the code.

## Key takeaways

- The engine performs what-if arithmetic without letting an assumption slide into sounding like a forecast or a recommendation.
- Every scenario is bound to a verified baseline through file hashes; if a source file changes, the scenario refuses to run.
- Assumptions are restricted to two methods, an explicit amount or a percent of the verified actual, with rejected inputs for duplicates, non-finite values, and negative results.
- The math is fully deterministic and quantized to the cent, with no sampling, no model, and no randomness in the calculation path.
- Every output is stamped as a simulation, not a forecast, with no recommendation, and decision authority explicitly left to a human reviewer.
- The update brings the project's test suite to 32 passing tests, covering hashing, input rejection, deterministic arithmetic, and labeling.

## Try it yourself

There is a real question worth sitting with here: should an agent calculate the scenario, or decide which future the business should choose? This kind of boundary between computation and judgment is exactly the design discipline behind the Mycroft Financial AI project, part of the Humanitarians AI Fellows program.
