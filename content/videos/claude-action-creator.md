---
title: "Claude, Action Creator."
seoTitle: "Claude Skills Explained: How Action-Creator Works"
description: "A plain-language look at how a Claude Skill actually works, using the action-creator skill to show what a one-click button can and can't do."
summary: "A Claude Skill is not hidden code, it's a folder of instructions Claude reads before acting, and the action-creator skill shows exactly how that works."
keywords: ["what is a claude skill", "how claude skills work", "claude action creator skill", "skill md file explained", "one click ai automation button", "claude skill folder structure", "ai skill vs script difference", "claude agentic skills explained"]
generated: "article"
---

It's a reasonable assumption to make: a Claude Skill must be some kind of special code running in the background, executing automatically whenever it's triggered. It isn't. A Skill is a folder of instructions that Claude reads before it acts, and understanding that distinction changes what you expect a skill-built feature to actually do.

## A folder, not a program

Open up the action-creator skill and there's no program waiting to run. There are two things: a `SKILL.md` file, which is plain text, no executable code inside it, and a `templates` folder sitting beside it. That's the entire skill. When Claude uses action-creator, it reads `SKILL.md` before acting. The file is the instruction set itself, not a reference to some script running somewhere else behind the scenes.

## Steps, top to bottom

Inside `SKILL.md` is a Steps section, and Claude works through it top to bottom: read the request, run the step, return the result. That's the whole mechanism, and it's what makes the skill's output predictable. Ask action-creator for a one-click button that sends a payment reminder to a specific vendor, and it turns that request into a saved action. Click the button once, and the same email goes out every time you press it afterward, because the steps written in the file don't change between clicks.

## Reliable, and then out of scope

That fixed structure is exactly why the button behaves consistently. The same request produces the same result every time, because the underlying steps aren't being reinterpreted on each click. But that reliability has a hard edge. Ask the same button to do something the file never described, say, negotiate the invoice instead of just sending the reminder, and nothing happens beyond what's already written. Negotiating was never part of the instructions. A skill only does what the page in front of it says. It isn't new intelligence layered on top of Claude; it's a fixed set of steps that Claude follows faithfully.

## What this means in practice

The practical upshot is that a Skill-built action is exactly as capable, and exactly as limited, as the file describing it. That makes Skills predictable in a useful way: you know a one-click action will keep doing precisely what it was set up to do, without drifting or improvising beyond its written scope. If you want the button to do more, the fix isn't asking it harder, it's updating the file itself with a step for the new behavior you want.

## Key takeaways

- A Claude Skill is a folder of plain-text instructions Claude reads before acting, not a hidden program running automatically.
- The action-creator skill consists of just two things: a `SKILL.md` file and a `templates` folder.
- Claude works through the Steps section in `SKILL.md` top to bottom: read the request, run the step, return the result.
- A one-click action built with action-creator repeats the same steps every time it's clicked, which is what makes it reliable.
- Asking a skill-built action to do something outside its written steps produces nothing extra, because a skill only does what its file specifies.

## Try it yourself

Try this prompt: "I want a one-click action that archives newsletters from a specific sender. Read the action-creator skill and walk me through what you'll do before you do it, show me each step in order, so I can see exactly what the button will run." Asking Claude to narrate the steps before building the action is a direct way to see the Steps section working exactly as described here, on a request of your own. This walkthrough is part of Humanitarians AI's Claude Basics series.
