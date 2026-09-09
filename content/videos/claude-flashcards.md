---
title: "Claude, Flashcards."
seoTitle: "Did Claude Learn to Make Flashcards?"
description: "Why a Claude skill called flashcards is a followed file structure for prompt-and-answer cards, not a study capability the model learned."
summary: "This video uses the flashcards skill to show that Claude did not learn to study, it is following a SKILL.md file that specifies a fixed prompt-and-answer card structure."
keywords: ["does claude learn from a skill file", "claude flashcards skill explained", "what happens when you delete a claude skill", "is a claude skill a specification", "how to write a SKILL.md for flashcards", "claude produces same card structure every time", "claude flashcards messy set of cards", "turn source material into flashcards with claude"]
generated: "article"
---

Claude picked up a skill called flashcards. Did it actually learn how to study? No. This video uses that skill as a worked example to explain what a Claude skill is and is not: a specification Claude follows, not new knowledge the model acquired.

## What sounds like a study upgrade, isn't one

The flashcards skill can sound like a study upgrade, as if Claude studied how to write good quiz questions and came back knowing something it didn't before. But nothing in the model changes when the skill is added. Delete the skills folder and Claude doesn't forget how to write flashcards, because there was nothing to learn in the first place. It just stops following that one routine.

## One file, read top to bottom

A skill is one file, flashcards being a folder holding a single SKILL.md with instructions for turning source material into prompt-and-answer cards, written in plain language Claude reads before it starts. Claude reads that file top to bottom and works through it step by step in the order it's written, with no branching unless the file itself calls for it.

## Specification, not power

This is the video's central distinction: a skill is a specification, not a new power. The payoff is a consistent structure, every card built the same way, one prompt side and one answer side, every time. The limit is exactly as narrow as the file: anything outside those written steps, and Claude is off the map. Flashcards never taught Claude how to study a topic. It only guarantees that every time the skill runs, Claude reads the same file and produces the same prompt-and-answer structure. That is the whole mechanism.

## Neither a clean set nor a messy one is proof

The video is careful not to over-read the quality of Claude's output. Watching Claude produce a clean, well-organized set of cards doesn't prove it understood the material, a file can be followed to the letter on a topic it never really grasped. Watching it produce a messy set doesn't prove the skill is broken either; it may simply be material the file's structure doesn't fit well. Neither outcome, alone, tells you whether the underlying content was actually understood.

## The prompt to try

The video's suggested exercise is to pick one document a person produces the same way every time, ask Claude to write a SKILL.md for it in plain language with ordered steps, and have Claude read it back and walk through exactly what it will do before doing it. Running this against something actually produced over and over is meant to make the specification-versus-power distinction concrete rather than abstract.

## Key takeaways

- A Claude skill is one file, SKILL.md, read and followed step by step, not a capability the model learns.
- Deleting a skill's folder changes nothing about what Claude knows, since nothing was learned by installing it.
- The flashcards skill guarantees a consistent one-prompt, one-answer card structure every run, nothing more.
- Anything outside the file's written steps falls outside what the skill covers.
- A clean or messy set of output cards does not by itself prove understanding or a broken skill.

## Who this is for

This is for anyone using Claude to generate study materials or other repeatable documents, and for anyone unclear on the difference between a skill Claude follows and a capability Claude has actually learned.
