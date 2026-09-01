---
title: "RAG Explained by Rishika: Open-Book vs. Closed-Book AI"
seoTitle: "RAG Explained: Open-Book vs Closed-Book AI"
description: "A clear breakdown of retrieval-augmented generation using a closed-book versus open-book test analogy, covering embeddings, hallucinations, and limits."
summary: "Why language models guess when they should look things up, and how retrieval-augmented generation hands them the right page before they answer."
keywords: ["retrieval augmented generation explained", "why do language models hallucinate", "open book vs closed book ai test", "vector embeddings nearest neighbor search", "how RAG reduces ai hallucinations", "keep ai model updated without retraining", "grounded ai answers vs memory", "RAG limitations explained", "vector database for language models"]
generated: "article"
---

Ask a language model something outside its training data and it rarely says "I don't know." It guesses, confidently, and that confident guess is what gets called a hallucination. The question worth asking is why a model would guess at all instead of just checking. The answer is that, by default, it can't check anything. It's taking every test with the book closed.

Retrieval-augmented generation, or RAG, is the fix, and the closed-book versus open-book analogy explains it better than most technical descriptions do.

## The closed-book problem

A language model's training data is frozen at some cutoff date. Ask it about anything that happened after that point, or anything simply outside what it learned, and it doesn't have a page to flip to. It answers from memory the way a student would on a closed-book exam: filling in what seems plausible even when they're not sure. That's the mechanism behind a hallucination. It isn't the model lying; it's the model doing the only thing it can do when there's no source in front of it.

## Opening the book

RAG changes the test from closed-book to open-book. Instead of trusting the model's memory alone, the system hands it the right documents right when it needs them. A question comes in, and rather than going straight to the model, it first goes out to a knowledge base: a set of documents indexed in advance, ready to be searched.

## How retrieval actually works

Under the hood, this search runs on embeddings. Both the question and every document in the knowledge base get converted into a point in a high-dimensional space. The system then finds the documents whose points sit nearest to the question's point, essentially a nearest-neighbor search. Those nearby documents, the ones judged most relevant, get handed to the model as context. The model then answers from that retrieved material rather than pulling purely from what it memorized during training.

## Why this is worth the extra step

The payoff is that answers become grounded in real, checkable pages instead of memory alone. Hallucinations drop because the model is reading rather than guessing. There's also a practical advantage that has nothing to do with accuracy on any single question: when the underlying knowledge changes, you update a document in the knowledge base. You don't retrain the model. Swapping a page is a fraction of the cost and effort of retraining a language model from scratch, which is what makes RAG one of the more efficient ways to keep an AI system current.

## One honest limit

RAG is only as good as the book it's handed. Feed it an incomplete or inaccurate set of documents, and it hands back a bad answer, dressed up to look grounded because it's citing something. That's arguably worse than an obvious guess, because a wrong answer sourced from a real document looks more trustworthy than an unsourced one. RAG doesn't make a model smarter. It makes it better informed, and that improvement depends entirely on the quality of the material it's given to read.

## Key takeaways

- A language model without retrieval is stuck answering from frozen training data, which is why it hallucinates on anything outside that data.
- Retrieval-augmented generation hands the model relevant documents at the moment it needs to answer, rather than relying on memory alone.
- Retrieval works through embeddings: the question and every document become points in space, and the system pulls the nearest ones.
- Updating a RAG system means updating its documents, not retraining the underlying model, which is far cheaper and faster.
- RAG only improves answers if the underlying knowledge base is accurate and complete; a bad book still produces a bad answer.

## Who this is for

This explanation comes from Rishika, a Humanitarians AI Fellow, as part of the Humanitarians AI Fellows series breaking down core AI concepts in plain language. It's a good starting point for anyone building or evaluating a system that pairs a language model with a search or document index and wants to understand what that pairing is actually doing under the hood.
