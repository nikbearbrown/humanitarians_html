---
title: "Debug the Prompt Like Code"
seoTitle: "Debug a Prompt Like Code: The Four-Move Playbook"
description: "A four-step prompting playbook covering eval suites, XML hygiene, patch debt at model migration, and when instructions need a tool instead."
summary: "A four-move playbook for debugging prompts like code: build an eval suite first, fix structural hygiene, clear out patch debt at migration, and add tools for capability gaps."
keywords: ["prompt engineering playbook anthropic", "eval suite control edge boundary", "xml tags prompt structure claude", "patch debt model migration prompt", "instructions vs tools llm capability", "prompting for agentic systems", "generator evaluator repair loop", "claude prompt debugging framework"]
generated: "article"
---

A prompt in production breaks on a model migration, with multiple contributors and no clear owner. A brand new agentic system gets built from zero, with no baseline at all. Different starting points, same underlying discipline: a prompt that works is debugged like code, with reproducible test cases and one failure mode addressed at a time. Anthropic engineer Margot Vanlar ran that discipline on a real production prompt, and it breaks down into four moves, applied in order.

## Move one: write evals before you change anything

The first move is building an eval suite before touching the prompt at all, because without one, every change is an experiment with no control group. A complete suite needs three categories of test cases. Control cases are unambiguous queries the model should always pass, confirming nothing broke after a change. Edge cases are queries where the model has failed before, explicitly caught by the updated prompt. Boundary cases are queries the model should refuse or escalate, testing whether it knows the edge of its own role. Missing any one of these three categories leaves a blind spot in the eval suite, and these evals get run before and after every prompt change, for both the production-migration scenario and the from-zero scenario.

## Move two: fix structural hygiene

Once a baseline exists, the second move is general cleanup before targeting specific failures. The rule here is straightforward: if you can't tell guidelines from policy from data inside the prompt, the model can't either. Fixing that means adding explicit XML tags for role, guidelines, policy, tone, customer context, and user message. That single structural change alone was enough to improve a failing test case, before any targeted instruction was even written. Adding a closing XML tag as a stop sequence also matters here, since it prevents runaway output, especially with structured or nested schemas.

## Move three: clear out patch debt

The third move addresses what happens when defensive instructions outlive the problem they were written for. An instruction written to stop a hallucination on one model version can cause a different failure on the next. The example given: an instruction like "never give wrong plan details, point to the URL" was written to stop a hallucination on an earlier model version. On a newer model, followed literally, it caused the model to withhold correct information it already had in context. The fix is to apply this check at every model migration: audit every defensive instruction, check why it was originally written, and if the original failure no longer occurs on the new model, delete the patch.

## Move four: instructions don't add capability, tools do

The fourth move is recognizing when a prompt is asking the model to do something it structurally can't do. An instruction like "always calculate proration correctly" does nothing, because the model cannot do reliable mental arithmetic no matter how the instruction is phrased. The fix is registering a tool: adding a proration calculator to the API call lets the model call it when needed, read the output, and explain the result. The general rule is that if a task requires exact arithmetic, deterministic lookup, or external state, it needs a tool. Instructions only change behavior within capabilities the model already has.

## Both sides of every trade-off

A related trap shows up around telling a model to avoid something without stating the cost of avoiding it. An instruction like "avoid escalating" cost eight dollars per case and produced a model that never escalated, even on genuine billing errors, because the model optimized for exactly the goal it was given. The fix was stating both sides explicitly: weigh not escalating against the cost of refunds plus customer trust. More capable models optimize trade-offs more aggressively, so an incomplete cost function in the prompt produces stronger wrong behavior, not weaker.

## Model, prompt, and harness together

For a staff-scheduling task with hard constraints, testing across five trials each showed that no single lever solved the problem alone. A simpler model with a simple prompt failed every trial. A more capable model with the same prompt reduced violations but still failed. The same capable model with extended thinking became compliant, at triple the token cost and triple the latency. The simpler model with a better-structured prompt passed two of five trials before hitting an output limit. The conclusion: test all three levers, model, prompt, and harness, before concluding the model itself is the bottleneck. For tasks with discrete, separable steps and clear pass-or-fail criteria, splitting one large prompt into three single-responsibility prompts, a generator that drafts, an evaluator that checks every hard rule and reports violations with evidence, and a repair step that makes targeted fixes to only the flagged violations, outperformed a single large prompt, with lower token count and lower latency, and the added benefit that soft constraints can be added to the evaluator at runtime with no code changes.

## Key takeaways

- Build an eval suite with control, edge, and boundary cases before changing a prompt; without it, every change is untestable.
- Structure prompts with explicit XML tags separating role, guidelines, policy, and data, and use a closing tag as a stop sequence.
- At every model migration, audit defensive instructions and delete ones written for failure modes the new model no longer has.
- Instructions cannot add capability like arithmetic; tasks needing exact calculation, lookup, or external state need a registered tool instead.
- State both sides of a trade-off explicitly in the prompt; an incomplete cost function produces stronger wrong behavior in more capable models.
- For separable multi-step tasks, splitting a single large prompt into generator, evaluator, and repair roles can outperform one large prompt on cost and latency.

## Try it yourself

Take a prompt you own and write five test cases: one control, two edge cases, and two boundary cases. Run them before changing anything, find the first failure mode, and apply one change at a time, structure first, then a targeted instruction, then a tool if instructions alone fall short. This explainer is narrated by Liam, in for Bear, and is part of the Claude prompting series from Humanitarians AI.
