---
title: "Section 2  Clarify Your AI Prompts for Accurate Results | Botspeak Framework"
seoTitle: "Clarify AI Prompts for Accurate Results | Botspeak"
description: "A biomedical research example shows how specifying scope, source, and date range in an AI prompt turns a vague answer into a usable, trustworthy one."
summary: "Vague AI questions get vague answers. This installment of the Botspeak framework shows how adding scope, assumptions, and evidence requirements changes what you get back."
keywords: ["botspeak framework ai prompts", "clarify ai prompt biomedical research", "chatgpt literature review prompt", "ai prompt scope and assumptions", "specify prompt for accurate results", "peer reviewed studies chatgpt prompt", "prompt engineering evidence requirements", "improving factual accuracy llm outputs", "wang et al 2023 prompt clarity"]
generated: "article"
---

Ask an AI system a broad question and you get a broad answer. It won't be wrong, exactly, but it won't be useful either, because the model had to guess at what you actually needed. The fix isn't a smarter model. It's a clearer question, and this section of the Botspeak framework walks through exactly what that looks like in a real research setting.

## The vague prompt problem

The example here is one any researcher will recognize: "I need to review recent studies on CRISPR applications in cancer therapy." Asked that way, an AI system will happily generate a broad overview of CRISPR in cancer treatment, touching on general trends and paradigm shifts. It's not incorrect. It's also not something you can cite, verify, or hand to a colleague, because it hasn't specified what counts as a "study" in this context, how recent is recent, or what makes a source trustworthy.

## Adding scope, assumptions, and evidence requirements

The corrected version of the prompt adds three things: a source constraint (PubMed), a time constraint (published after 2020), and an evidence requirement (studies must be peer-reviewed and include DOIs). That single revision changes the entire nature of the response. Instead of a general essay, the system returns a curated list of specific, peer-reviewed studies that match the stated criteria, each with a DOI attached so the researcher can verify it directly.

## Why this matters for biomedical research specifically

Biomedical researchers using AI tools for literature reviews face a particular risk: a fluent, well-organized answer can look authoritative even when it's built from outdated or non-peer-reviewed sources. By specifying scope, assumptions, and required evidence up front, a researcher pre-empts irrelevant or low-quality output before it happens, rather than having to catch it after the fact. That's a meaningful difference in a field where a citation error or an outdated finding can propagate into real decisions.

## The research behind prompt clarity

This isn't just a workflow tip. Wang et al. (2023) demonstrated that clearly defined prompts improve factual accuracy in large language model outputs, giving this practice an empirical basis rather than just intuition. The Botspeak framework treats this as foundational: before you evaluate what an AI gives you, look at what you actually asked for.

## Key takeaways

- A vague prompt produces a fluent but unverifiable answer; a specific one produces something you can check.
- Specify source, date range, and evidence type (for example, peer-reviewed studies with DOIs) directly in the prompt.
- Clarifying scope and assumptions before prompting pre-empts irrelevant or low-quality responses rather than requiring cleanup afterward.
- Wang et al. (2023) found that prompt clarity measurably improves factual accuracy in LLM outputs.
- This is one habit, not a one-time fix: apply it to every research question you hand to an AI system.

## Try it yourself

Next time you ask an AI tool to summarize research, add the constraints you actually care about: source, publication window, and what counts as valid evidence. This section is part of the ongoing Botspeak series; the next installment covers iterative query and verification, showing how staged questioning and external validation improve AI-assisted decisions.
