---
title: "Anjana's update on FinBERT: Why General AI Fails to Understand the Language of Money"
seoTitle: "FinBERT: Why General AI Fails at Financial Language"
description: "Anjana explains how fine-tuning BERT on 50,000 financial sentences produces FinBERT, a model that reads financial language instead of just words."
summary: "General-purpose models like BERT read everyday English well but stumble on financial language, where the same word can mean opposite things depending on context and what it sits next to."
keywords: ["finbert fine tuning explained", "bert financial sentiment analysis", "financial language nlp model", "fine tune bert on financial sentences", "narrow margin financial terminology", "transformer attention embeddings explained", "specialized vocabulary ai prompts", "bert earnings call analysis"]
generated: "article"
---

BERT reads context beautifully right up until you hand it an earnings call. Anjana's update on the FinBERT project explains why financial language breaks a general-purpose model like BERT, and what it actually takes to fix that gap.

## Why financial English isn't everyday English

BERT is one of the most widely used language models in the world, built to read text and understand context. But financial language doesn't behave like normal English. In everyday language, "exceeded expectations" reads as clearly positive and "significant loss" reads as clearly negative, straightforward stuff. In finance, though, "beat estimates by a narrow margin" is actually cautious language, not celebratory. "Headwinds" has nothing to do with weather. "Adjusted" usually signals that something was removed from a number to make it look better than it otherwise would. The same words carry different weight once money is on the line, and a model trained mainly on general text won't automatically know that.

## Fine-tuning the same architecture on new data

FinBERT's fix isn't a new architecture, it's the same BERT architecture fine-tuned on 50,000 financial sentences pulled from earnings calls, analyst reports, and financial news. The structure of the model stays identical; what changes is the weights. Through this fine-tuning, FinBERT learns that the word "decline" sitting next to "revenue" is negative, but the same word next to "expenses" is positive. It learns the difference between what a word means generally and what it means specifically when money is involved.

## What happens inside the model

Under the hood, a sentence fed into FinBERT gets split into tokens, and each token becomes an embedding, a vector capturing its meaning. The transformer layers then process all of these tokens in parallel: every token attends to every other token at once, rather than reading strictly left to right. The classification head at the end outputs three probabilities. One sentence goes in, three numbers come out, in about ten milliseconds. Same architecture as general BERT, different training data, and as a result, a genuinely different understanding of what the text means.

## Key takeaways

- Financial language redefines ordinary words: "narrow margin," "headwinds," and "adjusted" all carry meanings that diverge from everyday English.
- FinBERT keeps BERT's original architecture and fine-tunes it on 50,000 financial sentences from earnings calls, analyst reports, and financial news.
- The model learns context-dependent meaning, such as "decline" being negative next to revenue but positive next to expenses.
- Tokens become embeddings, and transformer attention lets every token see every other token at once rather than processing left to right.
- FinBERT outputs three probabilities per sentence in about ten milliseconds.

## Try it yourself

Anjana's closing challenge is worth running for your own field: list five phrases where everyday meaning and specialized meaning genuinely diverge, ask honestly whether the gap is wide enough that a general-purpose AI model would get it wrong, and if so, sketch what a small fine-tuning pass or a sharper prompt would need to cover. This kind of financial NLP work is part of the ongoing Mycroft Financial AI project from Humanitarians AI.
