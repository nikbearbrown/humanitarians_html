---
title: "Claude, Diligence Issue Extraction."
seoTitle: "Can Claude Decide Which Deal Issues Matter?"
description: "Explains Claude's diligence issue-extraction skill, which flags contract issues against a fixed category list but does not judge deal risk."
summary: "This video explains that Claude's diligence issue-extraction skill screens contracts against a fixed set of categories in SKILL.md and returns a structured report, leaving the judgment of which issues kill a deal to the reviewer."
keywords: ["can claude flag deal breaking contract issues", "claude diligence issue extraction skill", "how claude screens contracts for due diligence", "change of control clause detection ai", "claude m&a contract review tool", "does claude judge which issues matter", "missing consents expired licenses screening", "claude skill fixed category checklist"]
generated: "article"
---

Can Claude decide which contract issues actually kill a deal? Not quite. This video walks through the diligence issue-extraction skill, showing that it screens a batch of documents against a fixed list of categories and returns a structured report, while the judgment of which flagged issues matter enough to derail a deal stays with the person reviewing them.

## What the skill screens for

Diligence issue-extraction is a folder Claude reads before it works, with a SKILL.md file holding the full instruction set in plain language and no hidden logic. Claude reads the file, then acts, the file is the program. The pipeline itself sits in a step section: Claude reads each step in order and runs it, linear, with no branching unless a step explicitly says so. That structure is the same one behind other Claude skills, a fixed procedure rather than open-ended reasoning about the documents.

## The specific constraint: a fixed category list

The interesting part of this particular skill is its constraint. Claude reads each document against the categories the file specifies, things like change-of-control clauses, missing consents, and expired licenses, and flags anything that matches. Stay inside that list and the issues report holds its shape every time, the same documents in produce the same issues report out, consistently. That reliability comes directly from the categories being fixed in the file rather than decided fresh by Claude on each run.

## What the skill does not do

The video is direct about the boundary: deciding which flagged issues actually kill the deal is still the reviewer's job, not Claude's. The skill's output is a structured issues report built from matching documents against named categories, it is not a risk assessment or a recommendation about deal viability. Even a document that matches several categories on the list doesn't come with a verdict about whether the deal should proceed, that judgment sits outside what the skill produces.

## Why the mechanism matters for diligence work

Understanding this mechanism changes how the output should be used. A structured, category-based issues report is useful precisely because it's consistent and traceable, every flagged issue ties back to a specific category named in SKILL.md, so a reviewer can check the report against the underlying documents efficiently. But treating the report as a finished risk judgment would be a mistake, since the skill was never built to weigh how serious a flagged issue is relative to the deal as a whole, only to catch anything matching the categories it was given.

## Key takeaways

- The diligence issue-extraction skill is a SKILL.md file with a linear, step-by-step pipeline, Claude reads it, then executes it in order.
- It screens documents against a fixed set of categories, such as change-of-control clauses, missing consents, and expired licenses.
- The same set of documents produces the same structured issues report every time the skill runs.
- The skill flags matches against named categories, it does not judge which flagged issues are serious enough to kill a deal.
- Deciding whether a flagged issue actually threatens the deal remains the reviewer's responsibility, not the skill's output.

## Who this is for

This is for legal and M&A professionals evaluating whether an AI diligence tool can be trusted to screen contracts, and for anyone who wants a clear picture of what a category-based extraction skill actually delivers versus what it leaves to human judgment.
