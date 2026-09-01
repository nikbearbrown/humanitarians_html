---
title: "AI \"Forgetting\" is Actually Context Overflow (How to Code Eviction)"
seoTitle: "AI Agent Forgetting Is Context Overflow, Not Memory"
description: "Adwait Changan breaks down why AI agents do not actually forget, showing the code that tracks context budgets and the strategies for handling overflow."
summary: "AI agents do not have memory, they have a budget that gets repaid every single turn, and what looks like forgetting is actually that budget running out."
keywords: ["ai agent context window overflow", "why does ai agent forget", "context eviction strategies coding", "llm context budget explained", "ai agent memory misconception", "context window linear growth", "eviction design decision ai agent", "mycroft project context budget"]
generated: "article"
---

An AI agent losing the thread halfway through a long task looks like forgetting, but that framing is misleading. Agents don't have memory at all in the way people assume. What they have is a budget, and that budget gets repaid in full at every single turn.

## Why agents don't actually forget

The full model, before any example, comes down to three things competing for one fixed budget on every turn: instructions and tool definitions, which are fixed but resent in full every time; history, everything said and observed so far, which only grows; and whatever budget is left over, which is where the model's actual answer has to fit. The part people consistently miss is that nothing persists on the model's side between turns. Every single turn, the entire package, instructions, tool definitions, and the full history, gets packed up and sent again from scratch. The model isn't remembering the last turn. It's being retold everything at full price, every time.

## Counting the actual cost in code

Making this concrete: two tools plus one system prompt already adds up to 93 characters of instructions before an agent has done anything at all, and every subsequent observation adds roughly 88 more characters on top. The room available to actually answer isn't a constant, it shrinks turn by turn as instructions and history eat into the shared budget. That reframes the common complaint about an agent losing the thread partway through a task: it didn't forget anything. It ran out of room, and something had to be dropped. That's overflow, not amnesia. The tracking logic itself is short, about ten lines of code, and the key comment sits on the line explaining that instructions are fixed and paid again every turn while history only grows and room is just subtraction.

## The four eviction strategies

When the budget doesn't have room for everything, something has to give, and there are four real options for handling that: drop the oldest turns, summarize history and accept some loss of detail, leave older content out and fetch it back on demand when needed, or refuse to proceed and fail loudly rather than silently dropping context. There's no fifth option where everything simply fits forever.

## Why a bigger context window doesn't fix it

The obvious objection is to just get a bigger window, so that idea gets tested directly. Doubling the budget moves the point of overflow from turn 13 to turn 36. Doubling it again moves it to turn 81. It never goes away entirely, because history grows linearly while the budget stays a fixed size. Every budget eventually overflows. A bigger window buys more turns before that happens. It does not buy a permanent fix.

## Three questions worth asking of any agent

Given all this, there are three questions worth asking about any agent on any project: what's fixed here, and are you repaying for it every single turn? What's growing, and how fast? And when it doesn't fit, what actually gets dropped, and did you choose that deliberately or did a library choose it for you without your input? That third question is what separates people who ship agents that hold up under load from people debugging mysterious failures at midnight. Eviction is a design decision. If you didn't make it explicitly, it still got made, just not by you.

## Key takeaways

- AI agents have no persistent memory; every turn resends instructions, tool definitions, and full history from scratch.
- What looks like an agent forgetting mid-task is actually the context budget running out, causing something to be dropped.
- The four eviction strategies are dropping old turns, summarizing history, fetching on demand, and failing loudly.
- Doubling the context window only delays overflow (from turn 13 to 36, then to 81 in testing); it doesn't eliminate it.
- Eviction is a deliberate design decision. If you don't choose the strategy, a default library behavior chooses it for you.

## Try it yourself

Take an agent you're building and count the characters in your system prompt and every tool definition, then estimate how much each turn adds to history. Figure out which turn you'll run out of room on, and check what your current code actually drops when that happens, rather than assuming it's handled.
