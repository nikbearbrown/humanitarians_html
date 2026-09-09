---
title: "Claude, Cookbook Audit"
seoTitle: "How the Claude Cookbook Audit Skill Works"
description: "How the cookbook-audit skill checks an Anthropic cookbook notebook against a fixed rubric instead of judging it by feel."
summary: "This video explains how the cookbook-audit Claude skill uses SKILL.md, a style guide, and a validation script to check a notebook against the same rubric every time."
keywords: ["how to audit a jupyter notebook with claude", "claude cookbook audit skill explained", "validate_notebook.py rubric check", "claude skill vs judging quality by feel", "how to review an anthropic cookbook notebook", "claude skill runs same steps every time", "does claude form its own opinion of quality", "SKILL.md style guide validate notebook"]
generated: "article"
---

Does auditing a cookbook notebook mean Claude is exercising some general sense of editorial quality? No. This video walks through the cookbook-audit skill to show that it runs a written rubric against a notebook, the same way every time, rather than judging the notebook by feel.

## What the skill folder contains

The cookbook-audit skill is a folder Claude reads before it works, not something it is trained on. It holds three files: `SKILL.md`, `style_guide.md`, and `validate_notebook.py`, together forming a roughly 12-kilobyte instruction set written in plain language with no hidden logic. Claude reads the file and then acts on it. As the video puts it, the file is the program.

## Three steps, run in order

The instructions sit in a Steps section. Claude reads `SKILL.md`, executes each step in order, and returns a result, linearly, with no branching unless a step calls for it. The process the video walks through is: hand the skill a notebook, it reads the rubric, checks the notebook against that rubric, and returns a score. That's the same three steps every time, regardless of which notebook is handed in.

## Same input, same output

The video demonstrates the consistency this produces: hand cookbook-audit the identical notebook twice, and it returns the identical rubric score both times. That is the payoff of the file being the actual program running the check, rather than a loose set of guidelines interpreted freshly each time.

## What happens outside the rubric's scope

The reverse case matters just as much. Hand the skill a notebook with something outside the stated rubric, and it still runs the same steps, checking only what `SKILL.md` names. `validate_notebook.py` is the check for structure, rubric items, and scope, and all of it is caught the same way regardless of what else the notebook contains. Auditing a notebook this way is not Claude forming its own opinion of quality, it is `SKILL.md`'s rubric being read, applied, and checked consistently against whatever notebook is handed over.

## The prompt to try

The video's suggested prompt is to ask Claude to audit an Anthropic cookbook notebook against a rubric, to read the cookbook-audit skill first, and to walk through what it will do before doing it. The video emphasizes watching for that walk-through specifically, since explaining first is what surfaces which rubric items `SKILL.md` actually checks and where the stated scope stops, rather than only seeing the finished score at the end.

## Key takeaways

- The cookbook-audit skill is a folder with `SKILL.md`, `style_guide.md`, and `validate_notebook.py`, not a training process.
- Claude reads the steps and executes them in order, then `validate_notebook.py` checks the result against a rubric.
- The same notebook run through the skill twice returns the identical score both times.
- A notebook with something outside the stated rubric is still checked only against what `SKILL.md` names, not judged more broadly.
- Auditing this way is not Claude forming an independent opinion of quality; it is a fixed rubric applied consistently.

## Who this is for

This is for anyone building or using a Claude skill meant to check work against a rubric, and for anyone wondering whether a Claude audit reflects genuine judgment or a fixed, repeatable check.
