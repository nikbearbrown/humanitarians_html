---
title: "Is Claude My Contract's Lawyer?"
seoTitle: "How Claude's Contract Review Skill Actually Works"
description: "Explains how Claude's contract review skill runs a fixed checklist from SKILL.md, and why a flag is not a verdict and a clean pass is not a clean bill."
summary: "Liam explains that Claude's contract review skill is a fixed checklist run from a SKILL.md file, not a lawyer's judgment, using a freelance contract's termination clause as the example."
keywords: ["is claude my contracts lawyer", "how does a claude skill work", "what is skill.md in claude", "does claude review contracts like a lawyer", "why a flag is not a verdict", "claude contract review skill explained", "checklist for reviewing a freelance contract", "what a claude skill checklist misses"]
generated: "article"
---

People ask Claude to review a contract expecting something like a lawyer's judgment. What actually runs is a written file called SKILL.md, and this video, narrated by Liam, walks through the difference: a fixed checklist executed the same way every time, not a weighing of the document clause by clause.

## The natural assumption and why it's wrong

The intuitive picture is that Claude reads a contract the way a lawyer would, considering the whole document, weighing tradeoffs, applying judgment case by case. That is not what a Claude skill does. A skill is a folder Claude reads before it acts, and SKILL.md is the entire instruction set inside it, written in plain language with no hidden logic layered underneath. The pipeline is fixed: read the file, execute each step in order, return the result. It is linear, with no branching unless a specific step calls for one.

## What a checklist buys you

That design is a deliberate tradeoff. Turning contract review into a written checklist instead of an open-ended judgment call means the same input produces the same output every time it runs. That consistency is the entire value proposition of a skill: repeatable, predictable behavior instead of a fresh, possibly inconsistent read each time.

## The anchor example: a flagged termination clause

The video runs a freelance contract through the skill, and the termination clause comes back flagged. That flag exists because the checklist specifically names termination clauses as something to look for, not because Claude weighed the clause and judged it problematic. An arbitration clause elsewhere in the same contract, one the checklist never mentions, gets no comment at all, and that silence does not mean the arbitration clause is fine. It means it was never on the list to begin with.

## Why the same flag returning proves consistency, not judgment

Running the identical contract through the skill a second time produces the identical flag. That repetition is the point: a flag means a listed check matched something in the document, nothing more and nothing less. It is not a verdict on whether the contract is good or bad. Just as importantly, a clean pass, no flags at all, is not a clean bill of health either. It only means nothing on the checklist tripped. Whatever the checklist never named stays invisible whether the contract passes clean or gets flagged everywhere.

## Making the invisible checklist visible

The practical takeaway the video hands off is a way to surface what a skill will and will not check before it runs. Before asking Claude to review a contract, the suggested prompt asks it to first list exactly what it will check for and what it will not, and only then perform the review. That first list turns an otherwise invisible checklist into something the person reviewing the contract can actually see and evaluate, so they know which parts of their own read-through still need to happen by hand.

## Key takeaways

- A Claude skill is a folder containing SKILL.md, a fixed, linear checklist read before Claude acts, not an open-ended judgment process.
- A flag on a contract clause means a specific listed check matched something in the text, not that Claude judged the clause to be a problem.
- Silence on a clause the checklist never named does not mean that clause is fine; it means it was never checked.
- Running the same contract through the skill twice produces the same flag both times, which demonstrates consistency, not a verdict.
- Asking Claude to list what it will and will not check before reviewing a contract turns an invisible checklist into a visible one.

## Who this is for

Anyone using Claude, or any AI skill built on a fixed checklist, to review contracts, code, or other documents will benefit from understanding that a flag is a match against a known list, not a substitute for a human's own read-through.
