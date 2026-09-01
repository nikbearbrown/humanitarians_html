---
title: "AI Vendor Tracker: Solving the Multi-\"Cohere\" Identity Crisis"
seoTitle: "AI Vendor Tracker: The Multi-Cohere Bug"
description: "How a naming collision corrupted 45% of an AI vendor tracking database, and the identity-verification fix that stopped Cohere and Anthropic scoring errors."
summary: "A Humanitarians AI Fellow traces a data-quality bug that let a radio company and a physics paper get scored as AI vendor funding, then fixes it with identity verification."
keywords: ["ai vendor tracker data cleaning", "entity resolution naming collision", "cohere name collision bug", "anthropic principle keyword bug", "ai funding data verification", "entity verification before scoring", "deleting bad database records", "look-alike entity matching fix"]
generated: "article"
---

A dashboard that confidently reports a number is not the same as a dashboard that reports the right number. That gap is exactly what Muskan, a Humanitarians AI Fellow working on the AI Vendor Tracker project, ran into this week: the system was scoring the wrong companies entirely, and doing it with total confidence.

## Three companies, one name

The first bug came down to a simple collision: three real-world organizations are all named Cohere. There's Cohere the AI vendor, Cohere the health insurer, and Cohere the radio maker. The tracker's data collector filed all three under the AI vendor bucket without checking which one a given article was actually about. The result was that a radio contract got counted as AI funding, even though the source article explicitly described it as unrelated to the AI startup. A signal that looked like investment activity in AI was, in reality, describing a completely different business.

## Keyword matching without author checking

The second bug was subtler and came from how research papers were being matched to companies. Instead of matching by author or verified affiliation, the system matched by keyword. That meant any paper mentioning "anthropic" got attributed to the AI company Anthropic, including physics papers about the anthropic principle, a cosmological concept that has nothing to do with the AI lab. The same shallow matching let "coherence" in unrelated papers register as mentions of Cohere. Once Muskan audited the results, 85% of the papers attached to these companies turned out to belong to the wrong company entirely.

## The fix: verify identity before trusting a signal

The fix Muskan landed on is a single governing idea: check identity before you trust a signal. Concretely, that meant adding a verification step before anything gets saved. Look-alike entities get rejected up front. Papers are now matched on title and abstract content rather than a bare keyword hit, and a classifier confirms which company is actually being discussed before that data point is allowed to move a score.

Applying that fix meant cleaning house. Muskan deleted 782 bad records, 45% of the entire database. That's a striking number, but it's the honest number. Cohere's score, which used to display a confidently wrong estimate of 75, now correctly shows "no data" rather than a fabricated figure. A missing number that admits it's missing is more useful than a wrong number dressed up as certainty.

## Why this matters beyond one tracker

The underlying lesson generalizes past this one project: a number is only as trustworthy as the entity it's actually describing. Any system that automatically attributes signals to named companies, whether that's funding data, sentiment scores, or news mentions, is vulnerable to exactly this kind of collision the moment two organizations share a name or a keyword overlaps with an unrelated concept.

## Key takeaways

- A shared company name (Cohere the AI vendor, health insurer, and radio maker) caused unrelated activity to be misattributed to the AI vendor.
- Keyword-only matching attributed physics papers on the "anthropic principle" to the AI company Anthropic.
- 85% of the papers attributed to tracked companies were mismatched before the fix.
- The fix verifies entity identity, by title and abstract, before a signal is allowed to affect a score.
- Cleaning the database removed 782 bad records, 45% of the total.
- An honest "no data" result is more trustworthy than a confident but fabricated score.

## Try it yourself

Muskan's closing challenge is a good audit exercise for anyone maintaining a data pipeline: take one signal that moved a vendor's score and ask whether it's really about the right company, and what look-alike entity it could actually be describing. If you can't rule those out, don't let it count. This kind of hands-on data engineering work is representative of the projects Humanitarians AI Fellows take on as part of the program.
