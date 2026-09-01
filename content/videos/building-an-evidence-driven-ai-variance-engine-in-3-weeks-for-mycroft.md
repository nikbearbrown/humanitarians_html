---
title: "Building an Evidence-Driven AI Variance Engine in 3 Weeks for Mycroft"
seoTitle: "Building an Evidence-Driven AI Finance Variance Engine"
description: "Fellow Adwait Changan built a three-week evidence-driven finance variance agent for Mycroft that computes deterministic budget-to-actual bridges."
summary: "Over three weeks, Mycroft fellow Adwait Changan built a local agent that computes financial variances deterministically, traces every number to its source, and refuses to guess why the numbers moved."
keywords: ["evidence driven ai finance agent", "deterministic variance engine build", "ebitda variance bridge explained", "synthetic ledger dataset validation", "ai agent financial provenance", "mycroft finance investigator", "budget to actual variance calculation", "materiality rules finance automation"]
generated: "article"
---

Most finance AI demos promise to explain why a number moved. The Mycroft finance investigator, built by fellow Adwait Changan over three weeks, does something narrower and more deliberate: it computes exactly how the numbers moved, traces every figure back to its source, and then stops, handing the "why" and the sign-off to a human. The interesting part of this project isn't that it does the math. It's where it stops.

## Week one: building books before building an engine

Before any engine can find a variance, it needs books to read. The first week was spent building six synthetic datasets from scratch, no real company data required: budgets, actuals, and the underlying ledger transactions, plus customers, headcount, and the account mappings that tie a raw transaction to a line on the income statement. These weren't just spreadsheets. Every table shipped with a schema, a provenance record noting where each number came from, and validation rules that a row had to pass before it could ever reach the engine. The first run validated 43 data rows across the six synthetic datasets, and any row that failed validation simply never made it into the pipeline.

## Week two: a deterministic variance bridge

The second week built the actual math engine, designed so that the same inputs always produce the same answer, with no model guessing involved anywhere in the middle. The engine computes four variances: revenue, expense, payroll, and EBITDA. It then does the less glamorous but essential work: applying materiality rules so a two-dollar gap doesn't get flagged the same way a hundred-thousand-dollar one does, reconciling control totals so the parts still sum to the whole, and tracing every calculated number back to the source records it came from. The sample run produced a clear headline: budgeted EBITDA of $350,000 against actual EBITDA of $230,000, a gap of $120,000. The engine's job was to decompose that $120,000 bridge, showing exactly how much of the gap came from revenue, how much from expense, and how much from payroll, all the way down to the underlying transactions.

## Week three: wrapping the engine in an agent

The third week wrapped the deterministic engine in a local, evidence-driven agent, running with no external model in the loop. The agent is conditional: it selects which finance tools to use based on what the data actually shows, not a fixed script. As it works, it retains evidence records and an execution trace of every step it takes. At the end, it produces two reports from the same run: one machine-readable, meant for the next system in a pipeline, and one human-readable, meant for a reviewer. The sample run generated seven investigation steps, retained 41 evidence references, and passed 12 tests. Every claim in the final report points back to a specific record; nothing gets asserted that the trace can't support.

## The boundary is the design, not a limitation

The project's core claim is that Mycroft is an evidence engine, not an oracle. It validates the underlying books, computes variances deterministically, and shows its full work, from budgeted EBITDA all the way to actual, traced back to source. What it deliberately does not do is tell you why revenue missed its target, or sign off on the result. It explains the mathematical performance bridge and hands business causation and final approval to a human finance reviewer. That's stated as an intentional design choice, not something the system fell short of.

## A stated caveat

One caveat is stated plainly: this is a synthetic sample and a draft workflow. Materiality judgment, causal explanations for why numbers moved, and distribution of the final reports still require a named human finance reviewer in the loop. The system computes and traces; it does not judge or approve.

## Key takeaways

- The project built six synthetic financial datasets with schemas, provenance records, and validation rules before any variance math was written, validating 43 data rows in the first run.
- The variance engine is fully deterministic, computing revenue, expense, payroll, and EBITDA variances the same way every time, with materiality rules and control-total reconciliation built in.
- A sample run bridged a $120,000 gap between budgeted EBITDA ($350,000) and actual EBITDA ($230,000), tracing the gap to its component causes.
- The agent wrapping the engine runs locally with no external model, retains an evidence trail, and produces both a machine-readable and a human-readable report from each run.
- The sample run logged seven investigation steps, 41 retained evidence references, and 12 passed tests.
- The system deliberately explains the math and traces the numbers but does not assert business causation or sign off on results; those steps are reserved for a human finance reviewer.

## Try it yourself

The closing challenge is to design your own version of this boundary: build a deterministic finance variance engine that traces every calculated number back to a source record, wrapped in an agent that retains evidence and writes both machine and human reports but never states a business cause it can't trace. This project is part of the Mycroft Financial AI initiative from Humanitarians AI Fellows.
