---
title: "3 Ways Language Models Fail (And Why Context Pasting Fails) | Vedanshu"
seoTitle: "Why Pasting Context Into an LLM Still Fails"
description: "Vedanshu Daxes Patel builds a toy assistant to show how language models hallucinate, serve stale data, and still fail after you paste in the full manual."
summary: "Vedanshu Daxes Patel demonstrates with a toy assistant why hardcoded facts go stale, why full manuals get hallucinated over, and why naive text scanning still returns the wrong paragraph."
keywords: ["why does pasting context into an llm fail", "how to test if a language model hallucinates", "stale data vs hallucination in ai assistants", "naive text search grabs wrong paragraph", "pasting entire manual into llm context", "why llm context needs intelligent ranking", "vedanshu daxes patel language model demo", "hardcoded facts vs retrieval in ai assistants"]
generated: "article"
---

Vedanshu Daxes Patel builds a small toy assistant to demonstrate a core problem with language models: giving them more text does not automatically fix wrong answers. The demo walks through three distinct ways an assistant can fail, and shows why the obvious fix of pasting an entire document into context does not solve the underlying issue.

## The two failures of a fixed-fact assistant

Patel starts with the simplest possible setup: an assistant that answers from a small hardcoded dictionary, with no lookup and no retrieval. This exposes two failure modes right away. Asked about a benefit that has since changed, it confidently returns an 8-week-old, now-incorrect figure. Asked about a program it was never told about at all, it invents a specific dollar figure anyway. Both answers come back in the same confident tone, with nothing in the output distinguishing a looked-up fact from a guess.

## The obvious fix: pasting the whole manual

The natural next step is to stop hardcoding a single fact and instead paste the entire policy manual into the assistant's context, letting it scan for whatever looks relevant. This sounds like it should work, since all the real information, including the correct, updated answer, is now present in the text.

## Why naive scanning still grabs the wrong paragraph

It does not work. With five real paragraphs in the manual, a naive scan just returns the first paragraph that shares any word with the question, with no ranking and no sense of which passage actually answers it. Asked about parental leave, the scan grabs a vacation paragraph because it shares the word "leave," while the correct 16-week parental leave passage sits three paragraphs later and is never reached. Pasting the whole manual did not fix the problem; it just gave a wrong answer better material to hide behind.

## What both failures have in common

Patel frames both failures the same way: a hardcoded fact goes stale, and a fully pasted manual still returns the wrong paragraph. Neither failure is about the model being unintelligent. Both are about what the model was handed, and whether anything in the process decided which part of that material actually mattered. That question, of deciding what matters before the model answers, is where this chapter's argument stops and the next chapter's argument begins.

## The practical challenge

Patel closes with a hands-on prompt: build a naive assistant, either a small hardcoded-fact script or a big pasted block of text, and show two ways it fails, either inventing an answer or grabbing the wrong nearby passage when the real one is buried in the middle. Then state in plain terms what would actually have to change to fix both. The suggested test is to try it on your own notes or a document, and to see whether the answer improves when you ask the model to name which passage it is actually using.

## Key takeaways

- A hardcoded, fixed-snapshot assistant fails two ways: it repeats stale data or invents an answer outright.
- Confident tone is not evidence of accuracy; a guess and a looked-up fact can sound identical.
- Pasting an entire document into context does not fix retrieval; without ranking, a naive scan still grabs the wrong nearby paragraph.
- Sharing a keyword with the question is not the same as answering the question.
- The real fix requires deciding which part of the pasted material matters, not just providing more of it.

## Who this is for

This is for anyone building or evaluating an LLM-based assistant over their own documents, and who wants a concrete demonstration of why naive context pasting is not the same as retrieval.
