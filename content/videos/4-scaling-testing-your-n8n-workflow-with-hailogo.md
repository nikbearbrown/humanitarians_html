---
title: "4  Scaling & Testing Your n8n Workflow with HAILogo"
seoTitle: "n8n Pagination and Rate Limiting for Production"
description: "Learn to scale an n8n workflow for production with Reddit API pagination, wait node throttling, and a documentation and testing checklist."
summary: "The final Madison framework n8n tutorial covers pagination, rate limiting, and the documentation and testing practices needed to move a workflow toward production."
keywords: ["n8n pagination reddit api", "n8n wait node rate limiting", "n8n api throttling exponential backoff", "n8n update parameter each request", "n8n workflow documentation readme", "reddit api n8n workflow tutorial", "n8n production ready workflow scaling", "madison framework testing checklist"]
generated: "article"
---

A workflow that works on ten test records can fall apart the moment it meets real-world scale. This final tutorial in the Madison framework n8n series, presented by Krithi, is about closing that gap: turning a working prototype into something that can handle hundreds or thousands of records, respect API rate limits, and hold up under professional-level documentation and testing standards.

## What real-world scale actually demands

Before touching any nodes, the video lays out the constraints a production workflow needs to account for. It should be able to process hundreds or thousands of records against whatever APIs a project relies on. Many APIs cap how many calls you can make in a given window, the video points to Twitter's API as an example, which allows only one call every 15 minutes, and a lengthy workflow that ignores those limits risks timing out or getting interrupted mid-run. Showing that you have thought through these constraints is treated as part of demonstrating professional-level implementation.

## Pagination with the Reddit API

The demonstration uses a real project: a market research workflow that scrapes popular Reddit discussions about OpenAI from the OpenAI subreddit, using connected Reddit API credentials. Most APIs cap how many results a single request can return, so the workflow sets a limit parameter of 25, meaning Reddit sends back 25 posts per response. Below that, the pagination option is set to "update a parameter in each request," since Reddit requires flipping to the next page by updating a specific field, in this case called "after." That field tells n8n which ID to use to fetch the next batch of posts. A safety check stops the loop once Reddit stops returning an "after" ID, which signals the end of the results, and the maximum number of pages is capped at two. With a 25-item limit per page and two pages, the workflow pulls around 50 posts total, and only the necessary fields, post title, upvote count, and body text, are kept before the results are sorted by upvotes. The same pagination approach scales to 500 or more responses when a project needs it.

## Rate limiting and throttling

Beyond pagination, the video addresses how to avoid tripping API rate limits outright, which matters most for any workflow making frequent or repeated calls to the same API. Adding a Wait node between API calls introduces a deliberate pause, typically five to ten seconds, so a workflow with multiple HTTP requests does not fire them off too quickly and trigger a rate limit response. For more advanced control, a function node can implement exponential backoff, increasing the wait time between retries progressively rather than using a fixed delay, which gives a workflow more room to recover gracefully from a provider that is actively throttling requests.

## Documentation and testing for production

The tutorial closes on what professional documentation and testing looks like in practice. That includes writing a comprehensive README covering setup instructions and required credentials, providing an architecture diagram, and explaining each workflow component. It also means documenting known limitations and success rates, building systematic test cases that cover both normal and edge cases, and recording actual test results and metrics, ideally showing improvement compared to a previous version of the project.

## Key takeaways

- Production workflows need to account for API rate limits, such as Twitter's one-call-per-15-minutes restriction.
- Reddit's pagination in n8n uses an "update a parameter in each request" approach with an "after" field to fetch subsequent pages.
- A safety check that stops looping once the "after" ID disappears prevents a pagination loop from running indefinitely.
- A Wait node between API calls, five to ten seconds, helps avoid tripping rate limits; a function node can add exponential backoff for more control.
- Professional documentation includes a README, an architecture diagram, known limitations, and systematic test cases covering normal and edge conditions.

## Who this is for

This tutorial closes out the n8n portion of the Madison framework series and is aimed at Humanitarians AI Fellows preparing a workflow for real deployment rather than a demo. The series continues next with building a simple user interface for a Madison agent using Streamlit or Gradio, turning the technical backend into something non-technical users can interact with directly.
