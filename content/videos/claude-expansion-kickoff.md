---
title: "Claude, Expansion Kickoff."
seoTitle: "Did Claude Learn Expansion Planning?"
description: "Why a Claude skill called expansion-kickoff is a checklist file Claude follows, not new knowledge the model actually learned."
summary: "This video corrects the assumption that installing a skill teaches Claude a new capability, using the expansion-kickoff skill to show it is only a followed checklist."
keywords: ["does claude learn from a skill file", "what happens when you delete a claude skill", "claude expansion kickoff skill explained", "is a claude skill a specification", "claude skill vs model training difference", "why does claude follow the same steps every time", "how to write a SKILL.md checklist", "claude skill produces a rough plan"]
generated: "article"
---

Someone might assume that when Claude picks up a skill called expansion-kickoff, it actually learned how to run a business expansion. It didn't. This video uses that skill as a case study to explain what a Claude skill really is: a specification Claude follows, not a capability the model acquires.

## A skill is one file, read before acting

A skill is a folder holding a single file, SKILL.md, written in plain language. Claude reads that file before it starts and works through it top to bottom, step by step, in the order it's written, with no branching unless the file itself calls for it. Expansion-kickoff, specifically, is described as a folder holding instructions for starting a structured checklist when a team or business expands into somewhere new.

## Nothing in the model changes

The video makes a direct test of the "did Claude learn something" question: delete the skills folder and see what happens. Claude doesn't forget how to plan an expansion, because there was nothing to learn in the first place. It just stops following that one routine. Nothing in the underlying model changes when a skill is added or removed, only whether Claude has a specific set of written steps in front of it to follow.

## Specification, not power

This is the video's core distinction: a skill is a specification, not a new power. The payoff is consistency, the same checklist, the same starting steps, every single kickoff. The limit is exactly as narrow as the file itself: anything outside those written steps, and Claude is off the map, with no fallback knowledge the skill was supposed to provide. Expansion-kickoff never taught Claude how to run a real expansion. It only guarantees that every time it runs, Claude reads that same file and starts the same structured checklist.

## Why a tidy output proves nothing either way

The video makes a point of not over-reading Claude's output as evidence. Watching Claude produce a tidy, well-organized kickoff plan doesn't prove it understood the business, a file can be followed to the letter in a situation the model never really grasped. Equally, watching it produce a rough or awkward plan doesn't prove the skill is broken. It may simply be a case the checklist doesn't fit well. Neither outcome, by itself, is proof of understanding or failure.

## The prompt to try

The video's suggested exercise is to pick one process a person repeats every time they start something new, then ask Claude to write a SKILL.md for it in plain language with ordered steps, and have Claude read it back and walk through exactly what it will do before doing it. The point of running this against a real repeated process is to see the same specification-versus-power distinction play out with something concrete.

## Key takeaways

- A Claude skill is one file, SKILL.md, that Claude reads before acting and follows step by step in order.
- Deleting a skill's folder does not make Claude forget anything, because nothing was learned to begin with.
- A skill is a specification, not new model capability: it guarantees the same checklist every run, nothing more.
- Anything outside the file's written steps is outside what the skill covers.
- A tidy or rough output from a skill run does not, on its own, prove understanding or a broken skill.

## Who this is for

This is for anyone trying to understand what installing a Claude skill actually changes, especially people confusing "the model learned this" with "Claude has a checklist to follow."
