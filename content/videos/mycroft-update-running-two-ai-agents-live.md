---
title: "Mycroft Update: Running Two AI Agents Live"
seoTitle: "Mycroft: Cross-Agent Validation on Real SEC Filings"
description: "An AI agent hallucinated a debt-to-equity ratio on a real SEC filing, and five separate tests were run to find out why and what the failure actually meant."
summary: "The first live run of a two-agent financial validation system produced a fabricated number, and five separate tests traced exactly where that failure came from."
keywords: ["cross agent validation ai finance", "ai hallucination debt to equity ratio", "llm determinism fixed seed testing", "claim verification citation checking ai", "ai consistency probe testing method", "sec filing analysis ai agents", "goodhart flag false positive testing", "multi agent financial ai testing"]
generated: "article"
---

Two weeks ago, this project built a system meant to run two independently reasoning AI agents on the same company and flag whenever their numbers disagreed. Last week, both agents became real. This week, the system ran for the first time, and the first thing it produced wasn't a disagreement. It was a number that came from nowhere.

## What cross-agent validation is actually checking

The mechanism is straightforward in principle: run two independently reasoning agents on one company, pull the numbers out of each agent's conclusion, and flag anything that doesn't match. It's set arithmetic underneath, no model, no judge doing the comparison. The system started with one real agent and one fixture, a handwritten stand-in rigged to produce whatever answer you wanted, used deliberately to prove the detector itself worked before pointing it at anything real. Last week, that fixture was replaced with a second real agent reading the same SEC filing through a different lens, one on the balance sheet, the other on earnings quality. A prior batch of 143 tests passed with zero lines changed in the comparator. But nobody had actually watched two real agents talk to each other yet.

## The number that came from nowhere

Once the second agent ran on a locally set up model, real filing data went in, and an independent model came back with a conclusion on each side. The first agent, reading assets, revenue, and net income, calculated a debt-to-equity ratio of 0.34. Its input data contained no debt and no equity figures at all; the concept simply wasn't there. The second agent, reading actual earnings figures, cited zero numbers directly, describing them only as consistent and significantly large. The system flagged a contradiction between the two. It was right to flag it, but not for the reason anyone would have hoped.

## Five tests, not one guess

A single strange result could be noise, so five separate tests ran, each with the full treatment: what it is, why it exists, what a clean result looks like, what it was given, what happened, and what that means.

**Claim verification** fetches every citation pointing at a real URL and checks whether the claimed numbers appear there, within 1% tolerance. It never got the chance to check the debt-to-equity figure. One layer upstream, claim extraction only recognizes dollar amounts, percentages, multiples, or basis points, and a bare decimal like 0.34, with no unit attached, matched none of those patterns, invisible before verification ever ran, a reminder that a verification layer is only as reliable as what gets handed to it.

**Determinism** runs the identical question through the identical model, same temperature, same fixed seed, five times, to separate noise (an answer that changes every run) from a stable, repeatable pattern. The local adapter defaults to temperature zero and seed 42, confirmed from source code. Four of five runs converged on the same invented ratio, off by one digit in the last decimal; the original 0.34 never reappeared. Fixing temperature and seed narrows behavior but doesn't collapse it to one answer, and the outlier was exactly this fabrication.

**The consistency probe** runs a second independent pass and scores overlap, weighted 0.6 toward numbers, since a real number is far harder to fabricate identically twice than a phrase is. A hard flag fires the moment a number shows up once and never again. The debt-to-equity figure appeared exactly once across every run collected, and the flag fired exactly as designed, the one test of five that worked precisely as intended.

**A format guardrail stress test** checks only whether the agents can speak the required output structure at all. Across 24 real calls, first attempt only, the result was 24 for 24, zero retries, zero halts. The failure lived entirely in what the model reasoned, not in how it described it.

**Breadth across 12 companies** reruns the comparison across a diverse batch rather than one filing. Eleven of twelve got flagged; the exception was the one company where neither agent cited a number at all. Manually checking one flagged case showed both agents were actually correct, one reporting assets and revenue, the other earnings per share, different concepts entirely, zero real conflict, and the flag fired anyway.

## The project redirect

That last result is what actually redirected the project. An eleven-of-twelve flag rate looked alarming at first, but it revealed that the contradiction flag couldn't yet tell genuine disagreement from agents simply discussing different things. The missing-number extraction gap, separately, turned out to be duplicated across three files, the same pattern copied three times, all sharing the same blind spot.

The flag problem needed a real decision, not a patch, since nothing in the system currently knows which real-world concept a number came from, only that a number exists. The fix that shipped: a number cited by only one side no longer counts as a contradiction by itself. That resolves the case where one agent simply wasn't asked about something. It does not resolve two agents citing real, correct numbers about unrelated topics, and that gap is named directly in the code as a known limit left open on purpose.

Checked against the same 12 companies, recalculated rather than rerun: under the old rule, 11 of 12 were flagged; under the new rule, 7 of 12. Four false alarms disappeared. The other seven, genuinely different topics both cited as numbers, are still flagged, which is the honest, measured size of this particular fix.

## The honest verdict

Two separate questions get two separate answers. Does the machinery work, real filings, real independent reasoning, a full audit trail, a guardrail that held on all 24 calls? Yes, provably. Does the contradiction flag reliably mean the two agents actually disagree? Not yet. Most of what it flags right now is agents discussing different things, not agents contradicting each other, and the one real fabrication this system produced was caught by a person reading the output, not by the system itself.

## Key takeaways

- The first real cross-agent run produced a fabricated debt-to-equity ratio of 0.34 from an agent whose input data contained no debt or equity figures at all.
- The fabricated number was invisible to claim verification because claim extraction only recognizes dollar amounts, percentages, multiples, or basis points, not bare decimal ratios.
- A fixed temperature and seed narrowed but didn't eliminate variation across five identical runs; the original fabricated number appeared only once out of five attempts.
- The consistency probe worked exactly as designed, firing a hard divergence flag the moment a number appeared in one run and not the other.
- Testing across 12 real companies revealed the contradiction flag couldn't distinguish genuine disagreement from agents citing different, unrelated numbers, prompting a real fix rather than a quick patch.
- The system proved its plumbing works end to end on real filings, but has not yet proven its judgment, specifically whether flagged contradictions are real, can be trusted without human review.

## Who this is for

This update is from Divij Paswha, a Humanitarians AI Fellow working on Mycroft Financial AI, aimed at anyone building or evaluating multi-agent systems who wants an honest look at how a real validation failure gets diagnosed, not just a demo of a system working as intended.
