---
title: "Jane Austen Mini-LLM Teaches Us About AI Data Bias"
seoTitle: "Jane Austen Mini-LLM Explains AI Data Bias"
description: "A thought experiment on a language model trained only on Jane Austen's writing shows why AI output is just statistical prediction, not memorization."
summary: "A thought experiment imagines training a small language model only on Jane Austen's writing to explain, in plain terms, why AI output is statistical prediction shaped entirely by its training data, biases included."
keywords: ["jane austen language model thought experiment", "ai training data bias explained", "large language model next word prediction", "midjourney wonder woman bias example", "statistical parrot language model explanation", "closed world ai training data", "prompt engineering closed world model", "ai model out of scope training data"]
generated: "article"
---

Imagine training a language model on nothing but Jane Austen's collected works, no internet, no news, no modern slang, just her novels and letters. What would it write if you asked it to continue a story? This thought experiment is the engine behind a plain-language explanation of how large language models actually work, and why every one of them carries the fingerprints of whatever it was trained on.

## A closed world, not a lookup table

The premise is deliberately narrow: a small language model trained exclusively on Jane Austen's body of work, a closed world by design. The first and most important claim is what such a model would not do. It would not memorize and regurgitate her actual sentences the way a database lookup would. Instead, it would learn her patterns of writing statistically, which words tend to appear near which other words, what phrasing and rhythm recur across her sentences. Ask it to write a story, and it predicts what Austen might plausibly have written based on the statistical structure of her existing corpus, not by retrieving something she actually wrote. That distinction, prediction versus memorization, is the single idea the entire video is built around, and it gets restated from several angles because it is easy to misunderstand.

## What happens when you ask it something outside its world

The clearest way to test a closed-world model is to ask it something it has no basis to answer. A model trained purely on Austen's writing would have no idea what a laptop is, not because it is unintelligent, but because "laptop" simply does not exist anywhere in its training data. That is not a flaw in the model's reasoning; it is a direct consequence of what it was and was not exposed to. Every training dataset has this property. A model can only draw on the statistical patterns present in what it learned from, and anything outside that scope is, functionally, outside its world entirely.

## The Wonder Woman example

To make the abstraction concrete, the video turns to an image generation example. Typing "a photo of Wonder Woman" into Midjourney reliably produces an image resembling Gal Gadot, the actress who played the character in recent films. It does not produce Lynda Carter, who played Wonder Woman decades earlier. That is not because Gal Gadot is objectively "more" Wonder Woman. It is because Midjourney's training data associates the Wonder Woman prompt more strongly with recent film imagery than with the earlier television portrayal, and the model's output reflects that imbalance directly. Ask for a drawing instead of a photo, and the output tends to shift toward a comic-book rendering, again following whatever associations dominate the training data for that particular phrasing. The term "statistical parrots" comes up here as a description some people use for these models, with the acknowledgment that the label undersells how genuinely impressive the prediction quality actually is, even while remaining accurate about the underlying mechanism.

## Bias is built in, not bolted on

The throughline connecting the Austen thought experiment to the Wonder Woman example is that bias is not a bug introduced by carelessness. It is a structural property of any model trained on a finite, non-neutral dataset. A model trained only on Austen inherits her world's vocabulary and assumptions. A model trained on Midjourney's image corpus inherits whichever visual representations were most common in that corpus. Testing a model's grasp of a narrow domain, like asking whether Austen-generated text actually reads like Austen, is described as a job for genuine domain experts: people who know her full body of work well enough to say whether generated text captures her voice or misses it, which is essentially a domain-specific version of a Turing test.

## Restricting a large model to a narrow world

An interesting wrinkle comes when the thought experiment is flipped: what happens if you take a full-scale large language model, trained on internet-wide data, and simply instruct it to restrict itself to Jane Austen's world? You can try this today in Claude, ChatGPT, or another chat assistant by asking it to answer only within Austen's universe. The model will do its best, but the video is candid about the limitation: things will creep in that do not fully belong, because a model trained on the entire internet cannot truly become a closed-world Austen model just by being asked to pretend. It might use vocabulary or ideas from far outside her era, because that knowledge is still sitting in its training data underneath the roleplay instruction. The only way to build a model that would never produce an anachronism like "laptop" is to actually train it, from the ground up, only on data from Austen's own time.

## Personal bias, layered on top of model bias

The video is transparent about a second, more personal layer of bias sitting on top of the model's own: images generated of "what Jane Austen might have looked like" reflect not just Midjourney's training biases toward conventionally attractive, fashion-forward portrayals, but also the presenter's own choices in prompting, since nobody actually knows exactly what Austen looked like beyond a small number of sketches. Choosing a different image model trained on different data would produce a different look entirely, which is offered as a preview of a larger topic, how to choose the right model for a given task, that the video does not have time to fully unpack.

## Why this matters for how you use AI at work

The practical payoff, and the reason this lesson sits inside an upskilling series rather than a purely academic one, is a workplace rule: the output of any language model is only as good as the instructions, meaning the prompt, that shape it, combined with the boundaries of what it was trained on. Understanding that a model predicts rather than recalls, and that its predictions are only as unbiased as its training data allows, is presented as the foundation for using AI tools like ChatGPT, Gemini, or Claude effectively as a high-speed assistant for drafts, data work, and routine tasks, rather than treating its output as neutral fact.

## Key takeaways

- A language model trained only on a narrow dataset, like Jane Austen's works, learns statistical patterns in that data rather than memorizing and repeating exact text.
- Asking such a model something outside its training scope, like what a laptop is, produces no meaningful answer, because that knowledge was never present in its data.
- Midjourney's tendency to render Wonder Woman as Gal Gadot rather than Lynda Carter illustrates how training data imbalance directly shapes model output.
- All training data carries bias; it is a structural feature of any finite dataset, not a fixable defect.
- Instructing a large, internet-trained model to restrict itself to a narrow world, like Austen's, only approximates a true closed-world model, since outside knowledge can still leak through.
- Evaluating whether generated text authentically captures a specific style, like Austen's, requires genuine domain experts, functioning as a specialized version of a Turing test.

## Who this is for

This lesson is part of the Humanitarians AI upskilling series aimed at helping people move past AI jargon and understand, at a practical level, how these models actually behave. It is built for anyone using AI tools like ChatGPT, Gemini, or Claude at work who wants to write better prompts by first understanding why a model's output is shaped entirely by prediction and training data rather than by lookup or true understanding.
