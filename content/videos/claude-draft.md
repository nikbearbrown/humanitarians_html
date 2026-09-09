---
title: "Claude, Draft."
seoTitle: "Claude draft skill: structure, not legal writing skill"
description: "Explains why Claude's draft skill gives documents a consistent structure through a fixed instruction file, not a learned legal writing ability."
summary: "Uses Claude's draft skill to show that a Claude Skill is a plain-language instruction file producing consistent document structure, not evidence Claude learned legal writing."
keywords: ["did claude learn legal writing from a skill", "how does claude draft skill work", "claude skill for consistent document structure", "what is skill.md in claude explained", "claude skill produces same draft structure every time", "why deleting a claude skill loses nothing learned", "claude skill specification not new writing ability", "write me a skill.md for a document i draft often"]
generated: "article"
---

Claude has a skill called draft, and it's tempting to read that as Claude having learned legal writing. It hasn't. A Claude Skill is a folder holding one file, SKILL.md, that Claude reads before it starts and then follows step by step, in the order written. Delete the folder and Claude forgets no drafting ability, because there was nothing learned to begin with.

## What the draft skill actually is

Draft is a folder holding a single SKILL.md: instructions, in plain language, for turning a user's facts and requests into a formatted document. Claude reads that file top to bottom and works through it step by step in the order written, branching only where the file itself says to. Nothing about this involves Claude drawing on some internalized sense of legal style; it involves following a written structure.

## Specification, not power

This makes a skill a specification rather than a new writing capability. The payoff is consistency: the same document structure comes out every time draft runs. The limit is scope: anything outside those written steps and Claude is working without guidance. Draft never taught Claude to write like a lawyer. It guarantees that every time the skill runs, Claude reads the same file and produces the same document structure, which is a different and more modest claim.

## Why deleting the skill changes nothing about ability

Imagine deleting the skills folder. Claude doesn't forget how to draft, because it never learned drafting as a standalone skill in the first place. What disappears is one specific routine for structuring a particular kind of document. Losing a routine is not the same as losing a learned capability, and that distinction is the whole point of understanding what a skill is.

## What watching the output does and doesn't prove

Watching Claude produce a clean, well-structured draft doesn't prove it understood the underlying matter. A file's structure can be followed precisely on facts that were never really grasped in any deep sense. Watching Claude produce a rough or oddly shaped draft doesn't prove the skill is broken either; it may simply be a case the file's structure doesn't fit well. Neither result is proof of comprehension or its absence, because the mechanism at work is structural compliance, not understanding.

## Trying it yourself

Pick a document you write the same way every time. Ask Claude to write a SKILL.md for it, in plain language with ordered steps, then have it read the file back to you and walk through exactly what it will do before doing it. Running this against a real document you produce repeatedly shows the mechanism directly: the same structure, every time, bounded exactly by what the file says.

## Key takeaways

- Claude's draft skill is one plain-language SKILL.md describing how to turn facts and requests into a formatted document.
- Claude follows the file's steps in a fixed order, branching only where the file explicitly says to.
- A skill is a specification for structure, not a new writing ability; deleting it loses a routine, not learned skill.
- The payoff is a consistent document structure on every run; the limit is anything the file never wrote down.
- A clean draft or a rough one proves nothing on its own about whether Claude understood the underlying matter.

## Who this is for

Anyone drafting the same kind of document repeatedly who wants to understand what a Claude Skill actually contributes, and readers evaluating whether Skill-driven output reflects real understanding or just structural consistency.
