---
title: "Muskan's Update on Vendor Intel Guardrails: Enforcing Instructions in Code"
seoTitle: "Enforcing AI Instructions in Code, Not Prompts"
description: "When a free Neo4j database went down, an AI model ignored its instruction to write unknown, and the fix was a two-layer code check, not a prompt."
summary: "A vendor intelligence pipeline broke silently, and the model wrote confident filler instead of admitting missing data, until code was added to catch and correct it."
keywords: ["ai ignores system instructions", "neo4j free instance deleted idle", "write unknown when data missing", "prompt instruction not guarantee", "code post-processing ai output", "testing ai output both directions", "vendor brief automation guardrails", "confident filler ai hallucination fix"]
generated: "article"
---

An instruction given to an AI model is a request, not a guarantee. That's the lesson Muskan walked away with after a week where her vendor intelligence briefs quietly broke, and the model covered up the failure instead of flagging it.

## The silent failure: how the competitor graph vanished

The vendor briefs Muskan builds rely on a graph of competitor data running on a free Neo4j instance. Free instances get deleted after enough idle time, and that's exactly what happened. One of five agents in the pipeline had been returning nothing, so every brief's competitive section came back empty, silently, with no error thrown anywhere in the system. The fix was straightforward once the problem was found: Muskan rebuilt the graph, restoring 50 companies, eight investors, and the links between them. The AI vendor entries, including the major model providers, populated correctly again once the underlying data was back.

## Confident filler: when AI ignores the "write unknown" rule

The more troubling part wasn't that the database went down. It was what the model did while it was down. The system prompt gave a clear instruction: when data is missing, write "unknown." Instead, the model filled the gap with confident-sounding language, describing a company as "a prominent player in the AI space," a phrase vague enough to apply to almost anyone. The instruction existed. The model had it. And it ignored it anyway. That's the core insight Muskan draws from the episode: a written instruction is a request, not a guarantee, and it cannot be relied on as a safeguard by itself.

## The two-layer solution: code post-processing

Once trust in the instruction alone broke, the fix moved from prompting to code. The new approach runs in two layers. First, the system tells the model upfront exactly which sections have no underlying data, reducing the chance it improvises around a gap. Second, after the brief is written, code checks the output directly and replaces any empty or missing section with a clear "unknown" label. That second layer is what makes the fix reliable: even if the model ignores the instruction again, the output still gets corrected before anyone sees it. The lesson generalizes past this one pipeline. If an outcome matters, it needs to be enforced somewhere the model can't talk its way around it.

## Testing both directions: 17 tests on every push

To lock the fix in place, Muskan built a suite of 17 automated tests that run on every code push. The tests check both directions of the same problem: that the system correctly catches made-up facts when data is missing, and that it doesn't false-alarm by flagging real, legitimate information as unknown. That second direction matters as much as the first. A test that can only ever pass, one that only checks for the failure case and never verifies normal operation still works, is worse than no test at all, because it creates false confidence.

## Why live-credential auditing stays manual

Not everything gets automated. The full brief evaluation needs live credentials to run against real systems, so that step stays a manual, deliberate part of the workflow rather than something folded into the automated test suite. That's a design choice, not an oversight: some checks are worth keeping in human hands even after most of the pipeline has guardrails built in.

## Key takeaways

- A written instruction to an AI model, such as "write unknown when data is missing," is a request the model can and will ignore, not a guarantee of behavior.
- Silent failures, like a free database instance being deleted after idle time, can break a pipeline without throwing any visible error.
- The reliable fix is a two-layer code defense: tell the model what's missing upfront, then verify and correct the output after generation.
- Automated tests should check both false positives and false negatives; a test that only ever passes isn't proving anything.
- Some verification steps, especially those needing live credentials, are worth keeping as deliberate manual checks rather than automating everything.

## Try it yourself

Take one instruction you've given your own AI system, something like "say unknown when you're not sure" or "cite a source." Then ask honestly: did you verify that it actually obeys, or are you just hoping it does? If the answer is hope, add a code-level check that fixes the output when the instruction gets ignored. This kind of post-mortem is part of the regular build-in-public updates coming out of Humanitarians AI's Fellows program on the Mycroft Financial AI project.
