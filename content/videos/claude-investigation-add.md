---
title: "Claude, Investigation Add."
seoTitle: "Does Claude's investigation-add skill open cases"
description: "Explains how Claude's investigation-add skill logs a new workplace investigation from a fixed checklist, without giving Claude investigative authority."
summary: "The investigation-add skill has Claude log a new workplace investigation record by following a single written checklist step by step, producing consistent intake but no independent judgment about the case."
keywords: ["can claude open a workplace investigation", "investigation add skill explained", "claude skill md checklist incident logging", "how to write a skill for logging intake records", "why a blank field doesnt mean nothing is wrong", "specification versus judgment ai investigations", "claude ai investigative authority explained", "building a repeatable intake checklist with claude"]
generated: "article"
---

Claude picks up a skill called investigation-add. Does that mean it can open a workplace investigation on its own? No. A skill is a folder holding one file, SKILL.md, that Claude reads before it starts and then follows step by step, in the order written. Nothing about Claude's own authority or judgment changes; what it gets is a checklist for logging a new case consistently.

## Proof by deletion

Delete the skills folder and Claude loses no investigative authority, because there was none to begin with. It just stops following that one checklist for logging a new case. That is the clearest way to see what this skill actually is: a specification for how to log something, not a new capacity to decide when an investigation should open.

## What's actually inside the file

Investigation-add is a folder holding a single SKILL.md file with instructions for logging a new workplace investigation step by step, written in plain language Claude reads before it starts. Claude reads the file top to bottom and works through it in the order written, with no branching unless the file itself says to branch. That structure makes it a specification, not judgment: the payoff is the same intake process on every investigation, every time; the limit is that anything outside those written steps gets no special treatment from Claude.

## What the checklist actually guarantees

Investigation-add never gives Claude authority to open a case. What it guarantees is that every time it runs, Claude reads the same file and logs the case the same way. That consistency is the entire mechanism, and it matters in a context where inconsistent intake, missing fields, differently worded entries, undermines the reliability of the record later.

## Why a filled or blank field isn't proof of anything

Watching Claude fill in every field of a new investigation record does not prove it judged the situation correctly. A checklist can be followed to the letter and still miss something it was never asked to check. Watching it leave a field blank does not prove nothing is wrong either; it may just be a case the checklist does not cover. Neither outcome tells you whether the underlying case was actually assessed correctly, only whether the checklist's defined fields were addressed.

## What it does not do

A skill named investigation-add does not hand Claude authority to open or judge a case. It is a checklist Claude reads before it starts, ensuring the same intake happens every time, while anything outside those specific steps remains entirely the responsibility of the person running it.

## Writing your own version

The exercise offered is to pick one record you fill out the same way every time, an incident log, an intake form, a status update, and write a SKILL.md for it: plain language, ordered steps. Then have Claude read it back and walk through exactly what it will log before logging it. Doing this on a record you actually use repeatedly shows what a written checklist captures reliably and what still depends on human judgment.

## Key takeaways

- A skill named investigation-add does not give Claude authority to open or judge a workplace investigation; it is a checklist for logging one consistently.
- Deleting the skill folder removes no investigative authority, because none existed to begin with.
- The value is consistent intake: the same fields logged the same way, every run.
- A fully filled record is not proof of correct judgment, and a blank field is not proof nothing is wrong; both only reflect what the checklist covers.
- Writing your own SKILL.md for a repeated record makes visible what you consistently log and what you might be missing.

## Who this is for

HR, legal, and compliance teams who log workplace investigations or similar records repeatedly and want a way to standardize intake without mistaking a consistent checklist for independent case judgment.
