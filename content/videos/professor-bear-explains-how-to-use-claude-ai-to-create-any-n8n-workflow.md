---
title: "Professor Bear Explains: How to Use Claude AI to Create Any n8n Workflow"
seoTitle: "Use Claude AI to Create n8n Workflows Fast"
description: "Professor Bear shows how to prompt Claude to generate a ready-to-import JSON workflow for n8n, then paste it straight into a new n8n workflow."
summary: "Instead of building an n8n workflow node by node, describe what you want in a prompt to Claude and it will generate the JSON you can paste directly into n8n."
keywords: ["claude ai generate n8n workflow", "n8n json workflow import", "prompt claude for automation workflow", "how to create n8n workflow fast", "claude ai json workflow example", "n8n workflow starter template", "no code automation with claude ai", "chatgpt vs claude n8n workflow"]
generated: "article"
---

Building an n8n workflow from scratch usually means dragging nodes onto a canvas one at a time and wiring them together by hand. Professor Bear shows a faster starting point: ask Claude to write the workflow for you as JSON, then paste that JSON straight into a new n8n workflow to get a working structure in minutes instead of starting from a blank canvas.

## The prompt is the whole trick

The approach is deliberately simple. You write a short prompt describing what you want the workflow to do, something like "create an n8n workflow that does this or that," and Claude generates a complete JSON version of that workflow. Because n8n workflows are, under the hood, essentially JSON documents describing nodes and their connections, asking an AI model to produce that JSON directly skips a lot of manual node-by-node setup. The video keeps the example deliberately minimal to show how little effort the first step actually takes.

## From JSON to a working canvas

Once Claude has generated the workflow, the next step is copying that JSON, going into n8n, choosing to create a new workflow, and pasting it in. After pasting, n8n turns the raw JSON into the same kind of visual, node-based canvas you'd get by building it manually, complete with a start node and the rest of the structure Claude described. That readable canvas is the payoff: most people can't easily parse raw JSON, but n8n renders it into something you can inspect and edit visually.

## What this gets you, and what it doesn't

Professor Bear is direct about the limits here. This method gives you a hint of where to get started, not a finished, production-ready automation. Getting a workflow from "pasted in and readable" to "actually running" still takes real work: you generally need to go get API keys for whichever services the workflow touches, run the workflow, and iterate on it repeatedly. The prompt-to-JSON trick answers the "how do I even start" question, and the iteration that follows is where most of the actual engineering happens. That iterative loop, described here as something you'll do again and again with AI tools, is treated as a normal and expected part of the process rather than a sign something went wrong.

## A general pattern, not a Claude-only trick

The same approach works with other language models too. Whether you're using Claude or another model like ChatGPT, the pattern is the same: describe the workflow you want in a sentence or two, let the model produce the JSON, and paste that JSON into n8n to get a starting structure you can refine.

## Key takeaways

- Prompting Claude with a plain description of the desired automation produces a JSON version of an n8n workflow you can paste directly into n8n.
- n8n renders that pasted JSON into a normal visual workflow canvas with nodes and connections already in place.
- This method is a starting point, not a finished workflow; you still need API keys and iteration to get it actually running.
- The same prompt-to-JSON approach works with other language models, not just Claude.
- Building useful AI-assisted workflows is an iterative process, not a one-shot generation.

## Try it yourself

If you're new to n8n or just want to skip the blank-canvas problem, try describing a workflow you'd like to build in a sentence to Claude and paste the resulting JSON into a new n8n workflow. This kind of hands-on automation experimentation is part of what Humanitarians AI Fellows work through as they build tools for the organization's projects.
