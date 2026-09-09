---
title: "Runs the Steps, Not Its Own Reasoning., The Merger-Model Skill (Anthropic Skills)"
seoTitle: "Merger-Model Skill: Claude Runs Steps, Not Reasoning"
description: "Explains how the merger-model Anthropic Skill works, a folder with a SKILL.md file that Claude reads and executes step by step for M&A analysis."
summary: "Explains how Anthropic's merger-model Skill turns Claude's accretion or dilution analysis into a written, repeatable procedure that Claude executes step by step rather than reasoning through freehand."
keywords: ["what is an anthropic skill folder", "how does claude use skill.md files", "accretion dilution analysis with claude", "merger model skill anthropic explained", "does claude reason or follow instructions", "pro forma eps impact ai tool", "purchase price allocation with ai", "claude skills step by step execution"]
generated: "article"
---

When Claude builds a merger model, it does not reason its way through the deal the way an M&A analyst would, weighing judgment calls as it goes. It follows a written file, one step at a time, in the order the file specifies. That distinction is the entire point of an Anthropic Skill, and the merger-model Skill is a concrete example of what that looks like in practice.

## A Skill is a folder, not a personality

A Skill is a folder that Claude reads before it works. The merger-model Skill contains a SKILL.md file that is the complete instruction set, written in plain language with no hidden logic layered on top. Claude reads that file and then acts on it. The file is the program; the actual procedure lives inside the file's Steps section, not in Claude's general judgment about how to build a merger model.

## Execution is linear, in the order written

Claude reads each step in the Steps section and executes it in sequence. There is no branching unless a specific step tells it to branch. This is closer to running a script than to open-ended reasoning, and that is deliberate: it makes the output reproducible.

## What the merger-model Skill actually specifies

The file specifies an accretion or dilution analysis for an M&A deal: pro forma EPS impact, synergy sensitivities, and purchase price allocation. It is a specification, not a suggestion, and Claude does not go beyond what it says. Run the same two companies through it twice, and the result matches both times, because the process is the same file executed the same way rather than a fresh judgment call each run.

## The limits of what is claimed here

Nothing here claims the file's underlying valuation methodology, discount rate, or data source, because the Skill's own description does not specify those either. The point is not that this Skill is exhaustive, it is that whatever it does specify, it does consistently and transparently, and whatever it does not specify, Claude has nothing to fall back on if a deal moves outside those bounds.

## Seeing the steps for yourself

The way to actually observe this in practice is to ask Claude to explain what it will do before it runs the analysis. That request, made explicit, is what surfaces the steps written into the file rather than letting the process happen invisibly. A prompt like asking Claude to build an accretion and dilution analysis for a specific deal, modeling pro forma EPS impact, synergy sensitivities, and purchase price allocation, and to read the merger-model Skill and walk through what it will do before doing it, shows the procedure directly.

## Key takeaways

- An Anthropic Skill is a folder containing a SKILL.md file that functions as Claude's complete, plain-language instruction set for a task.
- Claude executes the Steps section of the file in linear order, without branching unless the file specifies it.
- The merger-model Skill covers accretion or dilution analysis: pro forma EPS impact, synergy sensitivities, and purchase price allocation.
- Running the same deal inputs through the Skill twice produces the same result, because the process is fixed rather than freshly reasoned each time.
- Asking Claude to explain its steps before running the analysis is what actually reveals the written procedure behind the output.

## Who this is for

Anyone curious how Anthropic Skills work under the hood, and finance or M&A professionals who want to understand what a Claude-built accretion and dilution model is actually doing before trusting its output.
