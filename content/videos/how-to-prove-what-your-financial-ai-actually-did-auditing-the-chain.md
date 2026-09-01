---
title: "How to Prove What Your Financial AI Actually Did (Auditing the Chain)"
seoTitle: "Auditing a Financial AI: SHA-256 Bundle Chain"
description: "Onyx explains how the Mycroft finance investigator packages 54 run artifacts into a hash-verified audit bundle, and what SHA-256 does and doesn't prove."
summary: "Onyx walks through how the Mycroft finance investigator bundles 54 artifacts behind SHA-256 hashes into an independently verifiable audit package, while five human approval gates stay open."
keywords: ["sha-256 audit bundle finance ai", "mycroft finance investigator", "verify ai agent reasoning chain", "financial ai audit trail", "hash chain investigation integrity", "ai audit bundle tamper detection", "verify bundle command finance", "financial ai human review gates", "audit trail agentic finance ai"]
generated: "article"
---

An AI system can produce a confident-sounding financial analysis, but confidence isn't proof. If a reviewer can't independently verify that the data, the code, the tests, and the conclusions all actually came from the same investigation, the analysis is just a claim dressed up as a result. This week's episode of the Mycroft finance investigator series tackles that problem directly by building an audit bundle.

## The problem: trustworthy pieces, unprovable wholes

By this point, the investigator already has validated data, deterministic math, adversarial evaluations, scenario analysis, and an open review gate. Each of these capabilities was added in a previous week, and each one wrote its own files: logs, results, reports, hashes. Individually, every piece is trustworthy. But a reviewer shouldn't have to simply take it on faith that a given evaluation, a given scenario, and a given review request all describe the same underlying run. Belonging has to be provable, not assumed, and that is the exact gap this week's work closes.

## Seven links that have to match before anything bundles

Before the system packages a single file, it rederives the chain connecting everything together. The review request has to carry the same run ID and the same SHA-256 hash as the investigation log. The scenario output has to hash-match that baseline run and its plan. If any link is broken, packaging simply stops with an error, because you cannot bundle evidence that doesn't provably belong together. Seven distinct things have to line up before packaging proceeds: the investigation run ID, the validation result, the review request hash, the evaluation case hash, the scenario plan hash, the raw data hashes, and the verified data hashes. Miss even one, and nothing gets packaged.

## What actually goes into the bundle

Once those seven links validate, the system packages 54 artifacts into a single folder: raw and verified finance data, configuration schemas, the implementation code, the tests, the investigation, evaluation, and scenario logs, the human-readable reports, the recipe, and the conductor. Alongside those artifacts sit three integrity files: a manifest listing every hash, a checksum of that manifest itself, and a human-readable review.md summarizing the bundle for a person.

## An independent verification step, tried against attacks

A separate command, verify bundle, exists specifically for the reviewer. It rereads the manifest and the review checksums, recomputes the size and SHA-256 of every packaged artifact, and rejects any file that turns out extra, missing, or altered. When everything checks out, it prints a single status: integrity matched, human review open. That claim was tested by deliberately trying to break it. Seven tamper cases were each caught and rejected: an altered manifest, a modified reviewer view, a changed packaged artifact, an extra unlisted file, a mismatched run hash, an unsafe bundle name, and an overwrite attempt. Nine bundle tests passed in total, bringing the project to 41 passing tests with both GitHub CI checks green.

## What a hash actually proves, and what it doesn't

The episode is careful to draw a precise line here. SHA-256 checks prove file integrity, meaning these exact bytes have not changed since packaging. That is all it proves. It does not prove identity, it does not prove the work is adequate, and it is not a human approval. The bundle itself says as much in its own output. Because of that, the bundle ships nothing on its own: the recipe stays labeled draft, and the release status is blocked pending human review. Five gates stay visibly open: materiality approval, evidence-backed causal explanation, evaluation adequacy, scenario approval, and distribution authorization. The machine packaged the proof; a named human still has to decide what it means.

## Key takeaways

- The audit bundle validates seven distinct hash links, run ID, validation result, review hash, evaluation hash, scenario hash, and both raw and verified data hashes, before packaging anything.
- 54 artifacts are packaged together with a manifest, a manifest checksum, and a human-readable review.md.
- An independent verify bundle command recomputes every hash and rejects any file that is missing, altered, or unlisted.
- Seven deliberate tamper attempts, including manifest edits, artifact changes, and overwrite attempts, were all caught and rejected in testing.
- SHA-256 proves file integrity only; it does not prove identity, adequacy, or human approval, so five review gates remain open and the release stays blocked.

## Try it yourself

The episode ends with a direct question worth sitting with: if an AI agent hands you an answer but can't prove exactly which data, code, tests, and decisions produced it, can you actually audit it? This episode is part of the Mycroft finance investigator series from Humanitarians AI Fellows.
