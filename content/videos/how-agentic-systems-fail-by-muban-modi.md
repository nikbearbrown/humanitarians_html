---
title: "How Agentic Systems Fail by Muban Modi"
seoTitle: "How Agentic Systems Fail by Muban Modi"
description: "Muban Modi breaks down the four-layer oversight system, propose, check, approve, run, that keeps an AI agent from acting wrongly and irreversibly."
summary: "Muban Modi explains why AI agents fail differently than chatbots and lays out a four-layer oversight system, plus a fifth failure mode that only shows up when you grade the whole trace."
keywords: ["how to build ai agent oversight layers", "how to stop ai agents acting unchecked", "why do ai agents fail differently", "propose check approve run framework", "muban modi agentic systems explainer", "typed parameters instead of free text", "ai agent takes wrong action unchecked", "grading final message hides skipped step"]
generated: "article"
---

A chatbot that gets something wrong hands you bad text. An agent that gets something wrong cancels your appointment, sends the email, or moves the money. Muban Modi uses a single example, rescheduling a calendar appointment, to show why agents need a different kind of safety net than chatbots do, and what that safety net actually looks like layer by layer.

## Why agents fail differently than chatbots

A chatbot's mistake is contained: you read the output, you decide whether to act on it. An agent's mistake is not contained, because the agent already acted. Modi's argument is that the fix for this is not a smarter model. It is oversight, built in layers, so that the model is never the last word on its own action.

## The four layers: propose, check, approve, run

Take the sentence "move my Tuesday appointment to Thursday afternoon." Modi breaks the agent's handling of it into four separate, testable steps. First, the agent proposes an action: it classifies the intent (reschedule, not cancel) and resolves which appointment is meant. Second, code checks the proposal against reality, is the new slot actually open, is the appointment actually the user's. Third, a human approves the action explicitly. Only after that approval does the tool actually run and touch the calendar. Each layer catches a different kind of failure, and no single layer is trusted to catch all of them.

## Why typed fields beat free text

The four layers only work if each one has something concrete to check. That is why the agent never hands the calendar backend a raw sentence. Instead it hands over structured fields: which appointment, what new time, why, and whether confirmation is required. A raw sentence arriving at a system is not something code can validate, and it is an open door for injection. Narrow, typed parameters turn a tool call into something a check can actually run before anything executes.

## The fifth failure mode: grading the whole trace

Modi's sharpest point comes last. Imagine every one of the four layers runs cleanly, no exception is thrown, and the final message reads "your appointment is confirmed for Thursday." It can still be wrong, because a required step, checking a 24-hour rescheduling policy, was silently skipped. If you grade only the final sentence, this passes. If you grade the entire trace step by step, it doesn't. That gap, between a clean-looking result and a process that actually followed every rule, is what separates a demo from something safe to run in production.

## Try it yourself

Modi closes with an exercise: take one action your own agent can take on a real system, and write out its four layers. What does the agent propose? What can code validate before anything runs? What does a human have to explicitly approve? What does the tool actually execute? Then name one failure that would slip through all four. That last question is the hard one, and it's the one that tells you whether your oversight layers are real or just look real.

## Key takeaways

- Agents fail differently than chatbots because their mistakes act on the world instead of just displaying text.
- A four-layer system, propose, check, approve, run, gives each failure mode its own dedicated check.
- Typed, structured parameters are checkable by code; free text handed to a backend is not, and is an injection risk.
- A clean final message can still hide a skipped step, so oversight has to grade the whole trace, not just the last sentence.
- The real test of an oversight design is naming the failure that would still get through it.

## Who this is for

Anyone building or supervising an agent that takes real actions, scheduling, sending, purchasing, filing, rather than just answering questions, and who wants a concrete framework for deciding what to automate, what to check in code, and what still needs a human's explicit yes.
