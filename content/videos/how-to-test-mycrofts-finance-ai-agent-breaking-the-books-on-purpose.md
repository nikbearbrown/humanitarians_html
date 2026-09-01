---
title: "How to Test Mycroft's Finance AI Agent: Breaking the Books on Purpose"
seoTitle: "How to Test a Finance AI Agent by Breaking It"
description: "Adwait explains how the Mycroft team built an adversarial testing harness that plants tiny dollar-level defects to prove the finance agent fails safely."
summary: "A clean test run proves almost nothing about a finance AI agent. Adwait breaks down the adversarial harness that plants tiny defects to prove the controls actually catch errors."
keywords: ["adversarial testing ai finance agent", "mycroft finance investigator testing", "reconciliation defect testing harness", "ai agent fails safely test", "synthetic evaluation harness finance", "agent step limit guardrail test", "ledger mismatch dollar defect test", "ai agent unauthorized gate clearing"]
generated: "article"
---

A successful test run on clean data proves almost nothing about whether an AI system's controls actually work. That's the hard truth Adwait opens with in this look at how the Mycroft Finance Investigator gets tested. Last week's run went clean and produced a verified variance, but a green light on good data doesn't tell you what happens when the data is wrong. This week, the team broke the books on purpose to find out.

## Why a passing run isn't proof

A finance control only means something if it catches a real error when one shows up. If the numbers don't reconcile, the system has to reject them outright, not quietly compute a wrong answer and move on as if nothing happened. And if the agent tries to overreach its authority, the gate stopping it has to actually hold. None of that can be learned from a run where everything handed to the system was already correct. You have to feed it failures to find out whether the controls are real or just theater.

## Designing the adversarial harness

The evaluation harness Adwait describes works by making a fresh temporary copy of the synthetic data for every single test case, planting exactly one defect into that copy, and then observing what the system actually does: does it validate, investigate, or send the case to review? The result gets checked against an explicit, written expectation for that case. Crucially, the real books are never touched in any of this. The damage is fully sandboxed, and the outcome gets compared against the expectation rather than judged by feel.

## Four reconciliation defects, each tiny on purpose

Four of the planted defects target reconciliation, the checks that confirm the books agree with themselves. They are an actuals-to-ledger mismatch, an unmapped account, a customer-to-revenue mismatch, and a headcount-to-payroll mismatch. Each one should get caught at validation and rejected before it can ever reach the deeper analysis engine. The defects are deliberately tiny, and that's the entire point of the design: a ledger mismatch is just one dollar off on the first actuals row, an unmapped account is a single row popped out of the mapping table, and the customer and headcount mismatches each shift a single number by one dollar. If a defect that small can slip through undetected, the control isn't actually functioning.

## Testing behavior, not just data

Two more test cases target behavior rather than data quality. One caps the investigator agent at a single step and checks that it actually stops instead of running indefinitely. The other has an agent attempt to approve its own decision, testing whether the system correctly refuses that kind of unauthorized self-approval. Against all six of these failure cases stands a valid baseline: the same clean run from before, reproducing a variance of minus $120,000 in EBITDA, in seven steps, backed by 41 evidence references, with an open human gate at the end.

## The scorecard, and its honest limits

The evaluate command runs every case in its own sandbox and produces a scorecard. Seven of seven expectations matched: four defects correctly rejected, two behavioral overreaches correctly refused, and one clean baseline reproduced exactly as specified. Combined with the rest of the project's test suite, that brings the total to 24 passing tests. Adwait is explicit about what this scorecard does and doesn't prove: a passing scorecard only proves that these specific, named synthetic cases behaved as specified. It is not model confidence, it is not production certification, and it is not a substitute for a human's judgment about whether the set of test cases is even adequate. That last judgment stays marked as pending human review.

## Key takeaways

- A clean, successful test run on good data proves almost nothing about whether a finance agent's controls actually work.
- The harness makes a fresh sandboxed copy of the data per test case, plants exactly one defect, and checks the outcome against a written expectation.
- Four reconciliation defects were planted, each a single dollar off or a single row wrong, and all four should be rejected at validation.
- Two behavioral tests check that a step-limited agent actually stops and that an agent attempting to approve its own decision gets refused.
- The result was seven of seven expectations matched and 24 total passing tests, but the team is explicit that this proves the synthetic cases behaved as specified, not that the system is certified or production-ready.

## Try it yourself

It's easy to demo an AI agent on data you curated yourself. It's much harder to prove it behaves correctly when the data is wrong. If your own finance agent, or any agent making consequential decisions, only works when the input data is clean, ask yourself honestly whether you've actually tested it. This kind of adversarial testing discipline runs through the Mycroft Financial AI work at Humanitarians AI.
