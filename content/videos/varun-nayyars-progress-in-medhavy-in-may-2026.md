---
title: "Varun Nayyar's Progress in Medhavy in May 2026"
seoTitle: "Medhavy Month 1: Textbook and Epic FHIR Work"
description: "Varun Nayyar's first month on the Medhavy project covers textbook prompt repairs and a healthcare data pipeline built against the Epic FHIR sandbox."
summary: "Varun Nayyar recaps his first month on the Medhavy project, splitting time between textbook prompt engineering and building a clinical data pipeline against Epic's FHIR sandbox."
keywords: ["medhavy project humanitarians ai", "epic fhir sandbox integration", "clinical data extraction pipeline", "oauth scope 403 forbidden fix", "electron microscopy textbook prompt engineering", "healthcare api authorization troubleshooting", "sparse sandbox data limitation", "manim physics mechanics animation"]
generated: "article"
---

Volunteering on a technical project rarely means working on one thing at a time. Varun Nayyar's first month on the Medhavy project at Humanitarians AI ran two separate technical duties in parallel from the very first week: repairing prompt engineering on an electron microscopy textbook, and building a clinical data extraction pipeline against a live hospital API. Neither task waited for the other to finish.

## Repairing the textbook's prompt and rendering

The first duty was the electron microscopy textbook. Rather than pushing changes straight to the main branch, prompt changes went to a dedicated branch, since altering a prompt that an entire textbook tutor depends on isn't a small edit. The visible half of that work was fixing what was breaking in production: equations failing to typeset correctly, image paths resolving to the wrong location, and a cover page that wouldn't build into the self-contained output. That work eventually merged into the textbook repository as a proper pull request, though getting there took longer than expected. The repository access needed to open the pull request took a week to become usable, because the invite had simply sat unread. Once it was opened, the fixes went in cleanly.

## Building a pipeline against a real healthcare API

The second duty was healthcare systems integration research run against Epic's FHIR sandbox, which is a real API with real authentication rather than a simplified tutorial environment. The extraction pipeline was built end-to-end: test patient identifiers, a bulk group identifier, and nested demographic records flattened into something analyzable. Two scripts carry that pipeline. The first flattens nested demographic structures into a single file, and the second pulls six clinical categories: problems, encounter diagnoses, labs, social history, encounters, and diagnostic reports.

## Reading what the server is actually refusing

Retrieving note text initially returned a 403 Forbidden error. The fix that mattered wasn't retry logic; it was reading exactly what the server was refusing. The issue turned out to be a missing OAuth scope, system/binary.read, which resolved through the developer portal once identified. It wasn't a defect in the pipeline. It was a permission the token had never been granted in the first place.

## The finding that mattered more than the fix

The authorization fix wasn't the end of the story. Across the entire sandbox, only seven patient records were populated, and sparsely at that, which isn't enough data to build meaningful research on. That limitation was reported in writing, along with a summarized spreadsheet of the sandbox API and an offer to explore further. The project's supervisor, Prof. Sridhar, ended the Epic integration workstream, citing accumulated blockers: sparse data, authorization friction, and an unclear access model, all of which had already been documented from the pipeline work. The same day brought a new assignment: a Manim instructional video for the physics mechanics textbook, with access requested that same day.

## What a month of dual duties actually looked like

Across the four weeks of the month, each duty logged roughly twenty hours, for eighty hours total, reported as in compliance. That even split is worth noting on its own: the textbook repairs weren't a side task squeezed in around the healthcare integration, and the healthcare integration wasn't a background experiment run alongside the "real" work on the textbook. Both were treated as full workstreams from the first week onward, tracked and documented independently, which is part of why the eventual decision to end the Epic integration didn't derail the month's output. The textbook repairs had already merged as their own pull request, on their own timeline, regardless of what happened with the healthcare API.

## The throughline: documentation as the actual deliverable

What connects both halves of the month is less about the specific fixes and more about how problems got surfaced. The repository-access delay, the missing OAuth scope, and the sparse sandbox data were all treated the same way: identified, written down, and escalated with evidence rather than left as unspoken friction. That's what let a supervisor make a clean call to end a workstream instead of leaving it to quietly stall out. Two technical duties, two different outcomes, one consistent habit of documenting exactly what broke and why.

## Key takeaways

- Two technical duties, textbook prompt repairs and a healthcare API integration, ran in parallel from the first week rather than sequentially.
- Prompt changes to a production textbook went to a dedicated branch before merging as a pull request, given how much the tutor depends on that prompt.
- A 403 Forbidden error on the Epic FHIR sandbox traced back to a missing OAuth scope, not a pipeline defect.
- Building the pipeline end-to-end surfaced a more important finding: only seven sparsely populated patient records existed in the sandbox, insufficient for research.
- Documenting and escalating that data limitation led to the workstream being formally ended in favor of a new assignment.
- The month totaled 80 hours across four weeks, with both technical duties documented in compliance.

## Who this is for

This is for anyone curious about what real fellowship or volunteer engineering work looks like when it runs into government or enterprise-grade API constraints, rather than a clean tutorial environment. It's a progress update from the Medhavy project within the Humanitarians AI Fellows program.
