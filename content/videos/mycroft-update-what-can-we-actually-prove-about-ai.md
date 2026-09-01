---
title: "Mycroft Update: What Can We Actually Prove About AI?"
seoTitle: "What Can We Actually Prove About AI Accountability"
description: "Divij explains the security camera approach to tracking AI actions, its real limitations, and the tests being built to close the proof gap."
summary: "You can now prove what an AI system did. You still can't prove it was right. Divij breaks down the chain-of-trust security camera approach and its honest limits."
keywords: ["ai accountability mesh chain of trust", "verifying ai actions without proving truth", "ai security camera analogy", "jenga test ai reasoning", "ai interpretability inner wiring", "ai track record forecasting analogy", "structure enforceable behavior observable", "responsible ai fellows hai"]
generated: "article"
---

How do you verify an AI system when you can't prove absolute truth? That's the question Divij picks up in part two of his accountability mesh series. In part one, he established that structure can be enforced but truth cannot, at least not yet. This video asks the natural follow-up: if truth is off the table for now, what can actually be proven, and is that enough?

## The security camera analogy

To make progress, Divij bolted on a new tool, one he compares to a security camera pointed at the AI. A camera doesn't know whether you lied at the checkout. It only knows that you were standing there and what the receipt says. That's the deal with this tool too: it doesn't check whether the AI's answer is true. It records exactly what the AI actually did.

That recording builds a chain of proof with four links. Link one: did the AI actually call the tool it claims to have called? That's camera-proven, verifiable directly. Link two: was the data it pulled real or made up? Also provable. Link three: does a claimed number match the real financial filing it's supposed to come from? That's checkable. Link four: did the AI's stated reasoning actually cause its final answer? That link doesn't exist yet. Nobody has built a way to prove it.

## Three ways the camera can be tricked

A camera system, however thorough, can still be gamed in ways worth naming honestly. First, an AI can fetch real data right before answering without that answer actually being derived from the data it just fetched, the same way a rooster crowing before sunrise doesn't mean the rooster caused the sunrise. Second, a longer, busier recording of tool calls can look more impressive without any of those extra steps having been done correctly; doing more doesn't mean any individual step was right. Third, if the wrong person gets access to this detailed footage of the AI's actions, that itself breaks the exact confidentiality the system was built to protect in the first place.

## The honest ceiling

Divij is direct about where this leaves things: we can now prove what the system did. We still can't prove it was right. He frames that as the actual boundary of what's currently possible, not a failure of the project.

## Closing the gap: three approaches in progress

Three ideas are being worked on right now to push past that ceiling. The first treats a fact the way you'd treat a block in a Jenga tower: pull it out of the evidence supporting an answer and see whether the answer falls over. If removing it doesn't change anything, that fact was never really holding up the conclusion. The second looks inside the AI's actual internal wiring rather than asking it to describe its own reasoning, though right now that only works on small models researchers are allowed to open up, not the powerful models actually in use. The third idea skips the reasoning question entirely and just tracks results over time, the way a weather forecaster is judged: nobody checks whether the forecaster can explain the atmosphere, they check whether it rains on 80% of the days a forecaster said there was an 80% chance.

## Why the gap hasn't closed yet

Divij offers a candid explanation for why none of this has fully closed the gap. Powerful models are locked boxes that can't be opened for inspection. Grading a track record properly takes real time, months of real predictions with no shortcuts available. And honestly, he suspects the biggest reason might not be technical at all: right now it's cheaper and faster to build something that just looks accountable, a shiny dashboard, a green checkmark, than to do the slower work of actually proving accountability. This is also the point where Divij is stepping away from this project to move to something new.

## Key takeaways

- The chain-of-trust "security camera" tool records what the AI actually did without judging whether the answer itself is true.
- Three of four proof links are provable today: tool calls, real vs. fabricated data, and claims matching real filings; the fourth, whether stated reasoning caused the final answer, has no proof method yet.
- Camera-style tracking can be gamed by fetched-but-unused data, padded step counts, and misuse of the detailed footage itself.
- Jenga-style evidence removal, inspecting model internals, and weather-forecaster-style track record grading are the three approaches being explored to close the remaining gap.
- The honest scorecard: structure is enforceable, behavior is observable, and truth remains open.

## Who this is for

This update is for anyone tracking AI accountability and interpretability work, especially those following the Humanitarians AI Fellows program's ongoing accountability mesh series. Divij's closing line is meant to be the one thing anyone picking up this project next should read first: structure is enforceable, behavior is observable, truth is still open.
