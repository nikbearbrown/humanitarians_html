---
title: "It's an Agent, Not a Command."
seoTitle: "Claude Code Agent vs Command: When to Build Which"
description: "Explains the Claude Code agent file format and the description-with-examples pattern that decides whether an autonomous agent fires reliably."
summary: "Walks through the two-part structure of a Claude Code agent file and shows why the description field, written as trigger examples, is what determines whether an agent activates at the right moment."
keywords: ["how to create a claude code agent", "how to write agent description examples", "claude code agent frontmatter fields explained", "agent vs command in claude code plugin", "claude code subagent tools field default", "use this agent when description pattern", "claude code agent not triggering reliably", "why does my subagent never fire"]
generated: "article"
---

Building a Claude Code plugin feature that needs to keep working through several steps on its own, the reflex is to reach for a command. That reflex is wrong when the task runs autonomously rather than firing once on a typed instruction. What that situation calls for is an agent, and the file that defines one has a specific shape worth getting right.

## Two parts: frontmatter and body

An agent is a single markdown file split into two parts. On top sits YAML frontmatter: a name written in lowercase with hyphens, a description that tells Claude when to fire the agent, a model setting usually left as inherit, a color drawn from a small set tied to the kind of work, and an optional list of tools. Leaving the tools field out entirely gives the agent access to every tool that exists, which is a meaningfully different choice than naming a specific subset. Below the frontmatter, the rest of the file is markdown addressed directly to the agent, written as "you are," "you do," and that text becomes its system prompt.

## The description field is what makes it fire

This is the anchor of the whole format: the description field decides when the agent actually runs. The pattern is fixed rather than a suggestion. It opens with "Use this agent when," followed by two to four worked examples, and each example has four parts: the setup, the user's request, what the agent would say back, and a short note on why that example fits the trigger. Skip the examples and Claude has nothing concrete to match against when deciding whether to invoke the agent, which means an agent with a vague or example-free description can sit unused even when it is exactly the right tool for a task.

## What the format nails down

The file format itself is precise on several points. Names are lowercase with hyphens, examples are required in that fixed four-part shape, and the body follows a five-part structure: responsibilities, process, standards, output, and edge cases. These are not loose conventions; deviating from them tends to produce an agent that Claude either cannot trigger reliably or applies inconsistently.

## What the format leaves to you

The format does not make several judgment calls for you. It does not decide which model tier an agent should run on, whether a given task is genuinely agent-shaped or would work better as a plain command, or how one agent should hand work off to another. Those decisions live in the body text a person writes, not in any frontmatter field, which means two agents built to the same spec can still behave very differently depending on the judgment baked into their prompts.

## Key takeaways

- An agent file has two parts: YAML frontmatter (name, description, model, color, optional tools) and a body that becomes its system prompt.
- Leaving the tools field out gives the agent every available tool, not a safe default subset.
- The description field must open with "Use this agent when" and include two to four four-part examples, or Claude has nothing to trigger against.
- The body follows a five-part structure: responsibilities, process, standards, output, edge cases.
- Model tier, agent-versus-command scoping, and hand-off logic between agents are judgment calls the format does not make for you.

## Who this is for

Anyone building a Claude Code plugin that needs autonomous, multi-step behavior rather than a single-shot command, especially someone whose agent seems to exist but never actually fires, since a missing or thin description is the most common cause.
