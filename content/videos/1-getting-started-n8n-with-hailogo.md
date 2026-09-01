---
title: "1 Getting Started n8n with HAILogo"
seoTitle: "Getting Started with n8n: Install and First Workflow"
description: "A step-by-step walkthrough of installing n8n with npm and building your first test workflow for the Madison framework data pipeline assignment."
summary: "This tutorial installs n8n on Mac and Windows, then builds a simple trigger, edit field, and no-operation workflow to confirm everything works."
keywords: ["n8n install npm mac and windows", "n8n workflow automation tutorial", "npm install -g n8n command", "n8n localhost setup guide", "n8n canvas and node panel basics", "madison framework data pipeline", "n8n trigger manually node", "n8n edit fields node example"]
generated: "article"
---

Before you can build a data pipeline that pulls information from social media, websites, or specialized APIs, you need a tool that can connect those services without forcing you to write custom integration code for each one. This tutorial installs n8n, a workflow automation tool, and walks through building the simplest possible workflow to confirm the installation actually works.

## Why n8n for this project

n8n is a workflow automation tool that connects different services and APIs together visually rather than through custom code. For the Madison framework project, it's the tool used to build assignment 3's data pipeline, the step where students collect information specific to their own project, whether that's brand analysis, market research, or content generation. That collected data becomes the foundation for the Madison agent built in later assignments. The tool fits the course's stated "80/20 approach": it gives you powerful functionality with minimal technical overhead, and it supports the "ship it" philosophy of functional delivery over perfection.

## Installing n8n

The installation process is identical on both Mac and Windows: open a terminal and run `npm install -g n8n`. The install pulls in n8n and its dependencies, which takes a little time to complete. Once it finishes without errors, all the necessary packages are in place.

From there, starting the tool is a separate, equally simple command: `n8n start`. Running this prints a message confirming that n8n is running on your local host, along with a URL. Copying that URL into a browser opens the n8n interface, which is where the actual workflow building happens.

## Touring the interface

Before building anything, it helps to know the basic vocabulary of the n8n interface. The main workspace, where you build a workflow by adding and connecting steps, is called the canvas. Clicking the plus icon on the right side opens the node panel, which lists every available node. You can search this panel for the node you need and drag it directly onto the canvas.

## Building a first test workflow

The demonstration workflow is deliberately minimal, built specifically to confirm the installation works rather than to do anything useful on its own. It starts with a workflow named "test workflow." The first node dragged onto the canvas is "Trigger Manually," which starts the workflow whenever you click "Execute Workflow." The second node is an "Edit Fields" (or "Set Fields") node, used here to insert a simple test message confirming the setup worked. The final node is a "No Operation" node, which passes its input through unchanged and performs no action on its own, useful as a placeholder endpoint in a workflow.

After saving and clicking execute, the workflow runs end to end and displays the test message that was inserted in the Edit Fields step. Watching that data flow through each node on the canvas is the foundation for understanding how every n8n workflow operates, regardless of how complex it eventually gets.

## What comes next

With n8n installed and a working test workflow in hand, the next step in the series is connecting to real APIs to gather the data needed for each student's specific Madison project. For assignment 3 specifically, the goal is collecting data that directly addresses the problem statement defined in assignment 2, with an explicit reminder not to worry about making the pipeline perfect and instead focus on getting something functional running.

## Key takeaways

- Install n8n with a single command, `npm install -g n8n`, identical on Mac and Windows.
- Start the tool with `n8n start`, then open the local host URL it prints to reach the interface.
- The canvas is where you build workflows; the node panel, opened via the plus icon, is where you find and drag in nodes.
- A minimal test workflow only needs three nodes: Trigger Manually, Edit Fields (Set Fields), and No Operation.
- Executing the workflow and watching data flow through each node confirms the installation is working before you move on to real API connections.

## Try it yourself

This tutorial is aimed at students in the Madison framework track building their assignment 3 data pipeline, but the install and first-workflow steps apply to anyone getting started with n8n for the first time. If you hit issues, the video points to the official documentation at n8n.io/docs as the next stop, alongside course office hours.
