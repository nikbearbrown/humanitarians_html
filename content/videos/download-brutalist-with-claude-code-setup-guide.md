---
title: "Download Brutalist with Claude Code | Setup Guide"
seoTitle: "Download Brutalist with Claude Code"
description: "Liam shows the real setup for Brutalist: a git clone, a free doctor script, and a readiness table, run entirely from inside Claude Code."
summary: "Liam demonstrates cloning the Brutalist toolkit from GitHub inside Claude Code, running its free setup doctor, and reading the readiness table before trying any feature."
keywords: ["how to install brutalist with claude code", "how to clone a github repo in claude code", "how to run the brutalist setup doctor", "brutalist art toolkit setup guide", "claude code subscription vs anthropic api key", "kokoro voice model download size", "brutalist setup doctor readiness table", "brutalist setup not working"]
generated: "article"
---

Liam, standing in for Bear, walks through what actually happens when you download Brutalist, the free video-production toolkit, using Claude Code. The point of the video is to correct a common assumption: there is no installer, no DMG, no license click-through. Brutalist is a git clone plus a free setup doctor script, and the whole toolkit ends up as plain files in a folder you already control.

## What the clone actually puts on disk

Pasting the setup prompt into Claude Code clones the public toolkit repository from `github.com/nikbearbrown/brutalist.art` into an empty folder, runs the free installer, and reports back which features are ready. Nothing happens outside the composer. The clone drops a `setup` shell script, an `art` shell script, a `skills` folder containing the builder recipes, a `runtime` folder with the Kokoro voice engine, the Remotion project, and the Python scripts that do the work, plus a `docs` folder and a README. There is no hidden state and no global install: everything the toolkit needs lives inside that one folder.

## Running the doctor

Once the folder exists, running `/setup --install` once pulls the free dependencies. Running plain `/setup` after that, as many times as needed, prints a readiness table. Green rows mean a feature is live; red rows mean a dependency is missing, and the doctor names the exact install command to fix it. Liam notes that this is the same script the sandbox in the video itself just ran, so the readiness table on screen reflects a real run, not a mockup.

## Claude Code subscription versus an Anthropic API key

A point fellows commonly get wrong is treating the Claude Code subscription and a paid Anthropic API key as the same thing. They are separate lanes. The Claude Code subscription is what lets the agent think and write inside the editor. A paid API key is optional and metered, and it is only needed if you are scripting Claude outside the desktop app. Brutalist itself, run through Claude Code, does not spend anything.

## What actually costs money, and what doesn't

Kokoro, the local voice model, runs on your machine. Remotion renders on your machine. Manim runs on your machine. All three are free by default, which is the intended shape of the tool. The one network request the setup makes is downloading the Kokoro voice model itself, about 340 megabytes, straight from a GitHub release, the first time you run `/setup --install`. Setup does not sign you into any account, does not create accounts, does not touch any file outside the folder you cloned into, and does not upload anything.

## The three-line verdict

Liam summarizes the whole process in three steps: clone the repository and you have the toolkit, run the doctor and you know exactly what is ready, and stay in the free lane and the pipeline never asks for a card. The video frames this as the boundary between installation, which Claude Code and the doctor script handle for you, and creative judgment, which stays with the fellow using the toolkit.

## Key takeaways

- Brutalist installs as a git clone plus a free setup doctor script, not a traditional installer.
- Run `/setup --install` once, then plain `/setup` to view the green-or-red readiness table.
- The Claude Code subscription and a paid Anthropic API key are separate, unrelated things; Brutalist needs only the former.
- The only network download is the roughly 340 MB Kokoro voice model, fetched once from a GitHub release.
- Setup never creates accounts, uploads files, or touches anything outside the cloned folder.

## Who this is for

This video is for Humanitarians AI fellows who have Claude Code but have not yet set up Brutalist, and who want to know exactly what the setup script does, what it costs, and what it touches before running it.
