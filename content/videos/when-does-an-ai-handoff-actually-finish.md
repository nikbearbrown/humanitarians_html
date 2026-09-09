---
title: "When Does an AI Handoff Actually Finish?"
seoTitle: "When Does an AI Task Handoff Actually Finish?"
description: "Liam explains why a finished-looking Claude output isn't done until a human confirms it, using a contract redline example with a wrong instruction."
summary: "Liam breaks down why a Claude handoff needs three parts, a scope, a human confirmation boundary, and a record of changes, using a contract redline where flawless execution of a wrong instruction still produces a wrong result."
keywords: ["when is an ai task handoff actually finished", "why does a finished ai output still need review", "contract redline example ai wrong instruction", "three parts of a working ai handoff", "why silence is not approval for ai output", "how to check ai marked changes before accepting", "scope boundary record ai delegation framework", "flawless ai execution wrong instruction example"]
generated: "article"
---

Someone hands Claude a contract redline and assumes the job is finished the moment a result comes back. Liam explains why that assumption is wrong, the job isn't finished, it has just started, and walks through what actually needs to happen before a handoff counts as done.

## Flawless execution, wrong instruction

It's tempting to treat "Claude delivered it" as equivalent to "the job is done." But consider what happens if the instruction itself was flawed: redline every use of the word "vendor" when really only one specific vendor's name should have changed. Claude will redline every instance correctly, exactly as asked. The output is flawless, and the contract is now wrong, because nothing in the process paused to check whether the instruction itself was right before it shipped. This is the core problem: correct execution of a bad instruction still produces a bad result.

## The three parts of a working handoff

A handoff that actually works has three parts: a scope, exactly what is being asked; a boundary, the point where a human has to confirm before anything counts as final; and a record of what changed. Without all three, a handoff cannot reliably be trusted, no matter how polished the output looks.

## Marked, not accepted

Consider the same contract redline done correctly. It comes back from Claude with every changed clause marked in the margin, marked, not accepted. A lawyer then opens that redline and checks every marked clause against the record, instead of rereading the whole contract cold from scratch. Only after that check happens does the redline become final. This is what the boundary and the record are for: they let a human verify targeted changes efficiently rather than re-doing the whole task from zero.

## Silence is not a signature

A redline that nobody commented on is not automatically approved. Silence is not a signature, somebody still has to actively say yes before it counts as final. Equally, a redline that comes back heavily rewritten is not automatically a failure either. A clean first pass and a heavily rewritten one can both represent the handoff working exactly as intended, since the point of marking changes is to make review possible, not to guarantee the first draft was perfect.

## When the handoff is actually done

The handoff is not done when Claude finishes generating output. It is done when a person signs off on what comes back. That distinction, between output completion and human confirmation, is the entire point of building scope, boundary, and record into the process in the first place.

## Key takeaways

- A finished-looking AI output is not the same as a finished task; correct execution of a wrong instruction still produces a wrong result.
- A working handoff needs three parts: a scope defining what's being asked, a boundary marking where human confirmation is required, and a record of what changed.
- Marking changes in the margin, rather than auto-accepting them, lets a reviewer check targeted edits against the record instead of re-reading everything cold.
- Silence on a returned redline does not constitute approval; someone must actively confirm before it becomes final.
- A heavily rewritten first pass is not a failure of the handoff, both a clean and a heavily marked result can reflect the process working as intended.

## Who this is for

Anyone delegating document review, editing, or drafting tasks to Claude, especially in legal or contract contexts, who needs a concrete framework for knowing when an AI-assisted task is genuinely complete versus merely returned.
