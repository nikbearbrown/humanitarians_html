---
title: "How to Make Explainer Videos for Your Research"
seoTitle: "Make Explainer Videos for Your Research"
description: "A six-step pipeline for turning a week of research notes and data into a published explainer video in one sitting, using Claude Code and the Brutalist system."
summary: "This walkthrough covers the exact six-step pipeline, from a folder of research notes to a published YouTube video, using Claude Code and the Brutalist system."
keywords: ["turn research into video pipeline", "claude code explainer video", "brutalist system video pipeline", "caffeinate claude dangerously skip permissions", "publish research explainer youtube", "fellows research video pipeline", "ai generated research video", "claude code video automation"]
generated: "article"
---

You finished a week of research. The notes, the code, the figures, the paper draft are all sitting in a folder. Turning that into a published video usually means learning editing software, writing a script, and recording narration, which is exactly the kind of extra work that makes researchers skip sharing their results publicly. This walkthrough lays out a pipeline that turns that folder into a published explainer video in a single sitting, using Claude Code and a toolkit called the Brutalist system.

## The pipeline in one sentence

The whole process has one shape: your week's folder goes in, the Brutalist System provides the tools, Claude Code builds the video, you watch and revise, then you publish. Every step happens in the same sitting, and the six steps below are the full pipeline.

## Step one: put your week in one folder

The raw material is whatever you already produced that week, notes, code, figures, data, a paper draft, and screenshots, all collected into a single folder. Claude reads through that folder to find the stories worth animating. The guiding rule is simple: one folder equals one conversation with the pipeline, so everything relevant needs to live in that same place before you start.

## Step two: get the Brutalist system

The Brutalist System is the toolkit that does the actual video-building work, and it isn't something you build yourself. You get it, along with setup help, by emailing hr@humanitarians.ai.

## Step three: open Claude Code with the right flags

Once the toolkit is installed, you open Claude Code in the folder that holds both your research and the Brutalist skills, and run one command:

```
caffeinate claude --dangerously-skip-permissions
```

Caffeinate keeps your Mac awake through the render, since video generation can take a while and you don't want the machine sleeping mid-process. The `--dangerously-skip-permissions` flag lets Claude run the entire pipeline without pausing to ask for permission at each individual step, which is what makes the "one sitting" claim realistic.

## Step four: give Claude a specific prompt

This is the step where generic output becomes your video. The starting seed prompt is broad: create a Claude explainer in the Liam voice for every video idea in this folder. From there, you steer it with specifics: name your project, name the result, name the figure that's actually worth showing, and name the one idea you want a viewer to walk away with. Those specifics are what separate a video that looks like everyone else's from one that actually represents your week's work. If you're using the Liam voice, you also tell Claude to have Liam say your name and Humanitarians AI out loud, so the credit is explicit.

## Step five: watch, then revise in plain language

Claude builds the video, and then you watch it. If something's off, a wrong number, a pace that drags, a chart that should be a different chart, you just tell Claude in plain language what needs to change. The pipeline is built around the idea that plain language in produces a better video out, and you iterate on that loop until it's right.

## Step six: publish to the Fellows Research playlist

Once the video is ready, publishing uses Gorav's publishing script, also available from hr@humanitarians.ai, to post the finished video to the Humanitarians AI YouTube channel under the Fellows Research playlist. That playlist is specifically where research explainer videos live.

## The prompt to reuse

The pipeline closes with a reusable starting prompt you can run in your own Claude Code session: describe your folder of the week's research, ask Claude to create a Claude explainer in the Liam voice for every video idea in it, with animated visualizations and infographics, and to have Liam say your name and Humanitarians AI. Fill in one line about your own work, and that's everything Claude needs to start.

## Key takeaways

- The full pipeline is six steps: fold your week's work into one folder, get the Brutalist System from hr@humanitarians.ai, open Claude Code with `caffeinate claude --dangerously-skip-permissions`, give Claude a specific prompt, watch and revise in plain language, then publish.
- `caffeinate` keeps your Mac awake through the render, and `--dangerously-skip-permissions` lets the whole pipeline run without stopping for approval at every step.
- Specificity in your prompt, naming your project, your result, your key figure, and your core idea, is what makes the output represent your actual work rather than a generic template.
- Revisions happen through plain-language feedback to Claude rather than manual video editing.
- Finished videos are published to the Fellows Research playlist on the Humanitarians AI YouTube channel using Gorav's publishing script.

## Try it yourself

This pipeline is built specifically for the Humanitarians AI Fellows Series, which helps researchers share their weekly work with a wider audience. If you're a Fellow with a week of research sitting in a folder, email hr@humanitarians.ai for the Brutalist System and setup help, then run the six steps above before your next research cycle starts.
