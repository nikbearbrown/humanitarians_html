---
title: "Mycroft Update on AI Vendor Tracker"
seoTitle: "Mycroft AI Vendor Tracker: 5 Bugs, One Lesson"
description: "Muskan walks through five bugs in the Mycroft AI vendor tracker, from an invented executive departure to a silent tracing failure, and the fix for each."
summary: "A week of debugging the Mycroft vendor tracker turns up five different failures, all traced back to one habit: nobody checked the AI's evidence against the source."
keywords: ["ai vendor tracker mycroft", "ai hallucination executive departure", "silent error swallowing bug", "ai summary evidence check", "backfill data correction dry run", "sec filing boilerplate ai", "amd executive departure hallucination", "ai data integrity debugging", "confidently wrong ai model", "humanitarians ai fellows mycroft"]
generated: "article"
---
An AI system that fails loudly is easy to catch. One that fails quietly, producing confident, plausible-looking output that happens to be wrong, is much more dangerous, because nothing about it looks broken. Muskan, a Humanitarians AI Fellow working on the Mycroft vendor tracker, spent a week finding exactly that kind of failure five separate times, and every one of them traced back to the same root cause: an assumption nobody had actually checked.

## Confidently wrong five different ways

The week's bug list included empty summaries, an invented executive departure, and a tracing system that logged nothing while appearing to work. On the surface these look like unrelated problems in different parts of the system. But each one came down to the same pattern: something in the pipeline assumed a piece of evidence was present, correct, or being captured, when it wasn't, and nothing in the system was set up to catch the gap.

## The headline trap

The first bug was that summaries were coming out empty. The cause was that the AI was writing from the headline of a filing alone, while the actual filing text sat unused in the database the whole time. Once the real filing text was passed into the model, the difference was immediate: a generic line like "an officer change may indicate a shift" became a specific, accurate summary naming the actual executive and role involved. The model wasn't incapable of writing a good summary. It simply never had the real evidence in front of it.

## The AMD hallucination

The second bug was worse than an empty summary; it was a wrong one. Every filing of a certain type opens with the same boilerplate language, "departure of directors or certain officers." The AI saw the word "departure" in that boilerplate and reported an executive departure for an AMD filing that was actually an equity plan amendment, not a departure at all. The fix was to strip the boilerplate before the model ever saw it, after which the AMD filing was read correctly. This is a sharp illustration of why passing raw evidence to a model isn't enough on its own; the model also needs to be aimed at the part of the evidence that actually matters.

## Fixing the code without fixing the data

Correcting the bug in the code didn't automatically correct the data already collected, because the collector was built to skip anything it had already seen matched on the headline. That meant the bad rows from before the fix would have stayed wrong indefinitely. The solution was a backfill script that rewrote the affected rows in place, running in dry-run mode by default and saving every original value before overwriting it. Eight rows were corrected this way, with nothing deleted and a full record of what the data looked like before the correction.

## Silent failures in tracing

The last bug was the most dangerous because it was invisible: tracing appeared to be working fine but was actually logging nothing. A broad catchall error handler had been silently swallowing the underlying error. Fixing that catchall uncovered a second, more serious bug that would have crashed brief generation outright if it had gone unnoticed. Both were shipped together and verified by fetching the trace back from the server to confirm it was actually recording data, rather than trusting that a system printing no errors meant a system with no errors.

## The lesson: verify evidence against the source

Five different bugs all reduced to the same failure of verification: an assumption that the model had the evidence, that a fix had reached old data, or that a silent system was actually working. The practical rule that comes out of this is simple to state and easy to skip in practice: take any number or summary an AI system gives you and ask what real evidence it's based on, and whether that evidence has been checked against the source. If you can't point to the evidence, don't ship it.

## Key takeaways

- Empty AI summaries were caused by the model writing from headlines alone while the real filing text sat unused in the database.
- An AI hallucination reported a false executive departure at AMD because the model reacted to boilerplate legal language rather than the filing's actual content.
- Fixing a bug in code does not fix data already collected; a dry-run backfill with saved originals corrected eight affected rows without losing history.
- A broad catchall error handler was silently swallowing a tracing error, masking a second bug that could have crashed brief generation.
- The unifying lesson across all five bugs: verify that the AI's evidence actually supports its output before trusting or shipping it.

## Try it yourself

Take one number or summary your own AI system produced recently and ask what real evidence backs it up, then check that evidence against the original source. This is part of the ongoing work from Humanitarians AI Fellows on the Mycroft financial AI project, where catching this kind of silent failure early is treated as the cheapest insurance available against shipping wrong data.
