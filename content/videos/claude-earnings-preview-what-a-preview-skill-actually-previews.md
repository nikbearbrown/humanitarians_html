---
title: "Claude, Earnings Preview, What a Preview Skill Actually Previews"
seoTitle: "Claude earnings-preview skill: what it builds"
description: "Explains what Claude's earnings-preview skill actually builds: estimate models and bull-bear scenarios, not a forecast of the earnings number."
summary: "Breaks down how Claude's earnings-preview skill builds pre-earnings estimate models and scenarios instead of predicting the actual earnings number."
keywords: ["can claude predict a company's earnings", "how does claude earnings preview skill work", "claude skill for pre earnings analysis", "bull bear scenarios before earnings with claude", "claude skill.md steps section explained", "estimate models before an earnings report", "claude skill does not forecast earnings number", "what metrics move a stock before earnings"]
generated: "article"
---

Can Claude predict what a company's earnings will actually be? No, but it can help you preview them. Anthropic's earnings-preview skill builds pre-earnings analysis, estimate models, bull-and-bear scenarios, and a short list of metrics likely to move the stock, but it stops well short of forecasting the reported number itself.

## A skill is a folder, not a forecasting engine

A Claude Skill is a folder Claude reads before it acts. Earnings-preview is one such folder, with a SKILL.md holding plain-language instructions and no hidden code. Claude reads the file, then acts on what it says. This matters here specifically because it rules out the assumption that some proprietary forecasting model is running underneath; the skill's entire behavior is described in that one file.

## How the process runs

The instructions live in a defined steps section, and Claude reads each step in order, then executes it. The process is linear: no branching unless a specific step calls for it. That means the same sequence, build estimate models, construct scenarios, identify key metrics, runs every time the skill is invoked, regardless of which company or quarter is involved.

## What the skill's brief actually covers

The stated job is building pre-earnings analysis: estimate models, bull-and-bear scenarios, and the handful of metrics likely to move the stock on report day. That's the whole brief. Forecasting the actual number the company will report is outside what the file does, deliberately. The skill prepares you for the range of plausible outcomes and what to watch for, rather than picking a single predicted figure.

## Why that distinction matters

Being ready for earnings day and knowing what earnings day will bring are different things. A skill can reliably produce the same estimate models and scenario structures every time it runs, which is genuinely useful for consistent preparation across companies or quarters. But it still won't tell you what the report will actually say, because that number depends on real-world outcomes the skill has no access to and isn't designed to predict.

## Trying it yourself

A direct way to see this in action is to ask Claude to build pre-earnings analysis, estimate models, scenario frameworks, and key metrics to watch, and to first read the earnings-preview skill and walk through what it will do before doing it. That clause matters: asking Claude to explain its plan before running it surfaces the real constraints the file sets, rather than letting the output speak for itself without context.

## Key takeaways

- Claude's earnings-preview skill builds estimate models, bull-and-bear scenarios, and key metrics to watch before an earnings report.
- It does not forecast the actual number a company will report; that's explicitly outside the skill's brief.
- The skill's steps execute in a fixed, linear order from one plain-language SKILL.md file.
- The same estimate models and scenario structure come out every time the skill runs, which is the actual value it provides.
- Asking Claude to state its plan before running a skill is a direct way to see the file's real constraints.

## Who this is for

Analysts and investors who want a consistent, repeatable way to prepare for a company's earnings report, and anyone who wants a clear-eyed understanding of what a Claude Skill can and can't do around forecasting.
