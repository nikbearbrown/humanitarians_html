---
title: "Claude, Invention Intake."
seoTitle: "Claude invention-intake skill: what it screens"
description: "Explains how Claude's invention-intake skill runs six fixed checks on a disclosure and returns pursue, investigate, or decline, never patentable."
summary: "Walks through the six checks Claude's invention-intake skill runs on an invention disclosure before it reaches a lawyer, and why it never calls anything patentable."
keywords: ["can claude tell me if my invention is patentable", "how does invention intake skill work", "claude skill for invention disclosure screening", "novelty obviousness section 101 screening claude", "claude skill pursue investigate decline verdict", "screening an invention before a patent lawyer", "why claude never says patentable", "claude invention intake six checks explained"]
generated: "article"
---

Can Claude tell you if your invention is patentable? No, and it won't pretend to. What it does instead is screen a disclosure before it ever reaches a lawyer, using a fixed six-check process that ends in one of three plain verdicts.

## The six screens, in order

The invention-intake skill runs six checks in a fixed sequence: novelty, obviousness, Section 101 eligibility, bar dates, detectability, and strategic value. Each check runs the same way every time, and the skill returns one of three verdicts once all six are done: pursue, investigate, or decline. This is a triage step, meant to happen before a disclosure ever lands on an attorney's desk, not a replacement for that attorney.

## Why it never says "patentable"

The skill is deliberately bound not to use the word patentable. That determination requires a prior-art search and a registered patent attorney, neither of which the skill performs. Six screens in, one verdict out, every time, but the actual patentability call stays with counsel. This restraint is built into the skill itself: it's not that Claude is being cautious in the moment, it's that the instruction file is written to withhold that specific claim.

## What a Claude Skill is, generally

This is worth understanding on its own terms: a Claude Skill is a folder Claude reads before it works, holding the full instruction set in one plain-language file. There's no hidden logic layered underneath. The file is the program, Claude reads it, and then follows its steps. For invention-intake, that means the six screens and the pursue/investigate/decline verdict are exactly what's written in the file, nothing more.

## Why this structure matters for a real disclosure

Running an invention description through six named legal-adjacent checks in a fixed order gives you something concrete before you spend a lawyer's time: a structured first pass that flags where a disclosure might have novelty problems, obviousness problems, or eligibility problems, plus questions about timing (bar dates), whether the invention is even detectable if used by a competitor, and whether pursuing protection is strategically worth it. None of that substitutes for legal advice, but it can sharpen the conversation you have with an attorney.

## Trying it yourself

A direct way to see the mechanism is to describe an internal, not-yet-disclosed invention to Claude, ask it to read the invention-intake skill, state what it needs from you before it screens anything, and then run all six checks for a bottom-line verdict. Watching that sequence run makes the six-check structure and the verdict logic concrete rather than abstract.

## Key takeaways

- Claude's invention-intake skill runs six fixed checks: novelty, obviousness, Section 101 eligibility, bar dates, detectability, and strategic value.
- The skill returns one of three verdicts, pursue, investigate, or decline, and never calls anything patentable.
- That word is reserved for a prior-art search and a registered patent attorney, which the skill doesn't provide.
- A Claude Skill is a plain-language instruction file Claude reads and follows, with no hidden logic.
- The skill is meant to screen a disclosure before it reaches a lawyer, not to replace that lawyer.

## Who this is for

Inventors, engineers, and founders who want a structured first pass on an invention disclosure before involving counsel, and anyone curious how a legal-adjacent Claude Skill is deliberately constrained in what it's allowed to claim.
