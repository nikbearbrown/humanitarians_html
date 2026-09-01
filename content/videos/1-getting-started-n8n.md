---
title: "1 - Getting Started n8n"
seoTitle: "Getting Started with n8n: Madison Framework Tutorial"
description: "A step-by-step walkthrough of installing n8n, starting a local instance, and building your first test workflow for a Madison data pipeline."
summary: "This tutorial installs n8n from the terminal, starts a local instance, and builds a first test workflow using a manual trigger, a set-fields node, and a No-Op node."
keywords: ["n8n install npm mac windows", "n8n start local instance", "n8n workflow automation tutorial", "n8n manual trigger tutorial", "n8n no-op node explained", "madison framework data pipeline", "n8n test workflow beginner", "n8n canvas node panel basics", "ship it philosophy assignment"]
generated: "article"
---

Every data pipeline has to start somewhere, and for the Madison framework tutorial series, that somewhere is n8n: a free, code-light way to connect services and APIs together on a visual canvas. This first video in the series, hosted by Kiti, gets n8n installed and running a first, deliberately simple workflow before anything more complicated gets built on top of it.

## Why n8n for a Madison data pipeline

n8n is introduced as a workflow automation tool that lets you connect different services and APIs without writing complex code. For a Madison project, that's the tool used to build a data pipeline collecting information from sources like social media, websites, or specialized APIs, whatever the project actually needs, whether that's brand analysis, market research, or content generation. It fits directly into what the series calls its 80/20 approach: powerful functionality without heavy technical overhead. That data pipeline becomes the foundation the Madison agent is built on in later stages of the project.

## The "ship it" philosophy

Before any installation happens, the tutorial sets expectations with a specific mantra: ship it, functional delivery over perfection. That's not a throwaway line, it frames the whole first assignment. The goal for this stage isn't a polished, production-grade pipeline, it's a working one that collects data relevant to the specific problem the project is solving. Perfection is explicitly deprioritized in favor of getting something functional running end to end.

## Installing n8n

The install process is the same single command on both Mac and Windows: `npm install -g n8n`, run from the terminal. The tutorial walks through running that command, waiting for the install and its dependencies to finish, and confirming there were no errors and that all the packages were added successfully.

## Starting the local instance

Once installed, n8n is started with the command `n8n start`. That produces a confirmation message that n8n is running on localhost, along with the URL to open. Navigating to that link brings up the n8n interface for the first time.

## Building a first test workflow

With the interface open, the tutorial creates a new workflow named "test workflow" and walks through the basic terminology before building anything. The canvas is the working area where the workflow gets assembled. The node panel, opened from the plus icon on the right side, lists every available node, which can be searched and dragged onto the canvas.

The first test workflow uses three nodes in sequence. A manual trigger node starts things off, running the rest of the workflow whenever the "execute workflow" button is clicked. An edit, or set, fields node comes next, used here to print a simple test message, something like "n8n is working" or "it's set up." The last node is a No-Op, short for no operation, which does nothing to the data passing through it: its output is identical to its input. After saving the workflow and clicking execute, the test message appears exactly as entered in the set fields node, confirming that data is actually flowing correctly from node to node.

## Why start this simple

The point of this first workflow isn't the message itself, it's confirming the mechanics: that a trigger can kick off a run, that a node can transform or set data, and that the data flowing through each node can be verified. That's described as the foundation every more complex n8n workflow builds on. Once you can trust that data is moving correctly through a simple three-node chain, adding real API connections in the next stage becomes a matter of extending a pattern you already understand rather than learning it from scratch.

## What comes next

This video closes by pointing directly at the next step: connecting to real APIs to gather data for the specific Madison project each student is working on. The reminder is that assignment three requires collecting data that directly addresses the problem statement defined in assignment two, not just any data that happens to be convenient to pull.

## Key takeaways

- n8n lets you connect services and APIs visually, without writing complex code, and installs identically on Mac and Windows with `npm install -g n8n`.
- The "ship it" philosophy prioritizes a working pipeline over a perfect one for this stage of the project.
- `n8n start` launches a local instance accessible through a localhost URL in your browser.
- A minimal test workflow, manual trigger, set fields, and a No-Op node, is enough to confirm that data is flowing correctly through the canvas.
- This test workflow is the foundation for the real API connections built in the next video in the series.

## Try it yourself

If you're following along with a Madison project, install n8n, get your local instance running, and rebuild this exact three-node test workflow before moving on. Getting comfortable with the canvas and node panel here will make the next video's step into real API connections much easier to follow, and the official documentation at n8n.io/docs or office hours are both there if you hit an issue along the way.
