---
title: "AI Live Assistance  Google Sheets & Coding w/ Gemini  Hidden AI Tool Demo | Humanitarians AI Fellows"
seoTitle: "Gemini Live Screen Share for Sheets & Coding"
description: "A Humanitarians AI Fellow demos Gemini Live's screen-sharing feature in Google AI Studio, using it for real-time Google Sheets formatting and VS Code debugging."
summary: "A Humanitarians AI Fellow demos Gemini Live's free screen-sharing feature, using it to walk through Google Sheets conditional formatting and live VS Code debugging."
keywords: ["gemini live screen sharing demo", "google ai studio live feature", "gemini conditional formatting google sheets", "gemini live code debugging vs code", "google sheets color gradient gemini", "ai screen share assistant free", "gemini live scikit-learn import error", "humanitarians ai fellows tutorial"]
generated: "article"
---

Most AI chat tools still expect you to describe your screen in words. Gemini Live, inside Google AI Studio, skips that step entirely: you share your actual screen, and the model responds to what it can see in real time. This demo, built by a Humanitarians AI student fellow, tests that capability on two very different everyday tasks, spreadsheet formatting and live code debugging, to see how well it actually holds up.

## Getting started with Gemini Live

Accessing the feature requires nothing more than a Google account. From Google AI Studio, selecting "stream real time" and choosing a video source lets you start screen sharing directly with Gemini. The video notes upfront that this is still an experimental feature, which sets expectations for the rest of the demo: this is a preview of where the tool is headed, not a fully polished product.

## Automating conditional formatting in Google Sheets

The first task shared is a spreadsheet with an "end date" column, and the goal is to automatically highlight any dates that have already passed relative to a specific reference date, without manually checking every row. Gemini confirms it can see the shared screen, correctly identifies the Google Sheet, and restates the request back before offering help, a small but important step that confirms it actually understood what was being asked rather than just pattern-matching keywords.

Gemini walks through the fix step by step: select the entire end date column, open Format, choose Conditional Formatting, and under "format cells if," a rule can be built either with a custom formula comparing dates or with the simpler built-in "date is before" option. When asked directly whether to use the custom formula or the simpler built-in rule, Gemini explains the trade-off, custom formulas offer more flexibility and control, but the simpler option was chosen here, and Gemini adjusts its guidance accordingly rather than insisting on one approach.

## Adding a color gradient

Building on the same spreadsheet, a second request asks for a green gradient across a "duration days" column, with darker green for higher numbers and lighter green for lower ones. Gemini again restates the request to confirm understanding before walking through the steps: select the column, add another conditional formatting rule, and choose a green color scale from the built-in gradient options. The gradient applies automatically once the color scale is selected, with no manual color-by-color adjustment needed.

## Switching to code debugging

The second half of the demo moves to a completely different kind of task: debugging a Python script for what's described as an AI research project success predictor. After deliberately introducing an error, removing an import and messing with a variable, the same live screen-share session is used to ask Gemini for help, testing whether its usefulness carries over from spreadsheet work into actual code.

Gemini correctly identifies the visible error, missing import for LinearRegression from scikit-learn, and walks through adding the correct import line: `from sklearn.linear_model import LinearRegression`. When a typing mistake produces a still-underlined error, Gemini catches that Python is case-sensitive and that the class name needs to match exactly, correctly diagnosing that "linear regression" had been typed instead of "LinearRegression." It also flags a missing set of parentheses needed to actually instantiate the class rather than just reference it.

## Catching a second bug on request

Asked to check the rest of the code for additional issues before running it, Gemini finds a second, separate problem: a mismatched variable name, where the code attempts to print a test-set accuracy value under one variable name while it had actually been calculated and stored under a different one earlier in the script. That catch is notable because it required tracing a variable's name across two different lines of code, not just recognizing a familiar error pattern.

## A sanity check on test size

One more exchange stands out. When the script sets `test_size = 2`, Gemini doesn't just accept the value; it explains that test_size is typically a decimal between 0 and 1 representing a proportion of the dataset, or alternatively an integer representing an exact count of data points, and it asks directly whether a test set of only two data points was really intended. That prompts a correction: the actual intent was a 20% test split, so the value gets changed to 0.2. That kind of clarifying question, catching a plausible-looking but likely-wrong value rather than just executing the request literally, is a meaningfully different behavior than a purely reactive coding assistant.

## Where the tool still falls short

The fellow presenting the demo is candid about its limits: despite these successful catches, Gemini Live is not described as very good at debugging code overall in its current, experimental state, though the expectation is that it will improve. The framing throughout is optimistic but grounded, treating this as an early look at a capability worth watching rather than a finished, reliable debugging partner.

## Key takeaways

- Gemini Live, accessed through Google AI Studio, lets you share your screen and get real-time AI assistance without installing extra software.
- It successfully walked through Google Sheets conditional formatting, including a date-based highlight rule and a color gradient scale.
- In a live coding session, it correctly diagnosed a missing scikit-learn import, a case-sensitive naming error, and a separate mismatched variable name bug.
- It asked a clarifying question about an unusual `test_size = 2` value rather than silently accepting it, catching a likely mistake before code was rerun.
- The feature is still experimental and, per the fellow's own assessment, not yet strong at debugging overall, though expected to improve.
- Access requires only a Google account and is free to use through Google AI Studio.

## Who this is for

This demo is built for anyone curious about hands-on, real-time AI assistance for everyday spreadsheet and coding tasks, and it's a good starting point for beginners who want a guided, conversational alternative to searching documentation. It comes from the Humanitarians AI Fellows Program, which pairs a learn-by-doing approach with a learn-by-teaching one, letting student fellows deepen their own understanding of AI tools by demonstrating them for others.
