---
title: "Om's Mycroft Update: Private AI Valuations - Finding the Hidden Price of OpenAI and Anthropic"
seoTitle: "Finding Private AI Company Prices via SEC N-PORT"
description: "OpenAI and Anthropic have no public stock price, but mutual fund SEC filings quietly reveal one, and this week-one build verified it against real filings."
summary: "Om Mali built a Private AI Valuation Agent that extracts implied share prices for OpenAI, Anthropic, and other private AI companies from SEC Form N-PORT filings."
keywords: ["private ai company valuation sec filing", "sec form n-port private company price", "openai anthropic implied share price", "mutual fund private stock holdings sec", "private ai valuation agent mycroft", "form n-port price per share calculation", "restricted stock flag sec filing", "spacex cohere private company universe"]
generated: "article"
---

Most of the AI industry's real value sits in companies you cannot actually buy. OpenAI, Anthropic, and Databricks have no ticker symbol, no earnings call, and no public price. But somebody is already writing a price down for them every quarter, and by law they have to show their work.

## The problem: most AI value is in private companies with no ticker

Every mutual fund that owns a piece of a private company like OpenAI or Anthropic has to report that holding to the SEC. That single fact is the foundation of the entire Private AI Valuation Agent project: if funds are required to disclose position value and share count, then a price per share can be reconstructed for a company that otherwise has no public price at all.

## The mechanism: using SEC Form N-PORT to calculate price per share

The mechanism itself is simple once you see it. Form N-PORT requires funds to report a dollar value and a share count for each position, position by position, every quarter. Divide the dollar value by the share count, and the result is an implied price per share for a company that has no public price anywhere else. That division is the entire method the project rests on.

## Verification: how Fidelity, BlackRock, and Ark matched to the cent

Rather than trust the mechanism on faith, the first move was to check it by hand against real filings. Nineteen Anthropic positions across six different fund families were pulled straight from the source filings, Fidelity, T. Rowe Price, Alger, and Ark among them, and all of them landed on the same implied price, matching to the cent. A later repricing round added confirmation: BlackRock and Capital Group matched again to four decimal places, filed two days apart. That kind of independent agreement across unrelated fund families is strong evidence the underlying method is sound.

## Pipeline break 1: why restricted stock flags silently drop data

The verification also surfaced where the plan itself was wrong. A filter meant to isolate private holdings was supposed to work across all six fund families, but it silently kept Fidelity's data while dropping the other five, with no error thrown anywhere to flag the problem. The cause: some filers write "N/A" or strings of nine zeros for a missing identifier field, and at least two filers flagged restricted stock as unrestricted. Both errors were quiet ones, the kind that don't announce themselves unless someone checks the output by hand.

## Pipeline break 2: from a few thousand rows to far more than expected

The second break was a scale problem. The plan expected a few thousand private-holding rows per quarter. The real number that came back was far larger, enough to require rethinking the entire approach. The fix was to invert the pipeline: instead of trying to filter the full universe of rows down to private companies, match companies by name first, then confirm private status second. That inversion shrank the hardest part of the project dramatically and made the whole pipeline tractable.

## The solution and the universe so far

With the inverted approach in place, the SEC's own bulk data matched the hand-read filings 15 out of 15 times, confirming the mechanism holds up at scale, not just in the small hand-checked sample. The tracked universe for week one is frozen at six companies. One company, SpaceX, made the list. Another candidate, Cohere, did not: every apparent match for "Coherent" in the data turned out to be Coherent Corp, an unrelated public optics company, not the AI company. That kind of name collision is exactly the sort of error the hand-verification step is designed to catch before it corrupts the dataset.

## Key takeaways

- Private AI companies like OpenAI and Anthropic have no public stock price, but mutual fund SEC Form N-PORT filings disclose the dollar value and share count needed to calculate one.
- Nineteen Anthropic positions across six fund families matched to the cent when checked by hand, and a later round matched again to four decimal places.
- A private-holdings filter silently dropped five of six fund families' data because of inconsistent missing-identifier formatting and mislabeled restricted stock.
- The pipeline was inverted to match companies by name first and confirm private status second, which solved a major scale problem.
- Careful name matching matters: an apparent "Cohere" match turned out to be Coherent Corp, an unrelated public optics company.
- The tracked universe for week one is frozen at six companies, with entity resolution across more fund quarters planned next.

## Try it yourself

Pick a private company you think a mutual fund might own, find its most recent Form N-PORT filing on EDGAR, and pull the reported value and share count for that position. Divide them, then ask what would have to be true for that number to be wrong, since deciding whether to trust a number is the real work, not the division itself. This build-in-public update comes from Om Mali as part of the Mycroft Financial AI project within Humanitarians AI's Fellows program.
