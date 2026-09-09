---
title: "Claude, Form Generation."
seoTitle: "What a Claude Form-Generation Skill Actually Is"
description: "Liam explains why a form-generation Claude Skill is a fixed checklist of fields, not a drafting upgrade, and what deleting the skill folder changes."
summary: "Liam breaks down why a Claude Skill named form-generation is a specification, a checklist of fields read from one file, rather than any new drafting ability, and what that distinction means in practice."
keywords: ["what is a claude skill form generation", "does claude skill improve drafting ability", "claude skill.md fields in order explained", "deleting a claude skill folder effect", "claude fills out legal forms consistently", "is claude skill a specification or power", "how claude skills fill form fields", "claude skill checklist not drafting talent"]
generated: "article"
---

Seeing Claude fill out a legal form using something called a form-generation skill looks like a drafting upgrade, as if Claude gained the ability to compose forms from scratch. Liam explains why that read is wrong, and what a "skill" named form-generation actually consists of: a fixed checklist, not new talent.

## What changes when the skill folder is deleted

The clearest way to see what a skill is not comes from removing it. Delete the skills folder and Claude can still write a sentence, still draft language, still respond to a request. What it loses is the one fixed checklist of fields for that particular form. Nothing about Claude's underlying drafting ability changes, because that ability was never stored in the skill folder to begin with. The skill only ever held instructions, not capability.

## A skill is one file: SKILL.md

A skill folder holds a single file, SKILL.md, containing plain-language instructions for which fields a form needs and where the relevant facts should go. Claude reads that file top to bottom before it starts and fills each field in the order the file lists, with no branching unless the file itself calls for one. The file is the entire mechanism. There is no separate reasoning layer beyond following that list in sequence.

## Specification, not drafting power

This makes a skill a specification rather than a source of drafting power. The payoff is consistency: the same field layout comes out every time the skill runs, on every form it covers. The limit is just as concrete: any field the file never listed is a field Claude has no instructions for, and the skill does nothing to help there. A form-generation skill never taught Claude how to draft a legal document from nothing; it guarantees that every run reads the same checklist and fills the same fields in the same order.

## Why watching one run does not prove understanding

Watching Claude produce a clean, correctly filled form does not prove it understood the underlying request. It may simply have followed the checklist correctly on a case that happens to fit the checklist's assumptions. The reverse is equally true: watching Claude leave a field wrong or empty does not prove the skill is broken. It may be a case the checklist was never written to cover in the first place. Neither a clean run nor a flawed run is, by itself, evidence about the skill's quality or about Claude's comprehension of the request.

## What this means for using skills on real forms

Because a skill is a specification, its usefulness depends entirely on how complete and accurate that specification is for the form or document type it targets. Someone wanting the same consistency for a form they fill out repeatedly can write their own SKILL.md: a plain-language list of fields, in order, describing exactly what each one needs. Claude then reads that list before acting, the same way it does with any other skill, and every run comes out with the same structure.

## Key takeaways

- A Claude Skill folder like form-generation is a specification, a checklist of fields, not a source of new drafting ability.
- Deleting the skill folder does not remove any drafting capability; Claude can still write, it just stops following that specific fixed checklist.
- The skill consists of one file, SKILL.md, read top to bottom, with fields filled in the listed order and no branching unless instructed.
- The payoff is consistent field layout across every run; the limit is any field the file never documented.
- A clean form fill does not prove understanding, and a flawed one does not prove the skill is broken; both depend on whether the checklist covers that case.

## Who this is for

This is for anyone using or building Claude Skills for repetitive form-filling or document-drafting tasks who wants a clear picture of what a skill actually guarantees before relying on it.
