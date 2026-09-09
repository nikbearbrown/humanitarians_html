---
title: "Claude, Investigation Open."
seoTitle: "Claude investigation-open: intake, not authority"
description: "Explains why Claude's investigation-open skill is a fixed intake checklist, not Claude deciding on its own when to launch an investigation."
summary: "Uses Claude's investigation-open skill to show that opening a matter and running intake is a fixed checklist Claude follows, not a new power to decide when to investigate."
keywords: ["does claude decide when to open an investigation", "how does claude investigation open skill work", "claude skill for opening a case file and intake", "claude skill.md folder explained simply", "why claude has no investigative authority", "claude intake checklist for new matters", "write me a skill.md for a recurring record", "claude skill same intake every matter every time"]
generated: "article"
---

Claude has a skill called investigation-open, and the name suggests something bigger than it is: does Claude itself now decide when a workplace issue becomes a formal investigation? No. It opens a case file and runs intake, following a fixed checklist written in one file. It does not exercise judgment about whether an investigation is warranted.

## What the skill actually is

A Claude Skill is a folder holding one file, SKILL.md, that Claude reads before it starts and then follows step by step, in order. Investigation-open is a folder holding a single SKILL.md with instructions, in plain language, for opening a new investigation matter and running intake. Claude reads that file top to bottom and works through it step by step, branching only where the file itself says to.

## Specification, not judgment

This structure makes a skill a specification, not new judgment. The payoff is consistency: the same intake runs for every matter, every time. The limit is scope: anything outside those written steps, and Claude has no special opinion about it. Investigation-open never gave Claude the power to decide when to investigate. It guarantees only that when the skill runs, Claude reads the same file and opens the matter and runs intake the same way each time. That's the whole mechanism.

## Why deleting the skill changes nothing about authority

If the skills folder were deleted, Claude wouldn't lose any power to decide when to investigate, because it never had that power to begin with. What disappears is one specific intake checklist, not a decision-making capability. That distinction matters for anyone assessing what this kind of skill is actually responsible for versus what stays a human call.

## What watching the intake run does and doesn't prove

Watching Claude open a matter and run a thorough intake doesn't prove it judged the underlying issue correctly. A checklist can be followed to the letter and still miss something it was never asked to check. Watching Claude leave a matter unopened doesn't prove something is wrong either; it may just be a case nobody asked it to open. Neither outcome is evidence about whether the underlying workplace issue was correctly assessed, because the skill's job is procedural intake, not investigative judgment.

## Trying it yourself

Pick one recurring record you open the same way every time, a support ticket, an incident report, a new client file. Ask Claude to write a SKILL.md for it, plain language, ordered steps, then have it read the file back to you and walk through exactly what it will open and log before it opens anything. Running this against a record you actually handle repeatedly shows the same mechanism directly.

## Key takeaways

- Claude's investigation-open skill is one plain-language SKILL.md describing how to open a matter and run intake.
- Claude follows the file's steps in a fixed order, branching only where the file explicitly says to.
- A skill is a checklist Claude executes, not a new power to decide when an investigation is warranted.
- The same intake runs for every matter, every time the skill executes; anything outside the written steps is still a human decision.
- A thorough intake or a skipped one proves nothing on its own about whether the underlying issue was judged correctly.

## Who this is for

HR, legal, and compliance teams evaluating whether Claude can help standardize intake on new matters, and anyone who wants a clear picture of where a Skill's responsibility ends and human judgment begins.
