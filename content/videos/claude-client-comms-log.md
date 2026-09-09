---
title: "Claude, Client Comms Log."
seoTitle: "Claude client-comms-log: structure, not memory"
description: "Explains why Claude's client-comms-log skill produces a consistent log structure, not a running memory of client conversations."
summary: "Uses Claude's client-comms-log skill to show that turning a call or email into a structured log entry is a fixed template, not a stored memory of client history."
keywords: ["does claude remember every client call", "how does claude client comms log skill work", "claude skill for logging client communications", "claude skill.md structure not memory explained", "same log entry structure every time claude", "date contact channel summary log entry claude", "write me a skill.md for a record i create often", "clean log entry does not prove claude understood the call"]
generated: "article"
---

Claude has a skill called client-comms-log, and it's tempting to assume Claude has started remembering your clients across conversations. It hasn't. A Claude Skill is a folder holding one file, SKILL.md, that Claude reads before it starts and then follows step by step, in order. Delete the folder and Claude forgets no client history, because nothing was ever stored between runs to forget.

## What the skill actually is

Client-comms-log is a folder holding a single SKILL.md with instructions, in plain language, for turning a call or an email into a structured log entry. Claude reads that file top to bottom and works through it step by step in the order written, branching only where the file itself says to. Nothing about this involves an ongoing record of who a client is or what was discussed last time; each run is a fresh application of the same structure.

## Specification, not memory

This makes a skill a specification, not a memory. The payoff is consistency: the same log structure comes out of every entry, date, contact, channel, summary. The limit is scope: anything outside those written steps, and Claude is off the map. Client-comms-log never gave Claude a memory of your clients. It guarantees only that every time the skill runs, Claude reads the same file and produces the same log structure, which is a much narrower and more accurate claim than "Claude remembers your clients."

## Why deleting the skill changes nothing about memory

If the skills folder were deleted, Claude wouldn't forget a single client, because there was nothing stored to forget in the first place. What disappears is one specific logging routine, a way of turning a conversation into a structured entry, not an accumulated relationship history.

## What a log entry does and doesn't prove

Watching Claude produce a clean log entry doesn't prove it understood the call. A file's structure can be followed to the letter on a conversation that was never really grasped in any deep sense. Watching Claude produce a messy entry doesn't prove the skill is broken either; it may just be a call whose content doesn't fit the file's structure well. Neither outcome proves comprehension or its absence.

## Trying it yourself

Pick one record you create the same way every time. Ask Claude to write a SKILL.md for it, plain language, ordered steps, then have it read the file back to you and walk through exactly what it will do before doing it. Running this against a record you actually produce repeatedly shows the mechanism directly.

## Key takeaways

- Claude's client-comms-log skill is one plain-language SKILL.md describing how to turn a call or email into a structured log entry.
- Claude follows the file's steps in a fixed order, branching only where the file explicitly says to.
- A skill is a specification for structure, not a memory system; deleting it loses a routine, not stored client history.
- The same log fields, date, contact, channel, summary, come out on every entry the skill produces.
- A clean or messy log entry proves nothing on its own about whether Claude understood the underlying call.

## Who this is for

Client-facing teams who want consistent communication logs without assuming Claude retains memory across sessions, and anyone curious about what a logging-style Claude Skill actually contributes.
