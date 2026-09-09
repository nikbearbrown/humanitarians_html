---
title: "Caching Pixels You've Already Seen."
seoTitle: "Cutting Screenshot Tokens with Prompt Caching"
description: "Liam explains how ephemeral prompt caching stops a computer-use agent from re-billing an identical screenshot on every turn."
summary: "Liam walks through a worked example showing how flagging repeated screenshots with ephemeral cache control cuts a 50-turn computer-use task from 100,000 tokens to 10,000."
keywords: ["how to cache screenshots in computer use api", "cache_control ephemeral prompt caching example", "why does resending a screenshot cost tokens", "reduce token cost of repeated screenshots", "computer use agent re-sends identical screenshot", "prompt caching for computer use agents", "how many tokens does a screenshot cost", "cache hit vs cache miss screenshot tokens"]
generated: "article"
---

Liam, in for Professor Bear, walks through a token-cost problem specific to computer-use agents: a screenshot that has not visibly changed still gets billed again in full unless the API is told to remember it.

## The naive loop that keeps rebilling

A fifty-turn computer-use task takes a screenshot on every turn. In the worked example, thirty-five of those turns show a desktop that has not changed at all, meaning the exact same image goes out again. The natural assumption is that repeating an identical image costs nothing extra since the model has already seen it. That is not how it works. The API re-tokenizes every screenshot from scratch, identical or not, at roughly two thousand tokens each, so those repeated turns spend seventy thousand tokens re-reading pictures Claude has already read.

## The concrete uncached cost

Liam sizes the problem with a specific case: a fifty-turn task where the screen only ever looks like one of five distinct states, labeled A through E. Without caching, every one of those fifty screenshots is billed at full price, which comes out to fifty times two thousand tokens, or one hundred thousand tokens, for a screen that actually only changed five times.

## The fix: one field

The fix is a single field, `cache_control` set to `{"type": "ephemeral"}`. Attaching it to a screenshot the first time it is sent tells the API to cache that exact image. Sending the identical screenshot again with the same flag produces a cache hit: the API recognizes it and skips re-tokenizing, so the agent still sends the picture but stops paying full price for the ones it has already seen.

## What the fix actually saves

Applied to the fifty-turn, five-unique-state example, caching turns those fifty screenshots into five misses and forty-five hits. Five misses at two thousand tokens each is ten thousand tokens instead of one hundred thousand, a ninety percent savings on this specific task.

## The scope limit

Liam is careful to mark the edges of the claim. This covers the screenshot case only; it does not walk through the full caching protocol, including the minimum cacheable size or the eviction rules. The cache is also not permanent. Switching API keys or leaving the session idle too long empties the cache regardless of whether the underlying screenshot ever changed, so the next screenshot becomes a miss again even if the desktop looks identical to a human watching.

## Key takeaways

- An identical screenshot is billed again in full by default; the API does not recognize repeats on its own.
- A fifty-turn task with only five unique screen states can cost one hundred thousand tokens uncached versus ten thousand cached.
- Setting `cache_control: {"type": "ephemeral"}` on a screenshot is what makes a repeat send a cache hit instead of a full re-tokenization.
- The ninety percent savings figure comes from this specific worked case, not a guarantee for every deployment.
- The cache does not survive an API key switch or a long idle gap, so a repeated screenshot can still miss after enough time has passed.

## Who this is for

This is for developers building computer-use agents who want a concrete, low-effort way to cut token costs from repeated screenshots without changing anything else about the agent's loop.
