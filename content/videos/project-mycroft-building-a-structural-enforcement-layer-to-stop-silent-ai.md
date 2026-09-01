---
title: "Project Mycroft: Building a Structural Enforcement Layer to Stop Silent AI Failures"
seoTitle: "Project Mycroft: Stopping Silent AI Failures"
description: "Divij Pawar explains how Project Mycroft forces AI agents to prove their sources or fail loudly, using signed affidavits and append-only logs."
summary: "Divij Pawar walks through Project Mycroft's three mechanisms for catching AI hallucinations structurally, plus the honest limit of what structure alone can prove."
keywords: ["ai hallucination detection system", "signed reasoning affidavit ai", "append-only checkpointing database", "adversarial arbitration ai agents", "ai audit trail design", "structural enforcement ai accountability", "ai agent pipeline fails loudly", "adr06 structure versus truth", "multi-agent ai investment recommendation", "project mycroft humanitarians ai"]
generated: "article"
---

When an AI system gets something wrong, the dangerous part usually isn't the wrong answer. It's the confident, coherent, completely invented explanation it gives to back that answer up. Divij Pawar ran into exactly this problem while building a multi-agent system for financial analysis, and the response wasn't to try to make the AI more accurate. It was to build a layer that makes it structurally impossible for an unproven conclusion to slip through unnoticed.

## The problem: confident, fabricated explanations

Picture four AI agents analyzing a company: one on finances, one on patents, one on earnings, one on competition. Their findings feed into a final system that produces a single buy, hold, or sell recommendation. If the financial agent's analysis rests on a number it hallucinated, one that never actually existed, nothing in a typical pipeline stops that fake number from flowing straight into an official investment decision. Worse, if you ask the AI afterward why it made the call, it will invent a plausible, confident explanation for something that never happened inside the model at all. That's the failure mode Project Mycroft is built to catch: not inaccuracy itself, but inaccuracy that hides.

## Why the obvious fixes don't work

Two solutions seem obvious and both get rejected. Using a second AI to check the first AI's reasoning fails because the checking model shares the same blind spot as the one being checked, a well-crafted fake explanation can look just as genuine to it as a real one. Mathematically tracing through a model's computation to verify its reasoning is theoretically sound, but it forces you to abandon powerful modern AI models for much weaker ones that can actually be traced. Neither approach holds up in practice, which is what pushed the design toward structural enforcement instead.

## Three mechanisms, one goal: force proof or force failure

The first mechanism is the reasoning object. Before any conclusion is allowed to propagate to an investor or trigger an action, the AI has to produce a signed affidavit answering specific questions: what did it conclude, how confident is it, what exact source line led to that conclusion, and what citations support it. If the AI can't point to the actual source behind its claim, the state transition is rejected outright.

The second mechanism is append-only checkpointing. Every record gets written to a database in a way that prevents updates or deletions, enforced by the database itself rather than application code, since code can have bugs or be bypassed. If a reviewer later flags a run as wrong, that flag goes into a separate table, and the original record stays untouched, which means the system can always be reconstructed exactly as it looked at the time a decision was made.

The third mechanism is adversarial arbitration. When two agents genuinely disagree on something important, they debate once. If they still disagree afterward, that disagreement becomes a first-class output of its own, an "affidavit of disagreement," instead of being quietly averaged into a meaningless middle ground.

## The XML parsing fight

Getting the AI to actually produce these structured outputs turned into its own engineering problem. The first attempt was a polite prompt asking the model to format its output as two XML blocks, a thought log and a conclusion, with nothing else. Tested against live Claude output, it failed: the model wrote a numbered preamble before the opening tag, and the parser couldn't find the blocks. The fix wasn't a softer prompt, it was a mechanical constraint: the first character must be a bracket, no preamble allowed, period. When parsing fails now, it's logged immediately as a parse failure with the broken response attached, one retry happens with an explicit corrective directive, and if that fails too, the entire pipeline halts rather than delivering an unverified result.

## The honest limit: ADR06

Here's the part that keeps the system honest about its own limits. Everything described so far enforces structure: it guarantees a thought log exists, that it's well-formed, and that it's permanently recorded. It does not guarantee that the log reflects what actually happened inside the AI. A hallucinated conclusion can come wrapped in a perfectly coherent, perfectly formatted, completely fabricated thought log, and it will pass every structural check in the system. This limitation is documented explicitly as ADR06: the log is evidence of output, not evidence of process. It's treated as a fundamental property of how large language models work, not a bug to be patched later, and it's presented as a corrective to AI accountability framing that quietly treats a structured trace as equivalent to truth.

## What's solvable now, and what's still open

Structural enforcement is real and tested, and the three mechanisms work as built. Ground truth checking is real wherever a ground truth exists to check against, such as comparing an AI's claim about a financial filing to the actual SEC filing. Reproducibility checking is real too: running the same request twice and looking for numbers that only show up in one of the two runs. The genuinely open problem is proving that an AI's stated reasoning matches its actual computational reasoning, and that one may not be fully solvable with current models. What the system can guarantee is narrower but still valuable: when structural accountability fails, it fails loudly on the record, rather than quietly becoming someone's investment decision.

## Key takeaways

- Silent AI failures are most dangerous when a wrong answer comes with a fabricated but confident explanation attached to it.
- Using a second AI to check the first, or mathematically tracing computation, both fail as general solutions to this problem.
- Signed reasoning affidavits require an AI to cite the exact source behind a conclusion before it can propagate.
- Append-only checkpointing at the database level, not the application level, prevents tampering with the historical record.
- Adversarial arbitration turns genuine agent disagreement into a first-class output instead of an averaged-away result.
- ADR06 is the explicit acknowledgment that structured logging proves a process happened, not that the process was truthful.

## Who this is for

Project Mycroft is part of Humanitarians AI's Fellows program, built around finance-focused, agentic AI work. It's aimed at anyone building multi-agent AI pipelines who wants a concrete framework for making failures visible instead of invisible, and it closes with a direct challenge: check whether your own pipeline logs failures immediately, gives retries their own record, and halts on a second failure instead of guessing and moving on.
