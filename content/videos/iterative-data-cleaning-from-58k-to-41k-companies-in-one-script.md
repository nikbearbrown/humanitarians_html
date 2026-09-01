---
title: "Iterative Data Cleaning: From 58K to 41K Companies in One Script"
seoTitle: "Iterative Data Cleaning: 58K to 41K Companies with Claude"
description: "How a Claude-written deduplication script cut a 58,000-company SEC dataset down to 41,000 by matching on exact name, phone, and address."
summary: "A first cleaning pass on a 58,000-company dataset left duplicates behind. A second Claude-written script matching on name, phone, and address cut it to 41,000, a 28% reduction."
keywords: ["sec company data deduplication", "claude ai data cleaning script", "python deduplication script csv", "csv duplicate removal python", "80 days to stay dataset", "iterative data cleaning workflow", "gigo data validation", "crowdsourced startup database", "startup visa sponsorship database", "info 7390 data validation"]
generated: "article"
---

You ask an AI model to clean your data, it tells you the job is done, and you move on. Then you actually open the file and find the same company sitting in three different rows: same name, same phone number, same address. This video is about that exact moment, and about what it actually takes to get from "Claude said it removed duplicates" to a dataset that is genuinely cleaner.

The dataset in question comes from SEC company filings, flattened down from a much larger source into a working CSV. After that flattening step, duplicates that should have been caught were still sitting in the file. Companies like X AI, Elon Musk's AI company, Databricks, and Airbnb all appeared more than once, exact repeats rather than similar-but-different entries. That is the kind of error that is easy to miss if you only skim a dataset, but obvious the moment you actually look.

## Finding duplicates Claude missed

The starting point was simple: Claude had already been asked to deduplicate the file and reported that it had. Looking at the actual CSV told a different story. The fix was not to argue with the model or hope it did better next time, it was to ask it to write a new script and be explicit about what "duplicate" should mean here. Rather than relying on fuzzy name matching, the new script was told to check unambiguous identifiers together: an exact company name match, an exact phone number match, and an exact address match. Matching on name alone is not reliable enough, since two different companies can share a name, but requiring agreement across name, phone, and address makes a false match very unlikely.

## Why you always show the AI your data structure again

One detail matters more than it sounds like it should: even though Claude had written a script for this exact file just two minutes earlier, the data structure was pasted in again, three or four sample records, before asking for the new deduplication script. The reasoning is straightforward. A model does not reliably retain the exact shape of a data file between requests, even within the same short session, and a script written against a guessed structure can fail in ways that are hard to spot. The practical fix that came out of this is to keep a small sample of the dataset saved in its own file specifically so it can be copy-pasted every time a new script is requested, rather than re-extracting it from scratch each time.

## The results: 58,000 down to 41,000

Once the new script ran, the numbers told the story. The dataset went from 57,965 companies down to roughly 41,000, a reduction of about 28%, removing more than 17,000 duplicate entries in a single pass. That reduction lined up closely with an eyeball estimate made before the script ran, which is itself a useful sanity check: if your gut sense of the duplicate rate and your script's actual output are wildly different, something in the logic is probably still wrong. Here they matched. The updated CSV, JSON, and Excel files were pushed to GitHub within minutes, so anyone who had downloaded the dataset earlier would need to grab the refreshed version.

## The philosophy: iterative improvement, not a finished product

The bigger point of the video is not really about this one script, it is about the workflow. The approach is deliberately iterative: get data, clean it, annotate it, clean it again, add more information, clean again, and keep repeating that cycle until the dataset is genuinely useful. Nobody expects a first pass at real-world data to be correct, and the second pass usually will not be perfect either. What matters is that each cycle makes measurable progress, and that the current, imperfect version still gets shipped and used rather than held back waiting for a version that never quite arrives.

## The bigger vision for this dataset

Even at 41,000 companies, the file still contains real, well-funded startups mixed in with thousands of companies most people have never heard of. The long-term plan is to turn this into something closer to a crowdsourced platform, where people can add what they actually know about individual companies, particularly information relevant to international students who are trying to figure out which employers are realistic candidates for visa sponsorship. Every additional verified detail makes the underlying database more valuable for that specific purpose, but none of that annotation work is worth doing on top of a dataset still full of duplicate rows. Clean data first, everything else after.

## Key takeaways

- An AI model claiming it deduplicated a file is not proof the duplicates are gone; check the actual data yourself.
- Matching on company name alone is not enough. Requiring exact matches across name, phone number, and address catches duplicates reliably without over-merging distinct companies.
- Re-pasting a sample of your data structure before every new script request avoids mistakes caused by the model forgetting the exact file shape between requests.
- This pass cut the dataset from 57,965 to about 41,000 companies, a 28% reduction that matched a rough manual estimate.
- Iterative cleaning, clean, annotate, clean again, is treated as the normal workflow for real-world data, not a sign something went wrong the first time.
- Updated deliverables were pushed to GitHub within minutes so downstream users always have the current version.

## Who this is for

This is a practical example for anyone doing hands-on data cleaning work, especially with an AI coding assistant in the loop, and it doubles as a real demonstration of the data validation ideas taught in courses like INFO 7390 at Northeastern University. It is also directly relevant to the 80 Days to Stay initiative at Humanitarians AI, since this cleaned SEC company dataset is the foundation for later work identifying startups likely to sponsor international students for work visas.
