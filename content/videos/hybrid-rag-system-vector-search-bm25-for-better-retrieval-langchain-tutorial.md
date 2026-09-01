---
title: "Hybrid RAG System: Vector Search + BM25 for Better Retrieval | LangChain Tutorial | Humanitarians AI"
seoTitle: "Hybrid RAG: Vector Search + BM25 Tutorial"
description: "A LangChain tutorial building a hybrid RAG system that combines ChromaDB vector search with BM25 keyword retrieval for more accurate answers."
summary: "Vector search alone can miss exact terminology, and keyword search alone can miss meaning. This tutorial builds a hybrid retriever that combines both using LangChain, ChromaDB, and Groq's Llama 3.3 70B."
keywords: ["hybrid rag vector search bm25", "langchain ensemble retriever tutorial", "chromadb huggingface embeddings setup", "bm25 keyword retrieval python", "groq llama 3.3 70b rag", "recursive character text splitter chunk size", "weighted ensemble retriever langchain", "semantic search vs keyword search rag"]
generated: "article"
---

Pure vector search is great at understanding meaning and terrible at catching exact terms it has never seen phrased that way before. Pure keyword search is the opposite: it nails literal matches and misses anything conceptually related but worded differently. A hybrid retrieval system solves this by running both approaches at once and combining what they find, and this tutorial builds one from scratch using LangChain, ChromaDB, and Groq's Llama 3.3 70B.

## The architecture: two retrievers in parallel

When a query comes in, it does not go through a single search path. It passes through two retrievers simultaneously. The first performs vector search using ChromaDB to find content that is semantically similar to the query, even if the wording differs. The second uses the BM25 algorithm, a probabilistic ranking function built for keyword-based matching, to catch exact term matches that vector search alone might miss. An ensemble retriever then combines the results from both methods and passes the top-ranked documents to the language model to generate the final answer.

## Preparing the documents

Before either retriever can run, the source material needs to be chunked properly. The example here uses MLOps content covering topics like model deployment, monitoring, and feature stores. The text is processed with a recursive character text splitter set to a 350-character chunk size, which keeps chunks small enough for precise retrieval while still preserving enough context to be useful. Each chunk becomes a LangChain document object with metadata attached for tracking.

## Setting up the vector retriever

The vector side uses the all-MiniLM sentence transformers model, chosen because it is efficient and produces good-quality embeddings without heavy compute requirements. A ChromaDB vector store is created by passing in the documents and the embedding model, and that vector store is then configured as a retriever with k set to 3, meaning it returns the top three most similar documents for any given query.

## Setting up the BM25 retriever

The keyword side is initialized directly from the same set of documents, also with k set to 3. BM25 excels at finding exact terminology matches that pure vector search can overlook, which matters a lot for technical or domain-specific content where precise terms carry real weight. The ensemble retriever combines both retrievers with weights of 0.5 each, giving semantic and keyword-based results equal influence by default. Those weights are adjustable, and technical documentation in particular might benefit from leaning more heavily toward BM25.

## Building the QA agent

With retrieval in place, the QA agent function takes a query, retrieves chunks from the ensemble retriever, and constructs a prompt that includes all the relevant retrieved information before sending it to the language model. This example uses Groq's Llama 3.3 70B for fast inference. The prompt explicitly instructs the model to answer based only on the provided documents, which is the key guardrail against hallucination: the model is not allowed to reach for outside knowledge, only what the retriever actually surfaced.

## Seeing it work

Running a test query through the hybrid retriever shows both retrievers firing, combining their results, and returning the most relevant chunks, in this case content about explainability and interpretability techniques. The generated answer is accurate and drawn directly from the knowledge base, which is the whole point: the combination of vector and keyword search produces more robust retrieval than either method would on its own.

## Key takeaways

- A hybrid RAG system runs vector search and BM25 keyword search in parallel, then combines their outputs through an ensemble retriever.
- Vector search catches semantic similarity; BM25 catches exact terminology, and together they cover more of the query space than either alone.
- Chunking with a recursive character text splitter at a 350-character size balances context retention against retrieval precision.
- The ensemble retriever's weights, 0.5/0.5 by default, are adjustable, and technical documentation can benefit from weighting BM25 higher.
- Instructing the language model to answer only from retrieved documents is what keeps the system from hallucinating.
- Next steps for improving the system include experimenting with different weight configurations or adding a re-ranking layer.

## Who this is for

This tutorial is for developers building retrieval systems for enterprise search, documentation Q&A, or technical support bots, where both conceptual understanding and exact-term matching matter. It fits well alongside Humanitarians AI's other applied machine learning tutorials for anyone working hands-on with LangChain and vector databases.
