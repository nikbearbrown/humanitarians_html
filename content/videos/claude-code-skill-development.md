---
title: "Claude Code, Skill Development."
seoTitle: "How to Write a Claude Code Skill That Fires"
description: "Explains SKILL.md structure, progressive disclosure, and the two mistakes that keep a Claude Code skill from triggering reliably."
summary: "Using a pdf-editor example, this video explains how SKILL.md, progressive disclosure, and a precise trigger description determine whether a Claude Code skill fires reliably."
keywords: ["how to write a claude code skill", "skill.md frontmatter name description", "claude progressive disclosure explained", "why claude skill won't trigger", "claude code scripts references assets folders", "vague skill description not firing", "create a pdf editor claude skill", "claude skill body loading full context"]
generated: "article"
---

Getting Claude to reliably repeat a task your way isn't something you ask for in conversation, conversations end and reminders fade. It's something you build and hand to Claude as a Skill. This video walks through the actual structure of a Claude Code skill using a pdf-editor example, and shows the two specific mistakes that keep a skill from firing when it should.

## The structure of a skill

A skill is a SKILL.md file with YAML frontmatter, name and description are required, plus an imperative body written as direct steps. Around that file sit three optional folders: scripts/ for code, references/ for documentation, and assets/ for output files. None of the three folders are required, a skill can be just the file itself, but they give a skill a place to keep supporting material out of the main body.

## Progressive disclosure, in three levels

The video's central concept is progressive disclosure, which loads a skill in stages rather than all at once. The name and description sit in context for every conversation, always visible regardless of what's being discussed. The body loads only once the description matches what's actually being asked. The resource folders, scripts, references, and assets, load only when Claude decides during execution that it needs them. This staged loading is why the description field matters so much, it's the only part of the skill Claude sees before deciding whether the rest is relevant.

## Built to be found, or built to be missed

Using a pdf-editor skill as the example, the video shows what a working description looks like: it names the trigger phrase directly, something like used when the user asks to rotate a PDF or convert PDF pages, because that's the only sentence Claude sees before deciding. Written that way, the skill fires exactly when someone asks to rotate a PDF, every time, because Claude is matching a specific phrase, not guessing at relevance. Write a vague description instead, something like use this skill for PDF tasks, and the skill won't fire reliably at all, since there's no specific trigger for Claude to match against.

## The second failure mode: skipping progressive disclosure

There's a second, separate mistake the video calls out: where the rotation code lives. Paste the rotation script straight into the SKILL.md body instead of putting it in its own scripts/ file, and the whole skill loads in full on every single trigger. The lean file meant to load only the parts Claude needs becomes exactly the thing progressive disclosure was built to avoid, everything loads at once regardless of whether it's needed for that particular request.

## Key takeaways

- A skill is SKILL.md (required name and description in YAML frontmatter, plus an imperative body) with three optional folders: scripts/, references/, assets/.
- Progressive disclosure loads a skill in three levels: name and description always visible, the body on a description match, resource folders only when Claude decides it needs them.
- A description that names the trigger phrase directly makes the skill fire reliably every time that phrase comes up.
- A vague description, such as "use this for PDF tasks," causes the skill to fire unreliably or not at all.
- Putting code directly in the SKILL.md body instead of a scripts/ file forces the whole skill to load in full on every trigger, defeating progressive disclosure.

## Who this is for

This is for developers building Claude Code plugins or custom skills who want their skill to trigger reliably and load efficiently, rather than guessing at why a skill isn't firing or is loading more than it should.
