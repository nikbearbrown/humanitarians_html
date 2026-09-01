---
title: "Why a 50-turn agent pays for the same screenshot 35 times unless it caches the pixels"
seoTitle: "Why Agents Re-Pay for the Same Screenshot"
description: "A 50-turn computer-use agent can burn 100,000 image tokens on 5 real screenshots unless it hashes and caches each unique state instead of resending it."
summary: "Every API call resends the whole conversation from scratch. Here's why a repeated screenshot costs full price again, and how caching fixes that math."
keywords: ["computer use agent token cost", "prompt caching screenshot tokens", "cache control screenshot messages", "api call no memory between requests", "ephemeral cache computer use api", "reduce image tokens ai agent", "claude computer use pricing", "hash screenshot detect repeated state"]
generated: "article"
---

It sounds like a bandwidth problem: sending the same image over the wire again and again. It isn't. It's a token problem, and the math behind it is easy to underestimate until you actually run the numbers on a long agent task.

## The stakes: five pictures, fifty screenshots

A 50-turn form-filling agent might only ever encounter five unique desktop states, the same handful of screens revisited over and over as it works through a task. Naive math on that task looks brutal: 50 screenshots at roughly 2,000 tokens each comes out to 100,000 image tokens, for a task that only contains five actual pictures.

## Why "the model already saw it" doesn't make it free

The natural assumption is that once the model has seen a screenshot, showing it again should be nearly free, since it's already sitting in the conversation. That assumption is wrong, because an API call carries no memory between requests. Every single turn resends the entire conversation so far, images included, and the model reprocesses all of it from scratch every time, whether or not it's seen that exact picture before.

## The fix: hash it, then mark it cached

The fix is to hash each screenshot and mark it cached the first time it's sent, using the API's ephemeral cache setting. The next turn that sends an identical hash hits the cache instead of paying to reprocess the image again. Applied to the 50-turn task, only the five actual unique states ever get tokenized in full, 2,000 tokens each for 10,000 total, while the other 45 turns become cache hits. That's 10,000 tokens instead of 100,000, a tenfold difference from one change in how repeated images get handled.

## Where the savings stop working

Caching only helps when a screen repeats byte-for-byte, an idle dialogue box, an unchanged form. A cursor that moved, or a text field mid-type, produces a different image and therefore a different hash, so it gets billed at full price again. The same limit applies to a task that's genuinely novel every single turn: a real navigation to a new page is a new state, tokenized like anything else. Caching can't invent savings where the screen has actually changed; it only pays off for the states that repeat exactly.

## Key takeaways

- An API call has no memory between requests, so every turn resends the full conversation, images included, and reprocesses it from scratch.
- Naive per-turn image processing on a 50-turn, 5-state task costs roughly 100,000 image tokens.
- Hashing each screenshot and marking it cached on first send turns repeat views of the same state into cache hits, cutting that same task to roughly 10,000 tokens.
- Caching only pays off when a screen repeats byte-for-byte; any visible change, including a moved cursor, produces a new hash and full-price reprocessing.

## Try it yourself

Paste this into Claude: "I'm building a 50-turn computer-use agent that revisits the same 5 desktop states repeatedly. Show me exactly where to place `cache_control` on the screenshot messages so each unique state is only billed once, and write the code that detects a repeated state and routes to the cached version instead of sending the raw image again." This video is part of Claude Basics from Humanitarians AI, narrated by Liam, in for Bear, answering the kind of practical question a general audience actually asks about building with Claude.
