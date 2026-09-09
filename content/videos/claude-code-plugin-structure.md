---
title: "Claude Code, Plugin Structure."
seoTitle: "Claude Code Plugin File Structure Explained"
description: "Where plugin.json, commands, agents, skills, and hooks actually live in a Claude Code plugin, and why SKILL.md filenames matter."
summary: "This video explains the exact folder layout of a Claude Code plugin, showing which files must sit inside .claude-plugin and which sit one level up at the plugin root."
keywords: ["how to structure a claude code plugin", "where does plugin.json go", "claude code skill not showing up", "SKILL.md filename requirement", "claude-plugin folder structure", "claude code commands agents skills hooks", "why is my skill not auto discovered", "create a claude code plugin with skills"]
generated: "article"
---

A Claude Code plugin has exactly one file that belongs inside the `.claude-plugin/` directory: the manifest, `plugin.json`. This video walks through the rest of the layout, explaining where every other plugin component actually sits and why one small naming mistake can make a skill vanish without any error message.

## The manifest lives alone

Inside `.claude-plugin/` there is only one file, `plugin.json`, and it needs just one required field: `name`, written in kebab-case. Everything else that makes up a plugin, `commands/`, `agents/`, `skills/`, `hooks/`, sits one level up, at the plugin's own root, not nested inside `.claude-plugin/` alongside the manifest. This is the mistake the video opens with: assuming a commands folder belongs next to the manifest when it actually belongs at the plugin root.

## Auto-discovery with no registration step

Once a file is dropped into the right directory, Claude Code auto-discovers it. There is no registration step, no import statement, no manual wiring. Commands and agents are described as forgiving: any correctly-placed markdown file in the `commands/` or `agents/` folder works, with no special naming beyond being in the right location.

## Why skills are pickier

Skills do not follow the same forgiving rule. Each skill needs its own subdirectory, and inside that subdirectory a file must be named exactly `SKILL.md`, not `readme.md`, and not `skill.md` in lowercase. Get the filename exactly right and the skill shows up automatically in the list. The video's central example is what happens when that filename is wrong: rename `SKILL.md` to `readme.md` and nothing throws an error. The skill simply disappears from the list, silently, with no warning that anything went missing.

## The silent failure mode

This silent disappearance is the point the video keeps returning to. Auto-discovery works exactly as advertised when the filename is correct. Get it wrong in this one specific way, and it fails without a word, no log message, no broken build, just an absent skill. Anyone debugging a plugin where commands and agents load fine but a skill never appears should check the exact filename first.

## The prompt to try

The video suggests testing this understanding directly: ask Claude to create a plugin called doc-linter with a lint-docs command, a doc-reviewer agent, and a markdown-style skill, then check three things in the response, whether `plugin.json` is placed inside `.claude-plugin/` rather than at the plugin's root, whether `commands/`, `agents/`, and `skills/` sit at the root rather than nested inside `.claude-plugin/`, and whether the file inside the skill's folder is named exactly `SKILL.md`, not `readme` and not lowercase.

## Key takeaways

- Only `plugin.json` lives inside `.claude-plugin/`; commands, agents, skills, and hooks all sit at the plugin's own root.
- `plugin.json` needs just one required field: `name`, in kebab-case.
- Commands and agents auto-discover from any correctly-placed markdown file, no registration needed.
- Skills require a dedicated subdirectory containing a file named exactly `SKILL.md`.
- Misnaming that file (for example to `readme.md`) causes the skill to disappear from the list with no error at all.

## Who this is for

This is for anyone building or debugging a Claude Code plugin, especially someone whose commands and agents are working but whose skill isn't showing up and can't figure out why.
