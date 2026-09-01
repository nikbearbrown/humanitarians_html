---
title: "Mycroft's ECIS Ep. 4: Who Said It? Weighting Context in AI Financial Analysis"
seoTitle: "ECIS Ep 4: Weighting Context in AI Financial Analysis"
description: "Episode 4 of the ECIS project adds context-aware weighting, scoring who is speaking, how clean the source is, and how a signal fits past quarters."
summary: "ECIS learns to weigh who is speaking, how clean the source text is, and what happened in prior quarters, turning a single earnings-call sentence into a properly scaled financial signal."
keywords: ["ecis financial ai extraction", "speaker authority weighting ai", "earnings call ai analysis", "cfo confidence weighting model", "ai financial signal reliability", "context aware financial ai", "chunk quality scoring ai", "trend context earnings guidance"]
generated: "article"
---

Not every sentence on an earnings call deserves the same trust. When a CFO says a company is raising guidance, that's about as authoritative as financial language gets. When an analyst asks a question using the exact same words, it's speculation. Episode 4 of the ECIS project, presented by Anjana, is about teaching an AI financial extraction system to tell the difference.

## Moving beyond flat text extraction

Episode 3 had already given ECIS three models, quality gates, and full provenance, meaning it could read earnings calls with multiple models, check its own output for quality, and trace every signal back to its source. What it couldn't do yet was treat sources differently based on who or what produced them. Episode 4 closes that gap by teaching the system to weigh who's speaking, how clean the source text is, and what happened in prior quarters, three separate layers of context that all shape how much a given signal should be trusted.

## Speaker authority: why the CFO gets a 1.0

The clearest new layer is speaker authority weighting. Every speaker on a call now gets assigned a weight: a CFO carries a 1.0, a CEO an 0.8, an analyst just 0.3, and a call operator a flat zero. The same sentence, with the same underlying confidence score from the language model, now lands completely differently in the system's final signal depending purely on who said it.

## Measuring how clean the source actually is

Weighting speakers alone isn't enough, because even an authoritative speaker can be reading from a noisy chunk of text: safe harbor disclaimers mixed in with real guidance, a sentence cut mid-thought by the chunking process, or three different speakers overlapping in a single chunk. ECIS now scores every chunk of text on four dimensions: boilerplate ratio, token count, section completeness, and speaker transitions. Those four scores combine into a single quality multiplier, so clean chunks keep their full weight while noisy ones get suppressed before they ever reach the system's triangulation step.

## Linking guidance across quarters

The third layer looks past a single quarter entirely. A single data point, "revenue guidance raised," means something very different depending on whether it's the first time that's happened or the continuation of a pattern. ECIS now links signals across time, tracking consecutive raises, consecutive lowers, reversals, and stable or maintained guidance. Two straight quarters of raised guidance reads as a pattern; a sudden reversal after three stable quarters reads as a different, more significant kind of pattern, and the system can now tell the two apart.

## Three multipliers, one final signal

All three layers feed into a single calculation: a reader's raw confidence score gets scaled first by speaker authority, then by chunk quality, with trend context carried alongside as additional signal. The triangulator no longer just asks what each reading model found. It asks who said it, how clean the source was, and whether it fits the pattern building across recent quarters, three checks folded into one number instead of one flat confidence score treated as gospel.

## Key takeaways

- ECIS now assigns speaker authority weights, CFO 1.0, CEO 0.8, analyst 0.3, operator 0, so identical sentences carry different weight depending on who said them.
- Every text chunk is scored on boilerplate ratio, token count, section completeness, and speaker transitions to catch noisy or garbled source material.
- Signals are linked across quarters to distinguish consecutive raises, consecutive lowers, reversals, and stable guidance as different patterns.
- The final signal combines all three layers: reader confidence scaled by speaker authority, scaled again by chunk quality, with trend context alongside.
- This builds directly on Episode 3's foundation of three models, quality gates, and provenance tracking.

## Try it yourself

The episode closes with a prompt for viewers to apply the same thinking to their own decisions: list the sources you actually rely on and rank them by how much you should trust each one, name one noisy-chunk problem in your own process, information that's incomplete, mixed with irrelevant content, or hard to attribute, and then check honestly whether weighting your sources by authority and cleanliness would have changed a recent decision you made. This is part of Humanitarians AI's Mycroft Financial AI series for its Fellows program.
