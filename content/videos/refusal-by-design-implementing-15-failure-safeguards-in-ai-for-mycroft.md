---
title: "Refusal by Design: Implementing 15 Failure Safeguards in AI for Mycroft"
seoTitle: "15 Failure Safeguards in AI for Mycroft"
description: "Inside a finance AI feature that rejects, rather than flags, any month of data it cannot rehash and re-derive from verified source files."
summary: "A multi-month trend tool for the Mycroft Finance Investigator refuses to compare any month of data unless it passes 15 distinct verification checks, rejecting rather than merely flagging failures."
keywords: ["mycroft finance investigator explained", "ai financial data verification checks", "rejecting vs flagging bad data", "ai refuses to hallucinate financial numbers", "hash verification financial reporting ai", "ebitda recurring pattern detector", "ai finance tool refusal paths", "designing ai to say i don't know", "materiality threshold financial ai policy"]
generated: "article"
---

Most AI tools are judged on what they can produce. This one is built around what it refuses to produce, and treats that refusal as the actual engineering achievement. The multi-month trend investigation for the Mycroft Finance Investigator compares three months of verified finance data, but the interesting part isn't the comparison itself, it's that the engine attempts to refuse the task 15 separate times before it will compare anything at all.

## The rule everything else rests on

Before any numbers get compared, a month can only enter the comparison if three conditions hold: it has to be the same entity and period that the plan claims, its source files have to still hash to what the run log originally recorded, and the editor has to independently recompute the same figure. If any one of those three fails, the run is rejected outright, not flagged for review. That distinction, rejected rather than flagged, is what makes the feature's shape unusual. It doesn't read three finished reports and summarize them. It reopens three previously verified runs, rehashes their source files, and re-derives every number from scratch. Only after that does it describe what moved between months. It trusts nothing it's handed, including its own earlier output.

## What the tool actually reports

Once data clears every check, the output is direct: actual EBIT of $261,000 in January, $230,000 in February, and $265,000 in March, a $31,000 deterioration followed by a $35,000 improvement. The movement column labels each shift as "deteriorated" or "improved," and nothing more. It never states why the numbers moved, and it never projects what comes next. That silence is deliberate, not a gap the team ran out of time to fill.

## Fifteen refusal paths inside one loader

The actual engineering effort went into building 15 distinct conditions inside a single loader function, each one capable of stopping the run cold rather than letting a doubtful number through. The tamper check at the center of this is ten lines: for every source file the run log claims to have verified, the loader rehashes it on disk and compares the result. If the file is missing, the run stops. If even a single byte has changed since that run was recorded, the run stops. There is no branch anywhere in that logic that logs a warning and continues anyway. That tamper check is just one of the 15. Others reject a log pulled from a different workflow, a period that doesn't match what the plan specified, a run whose human approval gate has already closed, an empty mismatch, a missing source file, and an EBITDA figure that no longer reproduces when recalculated. Every one of them ends the run rather than letting it proceed with a caveat.

## Proving the detector actually discriminates

A recurrence detector that flags everything is worthless, so the system is tested against a case designed to show it doesn't do that. Revenue, cost of goods sold, and operating expenses are all adverse across all three months, and the engine correctly marks that pattern as recurring. Payroll, by contrast, is favorable in every period, and the same detector correctly returns no, it isn't recurring. That contrast is the evidence that the detector is discriminating based on the actual data pattern rather than defaulting to a blanket answer.

## Pattern, not cause

The report is explicit that recurrence is a mathematical pattern, not a causal explanation, and the field meant to hold a causal explanation ships intentionally blank, with a named owner responsible for filling it in later. The system is allowed to find the pattern. It is not allowed to claim it knows why the pattern exists.

## What "49 tests passing" doesn't mean

Even with 49 tests passing, the recipe is still marked draft, and the materiality threshold used during development remains an unapproved fixture rather than approved policy. That's framed as the specific failure this whole design guards against: a finance tool that quietly lets its own demo-stage threshold slide into policy without anyone explicitly approving it. Passing tests doesn't automatically mean a system is ready to ship its assumptions as fact.

## The audit prompt

The closing challenge is a direct exercise: take a report your own system generates, list every number on it, and for each one ask what would have to be true for that number to be wrong, and whether your code currently checks for it. The uncomfortable finding most teams hit running this exercise is that most pipelines verify their inputs once at the start and then trust every number derived from them indefinitely afterward, rather than rechecking at the point where the number is actually used.

## Key takeaways

- The system rejects failed data outright rather than flagging it, refusing to compare a month unless entity, hash, and recomputation all check out.
- Fifteen distinct refusal conditions live inside one loader function, including a ten-line tamper check that rehashes every source file on disk before trusting it.
- A working discriminator test, adverse categories flagged recurring, favorable payroll cleared, proves the detector isn't just flagging everything by default.
- The tool reports mathematical patterns explicitly, with no forecast, no recommendation, and no causal explanation offered.
- Forty-nine passing tests did not promote the development-stage materiality threshold into approved policy, which is treated as correct, careful behavior rather than incompleteness.

## Who this is for

This is for anyone building AI systems that touch financial or other high-stakes numeric reporting and needs a concrete model for designing refusal, not just accuracy, into the system. It's a detailed build log from Adwait Changan for the Mycroft Financial AI project at Humanitarians AI, with the code and full audit trail published in pull request 17 for anyone who wants to see the implementation directly.
