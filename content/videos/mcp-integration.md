---
title: "MCP Integration."
seoTitle: "MCP Integration in Claude Code Plugins"
description: "How a Claude Code plugin connects to an outside service through an MCP server, covering config location, connection type, and tool naming."
summary: "Explains where a Claude Code plugin declares an MCP server, how to pick among four connection types, and why an exact tool name is the difference between a working call and silent failure."
keywords: ["how to add mcp server to claude code plugin", "how to connect claude code plugin to asana", "how to write mcp.json for a plugin", "stdio vs sse vs http mcp server", "claude code mcp tool naming convention", "mcp__plugin tool name format", "mcp server tool call does nothing", "why does my mcp integration fail silently"]
generated: "article"
---

Connecting a Claude Code plugin to an outside service is not an app install, it is a configuration entry. The plugin declares a server, picks one of four connection types that matches how that service actually works, and gets access to whatever tools the server exposes under a fixed naming pattern. Get any of those three choices wrong and the plugin either cannot reach the service or, worse, fails without telling you why.

## Where the configuration lives

A plugin has two places to declare an MCP server. The first is a dedicated `.mcp.json` file at the plugin's root, which is the standard choice once a plugin talks to more than one external service. The second is an inline `mcpServers` field inside `plugin.json` itself, which works fine for a single simple server but gets unwieldy fast if more get added later. Neither location is wrong on its own; the choice comes down to how many servers the plugin needs to track.

## Matching the connection type to the service

Every server declaration needs a connection type, and there are four: `stdio` for a local process Claude spawns and talks to directly, `SSE` for a hosted service that authenticates with OAuth, `HTTP` for a token-authenticated REST API, and `WebSocket` for real-time streaming. These are not interchangeable. A hosted service like Asana that logs in through OAuth needs `SSE`, not `stdio`. Picking the wrong type does not produce a helpful error message, it simply means Claude cannot reach the service at all.

## How tool names get built

Once a server is declared, each tool it offers gets an exact, mechanical name: `mcp__plugin_{plugin}_{server}__{tool}`. For an Asana server named `asana` inside a plugin also named `asana`, the task-creation tool becomes `mcp__plugin_asana_asana__asana_create_task`, that exact string, with two underscores separating each section. There is no shorthand and no fuzzy matching. Whatever the server calls its tool becomes the tool name suffix, verbatim.

## Exact names work, close names go silent

Get the tool name exactly right and Claude calls precisely that tool, nothing more. Get one underscore wrong and nothing happens at all: no error message, no warning, just silence, because a name mismatch is never reported back to you. This is the failure mode worth watching for when a plugin's MCP integration seems to do nothing: check the tool name character by character before assuming the server itself is broken.

Some plugins sidestep this risk by pre-allowing tools with a wildcard instead of naming them individually. An entry like `asana*` matches every tool the Asana server offers, not just the one the plugin was built to use, and it fires without error the same way an exact match does. The tradeoff is that the plugin can now call anything the server exposes, which defeats the purpose of naming a specific tool in the first place.

## Key takeaways

- A plugin declares an MCP server either in a dedicated `.mcp.json` file (multiple servers) or inline in `plugin.json` (one server).
- The connection type must match the service: `stdio` for local processes, `SSE` for hosted OAuth services, `HTTP` for token-authenticated REST, `WebSocket` for real-time streaming.
- Tool names follow a fixed pattern: `mcp__plugin_{plugin}_{server}__{tool}`, written out exactly with double underscores.
- A single wrong character in a tool name causes a silent failure, not an error message.
- A wildcard pre-allow avoids the naming risk but grants access to every tool the server offers, not just the intended one.

## Who this is for

Anyone building or extending a Claude Code plugin that needs to talk to an external service, especially developers debugging a plugin whose MCP tool calls seem to do nothing and need to check their connection type and tool name before looking anywhere else.
