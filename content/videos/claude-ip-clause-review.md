---
title: "Claude, IP Clause Review."
seoTitle: "Claude ip-clause-review: license vs assignment check"
description: "Explains how Claude's ip-clause-review skill checks whether a contract clause actually assigns IP ownership or only grants a license."
summary: "Explains the license-versus-assignment distinction Claude's ip-clause-review skill checks for, and why the skill runs a fixed checklist rather than judging clause quality."
keywords: ["does a license clause transfer ip ownership", "how does claude ip clause review skill work", "difference between ip license and ip assignment", "claude skill for reviewing contract ip clauses", "all right title and interest transferred clause", "claude skill checks not judges contract clauses", "claude skill.md linear checklist explained", "paste an ip clause for claude to review"]
generated: "article"
---

A contract clause can read like it hands over ownership of intellectual property and still leave the work with whoever created it. That gap is exactly what Claude's ip-clause-review skill is built to catch, and understanding the underlying legal distinction is the key to understanding what the skill actually checks.

## The distinction that matters

A clause that only grants a license doesn't move ownership at all, no matter how it's worded. Only a clause that assigns the IP outright, transferring all right, title, and interest, actually hands ownership over. This single distinction is the reason IP clause review is a task worth having a dedicated check for: license language and assignment language can look similar to someone skimming a contract, but they produce entirely different legal outcomes.

## How the skill works

A Claude Skill is a folder Claude reads before it acts, one file, SKILL.md, holding the whole instruction set in plain language, with no hidden logic underneath. Claude reads the file, then works through its steps in order: read the clause, apply each check, return the result. The process is linear, with no branching unless a step specifically says otherwise.

## A check, not a judgment call

Claude isn't deciding whether an IP clause is well drafted or favorable in some general sense. It's checking, one item at a time, whether the clause actually assigns the IP instead of merely licensing it. That's a narrower and more mechanical task than "review this contract," and it's worth being precise about the difference: the skill applies a specific test to specific language, it doesn't render an overall opinion on the deal.

## Why this specific check earns its own skill

License-versus-assignment is a distinction easy to miss on a quick read, because a clause granting rights can be written in language that sounds expansive without ever using assignment terms. A skill built around this one check gives a consistent, repeatable way to catch that gap every time a clause is reviewed, rather than relying on catching it by eye.

## Trying it yourself

A direct way to see this in action is to paste an actual IP clause from a contract you're reviewing into Claude, ask it to read the ip-clause-review skill, and, before it tells you anything is wrong with the clause, have it walk through exactly what it's checking for. Watching that explanation come first makes clear the skill is applying a defined check, not offering a general impression.

## Key takeaways

- A clause that only grants a license does not transfer IP ownership, regardless of how expansive the language sounds.
- Only language that assigns all right, title, and interest actually hands ownership over.
- Claude's ip-clause-review skill runs a fixed, linear checklist from one plain-language SKILL.md file.
- The skill checks whether a clause assigns IP; it does not judge whether the clause or the deal is good overall.
- Asking Claude to state what it's checking for before delivering a verdict shows the mechanism is a defined check, not a general opinion.

## Who this is for

Founders, in-house counsel, and anyone reviewing contracts who wants a reliable way to catch the difference between a license and an actual IP assignment before signing.
