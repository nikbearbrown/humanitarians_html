---
title: "Claude, Expansion Update, Can Claude Just Rewrite Our Handbook for a New State?"
seoTitle: "Claude Skill for Multi-State Handbook Updates"
description: "Liam explains how Claude's expansion-update skill flags handbook sections needing changes for a new state, without rewriting policy itself."
summary: "Liam breaks down the expansion-update Claude Skill, which compares an existing employee handbook against a new state's requirements and flags sections needing a change, leaving the actual rewrite to the reader."
keywords: ["can claude rewrite our employee handbook", "claude skill for state expansion compliance", "how to flag handbook changes with claude", "claude expansion update skill explained", "employee handbook new state requirements ai", "claude for hr compliance checklist", "why claude wont rewrite policy for you", "claude skill.md handbook comparison"]
generated: "article"
---

A company expanding into a new state often asks whether Claude can just rewrite the employee handbook to match. It cannot, and it should not try to. Liam explains what Anthropic's expansion-update skill actually does: it compares the existing handbook against what the new state requires and flags the sections that need a change, leaving the decision about what the new language says to the person running it.

## What the expansion-update skill does

The skill is a folder Claude reads before it works, in this case named expansion-update. Inside is a SKILL.md file holding the full instruction set in plain language, with no hidden logic. Claude reads the file and then acts on it; the file is effectively the program. The pipeline itself runs step by step: Claude reads each step in the skill and runs it in order, linear and without branching unless a step explicitly calls for one.

## The specific constraint the skill enforces

The core mechanism is narrow and deliberate. The skill compares the existing handbook or policy against what the new state or scope requires, then flags every section that qualifies for a change. It does not attempt to rewrite those sections or guess at replacement language. Staying inside that checklist means the list of flagged sections holds the same shape every time the skill runs, even as the underlying handbook or the target state changes.

## Why the rewrite stays a human decision

The skill's output is a flagged list, not a finished document. Deciding what the new handbook actually says, what language satisfies the new state's requirements, and how to phrase updated policy remains the responsibility of the person using Claude. This is the same pattern as other Claude Skills built for legal and compliance work: the skill enforces a consistent process for identifying what needs attention, but it does not substitute judgment about the substantive content.

## What stays consistent across runs

The carry-out is straightforward: feed the skill the same checklist of requirements and it returns the same flagged sections every time, regardless of when or how many times it runs. That consistency is the value of using a skill instead of asking Claude to do an open-ended comparison, which would produce a differently organized answer on every attempt.

## Key takeaways

- Claude's expansion-update skill flags which handbook sections need a change for a new state; it does not rewrite the policy language itself.
- The skill is a SKILL.md file in plain language that Claude reads before acting, and it runs its steps in a fixed linear order.
- The constraint it enforces is narrow: compare existing handbook content against the new state's requirements and flag qualifying sections.
- The flagged list stays consistent across repeated runs on the same inputs, but writing the actual replacement language is left to the user.
- This is the same skill pattern used across Claude's legal-workflow skills: consistent process, human judgment on substance.

## Who this is for

This is for HR teams, in-house counsel, and business owners handling multi-state expansion who want a repeatable way to spot outdated handbook sections before deciding how to rewrite them.
