---
title: "Tanmay's Mycroft Update - Inside Lemonade's Claims Bot, Building a Production-Ready AI Workflow"
seoTitle: "Inside Lemonade's Claims Bot: Production AI"
description: "Tanmay Kulkarni reverse-engineers Lemonade's AI claims automation, building a reference implementation to find the real gap between a demo and production."
summary: "Lemonade automates 96% of claims intake with no human involved, and Tanmay Kulkarni builds a working reference implementation to find out where the real engineering difficulty actually lives."
keywords: ["lemonade ai claims bot explained", "ai insurance claims automation architecture", "authorization gate ai claims system", "production ready ai workflow checklist", "ai claims intake verification stages", "audit trail idempotency ai system", "mocked ai claims reference implementation", "four questions ai production readiness"]
generated: "article"
---

Ninety-six percent. That's how often Lemonade's claims bot takes a customer's claim straight through with no human in the loop at all, and fifty-five percent of the time it closes the claim entirely, end to end, while the customer is still holding their phone. Those numbers are genuinely impressive, and they're also the extent of what Lemonade's public filings actually explain. What they achieve is detailed. How they decide is almost entirely absent. So Tanmay Kulkarni wrote a case study on the automation, then built a working reference implementation of the workflow behind it, specifically to find out where the real engineering difficulty lives.

## Four questions for every stage

Before opening up any individual stage of the system, the method used throughout is a consistent set of four questions applied at each step: what's mocked, what did I make up and does the code admit it, what happens when it says no, and could you prove afterward what happened and why. That framework, applied consistently, is what turns a demo into something closer to an honest audit of production readiness.

## A worked example, not a real customer

To make the workflow concrete, the case study walks through an illustrative scenario involving a customer referred to as Sophia, who is explicitly not a real Lemonade customer but a constructed worked example, deliberately built to stay inside what Lemonade has actually confirmed publicly. Sophia files a claim for a vet visit related to her dog's kennel cough, for $120, dated the first of May, submitted as free text.

## Stage one: intake

Intake's job is turning that free text into something checkable: a diagnosis, an amount, a date, and a confidence score. In the worked example, that confidence lands at 0.95, comfortably above the threshold needed to move the claim forward. In the reference implementation, intake talks to a fake adapter that deterministically returns perfect JSON every time, at no cost. A real model doesn't behave that cleanly. It wraps JSON in an explanation, invents a field, or times out, which means a real system needs retries with backoff, schema validation on every response, and a fallback for when validation fails anyway. At that point, every claim becomes a token bill and a latency budget someone is answerable for.

## Stage two: verification

Verification runs four checks in a fixed order and stops at the first one that fails: are the diagnosis, amount, and date all present; does a policy record exist for this customer; is there a fraud signal attached to them; and does what they claimed match the policy record within tolerance. If a claim clears all four checks, it moves on, and critically, every rejection gets a named reason rather than a vague "needs review" label, things like no record found, mismatch, or fraud flag, so it's always clear why a claim stopped. Both the database lookup and the fraud signal in this reference implementation are mocks, but the interface is built to stay identical when real data sources are swapped in. One deliberate design choice worth flagging: fraud detection is kept genuinely independent rather than folded into the record lookup as one more field, since Lemonade's fraud system and its claims bot are described as two separate things, and the reference implementation avoids repeating a mistake where outside coverage tends to merge them into one. The matching tolerance used here was invented and explicitly labeled as such, since it still needs tuning against real claims data.

## Stage three: the authorization gate

This is the stage described as the one worth sitting with longest. Lemonade's own 10-K states that its AI escalates claims it isn't authorized to settle to a human expert, meaning the system's authority has a defined boundary. But nowhere in any public filing, shareholder letter, deck, or interview does Lemonade specify where that boundary actually sits: no dollar amount, no claim type, no confidence threshold. The reference implementation's authorization gate reflects that absence directly. The file contains no hardcoded rule at all. It calls a policy function that has to be supplied externally, because settlement authority might not even be a simple dollar threshold, and writing in an arbitrary number like "under $500" would quietly imply that it is, without any basis for that claim.

To make the demo runnable at all, a policy function is supplied with a threshold of $500, and that number is invented exactly like the tolerance value used in verification. The key difference is that it deliberately carries no "dev" marker, because a dev marker functions as a promise that a value is a real default worth tuning. This number isn't that. It's a test prop, and labeling it as a real default would have been its own quieter kind of dishonesty.

## What production actually requires

The authorization gate is also identified as the stage that changes most between a reference implementation and a real production system. In an actual insurer, that policy function isn't something written casually, it's a decision a compliance team signs off on formally. That means a production version needs a full audit trail for every claim, capturing the inputs, the outcome, and which version of the policy decided it, the ability to explain a denial to a regulator in plain English, and idempotency, so that a retry never results in paying the same claim twice. None of that exists in the reference implementation. All of it is non-negotiable before anything like this touches real claims.

## Proving the wiring, not just the answer

The reference implementation includes 43 passing tests, and part of what those tests prove is more specific than "the system returns the right answer." Some tests use spies to demonstrate that a rejected claim never even reaches the next stage in the pipeline, confirming that later code simply never runs for a stopped claim, not just that the final output happened to be correct.

## Key takeaways

- Lemonade's claims bot automates 96% of claim intake with no human involved and closes 55% of claims end-to-end, but public filings don't explain how the underlying decisions are made.
- The workflow runs through three stages in order, intake, verification, and an authorization gate, stopping the moment any stage returns a rejection.
- Every rejection is given a named reason rather than a generic status, and mocked components like the database and fraud signal are built with interfaces meant to stay identical once real data sources are swapped in.
- The authorization gate deliberately contains no hardcoded rule, reflecting the fact that Lemonade has never publicly disclosed where its AI's settlement authority actually ends.
- Production-readiness requires an audit trail, plain-English explainability for denials, and idempotency to prevent duplicate payouts, none of which exist in the reference implementation.

## Try it yourself

Anyone building a system that talks to a model can apply the same four questions used here, what's mocked, what was invented and whether the code admits it, what happens on a rejection, and whether the outcome can be proven afterward, to measure their own honest distance from production. This breakdown comes from Tanmay Kulkarni as part of Humanitarians AI Fellows' Mycroft Financial AI work.
