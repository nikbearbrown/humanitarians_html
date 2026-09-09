---
title: "Claude, Investigation Query."
seoTitle: "Does Claude's investigation-query skill judge truth"
description: "Explains how Claude's investigation-query skill searches an investigation log by a fixed routine, without judging witness credibility."
summary: "The investigation-query skill has Claude search an investigation log the same way every time using a written checklist, which produces consistent search results but no ability to judge what actually happened or who is telling the truth."
keywords: ["does claude judge witness credibility", "investigation query skill explained", "claude skill md checklist searching a log", "why an empty search result isnt proof of nothing", "how to write a skill for searching support logs", "specification versus judgment ai investigations", "claude ai cross referencing witness accounts", "building a repeatable search checklist with claude"]
generated: "article"
---

Claude picks up a skill called investigation-query. Does that mean it can now work out what really happened, cross-referencing witness accounts and judging who is telling the truth? No. It searches an investigation log the same way every time. Nothing about Claude's underlying judgment changes; what it gets is a fixed search routine.

## Proof by deletion

Delete the skill folder and Claude loses no ability to judge who is telling the truth, because it never had that ability. It just stops running one search routine. That distinction is the cleanest way to see what this skill, and skills generally, actually are: a specification for a repeatable process, not a new form of judgment Claude has acquired.

## What's actually inside the file

Investigation-query is a folder holding a single SKILL.md file with instructions for searching an open investigation log, answering questions like what a given witness said, written in plain language Claude reads before it starts. Claude reads the file top to bottom and works through it step by step in the order written, with no branching unless the file itself says to branch. That makes it a specification, not judgment: the payoff is the same search on every question, every time; the limit is that anything outside those written steps gets no special treatment.

## What the routine actually guarantees

Investigation-query never gives Claude the power to judge what a witness meant. What it guarantees is that every time it runs, Claude reads the same file and searches the log the same way. That consistency is the entire trick, and it matters because a search process that varies from run to run would make the results unreliable to compare or rely on later.

## Why a found answer or an empty result isn't proof

Watching Claude answer a question by finding it in the log does not prove it understood what actually happened. A search can return an exact quote and still miss the surrounding context that changes its meaning. Watching it come up empty does not prove nothing is there either; it may just be a case nobody logged yet. Neither outcome is evidence about the underlying truth of what happened, only about what the search routine found or didn't find in the material it was given.

## What it does not do

A skill named investigation-query does not hand Claude the power to judge what happened. It is a checklist Claude reads before it starts, so the same log gets searched the same way every time, and anything outside those specific steps remains the responsibility of the person interpreting the results.

## Writing your own version

The exercise offered is to pick one record you search the same way every time, a support log, a call history, a set of meeting notes, and write a SKILL.md for it: plain language, ordered steps. Then have Claude read it back and walk through exactly what it will search for before searching. Running this on a record you actually search repeatedly shows what a written search routine can reliably surface and what still needs a person reading for context.

## Key takeaways

- A skill named investigation-query does not give Claude the ability to judge witness credibility; it searches a log by a fixed, written routine.
- Deleting the skill folder removes no judgment ability, because none existed to begin with.
- The value is consistency: the same log searched the same way, every time it runs.
- A found quote is not proof of full understanding, and an empty result is not proof nothing is there; both only reflect what the search covered.
- Writing your own SKILL.md for a repeated search shows what you consistently look for and what context might get missed.

## Who this is for

Anyone who repeatedly searches logs, records, or notes for specific information and wants a consistent, transparent process, while understanding that a search routine surfaces matches, not judgment about what actually happened.
