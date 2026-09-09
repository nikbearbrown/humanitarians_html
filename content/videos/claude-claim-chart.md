---
title: "Claude, Claim Chart."
seoTitle: "Why a filled claim chart cell is not proof"
description: "Explains how Claude's claim-chart skill pin-cites evidence per element and why a full grid does not mean a claim is proven."
summary: "A walkthrough of Claude's claim-chart skill showing why a filled cell means a citation was found, not that the element is proven, and why a gap is not a failure."
keywords: ["how to build a claim chart with claude ai", "claude claim chart skill explained", "does a filled claim chart prove infringement", "pin cite evidence for patent claim elements", "claude ai gap detection legal claims", "why is a claim chart gap not a failure", "element by element claim chart tool", "claude skill for legal claim mapping"]
generated: "article"
---

Claude's claim-chart skill breaks a legal claim into its separate elements and looks for evidence supporting each one, element by element. The easy mistake is to read a full grid as a strong case, since every box has an entry. This video walks through why a filled cell and a gap mean something narrower than that.

## What a claim chart actually does

A legal claim breaks down into separate elements, and each one needs its own proof. The claim-chart skill works through a claim this way: for every element, it finds a passage that could support it and pin-cites the exact page and line where that passage lives. The chart is a map of where support exists and where it doesn't, not a verdict on the claim itself.

## The anchor: one cited element, one gapped element

The video anchors this on two elements from the same claim. "A locking mechanism" turns up a citation straight to the product manual, page twelve, so that cell reads "supported, manual page 12." "A temperature sensor" turns up nothing in the same manual. No citation exists to put in that cell, so it's marked as a gap, flagged on purpose rather than left ambiguous.

## Filled does not mean proven

A filled cell only shows that a citation was found and pinned to a specific page. It says nothing about whether that citation actually proves the element. A citation can be weak, or it can cover only part of what the element requires. Treating a full grid as an automatically strong case skips over that distinction entirely.

## A gap does not mean the claim fails

The flip side matters just as much. A gap isn't proof that the element fails, it's only proof that no evidence has turned up yet in the documentation reviewed. The chart's job either way is the same: show exactly where to look next, whether that means double-checking a weak citation or searching further for the missing one.

## Try it yourself

The video's prompt: paste in the claim language element by element, along with the accused product's documentation. For each element, ask Claude to find the exact passage that supports it, cite it, and flag any element with no citation as a gap, without guessing to fill it in. Running this surfaces the same distinction the video is built around: a chart is only useful once you can tell its filled cells from its gaps, not by how full it looks at a glance.

## Key takeaways

- The claim-chart skill works element by element, pin-citing the exact page and line supporting each one.
- A filled cell means a citation was found, not that the element is proven.
- A citation can be weak or only partially cover an element, so full grids still need review.
- A gap is flagged on purpose and only means no evidence has turned up yet, not that the element fails.
- The chart's real value is pointing to what to check next, not delivering a finished verdict.

## Who this is for

Anyone using Claude to organize evidence against claim elements in patent or contract disputes, and anyone who wants to understand what a claim chart's filled cells and gaps actually represent before relying on one.
