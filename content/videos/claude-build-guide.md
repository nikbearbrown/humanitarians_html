---
title: "Claude, Build Guide."
seoTitle: "What a Claude Skill Actually Is: Build Guide"
description: "Why the build-guide Claude Skill is a specification, not new knowledge: one file read step by step, forgotten cleanly if the folder is deleted."
summary: "Using build-guide as a named example, this video explains that a Claude Skill is a single SKILL.md file read top to bottom, which delivers repeatable results but nothing outside what it wrote down."
keywords: ["what is a claude skill actually made of", "does claude learn new skills permanently", "skill.md file structure explained", "how to write a skill.md for a repeated task", "claude skills folder vs model training", "why deleting a skill folder changes nothing claude knows", "claude follows skill steps in order no branching", "difference between a claude skill and a new capability"]
generated: "article"
---

It sounds like an upgrade when Claude "picks up a skill" called build-guide, as if it studied something and came back knowing more. It did not. This video uses build-guide as a named example to explain what a Claude Skill actually is, and just as importantly, what it is not.

## Nothing in the model changes

The clearest way to see that a skill is not learned knowledge is a simple test: delete the skills folder, and Claude forgets nothing, because there was nothing to learn in the first place. It just stops following that one routine. A skill does not modify the model, it is an external file that gets read before a task starts.

## One folder, one file

build-guide is a folder holding a single file, SKILL.md, which contains the whole routine written in plain language. Claude reads that file top to bottom and works through it step by step, in the order it is written, with no branching unless the file itself instructs a branch. There is no hidden logic sitting outside the document, the file is the program.

## A specification, not a new power

This framing has a direct payoff and a direct limit. The payoff is repeatable results: run after run, the same request produces the same routine, because Claude is reading the identical file each time. The limit is anything the file never wrote down, once a situation falls outside the written steps, Claude is off the map, working without a specified procedure rather than falling back on some deeper trained skill.

## Neither following it nor deviating from it proves anything

The video makes a point worth sitting with: watching Claude follow a skill file exactly does not prove the routine itself is good, a bad process can be followed to the letter just as easily as a good one. And watching Claude improvise or deviate does not prove the skill is broken either; it may simply be a case the file never covered. Judging a skill means reading what it actually says, not just watching whether Claude complies with it.

## What this video does not claim

This video does not describe what build-guide's own SKILL.md specifically instructs for legal-clinic work, that file was not reachable from this build, and even the source material behind this video left the same detail unfilled in several places. Rather than invent a legal-specific procedure, the video uses "build-guide" only as the named example of a skill-shaped folder, one file, SKILL.md, and sticks to what is generically true of any Claude Skill: a folder read before Claude acts, executed step by step, with a stated payoff and a stated limit.

## Key takeaways

- A Claude Skill is a folder holding a SKILL.md file, not new knowledge baked into the model.
- Deleting the skill folder erases nothing Claude knows, it only stops that routine from being followed.
- Claude reads the file top to bottom and executes it in order, branching only where the file says to.
- The payoff of a skill is repeatable results across runs; the limit is anything the file never specified.
- Following a skill exactly does not prove it is a good routine, and deviating from it does not prove it is broken.

## Who this is for

Anyone trying to understand what a Claude Skill actually is before writing their own, and anyone who wants a plain, non-hype explanation of why "Claude learned a new skill" is the wrong way to describe what happened.
