---
title: "Claude, Gaps."
seoTitle: "Claude gaps skill: compliance tracker, not judgment"
description: "Explains why Claude's gaps skill is a fixed compliance tracker checklist, not a new ability to judge compliance risk on its own."
summary: "Uses Claude's gaps skill to show that a Claude Skill is a plain-language tracker checklist Claude follows in order, not evidence that Claude can judge compliance risk."
keywords: ["does claude know how to judge compliance risk", "how does claude gaps skill work", "claude compliance gap tracker skill", "close or risk accept a tracked gap in claude", "claude skill folder skill.md explained", "why deleting a claude skill loses no judgment", "claude skill for remediation status tracking", "gap tracker open closed risk accepted claude"]
generated: "article"
---

Claude has a skill called gaps, and the name raises a natural question: has Claude learned to judge compliance risk on its own? No. A Claude Skill is a folder holding one file, SKILL.md, that Claude reads before it starts and then follows step by step, in the order written. Delete the folder and Claude loses no compliance judgment, because there was none to lose in the first place.

## What the gaps skill actually is

Gaps is a folder holding a single SKILL.md with instructions for opening a compliance tracker, reporting what's flagged and not yet closed, and updating an item when a user closes it or formally risk-accepts it. Claude reads that file top to bottom and works through it step by step, in the order it's written. It only branches where the file itself says to branch.

## Specification, not power

This structure makes a skill a specification, not a new capability layered onto the model. The payoff is real: the same tracker check runs the same way every time, what's open, what's closed, what's been risk-accepted, reported consistently. The limit is just as real: anything outside those written steps and Claude has no special insight into it. Gaps never taught Claude how to judge whether something actually constitutes a compliance risk; it guarantees only that when the skill runs, Claude reads the same file and reports the tracker state the same way, run after run.

## Why deleting the skill changes nothing about judgment

A useful test of this idea is to imagine deleting the skills folder. Nothing about Claude's underlying judgment changes, because gaps never granted judgment to begin with. What disappears is one specific tracking routine, the particular sequence of steps for checking and updating a gap tracker. That's a meaningful loss of a workflow, but not a loss of reasoning ability.

## What watching Claude use it does and doesn't prove

Watching Claude close a gap cleanly, following the tracker steps correctly, doesn't prove it understood the underlying compliance risk. A file can be followed to the letter on a case it never actually evaluated in any deep sense. Equally, watching Claude mishandle a tracker update doesn't prove the skill itself is broken; it may simply be a case the written steps don't cover. Neither outcome is proof of understanding or its absence. The mechanism is following instructions, not exercising judgment about compliance substance.

## Trying it yourself

Pick a status check you personally run the same way every time. Ask Claude to write it up as a SKILL.md, plain language, ordered steps, then have it read the file back to you and walk through exactly what it will do before doing it. Running that against a real recurring check makes the mechanism concrete: you'll see the same steps followed the same way, every time, and you'll see exactly where the file's coverage ends.

## Key takeaways

- Claude's gaps skill is one plain-language SKILL.md file describing how to open, report, and update a compliance tracker.
- Claude follows the file's steps in a fixed order, branching only where the file explicitly says to.
- A skill is a specification Claude follows, not a new judgment capability; deleting it loses a routine, not reasoning.
- The same tracker check runs the same way every time the skill executes, which is the actual payoff.
- Watching a gap get closed cleanly or mishandled proves nothing on its own about whether the underlying risk was understood.

## Who this is for

Compliance and legal teams evaluating whether a Claude Skill can be trusted for tracker workflows, and anyone who wants a clear, non-hyped picture of what a Claude Skill actually automates.
