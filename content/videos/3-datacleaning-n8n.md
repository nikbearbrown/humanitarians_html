---
title: "3 - Datacleaning n8n"
seoTitle: "n8n Data Cleaning and Error Handling Tutorial"
description: "This n8n tutorial covers cleaning messy API data with a Code node and adding retry loops and If node error handling to boost workflow reliability."
summary: "The third Madison framework tutorial covers cleaning messy API data and building retry logic in n8n so your automation workflow survives real-world failures."
keywords: ["n8n data cleaning tutorial", "n8n code node javascript clean data", "n8n retry loop if node", "n8n error handling http request", "n8n workflow success rate testing", "clean api data null values", "n8n error trigger node tutorial", "madison framework n8n workflow"]
generated: "article"
---

An AI agent built on messy data is only as reliable as the mess it was trained on. This third tutorial in the Madison framework series, led by Krithi, tackles the unglamorous but essential work that separates a demo workflow from one that actually holds up: cleaning API data and handling the errors that come with calling real-world APIs.

## Why clean data is the foundation

Before touching any n8n nodes, the video makes the case for why this step matters. Common data problems, missing fields, null values, inconsistent formatting, duplicate entries, or irrelevant information, degrade an AI agent's reliability directly. If your project needs to demonstrate improvement in a workflow's success rate, data cleaning is where that improvement actually starts, not an afterthought bolted on at the end.

## Cleaning data with a Code node

The demonstration builds directly on a previous workflow in the series that pulled JSON data from an OpenAI-related API. Rather than starting from scratch, a few additional variables and parameters are added to that same API call, which gives the workflow enough messy fields to actually demonstrate a cleaning problem instead of a clean, artificial example. After the HTTP Request node, a Code node running JavaScript is added to do the actual work: it strips out null values and can standardize the response format, including adding timestamps where useful for downstream steps. Executing the workflow confirms the cleaning step works as intended, with the output showing clearly cleaned data compared to what came back from the raw API call.

## Building error handling and retry logic

Clean data alone does not protect a workflow from calls that fail outright. The video walks through three complementary approaches available in n8n: an If node that implements a try/catch-style pattern, Error Trigger nodes that activate when something fails, and retry logic for temporary failures. The practical demonstration focuses on retry logic specifically: an If node checks whether an expected ID field is present in the response. If it is, the workflow proceeds to data processing as normal. If it is not, the workflow routes to a second HTTP Request node configured identically to the first, which loops back into the same If node. That loop gives the workflow a way to retry a failed call automatically rather than breaking on the first hiccup.

## Testing and documenting improvement

The tutorial closes with a structured approach to proving the changes actually helped, rather than just assuming they did. That means creating a simple testing plan using five to ten different inputs, running the workflow against each one, documenting the results, and calculating a success percentage each time. The process is meant to be repeated: keep testing the API or response data again and again, and document the improvement between versions rather than only reporting a single final number. The video uses a concrete example to make this tangible: a workflow that originally succeeded 70% of the time might improve to 85–90% reliability once error handling and data cleaning are in place. Documenting that jump, not just making it, is presented as essential to demonstrating real progress on a Madison framework contribution.

## Where this fits in the larger series

This tutorial sits in the middle of a progression that starts with collecting data from APIs and ends with a workflow ready for production use. Data cleaning and error handling are framed as the step that turns a workflow from something that merely runs into something that can be trusted to run repeatedly, which matters because the next stage in the series is about scaling the same workflow to handle real-world volume and API rate limits.

## Key takeaways

- Missing fields, null values, duplicates, and inconsistent formatting are the main data quality problems to address before trusting a workflow's output.
- A Code node running JavaScript can strip null values and standardize API responses in place.
- n8n offers three error-handling patterns: If node try/catch logic, Error Trigger nodes, and retry logic.
- Connecting an If node back to a second HTTP Request node creates a retry loop that shields a workflow from temporary API failures.
- Testing with five to ten inputs and calculating a success rate turns "it feels more reliable" into a documented, measurable improvement.

## Who this is for

This tutorial is aimed at anyone building or contributing to a Madison framework project in n8n, particularly Humanitarians AI Fellows who need to show measurable reliability improvements in their workflow contributions. The next video in the series moves on to scaling and testing the workflow for production use.
