---
title: "Claude, Demand Received., The Demand-Received Skill"
seoTitle: "How Claude's Demand-Received Skill Triages Letters"
description: "Liam explains how Claude's demand-received skill extracts fields, cross-checks the portfolio, and hands escalations off instead of deciding alone."
summary: "Liam walks through the demand-received Claude Skill, showing how it extracts a demand letter's key fields, cross-checks the portfolio, assesses merit, and hands off to another skill when escalation is warranted rather than deciding on its own."
keywords: ["how does claude triage a demand letter", "claude demand received skill explained", "claude skill for legal demand intake", "when does claude escalate a demand letter", "extracting fields from a demand letter with ai", "claude skill.md triage pipeline example", "portfolio cross check demand letter ai", "does claude reply to demand letters automatically"]
generated: "article"
---

When an inbound demand letter arrives, the assumption might be that Claude simply drafts a reply. It does not. Liam explains how the demand-received skill triages the letter first, following a fixed sequence that ends either in a recommended response or a hand-off to another skill for escalation.

## What a Skill is, in this case

A Skill is a folder Claude reads before it acts, and this one is called demand-received. Inside is a single file, SKILL.md, holding the whole instruction set written in plain language with no hidden logic. Claude reads that file and then acts on it; the file itself is the program. The instructions live in a step section, and Claude reads each step in order and executes it: read the file, execute each step, return the result. The process is linear, with no branching unless a specific step calls for one.

## The triage pipeline itself

One instruction inside the skill is specific and worth walking through. The skill extracts the letter's key fields, cross-checks those fields against the existing portfolio, and assesses merit. From there it presents response options along with a recommendation. This sequence, extract, cross-check, assess, recommend, is what turns an inbound letter into something a person can act on quickly, rather than starting from a blank read of the letter each time.

## Why escalation is a hand-off, not a decision Claude makes alone

Claude is not deciding on its own whether to escalate a matter. When the assessment indicates escalation is warranted, the skill hands the letter off to matter-intake or demand-intake instead of Claude resolving it independently. This is a deliberate structural choice: the skill's job stops at triage, assessment, and a recommendation, and any case that needs escalation moves to a separate process rather than getting a final answer from Claude directly.

## What this buys over an unstructured reply

Without a skill like this, asking Claude to just respond to a demand letter risks skipping the cross-check against the portfolio or the merit assessment altogether, since nothing forces those steps to happen in order. With the skill, the same fields get extracted, the same cross-check happens against the portfolio, and the same escalation logic applies every time a letter comes in, regardless of who is running it or when.

## Key takeaways

- The demand-received skill triages an inbound demand letter before any response is drafted; Claude does not just reply.
- The skill is a single SKILL.md file that Claude reads and executes step by step, in order, with no branching unless a step specifies it.
- The triage sequence is: extract key fields, cross-check against the portfolio, assess merit, then present response options with a recommendation.
- When escalation is warranted, the skill hands off to matter-intake or demand-intake rather than Claude resolving the matter on its own.
- The mechanism holds regardless of the specific letter's content; it does not replace a lawyer's review or judgment.

## Who this is for

This is for legal and claims teams handling inbound demand letters who want a consistent triage process, extraction, cross-check, merit assessment, and a clear escalation path, applied the same way every time.
