---
title: "Claude, Deadlines"
seoTitle: "Claude deadlines skill: computes, doesn't track"
description: "Explains how Claude's deadlines skill computes a legal deadline from a triggering date and a stated rule, not by tracking your matter itself."
summary: "Shows how Claude's deadlines skill computes a resulting date from a triggering date and a user-supplied rule, while knowing which rule governs a matter stays a human decision."
keywords: ["can claude track my legal deadlines automatically", "how does claude deadlines skill compute a date", "claude skill for filing window and response period", "triggering date plus legal rule equals due date", "claude skill.md computes not tracks deadlines", "statute of limitations deadline calculation with claude", "same rule same calendar every time claude skill", "which rule governs my legal matter is still mine"]
generated: "article"
---

Can Claude just track your legal deadlines for you? Not exactly. Anthropic's deadlines skill computes a calendar from a triggering date and the rule you give it, a filing window, a response period, a limitations period, and returns what's due. Knowing which rule actually governs your matter is still a decision that stays with you.

## A skill is a folder, not a tracker

A Claude Skill is a folder Claude reads before it works. Deadlines is one such folder, and its SKILL.md file holds the full instruction set in plain language, with no hidden logic. Claude reads the file, then acts on it. This distinction matters here specifically: the skill isn't monitoring your calendar or watching for new filings on its own. It computes a specific date from specific inputs you provide, each time you run it.

## How the pipeline runs

The pipeline sits in the file's step section. Claude reads each step in order, then runs it, linearly, with no branching unless a step specifically says so. That structure holds regardless of which type of deadline is being computed, filing, response, or limitations.

## What the skill actually computes

The constraint is specific: take a triggering date and the rule that governs it, then compute the resulting date. Stay inside that rule, and the calendar holds its shape every time, the same rule produces the same result on every run. This is a computation, not a lookup: the skill isn't consulting a database of deadlines, it's applying a stated rule to a stated starting date.

## What stays with you

Knowing which rule actually governs your matter is still yours to determine. The skill computes correctly given a rule, but it doesn't determine which rule applies to a given jurisdiction, filing type, or set of facts. That determination requires legal knowledge specific to the matter, and the skill's file doesn't claim to provide it.

## Trying it yourself

A direct way to see this in action is to describe your own triggering date and deadline rule to Claude, ask it to read the deadlines skill, state exactly what it needs from you before it computes anything, and then work out the resulting date and show the calculation. Watching that calculation happen makes clear the skill is doing arithmetic against a rule you supplied, not independently researching your matter.

## Key takeaways

- Claude's deadlines skill computes a resulting date from a triggering date and a stated rule; it doesn't track deadlines on its own.
- The skill's steps execute in a fixed, linear order from one plain-language SKILL.md file.
- The same rule and triggering date always produce the same computed deadline.
- The skill doesn't determine which rule governs a given matter; that remains a human legal judgment.
- Asking Claude to show its calculation is a direct way to verify the computation matches the stated rule.

## Who this is for

Litigation support staff and anyone tracking legal deadlines who wants a reliable way to compute a date from a known rule, while understanding that determining the correct rule itself still requires legal judgment.
