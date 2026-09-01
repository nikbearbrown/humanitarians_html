---
title: "Mycroft Ep. 2: One Run, Two Customers (Human-Readable vs. Machine JSON)"
seoTitle: "Mycroft Ep. 2: Human-Readable vs. Machine JSON Output"
description: "Amruta Naik restructures a Mycroft runway risk brief into three clean stages so one run produces both a human report and machine-readable JSON."
summary: "Week two of Mycroft shows why a tool that only prints for humans is a dead end, and how splitting code into ingest, validate, and score stages lets one run serve two very different readers."
keywords: ["human readable vs machine json output", "mycroft runway risk brief", "splitting code into ingest validate score", "structured json alongside human report", "shape validation malformed data", "recipe status draft to specified", "one run two customers software design", "humanitarians ai fellows mycroft"]
generated: "article"
---

A script that only prints a nice report for a person to read has a hidden limitation: no other program can use it. That's the problem week two of Mycroft sets out to fix. Amruta Naik had a working runway risk brief from week one, formatted and readable, but useless to anything downstream that might want to sort companies, feed a dashboard, or chain the output into another tool. This update walks through the redesign that gives the same run two different outputs for two different readers.

## The problem with a human-only tool

A formatted brief with dollar signs and headers is easy for a person to read and painful for a machine to parse. If the only reader a tool serves is a human, that tool is a dead end for automation. The fix isn't to throw away the human-readable brief, it's to stop treating it as the only possible output of the run.

## Splitting the logic into three stages

The request to the build agent was specific: stop being one big script and split the logic into three named steps. First, ingest the signals. Second, validate their shape and drop anything that doesn't pass. Third, score what's left. On top of that restructuring, the human brief stays exactly as it was, but the same result now also gets emitted as structured JSON, same numbers, two different shapes.

## How shape validation filters the data

The middle stage, shape validation, walks every incoming signal and sorts it into one of three buckets: usable, malformed, or unvalidated. The key rule is that a signal with no human signoff simply doesn't get used, and it doesn't get a warning label either. It's dropped, and only its count survives in the record. That's a deliberate choice: structure decides what counts, not judgment calls made on the fly.

## One run, two outputs

The payoff is a single run producing two aligned outputs. On one side is the human brief people already know: five metrics, each with its source clearly labeled. On the other side is the machine-readable JSON, the exact same numbers, but now every value is a field a program can read directly rather than a formatted string. Total raised becomes an actual number instead of a dollar-sign string a parser would have to clean up first. One run, two customers, served at the same time.

## Earning the "specified" label

The recipe behind this tool carries a status label, and it started as "draft," just an idea. Now that it runs in clean, separated steps and produces both outputs reliably, the status moved up to "specified," but only because a logged run actually proves it works that way. The rule being held here is that the label goes up when the evidence exists, never because the work feels done.

## Key takeaways

- A tool that only outputs a human-readable report can't be used by other programs, which makes it a dead end for automation.
- Splitting a script into ingest, validate, and score stages makes it possible to produce multiple output formats from the same run.
- Shape validation should sort signals into usable, malformed, or unvalidated buckets, and drop what fails without hiding the fact that it was dropped.
- The same numbers can be emitted as both a formatted human brief and structured JSON without duplicating the underlying logic.
- A maturity label like "specified" should only move up when a logged run provides evidence, not based on confidence alone.

## Try it yourself

Take any script you've written that prints a nice report and ask it one question: could another program use this output? If the answer is no, add a structured version alongside the pretty one, same data, machine readable. That one change turns a dead end into a reusable building block, which is exactly the exercise this Humanitarians AI Fellows project walks through in practice.
