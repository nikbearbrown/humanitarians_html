---
title: "Mycroft Update: Claims + Lineage Agents"
seoTitle: "Building Patent Claims and Lineage Agents"
description: "Aishwarya Patil builds two AI agents that read patent claims sections and citation lineage, switching data sources from USPTO to BigQuery mid-build."
summary: "Two AI agents read a patent's claims section and citation lineage instead of its abstract, with an honest NotImplementedError standing in for a faked result."
keywords: ["patent claims section ai agent", "patent citation lineage analysis", "uspto open data portal vs bigquery", "google patents public data bigquery", "claude code patent analysis", "ai agent notimplementederror pattern", "patent claims classification defensive offensive", "patent intelligence pipeline design"]
generated: "article"
---

Most patent analysis tools take the easy route: they read the abstract, which is plain-English marketing copy, or they simply count how many filings a company made in a quarter. Neither of those tells you what a company's patents actually protect. This build goes after the harder, more legally meaningful document instead, the claims section, and does it with two separate agents rather than one prompt trying to do everything at once.

## Why claims, not abstracts

A patent's claims section is a numbered list of legal statements that define exactly what the patent protects, whether that protection is broad and offensive or narrow and defensive. Most patent tools skip past it entirely because it's harder to parse than an abstract, which is written in plain, readable English specifically to summarize the invention for a general audience. The claims section, by contrast, is often written to be ambiguous on purpose, since its job is legal coverage, not clarity. A model trained to summarize technical text will frequently produce a clean, readable summary of a claims section that loses the legal subtext entirely, which is exactly the gap that motivated building two agents instead of relying on one general-purpose summarization pass.

## Two agents, two readings

The project scaffolds a claims agent designed to pull full patent text from a data source, extract the claims section specifically, and produce a structured reading of it. That reading includes what the independent claim actually protects, how any dependent claims narrow that protection, a classification of the claim as defensive, offensive, or exploratory, and an explicit statement of what the reading is not confident about. A second agent traces the patent's citation lineage, giving the pair two independent readings of the same underlying document rather than one blended interpretation.

## An honest failure instead of a fake result

One of the more instructive design choices in this build shows up in how the claims agent handles a data source it hasn't actually verified yet. Rather than writing parsing logic against an API response the agent has never seen, guessing at field names and structure, the code raises a NotImplementedError on purpose, with a clear reason attached. That matters because parsing logic written against an unverified schema tends to look finished while quietly being wrong the moment it hits a real response. Running the agent in this state doesn't crash, and it doesn't fake a plausible-looking result either. It raises a clear error naming exactly what's missing: a real USPTO Open Data Portal key and at least one inspected real response to build the parser against. That's presented as the correct output for this state, not a bug to be embarrassed about.

## Switching data sources mid-build

Before writing more parsing code, the actual data source was reconsidered. USPTO's Open Data Portal does contain the claims text needed, but requires a government identity verification step that takes real time to complete. Google's Patents Public Data on BigQuery contains the same claims text, and its schema was confirmed directly rather than trusted from documentation, with no identity verification step required to access it. Switching to BigQuery wasn't treated as abandoning earlier work, it was framed as recognizing a constraint that only became clear once the pipeline's actual needs were better understood.

## Verifying the schema by hand

Confirming the BigQuery schema directly, rather than relying on documentation, turned out to matter beyond just saving time. The claims table includes localized text, language, and truncated fields, while the citation table includes publication number and category fields, and one dataset now serves both agents. That hands-on verification also caught something documentation alone wouldn't have surfaced: a publication number format mismatch between older granted patents and newer applications, found by inspecting five real sample rows rather than guessing at the format twice.

## When two agents is the right call

The broader pattern here is worth naming explicitly: two independent readings of the same artifact are worth the added complexity when a coordinator can name a disagreement between them instead of quietly picking one reading and discarding the other. When the second reading would simply repeat the first, the second agent isn't earning its complexity and should be skipped. That earned-complexity framing, along with the smaller lesson about the NotImplementedError, sums up the build's underlying philosophy: an honest stop is worth more than code that looks done but hasn't actually been verified against reality.

## Key takeaways

- The claims section, not the abstract, is the legal artifact that actually defines what a patent protects, and most tools skip past it.
- Two separate agents read the claims section and the citation lineage independently, rather than blending both into a single prompt.
- The claims agent deliberately raises a NotImplementedError with a clear reason rather than guessing at an unverified API schema.
- The data source was switched from USPTO's Open Data Portal to Google's Patents Public Data on BigQuery to avoid an identity verification step, with the schema confirmed by hand.
- Manual schema verification caught a real publication number format mismatch between older granted patents and newer applications.

## Who this is for

This build will interest anyone working on patent intelligence, legal document analysis, or agent design patterns for handling unverified data sources honestly. It comes from Aishwarya Patil as part of the Humanitarians AI Fellows' Mycroft Financial AI work, built with Claude.
