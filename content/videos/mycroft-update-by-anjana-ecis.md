---
title: "Mycroft Update by Anjana: ECIS"
seoTitle: "ECIS: Reading Earnings Calls with Four AI Readers"
description: "Anjana explains ECIS, a system that runs four independent AI readers on earnings call transcripts and grades its own confidence against reality 30 days later."
summary: "ECIS decodes hedged earnings call language using four independent readers, then checks its own confidence scores against what actually happened 30 days later."
keywords: ["earnings call intelligence system ecis", "finbert tone analysis earnings calls", "named entity recognition financial transcripts", "brier score ai calibration", "expected calibration error explained", "llm orchestration cost reduction routing", "pre-registration confidence log", "ai human in the loop financial signals"]
generated: "article"
---

"We remain cautiously optimistic about our forward outlook." Did that sentence mean a company just raised guidance, lowered it, or said nothing meaningful at all? A room full of analysts could argue about that line for an hour. Anjana built a system called ECIS, the Earnings Call Intelligence System, that reads it and answers automatically, with a confidence score that gets checked against reality 30 days after the call.

## The scale problem behind hedged language

An earnings call transcript runs 5,000 to 10,000 words of hedged, legalistic language. A simple keyword search can catch the obvious phrases, but it misses anything subtle. A single language model reading the same transcript will sometimes hallucinate signals that aren't actually there, and reading every transcript manually simply doesn't scale once you're tracking 30 to 50 companies every quarter. That combination, high volume, subtle language, and unreliable single-method reading, is the actual problem ECIS is built to solve.

## Four independent readers instead of one

Rather than trusting a single method, ECIS runs four independent readers on every chunk of a transcript. A keyword scanner catches known phrasing. FinBERT scores the tone of the language. A named entity recognition model pulls out the hard numbers: dollar figures, percentages, and dates. And a language model reasons through the passage with its own checks built in. A triangulator then fuses all four readings together, weighting the readers that have historically been right more heavily than the ones that haven't.

## Cutting cost through category routing

Not every chunk of a transcript needs the full four-reader treatment, and ECIS uses an orchestration agent to sort each chunk into one of four categories before deciding how much processing it gets. Category A, where two readers already agree, goes straight to the language model for confirmation. Category B, where one reader flagged something and another didn't, gets the full pipeline. Category C, where the readers disagree with each other, routes to a conflict resolution step. Category D, where neither reader saw anything worth flagging, gets skipped entirely. That routing alone cuts LLM calls by 60 to 80 percent, a meaningful cost reduction achieved simply by not running expensive reasoning on chunks that don't need it.

## Grading its own confidence

Every signal ECIS produces is pre-registered, meaning it's logged before anyone knows whether it turned out to be right. Thirty days later, the system checks the actual market outcome against its own prior predictions. The Brier score measures overall accuracy of those predictions. The skill score asks a sharper question: does a given reader actually beat a plain keyword search, or is it just adding complexity without adding value? Expected calibration error checks whether an 80 percent confidence call was actually right about 80 percent of the time, rather than being systematically over- or under-confident. A Murphy decomposition then splits genuine uncertainty in the world from a model that's simply miscalibrated, two very different problems that would otherwise look identical from the outside.

## Continuous learning and a human veto

ECIS doesn't stop learning once it's deployed. Three feedback loops run continuously: a calibration watchdog that recalibrates confidence scores as they drift over time, a routing graph that checks whether chunks skipped as category D actually had signal in them that was missed, and a vindication tracker that re-weights the four readers based on which ones keep turning out to be right. Routine adjustments from these loops happen automatically. But anything structural, reverting to an older model version, dropping a reader entirely, or a threshold shift over 25 percent, pauses the system and requires a human to approve the change before it takes effect.

## Applying the same discipline to a personal judgment call

Anjana closes with a challenge aimed directly at the viewer's own decision-making: most people make judgment calls at work that they never actually track, trusting their gut and moving on without checking later whether that gut call was right. The suggested exercise, meant to be pasted into an AI assistant, has three parts: design a simple log where you write down your call and your confidence level before you know the outcome, pick two independent ways to sanity-check that same call, and define one honest test for whether your confidence numbers actually mean anything over time. It's the same pre-registration discipline behind ECIS's four readers, aimed at a single person's own decisions instead of an earnings call transcript.

## Key takeaways

- ECIS uses four independent readers, a keyword scanner, FinBERT, a named entity model, and an LLM, then fuses their outputs with weighting based on historical accuracy.
- Category-based orchestration routes each transcript chunk to the right amount of processing, cutting LLM calls by 60 to 80 percent.
- Predictions are pre-registered and graded 30 days later using Brier scores, skill scores, and expected calibration error.
- Three continuous feedback loops (a calibration watchdog, a routing graph, and a vindication tracker) keep the system self-correcting after deployment.
- Structural changes, like dropping a reader or a large threshold shift, always require human sign-off before taking effect.

## Who this is for

This update is aimed at anyone tracking earnings calls at scale or building AI systems that need honest, checkable confidence scores rather than black-box predictions. It's part of the Mycroft Financial AI track within the Humanitarians AI Fellows program.
