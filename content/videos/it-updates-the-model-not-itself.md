---
title: "It Updates the Model. Not Itself."
seoTitle: "It Updates the Model. Not Itself."
description: "A walkthrough of the Claude Skill model-update, which refreshes a financial model with new data without changing Claude or the investment decision."
summary: "Using an Anthropic Claude Skill called model-update, this video explains how a Skill is a plain-language folder of ordered steps that updates a financial model, not Claude itself, leaving the investment call to a person."
keywords: ["how does a claude skill work", "how to update a valuation model", "why claude skills dont change claude", "claude skill model update example", "skill.md file explained", "financial services earnings review plugin", "ai flags material changes not decisions", "investment decision still needs human approval"]
generated: "article"
---

When a Claude Skill called "model update" runs, does it update Claude itself, or does it update a financial model? This video walks through model-update, an Anthropic Claude Skill from a financial-services earnings-review plugin, to answer that exactly.

## What a Claude Skill actually is

A Skill is a folder Claude reads before it acts. It isn't a program in the traditional sense, it's one file, SKILL.md, written in plain language, with instructions run as steps in order. Claude reads the file, then acts on what it says. There's no hidden logic layered on top, the file is the whole program, and there's no branching unless a step itself tells the Skill to branch.

## What model-update does

Given new data, quarterly earnings, management guidance, macro changes, or a revised assumption, the skill's job is to adjust the relevant estimates, recalculate the valuation, and flag whatever changed enough to matter. It exists so nobody has to redo the same update by hand every time new numbers land. The output is new estimates, a recalculated valuation, and a flag on anything material, nothing more.

## Why none of this changes Claude

The skill changes the model, using the data Claude is handed for that one run. It doesn't change how Claude itself works, doesn't retrain anything, and doesn't persist any new capability beyond that run. The distinction in the title is the whole point: updating a model with new numbers is not the same thing as updating the AI that's doing the updating.

## The decision still belongs to a person

The skill flags what changed, it doesn't decide what to do about it. Recalculating a valuation and surfacing material changes is not the same as making the investment call. That call still belongs to a person, which is why the video frames the skill's output as information to walk through, not a decision to accept.

## Trying it yourself

The suggested prompt asks Claude to walk through exactly which estimates it would adjust, how the valuation would change, and what it would flag as material, before touching anything, and then to wait for explicit approval to proceed. That mirrors the skill's own order of operations: work out the update, flag what matters, and let a person greenlight it.

## Key takeaways

- A Claude Skill is a plain-language SKILL.md file of ordered steps, not a hidden or complex program.
- model-update adjusts financial estimates and flags material changes based on new data, it doesn't alter Claude itself.
- Running a skill on new data doesn't make Claude smarter or change its underlying behavior.
- The skill's output, a recalculated valuation and flagged changes, is information, not a decision.
- The investment call still requires explicit human approval before anything is acted on.

## Who this is for

People working with financial estimates or valuation models who want a clear, non-technical explanation of what a Claude Skill is and how one can automate a recalculation step while keeping the actual decision with a person.
