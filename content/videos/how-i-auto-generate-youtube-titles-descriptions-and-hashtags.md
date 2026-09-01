---
title: "How I Auto-Generate YouTube Titles, Descriptions, and Hashtags"
seoTitle: "Auto-Generate YouTube Titles with a Custom GPT"
description: "Nik Bear Brown walks through building a custom GPT that turns a video transcript into YouTube titles, descriptions, and hashtags using deep research and MD rule files."
summary: "Rather than write YouTube metadata by hand every time, this workflow uses deep research to build a rule set, then a custom GPT called descriptor that turns a pasted transcript into titles, a description, and hashtags."
keywords: ["auto generate youtube description gpt", "custom gpt youtube metadata tool", "gemini deep research youtube rules", "chatgpt youtube title generator", "gpt 8000 character limit md files", "youtube description automation workflow", "transcript to youtube metadata tool", "custom gpt command alias descriptor", "ai youtube title description generator", "gpt refuses youtube trademark word"]
generated: "article"
---

Writing a YouTube description well takes real thought, matching tone, summarizing content, working in the right keywords, and doing it fast enough that it doesn't eat into the time better spent actually making things. Nik Bear Brown's answer to that problem, once he noticed he was writing descriptions constantly, was to stop doing it by hand and build a tool instead.

## Starting with deep research, not guesswork

The build doesn't start with writing prompts from scratch. It starts by asking Gemini's deep research feature to work out what actually makes an effective YouTube title, description, and set of hashtags, then letting that research run in the background rather than trying to write the rules from memory. That research comes back as a fairly extensive rule set, five pages' worth, covering how to structure titles, what makes a description effective, and how hashtags should be chosen. Rather than spending time on trial and error, the rules get generated once through research and then reused every time afterward.

## When Google's own tools can't keep up

Not every attempt at deep research goes smoothly. Google's servers returned a "too much load" error on this particular run, more than once, despite Google being the company selling the underlying cloud infrastructure in the first place. When that happens, the workaround is simple: switch to a comparable tool, in this case moving the same deep research request over to OpenAI's tools, and continue from there without losing the thread of the work. The lesson isn't about any one provider being unreliable, it's about not letting a single tool's downtime block the workflow.

## Building a command-based GPT

Once the research comes back, it turns into a custom GPT built around a generic command template. The bot centers on one main command, aliased two ways: the full word "descriptor," chosen because it's unambiguous and not really used for anything else, and a short alias, "yt," for when typing less matters more. The tradeoff is real: a very short alias like "yt" can occasionally confuse the model about what's meant, but because the instructions around it are unambiguous, that confusion is rare in practice. Two default commands round things out, "list," which shows available commands, and "help," which explains what the bot actually does.

## Working around the 8,000-character limit

Custom GPTs cap instructions at 8,000 characters, and five pages of detailed rules don't come close to fitting inside that limit. The workaround is to keep the GPT's core instructions lean and offload the extensive rule lists into a supplementary MD file that the GPT uploads and reads as reference material. That split, a short core prompt plus a longer external rules document, is what lets a genuinely detailed rule set actually work inside a tool that technically can't hold all of it directly.

Getting the rules to actually fit under 8,000 characters wasn't just a matter of trimming until it felt short enough, either. Asking a language model directly how many characters a block of text contains produces a guess, not a real count, and that guess can be wildly off, sometimes estimating an 8,000-plus character document at a fraction of its real size. The reliable fix is pasting the text into a tool like a word processor that actually counts characters, rather than trusting the model's own estimate.

## A naming quirk worth knowing about

One specific and slightly odd obstacle came up while testing the GPT: using the literal word "YouTube" (or other platform names like Facebook) in the tool's name or instructions triggered a refusal. The likely explanation is that naming something directly after a trademarked platform makes the underlying system cautious about potential liability. The practical fix was simply renaming the tool to something else, like "descriptor," which sidestepped the issue entirely without changing what the tool actually does.

## Not overthinking the metadata itself

A consistent theme throughout is a deliberate choice not to over-optimize this particular kind of output. For genuinely creative work, like a song, iteration can run into the dozens or even hundreds of passes to get something right. YouTube titles and descriptions get a different standard: usually one or two passes are enough, and the goal is "pretty good, fast" rather than perfect. In practice, that means pasting in a transcript, saying "go," reviewing what comes back, and usually accepting it with only a small title tweak, rather than iterating extensively on wording that doesn't need to be flawless.

## Key takeaways

- The rule set behind the tool comes from deep research (first attempted in Gemini, then OpenAI when Google's servers returned load errors), not hand-written guesses.
- The custom GPT is command-based, with a main command aliased as both "descriptor" and the shorter "yt," plus default "list" and "help" commands.
- GPTs cap instructions at 8,000 characters, so extensive rule lists get offloaded into an uploaded MD file instead of living in the core prompt.
- Character counts should be verified with a tool that actually counts them, since asking a language model how long a text is only produces a guess.
- Naming a tool directly after a trademarked platform like YouTube or Facebook can trigger a refusal; renaming it sidesteps the issue.
- For low-stakes, repetitive output like YouTube metadata, one or two generation passes are treated as good enough, reserving heavier iteration for genuinely creative work.

## Who this is for

This is for creators who write YouTube metadata often enough that it's become a real time cost, and who want a repeatable, transcript-in-metadata-out workflow instead of writing titles and descriptions from scratch every time.
