---
title: "Why web search never runs your code but your own tool always does — with identical syntax"
seoTitle: "Why Web Search Never Round-Trips Through Your Code"
description: "Learn why Claude's web search resolves in one turn while your own client-side tool always forces a round trip, even with identical declaration syntax."
summary: "Declaring a server-side tool like web search and a client-side tool that calls your own code looks identical, but only one of them ever hands execution back to your app."
keywords: ["claude web search vs client side tool", "servertools vs tools claude api", "why tool call forces round trip", "claude tool use execution model", "client side tool round trip latency", "anthropic api server side tool", "claude tool call network level", "who executes a claude tool call"]
generated: "article"
---

It's a reasonable assumption to make: if you declare a tool the same way in the same file, it should behave the same way when it's called. That assumption breaks the first time you mix a server-side tool like web search with a client-side tool that calls your own code, and the difference matters if you're trying to reason about latency in your app.

## Same declaration, different behavior

Declaring a tool feels uniform. You list it, the model can call it, and it's natural to expect every call to round-trip back through your own code the same way: the model emits a call, your code runs it, you send the result back. That pattern holds for tools you write yourself. It does not hold for web search.

## The anchor case: serverTools vs. tools

The concrete example is a `.webSearch(maxUses: 5)` declared in `serverTools` sitting right next to a Swift function called `lookupFavorites()` declared in `tools`, in the same file, using the same declaration style. Despite that identical syntax, web search runs on Anthropic's own servers and its results land inside that same turn. `lookupFavorites()` triggers a tool-use block that only your own app can act on.

## Why: who can execute the tool

The round-trip count comes down to a single question: who can actually execute the tool. Web search needs a live index and sandbox infrastructure that Anthropic already runs, so Anthropic finishes the call itself, inside the same turn. `lookupFavorites()` is arbitrary code that only exists on your device, so only your app can run it, which forces the model to stop and wait for a second request no matter how simple that function is.

## Tested both ways

Sending a prompt like "search Osmosis, then check my notes" makes the split concrete. The search resolves inside that same request, with no callback into your own code required. The notes check can't resolve that way: the model emits the tool-use call, your code has to run it, and a second request carries the answer back into the conversation. It doesn't matter how trivial the client-side function is, even a one-line function forces that round trip. And it doesn't matter how often the server-side tool fires, every call still resolves in-turn because Anthropic holds the execution the whole time.

## The takeaway

It isn't the syntax that decides whether a tool call round-trips, it's who can execute it. Anthropic runs its own tools inside the turn because it owns the infrastructure those tools depend on. Only your app can run your own tools, so the model has to stop and come back for the answer every time, regardless of how the tool was declared.

## Key takeaways

- Declaring a server-side tool and a client-side tool with identical syntax does not mean they behave the same way at runtime.
- Web search resolves inside the same turn because Anthropic owns the infrastructure (a live index and sandbox) needed to execute it.
- A client-side tool like `lookupFavorites()` is arbitrary code that only your app can run, which always forces a second round trip.
- Round-trip count depends on who can execute the tool, not on how trivial the function is or how often the tool fires.
- This split doesn't cover domain filtering, `maxUses` rate limiting, or the tool-result schema, and it isn't a verdict on which pattern is "better."

## Try it yourself

In your own Claude app, take one tool declared as a server-side tool, like web search, and one declared as a client-side tool that calls your own code. Walk through what happens at the network level for each: how many round trips occur, who executes the tool, and where the result enters the conversation. Running that comparison against your own tool mix is the fastest way to reason accurately about latency budgets in your app, and it's a useful mental model for anyone building with the Claude API through Humanitarians AI's Claude Basics series.
