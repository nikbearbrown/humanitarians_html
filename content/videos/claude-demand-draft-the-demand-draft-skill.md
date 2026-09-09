---
title: "Claude, Demand Draft., The Demand-Draft Skill"
seoTitle: "How Claude's Demand-Draft Skill Actually Works"
description: "Walks through Claude's demand-draft skill, a four-part legal gate that must clear before Claude drafts a demand letter as a docx file."
summary: "This video breaks down Claude's demand-draft skill, showing how a single instruction file forces a four-part legal check before Claude will draft a demand letter."
keywords: ["how claude drafts a demand letter", "claude demand draft skill explained", "what checks before a demand letter", "privilege rule 408 waiver admission check", "claude skill.md linear instructions", "does claude check before drafting legal letters", "claude legal skill four part gate", "generate demand letter docx with claude"]
generated: "article"
---

When Claude drafts a demand letter, it doesn't just turn facts into prose. It checks first. This video walks through the demand-draft Skill, a single instruction file that forces Claude through a specific legal gate before any draft gets produced, and explains what that gate actually requires.

## A Skill is one file, read before acting

A Skill is a folder holding one instruction file, SKILL.md, written in plain language with no hidden logic and no freeform judgment built in. Claude reads the file before it acts, and the file is effectively the program. For demand-draft, that file is the entire instruction set: what to check, what to produce, and in what order. There's nothing outside the file directing Claude's behavior, which is why understanding the file means understanding exactly what the skill will and won't do.

## Read, execute, return, in order

The instructions live in a step section, and Claude reads each step in order and executes it: read the file, execute each step, return the result. The process is linear, there's no branching unless a specific step says to branch. This matters because it means the skill's behavior is fully determined by what's written down. If a scenario isn't addressed by a step, the skill doesn't improvise around it, it simply doesn't handle that case.

## The four-part gate before any draft

The most specific instruction inside demand-draft is a four-part check that has to clear before any letter gets drafted: privilege, Rule 408, waiver, and admission. Only after those four checks pass does Claude produce the draft, delivered as a docx file, along with a post-send checklist and an offer to open a matter. The video is explicit that Claude isn't exercising its own judgment about when a demand letter is ready to send, the checklist is the judgment. Privilege, Rule 408, waiver, and admission all have to clear first, and that's the mechanism, not a discretionary call Claude makes on its own.

## What this does and doesn't claim

The video makes no claim about what any specific letter will say in a real case, the facts of a matter are outside its scope. What it does claim is the mechanism itself: a named folder, one instruction file, a linear read-execute-return pipeline, and one specific four-part gate that governs when drafting happens. It's also explicit that Claude following this checklist doesn't replace a lawyer's review, the checklist is a limit on what Claude will do unsupervised, not a substitute for legal judgment on the case itself.

## Key takeaways

- The demand-draft Skill is a single SKILL.md file that Claude reads before drafting anything, and that file fully determines the skill's behavior.
- Claude executes the file's steps linearly, read, execute, return, with no branching unless a step explicitly calls for it.
- Before any demand letter is drafted, four checks must clear: privilege, Rule 408, waiver, and admission.
- After those checks clear, Claude produces the draft as a docx file with a post-send checklist and an offer to open a matter.
- The checklist governs readiness to send, not Claude's own judgment, and it does not replace a lawyer's review of the letter.

## Who this is for

This is for lawyers and legal staff evaluating whether Claude can be trusted to draft demand letters responsibly, and for anyone building or reviewing Claude Skills who wants a concrete example of how a gated, multi-step legal workflow is written into a single instruction file.
