---
title: "Bhavana's Week 03: The Branches, Not the Happy Path"
seoTitle: "Bhavana's Week 03: Structured Data as a Contract"
description: "Bhavana Bhariday explains why job structured data must be treated as a contract with Google, and how to handle salary, remote, and intern edge cases."
summary: "A Humanitarians AI Fellow explains why the messy edge cases in job posting structured data, not the easy ones, are where real SEO engineering happens."
keywords: ["structured data json ld job postings", "google jobs schema salary field", "jsonld employment type mapping", "remote job structured data telecommute", "google jobs schema validation", "job posting schema edge cases", "seo engineer structured data contract", "internship employment type schema"]
generated: "article"
---

Getting a website's structured data to render for the easy cases is the simple part. The real test of a job listings site comes from the jobs that do not fit the template cleanly: no salary listed, a title that says "intern," a fully remote role with no office address at all. This week's update from a Humanitarians AI Fellow working on a job seeker platform's SEO is about exactly those messy cases, and why handling them badly is worse than not handling them at all.

## Structured data as a contract with Google

The rule the whole video is built on comes before any code: a schema field is a contract with Google. You emit a field only when the data behind it is complete, and you omit it cleanly when it is not. What you never do is fake a value just to fill the gap. That distinction matters more than it might sound, because a half-formed field does not just look sloppy, it teaches Google's crawler a malformed shape it may start expecting elsewhere on the site, which can quietly degrade how the rest of the structured data gets trusted and parsed.

## Mapping remote roles and internships

Three messy cases tested that rule directly: a job with no salary listed, a title that says "intern," and a fully remote role with no physical office. The instinct with structured data is often to fill in every field, using placeholders where real data is missing. That instinct is wrong here. A base salary field left half-formed, or a fake street address bolted onto a remote job, teaches the crawler the same malformed pattern the contract rule warns against. So the discipline holds across every field: emit base salary only when the number is actually there, map employment type to intern, part-time, or contractor based on the real title rather than guessing, falling back to full-time only when nothing else fits, and give a remote role a telecommute designation with a country-level requirement instead of inventing an address that does not exist.

## Testing when the real data pipeline is down

The harder problem in this update was not the schema logic, it was that there was nothing to test it against. The dev database was empty and nothing was deployed yet, which is where SEO work diverges from most feature work. You are not checking whether something looks right in a browser, you are checking whether it looks right to a crawler, and a crawler needs either real data or a live page to evaluate against. Neither existed. So the variety of test cases got built by hand instead of pulled from the database: four representative jobs, one with a salary, one without, one remote, one an internship, each checked line by line against the schema spec. It is slower than watching an automated check turn green, but it was the only option available while the real data loop was down.

## Key takeaways

- Treat a structured data field as a contract with Google: emit it only when complete, omit it cleanly when it is not, and never fill a gap with a fake value.
- A half-formed field, like a placeholder salary, can teach the crawler a malformed shape it starts expecting elsewhere on the site.
- Employment type should map cleanly to real title signals, intern, part-time, or contractor, falling back to full-time rather than guessing.
- A remote role with no office should use a telecommute designation with a country-level requirement, not a fabricated address.
- When no live data or deployed pipeline exists to test against, build a small, representative set of edge cases by hand and check it against the spec line by line.

## Try it yourself

Take a function in your own project that emits structured data, and ask Claude for the inputs most likely to break it: the empty field, the wrong type, the case nobody built for. For each one, decide whether it should fail with a clean omission or a safe fallback. This kind of hands-on debugging is a regular part of the work Fellows do in the Humanitarians AI Fellows program.
