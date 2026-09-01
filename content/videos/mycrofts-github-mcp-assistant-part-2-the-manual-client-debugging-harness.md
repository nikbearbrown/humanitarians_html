---
title: "Mycroft's GitHub MCP Assistant Part 2: The Manual Client & Debugging Harness"
seoTitle: "GitHub MCP Manual Client: Build It First"
description: "Rishika builds a numbered-menu manual client for a six-tool GitHub MCP assistant, showing why a human-driven driver belongs before any AI agent."
summary: "Before wiring an AI agent to GitHub MCP tools, Rishika builds a simple numbered-menu client so a human can run and inspect each tool directly first."
keywords: ["github mcp manual client", "model context protocol debugging harness", "mcp toolbox numbered menu", "build mcp client before ai agent", "github mcp assistant tutorial", "mcp readonly tools testing", "mycroft financial ai fellows", "debugging mcp tool requests", "mcp server human driven client"]
generated: "article"
---

When you build a set of tools that an AI agent will eventually use, there is a real temptation to wire the AI in immediately and see what happens. Rishika's second video in her three-part GitHub MCP assistant series takes the opposite approach on purpose: before any AI touches the toolbox, a human runs it directly.

## From toolbox to driver

In part one, Rishika built six read-only tools for a GitHub MCP assistant, what she calls "the toolbox." Tools that exist but have no way to be invoked are not actually useful yet, so this video adds the first driver: a manual client. It is, deliberately, the simplest possible way to use the toolbox. A numbered menu lists the six abilities, a human reads them, types a number to pick one, and supplies whatever that tool needs, whether that is a repository name, a file path, or a keyword.

## How the loop works

The mechanics are intentionally plain. The menu prints, the human picks a tool, the client asks for whatever arguments that tool requires, and those arguments pass straight through to the tool call. The client then prints the raw output exactly as the tool returned it, with nothing polished or interpreted, before looping back to the menu. That rawness is the point. Seeing the unprocessed request and response makes it possible to understand exactly what each tool expects and exactly what it hands back, before an AI layer sits between the human and that exchange and potentially obscures it.

## Why build this before anything smarter

It would be faster, in one sense, to skip straight to an AI agent that can call these tools on its own. Rishika's argument for building the manual client first is that it forces a clear look at each tool's actual contract, its inputs and its outputs, in a way that is much harder to verify once a language model is deciding when and how to call things. And the manual client does not become disposable once an AI agent exists in part three. It becomes the debugging harness the project keeps reusing anytime a single tool needs to be checked directly, independent of whatever the AI layer is doing.

## The honest limits

The video is candid about where a numbered-menu client falls short. It only works if the person using it already knows exactly which tool they need and exactly what to type. Ask it something in plain English, like what a given repository actually does, and it has no way to interpret that. It cannot combine multiple tools together, and it cannot read between the lines of what someone is actually asking. That gap between rigid, tool-by-tool access and genuine natural-language understanding is exactly the space an AI agent is built to fill, which is where part three picks up.

## Key takeaways

- The manual client is a numbered menu over the six read-only GitHub MCP tools built in part one, with no AI involved yet.
- Arguments pass straight through to each tool, and the raw, unprocessed output is shown, which makes each tool's actual request and response contract clear.
- Building the manual client first forces an understanding of what each tool needs and returns before an AI agent obscures that exchange.
- The manual client does not retire once an AI agent exists; it becomes a lasting debugging harness for checking individual tools directly.
- Its core limitation is rigidity: it only works when the user already knows exactly which tool to call and what arguments to supply, and it cannot interpret a plain-English question.

## Who this is for

This is for developers building Model Context Protocol tools or assistants who want a concrete example of testing infrastructure that comes before AI integration, and for anyone following the Mycroft Financial AI Fellows series on building agentic tools step by step.
