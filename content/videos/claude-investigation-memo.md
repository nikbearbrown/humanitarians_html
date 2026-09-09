---
title: "Claude, Investigation Memo."
seoTitle: "Claude investigation-memo: template, not judgment"
description: "Explains why Claude's investigation-memo skill is a fixed writing template, not a new ability to determine what actually happened."
summary: "Uses Claude's investigation-memo skill to show that producing a structured memo follows a fixed template Claude reads and follows, not evidence Claude judged what happened."
keywords: ["did claude decide what really happened in an investigation", "how does claude investigation memo skill work", "claude skill for writing up an investigation", "claude skill.md fixed structure explained", "why claude memo output is not judgment", "same memo structure every investigation claude", "write me a skill.md for a document i structure often", "thorough memo does not prove claude understood case"]
generated: "article"
---

Claude has a skill called investigation-memo, and it's easy to read that as Claude having gained judgment about what actually happened in a given matter. It hasn't. A Claude Skill is a folder holding one file, SKILL.md, that Claude reads before it starts and follows step by step, in order. Investigation-memo follows a written template; it doesn't determine what happened or who's responsible.

## What the skill actually is

Investigation-memo is a folder holding a single SKILL.md with instructions, in plain language, for writing up an investigation in a fixed structure. Claude reads that file top to bottom and works through it step by step in the order written, branching only where the file itself says to. The memo's structure comes entirely from what's written in the file, not from any independent assessment of the underlying facts.

## Specification, not judgment

This makes a skill a specification, not new judgment. The payoff is consistency: the same memo structure applies to every investigation, every time. The limit is scope: anything outside those written steps, and Claude has no special opinion about it. Investigation-memo never gave Claude judgment about what happened. It guarantees only that when the skill runs, Claude reads the same file and follows the same structure each time, which is a narrower and more useful claim than "Claude figured out the truth."

## Why deleting the skill changes nothing about judgment

If the skills folder were deleted, Claude would lose no investigative judgment, because there was none there to begin with. What disappears is one specific template for writing up findings. That distinction, losing a template versus losing a capability, is exactly the point worth understanding before relying on a skill like this for anything consequential.

## What the output does and doesn't prove

Watching Claude produce a thorough memo doesn't prove it correctly understood the investigation; it may simply have filled in the template's headings competently. Watching Claude produce a thin memo doesn't prove there's nothing substantive to report either; it may be a case the template's steps don't reach well. Neither outcome, thorough or thin, is proof about the quality of understanding behind it, because the skill's job is structural, not evaluative.

## Trying it yourself

Pick one document you always structure the same way, an incident report, a status update, a closing summary. Ask Claude to write a SKILL.md for it, plain language, ordered steps, then have it read the file back to you and walk through exactly what it will write before writing it. Running this against a document you actually produce repeatedly shows the mechanism directly.

## Key takeaways

- Claude's investigation-memo skill is one plain-language SKILL.md describing a fixed memo structure for writing up an investigation.
- Claude follows the file's steps in a fixed order, branching only where the file explicitly says to.
- A skill is a template Claude executes, not new judgment about what actually happened.
- The same memo structure applies to every investigation, every time the skill runs.
- A thorough memo or a thin one proves nothing on its own about whether the investigation was correctly understood.

## Who this is for

HR, legal, and compliance teams evaluating whether Claude can help standardize investigation write-ups, and anyone who wants a realistic picture of what a Claude Skill contributes versus what still requires human judgment.
