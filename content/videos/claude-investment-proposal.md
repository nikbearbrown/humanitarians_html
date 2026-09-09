---
title: "Claude, Investment Proposal, Does Claude Pick the Investments Itself?"
seoTitle: "Claude investment-proposal skill explained"
description: "Explains how Claude's investment-proposal skill drafts a proposal covering approach, allocation, outcomes, and fees from one instruction file."
summary: "Walks through how Claude's investment-proposal skill follows a fixed instruction file to draft a client proposal covering firm approach, allocation, outcomes, and fees."
keywords: ["does claude pick investments on its own", "how does investment proposal skill work in claude", "claude skill for drafting client investment proposals", "investment proposal approach allocation outcomes fees", "claude skill.md instruction file explained simply", "draft a wealth management pitch with claude ai", "claude skill follows same steps every run", "write me a skill.md for a proposal outline"]
generated: "article"
---

Does the investment-proposal skill pick a client's investments on its own, the way a standalone app might? Not quite. Anthropic's investment-proposal skill drafts a professional investment proposal for a prospective client, covering the firm's approach, proposed allocation, expected outcomes, and fee structure, all based on information a user provides, following one instruction file that Claude reads and works through step by step.

## A skill is a folder, not an app

A Claude Skill is a folder Claude reads before it works. This one is called investment-proposal, and its SKILL.md contains the full instruction set in plain language, with no hidden logic underneath. Claude reads the file, then acts on it. This is the first thing worth clarifying: there's no separate investment-picking engine running behind the scenes. The proposal's content comes from what the user supplies and how the file tells Claude to organize it.

## How the pipeline runs

The pipeline lives in the file's step section. Claude reads each step in order and executes it, linearly, with no branching unless a step specifically calls for it. That structure holds regardless of which client or which allocation strategy is involved; the sequence of drafting steps stays the same.

## What the skill is actually specified to do

The mechanism here is a specification written as an instruction set: create a professional investment proposal for a prospective client covering the firm's approach, the proposed allocation, expected outcomes, and the fee structure. Because Claude follows exactly what's written, the result comes out the same way on every run, and it only covers what the file specifies. It doesn't independently decide what investments belong in the allocation; that comes from the inputs the user provides.

## What a skill adds and what it doesn't

A skill doesn't make Claude smarter in some general investment-judgment sense. It makes Claude follow a defined set of steps, in order, every time. For a proposal document, that consistency is the actual value: a firm can expect the same structural sections, approach, allocation, outcomes, fees, across every proposal it generates this way, regardless of who ran it or which client it's for.

## Trying it yourself

A direct way to see the mechanism is to ask Claude to explain what a Claude Skill is, then, using a toy example, a three-step SKILL.md for drafting a one-page investment proposal outline, have it walk through exactly how it would read and follow the file step by step before starting. Watching it name the steps before acting is what shows the mechanism is real rather than opaque.

## Key takeaways

- Claude's investment-proposal skill is one instruction file that Claude reads and follows step by step.
- The skill drafts a proposal covering firm approach, proposed allocation, expected outcomes, and fee structure.
- Steps execute in a fixed, linear order, with no branching unless a step specifically says to.
- A skill doesn't make Claude smarter; it makes Claude follow a defined process consistently, every run.
- Watching Claude state its steps before running them confirms the mechanism is a real, followable process.

## Who this is for

Wealth management and financial services professionals evaluating Claude for proposal drafting, and anyone who wants to understand what a Claude Skill contributes to a document versus what still comes from the underlying inputs and human decisions.
