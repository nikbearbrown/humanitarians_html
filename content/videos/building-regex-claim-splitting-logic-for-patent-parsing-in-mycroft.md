---
title: "Building Regex Claim-Splitting Logic for Patent Parsing in Mycroft"
seoTitle: "Building Regex Claim-Splitting Logic for Patent Parsing"
description: "Aishwarya from the Mycroft team builds and stress-tests a regex parser that splits patent claims and classifies them as independent or dependent."
summary: "A walkthrough of building a regex-based patent claims parser, testing it on a real semiconductor patent, and hunting down a false positive before trusting the output."
keywords: ["regex patent claims parser", "independent vs dependent patent claims", "patent claim splitting logic", "mycroft financial ai patent agent", "patent dependency chain parsing", "us patent claim classification code", "regex stress test patent data", "patent claims agent bigquery", "parsing patent claims python"]
generated: "article"
---

A patent claims section looks simple until you try to parse it programmatically. Claims are numbered sequentially, and a dependent claim refers back to another claim by number somewhere in its own text, which sounds like a job regular expressions can handle in a few lines. The real question this video answers is not whether that regex runs, but whether it gets every single claim right, on a real patent, under real conditions.

## Splitting claims with regex

The method starts from how claims are actually written: real claims text is numbered in order, and a dependent claim names the claim it relies on directly inside its own sentence. A regex can split the raw text on that numbering and then scan each claim for a reference back to another claim number, using that reference to decide whether the claim is independent or dependent. It is a clean rule on paper, which is exactly why it needs to be tested against messy, real data rather than trusted on its own.

## Independent versus dependent, tested on a real patent

The first test ran against US 11,791,319B2, a real semiconductor patent with 20 claims: three independent and 17 dependent, including dependency chains three levels deep, where one claim depends on a claim that itself depends on another claim. Every one of the 20 claims came back classified correctly, and the result was verified by hand against the raw patent text rather than just trusted because the code ran without errors. That distinction matters: a single clean result on one patent proves the code executes, not that the logic holds up in general.

## Stress testing with more patents

To test the logic beyond one lucky patent, the parser was run against three more real patents, adding 44 more claims to the sample. It held up: every independent claim was identified correctly, and every dependency chain traced correctly across all four patents combined. The stress test did flag two claims as possible multi-dependencies, which sounds like a problem until you check the raw text by hand. In this case it was a false alarm, the flag had triggered on an unrelated claim number appearing later in the same sentence, with no actual dependency relationship behind it. The dependency parsing itself was correct; the false positive detector was simply too eager, catching a claim number where none was intended as a reference.

## Why hand-checking still matters

The lesson that carries the whole video is stated plainly: a parser that runs without crashing is not the same as a parser that is correct. Getting a clean run on 20 claims proves nothing about the next 44. Getting a clean run on 64 claims across four patents is a much stronger signal, but it still surfaced a false positive that only hand-verification against the source text caught. That is the actual workflow being demonstrated here, not writing the regex, but building the discipline of checking flagged edge cases against ground truth before trusting an automated classification at scale.

## Key takeaways

- Patent claims can be split and classified as independent or dependent using regex, based on sequential numbering and self-referencing claim numbers in the text.
- A first test on US 11,791,319B2, a real 20-claim semiconductor patent with chains three levels deep, classified every claim correctly.
- A stress test adding three more patents and 44 more claims held up, with every dependency chain traced correctly.
- The stress test flagged two claims as possible multi-dependencies; checking the raw text by hand showed it was a false positive from an unrelated number in the same sentence, not a parsing error.
- A parser running without errors is not proof of correctness; flagged edge cases still need to be verified against the source text.

## Try it yourself

If you want to test this yourself, take any patent's claims text, run it through the same split-and-classify logic, and check every flagged claim by hand before trusting the output. This kind of hands-on parser work is the daily reality for engineers on the Mycroft Financial AI project, part of the Humanitarians AI Fellows program.
