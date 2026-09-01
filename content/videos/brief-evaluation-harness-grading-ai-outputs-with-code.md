---
title: "Brief Evaluation Harness: Grading AI Outputs with Code"
seoTitle: "Grading AI Outputs with an Evaluation Harness"
description: "How an automated evaluation harness catches AI briefs that state confident facts from missing data, replacing manual review with checks that run in code."
summary: "An empty placeholder file becomes a working evaluation harness that grades every AI-generated brief against real company data, catching a database-outage bug on its first run."
keywords: ["ai evaluation harness in code", "grading ai generated briefs", "automated ai output validation", "catching ai hallucinations with code", "financial score validation ai", "ai brief fact checking automation", "hard failures vs warnings ai testing", "database outage bug ai brief", "humanitarians ai fellows evaluation", "automated checks for ai content"]
generated: "article"
---

Reading AI-generated briefs by hand only catches errors the reader happens to notice, and only in the one brief they're looking at. Muskan from Humanitarians AI ran into this directly: the file meant to check her briefs was an empty placeholder, so the only way to catch a wrong statement was to read it line by line, which is exactly how she found a factual error earlier in the week. This week she filled that placeholder in, and code now grades every brief before anyone reads it.

## Comparing briefs against real data, not vibes

The idea behind the harness is simple to state and hard to skip once you've seen it work: every brief gets compared against the actual data collected for that company, not against a reader's general sense of whether it sounds plausible. Six checks run against that data. They confirm required sections are present, flag generic filler, and require empty sections to say "unknown" rather than bluff with confident-sounding text. Dates and dollar amounts have to trace back to a real signal in the source data, and the sharpest check verifies that the financial score in the brief exactly matches a rule-based calculator, so the AI can't quietly substitute its own number.

## Hard failures versus warnings

Not every mismatch means the same thing, so the harness separates checks into two tiers. Hard failures mark a real defect, meaning the brief is simply wrong and needs to be fixed. Warnings are meant for a human glance rather than an automatic rejection, because some mismatches are legitimate: the AI might correctly total a number that doesn't appear word-for-word in any single headline in the source data. That's arithmetic, not a lie, so it gets flagged for review instead of failed outright.

## What the first run caught

The harness proved its worth immediately. On its very first run, it flagged a case where the competitor database was unreachable, and the brief still wrote confident, detailed text about competitors that had no basis in real data. A human reader might easily read past that kind of confident prose without questioning it. The harness didn't, because it wasn't evaluating tone or fluency, it was checking every claim against the source.

## Key takeaways

- An evaluation harness compares AI-generated output against real source data automatically, rather than relying on a human skim.
- Six checks cover section presence, filler detection, "unknown" labeling for missing data, factual tracing, and financial score verification.
- Hard failures mean the brief is wrong; warnings flag things worth a human glance, like arithmetic that doesn't map to a single headline.
- The harness caught a real bug on its first run: confident text about competitors generated when the underlying database was unreachable.
- A single automated check that runs on every output beats a human carefully reading one output once.

## Try it yourself

Take one thing your own AI writes and put a check on it in code: a number, a date, or a score that must trace to real data, and fail the output when it can't. This is the kind of hands-on work coming out of the Humanitarians AI Fellows program.
