---
title: "Your Job Description is Too Generic: How to Tell AI Who You Really Are"
seoTitle: "Your Job Description Is Too Generic for AI Prompts"
description: "A 4-question framework and a 480-run AI test show why generic job titles fail in prompts, and what actually makes a role description specific enough."
summary: "Tanmay Kulkarni breaks down a 4-question framework for writing job descriptions AI can actually use, backed by a 480-run test showing which advice holds up."
keywords: ["how to describe your job to ai", "ai prompt specificity framework", "expert persona ai accuracy research", "closest job test ai prompting", "generic job title ai prompt problem", "ai persona vs situation prompting", "beers criteria pharmacist example", "reduce ai prompt inconsistency"]
generated: "article"
---

The hardest part of using AI well isn't saying what you want. It's saying who you are. Nearly every prompt template you'll ever pick up was written for a generic professional, and you are not one. Open most AI exercises and you'll find the same shape: a paragraph with blanks for your role, your task, your limits, your format, the people who depend on the answer. Those blanks are honest, since whoever wrote the exercise can't know who you are. The interesting question is what you actually put in them, and most people write something like "healthcare professional" or "software engineer." Those aren't jobs. They're categories, and a category gets you a category-shaped answer.

## The four-question framework

Four questions, run in order, catch most of the problem. First, does the description rule anyone out, or does it just describe you? Most of what people write is true of them and just as true of the person at the next desk; describing yourself is easy, ruling other people out is the actual work. Second, who has the closest job to yours, not someone in another department, but the person whose work most resembles your own? Pick someone far away and you'll pass the test without learning anything from it. Third, which exact words rule that person out? If you can't point at specific words that would exclude them, the description isn't specific, it's just long. Fourth, would someone else agree with you? If you're the only person who can run your own test and get your own answer, that isn't a test, it's an opinion.

## A case study: the night pharmacist

Applying this to a real example makes the gap visible. Take a description: a hospital pharmacist working nights who checks discharge medicines against a safety list called the Beers Criteria before the patient goes home. Questions one and two are quick: it clearly describes someone, and the closest comparable job is a night nurse on the same ward, same hours, same patients, same discharge process. Question three narrows further: working nights and being present when the patient goes home both apply to the nurse too, but checking medicines against the Beers Criteria sounds like it should be the pharmacist's distinct expertise. Question four is where the description actually fails. Looking into it, the Beers Criteria document was written by a panel that includes doctors, pharmacists, and nurses, and a nursing institute publishes it as a tool meant to help nurses review medicines too. The line that felt confident, the one that would have gone on a slide, turns out to rule nobody out. The actual differentiator is narrower still: who signs off releasing the prescription in the pharmacy system before it can be handed over. She checks it, he releases it. That's the line that actually separates the roles, and only question four, the one that checks something outside your own opinion, could catch the earlier mistake.

## Two different things people mean by "tell AI who you are"

There are two completely different moves hiding under the same advice, and most guides don't separate them. The first is a claim about the AI itself, telling it to pretend to be a senior hospital pharmacist with fifteen years of experience. The second describes your situation instead, night shift, discharge medicines, before the patient goes home, without claiming anything about the AI's identity at all.

Only the first kind has actually been tested, and the results aren't flattering. One study gave an AI expert personas and then ran it through a general knowledge test: with no persona it scored 71.6%, with a short expert persona 68%, and with a long, detailed persona 66.3%. Longer persona prompts did more damage, not less. A second, separate study asked a narrower question, when does a persona actually help, and found a tradeoff rather than a straightforward improvement: personas made answers deeper but also less clear, helping on advice-style questions in medicine and psychology while hurting on questions asking for a plain explanation in finance, law, science, and technology. Both studies are pre-prints, meaning other researchers haven't yet checked them, and the second one used another AI model to do the grading. As for the second kind of advice, describing your situation rather than claiming an identity, no study on that specific version turned up at all. The advice to describe your situation isn't wrong, it's simply untested, which is a very different problem than being disproven.

## Testing it yourself: 480 runs

Since the "closest job" exercise depends on getting a steady answer from an AI, that steadiness is worth measuring directly. The test used 24 job descriptions across healthcare, finance, and engineering, some deliberately sharp and some deliberately vague, asked to two different AI models, five times each, for 480 answers total. Asking an AI to name the closest job to a given description five times over produced roughly two and a half different answers on average. 79% of descriptions got more than one answer from the first model and 71% from the second, and because pass or fail depends on which job gets picked, that result moved too: on the first model, 42% of descriptions received both a pass and a fail across different runs, with nothing changed but the attempt itself.

The fix turned out to be simple: instead of asking the AI to pick the closest job, naming that person yourself cuts the flip-flopping by roughly two and a half times, from 42% down to 17%, and 17% down to 8% on the two models respectively. Agreement between the two models climbed from 67% up to 88%. One small change in how the exercise is framed produced a meaningfully steadier result.

## Tighten for the right reason

The overall advice holds up: tighten a description until it fits one person. But it's worth being precise about why it works. It isn't because the accuracy numbers from the persona research apply here; those numbers were measured on the "you are an expert" kind of prompting, a different mechanism entirely, and borrowing them to justify the situation-description advice would repeat the exact mistake this whole exercise is meant to catch. It works because of question three: words you can't point to specific evidence for aren't doing any real work, and naming the closest person yourself, rather than asking the AI to guess, measurably steadies the outcome.

## Key takeaways

- Generic role descriptions like "healthcare professional" produce category-shaped answers; the real work is finding words that rule other people out.
- The fourth question, whether someone else would agree with your description, is the one most people skip, and it's the only one that isn't just marking your own homework.
- Persona-style prompting ("you are an expert") measurably reduced accuracy on a general knowledge test, dropping from 71.6% to 66.3% as prompts grew longer.
- Situation-style prompting, describing your context rather than claiming an identity, has not been directly tested, so that advice is untested rather than proven or disproven.
- Asking an AI to name your closest comparable job produces inconsistent answers across repeated runs; naming that person yourself cuts the inconsistency by roughly half.

## Try it yourself

This walkthrough is part of the Humanitarians AI Fellows program. The four-step challenge: write your own job description, name the person whose job is closest to yours (closest, not furthest), underline the one phrase that person could not write, then delete that phrase and read the description again. If it still sounds fine, it was never specific, it was just long.

## Frequently asked questions

**Does telling an AI "you are an expert" make its answers better?** Not necessarily. In the research described here, adding an expert persona reduced accuracy on a general knowledge test, from 71.6% with no persona down to 66.3% with a long, detailed persona, and both studies involved are pre-prints that haven't yet been independently checked.

**What's the difference between a persona and a situation in a prompt?** A persona tells the AI who to pretend to be, such as "a senior hospital pharmacist with 15 years of experience." A situation describes your actual context instead, such as "night shift, discharge medicines, before the patient goes home," without claiming any identity for the AI at all. Only the persona version has been directly tested in the research referenced here.

**Why does naming the closest comparable job yourself work better than asking the AI to guess?** In a 480-run test across 24 job descriptions and two AI models, asking the AI to guess the closest job produced inconsistent answers roughly 42% of the time on one model. Naming that person yourself instead cut that inconsistency down to about 17%, and agreement between the two AI models rose from 67% to 88%.
