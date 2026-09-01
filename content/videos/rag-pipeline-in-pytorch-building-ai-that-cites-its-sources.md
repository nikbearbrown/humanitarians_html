---
title: "RAG Pipeline in PyTorch: Building AI That Cites Its Sources"
seoTitle: "RAG Pipeline in PyTorch: AI That Cites Sources"
description: "A PyTorch build of retrieval-augmented generation that chunks and embeds a PDF, retrieves with a single matrix multiply, and forces the model to cite its pages."
summary: "Ameya Deshmukh builds a full retrieval-augmented generation pipeline in PyTorch, from chunking a PDF into overlapping passages to retrieving the right ones with a single matrix multiply and forcing the model to cite its sources."
keywords: ["rag pipeline pytorch tutorial", "retrieval augmented generation pytorch", "sentence transformers pdf chunking", "cosine similarity matrix multiply retrieval", "grounding prompt prevent hallucination", "pytorch embed pdf vectors", "page level citation rag", "chunk overlap embedding pdf", "normalize vectors cosine similarity", "build rag from scratch pytorch"]
generated: "article"
---

Ask a language model a question about your own PDF, a contract, a research paper, a policy document, and it tends to do one of two things: admit it does not know, or worse, invent an answer that sounds plausible but has no basis in the actual document. The model never read your file, because it cannot. This build works through exactly how to fix that, constructing a retrieval-augmented generation pipeline in PyTorch that answers questions from a PDF the model has never seen, and cites the page it pulled the answer from.

## Why retrieval beats memory

Retrieval-augmented generation solves the hallucination problem by changing what the model is allowed to rely on. Instead of trusting the model's internal memory, you hand it the exact passages it needs to answer a question and instruct it to answer only from those passages. The core question this build answers is a practical one: how do you find the right passages to hand over in the first place?

## Reading, chunking, and embedding the document

The process starts by reading the PDF and splitting it into overlapping chunks of a few hundred words each. The overlap is not incidental, it keeps a sentence that straddles two chunks from being cut in half and losing meaning in the process. Each chunk is then embedded into a vector using a PyTorch sentence transformer, which produces a tensor with one row per chunk and 384 numbers representing each one. The one step that matters most here is normalization: making every vector exactly length one. Once vectors are normalized, a simple dot product between any two of them becomes equivalent to cosine similarity, which is the trick that makes the retrieval step fast later on.

## Turning meaning into geometry

Once the document is indexed, it stops being text and becomes geometry. Each chunk becomes a point in a high-dimensional space, and passages about similar ideas naturally cluster near each other while unrelated ones drift apart. An index on its own does not answer any questions yet; it just organizes the document's meaning spatially so that the next step, retrieval, can work quickly.

## Retrieving with a single matrix multiply

To answer a question, the question itself is embedded into a vector using the same process as the document chunks, then scored against every chunk at once with a single matrix multiply. Because every vector has already been normalized to unit length, this comparison, the question vector times the transpose of the chunk matrix, directly produces the cosine similarity of the question against every chunk simultaneously. Taking the top four highest-scoring chunks gives the passages that are most likely to actually answer the question, and those become the only context handed to the model.

## The grounding prompt that stops hallucination

The final piece is the instruction given to the model alongside those retrieved passages: answer only from this context, and if the answer is not here, say so. That single instruction is what actually prevents the hallucination problem this build set out to solve. The model is not asked to recall facts from its training; it is asked to read four specific passages and answer strictly from what is in front of it, with the page number it used attached to the answer. That citation is the difference between an answer you have to trust blindly and one you can actually go check yourself.

## What each piece contributes

PyTorch does the heavy lifting of turning text into vectors and finding the nearest ones through a single multiply, but the pipeline as a whole is what makes the result trustworthy. The model never has to memorize the PDF, it only has to read the four passages it is handed and answer from them. Same underlying model, but grounded in evidence you can point to rather than in whatever it happened to learn during training.

## Key takeaways

- RAG fixes hallucination by handing the model specific passages to answer from instead of relying on its internal memory.
- Chunking a PDF with overlapping windows prevents sentences from being split across chunk boundaries.
- Normalizing every embedding vector to unit length turns a simple dot product into cosine similarity, making retrieval fast.
- Retrieval for a new question is a single matrix multiply that scores the question against every chunk simultaneously.
- A grounding prompt that instructs the model to answer only from retrieved context, and say so when it cannot, is what actually prevents hallucination.
- Citing the page a chunk came from turns the model's answer into something a reader can independently verify.

## Try it yourself

Point this pipeline at a PDF you actually care about, a textbook chapter or a research paper, ask it a real question, and check the cited page yourself. Then push on it: raise the number of retrieved chunks and watch the answer get more complete but noisier, or ask something the document does not cover and confirm the model refuses rather than inventing an answer. This build is part of the Humanitarians AI Fellows program.
