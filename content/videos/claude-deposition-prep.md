---
title: "Claude, Deposition Prep."
seoTitle: "Does Claude's deposition-prep skill know witnesses?"
description: "Explains why Claude's deposition-prep skill is a written checklist it follows in order, not learned courtroom instinct about witnesses."
summary: "A walkthrough of Claude's deposition-prep skill showing it is a plain SKILL.md checklist for organizing witness documents, not acquired courtroom judgment."
keywords: ["does claude know how to prep a deposition", "claude deposition prep skill explained", "what is a SKILL.md file in claude", "organize witness documents with claude ai", "claude skill for ediscovery case theory", "flag impeachment material with claude", "claude skill vs courtroom instinct", "write a SKILL.md for a repeated task"]
generated: "article"
---

Claude's deposition-prep skill sounds like it hands the model real courtroom instinct, as if it studied depositions and came back knowing how to corner a witness. It didn't. This video uses deposition-prep as a concrete example to show what a Claude skill is: a folder holding one written checklist that Claude reads and follows in order.

## The naive framing, and why it's wrong

The natural assumption is that a skill named "deposition-prep" gave Claude something like judgment. Nothing in the model changes when the skill is added. Delete the skills folder and Claude doesn't forget how to question a witness, because there was no instinct there to lose. It just stops following that one checklist. Deleting the folder and watching nothing get forgotten is the clearest way to see a skill is a specification, not a capability.

## What the deposition-prep skill actually contains

A skill is a folder holding a single file, SKILL.md, written in plain language. Deposition-prep's file lays out steps for pulling a witness's documents from the eDiscovery platform, organizing them around the case theory, and surfacing impeachment material. Claude reads that file top to bottom before it starts, then works through it step by step in the order written: pull documents, sort by case theory, flag impeachment material. There's no branching unless the file itself calls for it.

## Spec, not instinct

That structure produces a payoff and a limit at the same time. The payoff is a consistently organized outline for every witness. The limit is any question outside those written steps, where Claude is simply off the map. Deposition-prep never taught Claude how to cross-examine anyone; it guarantees that every time it runs, Claude reads the same file and produces the same kind of organized outline.

## Why the output alone proves nothing

A sharp outline doesn't prove Claude understood the witness. The checklist can be followed to the letter on a case Claude never really grasped. A thin outline doesn't prove the skill is broken either, it may just be a case the file's fixed structure doesn't fit well. Neither result is evidence of comprehension, only of whether the steps were followed.

## Try it yourself

Pick a task you do the same way every time, an outline, a report, a checklist. Ask Claude to write a SKILL.md for it in plain language with ordered steps, then have it read that file back to you and walk through exactly what it will do before doing it. Running this against something you actually repeat is the fastest way to see the mechanism outside the legal example.

## Key takeaways

- Deposition-prep is a folder holding one file, SKILL.md, not acquired courtroom judgment.
- Deleting a skill's folder erases nothing Claude "learned," because skills don't add instinct.
- The file's steps are: pull witness documents from eDiscovery, sort by case theory, flag impeachment material.
- The payoff of the skill is a consistent, organized outline every run; the limit is anything the file leaves unwritten.
- Neither a sharp outline nor a thin one proves the model understood the witness or the case.

## Who this is for

Anyone evaluating whether a Claude skill can meaningfully support litigation prep work, and anyone who wants a template for turning a document or outline they produce repeatedly into a written, ordered SKILL.md.
