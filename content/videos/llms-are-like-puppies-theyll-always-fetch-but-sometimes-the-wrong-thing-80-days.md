---
title: "LLMs Are Like Puppies: They'll Always Fetch, But Sometimes The Wrong Thing | 80 Days to Stay"
seoTitle: "LLMs Are Like Puppies: A Prompt Engineering Lesson"
description: "A late-night coding mistake in a domain verification script becomes a lesson about being literal with language models, from the 80 Days to Stay project."
summary: "A script that looked like a 100 percent success rate was quietly never checking domains at all, a mistake that turned into a lesson about how literal you have to be with language models."
keywords: ["prompt engineering mistakes example", "async domain verification python", "sec form d data scraping", "llm literal instructions lesson", "80 days to stay project", "asyncio parallel http requests", "international student visa sponsorship data", "domain verification script bug"]
generated: "article"
---

A script ran overnight, reported a 100% success rate, and looked like a win until someone actually checked what it was doing. It turned out the script was never verifying anything at all, just generating plausible-looking domain guesses. That mistake, caught the next morning, is the subject of this quick update from the "80 Days to Stay" project, and it doubles as a clean example of a specific kind of prompt engineering failure.

## The mistake: a script that looked done but wasn't

The project is building a domain verification tool as part of a larger effort to process SEC Form D filings, part of the "80 Days to Stay" initiative through Humanitarians AI that helps international students find funded startups that might sponsor work visas. Late the night before, a script was written to check whether companies in the dataset had live domains. It ran, it finished, and it reported every single check as successful. That number was the tell. A 100% success rate on a task like domain verification is almost never real, and in this case it wasn't: the script had been generating domain guesses rather than actually verifying them against anything.

## Language models as literal-minded puppies

The lesson drawn from this is a comparison worth sitting with: working with a language model is like training a puppy. It always wants to please you and will always return something, but it isn't automatically smart about filling gaps in an unclear instruction. If you're vague, or if you're writing prompts at one in the morning and not being precise, the model will still confidently produce an output, it just might not be the output you actually wanted. The dog will always fetch. It just might fetch the wrong thing. The fix isn't to distrust the model less, it's to be more literal and specific about exactly what you want it to do.

## The rewrite: verifying for real, in parallel

The corrected script actually verifies domains with live HTTP requests instead of guessing, and it does the checks 50 at a time using asynchronous requests rather than one at a time in sequence. Once the fix was in, the results looked very different: success rates in the realistic 50 to 70 percent range, which makes far more sense for a task like this than a suspicious 100 percent. Running 50 checks in parallel also explains the timing: roughly 500 companies checked per minute, against a total of 41,299 companies to process, for an estimated runtime of three to four hours. Running the checks one at a time instead of 50 in parallel would have made the job roughly 50 times slower.

## Key takeaways

- A suspiciously perfect result, like a 100% success rate, is often a sign that a script isn't doing what you think it's doing.
- Language models will always generate an output, but a vague or rushed prompt can lead them to fetch the wrong thing rather than fail visibly.
- Being precise and literal with instructions matters more late at night, when it's easiest to be vague.
- Running verification checks asynchronously in batches of 50 turned a task that would have taken many hours sequentially into one estimated at three to four hours.
- Realistic success rates, in this case 50 to 70 percent, are often more trustworthy than results that look too clean.

## Who this is for

This quick update is useful for anyone writing scripts that lean on a language model to generate or infer data, especially late at night when instructions tend to get less precise. It's also a look inside the mechanics of the "80 Days to Stay" project, which processes SEC Form D data to help international students find startups that might sponsor their visas.
