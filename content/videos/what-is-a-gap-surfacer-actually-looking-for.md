---
title: "What Is a Gap-Surfacer Actually Looking For?"
seoTitle: "What a Contract Gap-Surfacer Actually Checks For"
description: "Liam explains that a checklist gap check only flags missing text matches in a document, not clause quality, using an assignment-clause example."
summary: "Liam explains why a checklist-based gap check on a contract only flags whether matching text exists for each item, not whether a clause is well written, and why both matches and no-matches still require a human to actually read the page."
keywords: ["what does a contract gap check actually do", "does ai catch bad contract clauses", "checklist gap check vs clause quality review", "why no match found does not mean clause is missing", "how to scan a contract for missing checklist items", "assignment clause filed under different wording example", "ai contract review checklist limitations", "prompt for checking document against a checklist"]
generated: "article"
---

Someone on a legal team asks whether a contract review tool catches bad clauses, clauses that exist but are poorly written. Liam corrects the premise: what a checklist gap check actually catches is missing clauses, not bad ones, and the difference matters more than it sounds.

## What a gap check actually does

A checklist gap check does exactly one thing: it walks a list of items a document is supposed to contain, scans the document for matching text, and reports which items have no match anywhere. It is not judging whether a clause that does exist is any good. It is only asking whether something is present at all. A checklist line item like "governing law" gets scanned against the whole document, and the check reports a match or no match, nothing more nuanced than that.

## How the check runs, line by line

The process walks a checklist one item at a time, governing law, indemnification, assignment, and for each line, scans the entire document for matching text. That is the full extent of the mechanism: a simple presence check repeated across every checklist item.

## The assignment-clause example

Consider what happens when the assignment line comes back with no match anywhere in the document. It gets flagged, but flagged does not mean resolved, that is as far as the scan alone can determine. In this case, the protection was actually there the whole time. It was simply filed under the heading "Transfer of Rights" instead of "Assignment." The checklist's exact wording missed language that, read by a person, clearly provided equivalent coverage.

## Why neither a match nor a no-match is the final word

A match does not prove a clause is good enough to actually protect the parties involved. A no-match does not prove the protection is actually absent from the document. In both directions, a person still has to open the page and read it to know what is really there. A gap surfacer does not tell you a clause is missing. It tells you where to look. A "no match found" result is a lead worth investigating, not a verdict on the document's actual completeness.

## Why this distinction matters in practice

Treating a gap check as a substitute for reading the contract risks two different failure modes. Trusting a match too readily can let a genuinely weak or one-sided clause slide through unexamined, since the check never evaluated quality in the first place. Trusting a no-match too readily, as in the assignment example, can trigger unnecessary alarm or rework over language that was there all along, just phrased or filed differently than the checklist expected.

## Key takeaways

- A checklist gap check only verifies whether matching text for a checklist item appears anywhere in a document, it does not evaluate clause quality.
- The check runs by walking the checklist line by line and scanning the full document for matching text on each item.
- A flagged "no match" is a starting point for investigation, not confirmation that the protection is genuinely missing, since coverage can exist under different wording.
- A "match" result likewise does not confirm a clause is well written or sufficiently protective, only that matching language exists.
- Both outcomes still require a human to open the document and read the relevant section before drawing a real conclusion.

## Who this is for

Legal and compliance professionals using AI-assisted document review who need to understand exactly what a checklist-style gap check can and cannot tell them, so they know when a flag genuinely requires manual reading versus dismissal.
