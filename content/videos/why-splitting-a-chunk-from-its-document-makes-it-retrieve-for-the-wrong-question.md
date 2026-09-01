---
title: "Why splitting a chunk from its document makes it retrieve for the wrong question"
seoTitle: "Why Chunks Retrieve for the Wrong Question in RAG"
description: "A chunk pulled from a document keeps its words but loses its place in the document, and prepending a short summary before embedding fixes that specific failure."
summary: "A medical-paper chunk about mortality with no disease named will match any mortality query, right disease or not; prepending a document summary before embedding fixes exactly that failure."
keywords: ["rag chunk retrieves wrong question", "contextual retrieval prepend summary", "chunk embedding context header", "rag precision improvement technique", "chunking strategy retrieval augmented generation", "ambiguous chunk vector search", "claude cookbooks contextual retrieval", "fix false matches rag pipeline", "document summary before embedding", "rag precision 33 to 90 percent"]
generated: "article"
---

It is tempting to assume a chunk retrieves badly because it was cut too small, but size is not usually the real problem. The actual failure is subtler: a chunk pulled out of a document keeps its own words but loses its place in that document, and that loss of context is enough on its own to make it surface for the wrong question entirely.

## The stakes: a chunk that says too little

Picture a medical paper split into twenty chunks for search. One of them, chunk seven, reads "This treatment reduced mortality by 12%," with no disease named anywhere inside it. The natural assumption is that word-matching search should be enough here. If someone asks a mortality-related question, a chunk about mortality should surface, regardless of which disease it actually concerns.

## Why that assumption breaks

A word-matching search hands that chunk to a query about diabetes mortality purely because the word "mortality" appears in both. The chunk has nothing to do with diabetes, but nothing inside the chunk itself says so, so the search system has no way to know it is retrieving the wrong evidence for the question being asked. The chunk is not wrong about anything; it simply cannot defend itself against a query it was never meant to answer.

## The fix: prepend context before embedding

The solution is to generate a short summary of the whole document and prepend that summary to the chunk before it gets embedded into a vector. Doing this means the resulting vector carries both the chunk's own words and its place within the larger document. An ambiguous phrase like "this treatment reduced mortality by 12%" now resolves against real context, for example a prepended note identifying the document as a "hypertension study in elderly patients," and it stops matching unrelated queries about diabetes.

## The payoff, measured honestly

Across ten test queries run against that same chunk, precision moved from 33% to 90% once the context header was added. That is a real, measurable gain, but it comes with an important caveat: it only shows up because the chunk was genuinely ambiguous to begin with. A chunk that already names its subject clearly gains nothing from the extra context, since there was no ambiguity for the summary to resolve in the first place.

## What this fix does not do

It is worth being precise about the limits here. Prepending document context does not repair a document that was summarized badly, and it does not fix a search system built on a fundamentally broken chunking strategy. This technique addresses one specific failure mode, ambiguous chunks retrieving for the wrong question, rather than acting as a general-purpose fix for retrieval quality.

## Key takeaways

- A chunk pulled from a document keeps its own words but loses its place in that document, which can cause it to match unrelated queries.
- Word-matching search will hand an ambiguous chunk to any query that shares its vocabulary, regardless of whether the topic actually matches.
- Prepending a short document summary to each chunk before embedding lets the resulting vector carry both content and context.
- In a ten-query test, this fix moved precision on an ambiguous chunk from 33% to 90%.
- The gain only applies to chunks that were ambiguous to begin with; it does not fix bad summaries or a broken chunking strategy.

## Try it yourself

If you are building a RAG pipeline and suspect ambiguous chunks are causing false matches, paste this into Claude: "I have a research paper being split into chunks for RAG. A chunk says 'This treatment reduced mortality by 12%' with no disease name in context. Show me how to prepend a context header to each chunk before embedding, what fields should be in that header, and how I'd verify the fix is actually preventing false matches on unrelated queries." This video is part of the Claude Basics series from Humanitarians AI.
