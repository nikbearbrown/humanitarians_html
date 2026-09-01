---
title: "What Do Madison Fellows Do? | Building AI-Powered Marketing Intelligence Systems | Professor Bear"
seoTitle: "What Madison Fellows Build at Humanitarians AI"
description: "Professor Nik Bear Brown explains what Madison Fellows build, from n8n marketing agents to the reinforcement learning orchestration layer behind them."
summary: "Professor Bear breaks down what a Madison Fellow builds day to day, from a first n8n marketing tool through the five-layer agent framework and orchestration research."
keywords: ["madison fellows humanitarians ai", "n8n marketing automation agents", "agentic ai marketing framework", "reinforcement learning agentic workflows", "multi-armed bandit marketing agents", "synthetic persona market research", "n8n custom component open source", "ai marketing intelligence system", "q-learning policy gradient agents", "open source ai marketing agents"]
generated: "article"
---

Anyone thinking about joining Madison as a Humanitarians AI volunteer probably has one question before anything else: what would I actually spend my time building? Professor Nik Bear Brown walks through the answer directly, treating Madison as the first in a planned series of videos explaining what volunteers do on each of the organization's projects.

## What Madison Fellows actually build

Madison is a set of tools for marketing, branding, and market research, including surveys, and like most projects at Humanitarians AI it's agentic AI work. The primary tool for building these agentic workflows is n8n, described as not quite open source but free for educational use, downloadable locally, and something the team plans to extend substantially. A fellow's first task is picking one useful tool to build, something that gathers information relevant to marketing or branding, such as data on a company's sentiment, and building it as a working n8n component.

## Why n8n instead of a code-first framework

N8n is a visual programming tool, and that matters because Madison fellows work directly with domain experts in marketing, branding, and advertising who need to build and test workflows themselves without writing code. A more code-first framework like CrewAI would shut those experts out of the process. N8n already ships with a huge number of built-in components for things like filling out a Google form or connecting to Discord, and fellows also build custom components that get contributed back to both the open-source Madison project and to n8n itself, so anyone building an n8n workflow elsewhere can reuse them.

## Borrowing from reinforcement learning

Where n8n is comparatively weak, according to Professor Bear, is in the mathematics of reinforcement learning, and that's the second major area of Madison's work. The framing draws a direct parallel to classic reinforcement learning problems like a self-driving car or a Pac-Man or Pong-playing agent: actions are what the agent can do (turn the wheel, hit the gas or brake, move a paddle), the environment is what the agent perceives (camera or lidar input, or the pixels on a game screen), and the state is a specific snapshot of that environment at a given moment. Agentic AI and agents, in this sense, are fundamentally the same idea reinforcement learning has worked with for decades.

## Triggers, and why language models shouldn't run the whole show

What's different in frameworks like n8n is the idea of a trigger, an event that kicks off the agent's process rather than the agent running continuously. A trigger might be wanting to run a stock or branding analysis, or a market event like a shift in sentiment about a company. Professor Bear also makes a pointed distinction here: most people default to letting the language model be the entire agent, making every decision itself, and he argues that's probably not the best approach. A better design treats the LLM as one input to the agent rather than the whole of it, which opens the door to using multi-armed bandits, Q-learning, and policy gradients alongside the language model. Memory (storing and reusing personalized context, like who a user is and what language they speak) and tool access (fetching information or taking action) round out the other core components fellows will work with as Madison's reinforcement learning layer gets built out.

## The five agent layers

Madison organizes its agents into five layers, each covering a different part of the marketing pipeline: Intelligence Agents that gather and analyze data on market dynamics and consumer sentiment; Content Agents that create, optimize, and distribute marketing materials with a consistent brand voice across platforms; Research Agents that process data into customer insights through survey analysis and synthetic personas; Experience Agents that improve customer interactions through AI concierge systems; and Performance Agents that measure and optimize outcomes through multi-armed bandit optimization and predictive analytics. An orchestration layer sits above all five, coordinating agents through cross-project validation and dynamic resource allocation. New fellows start by building a single tool within one of these layers, not the orchestration layer itself, which is treated as something you earn by doing solid work on a first agent.

## Synthetic personas: interviewing people who don't exist

One piece of Madison's work that doesn't show up elsewhere at Humanitarians AI is synthetic personas: prompting a language model to act as a specific type of person, such as a recent graduate, and then interviewing it. This matters because people already ask AI assistants like Claude or ChatGPT for recommendations on restaurants, products, and purchases, a behavior Professor Bear notes was around 30 percent of research respondents recently and growing quickly. Being able to interview both real people and synthetic personas is framed as part of where advertising research is heading.

## Key takeaways

- A Madison Fellow's first project is a single, useful n8n component related to marketing, branding, or advertising, built alongside actual domain experts.
- N8n is chosen specifically because it's visual, which lets non-technical marketing and branding experts build and test workflows directly.
- Custom components fellows build get contributed back to both the open-source Madison project and to n8n itself.
- The orchestration layer extends classic reinforcement learning concepts, bandits, Q-learning, and policy gradients, to agentic workflows, and treats the language model as one input rather than the entire agent.
- Madison's work is organized into five agent layers: Intelligence, Content, Research, Experience, and Performance, coordinated by an orchestration layer.
- Synthetic personas, AI models prompted to act like a specific type of person, are used for research in a way that's unique to Madison among Humanitarians AI's projects.

## Who this is for

This is aimed squarely at anyone considering joining the Madison Fellows program at Humanitarians AI, especially people interested in marketing, branding, or advertising who also want hands-on experience with agentic AI. Everything built is open source, so fellows can carry their work into a job search or a company of their own afterward. Other Humanitarians AI projects apply the same agentic approach in different domains, including Dayhoff in biology, Mycroft in finance, and Popper in questions of AI trust and skepticism, which Professor Bear plans to cover in future videos.
