---
title: "Claude, Internal Investigation."
seoTitle: "Claude internal-investigation: framework, not judgment"
description: "Explains why Claude's internal-investigation skill is a fixed organizing framework, not a new ability to decide who did something wrong."
summary: "Uses Claude's internal-investigation skill to show that organizing an investigation step by step is a fixed framework, not evidence Claude can judge who is at fault."
keywords: ["does claude decide who is at fault in an investigation", "how does claude internal investigation skill work", "claude skill for organizing an internal investigation", "claude skill.md instructions explained simply", "why claude has no investigative judgment", "same framework every internal investigation claude", "write me a skill.md for a repeated process", "claude skill flags irregularities not wrongdoing"]
generated: "article"
---

Claude has a skill called internal-investigation, which raises an obvious question: did it get judgment about who did something wrong? No. A Claude Skill is a folder holding one file, SKILL.md, that Claude reads before it starts and then follows step by step, in order. The internal-investigation skill follows a written framework for organizing an investigation; it does not decide fault.

## What the skill actually is

Internal-investigation is a folder holding a single SKILL.md with instructions, in plain language, for organizing an investigation step by step. Claude reads that file top to bottom and works through it in the order written, branching only where the file explicitly says to. There's no separate reasoning layer deciding who is responsible for what; the file describes a process, and Claude follows it.

## Specification, not judgment

This makes a skill a specification, not new judgment. The payoff is consistency: the same organizing framework applies to every investigation, every time. The limit is scope: anything outside those written steps, and Claude has no special opinion about it. Internal-investigation never gave Claude judgment about who did what. It guarantees only that when the skill runs, Claude reads the same file and follows the same framework each time.

## Why deleting the skill changes nothing about judgment

If the skills folder were deleted, Claude would lose no investigative judgment, because there was none to begin with. What disappears is one specific organizing framework, not a capacity to determine fault. This is worth being precise about, because the skill's name alone suggests investigative authority that the actual mechanism doesn't grant.

## What watching the output does and doesn't prove

Watching Claude flag every irregularity in an investigation doesn't prove it understood what actually happened. A framework can be followed to the letter and still miss something it was never asked to check. Watching Claude flag nothing doesn't prove no wrongdoing occurred, either; it may simply be a case the framework doesn't cover. Neither outcome is proof one way or the other, because the skill's job is structural organization, not substantive determination.

## Trying it yourself

Pick one process you run the same way every time, before opening a file, before closing one. Ask Claude to write a SKILL.md for it, plain language, ordered steps, then have it read the file back to you and walk through exactly what it will do before doing it. Running this against a process you actually repeat makes the mechanism concrete.

## Key takeaways

- Claude's internal-investigation skill is one plain-language SKILL.md describing how to organize an investigation step by step.
- Claude follows the file's steps in a fixed order, branching only where the file explicitly says to.
- A skill is a framework Claude executes, not new judgment about who did something wrong.
- The same organizing framework applies to every investigation, every time the skill runs.
- Flagging every irregularity, or flagging none, proves nothing on its own about whether wrongdoing actually occurred.

## Who this is for

Legal, HR, and compliance teams evaluating whether Claude can help structure internal investigations, and anyone who wants a clear picture of where a Skill's role ends and human judgment about fault begins.
