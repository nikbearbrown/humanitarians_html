---
title: "Claude, Chronology."
seoTitle: "Claude chronology skill: dedup events, not a date list"
description: "Explains how Claude's chronology skill collapses duplicate mentions of the same event across documents into one entry, tagged by case theory."
summary: "Explains why a legal chronology built by Claude collapses every mention of the same event into one entry and tags each by relevance to the matter's specific theory."
keywords: ["how does claude chronology skill work", "building a legal case chronology with claude ai", "why a date list double counts the same event", "collapsing duplicate events across legal documents", "claude skill for extracting dated events", "tagging events by significance in a legal matter", "same event different documents one entry", "chronology building for breach of contract case"]
generated: "article"
---

A legal matter draws its facts from a stack of documents: emails, invoices, deposition transcripts, each one mentioning dates on its own. The obvious move is to pull every date out and lay them in order. That approach breaks quietly, because two different documents often describe the exact same event on the exact same day, in different words, and a plain list of every mention counts it twice.

## What chronology building actually does

Chronology building extracts every dated event from the declared sources, then collapses duplicates. However many documents name the same event, it becomes one entry rather than several. Consider a late payment mentioned in an email, restated in an invoice, and described again in a deposition transcript, all pointing to the same day. That's one entry in the chronology, not three. The count of source mentions and the count of chronology entries are different numbers, and conflating them is the mistake a plain date list makes.

## What doesn't change and what does

The event itself, once identified, doesn't change based on how many documents mention it. What does change is the significance tag attached to it. For a matter built on breach of contract, that late payment might be central to the case, tagged high. For a different matter built on a different legal theory, the same payment might barely register, tagged low. A low tag doesn't mean the event is wrong, missing, or unimportant in some absolute sense; it means this particular matter's theory doesn't turn on it.

## Reading the entries correctly

One entry instead of three doesn't mean only one document happened to mention the event. It means every mention pointed at the same underlying occurrence on the same day. This distinction matters when reviewing a chronology built this way: a short entry list isn't evidence of thin documentation, it's evidence of successful deduplication across a document set that may have described the same handful of events many times over.

## Why this matters for how a case gets built

A chronology isn't simply every date in order. It's each event named once, regardless of how many documents mention it, and weighed according to what the specific case is trying to prove. Two matters drawing from an identical stack of documents can produce chronologies that tag the very same events completely differently, because the legal theory driving each matter is different. The chronology serves the argument; it isn't a neutral timeline standing apart from it.

## Trying it yourself

A direct way to see this mechanism work is to paste in the documents a matter draws from, emails, invoices, transcripts, whatever has been produced, and ask Claude to pull every dated event, collapse anything that's really the same event into one entry, and flag which ones actually matter to how the case is argued. Running this exercise turns what looks like a flat pile of dates into a small set of distinct events, each weighed against what the case actually needs to show.

## Key takeaways

- A plain list of every date mentioned in a document set double-counts events described in multiple documents.
- Chronology building collapses every mention of the same event, regardless of source count, into one entry.
- Each event gets a significance tag based on the specific matter's legal theory, not a fixed importance score.
- A low-significance tag means the theory doesn't turn on that event, not that the event is wrong or missing.
- The same documents can produce differently tagged chronologies depending on what the matter is trying to prove.

## Who this is for

Litigation teams and paralegals building case chronologies from large document sets, and anyone who wants to understand why a well-built chronology is shorter than a raw list of every date mentioned in the file.
