---
title: "Building AI News Monitoring Agent with n8n & FastAPI | Mycroft | Nerd Stuff with Humanitarians AI"
seoTitle: "AI News Monitoring Agent with n8n and FastAPI"
description: "A look inside the Mycroft News Monitoring Agent, a production system processing nearly 2,000 articles a day using n8n, FastAPI, FinBERT, and Qdrant."
summary: "The Mycroft News Monitoring Agent processes nearly 2,000 news articles a day through a hybrid n8n and FastAPI architecture, and this walkthrough covers how the pipeline, models, and vector database actually fit together."
keywords: ["n8n fastapi hybrid architecture", "mycroft news monitoring agent", "finbert sentiment analysis self hosted", "qdrant vs pgvector for rag", "rss feed parser python feedparser", "fastapi lifespan model loading", "n8n workflow orchestration ml pipeline", "dual embedding gemini huggingface finlang"]
generated: "article"
---

Monitoring, analyzing, and extracting insight from nearly 2,000 news articles a day is not something you do by hand, and building an automated pipeline for it surfaces a real architectural question: where should the workflow logic live, and where should the actual machine learning processing happen? The Mycroft News Monitoring Agent, part of the open-source Mycroft framework for AI-powered investment analysis, answers that with a hybrid approach combining n8n for orchestration and FastAPI microservices for the heavy Python-based ML work.

## A few terms worth knowing first

An RSS feed, short for really simple syndication, is a web feed format that lets automated systems check for website updates, effectively a machine-readable subscription to new content. FinBERT is a natural language processing model fine-tuned specifically on financial text for sentiment analysis, built on the BERT architecture but trained to understand financial context, so it recognizes what terms like bearish or volatility actually signal for markets. Embeddings are numerical vector representations of text that capture semantic meaning, turning words into something a computer can compare mathematically. RAG, or retrieval augmented generation, combines database retrieval with AI generation so the system fetches real data before generating a response instead of relying on the model to recall facts from memory. A vector database stores and searches those embeddings by similarity rather than exact keyword matches, closer to finding related concepts than finding literal text.

## Why split the work between n8n and FastAPI

The processing pipeline follows a consistent shape: ingest news from multiple sources, deduplicate to remove redundant articles, analyze sentiment and generate embeddings, then store everything and make it queryable through a RAG interface. n8n handles the orchestration layer because it gives visual, easily debuggable workflows, while FastAPI handles the parts that genuinely need Python, since it can run the ML models and heavier processing that a visual workflow tool is not built for. n8n's schedule trigger runs the whole ingestion cycle every 20 minutes, which keeps updates close to real time without overloading either the news sources or the databases.

## Fetching and parsing RSS at scale

The actual RSS fetching is handled by the FastAPI service rather than n8n directly, called through HTTP request nodes. That choice comes down to Python's feedparser package, which makes parsing the wildly inconsistent formats of real-world RSS feeds trivial. Different XML structures, namespaces, and encoding quirks all get handled automatically. The fetch endpoint aggregates feeds from sources like TechCrunch and VentureBeat and others, and a separate parse endpoint then extracts and normalizes the article content, since raw feeds arrive with inconsistent fields, some carrying full article text and others just short snippets. The parse endpoint returns standardized fields regardless of the source: title, content, source, publish date, and URL.

## Sentiment analysis and dual embeddings

Once articles are normalized, sentiment analysis runs through a FastAPI endpoint that processes the article content using the self-hosted FinBERT model. For embeddings, two models run side by side as a deliberate experiment rather than pure redundancy: Google's Gemini API using the text-embedding-004 model, and HuggingFace's FinLang model. The comparison is meant to answer a specific question, which model gives better retrieval results for financial and tech news and which one captures domain-specific terminology more accurately, with those performance comparisons planned for a future video. Both embedding calls happen directly from n8n, since they are already optimized API services that do not need FastAPI's heavier processing layer.

## Why Qdrant over PGVector

All processed data, including the embeddings, gets stored in Qdrant, a vector database chosen deliberately over PGVector. Qdrant stores not just the embedding vectors but the full article metadata alongside them, the article text, sentiment scores, timestamps, and source information. The advantage that matters most in production is that n8n's RAG implementation works seamlessly with Qdrant's metadata filtering, so querying articles from a specific date range or with particular sentiment scores becomes straightforward inside the n8n workflow itself.

## Tracking real production metrics

Every stage of processing gets measured, and three metrics matter most in practice: ingestion rate, the number of articles pulled into the pipeline; signal percentage, the share of unique articles that actually make it through processing; and loss percentage, the share of articles that error out due to paywalls, anti-scraping measures, or similar obstacles. The system currently faces an 81% deduplication challenge, meaning a large share of incoming articles are redundant and get filtered out before reaching sentiment analysis and embedding.

## Self-hosting models without killing performance

Self-hosting a model like FinBERT efficiently comes down to lifecycle management rather than anything exotic. FastAPI's lifespan decorator defines an async context manager that loads the model and tokenizer into memory once, at application startup, as global variables that stay resident for every subsequent request. When the application shuts down, those objects are properly deleted to free memory. The payoff is that incoming requests never trigger a cold start, since the model is already loaded and ready, which avoids both the severe slowdown of reloading a model on every request and the memory leaks that come from improper cleanup. This same lifecycle pattern works for any self-hosted HuggingFace model, not just FinBERT.

## Key takeaways

- The Mycroft News Monitoring Agent uses a hybrid architecture: n8n for visual, debuggable workflow orchestration, and FastAPI for the Python-heavy ML processing.
- Python's feedparser package handles the inconsistent XML structures, namespaces, and encoding of real-world RSS feeds automatically.
- FinBERT is BERT fine-tuned specifically on financial text, letting it correctly interpret financial-context terms like bearish or volatility.
- Two embedding models, Gemini's text-embedding-004 and HuggingFace's FinLang, run in parallel as a deliberate comparison rather than for redundancy alone.
- Qdrant was chosen over PGVector specifically because its metadata filtering integrates seamlessly with n8n's RAG implementation.
- FastAPI's lifespan decorator loads a model into memory once at startup, eliminating cold starts and avoiding memory leaks from repeated loading.
- Deduplication currently removes 81% of incoming articles, tracked alongside ingestion rate and loss percentage as the system's core production metrics.

## Who this is for

This is for developers building production-grade ML pipelines who need Python's ML ecosystem alongside a visually debuggable orchestration layer, and for anyone curious how a real system handles self-hosted models, dual embeddings, and vector search at scale. The full code and setup documentation are open source as part of the Mycroft framework from Humanitarians AI.
