---
title: "Claude, Idea Generation."
seoTitle: "Claude idea-generation skill: how it screens stocks"
description: "Explains how Claude's idea-generation skill screens stocks with a fixed quantitative, thematic, and pattern process rather than free-associating ideas."
summary: "Walks through how Claude's idea-generation skill runs a fixed three-step screen for long and short candidates, producing the same repeatable output rather than creative brainstorming."
keywords: ["how does claude idea generation skill work", "claude quantitative stock screening skill", "systematic stock screening with claude ai", "why does claude give the same stock picks", "claude thematic research and pattern recognition", "claude skill for investment idea sourcing", "claude stock screener not a strategist", "insider buying and free cash flow screen"]
generated: "article"
---

Claude has a skill called idea-generation, and the name invites a wrong guess: that Claude is free-associating its way to a stock pitch the way an analyst might in a meeting. It isn't. The skill runs a fixed, repeatable screen, and understanding that difference matters if you're going to use it for real screening work.

## What the skill actually does

Idea-generation runs three steps in a set order: a quantitative screen, a check against a thematic angle, and a pattern-recognition pass. It does not branch or improvise between these unless the skill's own instructions say to. Given criteria like rising free cash flow combined with recent insider buying, the skill runs the quantitative screen first, checks whether the result fits a thematic story, looks for a supporting pattern, and returns a short list of long or short candidates.

## Why the same input gives the same output

Run the same screen twice on the same data and the same candidates come back both times. This is the core distinction from brainstorming: a person free-associating in a pitch meeting might generate a different idea each time, shaped by mood, recent reading, or whatever crossed their mind that morning. Idea-generation doesn't do that. Give it the same criteria tomorrow and it surfaces the same names, not a fresh set. That consistency is a feature of how Claude Skills work in general: the skill's file lays out steps in a fixed order, and Claude follows them the same way every time the inputs match.

## Screener, not strategist

Calling this a screener rather than a strategist is not a knock on it. The payoff is real: you get a repeatable, checkable process that surfaces the same candidates from the same criteria, run after run, which means you can trust the process even when you don't agree with a particular result. The limit is just as real: it only finds what fits the screen you wrote. If your criteria are narrow or miss the actual driver of a stock's move, the skill won't compensate for that. It has no independent judgment about whether your screen criteria are the right ones.

## What a match does and doesn't prove

A stock surfacing from the screen tells you it matched your stated criteria. It does not tell you the trade is good. The criteria might be exactly the wrong ones for the current market, or right for the wrong reasons. The reverse also holds: a stock that never surfaces isn't proven to be a bad idea. It may simply not fit the pattern your particular screen was built to detect. Idea-generation gives you a filtered list, not a verdict on any individual name, and treating a screen hit as proof of quality (or a miss as proof of weakness) is a mistake the skill itself doesn't make but a user easily could.

## Trying it yourself

A useful way to see the mechanism directly is to ask Claude, before running anything, to read the idea-generation skill and explain what it will do and in what order. Then run it against your own screen criteria and watch which checks execute, and in what sequence, before a single candidate appears. That sequence, quantitative screen, thematic check, pattern recognition, is the whole mechanism. There's no hidden step generating creative alternatives behind the scenes.

## Key takeaways

- Idea-generation runs a fixed three-step process (quantitative screen, thematic check, pattern recognition) rather than creatively brainstorming ideas.
- The same criteria always produce the same candidates on a repeat run, since the skill doesn't vary its output between identical inputs.
- The skill's value is being a reliable screener, not a strategist that decides which criteria matter.
- A candidate surfacing proves it matched your screen, not that it's a good trade; a stock that never surfaces isn't proven bad.
- Asking Claude to narrate its steps before running a skill is a direct way to see the mechanism in action.

## Who this is for

Anyone using Claude for investment research who wants a realistic picture of what a "skill" actually automates, and anyone building or evaluating screening criteria who needs to understand that the quality of the output depends entirely on the quality of the screen they wrote.
