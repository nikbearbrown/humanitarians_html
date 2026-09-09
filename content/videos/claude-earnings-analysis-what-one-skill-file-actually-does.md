---
title: "Claude, Earnings Analysis, What One Skill File Actually Does"
seoTitle: "What a Claude Skill File Actually Does"
description: "A walkthrough of how the earnings-analysis Claude skill works: a folder with a SKILL.md file Claude reads and executes step by step."
summary: "This video breaks down a Claude Agent Skill called earnings-analysis, showing that a skill is just a folder with plain-language instructions Claude reads and executes in order."
keywords: ["how to write a claude skill file", "what is a claude agent skill", "claude earnings analysis skill", "SKILL.md file explained", "claude skill vs training a model", "how to structure quarterly earnings report", "claude skill steps section not working", "equity research report with claude"]
generated: "article"
---

A Claude skill is not a way of training the model on new knowledge. It is a folder Claude reads before it acts, containing a SKILL.md file with plain-language instructions. This video walks through one specific skill, called earnings-analysis, to show exactly what that means in practice and why the distinction between "training" and "briefing" matters.

## What a skill file actually is

The earnings-analysis skill is a folder with a SKILL.md file inside it. There is no hidden code, no fine-tuning, no model weights being adjusted. The file holds instructions written in plain language, organized under a Steps section. When Claude is pointed at the skill, it reads the file first, then acts on what it read. The instructions are followed in order, linear rather than branching, unless a specific step calls for a decision.

## The one job this skill does

This particular skill has a single, narrow job: turn a company's quarterly numbers into a written earnings update. The stated scope is eight to twelve pages, a few summary tables, and several charts. That is the entire brief. Anything outside that scope is not something the file governs. The video is explicit that a skill does not make Claude smarter in some general sense, it gives Claude one job, done the same way, every time it is invoked.

## Why the framing matters

The video opens by rejecting a common but wrong question: does Claude need to be trained to do earnings analysis? It doesn't need training. It needs briefing. That reframing is the point of the whole piece, a skill is a form of instruction-giving, not a form of teaching the model new capabilities. Understanding this distinction changes how someone should think about building or requesting a skill: the value is in writing a clear, ordered set of steps, not in expecting the model to somehow "learn" the task permanently.

## The prompt to try

The video closes with a specific prompt viewers can paste into Claude: request a professional equity-research earnings update, eight to twelve pages, three to five thousand words, covering beat-or-miss analysis, updated estimates, and a revised thesis, while explicitly asking Claude to read the earnings-analysis skill first and explain its plan before running it. That last clause is called out as the important part, asking Claude to narrate its plan before executing surfaces the real constraints the skill file sets, making the skill's structure visible rather than opaque.

## What isn't claimed

The video is careful about scope. It does not claim that the earnings-analysis skill ships by default with any particular Claude plan, it describes the general mechanism (a folder, a SKILL.md file, a Steps section) that any Claude Agent Skill follows, not a promise about availability. It also makes no claim about the quality or accuracy of any report the skill produces, since that depends on the data supplied at run time rather than the file's structure. The specific figures given (8-12 pages, 3,000-5,000 words, a handful of tables and charts) describe this one skill's stated scope, not a general property of Claude skills as a category.

## Key takeaways

- A Claude skill is a folder containing a SKILL.md file with plain-language instructions, not a training process.
- Instructions live in a Steps section and are read and executed in order, linear unless a step requires a decision.
- The earnings-analysis skill's one job is producing an eight-to-twelve-page written earnings update with summary tables and charts.
- Asking Claude to explain its plan before executing a skill surfaces the actual constraints the file sets.
- The video makes no claims about default availability of the skill or the accuracy of its output, since those depend on plan and input data.

## Who this is for

This is for anyone curious about how Claude Agent Skills work mechanically, especially people evaluating whether to write their own skill for a repeatable task like financial reporting, research writing, or any other structured document workflow.
