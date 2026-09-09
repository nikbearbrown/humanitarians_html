---
title: "The anthropics Skill | Vertical Edition"
seoTitle: "The Anthropics Skill: A Bench-Test Review Format"
description: "Liam tears down the anthropics Claude skill, a four-mode routine that reads a company's actual output instead of summarizing its press releases."
summary: "Liam breaks down the anthropics Claude skill, a four-mode routing tool that requires every review to point at a spine beat only visible by opening and running the artifact itself, not by reading its documentation."
keywords: ["what is the anthropics claude skill", "how do claude skill.md files work", "ai review skill that reads code not docs", "claude skill four mode router explained", "how to compare claude and another model fairly", "ai content that only repeats press releases", "claude capability mode side by side comparison", "generation honesty law ai skill rule"]
generated: "article"
---

Liam, in for Bear, tears down a skill that isn't about making a typical Brutalist reel. The anthropics skill is built to read a whole company's output, its code, papers, and public content, and report from direct testing rather than from what a press release says. Here's how it actually works.

## What the skill is, and what it isn't

The obvious read of a skill named after a company is that it's another Claude tutorial channel. It isn't. It's built as a beat-journalism practice that reads the artifact itself, not its documentation, and every part of the skill exists to keep that discipline honest when the docs would rather do the explaining for it. The skill file itself is small, 142 lines under skills/make, but what it references is substantial: two sibling engines, four operating modes, and one hard disqualifier every episode has to pass before it ships.

## Four modes, one router

The skill routes work through four modes. A repo target dispatches to a get-explainer analysis engine. A paper target dispatches to the ai-paper skill. A content target asks what has materially changed since the material was published. And a capability mode runs the thing itself and shows the real output, often placed side by side against a competing model. That capability mode is the reason the skill exists at all, since no vendor-run channel would ever ship a comparison like that against itself.

## The rule that disqualifies most AI content

The first design decision carries the whole thesis: if an episode could be made just by reading the docs, it is not the series. Every episode needs at least one spine beat that is only visible by opening the artifact and actually running it. If that beat can't be pointed at, the skill reports the gap rather than building an episode around it. That single rule rules out the large share of AI content that is really just downstream repetition of the same landing pages.

## Reusable probes and honest register

Structure and history come free from a repository; the skill treats behavior as the real thesis. It lists reusable probes, every URL a system contacts, every file it reads outside its own working directory, and the default value of every safety and privacy setting, because a feature that exists on paper but ships off by default tells a different story than the sentence describing it. For paper-mode episodes, the sharpest fair question the skill asks is whether the release code actually reproduces the published claim; the honest answer is often "partially," which turns out to be a more interesting finding than either a clean pass or a flat failure.

Register matters too. The skill treats independence as a stated fact, not a repeated correction: never "they're wrong" or "they're behind," just a plain, single statement that the reviewer builds with Claude daily and nobody is paying for the review. Every episode is anchored to a real date and a real task, so it becomes a historical record instead of going stale, and when a company's own claim matches what testing shows, that match is reported as a finding too, since manufacturing a gap where none exists is exactly the dishonesty the skill is built against.

## Where the skill depends on other pieces

The skill leans on two sibling engines, get-explainer and ai-paper, that are not shipped inside every toolkit snapshot. Point the repo or paper mode at a target without those siblings installed, and the router has nowhere to send the work; the fix is to install the missing skills, never to fake the analysis in their place. A second constraint sits underneath all of this: the skill enforces a rule against ever generating an image that poses as evidence of a fact. That rules out a lot of what makes a video visually engaging, and the skill accepts that trade because credibility is treated as the entire product.

## Key takeaways

- The anthropics skill routes work through four modes, repo, paper, content, and capability, with capability mode running the real thing and comparing it directly.
- Every episode must contain at least one spine beat visible only by running the artifact itself, or the skill reports the gap instead of building around it.
- The skill logs every URL contacted, every file read, and every safety default, since a shipped-off feature tells a different story than its description.
- It depends on two sibling engines, get-explainer and ai-paper, and refuses to fake analysis when those are missing.
- A hard rule against generating images that pose as factual evidence limits visual polish in favor of credibility.

## Who this is for

This is for builders and reviewers of AI tools who want a rigorous, bench-tested review format instead of press-release summaries, and for anyone using or adapting Claude skills who wants to see what a disciplined, source-checked skill design actually looks like.
