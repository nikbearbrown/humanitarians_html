---
title: "Mycroft: Why Our AI Runway Scorer Refuses to Make Judgements"
seoTitle: "AI Runway Risk Scorer That Refuses to Judge Startups"
description: "How Mycroft's runway risk scorer measures a startup's financial health without ever printing a verdict, forcing a human to make the actual call."
summary: "Amruta Naik explains why Mycroft's runway risk scorer outputs five verified metrics and a hard-coded human gate instead of a risk label, so no one can rubber-stamp an AI's guess."
keywords: ["ai runway risk scorer", "startup collapse risk ai tool", "human in the loop ai design", "explainable ai financial metrics", "ai rubber stamping problem", "signal provenance tracking ai", "halting human gate design", "unvalidated signal handling ai", "mycroft financial ai project", "ai guardrails for risk scoring"]
generated: "article"
---

Ask an AI model to tell you whether a startup is about to run out of money, and it will happily give you an answer: high risk, avoid. The trouble is not that the model might be wrong. The trouble is what happens next, when a human sees a confident-sounding label sitting on top of incomplete, messy data and stops thinking. That failure mode, a person rubber-stamping a machine's guess, is what Mycroft's runway risk scorer was built to prevent, and it does it in an unusual way: by refusing to render a verdict at all.

Amruta Naik designed the tool as part of the Mycroft financial AI project at Humanitarians AI, and the interesting part isn't the math behind the score. It's the line the code deliberately will not cross.

## Five mechanical metrics, nothing more

The scorer's design rule was written as a direct instruction to the build agent: produce five mechanical metrics, and nothing that looks like a conclusion. Those five are total raised, months since the last raise, funding stage trend, distress indicators, and signal freshness. Each one is a plain, computable number. None of them is allowed to be dressed up as a recommendation. The score function itself is explicitly forbidden from printing the words "high risk" or "low risk." It builds a metrics dictionary of those five numbers and stops there.

## Provenance beside every number

What makes the tool trustworthy isn't just what it withholds, it's what it keeps. Beside every one of the five numbers sits its provenance: the exact signal ID and the source URL the number came from. Any signal that can't be verified against a source doesn't get included with a caveat attached. It gets dropped outright, not guessed at. That distinction matters. A tool that keeps a low-confidence number and flags it as uncertain is still handing a human a number to anchor on. Mycroft's scorer would rather show nothing than show something unverified.

The revision to this logic split incoming signals three ways: well-formed, malformed, and unvalidated. Only well-formed, sourced signals make it into the five metrics. Unvalidated signals, the ones no human has signed off on, get dropped from the numbers entirely, but their count survives. So a reader of the output can see that something was excluded without that exclusion ever touching a single figure in the report.

## The hole in the code

Instead of a risk label, the function returns a gate field hard-coded to "halting human." No risk label, no recommendation, just a placeholder that names who has to decide. It is, as Amruta puts it, a hole left in the code on purpose, one the human is meant to fill. The report generated alongside the metrics doesn't try to conclude anything either. It states the human gate, names who has to decide, and says plainly that the tool computed metrics; it did not decide anything. It also lists what it dropped: signals used versus signals dropped as unvalidated, so the reader can see exactly how much of the available information was excluded and why.

## A pattern, not just a tool

The real lesson here isn't the five metrics themselves. It's a pattern that generalizes to any AI system that scores, ranks, or flags something. Separate what the machine computes from what the human decides, and then make the machine physically unable to cross that boundary. The score is a hole in the code, and that hole is the entire point of the design. A system that can compute a number but cannot render a verdict cannot be blindly trusted the way a system that hands you a conclusion can, because there's no conclusion to trust. There's only a human name attached to a decision that hasn't been made yet.

## Key takeaways

- The runway risk scorer outputs five mechanical metrics (total raised, months since last raise, funding stage trend, distress indicators, signal freshness) and never a risk label.
- Every metric carries its provenance: the exact signal ID and source URL it was computed from.
- Signals that can't be verified are dropped entirely rather than included with a low-confidence warning.
- The output's gate field is hard-coded to "halting human," a deliberate placeholder rather than a computed verdict.
- The report states explicitly that the tool computed metrics and did not decide anything, along with a count of dropped, unvalidated signals.
- The underlying pattern, separating machine computation from human judgment and enforcing that boundary in code, applies to any AI scoring or ranking system.

## Try it yourself

Take any AI tool you're building that scores, ranks, or flags something, and find the exact line where it hands you a conclusion. Ask whether that conclusion needs to live in the code at all, or whether the code should stop one step earlier and let a human judge instead. This kind of guardrail design is core to the work coming out of the Mycroft project at Humanitarians AI, where the goal is building financial AI tools that stay honest about what they actually know.
