---
title: "Persona LLM Visibility: Madison Project Research Design | Karishma"
seoTitle: "Persona LLM Visibility Research Design | Karishma"
description: "Karishma outlines a research design testing how LLM brand recommendations change across four buyer personas, for the Madison project at Humanitarians AI."
summary: "Karishma presents a weekly research design for Project Madison that tests how large language models recommend brands differently across four laptop-buyer personas using a controlled prompt structure."
keywords: ["how do llms recommend brands differently", "persona based llm visibility research", "testing ai brand recommendations by user type", "llm recommendation bias across personas", "project madison humanitarians ai research", "controlled prompt design for llm testing", "measuring brand ranking in ai chat answers", "ai visibility research methodology laptop study"]
generated: "article"
---

Karishma presents this week's research design for Project Madison at Humanitarians AI, a study into whether large language models recommend different brands to different kinds of users asking the same underlying question. The project moves from a general concern about AI recommendation bias into a specific, testable research design built around a laptop-buying scenario.

## The problem with a single visibility score

Most attempts to measure whether an AI model favors certain brands look at one overall visibility score, how often a brand shows up in general recommendations. Karishma's research gap is that this single number can hide real differences underneath it: a brand might appear frequently in generic recommendations while rarely showing up for a specific customer segment that actually matters to it. The overall score looks fine while a meaningful audience is being missed.

## The central research question

The study asks how user personas and contextual signals influence which brands and products a large language model recommends. Rather than asking whether a model recommends a brand at all, it asks whether that recommendation depends on who appears to be asking.

## Four personas, one product category

To test this, Karishma defined four representative personas for a laptop-buying study: a student, a software developer, a creative professional, and an enterprise buyer. Each persona carries different priorities, from price and battery life to performance, display quality, security, and support, giving the study a concrete way to check whether recommendations shift with those priorities rather than staying generic.

## A controlled prompt progression

The evaluation does not just ask one question per persona. It runs a controlled prompt progression that starts with a generic question, then adds stated intent, then persona information, and finally specific constraints such as budget, portability, and workload. This progression is designed to isolate what actually moves a model's recommendation: is it the persona itself, or the specific constraints layered on top of it. The evaluation tracks which brands and products appear, their recommendation frequency and ranking, which competitors show up, how relevant the recommendation is to the stated persona, and how consistent the results are across repeated prompts.

## Where the project stands

This week's progress was the research design itself: the central question, the four personas, the prompt structure, the evaluation metrics, a proposed Python pipeline, and the project's milestones and deliverables. The next step is building the controlled prompt dataset and starting the evaluation prototype.

## Key takeaways

- A single overall visibility score can mask meaningful differences in how an AI model treats different user segments.
- The study's central question is whether user personas and contextual signals change which brands a language model recommends.
- Four personas, student, developer, creative professional, and enterprise buyer, anchor the laptop-buying test case.
- A controlled prompt progression, from generic to persona-specific to constraint-specific, isolates what actually drives a recommendation shift.
- Evaluation metrics include recommendation frequency, ranking, competitor visibility, persona relevance, and consistency across repeated prompts.

## Who this is for

Anyone interested in AI bias research, marketing teams wondering how their brand shows up differently across user types in AI chat answers, and students looking for a model of how to turn a vague concern into a testable research design.
