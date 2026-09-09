---
title: "It Scores and Routes. It Doesn't Decide."
seoTitle: "How Claude's KYC Rules Skill Scores Compliance"
description: "Liam explains how the kyc-rules Claude Skill scores a client file against KYC and AML rules and routes it, without ever deciding to accept or reject."
summary: "Liam walks through the kyc-rules Claude Skill, showing how it scores a client's onboarding record against a firm's KYC and AML rules and flags issues, while the accept-or-reject decision stays with a person."
keywords: ["does claude decide to accept a client", "what is the kyc-rules claude skill", "how does claude screen kyc aml risk", "claude skill for compliance rule checking", "who makes the final kyc decision", "how a claude skill applies rules", "kyc and aml risk scoring with claude", "why claude doesn't approve compliance decisions"]
generated: "article"
---

When Claude screens a new client's onboarding file for KYC and AML risk, it is natural to assume it decides whether to accept that client. Liam, narrating Professor Bear's Claude-basics series, walks through why that assumption is wrong, using `kyc-rules`, an Anthropic Claude Skill built for financial-services compliance, as the worked example.

## What a Claude Skill actually is

A Skill is a folder Claude reads before it acts. In this case, the entire program is one file, SKILL.md, written in plain language with no hidden logic layered underneath. Claude reads the file, then acts on exactly what it says. Inside, the instructions are a sequence of steps that Claude runs in order, with no branching unless a specific step calls for one.

## What kyc-rules does, step by step

This particular skill runs after a separate skill has already parsed a new client's onboarding record into structured fields. From there, `kyc-rules` follows three steps in sequence: read the parsed record, apply each rule from the firm's KYC and AML rules grid to it in order, and hand back a risk rating along with a list of flags. For every rule outcome, it cites the specific rule that produced it, and it flags anything missing or worth escalating to a person.

## Scoring is not deciding

The core distinction the video draws is between scoring a file and deciding what to do about it. `kyc-rules` assigns a risk rating and lists which rules the record satisfies and which it doesn't. It does not decide whether to accept the client. That accept-or-reject call stays with a person. The skill's entire job is to score the file against the firm's own rules and route it, flagging what needs human attention, never rendering the final judgment itself.

## Why the order matters

The worked example ends with a prompt designed to make this same order visible in any compliance task: before Claude says whether a record passes, it should walk through each rule, state whether the record satisfies it, and note what's missing, then hand the actual decision back to the person asking. That is the same sequence `kyc-rules` follows internally, score against the rules, flag what's missing, leave the decision to a person, made explicit so a user can apply it to their own compliance rules and records.

## Key takeaways

- A Claude Skill is a folder containing one SKILL.md file, a fixed, linear set of instructions Claude reads and executes in order.
- `kyc-rules` scores an already-parsed onboarding record against a firm's KYC and AML rules grid, citing the specific rule behind every outcome.
- The skill flags what's missing or worth escalating, but it never decides whether to accept or reject a client.
- The accept-or-reject decision stays with a person; the skill's job ends at scoring and routing.
- Asking Claude to walk through each rule and state what's missing before rendering a verdict keeps the decision with the human asking.

## Who this is for

Anyone building or evaluating a compliance workflow that uses Claude, or anyone who wants a clear example of the difference between an AI system that scores and flags versus one that decides, will find a concrete case here.
