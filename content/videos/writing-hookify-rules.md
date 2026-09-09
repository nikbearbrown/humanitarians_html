---
title: "Writing Hookify Rules"
seoTitle: "How to Write Hookify Rules for Claude Code"
description: "Liam explains how a Hookify rule is a markdown file with five YAML fields that blocks or warns on dangerous Claude Code commands, no scripting required."
summary: "Liam walks through how a Hookify rule is a plain markdown file with five YAML frontmatter fields, name, enabled, event, pattern, and action, that Claude reads fresh before every tool call to block or warn on matching commands."
keywords: ["how to write a hookify rule for claude code", "how to block rm -rf commands in claude code", "hookify rule yaml frontmatter fields explained", "difference between warn and block action hookify", "how to warn when editing env files claude", "why pattern matching can miss or overmatch commands", "claude code hookify markdown file location", "conditions array vs pattern field hookify"]
generated: "article"
---

Someone wants Claude to automatically catch a dangerous command before it runs. Their first instinct is to write a script. Liam explains that Hookify needs no code at all, just a rule, and walks through how to write one that actually blocks something like `rm -rf`.

## A rule, not a script

A Hookify rule is not code, it is a markdown file. It gets saved at `.claude/hookify.{name}.local.md`, with a YAML frontmatter block on top and a message underneath. There is no build step and no restart required. Claude reads the file fresh on every single tool call, so an edit to the rule takes effect on the very next call.

## The five fields

Five frontmatter fields sit above the message: `name`, in kebab-case with the verb first; `enabled`, true or false; `event`, one of bash, file, stop, prompt, or all; `pattern`, a regex to match against; and `action`, which defaults to `warn`, while `block` stops the operation outright.

## The anchor example

Watch the anchor case: `event: bash`, `pattern` matching `rm -rf`, `action: block`. Claude reaches for the command, the pattern matches, and it never runs. Getting that pattern exact means the block fires reliably every time, because the check is a straightforward regex match against the command text.

## Precision cuts both ways

The same precision that makes a pattern reliable also makes it fragile in both directions. Pattern the word "log" and it also catches "catalog" and "login," blocking or warning on things nobody actually intended to flag. Pattern only `rm -rf /tmp` specifically, and the identical danger typed against a different path sails straight through unblocked. A Hookify rule only catches exactly what its pattern says, no more and no less, so writing the pattern carefully matters as much as choosing the right action.

## Warn versus block

It is worth being explicit that `warn` is the default action, and `warn` still lets the command run, it just surfaces a message. Only an explicit `action: block` actually stops the operation. Confusing the two means a rule that looks like protection but does not actually prevent anything.

## Checking file paths, not just typed text

For rules meant to catch sensitive file edits, like warning when editing a `.env` file, the more reliable approach checks the `file_path` directly using a `conditions` block, rather than only scanning the new text being written into the file. A path check catches the edit itself, regardless of what content gets typed, while a text-pattern check only catches specific wording that happens to appear.

## Key takeaways

- A Hookify rule is a plain markdown file with YAML frontmatter, saved at `.claude/hookify.{name}.local.md`, requiring no code or restart.
- The five frontmatter fields are `name`, `enabled`, `event` (bash, file, stop, prompt, or all), `pattern`, and `action` (defaulting to `warn`, with `block` available to actually stop an operation).
- Claude reads the rule file fresh on every tool call, so edits take effect immediately on the next call.
- A pattern that is too broad, like matching "log," catches unrelated matches like "catalog" and "login"; a pattern that is too narrow, like a specific path, lets the same danger through on a different path.
- For catching sensitive file edits reliably, checking `file_path` directly in a `conditions` block works better than scanning only the newly written text.

## Who this is for

Claude Code users who want to automatically block or flag risky commands and file edits without writing custom scripting, and who need to understand exactly what a pattern-based rule will and will not catch.
