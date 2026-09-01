---
title: "Chaitanya's Medhavy Update: What is a Concept Map?"
seoTitle: "Concept Maps: Chaitanya's Medhavy Audit Update"
description: "Chaitanya audits Medhavy's concept map system, a four-stage review gate for machine-generated knowledge graphs with zero downstream consumers."
summary: "Chaitanya audits the concept map subsystem behind Medhavy: a strict four-stage review gate that produces verified knowledge graphs nothing yet reads."
keywords: ["concept map subsystem audit", "knowledge graph textbook prerequisites", "machine generated concept extraction review", "medhavy s3 layer verified maps", "four stage review generate import export", "dangling edge bug knowledge graph", "humanitarians ai medhavy concept mapping", "paclitaxel microtubules prerequisite node"]
generated: "article"
---

A table of contents tells you the order an author happened to write things in. It says nothing about the order in which a student can actually learn them. That distinction is the entire reason the concept map subsystem exists, and HAI Fellow Chaitanya's latest Medhavy update is a full audit of how that subsystem works, what it does well, and one place where it currently falls short.

## Nodes, edges, and prerequisites

A concept map is a knowledge graph built from a textbook: every teachable idea becomes a node, and every edge records a prerequisite, what has to already be understood before the next idea can mean anything, rather than simply what comes next in the book's own ordering. Chaitanya's worked example comes from a cancer textbook: paclitaxel, also called taxol, the term students would actually type when searching, appearing in chapter 22, section 1. It's a purely factual node, a drug name rather than a mechanism, and it carries one prerequisite: microtubules, because paclitaxel is meaningless until a student knows what it actually binds to. The node's name is the easy part. The prerequisite edge is what makes the whole review tool worth building.

## Machine extraction is roughly right and locally wrong

The nodes themselves are machine-generated: a Python pipeline reads the book, cross-references Wikipedia, and emits candidate concepts. Chaitanya describes that kind of extraction as roughly right and locally wrong. It can invent concepts the book never actually teaches, merge two distinct ideas into one node, or default to a Wikipedia title instead of the term the professor actually uses in class. The pipeline is aware of its own limitations: in one sample run of 25 nodes, it flagged six as low confidence and two as thin on supporting source material. That self-flagging is exactly why the review stage exists as a human gate between a machine's first guess and a trusted artifact.

## Four stages, generate to export

The subsystem runs through four stages. Generate is external to this repository: the pipeline writes its output as JSON to S3 under a dedicated prefix, one file per run. Import brings a run into the hub, where it gets validated and every node lands in the database marked pending. Review is where a domain expert works through the map node by node, choosing from exactly three verdicts: accept because the pipeline got it right, edit because the concept is right but the name is wrong, or remove because the book simply doesn't teach that idea. Reviewers can also add concepts the pipeline missed entirely. Export is the stage Chaitanya calls the cleanest design decision in the whole subsystem, and it's hard-blocked while even a single node remains pending. There is no "ship it, mostly reviewed" path: one unreviewed node out of 25 keeps the export button dead.

## What gets stripped, and why

On the way out, three fields get deliberately stripped from every node: Wikipedia categories, confidence scores, and source URLs. Those fields aren't facts about the textbook; they're scaffolding built for the reviewer. Confidence exists to tell a human where to look hardest. Once a human has actually looked, the number has done its job, and shipping it downstream would be misleading rather than helpful.

## A verified system with zero consumers

The part Chaitanya wanted explicitly on the record: nothing currently reads these verified maps back. The verified type is imported by exactly two files, the code that writes it and the code that defines it, and nothing else in the hub ever opens that verified prefix again. The intended consumers, the textbook sites themselves, are still on the roadmap, listed as a deliverable for the next generation of the chassis rather than shipped code. The review pipeline is complete and correct. The consumption side is currently empty, which is worth knowing before anyone invests another week polishing the editor further.

## The dangling edge risk

One more issue follows directly from how the graph is built. Prerequisites are stored as ID references, and removal is a valid reviewer verdict. That means a reviewer can quietly break the graph: removing a node that three other nodes depend on causes the export to drop that node while still copying every surviving node's prerequisite list through untouched, with no revalidation. The result is a verified map containing edges that point at a node no longer in the file. Both current sample fixtures are clean, 18 edges each with nothing dangling, so the bug hasn't bitten anyone yet, but nothing in the system currently prevents it, and a reviewer gets no warning that the node they're about to remove is load-bearing for the rest of the graph.

## Key takeaways

- A concept map is a prerequisite dependency graph of a textbook, distinct from a simple table of contents.
- Machine-generated nodes are roughly right and locally wrong, which is why a strict four-stage human review gate exists.
- Export is hard-blocked while any node remains pending, with no partial-review shipping path.
- Confidence scores, categories, and source URLs are stripped on export because they're reviewer scaffolding, not facts about the book.
- The review and export pipeline works correctly, but nothing downstream currently consumes the verified maps it produces.
- Removing a load-bearing node can silently create dangling prerequisite edges, with no revalidation or warning to the reviewer.

## Who this is for

This audit is for anyone tracking the Medhavy project or interested in how Humanitarians AI Fellows like Chaitanya build and stress-test educational tooling before it ships. It's a candid look at a subsystem that does its own job well while surfacing exactly where the surrounding system still needs work.
