---
title: "Claude, Cocounsel Legal: Deep Research."
seoTitle: "What a Claude Skill Actually Is (Cocounsel Example)"
description: "Explains why Claude's deep-research skill for legal research is a written procedure, not legal judgment, using CoCounsel Legal as the example."
summary: "Using CoCounsel Legal's deep-research skill as a concrete case, this video explains that a Claude skill is a single SKILL.md file of ordered steps, not a form of independent judgment."
keywords: ["how claude skills actually work", "what is a skill.md file", "claude skill vs legal judgment", "cocounsel legal deep research skill", "westlaw deep research with claude", "does claude have legal judgment", "why delete a skills folder", "claude skill file structure explained"]
generated: "article"
---

Claude picked up a skill called deep-research inside CoCounsel Legal. It looks like Claude went off and applied its own legal judgment to research a question. It didn't. This video walks through what a Claude skill actually is, using that one skill as a concrete example, and explains why the process it runs is a specification rather than a form of reasoning.

## What a skill really is

A skill is a folder containing a single file, SKILL.md, written in plain language. Claude reads that file before it starts a task and then works through it top to bottom, in the order it's written, with no branching unless the file itself instructs a branch. In the CoCounsel Legal case, that file holds instructions for turning a research question into a synthesized, cited answer using Westlaw Deep Research. Nothing about Claude's underlying reasoning changes when the skill is present. The skill only tells Claude which steps to follow and in what order.

## The delete-the-folder test

The video uses a simple test to make the point concrete: delete the skills folder and Claude loses no legal reasoning, because nothing was added to it in the first place. What disappears is the procedure, not any capability. That is the core argument of the video: a skill is a written specification for a process, not a new form of judgment layered on top of Claude's abilities. The payoff of following the file is consistency, the same search-and-cite process runs every time the same question type comes up. The limit is that anything the file never wrote down is outside what Claude will reliably do, since there is no fallback judgment kicking in to cover the gap.

## Why a good or bad result doesn't prove anything

One of the sharper points in the video is that watching Claude produce a well-cited memo, or watching it miss a case, proves nothing on its own about whether legal judgment was exercised. A file can be followed to the letter on a question it never actually weighed well, producing a memo that looks authoritative without reflecting real analysis. Likewise, a missed case doesn't necessarily mean the skill is broken, it may simply be that the written steps never directed a search toward that source. Neither outcome, good or bad, is evidence of judgment, because the mechanism being evaluated is procedure execution, not reasoning.

## What this specific example does and doesn't claim

The video is explicit about scope. It does not describe the exact contents of CoCounsel Legal's deep-research SKILL.md line by line, since that file lives in a legal-research plugin collection not available to inspect directly. Instead, it uses "deep-research" only as a named, real example of a skill-shaped folder, plus the one specific fact that is known, that it performs legal research and synthesis via Westlaw Deep Research. Everything else in the explanation is presented as generic and true of any Claude skill: a folder Claude reads before acting, executed step by step, with a defined payoff and a defined limit.

## Key takeaways

- A Claude skill is one file, SKILL.md, holding plain-language, ordered instructions that Claude reads before starting and follows step by step.
- Deleting a skill's folder removes a procedure, not a capability, because the skill never added new reasoning in the first place.
- A skill's payoff is consistency across runs; its limit is anything the file doesn't specify.
- A well-cited result doesn't prove judgment was used, and a missed source doesn't prove the skill is broken, both outcomes are about procedure, not reasoning.
- The video does not claim to know CoCounsel Legal's exact SKILL.md contents beyond that it uses Westlaw Deep Research for legal research and synthesis.

## Who this is for

This is for anyone using or evaluating an AI legal research tool, or building their own Claude skills, who wants a clear mental model for what a "skill" actually does under the hood before assuming it reflects independent reasoning.
