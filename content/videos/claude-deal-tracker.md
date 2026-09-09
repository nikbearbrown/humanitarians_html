---
title: "Claude, Deal Tracker."
seoTitle: "How Claude's deal-tracker skill actually works"
description: "Shows how Claude's deal-tracker skill reads a written SKILL.md, tracks deal milestones, and stays silent outside its six trigger phrases."
summary: "A walkthrough of Claude's deal-tracker skill showing it follows a written SKILL.md step by step and does nothing when asked something the spec never covers."
keywords: ["how does claude deal tracker skill work", "claude skill SKILL.md example", "track deal pipeline with claude ai", "claude ai deal status weekly review", "claude skills trigger phrases explained", "why does claude not answer outside skill", "claude skill for sales pipeline tracking", "flag overdue deal milestones with claude"]
generated: "article"
---

Claude's deal-tracker skill is a plain-language instruction file, not a reasoning engine that already understands your pipeline. This video walks through what the skill actually does: read a written spec, apply it to a live deal, and stop cold the moment a request falls outside that spec.

## What the deal-tracker skill is

A Claude skill is a folder with a SKILL.md file that Claude reads before acting. Deal-tracker's SKILL.md states its job directly: track live deals, watch milestones and deadlines, log action items and status, and surface anything that's overdue. There is no hidden model of your sales process behind it, just an instruction set Claude follows the same way every time.

## How it triggers

Deal-tracker responds to six exact phrases: "deal tracker," "deal status," "where are we on," "process update," "deal pipeline," and "weekly deal review." Say one of those and the skill activates. Say something else related to deals but phrased differently, and nothing kicks in.

## Running one deal through the steps

The video anchors the explanation on a single deal, Acme, moving through the tracker's steps in order. When a milestone's deadline passes, the skill flags it as overdue, exactly as its step three instructs. This is deal-tracker doing precisely what it was written to do, with no interpretation or guesswork layered on top.

## What happens outside the spec

The same Acme example is then pushed past what deal-tracker covers: asking it to draft a counterparty redline. Nothing happens. There's no fallback response and no attempt to guess at an answer. The skill simply doesn't reach that far, because its SKILL.md never told it to. That gap is the point of the video: reliable, identical output for anything the spec lists, and silence for anything it doesn't.

## Try it yourself

The video's prompt: read the deal-tracker skill, then track three deals, Acme (Series C, milestone due Friday), Beta Corp (add-on, due next Tuesday), and Gamma LLC (refinancing, no deadline set). Ask for the pipeline view and anything overdue. Then ask for something the skill never lists, like negotiating strategy, and watch whether Claude says that's outside the skill or tries to guess anyway. That contrast is the real test of whether spec-bounded behavior holds up.

## Key takeaways

- Deal-tracker is a written SKILL.md, not an independent reasoning system over your deals.
- It triggers only on six specific phrases tied to deal status and pipeline review.
- Steps run linearly against one deal at a time, flagging overdue milestones exactly as instructed.
- Requests outside the spec, like drafting a redline or negotiation strategy, get no answer at all rather than a guess.
- The reliability is scoped: consistent inside the written spec, absent outside it.

## Who this is for

Anyone evaluating whether a Claude skill can replace part of a deal or pipeline review process, and anyone who wants a concrete example of how a skill's written instructions bound what it will and won't attempt.
