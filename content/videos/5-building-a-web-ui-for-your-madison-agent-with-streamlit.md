---
title: "5 - Building a Web UI for Your Madison Agent with Streamlit"
seoTitle: "Build a Streamlit Web UI for Your Madison Agent"
description: "Kriti shows how to wrap an n8n Madison agent workflow in a Streamlit web interface, connect it via webhook, and deploy it to Streamlit Cloud."
summary: "This tutorial turns a technical n8n workflow into a Streamlit web app that non-technical brand managers can use, connected through a webhook and deployed publicly for free."
keywords: ["streamlit ui for n8n workflow", "connect n8n webhook to python", "streamlit cloud deploy tutorial", "madison agent web interface", "pip install streamlit setup", "n8n webhook post http request", "pandas display reddit data table", "share streamlit io deploy app"]
generated: "article"
---

A working n8n workflow is only useful to the people who can operate n8n. For a brand manager or marketer who has no interest in learning a workflow automation tool, that technical backend is invisible and inaccessible. Kriti's tutorial closes that gap by wrapping a Madison agent's n8n workflow in a Streamlit web interface, built entirely in Python, that a non-technical user can just click through.

## Why Streamlit

Streamlit lets you build a user interface with nothing but Python, no JavaScript, HTML, or CSS required, which makes it a fit for data-focused applications like a Madison agent. It's also free to host on Streamlit Cloud, which removes the usual friction of standing up your own server just to share a small internal tool. The goal isn't a polished consumer product, it's making the Madison tool something brand managers and marketers can use without getting anywhere near the underlying automation.

## Getting Streamlit running locally

Setup starts with a single terminal command, `pip install streamlit`, which pulls in all the necessary dependencies. From there, the tutorial creates a new Python file, `madison_app`, in Visual Studio, inside the same repository used in the earlier videos in this series, continuing directly from that prior work. A basic starter version of the app runs with the command `streamlit run madison_app`, which launches a local web application viewable right in the browser.

## Connecting the UI to the workflow

With a bare interface running, the next step is deciding what the app actually needs to input and output. Input can be a text field or a dropdown; output has more room for creativity, whether that's a chart, a table, or something else entirely. The example built here is a brand analysis tool for OpenAI, using Reddit data as the underlying source. On the n8n side, the workflow's original manual trigger gets replaced with a Webhook node configured as a POST HTTP request, which gives the workflow a URL that outside code can call. That webhook URL is what the Streamlit app's Python code hits, using the `requests` library to send whatever the user typed, a brand name like OpenAI in this case, over to the locally running n8n server. Once n8n finishes gathering the relevant Reddit data, the response coming back from that HTTP node gets unpacked in the Streamlit code, using pandas to turn the raw response into a structured, readable format.

## Displaying the results

Once the pieces are wired together, running the app and triggering the n8n workflow produces a live result inside the UI: a table showing Reddit post titles, upvote counts, and the users who posted them, along with a deeper-dive section for more detail. The tutorial is explicit that this display layer is where you get creative freedom, tables, charts, metric cards, or any other visualization that suits the data your Madison agent is producing.

## Deploying publicly with Streamlit Cloud

A locally running app only helps the person running it. To make it accessible to anyone, the tutorial moves to Streamlit Cloud, starting with a GitHub repository holding the app code. If dependencies exist beyond Streamlit itself, a `requirements.txt` file listing them is required for the cloud deployment to work. From there, creating a free account at share.streamlit.io and clicking "Create app" starts the deployment flow: choosing to deploy a public app from GitHub, pasting the GitHub URL for the specific Python file (the Madison app file in this case), and picking a domain name for the project. In the demo, the domain reflects the specific brand analysis project being built, resulting in a public URL on the streamlit.app domain. Clicking deploy finishes the process in a matter of seconds, producing a public URL that anyone on the internet can use to run the tool.

## Keep it functional, not beautiful

The tutorial closes on the 80/20 rule: the priority is making the interface functional and clear, not making it beautiful. What matters most for a tool like this is that brand managers and marketers can understand and operate it without any technical background, not that it wins a design award. A future video in the series is noted to cover an alternative UI approach using Gradio.

## Key takeaways

- Streamlit builds a full web UI using only Python, with free hosting available through Streamlit Cloud.
- Local setup is a single `pip install streamlit` command followed by `streamlit run <filename>` to launch the app in a browser.
- Connecting the UI to an n8n workflow means replacing the manual trigger with a Webhook node configured as a POST request, then calling that webhook URL from Python using the `requests` library.
- Pandas turns the raw JSON response from n8n into readable tables and metric cards inside the Streamlit app.
- Deploying publicly requires a GitHub repository with a `requirements.txt` file, then a few clicks on share.streamlit.io to get a public URL on the streamlit.app domain.
- The guiding principle throughout is the 80/20 rule: prioritize functional and clear over beautiful.

## Who this is for

This tutorial is for anyone building on the Madison framework who wants non-technical stakeholders, brand managers, marketers, or other team members, to interact with an n8n-based agent without touching the workflow itself. It's part of the Madison agent UI tutorial series from Humanitarians AI.
