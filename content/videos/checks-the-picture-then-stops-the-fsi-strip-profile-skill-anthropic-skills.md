---
title: "Checks the Picture, Then Stops., The FSI-Strip-Profile Skill (Anthropic Skills)"
seoTitle: "FSI-Strip-Profile Skill: Claude Checks Its Own Slide"
description: "How Claude's fsi-strip-profile Skill builds an investment-banking slide one at a time, rendering and checking each image before asking for approval."
summary: "A walkthrough of the fsi-strip-profile Anthropic Skill, which has Claude ask about scope, research a company, then render and inspect each finished slide before showing it for approval."
keywords: ["how to build an investment profile slide with claude", "anthropic skill for financial services slides", "fsi-strip-profile skill workflow explained", "claude checks its own generated slide", "how to catch text overflow in generated slides", "claude skill folder skill.md structure", "one slide investment profile for a stock ticker", "why does claude ask before researching a company"]
generated: "article"
---

Most people assume a model just hands back whatever it generates. The fsi-strip-profile Skill, an Anthropic Skills folder built for investment-banking style slides, does something different: it renders its own output as an image, inspects that image for layout problems, and only then shows it to you. This is a look at how that check actually works and why it changes what "approval" means.

## A skill is a folder, not a prompt

fsi-strip-profile is not a clever prompt tucked into a chat, it is a folder on disk with a `SKILL.md` file inside it that spells out the full instruction set in plain language. Claude reads that file before it does anything else, and the file itself is the program: no hidden logic sitting outside it, no separate system prompt doing the real work. If you want to know what the Skill will do, you can read the same file Claude reads.

## Ask first, then research

Before touching any data, Claude asks a scoping question: one slide or several, and what to focus on. It waits for a yes. Only after that confirmation does it start pulling from filings, market data, and recent news for the company in question. This ordering matters because it stops the Skill from doing expensive research work on a scope nobody actually asked for.

## Build one slide, check it, stop

The Skill does not batch-produce a deck and dump it on you. It builds one slide at a time. After each slide, it converts that slide into a picture and looks it over for the failure modes that plague generated layouts: text spilling past its box, labels getting cut off, a chart bleeding into the neighboring panel. When it finds a problem, it fixes it before moving on. Only after that self-check does it show you the slide, and then it stops and waits for your approval before starting the next one.

## Why the render-and-inspect step matters

Generated documents fail visually all the time, in ways that are invisible if you only look at the underlying markup or data. A number can be correct and still get clipped off the edge of a box. The fix in this Skill is mechanical rather than clever: turn the slide into an actual image and look at it the way a person would, before asking a person to sign off on it. That is the whole trick, and it is documented directly in the Skill's own Workflow section, the scope question, the one-slide-at-a-time build, and the mandatory image-render-and-inspect step before each approval.

## What this video does not claim

The video does not make any claim about the specific financial multiples, data sources, or brand research that fsi-strip-profile pulls in for a given company, those vary case by case and are not the mechanism being demonstrated. Every claim traces back to the Skill's documented Workflow steps rather than to outside knowledge about the company used as an example.

## Key takeaways

- fsi-strip-profile is a Skill folder with a SKILL.md file as its complete, readable instruction set.
- Claude asks about scope and waits for a yes before it starts researching a company.
- Slides are built one at a time, not batched.
- After each slide, Claude renders it as an image and checks for text overflow, cut-off labels, and bleeding charts before you see it.
- Each slide requires your explicit approval before the next one starts.

## Who this is for

Anyone evaluating whether an AI-generated financial slide can be trusted before it reaches a client or a partner, and anyone curious how a Claude Skill enforces a self-check step as part of its own workflow rather than leaving that check to the end user.
