---
title: "Mycroft: Turning Hacker News into a Verified AI Attention Signal"
seoTitle: "Mycroft: Turning Hacker News into an AI Attention Signal"
description: "Om Mali shares a week nine Mycroft update on fixing an attribution bug, shipping a versioned JSON endpoint, and being honest about missing data."
summary: "A week nine update on Mycroft shows how a title-based filtering fix corrected a company attribution bug and how the project now ships an honest, versioned JSON signal."
keywords: ["hacker news ai attention signal", "mycroft project hacker news", "ai company sentiment attribution bug", "title based filtering hacker news", "versioned json endpoint sentiment data", "hacker news sentiment score api", "ai buzz score developer community", "humanitarians ai fellows mycroft"]
generated: "article"
---

A sentiment pipeline is only as good as its attribution logic, and this update is a case study in what happens when that logic is wrong. Mycroft, an ongoing Humanitarians AI Fellows project, turns Hacker News discussion into an attention signal for the AI sector, scoring how much buzz major AI companies are getting from the developer community. In week nine, Om Mali walks through a real bug in that scoring, how it got fixed, and what the project is still honest about not knowing.

## What Mycroft measures

The project distills Hacker News activity into a score of how much genuine attention each major AI company is getting from developers, moving past raw post counts toward something closer to what people are actually saying and thinking about a company. That signal only matters if it's attributing the right conversations to the right companies, which is where week nine's real work happened.

## The attribution bug

The top story for each company had been selected purely by point count, with no check on whether the story was actually about that company. That approach broke in a concrete way: a post about Bento, a slide-deck tool that merely mentioned Claude and ChatGPT in passing, became the top story for both OpenAI and Anthropic. The result was a confident, well-formed, and completely wrong signal, one that ended up "praising presentation software" as if it were AI sector news.

## The fix: title-based filtering

The fix was simple and strict: a story only counts toward a company's score if that company's name appears in the title. After applying that rule, OpenAI's top stories became real OpenAI news, and Anthropic's became real Claude stories. That's a meaningfully better result, but Mali is careful not to oversell it. Anthropic's top stories are now often about third-party tools built for Claude, not about Anthropic the company itself. A title can name a product without the story actually being about the company behind it, and the update draws that boundary explicitly rather than papering over it.

## A versioned JSON contract other systems can use

The second half of the update is about usability. The signal had been generating every run and going nowhere, so it was formalized into a versioned JSON contract with a pull endpoint. That endpoint returns score, momentum, and sentiment per company, structured so other systems can consume it directly rather than scraping a human-readable report. Companies with no comments in a given run are explicitly flagged as degraded data rather than silently omitted or faked.

## Key takeaways

- Mycroft scores how much attention major AI companies are getting from Hacker News discussion, distilled into a usable signal.
- A points-only top-story selection let an unrelated slide-deck tool get misattributed as top news for both OpenAI and Anthropic.
- The fix requires a company's name to appear in the story title before that story counts toward its score.
- Even after the fix, a title naming a product isn't the same as a story being about the company, and the project states that limitation openly.
- A new versioned JSON endpoint returns score, momentum, and sentiment per company so other systems can pull the data directly.
- Missing or thin data is flagged as degraded rather than hidden, which the project treats as its most important feature.

## Who this is for

This update is aimed at anyone building or evaluating sentiment and attention-tracking pipelines, particularly other Humanitarians AI Fellows working on data-driven projects. The bigger lesson travels well beyond Mycroft: a pipeline that admits what it doesn't know is more useful than one that looks polished but is quietly wrong.
