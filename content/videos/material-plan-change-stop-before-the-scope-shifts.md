---
title: "Material Plan Change: Stop Before the Scope Shifts"
seoTitle: "Material Plan Change: When Should an AI Agent Pause?"
description: "Explains three signs that an AI agent's adaptation counts as a material plan change, and why asking before it happens matters more than reporting after."
summary: "Explains why an AI agent should pause and ask before crossing into a new tool, new data, or higher risk than what was approved, since a report written after the fact cannot undo anything."
keywords: ["when should an ai agent stop and ask", "material plan change detector for agents", "ai agent scope creep examples", "human in the loop agent supervision", "why agent reports after the fact dont help", "signs an ai agent changed its plan", "building approval checkpoints into agent workflows", "difference between agent audit log and supervision"]
generated: "article"
---

An AI agent that adapts mid-task is not misbehaving. Tool failures, missing formats, and unexpected inputs are ordinary parts of how these systems work. The real question is not whether an agent should adapt, it is whether it should tell you before it adapts or only report afterward. Say you approve a five-step plan: pull last quarter's invoices, merge them into one report, and save it to the shared drive. Step three hits an invoice in a format the merge tool cannot read. Adapting to that is normal. What happens next is where the risk lives.

## Why an after-the-fact report cannot undo anything

The natural shortcut is to let the agent keep going and read a summary of what it had to change once it finishes. That sounds efficient, but by the time that report exists, the library needed to handle the new format is already installed and the shared folder has already been read, changes nobody actually approved before they happened. A report only tells you what already occurred; it cannot put anything back.

## Three signs worth stopping for

The same three signs mark a change that is worth pausing for, regardless of the task: using a tool that was not approved, touching data that was not named in the plan, or operating at a risk level higher than what was agreed to. Any one of these firing means the agent should stop before the next step, not after it.

## Where the check sits decides whether it matters

A change reported after it happens is an audit log. A question asked before the step is supervision. Only the version asked before the step can still change what happens, because once the tool has run or the data has been read, approval after the fact is just documentation of a decision that was already made without you.

## The invoice example, both ways

Installing a new library and reading a new shared folder both clear the bar for a material change, since both are a new tool and new data outside the original plan. An agent that stops there and asks returns control to you while the plan can still be adjusted. An agent that finishes the task and reports what it did has already made the call on your behalf, and the report only tells you about it afterward.

## The other failure mode: stopping too often

Treating every adaptation as worth a pause creates its own problem. An agent that stops for small, in-scope adjustments, retrying a failed call, or reading the one file it was already told to read, produces so many interruptions that a person stops actually reading them and starts waving them through. The three-sign rule exists precisely to separate ordinary adaptation from the kind of change that actually deserves a pause.

## Key takeaways

- Adapting to a tool failure or a missing format is normal agent behavior and not, by itself, a problem.
- Three signs mark a material change worth stopping for: an unapproved tool, unnamed data, or a higher risk level than agreed.
- A report written after the step happens is an audit log; a question asked before the step is supervision, and only supervision can still change the outcome.
- Reporting after the fact means the agent has already made the decision for you, even if it explains what it did.
- Stopping for every small, in-scope adaptation backfires by training people to approve pauses without reading them.

## Who this is for

Anyone designing or supervising AI agent workflows who needs a concrete rule for when an agent should pause for human approval instead of adapting silently and reporting later.
