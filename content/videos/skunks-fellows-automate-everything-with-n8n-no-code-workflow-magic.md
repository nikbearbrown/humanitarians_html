---
title: "Skunks & Fellows: Automate Everything with n8n! | No-Code Workflow Magic"
seoTitle: "Automate Reddit to Notion with n8n (No-Code)"
description: "A hands-on n8n tutorial builds a full workflow that pulls filtered Reddit posts and automatically creates pages in Notion, almost entirely without code."
summary: "This Skunks and Fellows tutorial builds a complete n8n workflow from scratch, pulling Reddit posts, filtering them by keyword, and pushing the results into Notion pages automatically."
keywords: ["n8n automate reddit to notion", "n8n workflow tutorial no code", "n8n reddit api get many posts", "n8n filter node keyword example", "n8n code node javascript python", "n8n notion integration create page", "n8n trigger node rss feed", "no code automation workflow n8n"]
generated: "article"
---

Automating a repetitive data task usually means either writing a full script or paying for a closed platform that limits what you can connect. n8n splits the difference: it's open-source, visual, and flexible enough to wire together APIs without writing much code at all. This Skunks and Fellows tutorial builds a complete, working example from an empty canvas: pulling Reddit posts, filtering them, and automatically creating pages in Notion.

## Starting with a trigger node

Every n8n workflow starts with a trigger node, the thing that kicks the rest of the workflow into motion. For testing, a manual trigger works fine, firing whenever you click "test workflow." For a live workflow, something like an RSS feed trigger fires automatically whenever a new item appears in a feed. Getting the trigger right first matters because everything downstream depends on it firing correctly.

## Pulling posts from Reddit

The next node in the chain is a Reddit API call using "get many posts," which requires setting up Reddit OAuth credentials first. That setup is fairly simple: name the app, add a description and redirect URI, generate a client ID and secret, and connect and authorize the account. Once connected, the workflow can pull posts from a specific subreddit, in this case r/artificial, with a set limit (20 posts in the walkthrough) rather than returning everything at once.

## Filtering with two conditions

Raw Reddit data comes back messy, some posts have empty fields that aren't useful. A filter node removes posts where the self text or title field is empty, catching cases where the field technically "exists" but is an empty string, which required using an "is not empty" string condition rather than just checking existence. In the example, that filter alone discarded seven of the twenty pulled posts. A second filter node narrows further by keyword, checking whether the title contains a specific term like "AI," which cut the remaining set down to four relevant posts.

## Parsing the data with a code node

With the relevant posts isolated, a code node (writable in either Python or JavaScript) extracts just the fields actually needed, title, self text, and permalink, rather than passing along the full, bulky data table. The code node loops through every input item, builds a result array from the three needed fields, and returns that array. Returning the output as an array is called out specifically as the detail that has to be right for the node to work.

## Pushing results into Notion

The final step sends the cleaned data somewhere useful: a new Notion page. That requires setting up a Notion integration (an internal integration created from Notion's own settings, generating a secret used as the API credential in n8n), then connecting that integration to a specific Notion page so the workflow has permission to write to it and its child pages. Inside n8n, a Notion "create page" node then uses the post title as the page title and adds content blocks, one for the self text and one for a formatted link back to the original Reddit post.

## Running the finished workflow

Once wired end to end, running the workflow pulls the filtered posts and creates a corresponding Notion page automatically, with all four filtered posts appearing with their extracted information laid out clearly. Running it again reproduces the same result reliably, demonstrating a fully automated pipeline from a subreddit straight into an organized Notion workspace.

## Key takeaways

- Every n8n workflow starts with a trigger node; manual triggers are useful for testing, while feed-based triggers automate the workflow entirely.
- Reddit's "get many posts" node requires setting up OAuth credentials through a Reddit-registered app first.
- Filter nodes can catch subtler issues than missing fields, like fields that technically exist but are empty strings.
- A code node (Python or JavaScript) can trim bulky API responses down to just the fields you actually need, and must return its result as an array.
- Notion integrations need to be explicitly connected to the target page before a workflow can write to it.
- The finished pipeline runs the entire process, fetch, filter, parse, and publish, without manually touching each step.

## Who this is for

This tutorial is part of the Skunks & Fellows series from AI Skunkworks at Northeastern University and Humanitarians AI Fellows, aimed at anyone who wants practical, hands-on automation skills without needing to write a full application, useful for both business and personal workflow automation.
