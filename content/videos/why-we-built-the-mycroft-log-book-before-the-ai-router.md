---
title: "Why We Built the Mycroft Log Book Before the AI Router"
seoTitle: "Why Mycroft Built an AI Log Book Before the Router"
description: "Why the Mycroft project built a detailed request log before any AI routing logic, and how dual-writing and decimal precision keep the record honest."
summary: "Simba explains why Mycroft built a complete request log book before writing any routing logic, so every claim the project makes can be traced back to a real record."
keywords: ["ai request logging before routing", "ai model routing decision log", "dual write logging pattern", "floating point drift cost tracking", "ai cost per task type tracking", "ai retry rate measurement", "mycroft financial ai logging", "ai router design reliability testing", "log book before router design", "ai request record format design"]
generated: "article"
---

You can't fix a routing problem you can't see. That's the entire argument behind the latest sprint on Mycroft, the Humanitarians AI financial project: before writing a single line of logic that decides which AI model handles which request, the team built the record that tracks what happens when a request gets handled at all.

Simba, who led this sprint, lays out the problem plainly. Right now, Mycroft sends every AI request to whichever model a given project happened to pick, with no record of what that cost, how long it took, or whether it was even the right call. Easy requests can land on expensive models they never needed. Hard requests sometimes land on a cheap model and come back fluent but wrong. None of that gets written down anywhere. Today, Mycroft literally cannot see any of it.

## Why the record comes before the router

There are two reasons the log book had to exist before any routing logic. First, every number the Mycroft project will ever report comes out of this log book, and you don't want to be changing its format later once other things depend on it. Second, you can't compare before to after without a stable baseline, and that before-and-after comparison is exactly what a later routing decision depends on. Building the log book first means it ships no matter what that eventual decision turns out to be. Even if the simplest possible routing approach wins, Mycroft still ends up able to answer a basic question: which model produced this claim?

Every request now produces a single record capturing which model answered, which rule sent it there, what it cost, how long it took, whether it succeeded and why, and a quality score. A timestamp rides along too, so a run from one week can be told apart from a run three weeks later.

## Dual-writing for reliability

The reliability design here is deliberate. Every record lands in two places: a plain text log written first, then a database for querying written second. If something crashes between those two writes, the text log still has the record, and the database can be rebuilt from it. Reverse that order, write the database first, and a crash between the two loses the record outright. That ordering isn't a style choice, it's the difference between a system that can recover and one that silently drops data. On top of the raw records, three summaries exist specifically to support a later decision: cost per task type, retry rate per task type, and which requests are slowest. This is the shape of the decision, not the answer to it yet.

## Where measurement quietly lies

Two of the sixteen tests built for this sprint exist because measurement itself can be misleading in ways that are easy to miss. Money is stored as exact decimals, not floating-point approximations, because hundreds of small costs adding up in floating point can drift right past a meaningful percentage threshold. And a retried request counts as one request that cost both attempts combined, not two separate requests. Counted the obvious way, retries would make the average cost look lower than it actually is, which is exactly backwards. Two more tests guard the record itself: a retried record can't be created without recording which model it escalated from, because a record that can't explain why the model changed isn't really a record of anything, and writing the same request twice never creates a duplicate row.

A short trial run, built to check the arithmetic rather than measure anything real, found that one retried hard request cost roughly 260 times a simple lookup. If Mycroft's real traffic turns out to be mostly simple lookups sent to expensive models, that gap points to large savings. If it's mostly the hard kind, it doesn't. Nobody knows which yet, and that's exactly what the next five sprints are meant to answer.

## Key takeaways

- Mycroft built its request log book before writing any AI routing logic, because every future report and before-after comparison depends on that record existing first.
- Every request now generates one record with model used, routing rule, cost, latency, success or failure, quality score, and a timestamp.
- Records are dual-written: a plain text log first, then a database second, so a crash between the two never loses data.
- Costs are stored as exact decimals rather than floating-point approximations to avoid drift across large volumes of small transactions.
- A retried request is counted as one request costing both attempts combined, not as two separate cheaper requests.
- The sprint shipped the record format, log writer, database and query layer, three summary functions, sixteen passing tests, and a readme, proving the measurement is correct without yet measuring anything about real traffic.

## Try it yourself

Pick something you run regularly that currently explains nothing about itself, and ask the dual-write question: which write should happen first? That's often the question most likely to teach you something, precisely because it's the one that's easy to get backwards. This kind of disciplined, measurement-first engineering is the standard the Mycroft financial AI project at Humanitarians AI holds its fellows to before any feature gets built on top.
