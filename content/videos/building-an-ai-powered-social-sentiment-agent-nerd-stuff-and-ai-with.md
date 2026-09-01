---
title: "Building an AI-Powered Social Sentiment Agent | Nerd Stuff and AI with Humanitarians AI"
seoTitle: "Build an AI Social Sentiment Agent in n8n"
description: "A full n8n build that pulls StackOverflow, GitHub, and Reddit data, scores sentiment with Groq's Llama 3.1, filters noise, and stores investment signals in Google Sheets."
summary: "This walkthrough builds the Mycroft Social Sentiment Agent end to end in n8n, using Groq's fast Llama 3.1 inference to turn developer chatter into scored investment intelligence."
keywords: ["n8n sentiment analysis workflow", "groq api llama 3.1 sentiment", "stackoverflow github reddit data pipeline", "mycroft social sentiment agent", "n8n google sheets oauth2 setup", "signal to noise filter n8n", "ai investment intelligence pipeline", "n8n groq api key setup"]
generated: "article"
---

Developer forums produce a constant stream of small signals about where technology is heading, a Stack Overflow question about a new framework, a GitHub repository jumping from a hundred stars to a thousand overnight, a Reddit thread about a tool nobody's heard of yet. Individually these are noise. Read enough of them and patterns emerge, but no one has time to sit and read the entire internet. This build tackles that problem directly: an automated pipeline called the Mycroft Social Sentiment Agent that reads developer discussions across three platforms and turns them into structured investment intelligence.

## The problem it's solving

The starting point is simple to state and hard to do manually. Stack Overflow is full of developers stuck on problems or announcing breakthroughs, each one a tiny signal about adoption. GitHub's trending page shows star counts jumping overnight as developer attention shifts toward a project, another market signal. Both are genuinely informative and both are effectively untrackable by a human scanning pages one at a time. The system built here automates that reading and scoring process end to end.

## Three collectors, one trigger

The workflow starts with a manual trigger, functioning as a single "go" button for the whole intelligence-gathering run. Firing it launches three data collectors simultaneously. The Stack Overflow collector calls Stack Overflow's API asking specifically for the latest questions tagged artificial intelligence, filtered to fresh content from the last few hours rather than older archived questions. Parallel nodes handle GitHub and Reddit the same way. Each collector node extracts what actually matters from the raw response, timestamps, authors, and content, before all three streams meet in a single "combine all data" node. At that point, everything is fresh content pulled from across the internet, but it's still raw, unscored data.

## Groq, not Grok: the sentiment engine

The intelligence layer runs on Groq, spelled G-R-O-Q, which the build is careful to distinguish from Grok, spelled with a K, the unrelated AI model from Elon Musk's company. Groq is an inference infrastructure company that runs open-source models, including Meta's Llama, at very high speed, reported in the video as roughly ten times faster than more traditional providers. Getting access is a matter of creating an account at Groq's console and generating an API key from the API Keys section, which comes with what the video describes as a generous free tier, enough for thousands of calls without cost in the presenter's own experience.

Inside the workflow, the sentiment node uses a Llama 3.1 8-billion-parameter model with a deliberately narrow prompt: analyze the sentiment of this text and respond with only positive, negative, or neutral, no explanations, just a clean signal. A follow-up node processes that response and attaches a confidence score, because the model isn't always certain, and for a sentiment pipeline it matters to know when the underlying data is shaky rather than treating every output as equally reliable.

## A second pass for topic, then a filter for quality

A second call to Groq, using the same Llama 3.1 8B model, handles topic classification: is the discussion about LLM development, AI hardware, or an investment-relevant conversation. Running sentiment and topic as two separate passes gives the system real context. A phrase like "Nvidia memory workflow" might read as negative in isolation, but it's actually describing a technical issue, not market sentiment; "Nvidia losing market share" is a genuine investment signal. Separating what's being said from how positive or negative it sounds is what keeps the pipeline from confusing technical complaints with market-moving news.

From there, a topic clustering engine scans for specific technical terms, API, SDK, neural network, GPU, and similar language, indicating developers are actually building something with future revenue potential, while also tracking engagement signals like GitHub mentions and Stack Overflow references. The signal-to-noise filter that follows is where most of the raw volume gets discarded: since social content is described as roughly 90% noise, every piece of content is scored from 0 to 20. Stack Overflow content gets a base 4 points, GitHub gets 3, and a random Reddit comment gets 2, with additional points layered on for length, technical depth, and engagement. Only items scoring around 8 or higher pass through, which is the mechanism that turns a large volume of raw content into a much smaller set of high-quality signals.

## From signals to a stored dashboard

The surviving high-quality signals feed a data aggregation node that goes beyond simple positive/negative counting, producing outputs like an overall bearish or bullish read, a technical development activity level indicating whether developers are actually building, and trending topics showing what the community is focused on and why. A data export node then assembles this into what's described as an executive dashboard, covering sentiment broken down by platform, quality metrics, and trend analysis.

Storage runs through Google Cloud: a Google Cloud project is set up with an OAuth2 client, whose client ID and client secret authenticate the connection between n8n and Google Sheets. Once that connection is established and the account is authorized inside n8n, every workflow run writes data securely into a spreadsheet, with 25 different fields captured per high-quality signal, including timestamp, platform, author, and content, building an ongoing intelligence database that lets patterns emerge over time rather than in any single run.

## Key takeaways

- The Mycroft Social Sentiment Agent pulls fresh, tagged content from Stack Overflow, GitHub, and Reddit simultaneously from a single manual trigger.
- Sentiment scoring runs on Groq (not to be confused with Grok), using a Llama 3.1 8B model with a deliberately narrow positive/negative/neutral prompt.
- A separate topic-classification pass on the same model distinguishes technical complaints from genuine investment signals, like "Nvidia losing market share" versus a routine "memory workflow" bug report.
- A signal-to-noise filter scores every item 0 to 20, using platform base points plus length, technical depth, and engagement, passing through only items scoring around 8 or higher.
- Results are aggregated into a dashboard-style output (sentiment breakdown, activity level, trending topics) and written to Google Sheets via an OAuth2-authenticated connection, capturing 25 fields per signal.
- The entire system uses free-tier APIs and is open source.

## Try it yourself

The full build, including code, prompts, and setup details, is available in the Humanitarians AI GitHub repository under the Mycroft project. This is a hands-on project from Humanitarians AI's Nerd Stuff and AI series, aimed at making investment intelligence tooling transparent and buildable by anyone rather than locked inside a proprietary platform.
