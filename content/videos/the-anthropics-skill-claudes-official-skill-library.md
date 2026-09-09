---
title: "The anthropics Skill | Claude's Official Skill Library"
seoTitle: "What the anthropics Skill Actually Does"
description: "A breakdown of the anthropics skill, a four-mode Claude skill that audits AI companies by reading and running their actual work, not their marketing."
summary: "This teardown explains how the anthropics skill routes between repo, paper, content, and capability modes to evaluate AI company output by running the artifact itself, not summarizing its documentation."
keywords: ["what is the anthropics skill", "how does claude skill.md work", "ai capability mode comparison claude", "skill md file structure explained", "does release code reproduce published claims", "claude skill router four modes", "generation honesty law ai video", "reading ai artifacts not press releases"]
generated: "article"
---

Most AI content channels summarize what a company says about its own work. The anthropics skill does something different: it reads the artifact itself, code, papers, or a running capability, and reports from that, not from the press release.

## What the skill actually is

A Claude "skill" is a folder Claude reads before acting, and the anthropics skill is small on disk: one file, 142 lines, sitting under `skills/make`. What's large is what that file references. The skill routes to two sibling engines depending on what's being evaluated, and it enforces one hard rule that every episode has to pass before it gets made.

## Four modes, one router

The skill dispatches to four modes. A repo mode hands off to a "git-explainer" analysis engine to read code directly. A paper mode hands off to an "AI paper" engine for published research. A content mode asks what has changed since a piece of material was published. A capability mode runs the thing itself and shows the real output, often side by side against a competitor. That last mode is described as the whole reason the skill exists, since no vendor-run channel would ever ship a direct side-by-side comparison against a rival product.

## The rule that disqualifies most episodes

The skill's stated design decision is blunt: if an episode could be made just by reading the documentation, it isn't the series. Every episode needs at least one "spine beat" that's only visible by opening the artifact and actually running it. If there's no such beat, the skill is built to report that gap rather than force an episode around it. This single rule is framed as ruling out the large majority of AI content, which mostly repackages the same handful of landing pages.

## Verifying claims against reality

For paper mode specifically, the sharpest question the skill asks is whether the released code actually reproduces the published claim. The honest answer, according to the skill's own framing, is often "partially", and that partial answer is treated as more interesting than either a clean "yes, open science" or a flat "no, it's a sham." The skill also keeps reusable probes: what URLs get contacted, what files get read outside the working directory, and what the default value of every safety or privacy feature actually is, since a feature that exists on paper can tell a very different story once you check whether it's actually turned on.

## The honesty rule and its cost

The skill enforces a generation honesty law: never generate an image that poses as evidence of a fact. That's described as a hard ceiling that rules out a lot of what makes video content visually engaging, but the skill accepts that trade because credibility is treated as the whole product. The register is also deliberately calibrated as "another perspective, not a correction", never framed as the subject being wrong or behind, stated independently and without hedging.

The skill does have a real dependency: it leans on two sibling engines, git-explainer and AI-paper, that aren't bundled inside the toolkit itself. Point the router at a repo or paper target without those installed, and it has nowhere to dispatch. The fix given is to install the missing skills, not to fake the analysis.

## Key takeaways

- The anthropics skill is a single 142-line file that routes to four modes: repo, paper, content, and capability.
- Capability mode, which runs a tool live and compares it to a competitor, is called out as the mode no vendor channel could ship.
- Every episode requires at least one beat that can only be verified by running the actual artifact; if that beat doesn't exist, the skill reports the gap instead of building around it.
- For papers, the key question is whether released code actually reproduces the published claim, and "partially" is treated as a legitimate, interesting answer.
- The skill depends on two sibling engines (git-explainer, AI-paper) it doesn't include, and refuses to fake results when they're missing.

## Who this is for

People building or evaluating Claude skills for content or research workflows, and anyone who wants a concrete example of how to structure an AI-auditing tool that checks claims against running code instead of documentation.
