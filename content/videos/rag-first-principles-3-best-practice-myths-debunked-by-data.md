---
title: "RAG First Principles: 3 Best-Practice Myths Debunked by Data"
seoTitle: "RAG Best Practice Myths Debunked by Data"
description: "Measuring a RAG pipeline built from scratch on 600 financial disclosures reveals three results that contradict standard retrieval advice."
summary: "Building and measuring a RAG pipeline on 600 financial disclosures shows a smaller embedding model, mean pooling loss, and equal-weight hybrid search all breaking the standard advice."
keywords: ["rag pipeline built from scratch", "384 vs 768 dimension embedding model", "mean pooling information loss", "hybrid search equal weight fails", "chunk overlap step size explained", "hit rate vs mrr retrieval metrics", "vector search latency breakdown", "bge model vs mpnet retrieval"]
generated: "article"
---

Most explanations of retrieval-augmented generation show you a diagram: chunk, embed, retrieve, generate. This walkthrough shows the measurements instead, building a RAG pipeline from scratch over 600 financial disclosures, earnings reports, risk factors, merger terms, and surfacing three results that directly contradict the field's standard advice.

## The problem RAG solves, stated precisely

The starting scenario is concrete: someone asks what a bank's estimated merger cost synergies are. A language model can't answer from a set of documents it was never trained on, and you can't paste 600 disclosures into a single prompt without blowing the context window and paying for every token in it. The fix is finding the three most relevant pieces of text and putting only those into the prompt, which is the entire job RAG exists to do.

## Chunking: the detail that actually matters

Documents get cut into chunks before anything else happens, and the naive version of this is a short piece of code. The detail that matters most isn't chunk size, it's step size, which is chunk size minus overlap. That subtraction is what makes consecutive chunks overlap instead of sitting edge to edge, and the overlap exists for one reason: so a fact that lands on a chunk boundary doesn't get cut in half. A fixed-size splitter is blind to this; it cuts at a fixed character count whether that lands on a sentence end or in the middle of a word. Recursive splitting instead tries paragraphs first, then lines, then sentences, then words, which produces more chunks for the same settings because it stops at natural boundaries instead of packing text to the limit. In practice, chunk size behaves as a ceiling, not a target, since real documents mix short headers with long paragraphs.

## The financial token tax

Before a model reads a chunk, the text becomes tokens, subword units drawn from a fixed vocabulary. A plain sentence like "the cat sat on a mat" tokenizes into six tokens because every word is already in the vocabulary. The same character count of financial text tokenizes far less efficiently. EBITDA alone becomes 13 tokens because the word fractures, and numbers shred the same way. Financial text tokenizes two to three times less efficiently than plain prose, which directly affects cost, context limits, and the risk of silent truncation once a chunk exceeds a model's token limit.

## Surprising result 1: a smaller embedding model won

The transformer produces one vector per token, not one vector per chunk, so a seven-token chunk produces seven vectors. Mean pooling averages all of those into a single vector, in this case 384 numbers, that stands in for the entire chunk. Against that backdrop, the first surprising result is that a 384-dimension BGE model beat a 768-dimension MPNet model, 88 percent hit rate versus 76 percent, while using half the storage and building three times faster. Dimension count turns out to be a capacity ceiling, not a quality guarantee. What actually mattered was the training objective: BGE is trained specifically for retrieval using hard negatives, while MPNet is a general-purpose similarity model.

## Surprising result 2: mean pooling quietly destroys information

Batching matters for speed, embedding 64 chunks as one batch multiply took roughly a millisecond, twelve times faster than 64 separate multiplications, because the weight matrix loads from memory once and gets reused across all 64 rows rather than because there's less arithmetic. But batch size has a ceiling: a batch of 8 was fastest, while a batch of 128 was slower, because chunks of different lengths all have to pad to the length of the longest one in the batch, and a majority of a short chunk's compute can end up being padding that gets calculated and then thrown away.

The deeper finding is about mean pooling itself. Testing the same fact, "the cost synergies are 22 million," embedded inside surrounding text of different lengths shows cosine similarity dropping from 0.73 at 53 characters of surrounding filler to 0.47 at 1,300 characters, a 35 percent drop, even though the fact itself is present word for word in every version. The averaging step dilutes the signal as filler grows around it. The reason retrieval still works despite this is that the vector isn't the content, it's an address, closer to a card catalog entry than the book itself. The raw text sits untouched next to the vector, and the language model reads that raw text, not the vector, so pooling dilution hurts retrieval, not the final answer, as long as retrieval still finds the right chunk.

## A real bug worth knowing about

One structural detail surfaced in testing: a partition operation used to find the top K results guarantees the K largest values land in the last K slots, but it does not sort them against each other. Left unsorted, results come back in ascending order, worst first, which can look completely fine until someone actually checks the numbers. The fix is a single extra sort step applied only to those K results.

## Surprising result 3: equal-weight hybrid search made things worse

Two metrics matter for evaluating retrieval quality: hit rate at K, a binary measure of whether the right document appeared anywhere in the top K results, and MRR, which scores how high the right document ranked, a full point for rank one, a half point for rank two, a third for rank three. Fixed and recursive chunking both hit 100 percent on hit rate, but recursive chunking placed the answer at rank one every time, while fixed chunking buried it at rank two twice, a difference hit rate alone completely hides.

That distinction sets up the third surprising result. Combining dense embeddings with BM25 keyword search at equal weight is standard advice, based on the assumption that their failure modes are complementary. In this test, dense-only retrieval scored 76 percent, BM25-only scored 84 percent, and equal-weight hybrid search scored 80 percent, worse than BM25 alone. Averaging a weaker signal with a stronger one drags the stronger one down. Weighting the combination correctly instead, favoring dense embeddings appropriately rather than splitting evenly, pushed MRR to 0.810, the best result of the whole project. The mechanism matters here: hit rate stayed flat at 84 percent as dense weight increased from 0 to 0.3, while MRR climbed from 0.75 to 0.81. Dense retrieval wasn't finding new documents, it was reordering the ones BM25 already found, contributing ranking signal rather than additional recall.

## Where the time actually goes

A full latency breakdown reframes where optimization effort should go: embedding the query takes about 40 milliseconds, vector search itself takes about 4 milliseconds, two-tenths of one percent of total latency, ranking takes about 300 milliseconds, and generation takes about 1,300 milliseconds, 320 times the cost of the search step. A cache hit, by contrast, takes about two microseconds, roughly 800,000 times faster than a cold request because it skips the pipeline entirely. The recommended optimization order follows directly from these numbers: cache first, exact match, then semantic match, then route easy queries to a cheaper model, then trim the retrieved context, and only then worry about the vector math, which is the last thing worth touching, not the first.

At larger scale, brute-force comparison against every stored vector eventually breaks down; at 10 million vectors it becomes impractical. Approximate nearest neighbor methods fix that. HNSW builds a layered proximity graph, sparse at the top for long jumps across the space and dense at the bottom for precision, giving logarithmic rather than linear search time. IVF instead uses k-means-style routing, partitioning the vector space and searching only the nearest partition to a query.

## Key takeaways

- Chunking overlap (chunk size minus step size) prevents facts from being split across a chunk boundary; recursive splitting that respects natural text boundaries beats naive fixed-size splitting.
- A smaller, retrieval-trained embedding model (384-dimension BGE) can outperform a larger, general-purpose one (768-dimension MPNet) with less storage and faster build time.
- Mean pooling dilutes a fact's signal as surrounding filler text grows, even though the retrieved raw text (not the vector) is what the language model ultimately reads.
- Equal-weight hybrid search can score worse than the better of its two components alone; correctly weighting dense and keyword search instead produced the best result in the project.
- Vector search itself is a tiny fraction of total latency; caching, then exact and semantic matching, then model routing, deliver far more speed improvement than optimizing the vector math.

## Try it yourself

Point this same pipeline at your own corpus, sweep the hybrid weight from 0 to 1 against your own validation set, and read where MRR actually peaks rather than assuming it will land at the commonly cited default. This masterclass for the RAG First Principles project comes from the Humanitarians AI Fellows program, presented by Liam on behalf of Ameya Deshmukh.
