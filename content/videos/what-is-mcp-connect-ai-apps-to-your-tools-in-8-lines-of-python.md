---
title: "What is MCP? Connect AI Apps to Your Tools in 8 Lines of Python!"
seoTitle: "What is MCP? Build a FastMCP Server in Python"
description: "A walkthrough of the Model Context Protocol, building a working FastMCP server in eight lines of Python and showing exactly what schema a model reads to call it."
summary: "MCP is a standard way for AI apps to discover and call outside tools, and building a minimal FastMCP server in eight lines of Python shows exactly what a model sees when deciding whether to use it."
keywords: ["what is model context protocol", "fastmcp server python tutorial", "mcp 8 lines of python", "ai tool schema docstring", "mcp resource vs tool difference", "connect ai assistant to your data", "mcp security standardized access", "python mcp server example", "claude mcp tool description schema", "humanitarians ai fellows mcp"]
generated: "article"
---

Every AI assistant has a blind spot: your files, your database, the tools your team actually uses every day sit just outside its reach. The Model Context Protocol, or MCP, exists to fix that blind spot without requiring custom glue code for every combination of app and tool. Simba from Humanitarians AI walks through building a working MCP server in about eight lines of Python, using the official FastMCP SDK, to show exactly how the protocol works underneath the abstraction.

## The integration problem MCP solves

Before MCP, connecting AI apps to tools meant writing point-to-point integrations. With four AI apps and four tools you wanted them to reach, somebody had to write sixteen separate integrations, every app wired by hand to every tool. Change one tool's API and you have to fix it in four different places. That multiplication is the concrete reason an assistant "still can't read your files" even when the capability seems like it should be simple to add. MCP turns that many-to-many wiring problem into a shared standard: sixteen integrations become eight, since each app and each tool only needs to speak the protocol once rather than negotiate directly with every counterpart.

## Building the smallest possible server

The build deliberately starts as small as possible: one tool, using the official SDK rather than a framework or wrapper. That choice is intentional. When you're learning a protocol, you want the least code that still speaks it, because every extra layer of abstraction hides the exact part you're trying to see. FastMCP handles the protocol itself; the developer just writes an ordinary Python function and adds a decorator. That decorator isn't merely registering the function; it's publishing a description and a schema that a model reads to decide whether to call this tool at all.

## What the model actually sees

Running the server reveals what a model like Claude actually receives, and it isn't the underlying Python code. It's a name, a description, and an input schema, and that's the entire interface the model has to work with. In its simplest form, a bare tool with no parameters and a thin description like "get expenses" gives the model exactly one available move: call it, take back the whole file, every row, every time, and do the arithmetic itself. That works, but it's lazy design, because it pushes all the reasoning work onto the model instead of onto a well-designed interface.

## Improving the interface, not the code

The fix isn't rewriting the underlying function, it's improving how it describes itself. Three changes make the difference: adding a real parameter, writing a docstring that says when to use the tool, and adding a resource, MCP's other primitive for exposing read-only context the model can pull in on its own. Once the function takes a category parameter, the schema gains a required parameter to match. The docstring's text on when to use the tool isn't just a comment for other developers, it ships directly to the model as part of the schema. The resource exposes which categories exist, so the model can check what's valid instead of guessing. Same underlying data, same protocol, but the schema now carries a required parameter and a description that tells the model when it applies, letting it ask for a specific category, like software or travel expenses, and get a clean answer even when it asks for a category that doesn't exist, instead of getting handed a full file and being left to sort it out.

## The security caveat that matters

MCP standardizes how tools describe and expose themselves, but it doesn't make calling them automatically safe. A tool call is still somebody's code running on your machine, and the specification itself is explicit that tool descriptions should be treated as untrusted and that user consent should be obtained before invoking one. Standardized access is not the same thing as safe access, and that distinction matters as much as the mechanics of building the server in the first place.

## Key takeaways

- MCP replaces point-to-point integrations, where every app has to be wired to every tool individually, with a shared protocol both sides speak once.
- A minimal FastMCP server can be built in about eight lines of Python using the official SDK, with a decorator that publishes a schema the model reads.
- The model only ever sees a tool's name, description, and input schema, not the underlying code, so interface design does real work.
- Adding a real parameter, a descriptive docstring, and a resource turns a lazy, all-or-nothing tool into one the model can use precisely.
- MCP's own specification warns that tool descriptions should be treated as untrusted, and that user consent is needed before invoking a tool: standardized access is not safe access by default.

## Try it yourself

Take something you genuinely use, a spreadsheet or an API at work, and design an MCP server for it: decide what tools it should expose, what each docstring should say, and what belongs as a resource instead of a tool. This kind of hands-on protocol work is part of the Humanitarians AI Fellows program.
