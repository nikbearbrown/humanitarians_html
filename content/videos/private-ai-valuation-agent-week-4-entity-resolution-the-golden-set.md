---
title: "Private AI Valuation Agent Week 4: Entity Resolution & The Golden Set"
seoTitle: "Private AI Valuation: Entity Resolution & Golden Set"
description: "Om Mali builds a 322-label golden set to test entity resolution across 128 spellings of seven private companies, catching a hidden OpenAI holding along the way."
summary: "Databricks appears under 51 different filing names and SpaceX under 28; Om Mali builds a 322-label golden set to test a deterministic matcher and catches his own labeling mistake along the way."
keywords: ["entity resolution private company filings", "golden set ground truth labels", "databricks 51 spellings filings", "spacex 28 different names filings", "deterministic matcher recall precision", "mycroft private ai valuation agent", "openai series c holdings hidden", "fidelity hidden holdings entity match", "sec filings messy company names", "how to test entity resolution matcher"]
generated: "article"
---

Every filing writes a company's name however it likes, which sounds like a minor annoyance until you try to price anything based on those filings. If you cannot tell for certain which company a row of data refers to, nothing downstream, valuation, comparison, trend analysis, can be trusted. Week four of the private AI valuation agent project tackles that problem head-on, building both a matcher that decides which company a filing means and a rigorous way to prove whether that matcher actually works.

## The scale of the messiness

Seven companies turn out to file under 128 different name spellings between them. Databricks alone shows up under 51 different spellings. SpaceX appears under 28, and Anthropic under 10. These are not hypothetical variations; they are real strings exactly as funds typed them into their filings, and they are scattered across 3.2 million distinct issuer names in the underlying dataset. Finding every one of those 128 spellings and correctly mapping them back to the right company is the entire problem this week's work sets out to solve.

## Building a golden set instead of trusting a guess

Rather than eyeballing whether a matcher looked reasonable, the project built a ground-truth set: 322 name strings, each hand-labeled with the company it actually refers to, covering 7,276 individual holdings. That golden set became the yardstick for scoring two different systems, the original simple name-pattern matcher and a new deterministic matcher built for this stage of the project. The pattern matcher scored 98% recall. The new deterministic matcher hit 100% recall, but precision barely moved between the two, and on the hardest individual cases, the older pattern matcher was actually cleaner. The honest claim from this test is about recall, not precision, and stating that distinction clearly matters more than claiming an overall win.

## One character hiding 85 holdings

A single formatting quirk illustrates why this level of rigor matters. Some funds write a company's ticker-like abbreviation with a dot in the middle, others without it. That one dot was hiding 85 holdings, all belonging to Fidelity, the largest holder of that company. A single character was enough to make the largest holder of a company effectively invisible to the matcher.

## Catching your own mistake

The most important moment in this week's work was not a success, it was catching a self-inflicted error. A holding had been flagged as not belonging to any of the seven tracked companies, with a confident written justification for excluding it. Reading the actual underlying rows told a different story: five holdings, including ones held by major funds, all priced at 687.6869, which is the exact per-share price of OpenAI's Series C round to four decimal places. The flagged holding was OpenAI the whole time, and the original justification for excluding it was factually wrong. That approval was withdrawn, the matcher was fixed, and the worse number was published right next to the better one, because a score measured only after fixing what the test caught is not a real validation, it is just a number.

## Where a human still has to step in

Not every case resolves cleanly even after the fixes. A used-car marketplace whose name happens to contain a substring similar to a tracked company's name scores identically to entries that genuinely are that company, and two of those entries differ only by a trailing space, yet all score at the same confidence level. No cutoff threshold cleanly separates them. For cases like this, four per run, the system routes the decision to a person rather than forcing an automated call. Of the full golden set of 322 labels, eight have now actually been reviewed by a person as a direct result of this testing process.

## Key takeaways

- Seven tracked private companies file under 128 different name spellings, hidden across 3.2 million distinct issuer names.
- A 322-label golden set, covering 7,276 holdings, was built to score matcher performance against real ground truth.
- The new deterministic matcher improved recall from 98% to 100%, but precision did not meaningfully improve.
- A single formatting difference, a dot in an abbreviation, was hiding 85 holdings belonging to Fidelity.
- The golden set caught a previously approved mislabeling of an OpenAI holding, identified by matching its exact Series C share price.
- Ambiguous cases with no clean confidence threshold, roughly four per run, are routed to a human reviewer instead of being resolved automatically.

## Try it yourself

The challenge for anyone working with messy company or entity data: take a real list of names from your own dataset, customers, vendors, anything, and hand-label 30 rows with the true entity each one represents. Run your existing matching logic against those labels and measure its recall, then go back and find what your own labeling got wrong in the first place. This project is part of the Mycroft Financial AI work within the Humanitarians AI Fellows program.
