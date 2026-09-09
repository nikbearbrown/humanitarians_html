---
title: "Claude, Is This A Problem."
seoTitle: "How Claude triage skills decide what counts"
description: "Explains how a written checklist, not live judgment, decides whether Claude flags something as a problem in a triage skill."
summary: "A triage skill answers whether something is a problem by matching it against a written checklist rather than forming an opinion, which makes it consistent but silent on anything the checklist never named."
keywords: ["how does claude decide if something is urgent", "claude skill md written checklist explained", "why claude gives the same answer every time", "building a triage checklist for claude ai", "claude ai consistent decisions not judgment", "what happens when a situation isnt on the checklist", "how to write escalation criteria for claude", "claude skill folder skill.md file explained"]
generated: "article"
---

How does Claude decide whether something is a problem? It does not decide in the sense of weighing the situation and forming an opinion. It checks the situation against a file someone already wrote. That distinction is the whole subject of this video, using a triage skill called "is-this-a-problem" as the working example.

## What a skill actually is

A Claude skill is a folder holding one file, SKILL.md, that spells out the full instruction set in plain language. There is no hidden logic and nothing left to guess. For a triage skill, that file defines what counts as a problem in this context. Claude reads the file first, then follows it. The file is the program, not Claude's own reasoning about the situation.

## The middle step: matching, not judging

Inside the skill, a step section lays out a simple pipeline: read the situation, check it against a list of defined conditions, then answer. The important detail is what that middle step is not. It is not Claude weighing the situation on its own merits. It is Claude matching the situation against conditions someone already wrote down in advance. Once you see it that way, "is this a problem, according to Claude" really means "is this a problem, according to the checklist it was given."

## Why this produces consistency

Feed the skill a situation the checklist anticipated, and it answers the same way every time. That reliability on repeat is the entire point of writing the criteria down instead of leaving them to case-by-case judgment. Same input, same output, every run, for as long as the situation matches something the checklist named.

## Where the trade breaks down

Feed it something the checklist never named, and there is nothing to fall back on. The result is not wrong, exactly, it is simply outside what the spec covers. That is the trade a written checklist makes: consistency where it applies, silence everywhere else. A checklist-driven system will not quietly invent an answer for a case its author never anticipated, but it also will not flag that gap unless something in the design forces it to say so.

## Turning your own gut calls into a checklist

The video's practical exercise is to take a decision you currently make by feel, whether something is urgent, whether it is worth escalating, whether it counts as a problem, and ask Claude to help write out the actual criteria behind that gut call as a short checklist. Then run your next three real cases through it and see what happens. The value is in watching two things: whether the checklist actually matches what you are really checking for, and whether it correctly flags the cases that do not fit rather than forcing an answer.

## Key takeaways

- Claude's answer in a triage skill comes from matching the situation against a written checklist, not from independent judgment.
- The checklist lives in a single file, SKILL.md, in plain language with no hidden logic.
- Consistency is the payoff: the same input produces the same output every time the checklist covers it.
- The limit is equally real: anything the checklist never named gets no answer, not a wrong one.
- Writing your own gut-feel criteria into a checklist exposes both what you're really checking for and where your own rules have gaps.

## Who this is for

Anyone building or relying on a Claude skill for triage, escalation, or any repeated judgment call, and anyone who wants to understand why a checklist-driven AI process behaves consistently in some cases and goes silent in others.
