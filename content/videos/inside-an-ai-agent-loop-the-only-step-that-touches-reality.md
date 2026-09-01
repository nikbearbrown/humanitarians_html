---
title: "Inside an AI Agent Loop: The Only Step That Touches Reality"
seoTitle: "Inside an AI Agent Loop: Thought, Action, Observation"
description: "A single pass of an agent loop, broken into thought, action, and observation, showing why only the observation step can catch a model's mistakes."
summary: "Onyx breaks down one real pass of an agent loop for the Mycroft project, showing why the observation step is the only one that touches reality."
keywords: ["ai agent loop thought action observation", "how to write a tool runner for ai agents", "why agent loops fail silently", "stopping rules for ai agents", "step budget agent loop design", "agent loop no progress oscillation", "false completion ai agent bug", "observation load bearing agent design", "debugging ai agent tool calls", "mycroft ai agent architecture"]
generated: "article"
---

An agent loop diagram makes the process look tidy: thought, action, observation, repeat. Diagrams are where bugs go to hide, though, and the real story only shows up when you run a single pass for real and read exactly what each step produces. Built around the Mycroft project, this walkthrough breaks down one unabstracted pass of an agent loop to find the part almost every implementation gets wrong, and it isn't the thinking.

## Three moves, only one of them real

A thought is the model picking a next step and explaining why. An action is the tool call itself, made once, with arguments. An observation is what actually came back. Two of those three moves are the model talking to itself; only the observation is reality checking in. Printing a real pass instead of relying on the tidy three-arrow diagram makes this split obvious: you can watch a thought and an action get generated with total confidence, and then watch the observation either confirm or contradict everything that came before it.

## Why the observation is load-bearing

The core claim is that everything besides the observation is the model reasoning about its own output, something it will do confidently and indefinitely whether or not it's right. The observation is the only place the real world gets to disagree with the model. A good observation carries three things: what was called, arguments included, so the next pass can tell similar calls apart; the actual value that came back, not a summary of it; and, if the call failed, the error message word for word. Leaving out any one of those three deletes the evidence the next pass needs to work with.

## The seven-line rule for tool runners

The rule for calling a tool is simple: if it raises an error, return that error as the observation. Don't swallow it, and don't just log it somewhere the model can't see, because the model can't see logs. Otherwise, return the value alongside the call that produced it. Skip that discipline and the loop degrades fast: the model proposes an action, nothing contradicts it, so it proposes again from the same information with the same confidence. That isn't an agent working, it's one guess repeated several times over at several times the cost.

## Four ways agent loops die

Even with honest observations in place, loops still end badly, and they die in one of four ways: no progress, where the same call repeats forever; oscillation, where the loop alternates between two actions without resolving; budget exhausted, the only genuinely honest failure of the four; and false completion, where the loop declares itself finished when it isn't.

## Writing your own stopping rules

Because a model can't be trusted to end the loop correctly on its own, the stopping rules have to come from outside it: a step budget that bounds the worst case in advance, a no-progress check that catches a repeated call before it gets paid for again, and an explicit done check, something outside the model that independently agrees the goal has actually been met. That third check is the one almost nobody writes first, and it's the one that catches false completion before it ships.

## Key takeaways

- An agent loop pass has three moves, thought, action, observation, but only the observation reflects what actually happened in the world.
- A good observation includes the call and its arguments, the actual returned value, and the exact error message on failure; summarizing any of these deletes evidence the next pass needs.
- A tool runner should return errors as observations rather than swallowing or only logging them, since the model can't see logs.
- Loops die in four ways: no progress, oscillation, budget exhausted, and false completion.
- Because a model can't reliably self-report that it's finished, stopping rules, a step budget, a no-progress check, and an external done check, have to be written by the developer, not inferred by the model.

## Who this is for

This is built for anyone building or debugging tool-calling agents, particularly Humanitarians AI Fellows working on the Mycroft project who need agents that fail loudly instead of quietly repeating the same mistake. It's episode two in a ten-part series on agent design that started by defining what an agent even is, a model inside a loop that can act, and continues next Friday with why the description you write for a tool matters more than the code behind it.
