---
title: "Claude, Brief Section Drafter., YouTube metadata"
seoTitle: "Can Claude Draft a Legal Brief Section?"
description: "How Anthropic's brief-section-drafter Skill drafts one brief section to a case theory, citing every fact, while checking still stays the lawyer's job."
summary: "Liam explains the brief-section-drafter Claude Skill, which drafts a single legal brief section in house style tied to the case theory, citing every fact and case, while final verification remains the lawyer's responsibility."
keywords: ["can claude write a legal brief section", "anthropic skill for drafting brief arguments", "how to draft a brief argument section with claude", "claude brief section drafter skill explained", "citing facts and cases in an ai drafted brief", "claude skill house style case theory constraint", "ai legal drafting still needs lawyer review", "prompt for drafting a legal argument section in claude"]
generated: "article"
---

Can Claude write your whole legal brief? Liam opens with the honest answer: not quite. The brief-section-drafter Skill from Anthropic drafts one section, written to your case's own theory, and every fact and case it cites still needs a lawyer's check before it goes anywhere.

## A skill is a folder, not a legal mind

Like other Claude Skills, brief-section-drafter is a folder Claude reads before it works. The SKILL.md file inside holds the full instruction set in plain language, with no hidden logic running outside it. Claude reads the file and then acts, the file is the program that determines what happens next, not some general legal reasoning ability.

## How the pipeline runs

The pipeline lives in the file's step section. Claude reads each step in order and runs it, linear execution, with no branching unless a specific step calls for one. This matters for a legal-drafting tool specifically: a predictable, inspectable sequence is easier to trust than an opaque process, because a lawyer reviewing the output can also review the steps that produced it.

## The constraint that makes the draft usable

The interesting part is the specific constraint the skill drafts to. It writes one section in house style, consistent with the case's own theory, with every fact cited, every case checked, and every argument tied back to that theory. Stay inside that scope and the draft holds its shape every time, same specification in, same section out, run after run.

## What still belongs to the lawyer

The video draws a clear line: checking the facts, checking the cases, and anything that falls outside the stated specification is still the lawyer's job. The skill produces a draft shaped by house style and case theory, not a verified final document. Citations that appear in the draft still need to be checked against the actual record, the skill's consistency is about following a process reliably, not about independently confirming that every cited fact is correct.

## The Your Turn prompt

The video closes with a paste-ready prompt for readers who want to try this directly: describe having a case theory and sources ready, ask Claude to read the brief-section-drafter skill, have it state exactly what facts and cases it needs before drafting a single sentence, and then have it draft the section in house style, citing every fact and case as it goes. Asking for that up-front list of needed material is what turns the skill from a black box into something a lawyer can check against their own file before a draft is even produced.

## Key takeaways

- brief-section-drafter drafts one brief section, not a complete legal brief.
- The skill runs from a SKILL.md file executed step by step, in order, with no hidden branching.
- Its constraint is specific: house style, consistent with the case theory, every fact cited, every case checked, every argument tied to the theory.
- Same specification produces the same drafted section every run.
- Verifying facts, cases, and anything outside the stated scope remains the lawyer's responsibility.

## Who this is for

Lawyers and legal staff evaluating whether an AI drafting tool can help with brief sections, and anyone curious how a Claude Skill constrains its own output to a specific, checkable format instead of open-ended writing.
