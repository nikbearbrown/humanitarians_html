---
title: "Why the same API key that shipped your prototype becomes a critical bug in production"
seoTitle: "Why Your Bundled API Key Becomes a Production Bug"
description: "A bundled API key works fine in development but turns into a security hole the moment you ship, and the fix is a backend relay, not better hiding."
summary: "Obfuscating an API key harder doesn't work because any shipped binary can be decompiled; the real fix is moving the key off the device entirely."
keywords: ["api key security shipped app", "backend relay pattern api key", "decompile api key from app binary", "hide api key vs move api key", "claude api key production security", "proxied api requests relay server", "api key obfuscation doesn't work", "server side api key injection"]
generated: "article"
---

The instinct, when you realize your API key is sitting in your app's source code, is to hide it better: scramble the string, split it into pieces, obscure it somehow. None of that actually works, and understanding why points at the real fix.

## The same key, a flipped risk

A bundled API key works perfectly fine during development. It's only once you ship the app that it becomes a vulnerability, and the key itself hasn't changed at all, only the environment around it. A shipped binary can always be decompiled, string and all, no matter how cleverly that string was scrambled beforehand. Obfuscation raises the effort required to extract the key. It doesn't remove the key from the binary, and removal is the only thing that actually matters here.

## Dev code versus release code

Here's the concrete version of the problem. During development, an app calls the Claude API directly, with something like `.apiKey("sk-ant-...")` sitting right there in the source. Before release, that line has to change to something like `.proxied(headers:[...])`, pointed at a small relay server run by your own company. That relay server sits between the app and the API, injecting the real key on the server side rather than shipping it inside the app at all.

## Why the threat model changes

The reason this matters comes down to who's holding the device. On your own development machine, the key just needs to work; nobody hostile has access to that environment. On a device someone else holds, the key needs to survive them taking the binary apart, and no amount of scrambling changes that outcome. Only removing the key from the device entirely does. That's the actual shift between prototype and production: not the key itself, but whether an untrusted party can physically hold the thing the key lives inside.

## One boundary, not everywhere

On release, the fix is that the app never holds the real key at all. It sends a request token instead, and the relay server injects the actual key server-side before forwarding the request on to Claude. Importantly, this boundary isn't needed everywhere. A server you fully control, one no end user ever touches directly, can keep using a bundled key directly without this relay layer, because nobody outside your control ever gets to hold that binary apart. The moment a user could hold the binary, though, the key has to move off the device.

## The real fix

A key you can decompile isn't actually hidden, it's just harder to read at that moment, and "harder to read" is not a security boundary, it's a delay. The real fix isn't finding a better hiding place inside the app. It's moving the key off the device entirely, into a relay server that only your company controls.

## Key takeaways

- A bundled API key that works fine in development becomes a vulnerability the instant the app ships, because a shipped binary can always be decompiled.
- Obfuscating or scrambling the key string doesn't remove the risk, it only adds friction to extracting it.
- The fix is a backend relay: the app sends a request token instead of the real key, and a server your company controls injects the actual key server-side.
- This relay boundary is only necessary once an untrusted user can hold the binary; a server you fully control can keep using a bundled key directly.
- The underlying shift from prototype to production is about who can physically access the code, not about the key itself.

## Try it yourself

Try this prompt with Claude: "I'm building an app that calls the Claude API directly with a bundled key, and I need to ship it. Walk me through the backend relay pattern I need: what my app should send instead of the key, what the minimum relay server needs to do, and how it keeps the real key safe even if someone decompiles my app." Run that against your own app before you ship it. This explainer is part of Humanitarians AI's Claude Basics series.
