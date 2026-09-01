---
title: "Why partial JSON can be a valid object before the closing brace arrives"
seoTitle: "Why Partial JSON Is Valid Before the Brace Arrives"
description: "A streaming tool call from the Anthropic TypeScript SDK shows why each incomplete JSON chunk still parses as a valid object mid-stream."
summary: "Streaming a tool call through the Anthropic TypeScript SDK produces a valid JS object on every chunk, even before the closing brace arrives, because the parser seals open structures itself."
keywords: ["anthropic typescript sdk streaming", "inputjson event claude sdk", "jsonsnapshot valid object", "streaming tool call json parsing", "claude tool use partial json", "json parse error incomplete string", "reading json mid stream safely", "shape safe vs value finished json"]
generated: "article"
---

If you feed a half-finished JSON string to a standard parser, it throws. That's the expectation almost every developer carries into streaming work, so when the Anthropic TypeScript SDK hands back a usable JavaScript object after every single chunk of a streaming tool call, it looks like it shouldn't be possible. The natural assumption is that a partial value must behave the same way a half-typed string does: broken or empty until the closing brace lands. It doesn't, and the reason why matters for anyone building on streaming tool inputs.

## The case that breaks the assumption

Picture a search tool streaming a single argument, the query "solar", across four chunks. Every time a chunk arrives, the SDK's `inputJson` event fires with a `jsonSnapshot`. Across those four chunks, the snapshot moves through an empty state, then `Q`, then `Q sol`, then `Q solar`. Each of those four snapshots is already a complete, parsable object, not a fragment that needs to be caught in a try/catch and discarded.

## How the parser seals itself shut

The reason comes down to how the SDK's vendored parser is built. It keeps a stack of every object and array it has opened while reading the stream. The instant a chunk ends, mid-value or not, the parser closes each currently open structure with a zero-value default, an empty string where a string was started, an empty object where one was opened, and hands back whatever that produces. It isn't waiting for the real closing brace to show up in the source text. It's supplying its own, on every chunk, so the snapshot you read is always syntactically whole.

## Shape-safe is not the same as value-finished

That distinction is the entire point of the example. When the snapshot reads `Q sol`, it isn't an empty query, and it isn't the final query either. It's a query string that started arriving and hasn't finished, with three more characters still on the wire. A valid snapshot tells you the shape of the object is safe to read right now, that a field exists and won't throw when you access it. It says nothing about whether the value inside that field has stopped changing. Reading `jsonSnapshot.q` mid-stream will not error, but it also isn't guaranteed to be the value you'll see once the tool call finishes.

## What this means for reading fields mid-stream

For anyone handling `inputJson` events directly, this changes what "safe" means. You don't need to wait for a `tool_use_delta` done event just to avoid a parse error, since every intermediate snapshot already parses. What you do need to decide is whether your code cares about a field being present versus a field being finished. If you're rendering a live preview of what a tool is about to do, reading early is fine. If you're about to act on a value, like actually running a query, waiting for the value to stop changing still matters, even though the object itself was never in danger of throwing.

## Key takeaways

- A partial JSON snapshot from a streaming tool call in the Anthropic TypeScript SDK is a valid JS object on every chunk, not just at the end.
- The parser tracks every open object and array on a stack and closes each one with a zero-value default the instant a chunk ends.
- A four-chunk streaming example of the query "solar" produces four different snapshots, each one syntactically complete.
- "Shape-safe" means a field is safe to read without throwing; it does not mean the value inside it has finished changing.
- You can read fields from `jsonSnapshot` mid-stream without waiting for the done event, as long as you know the value may still grow.

## Try it yourself

If you're streaming a tool call with the Anthropic TypeScript SDK and handling `inputJson` events, take a value you're reading mid-stream and check whether your code assumes it's finished just because it parsed. Humanitarians AI's Claude Basics playlist covers this kind of SDK mechanic in short, focused videos for developers building on Claude.
