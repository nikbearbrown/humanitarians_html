---
title: "Claude, Analyzing Financial Statements"
seoTitle: "How Claude's Financial-Statement Skill Works"
description: "Explains how Claude's analyzing-financial-statements skill runs the same fixed steps and scripts on any balance sheet you hand it."
summary: "This video breaks down the analyzing-financial-statements skill, showing that Claude runs a fixed three-step script pipeline on any balance sheet, whether or not it fits the spec."
keywords: ["how claude analyzes financial statements", "claude financial ratios skill explained", "calculate_ratios.py interpret_ratios.py claude", "claude skill.md steps explained", "does claude reason about finance", "same input same output claude skill", "claude balance sheet analysis tool", "limits of a claude financial skill"]
generated: "article"
---

Analyzing a balance sheet with Claude isn't Claude reasoning about finance on its own. It's a Skill, a folder of scripts and one instruction file that Claude reads and executes the same way every time. This video walks through the analyzing-financial-statements skill to show exactly what that mechanism is and where its limits are.

## What's inside the skill folder

The skill consists of two Python scripts, calculate_ratios.py and interpret_ratios.py, plus a two-kilobyte SKILL.md holding the full instruction set in plain language with no hidden logic. Claude reads the file, then acts, the file is the program. This is a useful correction to a common assumption: Claude isn't trained to analyze financial statements in some general sense, it's pointed at a written procedure that tells it what to do when a statement comes in.

## Three steps, always in the same order

The instructions sit in a Steps section: read SKILL.md, execute each step in order, return the result. It's linear, with no branching unless a step explicitly says otherwise. In practice that means three steps every time: read the numbers off the statement, run calculate_ratios.py, and hand back the ratios. Hand the skill the identical balance sheet twice and calculate_ratios.py returns identical ratios both times. That consistency is the direct payoff of the file being the program rather than Claude improvising an analysis from scratch each time.

## Same steps run even when the statement doesn't fit

The video's sharpest point is that this consistency cuts both ways. Hand the skill a statement the steps weren't written for, and it still runs those same steps against numbers SKILL.md never specified. There's no validation step checking whether the input actually matches what the skill expects, it just executes. The limit of the skill is the spec itself, only what SKILL.md names gets handled correctly, and everything outside that is run through the same mechanical process regardless of fit.

## What this does and doesn't claim

The video is careful to name only what its source material specifies. It doesn't take a position on whether the skill's documentation should cover more statement formats or ratio types, that's a separate kind of critique. It also doesn't claim specific ratios or formulas beyond what the source narration itself named, key financial ratios and metrics for investment analysis, since the underlying SKILL.md file wasn't available to inspect directly. And it doesn't claim the skill validates its input, only that it runs the same steps regardless of whether the statement fits the spec.

## Key takeaways

- A financial-analysis skill is a folder: scripts plus one SKILL.md file that Claude reads before acting, the file is the program.
- The process is three linear steps: read the statement, run calculate_ratios.py, return the ratios, with no branching unless a step says otherwise.
- Identical input produces identical output every run, because the same script executes the same way each time.
- The skill runs its steps even on a statement it wasn't written for, since there's no built-in check for fit, only for the steps themselves.
- The limit of any skill is its spec, only what SKILL.md names is handled, everything else still gets processed the same mechanical way.

## Who this is for

This is for analysts and finance teams deciding whether to trust a Claude skill with balance-sheet analysis, and for anyone building their own SKILL.md who wants a concrete example of how a scripted, linear ratio-analysis pipeline is structured.
