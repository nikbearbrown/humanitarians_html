---
title: "Private AI Valuation Agent Week 5: Local LLM vs. Rules"
seoTitle: "Local LLM vs. Rules for Entity Resolution: Week 5"
description: "Om Mali tests an 8-billion parameter local language model against a working rule-based matcher and finds the model loses on precision every time."
summary: "A week-five head-to-head pits a local 8B parameter language model against an existing rule-based matcher for entity resolution, and the rules win on every measure that matters."
keywords: ["local llm vs rules entity resolution", "8 billion parameter model evaluation", "llm precision recall comparison", "ai model overconfidence problem", "llm hallucinating corporate facts", "entity resolution rule based matcher", "veto only ai model design", "private ai valuation agent"]
generated: "article"
---

It's easy to assume a language model will outperform a hand-built rule-based system, especially once it starts answering with high confidence. Week five of the Private AI Valuation Agent project tests that assumption directly: an 8-billion parameter local model is given the exact same evidence as a working rule-based matcher, and the result is reported honestly, even though it isn't the result that makes the model look good.

## Same evidence, one wrong direction

Both systems see identical inputs: the name on a filing, the security title, the fund that filed it, and a list of eleven candidate companies, seven from the core universe plus four from a watch list. Nothing else, no price data, no answer key. Run across 322 calls on a single machine, at about three seconds per call with zero failures, the rules scored 99.6% precision. The local model scored 94.5%. On paper, a five-point gap sounds survivable. Counted in actual records instead of individual test cases, it isn't: one wrong entity match doesn't stay one wrong record, it becomes 196, because a single mislabeled name gets applied across every holding that shares it.

## Where the model actually broke

The failure mode was consistent: the model kept promoting resemblance to a match. Shown a company called "Hyperscale Data," it answered "Scala," and when asked to justify the answer, stated that Hyperscale Data is the parent company of Scala, a relationship that doesn't exist. The model didn't misread the filing; it invented a corporate fact and reported it at 95% confidence. A separate case, "Loan Scaled Agile Incorporated 2021 unit term loan," was matched to "Scala" again, this time purely because the words looked alike, at full confidence, affecting 32 holdings that carry that name. A third case involved a filing name, "XAI3FT50," which is actually an internal Fidelity security code, not a ticker or company name at all. The model matched it to "XI" at full confidence based on three overlapping characters, affecting eight holdings that had nothing to find in the first place.

## The overconfidence problem

The most consequential finding wasn't any single wrong answer, it was the pattern in the confidence scores. Of the 322 answers, the model reported full confidence on 315 of them. Twelve of the fifteen answers that disagreed with the correct labels came back at 95% confidence or higher. That means the model's own confidence score can't be used to sort answers for review, since it was completely sure on many of the answers it got wrong. A reviewer relying on confidence to flag likely mistakes would have missed most of them.

## A veto-only model that never shipped

One consistent pattern did point toward something useful: every mistake the model made was an addition, promoting a false match. The one time the model helped, it removed a company rather than adding one. That observation led to building a second version of the model, restricted to only vetoing candidate matches, never proposing new ones. That veto-only version scored a perfect 1.0 on four rows. Four rows is a small sample, and the version was built, measured, and then left switched off rather than deployed, since a perfect score on so few cases isn't enough to justify replacing a working system.

## Key takeaways

- An 8-billion parameter local model was tested against an existing rule-based matcher using identical evidence: filing name, security title, filing fund, and eleven candidates.
- The rules scored 99.6% precision versus 94.5% for the model; scaled to actual holdings, one wrong record becomes 196.
- The model's consistent failure mode was promoting false resemblance, including inventing a nonexistent parent-company relationship at 95% confidence.
- The model reported full confidence on 315 of 322 answers, including 12 of its 15 wrong answers, meaning confidence couldn't be used to catch mistakes.
- A veto-only version of the model, restricted to rejecting matches rather than proposing them, scored perfectly on a small sample but was left unshipped.
- The rules were kept in production because the model showed no measurable lift over the existing system.

## Try it yourself

Before handing a task to a language model, write down in advance what result would actually make you keep what you already have, then run both systems on the same cases and check one specific thing: when the model is wrong, does its confidence score know it? If confidence can't separate right answers from wrong ones, you haven't gained a reviewer, you've gained more work to check. This is part of Humanitarians AI's Mycroft Financial AI series for its Fellows program.
