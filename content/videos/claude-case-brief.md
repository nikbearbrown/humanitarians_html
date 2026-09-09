---
title: "Claude, Case Brief."
seoTitle: "Did Claude learn case law with the case-brief skill?"
description: "Explains why Claude's case-brief skill is a plain SKILL.md file it follows step by step, not proof it learned anything about case law."
summary: "A breakdown of Claude's case-brief skill showing a skill is a folder holding one instruction file that Claude reads and follows in order, not a new capability."
keywords: ["did claude learn case law from a skill", "what is a SKILL.md file in claude", "claude case brief skill explained", "how claude skills work step by step", "claude skill vs model capability", "why does deleting a skill not erase knowledge", "write a SKILL.md for a repeated document", "claude skill folder structure explained"]
generated: "article"
---

Claude's case-brief skill sounds like a legal upgrade, as if the model studied case law and came back knowing something new. It didn't. This video uses case-brief as a concrete example to show what a Claude skill actually is: a folder holding one file that Claude reads before it acts and follows in order.

## The naive framing, and why it's wrong

The natural assumption is that a skill named "case-brief" means Claude picked up legal knowledge. Nothing in the model changes when a skill is added. Delete the skills folder and Claude doesn't forget any case law, because there was nothing to learn in the first place. It just stops following that one routine. That single test, delete the folder and see what's lost, is the clearest way to tell a skill from a capability.

## What a skill actually is

A skill is a folder holding a single file, SKILL.md, written in plain language. Case-brief's version holds instructions for turning case facts into a structured brief. Claude reads that file top to bottom before it starts, then works through it step by step in the order it's written. There's no branching unless the file itself calls for branching.

## Spec, not power

That structure gives you a payoff and a limit at the same time. The payoff is consistency: the same brief structure every run, facts, issue, rule, conclusion. The limit is anything the file never wrote down. Case-brief never taught Claude how to read case law; it guarantees that every time the skill runs, Claude reads the same file and produces output with the same shape.

## Why the output alone proves nothing

A clean brief doesn't prove Claude understood the case. The file can be followed to the letter on a case Claude never really grasped, because following steps and understanding content are different things. A messy brief doesn't prove the skill is broken either. It may just be a case the file's fixed structure doesn't fit well. Neither a good result nor a bad one is evidence of comprehension, only of whether the steps were followed.

## Try it yourself

Pick one document you produce the same way every time. Ask Claude to write a SKILL.md for it in plain language with ordered steps, then have it read that file back to you and walk through exactly what it will do before doing it. Running this against a document you actually produce repeatedly is the fastest way to see the mechanism for yourself, outside of the legal example.

## Key takeaways

- A Claude skill is a folder holding one file, SKILL.md, not a change to what the model knows.
- Deleting a skill's folder erases nothing Claude "learned," because skills don't add knowledge.
- Claude reads the file top to bottom and follows its steps in order, with no branching the file doesn't specify.
- The payoff of a skill is consistent structure every run; the limit is anything the file leaves unwritten.
- Neither a clean output nor a messy one proves the model understood the underlying material.

## Who this is for

Anyone confused about whether adding a "skill" changes what Claude can reason about, and anyone who wants a template for turning a document they produce repeatedly into a written, ordered SKILL.md.
