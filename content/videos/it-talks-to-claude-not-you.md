---
title: "It Talks to Claude, Not You."
seoTitle: "Writing Claude Code Slash Commands Correctly"
description: "Explains why a Claude Code slash command's body addresses Claude, not the user, and how the frontmatter, locations, and shell syntax work."
summary: "Breaks down the frontmatter fields, three storage locations, and argument syntax of a Claude Code slash command, anchored on the rule that its body instructs Claude rather than describing an outcome to a person."
keywords: ["how to write a claude code slash command", "how to create a custom plugin command", "claude code command allowed-tools field", "claude code command argument-hint syntax", "project vs personal vs plugin commands", "claude code inline shell command syntax", "slash command not triggering claude code", "command body written for the user not claude"]
generated: "article"
---

Writing a custom Claude Code slash command, it is easy to picture its body as a note to whoever runs it. That instinct is backwards. A command's body is text Claude reads and executes, never a message displayed to the person who typed the command. Getting that audience right is the difference between a command that works and one that quietly does nothing useful.

## What a command file actually is

A command is a single markdown file with an optional frontmatter block on top and instructions below it. The frontmatter can carry five fields: a description shown in the help menu, a list of tools the command is allowed to use, which model runs it, an argument hint for autocomplete, and a switch that disables automatic triggering. None of these fields are required for a command to exist, but each one shapes how and when it fires.

## Three places a command can live

A command file can sit in one of three locations, and the location determines its visibility. A project command lives inside one project and is only visible there. A personal command lives in your own home folder and is visible across every project on your machine. A plugin command ships bundled inside a plugin and becomes available the moment that plugin is installed. Choosing the wrong location does not break the command, but it does mean the command shows up somewhere you did not intend, or nowhere at all.

## The rule that decides whether a command works: who is it talking to

This is the anchor point. A command's body is read by Claude, not shown to the person who typed the command. "Review this code for security issues and list each one with a line number" is a direction Claude can act on directly. "This command will review your code and give you a report" describes an outcome to a person, and Claude has nothing to actually do with that sentence. Every command body should read like the first example: an instruction, never a description of what the user will see happen. This single distinction is the most common reason a command underperforms even when its frontmatter is set up correctly.

## What the format specifies, and what it leaves to a separate reference

The three storage locations, the five frontmatter fields, and the argument syntax are all fully specified: a dollar sign and number for a positional argument, an at sign to reference a file, and an exclamation mark with backticks to run a shell command inline. What is not specified in the command format itself is the exact syntax for that inline shell execution, which lives in a separate reference page. There is also no built-in way to validate whether a command file is well formed before you actually run it, so mistakes surface at runtime rather than at write time.

## Key takeaways

- A command's body is instructions for Claude to execute, never a message meant for the person who typed the command.
- Frontmatter can set a description, allowed tools, a model, an argument hint, and a switch to disable automatic triggering.
- Commands live in one of three places: project-only, personal (all projects), or bundled inside a plugin.
- Argument syntax is fixed: `$1` for positional arguments, `@` for files, and `!` with backticks for inline shell commands.
- The exact inline shell syntax is documented separately, and there is no built-in validator for a command file before you run it.

## Who this is for

Anyone writing or debugging a custom Claude Code slash command, particularly someone whose command frontmatter looks correct but the command still behaves oddly, since the more common bug is a body written for a human reader instead of for Claude.
