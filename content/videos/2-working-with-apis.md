---
title: "2 - Working with APIs"
seoTitle: "Working with APIs in n8n for Your Madison Agent"
description: "This n8n tutorial covers choosing the right APIs, setting up OAuth credentials securely, and building a workflow that pulls and merges real data sources."
summary: "This tutorial connects an n8n pipeline to real-world APIs, covering how to choose data sources, set up OAuth credentials safely, and build a workflow that pulls, branches, and merges API data for a Madison agent."
keywords: ["n8n http request node tutorial", "connect n8n to twitter api", "n8n oauth2 credentials setup", "madison agent data collection", "n8n merge node multiple apis", "api key security best practices", "n8n manual trigger workflow", "brand analysis api data sources"]
generated: "article"
---

An AI agent is only as good as the data feeding it, and pulling real data into a workflow means dealing with API keys, authentication, and rate limits instead of a clean CSV. This second video in the Madison framework tutorial series, presented by Kiti, walks through connecting an n8n pipeline to real-world APIs so a Madison agent has actual data to work with, not placeholder examples.

## Picking APIs that match your problem

Before any technical setup, the video makes the case that API selection has to match your specific problem statement, and that a single source usually isn't enough: aim for at least two to three relevant data sources. For a brand analysis project, that means looking at the YouTube Data API, the Twitter API, or web scraping tools. For market research, it means product review APIs, Google Trends, or price comparison sites. For a customer service project, support ticket databases or FAQ scraping fit better. The through-line is that the source has to provide data directly relevant to what you're actually trying to measure, not just whatever API happens to be easy to set up.

## Setting up credentials without leaking them

The tutorial demonstrates credential setup using the Twitter/X developer portal at developer.x.com, which comes with a clear security warning attached: never share your API keys or commit them to public repositories. After signing up and landing in a default project, the process runs through the settings panel to user authentication setup, where app permissions need to be set to read and write and the app type set to "web app." The callback URI has to point back to your local n8n instance, and once that's saved, X generates a client ID and secret key. Back in n8n, adding the credential means clicking the plus icon, searching for "X," and selecting OAuth 2 API, then pasting in the client ID and secret and clicking "Connect my account" to authorize the app. Once authorized, the credential appears in n8n ready to use.

## Building the API collection workflow

With credentials in place, the tutorial builds a workflow named "API collection" starting with a manual trigger, followed by an HTTP Request node configured to send a GET request. The example endpoint pulls public profile data for the OpenAI Twitter account, returning structured JSON with fields like user ID, name, username, and profile description. For authentication, the node is set to "Predefined Credential Type" using the X OAuth2 credential configured earlier. Running the node confirms the connection works, with output visible in both JSON and table format. For larger datasets, like full sets of tweets or reviews, the tutorial notes you'd typically add a JSON parse node to structure the data and a write binary file node to save it, though that step isn't needed for a simple profile lookup.

## Chaining and merging multiple sources

Since a single API rarely covers a full problem statement, the tutorial covers two ways to combine sources in one workflow. The first is running parallel branches directly off the trigger node, adding a second HTTP Request node alongside the first. The second is a sequential setup, where the output of one API call feeds the next, for example pulling a list of products from one API and then looping through those products to pull detailed reviews from a second API. A Merge node then combines the resulting datasets into one before anything gets saved.

## Key takeaways

- Choose at least two to three APIs that map directly to your specific problem statement rather than defaulting to whatever's convenient.
- Never share API keys or commit them to public repositories; store credentials inside n8n's credential manager instead.
- A basic API collection workflow starts with a manual trigger and an HTTP Request node set to GET, authenticated with a predefined OAuth2 credential.
- Larger datasets typically need a JSON parse node and a write binary file node to structure and save the output.
- Multiple APIs can be combined with parallel branches off the trigger, a sequential chain where one API's output feeds the next, or a Merge node to combine datasets.
- Aim for a data harvest of at least 50 to 100 records, and document your data sources as you go.

## Try it yourself

If you're building toward your own Madison agent, this is a workflow you can rebuild directly: pick two or three APIs relevant to your specific problem, set up OAuth credentials in n8n without ever hardcoding a key, and chain an HTTP Request node into a Merge node to combine your sources. This is one part of the INFO7375 Branding & AI series from Humanitarians AI, with data cleaning and error handling covered in the next video in the series.
