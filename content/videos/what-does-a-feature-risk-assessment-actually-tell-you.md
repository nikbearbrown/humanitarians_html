---
title: "What Does a Feature-Risk-Assessment Actually Tell You?"
seoTitle: "What a Feature Risk Assessment Actually Tells You"
description: "Why asking Claude to assess a new feature returns documentation, not a safe/unsafe verdict, and how the four-question checklist actually works."
summary: "This video explains why a Claude feature-risk-assessment produces a documented checklist of what's collected, stored, kept, and accessed rather than a yes/no safety verdict, using a photo-ID upload as the working example."
keywords: ["what is a feature risk assessment", "does claude approve or reject features", "how to assess data risk in a new feature", "photo id upload data retention risk", "claude feature checklist what where how long who", "feature risk assessment not a safety verdict", "how to use claude for privacy review", "checklist for reviewing new product features"]
generated: "article"
---

Asking Claude to run a feature-risk-assessment can sound like asking for a clean safe-or-not verdict. It isn't one. Claude doesn't approve or reject a feature, it assesses it against a fixed checklist, and what comes back is documentation, not a judgment call.

## Why a quick look isn't enough

Take a feature that looks harmless at first glance: users upload a photo ID to prove their age. A quick look says it's fine, since it's optional and nobody's forced to do it. But a checklist asks different questions entirely: where does that photo go, how long is it kept, and who can actually see it. Those are questions a quick glance never asks, because "optional" and "safe" aren't the same claim.

## The four-box checklist

The mechanism is a SKILL.md file, an instruction set in plain language that gets worked through one step at a time, in order, with no branching unless a step explicitly says otherwise. The checklist itself has four boxes for any given feature: what's collected, where it's stored, how long it's kept, and who can access it. At the start, some of those boxes are blank. Nothing has been judged yet, just documented one box at a time.

## Filled in is not the same as safe

Once the remaining boxes are filled in, for the photo-ID example, kept 90 days and visible to support staff, the picture is complete. But complete isn't the same as cleared. Documenting where something goes doesn't automatically make it safe. The reverse also holds: raising one flag, such as no retention limit stated, doesn't automatically kill the feature either. What the flag means is that someone now has what they need to make that call instead of guessing.

## What the assessment actually delivers

A feature-risk-assessment doesn't tell you a feature is safe. It tells you what to look at before someone decides. That distinction matters because it changes what you should expect back: not a verdict, but a documented set of facts a human still has to weigh.

## Try it on your own feature

Take one feature you're building or reviewing right now. Ask Claude to walk through it: what data it touches, where that data is stored, how long it's kept, and who can access it, before either of you says whether it's fine. That's the whole checklist: what, where, how long, who, documented, then decided by a person.

## Key takeaways

- A feature-risk-assessment produces documentation, not a safe/unsafe verdict.
- The checklist has four fixed fields: what's collected, where it's stored, how long it's kept, who can access it.
- All four boxes being filled in doesn't mean the feature is safe; it means the facts are now visible.
- A single flag raised, like a missing retention limit, doesn't automatically mean a feature gets killed.
- The process is linear and non-branching: work through the checklist in order, then hand the filled-in picture to a person to decide.

## Who this is for

Anyone reviewing a new product feature for data or privacy risk, especially teams who want a concrete, repeatable way to ask Claude to surface what a feature actually touches before a person signs off on it.
