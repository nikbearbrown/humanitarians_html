---
title: "Claude Code, Hook Development."
seoTitle: "How Claude Code Hooks Actually Work"
description: "Liam explains why a Claude Code hook, not a chat reminder, is the reliable way to block writes like .env files, and where the config format trips people up."
summary: "Liam explains why Claude Code hooks, fixed event-driven scripts rather than chat reminders, reliably block actions like writing to .env files, and why a mismatched config shape makes a hook silently never fire."
keywords: ["how to create a pretooluse hook in claude code", "claude code hook blocks writes to env file", "difference between plugin hooks json and settings json", "why does my claude code hook not fire", "command hook versus prompt based hook claude", "claude plugin root variable in hook scripts", "nine event types in claude code hooks", "how to block claude from editing system files"]
generated: "article"
---

Liam, in for Bear, addresses a common mistake: asking Claude Code to simply remember to skip a file like .env in conversation. A reminder can slip once the context scrolls away or a new session starts. The reliable fix is a hook, a script tied to one exact, fixed moment in Claude Code's execution.

## Why a reminder is not the same as a hook

A reminder lives inside the conversation. Once that context is gone, so is the reminder. A hook lives in a config file that Claude Code reads before it acts, regardless of whether the original conversation is still nearby. Hooks fire at nine fixed event types, ranging from before a tool runs to when a session starts or ends, and a hook does not forget.

## Command hooks versus prompt-based hooks

There are two ways to write a hook. A command hook is a bash script that performs the same deterministic check every time. A prompt-based hook instead hands the decision to Claude's own judgment. For something like blocking writes to a sensitive file, a command hook is the deterministic option: PreToolUse fires before any tool runs, checks the file path, and returns one of three answers, allow, deny, or ask, stopping the write before it happens.

## Two config shapes that are not interchangeable

Getting the hook to fire reliably requires getting its config shape right, and there are two shapes that look similar but are not interchangeable. A plugin's hooks.json wraps its events inside a "hooks" key. A project's settings.json puts those same events directly at the top level. Swap the shapes and the hook does not throw an error, it simply never fires, and nothing in the output tells you why.

## What a hook actually is

The core distinction the video draws is this: a hook is not something you ask Claude to remember. It is a script wired to one exact moment, and it fires exactly as configured, or not at all. That reliability is the whole value of using a hook instead of a conversational instruction.

## Try it yourself

The video ends with a direct prompt: ask Claude to create a PreToolUse hook for your plugin that blocks writes to .env files and system paths. When Claude answers, check two things. Does hooks.json wrap the event inside a "hooks" key, the way a plugin's config needs, rather than sitting directly at the top level the way a project's settings.json would? And does the script path use the `${CLAUDE_PLUGIN_ROOT}` variable instead of a hardcoded path, so the hook keeps working once the plugin moves?

## Key takeaways

- A hook is a config-driven script tied to a fixed event, not a conversational reminder that can be forgotten once context scrolls away.
- PreToolUse fires before any tool runs and can return allow, deny, or ask, among nine total event types.
- Command hooks run a deterministic bash script every time; prompt-based hooks hand the decision to Claude's own judgment.
- A plugin's hooks.json wraps events inside a "hooks" key, while a project's settings.json puts the same events at the top level; mixing up the shapes causes the hook to silently never fire.
- Use `${CLAUDE_PLUGIN_ROOT}` instead of a hardcoded path so a plugin's hook script keeps working after the plugin moves.

## Who this is for

This is for developers building or configuring Claude Code plugins who need a reliable, automatic way to block or react to specific tool actions, such as protecting sensitive files from accidental writes.
