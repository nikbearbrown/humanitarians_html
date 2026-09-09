---
title: "Your First Brutalist Project | Build a One-Minute Film"
seoTitle: "Build Your First Brutalist Film Project with Claude Code"
description: "Liam walks through building a one-minute Brutalist film with Claude Code: defining a claim, encoding beats, compiling a review cut, and revising one beat at a time."
summary: "Liam explains how the Brutalist workflow turns a research claim into a one-minute film built from a beat_sheet.json file, where every beat can be regenerated individually without rebuilding the whole reel."
keywords: ["how to build your first brutalist project", "what is beat_sheet.json in claude code", "how to make a one minute film with claude code", "revising one beat without rebuilding a video", "what is a review cut in video pipeline", "claude code video rendering workflow explained", "landscape vs vertical beat sheet video", "how to write a first ask for claude code video"]
generated: "article"
---

Your first Brutalist project is not a demo of a tool. Liam explains that it starts as a claim, a small research question backed by evidence, that Claude Code renders into a one-minute film you can rebuild beat by beat.

## The film is a file, not a black box

The core idea is that everything in the film lives in one file: `beat_sheet.json`. It holds every beat, its narration line, its visual pattern, and its measured audio length. Every downstream step in the pipeline reads from this file. Change a line in it, and you re-render one beat, not the entire reel. That is the whole method; everything else in the workflow is scaffolding around it.

## Writing your first ask

A good first ask to Claude Code is specific: a topic, a length, the beat count, the voice, and an explicit hard stop at the review cut, so nothing gets finalized before you have actually watched it. A bad first ask just says "make me a video" and hopes for the best.

## What Claude Code does before you see a frame

Given a good ask, Claude Code performs seven concrete steps before producing anything to look at: it reads the skill, drafts the beat sheet, generates the audio, renders the scenes, compiles a review cut, writes a checks report, and stops. Every step leaves behind a file you can open and inspect. The result is a review cut, twelve conformed clips with one narration line per beat, rendered at 4,000 pixels wide. That review cut is the file you scrub through and judge, not a finished short and not a published master. It is a local receipt confirming the pipeline finished; the human judgment step comes after.

## Revising one beat at a time

Say beat five drags. The response is not to rebuild the whole film. You say what is wrong and name the specific beat. Claude regenerates only that beat's audio, re-renders only that beat's scene, and re-muxes the result. Everything else stays cached. The diff on disk stays small: one MP3 replaced, one MP4 replaced, one line updated in the beat sheet. This is why audio functions as the clock for the whole piece, and why each beat is treated as its own slot. You change a beat by changing its slot's contents, not by nudging a timeline around.

## Two aspect ratios, two beat sheets

Fellows produce two ratios per video, 16:9 and 9:16. The vertical version is not a crop of the landscape one. It is its own beat sheet, kept in a sibling folder, with portrait-native scenes. A vertical-specific skill plans that sheet, but you still author it yourself rather than letting a crop stand in for a real vertical cut.

## Where files go, and who approves publication

The handoff source goes to GitHub: the beat sheet, prompts, checks, README, and anything under 25 megabytes. Video files themselves go to Drive. A compile finishing successfully is a runtime receipt, not publication approval. Human review is the step that comes last, and it is the step that actually decides whether a film is ready to go out.

## Key takeaways

- The film lives in `beat_sheet.json`, which holds narration, visual pattern, and measured audio length for every beat; downstream tooling reads from this one file.
- A good first ask names a specific topic, length in seconds, beat count, voice, and stops explicitly at the review cut.
- Claude Code performs seven concrete steps, reading the skill, drafting beats, generating audio, rendering scenes, compiling a review cut, writing checks, and stopping, before you see a frame.
- Fixing a bad beat means naming it specifically; only that beat's audio and scene regenerate, everything else stays cached.
- Landscape (16:9) and vertical (9:16) cuts are separate, purpose-built beat sheets, not one cropped into the other, and a finished compile is a receipt, not approval to publish.

## Who this is for

Anyone starting their first video project with the Brutalist Claude Code workflow, or wanting to understand how a beat-sheet-driven pipeline lets you revise a single moment in a film without rebuilding the whole thing.
