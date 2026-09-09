---
title: "The cli-explainer Skill | Claude Code on Screen"
seoTitle: "The cli-explainer Skill: How It Builds CLI Videos"
description: "Liam breaks down the cli-explainer skill file, its nine-step spine, and why it commissions a reel instead of recording a terminal."
summary: "Liam, in for Bear, tears down the cli-explainer skill file to show how a single markdown document, not a recording, directs Claude to write and structure a CLI explainer video."
keywords: ["how does the cli-explainer skill work", "claude code skill file explained", "cli-explainer nine step spine", "what is a claude code skill folder", "claude composer ask beat structure", "how to swap claude for codex in a skill", "brutalist reel revision cycle rule", "read skill file before drafting narration"]
generated: "article"
---

Liam, in for Bear, opens the cli-explainer skill file to show what actually happens when someone types "CLI" at the Claude composer. The point of the video is a single distinction: cli-explainer does not record a terminal session, it commissions a reel. Claude reads the skill file and writes the video from it.

## What a skill folder actually contains

A skill in this toolkit is just a folder. For cli-explainer, that means two files: `skills/make/cli-explainer/SKILL.md`, roughly 365 lines of plain markdown, and a reference directory holding one example beat sheet. There's no compiled binary and no background service. Claude reads the file, and the file is what writes the reel. The file isn't a loose suggestion either, it fixes the shape of every CLI reel to a nine-step spine: cold open, problem, ask, code, output, revision, code again, better output, summary, handoff, outro. Every reel follows the same sequence.

## The trigger and the revision law

The entry point is a verbatim trigger from the skill file's own trigger table: "CLI" followed by the concept, no model version, no temperature setting. That trigger tells Claude which skill to load; the skin defaults to Claude and the persona defaults to Liam. The skill also names its own mandatory beats for the 16x9 cut: the problem beat, at least one revision cycle, and a summary with next steps before the outro. A CLI video without a check-in-change moment is treated as incomplete, a rule written directly into the skill file rather than left to a reviewer's judgment. The one exception is the shorts cut, which ships a single revision cycle to fit its three-minute cap and points viewers to the 16x9 video for the full example.

## Swapping the interface skin

The skill separates the interface skin, Claude or Codex, GitHub, shell, from the narrative spine underneath it. Choosing "CLI Codex" instead of "CLI Claude" renders the same spine through the Codex composer instead of Claude's; the body logic and bookends don't change. The swap is described in the file as a one-to-one rename: "Claude composer ask" becomes "Codex composer ask," "Claude code beat" becomes "Codex code beat," and so on. Props like the greeting, the command, and the title carry over unchanged. It's a substitution, not a reauthoring, which is why the same lesson can teach through a different tool without the underlying beat sheet being rewritten.

## The verdict

Liam's summary is direct: cli-explainer is instructions, not software. It reads like an editorial style guide because that's what it is, and it doesn't record anyone's terminal, it commissions a real explanation of what was actually asked of Claude and what came back. The closing argument is that reading the skill file beats watching a tutorial about it.

## Key takeaways

- cli-explainer is a markdown skill file that directs Claude to write and structure a video, not a terminal recording tool.
- Every CLI reel follows the same nine-step spine: cold open, problem, ask, code, output, revision, code again, better output, summary, handoff, outro.
- The 16x9 cut must include at least one revision cycle; the shorts cut is the sole exception, with a single cycle.
- Swapping tools, Claude to Codex, is a one-to-one rename of the interface skin, not a rewrite of the narrative spine.
- The trigger phrase is verbatim from the skill's own trigger table: "CLI" plus the concept, nothing else.

## Who this is for

This is for anyone using Claude Code who wants to understand how the cli-explainer skill turns a real coding session into a structured explainer video, and for skill authors curious how a single markdown file can lock a video's structure without any custom software.
