---
title: "AI-Powered Intelligence Hub: Natural Language Financial & Patent Analysis | Nerd Stuff"
seoTitle: "Mycroft Intelligence Hub: SEC + Patent AI Routing"
description: "Darshan Rajopadhye builds a natural language router that sends SEC filing and patent queries to the right Mycroft workflow using local LLMs."
summary: "Darshan Rajopadhye unifies SEC filing and patent analysis into one Mycroft Intelligence Hub, using a local LLM to route plain-English queries."
keywords: ["mycroft intelligence hub sec patents", "n8n webhook workflow trigger", "ollama llama 3 query routing", "natural language financial analysis ai", "sec filings patent workflow automation", "local llm orchestration agentic", "persistent data storage n8n workflow", "humanitarians ai mycroft financial intelligence"]
generated: "article"
---

Two working AI workflows are useful on their own, but they become something more once you can ask a single plain-English question and let the system figure out which one to run. That's the jump Darshan Rajopadhye makes in this walkthrough of the Mycroft Intelligence Hub, which unifies an SEC filings analysis workflow and a patent intelligence workflow, both built earlier as part of the Mycroft Agentic Framework, into one orchestrated system.

## From manual triggers to webhooks

Both underlying workflows needed the same core changes before they could be integrated. The biggest one: replacing a manual trigger with a webhook, exposing each workflow as a REST API endpoint that can be called programmatically from anywhere rather than run by hand inside the workflow editor. Darshan demonstrates this on the SEC filings workflow specifically, showing that once the workflow is active, passing a query parameter like a ticker symbol through a browser URL triggers the entire workflow automatically, with no manual execution step required. The only wrinkle: the webhook method needs to be set to POST for the actual intelligence hub, even though GET works fine for casual testing.

## Logging and persistent storage

The second change was comprehensive execution logging. Python nodes were added at each step to write progress to a log file, so the system's current stage stays visible centrally, which matters once a workflow is triggered programmatically instead of watched live in an editor. The third change was persistent storage. Previously, working files were deleted after each run, leaving only the final analysis behind, which is fine for a human checking results by hand but not enough if an LLM or AI system needs that data as context later. Darshan built a persistent storage system where all data gets saved under dedicated directories, passed through the workflow so new data can be added, checked, and reused as context for whatever gets built next. All three changes, webhook triggering, logging, and persistent storage, were replicated identically across both the SEC filings and patent intelligence workflows.

## The hub as an AI orchestrator

With both workflows upgraded, the actual problem becomes usability: nobody wants to hand-construct URLs with query parameters, remembering ticker symbols or calculating date ranges for patents by hand. The Intelligence Hub solves that by acting as an AI orchestrator. A local LLM running on Ollama, using Llama 3, acts as the router: it carries a system prompt describing which tools are available and how to decide between them, and it calls the correct workflow, currently either the SEC or the patent workflow, based on the plain-English query it receives. One practical benefit of letting an LLM handle routing rather than exact string matching: it tolerates spelling mistakes and vague phrasing while still choosing the correct workflow.

## From raw data to a downloadable report

A second LLM in the pipeline handles the output side. It reads the data saved in persistent storage as context and produces an executive summary report in markdown, which then gets converted to HTML and from HTML to a downloadable PDF, saved to the system for later use. Darshan notes this could be extended further, sending the resulting PDF automatically to email, Discord, or Slack through an HTTP request.

## Watching it run

In the demo, a chat-triggered window accepts a query like "analyze Nvidia's financials." The query goes to the routing LLM, which decides which tool to call, correctly identifying the SEC workflow for a financial question, then runs it, logs progress along the way, and, if multiple workflows were relevant, would aggregate their results. An extraction step pulls the files saved by the SEC workflow and passes them into the analyst LLM chain, running on a locally served model, which takes a noticeable amount of time given the volume of context and numbers involved. Once that finishes, the system logs again, converts markdown to HTML to PDF, and writes the final file. The resulting report includes an executive summary, key findings, and risk factors, all built from actual numbers pulled from the company's real SEC filings.

## Key takeaways

- Both the SEC filings and patent intelligence workflows were converted from manual triggers to webhook-based REST endpoints so they can be called programmatically.
- Comprehensive logging and persistent, directory-based storage replaced ephemeral files, making saved data reusable as context for downstream AI analysis.
- A local LLM running on Ollama with Llama 3 acts as a router, choosing the correct workflow from a natural-language query and tolerating typos or vague phrasing.
- A second LLM turns raw workflow output into a markdown executive summary, converted through HTML into a downloadable PDF report.
- The architecture and code for the Intelligence Hub are documented in the Mycroft GitHub repository under the Financial Intelligence Hub.

## Who this is for

This walkthrough is for anyone building agentic systems that need to coordinate multiple specialized workflows behind one natural-language interface, particularly developers interested in n8n-based automation paired with local LLM routing. It's part of the Mycroft project's open, documented build process, with the Core Components and workflow code linked directly from the Humanitariansai GitHub for anyone who wants to extend it with more tools.
