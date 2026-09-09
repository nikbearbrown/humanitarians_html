---
title: "Claude, Comments."
seoTitle: "Does Claude Track Regulatory Comment Deadlines"
description: "Liam explains that Claude's comments skill logs regulatory deadlines it is told about, it does not know the law or decide whether to file on its own."
summary: "Liam explains that Claude's comments skill only logs regulatory comment deadlines it is explicitly given, tracking filed, not filed, or waived status without knowing the law or deciding anything on its own."
keywords: ["does claude track regulatory comment deadlines", "how does the claude comments skill work", "npr m public comment period tracking ai", "claude skill for filing deadline tracking", "filed not filed or waived comment status", "does claude know federal rulemaking deadlines", "anthropic skill for regulatory compliance tracking", "claude for legal comment period logging"]
generated: "article"
---

Liam, in for Bear, corrects a common assumption: that Claude already knows, on its own, which regulatory comment periods are open and coming due, the way a person might watch a calendar. It does not. What it has instead is a skill, and the video walks through exactly what that skill does and does not do.

## No built-in connection to any docket

When a federal agency proposes a rule, it opens a public comment period, often just 60 days, before it can finalize that rule. Miss that window and an objection never reaches the record. Claude has no built-in connection to any government docket system that would let it watch that window automatically. What it has instead is a skill, a folder of instructions called "comments."

## What the comments skill actually says

The SKILL.md inside that folder says three things: review open comment periods, log decisions, and track deadlines. Claude reads that file fresh each time it runs and keeps no memory of a docket from any other session. This is the core mechanism: the skill does not monitor anything on its own, it acts on what it is told.

## The anchor example: logging a deadline

The video walks through one concrete case. A proposed rule opens its public comment window on March 2nd, with a 60-day clock. The skill logs that date the moment it is told and starts counting from there. When day 60 arrives, the skill itself does not file anything. A person still makes the actual decision and records it using one of three states: filed, not filed, or waived.

## What "logged on time" does and does not mean

For the March 2nd example, the log shows the decision as filed on day 59. But a decision logged on time only means the date was kept, it says nothing about whether the comment itself was any good. In the other direction, a rule with no logged decision is not necessarily a missed deadline either, it might simply be tracked somewhere the skill never saw. Neither the presence nor the absence of a log entry proves much beyond what was actually recorded.

## The limit of what the skill knows

A skill like this does not know the law, and it does not decide anything. It only remembers the date it was given. Whether a comment gets filed, waived, or missed is still a call the person using the skill has to make.

## Try it yourself

The video ends with a direct prompt: paste in a proposed rule with its comment deadline, log it with that deadline, and ask Claude to check in before the deadline about how you want it recorded, filed, not filed, or waived, rather than deciding for you. Running this surfaces the same distinction the video is built around: the skill's job is to hold the date and force the decision back to the person, not to make the decision itself.

## Key takeaways

- Claude has no built-in connection to any regulatory docket system; it tracks only what a skill is explicitly told.
- The comments skill's job is three things: review open comment periods, log decisions, and track deadlines.
- The skill reads its instructions fresh each session and does not carry memory of a docket between sessions.
- A logged "filed on time" status means the date was kept, not that the comment's substance was any good.
- Filing, waiving, or missing a deadline is a decision the person makes; the skill only records what it is told.

## Who this is for

This is for legal and compliance professionals handling regulatory comment deadlines who want a clear picture of what an AI skill can track versus what still requires a human decision.
