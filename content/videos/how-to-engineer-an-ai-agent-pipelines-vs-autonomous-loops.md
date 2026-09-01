---
title: "How to Engineer an AI Agent: Pipelines vs. Autonomous Loops"
seoTitle: "AI Agent Design: Pipelines vs Autonomous Loops"
description: "A Pothole Reporter app case study shows how to isolate the one unstructured decision a model should handle inside a deterministic pipeline."
summary: "Using a real Pothole Reporter app as a case study, this breaks down how to decide what part of a task is genuinely a model's job, and why fixed pipelines beat autonomous loops when consequences are real."
keywords: ["ai agent pipeline vs autonomous loop", "how to design agentic ai workflow", "vision language model guardrails", "deterministic pipeline ai agent design", "pothole reporter android app ai", "ai agent truth table test", "grounding tool use synthesis agent", "responsible ai guardrail design"]
generated: "article"
---

Most guides to building an AI agent skip the hardest design question: which part of the problem is actually the model's job, and which part should just be regular code? A real case study, an open-source Android app called Pothole Reporter, makes that decision concrete and shows what a genuinely well-engineered agent pipeline looks like.

## The truth table test

Traditional software writes an explicit rule for every case a developer can imagine, but the real world rarely fits neatly into true-or-false conditions. Agentic engineering flips that approach: instead of scripting the entire problem, you isolate the one part that's genuinely unstructured and hand only that part to a model. The test for finding that part is simple: can you write a truth table for this decision? If yes, it's deterministic code, so write it as code. If the boundary itself is fuzzy, a visual judgment call, an ambiguous sentence, an incomplete instruction, that's the model's job. Everything else, including the boundaries, the tools, and the state, stays engineered as regular code.

## Autonomous loops versus fixed pipelines

Once you've identified which piece belongs to the model, a second decision follows: who decides what happens next. An autonomous agent loop lets the model itself choose which tool to call, in what order, and when to stop. It's flexible, and it's how a lot of demos get built quickly. A fixed deterministic pipeline instead has the engineer decide the order in advance, with the model only reasoning inside each individual step. It's less flexible, but it's what most production systems touching real-world consequences actually use. Predictability wins out over flexibility the moment a system touches legal, government, or safety-relevant outcomes.

## The Pothole Reporter case study

Pothole Reporter is a real open-source Android app that handles three kinds of civic reports, potholes, garbage, and open manholes, across several Indian states and every mapped national highway. Only one of those three report types actually needs AI. Garbage and manhole reports are simply what the user says they are; a person looked and confirmed it directly. Potholes are different, because judging whether road damage is severe enough to report is a genuinely fuzzy call, and that's the piece handed to a vision language model.

## The four pipeline steps

The app runs a strict, deterministic four-step pipeline rather than an open-ended agent loop. First, perception: a photo drive mode runs a continuous background scan through the phone's camera, folding repeat sightings of the same pothole into a single report, and a vision model judges each frame as clear, probable, uncertain, or absent, never a fabricated precise percentage. Second, tool use: the agent takes the exact GPS coordinate and makes a deterministic call to reverse-geocode it into a street address. Third, knowledge grounding, which only runs for supported route types: the system ranks the coordinate against a downloadable pack of over 13,000 contracts, itself filtered from a public procurement snapshot of more than 42,000 rows, shortlisting up to 25 candidates, with a model picking one only above a confidence threshold. When no contractor name is on file, which is common, the app leaves that field blank rather than inventing one. Fourth, action synthesis: the photo, coordinate, road ownership check, and any contract match feed back into the model under a strict prompt template, producing one complaint addressed to the right recipient. Critically, the app never sends it automatically. It opens the user's own email, pre-filled, and stops there.

## Deriving your own guardrails

Rather than copying someone else's safety rules, the video argues for deriving guardrails from three questions applied to your own system: where can retrieval be wrong or stale, which calls for hedged language; where is the action irreversible or high-stakes, which calls for a human in front of it; and is there a category of input where refusing outright is safer than guessing, which calls for a dedicated failsafe branch. The Pothole Reporter case study answers all three the same way, by failing closed: every downloaded dataset is checked against a pinned checksum before it's trusted, and a missing or altered file causes that route to refuse rather than guess. On a national highway, the app refuses to name a maintaining authority itself and instead defers to the official highway channel. A contract match is only ever labeled "probable," since the actual warranty term isn't in the data and can only be inferred from how old the tender is. And nothing is ever sent automatically; the app never calls a complaint API and never logs in anywhere on the user's behalf.

## The trap of "usually right"

The single biggest failure mode this design guards against is trusting a model to grade its own homework. It's tempting to skip a human review step because the model is usually right, but "usually right" is exactly the condition guardrails need to exist for. The one case in a hundred where the model is confidently wrong is the one that reaches a real commissioner's inbox or a real bank account. A guardrail that only fires when someone remembers to check for it isn't a guardrail, it's a suggestion.

## Key takeaways

- Use a truth table test to separate deterministic code from the genuinely unstructured piece that belongs to a model.
- Fixed deterministic pipelines beat autonomous agent loops whenever the consequences of a mistake are real and irreversible.
- The Pothole Reporter case study runs four fixed steps in order: perception, tool use, grounding, and synthesis.
- Derive guardrails by asking what's stale, what's irreversible, and what should trigger an outright refusal.
- Never let "usually right" replace a human check; that's precisely the failure mode guardrails are designed to catch.

## Try it yourself

Pick one AI feature you're building or already use daily, run the truth table test on what the model actually decides, and determine whether it should run as a fixed pipeline or a looser agent loop given what's genuinely at stake. Then derive at least one concrete guardrail from the three questions above before shipping it.
