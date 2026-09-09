---
title: "Claude, Gl Recon."
seoTitle: "Claude GL Recon: Matcher, Not a Fixer"
description: "Liam explains why Claude's gl-recon skill matches ledgers and classifies breaks by likely cause, but never decides which ledger number is correct."
summary: "Liam breaks down the gl-recon Claude Skill using a $4,000 GL-to-subledger gap example, showing it matches, surfaces, and classifies breaks in a fixed order without ever editing either ledger."
keywords: ["how does claude gl recon skill work", "claude general ledger subledger reconciliation", "gl to subledger break classification ai", "does claude decide which ledger is correct", "claude skill for financial reconciliation", "gl recon matcher not a fixer", "classifying reconciliation breaks by likely cause", "claude skill.md general ledger matching"]
generated: "article"
---

Watching Claude run a skill called gl-recon on a set of ledgers looks like it might be auditing the books, deciding which number is correct. It is not. Liam walks through what the gl-recon skill actually does: it matches the general ledger to the subledger, surfaces every disagreement, and tags each one with a likely cause, without ever changing either ledger's numbers.

## What gl-recon actually checks

The skill matches the general ledger to the subledger at the trade date, position, or transaction level. Run it on a period with a known break, and neither ledger number moves; the general ledger figure and the subledger figure are exactly what they were before the run. What appears between them is a classified break, a specific gap tagged with a probable explanation, not a correction to either side.

## Working through an example break

Take a position where the GL shows $104,000 and the subledger shows $100,000. gl-recon lines up the two records, flags the $4,000 gap, and tags it with a likely cause, for instance a late trade. The skill runs in a fixed order: match at the specified level, surface the break, classify the cause, with no branching unless the skill's own instructions call for it. That order is what makes the process repeatable rather than an ad hoc comparison each time.

## Why it is a matcher and classifier, not a fixer

gl-recon never edits either ledger and never decides which one is correct. That decision stays with the person reviewing the reconciliation. The payoff of running the skill is that the same breaks get caught the same way on every run, using the same matching logic and the same classification approach. The limit is just as important: the skill surfaces and tags, but resolving a break, determining whether it is a timing issue, a data entry error, or something else that needs correcting, is still a human decision.

## Why neither outcome proves the underlying truth

A break tagged as a likely timing difference does not prove the trade will settle and the gap will close on its own; that tag is a hypothesis about cause, not a guarantee of resolution. Equally, a period that reconciles cleanly end to end does not prove nothing was wrong in it. Clean reconciliation only means every difference happened to net to zero for that run, which can mask offsetting errors rather than confirm their absence. Both a tidy classification and a clean run need to be read as findings, not as verdicts.

## Key takeaways

- gl-recon matches the general ledger to the subledger at the trade date, position, or transaction level, then surfaces and classifies breaks.
- Running the skill on a known break leaves both ledger numbers unchanged; only a classified gap appears between them.
- The process runs in a fixed order (match, surface, classify) with no branching unless the skill itself specifies it.
- The skill never decides which ledger is correct or resolves a break; that judgment call stays with the person reviewing the output.
- A break tagged with a likely cause is not proof it resolves on its own, and a clean reconciliation is not proof the period had no errors.

## Who this is for

This is for accounting, finance, and operations teams doing GL-to-subledger reconciliation who want a consistent, repeatable way to surface and classify breaks before deciding how to resolve them.
