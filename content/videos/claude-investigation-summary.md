---
title: "Claude, Investigation Summary."
seoTitle: "Claude investigation-summary: one line per audience"
description: "Explains why Claude's investigation-summary skill drafts a different summary for each audience from one privileged record, not one summary for everyone."
summary: "Uses Claude's investigation-summary skill to show why a privileged investigation gets a different summary drawn for each audience, and why no single version is a safe stand-in for another."
keywords: ["does claude write one summary for everyone who asks", "how does claude investigation summary skill work", "privileged investigation summary for different audiences", "claude skill for audience specific legal summaries", "why outside counsel version differs from workforce version", "claude skill.md draws the line not the reader", "claude skill for privilege redaction by audience", "write a skill.md for a document shared with two audiences"]
generated: "article"
---

Claude has a skill called investigation-summary, and it's natural to assume it writes one clean summary of what happened for anyone who asks. It doesn't, and it can't. The investigation is privileged, and not every reader is entitled to the same amount of it. Sending the version written for outside counsel to the general workforce would hand over the very analysis privilege exists to protect.

## What the skill actually is

Investigation-summary is a folder holding a single SKILL.md with instructions, in plain language, for drafting an audience-specific summary from one underlying privileged record. Claude reads that file top to bottom and follows it step by step: read the investigation record, draft to the audience it's given, return that one output. No branching happens unless the file itself says to branch.

## Specification, not judgment about privilege

This makes the skill a specification, not judgment about what privilege actually protects. The payoff is that the same audience reliably gets the same shape of summary every run. The limit is that a reader the file never anticipated gets no guidance on where the line should sit. Investigation-summary never writes "the summary" of an investigation, as though one canonical version exists. It writes one summary, once, per audience, each drawn from the same underlying privileged record but shaped differently depending on who's receiving it.

## Why one document can't serve two audiences

The file, not the reader, decides where the line falls for a given audience. That's a deliberate design, because a summary appropriate for outside counsel, who may be entitled to legal analysis and strategy, is not appropriate for the general workforce, who typically aren't. Treating any single summary as a universal, safe-to-share document defeats the purpose of drawing audience-specific lines in the first place.

## What the output does and doesn't prove

A summary that reads as plain fact doesn't prove privileged material was actually stripped out; there may simply have been little to redact for that particular matter. A summary that withholds a substantial amount doesn't prove the boundary was drawn correctly either; it may have cut more, or less, than that audience was actually owed. Neither outcome is proof of a properly drawn line, because judging where privilege should end for a given reader is a legal determination the file's structure supports but doesn't make on its own.

## Trying it yourself

Pick one document from work you need to share with two different audiences. Ask Claude to write a SKILL.md that defines what each audience should and shouldn't see from it, then have it read the file back to you and walk through exactly what it will do before doing it. Running this against a real document you actually share differently makes the audience-specific logic concrete.

## Key takeaways

- Claude's investigation-summary skill drafts a different summary for each audience from one underlying privileged record.
- Sending one audience's version to a different audience can expose analysis privilege was meant to protect.
- The skill follows a fixed process, reading the record and drafting to the specified audience, with no independent privilege judgment.
- The same audience gets the same shape of summary every run, but an unanticipated reader gets no built-in guidance.
- A plain-fact summary or a heavily redacted one is not proof, on its own, that the privilege line was drawn correctly.

## Who this is for

In-house counsel and compliance teams managing privileged investigation records across multiple audiences, and anyone who wants to understand why a single summary is never a safe substitute for a version drafted for a different reader.
