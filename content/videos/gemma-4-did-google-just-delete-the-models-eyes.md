---
title: "Gemma 4: Did Google Just Delete the Model's Eyes?"
seoTitle: "Gemma 4: Did Google Delete the Model's Eyes?"
description: "Ritik Bompilwar examines Gemma 4 12B, which replaces a 550M-parameter vision encoder with one matrix multiply, and finds the ablation Google never ran."
summary: "Ritik Bompilwar breaks down how Gemma 4 12B strips out its vision and audio encoders, and finds that Google never ran the one experiment that would prove efficiency didn't cost accuracy."
keywords: ["gemma 4 12b vision encoder", "google gemma 4 technical report", "encoder free multimodal model", "gemma 4 audio encoder removed", "platonic representation hypothesis ai", "gemma 4 benchmark analysis", "multimodal model ablation study", "gemma 4 mmb pro word error rate"]
generated: "article"
---

Somewhere in Google's Gemma 4 technical report is a single design decision worth pulling apart: the model reasons about images and sound with almost no dedicated perception hardware in front of it. That's the claim Ritik Bompilwar investigates here, tracing exactly what got removed, what replaced it, what the benchmarks say, and, most importantly, the experiment the report never actually runs.

## How multimodal models used to be built

Until this spring, building a multimodal model meant assembling three specialists trained separately: a vision transformer to see, a conformer to hear, and a tokenizer for text. Each piece was trained on its own, frozen, and then bolted onto the front of a language model that did the actual reasoning. Gemma 4 shipped in April built exactly that way, with four models following the specialist pattern. Two months later, Google shipped a fifth model that broke from it entirely.

## What got deleted

Gemma 4 12B takes raw 48-by-48 pixel patches directly and replaces what had been a 550-million-parameter vision encoder with a single matrix multiplication using just 35 million parameters, a 94% reduction in the size of the "seeing" apparatus. Audio went further still. Rather than being shrunk, the audio encoder was removed entirely. Raw 16kHz sound is sliced into 40-millisecond frames and projected directly into the same embedding space the model's word tokens live in, with no dedicated audio encoder at all. Google's stated justification for the change is not accuracy but latency and memory: a lighter, faster architecture, with the accuracy question addressed separately.

## What the benchmarks actually show

On MMB Pro, a vision benchmark, the encoder-free 12B model scores 69.1, compared to 73.8 for a 26B model and 76.9 for a 31B model with traditional encoders. By that measure, the smaller encoder-free model loses. But on speech recognition, its word error rate comes in at 0.067, against 0.075 and 0.090 for the two larger models, meaning it wins on that metric. Both comparisons, taken at face value, are misleading. The vision comparison pits 12 billion parameters against 31 billion parameters, not encoders against no encoders. The audio comparison pits 12 billion parameters against a much smaller 4.5-billion-parameter model. In both cases, two variables are moving at once: model size and encoder architecture. That makes it impossible to isolate whether the encoder-free approach itself is responsible for the difference in either direction.

## The missing experiment

The specific test that would resolve the question is one that holds model size fixed while toggling the presence or absence of an encoder. That ablation does not appear anywhere in the technical report. Without it, there's no way to know whether Gemma 4 12B's vision results would look different with an encoder added back in at the same overall parameter count, or whether its audio results would hold up if compared against a same-size model that still used a dedicated encoder.

## The verdict, in three parts

The analysis lands on three separate claims rather than one single conclusion. The deletion of the vision and audio encoders is real. The efficiency gain, one architecture trainable end to end rather than stitched together from frozen specialist pieces, is also real. But parity with encoder-based models remains unproven. Google's own language in the report describes the model as performing "near" the larger 26B model at under half the memory, and "near" is doing a lot of work in that sentence, given that it's still being compared against a model of a meaningfully different size.

## Not the same thing as unified generation and understanding

One clarification the video is careful to draw is the difference between what Gemma 4 does and a separate, often-conflated trend called encoder convergence, where perception folds directly into the decoder. That is not the same as unifying generation and discrimination into a single architecture. Gemma 4 only emits text; there is no image-generation head attached to it. Models that genuinely unify making and judging, cited by name, include Chameleon, Emu3, Show-1, Transfusion, Janus, and Bagel. The broader theoretical idea underneath that separate trend is the platonic representation hypothesis, which the video notes is itself contested rather than settled.

## Key takeaways

- Gemma 4 12B replaces a 550M-parameter vision encoder with a single 35M-parameter matrix multiply, a roughly 94% reduction in vision-processing parameters.
- The audio encoder was removed entirely; raw audio is sliced into 40ms frames and projected straight into the word-embedding space.
- Google's stated reason for the change is latency and memory efficiency, not improved accuracy.
- Benchmark comparisons in the report confound model size and encoder architecture, since the encoder-free model is compared against differently-sized models on both vision and audio tasks.
- The ablation that would isolate the encoder's true effect, holding model size fixed while toggling the encoder, does not appear in the technical report.
- Gemma 4's architecture change is distinct from encoder convergence and the platonic representation hypothesis, since it only emits text and has no image-generation head.

## Try it yourself

The video ends with a direct challenge: read the Gemma 4 technical report yourself and look for the fixed-size, encoder-toggle ablation described here. This kind of close technical scrutiny is part of the work coming out of the Popper track within Humanitarians AI Fellows, which applies computational skepticism to claims made about AI systems.
