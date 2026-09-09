---
title: "Claude Code, Plugin Settings."
seoTitle: "How Claude Code plugin settings persist"
description: "Explains how Claude Code plugin settings survive between sessions using a YAML-frontmatter markdown file, and where the sed-based parsing breaks."
summary: "Explains why Claude Code plugin settings must be written to a .claude/plugin-name.local.md file with YAML frontmatter, and how a sed-based hook parser can silently mangle multiline values."
keywords: ["how do claude code plugin settings persist between sessions", "claude code plugin-name.local.md file explained", "yaml frontmatter for claude code plugin settings", "claude code hook checking enabled flag", "why does claude code forget my plugin settings", "sed parsing claude code plugin frontmatter fails", "claude code plugin settings survive restart", "add a settings file to my claude code plugin"]
generated: "article"
---

Getting a Claude Code plugin's settings to survive between sessions isn't something you ask Claude to remember in conversation, it's something you write down. Each Claude Code session starts blank, so a setting mentioned only in chat is gone the moment a new session begins. What actually persists is a file.

## The file that persists

The pattern is one file: `.claude/plugin-name.local.md`, sitting in the project root. Above the line, YAML frontmatter holds structured fields like `enabled`, `mode`, or retry counts. Below it, a markdown body holds free text that gets read back later. This split matters because it separates data a script needs to parse mechanically from notes meant for a human or for Claude's own context.

## Three consumers, one file

Three different things read that same file. A hook is a bash script that parses the frontmatter with `sed`. A command uses Claude Code's Read tool directly. An agent references the file in its own instructions. All three consumers point at the same source of truth rather than each maintaining a separate copy of the settings.

## The reliable case

One field in particular, `enabled`, drives a quick-exit pattern: check whether the file exists, check the `enabled` field, and stop before doing anything else if it's false. Flip that field between true and false repeatedly, and the hook obeys every time. A flat value like a simple boolean is exactly what a `sed` extraction is built to handle reliably.

## Where the parsing breaks silently

Hand that same parser something more complex, a multiline value, a quoted colon, or an indented block, and it can silently mangle what it reads back. No error appears. The frontmatter simply stops matching what's actually on the page. This is the practical risk worth knowing about before relying on this pattern: it's reliable for simple flat fields and fragile for anything structurally more complex, with no warning when it breaks.

## Why this matters practically

Plugin settings aren't something you ask Claude to remember, they're a file it reads back every time, in a shape simple enough to parse correctly, or not parsed correctly at all. Anyone building a Claude Code plugin that needs persistent configuration should keep the frontmatter fields flat and simple specifically because of how `sed`-based parsing behaves. A restart is required after changing the file for the new settings to take effect; nothing hot-swaps mid-session.

## Trying it yourself

A useful test is to ask Claude to add a settings file to a plugin that stores an enabled flag and a validation mode, with a hook that checks it before running. Then check three things in the response: does it place the file at `.claude/plugin-name.local.md`, not somewhere else; does it use YAML frontmatter above a markdown body rather than one flat format; and does the hook check whether the file exists, then check `enabled`, exiting cleanly before doing anything else if either check fails.

## Key takeaways

- Claude Code plugin settings persist through a file, `.claude/plugin-name.local.md`, not through anything mentioned in conversation.
- YAML frontmatter holds structured fields; a markdown body below holds free text.
- Hooks, commands, and agents all read the same file, each through a different mechanism.
- A flat field like `enabled` parses reliably with `sed`, but multiline values, quoted colons, or indented blocks can be silently mangled.
- Changing the settings file requires a session restart; nothing hot-swaps mid-session.

## Who this is for

Developers building Claude Code plugins that need configuration to persist across sessions, and anyone debugging a plugin setting that seems to silently stop working.
