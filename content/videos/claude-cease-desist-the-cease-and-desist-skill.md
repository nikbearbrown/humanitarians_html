---
title: "Claude, Cease Desist., The Cease-and-Desist Skill"
seoTitle: "How Claude's Cease-and-Desist Skill Actually Works"
description: "Liam explains how Claude drafts a cease-and-desist letter by following a SKILL.md file's linear steps, not independent legal judgment."
summary: "Liam explains that Claude does not independently decide what goes in a cease-and-desist letter, it follows a linear SKILL.md file including one specific rule about which drafts count as attorney work product."
keywords: ["how does claude cease and desist skill work", "does claude decide what goes in a legal letter", "what is a skill md file in claude", "attorney work product cease and desist letter", "claude for legal cease and desist drafting", "why is the final letter not attorney work product", "anthropic skill linear steps legal drafting", "claude read execute return skill pipeline"]
generated: "article"
---

Liam, in for Bear, answers a specific question: when Claude drafts a cease-and-desist letter, is it deciding what to write on its own, or is it following a fixed process? The answer is that it follows steps, not independent judgment, and the video walks through exactly how that process is defined.

## A Skill is a folder with one instruction file

A Skill is a folder with a single instruction file, SKILL.md, written in plain language, with no hidden logic and no freeform judgment. Claude reads that file and then acts. The file is the program. For the cease-and-desist Skill specifically, the instructions live in a steps section that Claude works through directly.

## Read, execute, return

The pipeline itself is simple and linear: read the file, execute each step in order, return the result. There is no branching unless a specific step says otherwise. This means the sequence of what happens when Claude drafts a cease-and-desist letter is fully determined by the file, not improvised in the moment.

## The one specific rule: what carries the "work product" header

One instruction inside the Skill is worth naming directly. The internal draft, the pre-send brief, and the triage memo are all marked as attorney work product, internal legal material not meant to leave the firm. But the letter that actually goes out is not marked that way, because it is written to be read by the other side, not filed away internally. Claude is not deciding this distinction on its own. It is following what the SKILL.md file says, one step at a time.

## What this does and does not claim

The video is careful about its scope. It makes no claim about what any specific letter will say in a real case, the mechanism, a named folder, one instruction file, a linear pipeline, and one specific header rule, holds regardless of the facts involved. It also does not claim that Claude replaces a lawyer's review. Throughout, the point is the opposite: Claude follows the file, and the file is the limit of what it does.

## Try it yourself

The video closes with a direct prompt to test on your own situation: tell Claude you think someone is using your brand name without permission, ask it to read the cease-desist skill, and before it drafts anything, have it walk you through exactly what it will do, what steps it will follow, what it needs from you, and what stays out of the letter. Running that on a real situation, rather than the video's example, shows the same mechanism directly.

## Key takeaways

- Claude does not independently decide the contents of a cease-and-desist letter; it follows a written SKILL.md file.
- The Skill's pipeline is linear: read the file, execute each step in order, return the result, with branching only where a step specifies it.
- Internal drafts, pre-send briefs, and triage memos are marked attorney work product, but the outgoing letter is not, because it is written for the other side to read.
- This is a mechanism claim, not a claim about what any specific real-world letter will say.
- Claude following the Skill's steps is not a substitute for a lawyer's review of the final letter.

## Who this is for

This is for legal professionals and anyone using Claude to draft cease-and-desist correspondence who wants to understand exactly what the AI is and is not deciding on its own.
