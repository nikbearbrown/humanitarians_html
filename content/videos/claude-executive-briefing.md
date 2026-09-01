---
title: "Claude, Executive Briefing."
seoTitle: "How Claude Skills Trigger on Keywords"
description: "A look at how the executive-briefing Claude Skill activates only when your request hits a fixed list of trigger words, not when it means the same thing."
summary: "Claude does not judge intent before running a Skill. The executive-briefing Skill fires only when your wording matches a printed list of trigger words inside its SKILL.md file."
keywords: ["claude executive briefing skill", "claude skills trigger words", "skill md file example", "claude agent sdk skills demo", "why claude skill did not activate", "claude board presentation prompt", "claude skills keyword matching", "structured executive brief ai"]
generated: "article"
---

Ask Claude to turn a memo into a board presentation and something useful happens automatically: it reads a skill file, follows a fixed set of steps, and hands back a structured executive brief. Ask for the exact same outcome in different words and nothing special happens at all. That gap is not a bug or a mood swing. It is the mechanism working exactly as designed, and understanding it changes how you write requests to Claude.

## One file, one printed list

The executive-briefing Skill lives in a single file, SKILL.md, roughly 4 KB. There is no hidden reasoning layer inside it deciding whether your request "counts." Near the top of the file sits a printed list of trigger words: executive, briefing, C-suite, board, leadership, presentation. Before Claude does anything else with a request, it checks that request against this list. If your wording touches the list, the Skill activates. If it does not, the Skill stays dormant and Claude just responds normally.

This is a useful thing to know because it reframes what a "Skill" actually is. It is not a layer of judgment Claude applies on top of understanding what you want. It is closer to a routing rule: specific words in, specific pipeline out.

## Words match, the pipeline fires

Feed Claude a research memo with the request "turn this into a board presentation" and two words on that list light up: board and presentation. That is enough. The Skill fires, Claude reads SKILL.md, runs its steps in order, and returns a structured executive brief. Run the identical memo through the identical request wording again and you get the identical structure again. The behavior is consistent because it is mechanical, not because Claude is weighing context and repeatedly arriving at the same judgment call.

## No match, no fire

Now take the same memo and ask for the same outcome in plain language: "make this shorter for my boss." The intent is identical to the board-presentation request. The document is identical. But none of those words appear on the trigger list, so the Skill stays completely silent. You get an ordinary rewrite, not the executive brief structure, even though what you actually wanted was arguably the same thing both times.

This is the part worth sitting with. The list decides, not the meaning behind your request. Claude is not failing to understand you when it skips the Skill here. The Skill itself was never built to interpret meaning in the first place. It was built to watch for specific words.

## What this means for how you prompt

Once you know a Skill runs on keyword matching rather than intent recognition, you can work with that fact instead of getting surprised by it. If you know a particular structured output exists for a task, using its known trigger vocabulary is the reliable way to get it. If you phrase a request in your own casual words and the structured version does not show up, that is not evidence the capability is missing. It is evidence your wording did not cross the list.

It also means the printed trigger list is not a small implementation detail buried in the file. It is effectively the entire interface for whether the Skill runs at all. Reading SKILL.md itself, rather than guessing at what might invoke it, is the direct way to find out exactly which words matter.

## Key takeaways

- Claude Skills like executive-briefing do not infer intent; they check requests against a printed list of trigger words inside a SKILL.md file.
- Two words matching the list, such as board and presentation, is enough to fire the full pipeline and return a structured executive brief.
- The identical intent expressed in everyday language, like "make this shorter for my boss," produces an ordinary rewrite if none of the listed words appear.
- The trigger list decides activation, not the underlying meaning of the request, so wording choice matters more than it might seem.
- Reading a Skill's SKILL.md file directly is the most reliable way to learn which words will actually activate it.

## Try it yourself

Take your own research findings and ask Claude to turn them into an executive-ready briefing, then ask it to walk you through what it is about to do before doing it, and to name which of your words triggered the Skill. Watching Claude name the exact match is the clearest way to see this activation rule in action on a request that is actually yours. This example comes from Humanitarians AI's ongoing look at how Claude Skills work under the hood.
