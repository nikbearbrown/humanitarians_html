---
title: "Claude, Closing Checklist."
seoTitle: "How Claude's Closing Checklist Skill Actually Runs"
description: "Liam explains how Claude's closing-checklist skill works: a single SKILL.md file with a linear steps section Claude follows exactly, no hidden judgment."
summary: "Liam explains that Claude does not use legal judgment to build a closing checklist, it reads a single SKILL.md file and runs its steps in order, with no branching beyond the file."
keywords: ["how does claude closing checklist skill work", "what is a skill md file in claude", "does claude use judgment or a written spec", "anthropic skill for legal closing checklist", "why claude skills run the same way every time", "how to read a skill md before running it", "claude skill steps section explained", "claude for legal transaction closing checklist"]
generated: "article"
---

Liam, in for Bear, answers a specific question: does Claude apply its own legal judgment to build a closing checklist, or does it follow a written instruction file? The answer is the latter, and the video walks through exactly how that mechanism works using Anthropic's closing-checklist skill.

## A skill is a folder, not a judgment call

A skill is a folder that Claude reads before it works. The closing-checklist skill holds one file, SKILL.md, containing the whole instruction set written in plain language, with no hidden logic. Claude reads that file and then acts on it. The file is the program, not a set of guidelines Claude interprets loosely.

## The steps section is the whole pipeline

The actual pipeline lives in the file's Steps section. Claude reads each step in order and runs it, linear, with no branching unless a step itself specifies one. This means the entire logic of the checklist is visible in the file itself, not hidden inside Claude's own reasoning.

## Why the same request runs the same way every time

Ask for a step that is written in the file, and it runs the same way every time. That reliability comes from the fact that it is spec, not judgment, driving the execution. Ask for something the file never mentions, and nothing fills the gap. That step simply is not part of the run. This is the hard edge of the mechanism: the skill does exactly what its file says, and nothing that its file does not say.

## What this does and does not claim

The video is explicit about scope. It does not claim the closing-checklist skill is well designed, that is a separate question about design quality. It also does not claim to describe every specific legal task the skill performs beyond building and tracking a transaction's closing checklist, since the source material left some of its more specific clauses unfilled. And it does not claim Claude goes silent outside the spec entirely, only that an unwritten step is not part of that particular run.

## Try it yourself

The video ends with a direct prompt to test the mechanism: tell Claude you are closing a transaction and want to use the closing-checklist skill, then ask it to read the SKILL.md and walk you through each step it will run, in order, before it runs any of them. Watching Claude name its steps up front, in the order the file specifies, shows the same fact directly: the file is the program, and the order is the whole spec.

## Key takeaways

- Claude does not use independent legal judgment to build a closing checklist; it follows a written SKILL.md file.
- A skill's Steps section defines a linear pipeline: each step runs in order, with branching only where a step specifies it.
- A step that is written in the file runs the same way every time, because it is spec, not judgment.
- A step the file never mentions is not filled in by Claude's own initiative, it simply is not part of the run.
- Asking Claude to list its steps before running them is a direct way to see the file's spec laid out in full.

## Who this is for

This is for anyone using Claude for legal or transactional work who wants to understand what a skill actually is and how much of its behavior is fixed by the instruction file versus left to the model's own judgment.
