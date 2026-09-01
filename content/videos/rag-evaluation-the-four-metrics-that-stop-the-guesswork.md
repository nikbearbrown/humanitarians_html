---
title: "RAG Evaluation: The Four Metrics That Stop the Guesswork"
seoTitle: "RAG Evaluation: 4 Metrics That Find the Bug"
description: "Learn the four metrics that pinpoint whether a RAG pipeline failed at retrieval or generation, so you fix the right stage instead of guessing."
summary: "Muskan explains how to grade retrieval and generation separately in a RAG pipeline using recall, precision, answer relevance, and faithfulness."
keywords: ["rag evaluation metrics", "recall vs precision rag", "answer relevance and faithfulness", "llm as a judge rag", "debugging rag pipeline", "retrieval augmented generation evaluation", "rag chunking embeddings fix", "grading retrieval and generation separately"]
generated: "article"
---

Your RAG app gave a wrong answer. Was it the retrieval step that pulled the wrong context, or the generation step that misused good context? Without a way to measure each stage separately, fixing that bug turns into guesswork, and guessing which half is broken is how a week gets spent fixing the wrong stage.

## Two stages, two failure points

A RAG pipeline has a simple shape: a question goes in, retrieval finds the chunks it thinks are relevant, and generation writes an answer from those chunks. That means there are two distinct places things can go wrong, and the only way to know which one failed is to grade them separately rather than judging the pipeline as a single black box.

## Grading retrieval: recall and precision

Retrieval gets graded with two numbers. Recall asks: of all the chunks that were actually relevant to the question, how many did the system retrieve? Miss some of them, and the answer can't possibly be complete, no matter how good the generation step is. Precision asks the opposite question: of the chunks the system did retrieve, how many were actually relevant? Pull in junk alongside the good chunks, and you distract the model with noise. Both numbers require a labeled set of correct answers to compare against.

## Grading generation: answer relevance and faithfulness

Once retrieval has been scored, generation gets its own two numbers. Answer relevance asks whether the generated answer actually addresses the question that was asked. Faithfulness asks whether every claim in the answer is backed by the retrieved context, or whether the model invented something that wasn't actually there. These two scores are usually judged by a second model acting as an LLM judge, since they require reading and comparing text rather than counting overlapping items.

## Letting the low number point you to the fix

The payoff of grading these four numbers separately is that whichever number drops tells you exactly where to look. Low recall or precision means the context itself was wrong, which points you toward fixing the chunking strategy, the embeddings, or how many chunks you're pulling per query. Low relevance or faithfulness means the context was fine but the answer wasn't, which points you toward fixing the prompt or the model doing the generation. That distinction turns a vague "the RAG app is wrong somewhere" into a specific, actionable diagnosis.

## Key takeaways

- RAG pipelines fail in two distinct stages, retrieval and generation, and each needs its own metrics.
- Recall measures how many relevant chunks were retrieved; precision measures how many retrieved chunks were actually relevant.
- Answer relevance measures whether the response addresses the question; faithfulness measures whether every claim is backed by retrieved context.
- Generation metrics are typically scored by a second model acting as an LLM judge.
- A low retrieval score points to fixing chunking, embeddings, or retrieval count; a low generation score points to fixing the prompt or model.
- Run all four metrics on your own RAG pipeline before making any changes, so the low number tells you where to look.

## Who this is for

This is for anyone building or maintaining a RAG application who has hit a wrong answer and doesn't know whether the bug is in retrieval or generation. It comes from the Humanitarians AI Fellows program, where Fellows document practical frameworks like this one for debugging real AI pipelines.
