---
title: "From Hollow AI Draft to Rigorous Science: Our 5-Week Paper Rewrite | Karthik"
seoTitle: "5-Week Rewrite: AI Draft to Rigorous SERS Paper"
description: "Karthik walks through how his team turned a hollow AI-generated SERS literature review into a cited paper over a five-week, twice-repeated cycle."
summary: "Karthik describes the five-week process his team used to turn a glossary-style, AI-generated SERS literature review into a paper with verified citations, honest gaps, and corrected errors."
keywords: ["how to verify ai generated citations", "how to rewrite a hollow literature review", "why pca needs train test separation", "sers literature review rewrite karthik", "two week citation verification cycle", "ensemble model prediction accuracy sers", "fabricated accuracy overestimate removed from draft", "mismatched data row in literature table"]
generated: "article"
---

The first draft of Karthik's team's literature review on SERS (surface-enhanced Raman spectroscopy) looked finished. It covered every method, cosmic ray removal, baseline correction, all of it. But it read like a glossary: each section defined its topic without ever explaining why it mattered or what to do with it. Karthik walks through the five weeks the team spent closing that gap.

## What was actually wrong with the AI draft

The problem wasn't missing coverage, it was missing argument. Sections defined terms with no thread connecting one idea to the next. Worse, several references either didn't exist or didn't say what the draft claimed they said. Before any of the science could be fixed, the team needed a plan for the structure itself.

## A guidelines document built on three forced questions

Rather than a style guide, the team wrote a set of forced questions every section had to answer: what has actually been done, why does it work or fail, and what do we recommend based on the evidence. A section that only defined a term without answering those three questions wasn't considered finished. The introduction was written first, since it needed background chemistry neither author had, then the machine learning framing was layered in separately. From there, the sections were split between the two authors.

## The two-week rhythm

Each section ran the same cycle: week one was spent hunting down every citation and checking whether a claim was actually backed by what its source said, week two was rewriting using whatever week one turned up. That cycle repeated twice per section across five weeks total, with real meetings and logged research hours throughout.

## Fixing technical gaps

The rewrite surfaced specific technical issues the original draft glossed over. On PCA (principal component analysis), the team added an explicit warning that it must be fit only on training data, never on the full dataset before splitting, otherwise the test set leaks backward into training. On SERS hotspot variability, normally treated as noise to average away, they cited a study that trained on deliberately varied hotspot conditions and cut prediction error by 84.8%, and a separate cross-lab study that found systematic differences across 35 instruments at 15 institutes, differences caused by hardware, not chemistry. On ensembling, they noted it only helps when the combined models fail in different ways: one cited study combining four classifiers beat every individual model at 97.9% accuracy, while another study combining just two models did worse than either alone because the models disagreed on noisy data instead of complementing each other.

## Removing what couldn't be backed up

The original draft stated that reported accuracy overestimates real deployment performance by 10 to 30 percentage points. Nobody on the team could find where that number came from, so it was removed and replaced with an honest statement that this has never actually been measured. A similar claim, that no study has reached the top validation tier, was rescoped explicitly to the databases and years actually searched rather than stated as a fact about the whole field. The team also caught a mismatched row in their summary table, a random forest study that had never touched Raman spectroscopy at all, included only because it used the same algorithm, and split one ensemble row that had quietly mixed two different approaches into two separate, honest rows.

## Key takeaways

- An AI-generated draft can look complete while still failing to connect its own claims, definitions without argument aren't a finished section.
- Forcing every section to answer what was done, why it works or fails, and what to recommend catches gaps a style guide wouldn't.
- PCA must be fit only on training data to avoid test-set leakage.
- Ensembling models only helps when the models fail differently from each other, not automatically.
- An unsupported number (like a specific accuracy overestimate) should be removed and replaced with an honest statement rather than left in the draft.

## Who this is for

Anyone using AI to draft a literature review or research paper who wants a concrete process for turning fluent-sounding AI output into something with verified citations and claims that actually hold up, especially students and researchers working with SERS, PCA, or ensemble machine learning methods.
