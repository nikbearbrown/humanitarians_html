---
title: "Build a Multi-Tool Chatbot with MCP Servers (Local + Public) | Humanitarians AI"
seoTitle: "Build a Multi-Tool Chatbot with MCP Servers"
description: "A hands-on walkthrough of connecting a chatbot to a local FastMCP math server and the public Tavily MCP server using LangGraph and Groq."
summary: "A step-by-step build of a chatbot that discovers and calls tools from a local FastMCP server and the public Tavily MCP server without hardcoded APIs."
keywords: ["fastmcp local math server tutorial", "langgraph create react agent groq", "tavily mcp server search tool", "model context protocol chatbot tutorial", "multi tool ai agent mcp", "connect chatbot to mcp servers", "groq llama 3 tool calling agent", "mcp summarizer natural language response"]
generated: "article"
---

Hardcoding an API into an AI agent works fine right up until you need to add a second tool, and then a third, and the integration code starts to sprawl. This walkthrough builds a small but complete alternative: a chatbot that connects to two different MCP servers, one running locally and one hosted publicly, and discovers what each one can do rather than having those capabilities wired in by hand.

## What MCP servers actually provide

The Model Context Protocol gives an AI agent a standard way to discover and call tools without the developer hardcoding each API individually. This build uses two servers to demonstrate that in practice. The first is a local math server built with FastMCP, a library for defining MCP servers, which exposes exactly one tool: an add function that takes two numbers and returns their sum, run over standard input and output so it can talk to the client. The second is Tavily's public MCP server, which provides real-time web search tools the agent can call for information it doesn't already have.

## Building the local math server

The local server is intentionally minimal. It's defined with FastMCP, given a name, and exposes the single add tool. That simplicity is the point: it's a clear, self-contained example of what it takes to stand up a local MCP server at all, before layering on the complexity of connecting to something public and unpredictable like a live search API.

## Connecting a client to both servers at once

The real work happens in the client, which connects to both servers simultaneously: the local math server for arithmetic and the public Tavily server for search. From there, the agent is built using LangGraph's create react agent, powered by Groq's Llama 3 model. A ReAct-style agent can reason about a user's question on its own, decide which tool applies, execute the call, and produce an answer, rather than following a fixed script.

## A summarizer layer for clean answers

A second agent sits behind the first purely to clean up the output. It takes two inputs, the user's original question and whatever raw output the first agent produced, and rewrites the result into clear natural language. That extra layer matters because the main agent sometimes stops at a raw function call result; the summarizer guarantees the user actually sees a polished, readable answer instead of unformatted tool output. A helper function ties the two together: run the main agent with its tools, feed its response into the summarizer along with the original question, and return the polished final answer.

## Watching it discover tools and answer questions

When the client runs, it connects to both servers and loads their tools automatically, discovering the add tool from the math server and several tools, including web search, from Tavily. Asking the agent a simple arithmetic question sends it to the local math server, and the summarizer turns the raw sum into a clean sentence. Asking it to find the latest MCP updates and cite sources routes it instead to the Tavily search tool, and the summarizer again produces a clean response, this time with proper citations attached.

## Why this matters beyond the demo

The underlying point isn't the add function or the search query themselves, it's what happens when you stop hardcoding APIs into an agent. Because the client discovers tools from whatever MCP servers it's pointed at, servers can be swapped in and out, or brand-new ones plugged in, without touching the agent's own code. That same pattern scales from two toy servers up to an agent with access to hundreds of tools spanning weather, finance, or custom business systems, all without rewriting the core logic each time a new capability gets added.

## Key takeaways

- FastMCP makes it straightforward to stand up a minimal local MCP server, in this case a single add tool.
- A client can connect to multiple MCP servers at once, mixing local tools with public ones like Tavily's search server.
- LangGraph's create react agent, running on Groq's Llama 3, decides on its own which tool a question requires.
- A separate summarizer agent turns raw tool output into clean natural language, even when the main agent stops at a function call.
- Because tools are discovered rather than hardcoded, new MCP servers can be added or swapped without changing the agent's code.

## Try it yourself

This build is a practical starting point for anyone experimenting with agentic AI at Humanitarians AI or elsewhere: stand up a simple FastMCP server for one tool you actually need, connect it alongside a public MCP server like Tavily, and wire both into a LangGraph agent. From there, adding a third or fourth tool is a matter of pointing the client at another server, not rewriting the agent itself.
