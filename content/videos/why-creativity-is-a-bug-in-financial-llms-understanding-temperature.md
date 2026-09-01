---
title: "Why Creativity is a Bug in Financial LLMs (Understanding Temperature)"
seoTitle: "LLM Temperature Explained for Financial Data"
description: "Anjana explains why running the same LLM prompt three times can give three different answers, and how the temperature setting decides whether that happens."
summary: "Temperature is the single dial that decides whether an LLM gives you the same answer every time or a different one, and in financial extraction that difference is everything."
keywords: ["llm temperature explained", "what is temperature in llm", "financial llm hallucination fix", "self consistency voting llm", "token probability distribution ai", "deterministic llm output settings", "llm sampling settings finance", "why llm gives different answers"]
generated: "article"
---

Run the exact same prompt through the exact same model three separate times and you might expect the exact same answer back. Often you don't, and the reason isn't randomness in some vague sense, it's a single, specific, adjustable number: temperature.

## The mystery of changing outputs

Feed a large language model the same earnings call quote three times, using the same model and the same prompt, and it's entirely possible to get three different answers each time. That inconsistency isn't a bug in the traditional sense or a sign the model is broken. It's the direct, predictable result of one setting: temperature. Understanding what that dial actually controls explains why the same input can produce different outputs, and why that matters enormously depending on what the output is being used for.

## What temperature controls

Temperature governs how much randomness the model introduces when selecting its next token. At a temperature of zero, the model behaves deterministically: it picks the single most likely next token every single time, which means the same input reliably produces the same output. As temperature rises to around 0.5, the model considers a wider range of possible tokens, introducing some variation while still staying reasonably close to the most probable answer. Push temperature up to 1.0 and the underlying probability distribution flattens out considerably, giving rare, less likely tokens a real chance of being selected. That's what people usually mean when they say a model is being "creative": at high temperature, it's more willing to wander away from the statistically safest choice.

## Watching it happen on a real financial quote

The clearest illustration of this comes from running the same earnings quote at all three temperature settings. At temperature zero, the model consistently reports the earnings guidance as "maintained," with a stated confidence of 0.71, and running the same prompt again and again produces the identical answer every time. It's locked. At 0.5, the model says "maintained" on two of three runs and "raised" once, meaning two out of three agree but the third introduces disagreement. At 1.0, the model produces three different answers across three runs: raised, maintained, and lowered. None of those three outcomes can be trusted individually, because there's no way to know which run, if any, reflects the actual guidance in the source material.

## Why this distinction matters specifically in finance

In creative writing, that kind of variability is a feature. A model that takes an unexpected path through language can produce more interesting prose. In financial extraction, though, that same variability is not creativity, it's a hallucination risk. If a system is meant to extract a concrete fact from an earnings call, whether guidance was raised, maintained, or lowered, then getting a different answer each time the same input is processed means the system cannot be relied upon to report facts accurately. This is exactly why financial extraction systems are typically run at low temperature: the goal is not variety in the output, it's a stable, repeatable answer that matches the true content of the source document every time.

## Self-consistency voting as a safeguard

Beyond simply lowering temperature, there's a second technique worth understanding: self-consistency decoding. This approach runs the same prompt multiple times and then votes across the resulting outputs. The underlying logic is straightforward: if a model cannot agree with itself across repeated runs on the same input, that's a signal the answer isn't stable enough to be trusted as a single, confident output. Voting across multiple runs surfaces that instability directly, rather than quietly accepting whichever single answer happened to come out first.

## The one-dial takeaway

Temperature is one number, but it fundamentally decides whether a model behaves like a source of consistent, repeatable facts or a source of varied, creative output. Creativity has its place, particularly in tasks like fiction writing where an unexpected turn of phrase is valuable. But for financial extraction, where an incorrect or inconsistent read on a company's guidance carries real consequences, the priority has to be consistency, not creativity.

## Key takeaways

- Temperature controls how randomly an LLM samples its next token, ranging from fully deterministic at zero to highly varied at 1.0.
- At temperature zero, the same prompt reliably produces the same output every time, which is essential for factual extraction tasks.
- At temperature 1.0, the same earnings quote produced three different answers across three runs, none of which could be trusted individually.
- In financial extraction contexts, output variability functions as a hallucination risk rather than useful creativity.
- Self-consistency voting, running the same prompt multiple times and comparing the results, helps surface when a model's answer isn't stable enough to trust.

## Try it yourself

Anyone building a pipeline that depends on an LLM producing the same answer for the same input should check what temperature and sampling settings their system is actually running. This walkthrough comes from Anjana as part of Humanitarians AI Fellows content on the mathematics behind LLM behavior.

## Frequently asked questions

**What should I do if I don't know what temperature my own pipeline is using?** Start by identifying your current temperature and sampling settings, then decide whether your task needs consistency or creativity, and if the setting is mismatched, consider lowering temperature or adding self-consistency voting, where the same prompt is run multiple times and the results are compared.

**Why does a higher temperature cause hallucinations in financial tasks specifically?** Because financial extraction requires a single correct answer drawn from the source material, and a flattened probability distribution at high temperature lets the model select less likely, and potentially incorrect, tokens instead of consistently reproducing the fact stated in the source.
