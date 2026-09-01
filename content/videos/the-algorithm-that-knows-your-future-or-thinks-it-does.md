---
title: "The Algorithm That Knows Your Future (Or Thinks It Does)"
seoTitle: "AI Financial Goal Simulator with Monte Carlo"
description: "A walkthrough of an AI-powered retirement planning tool that turns plain-English goals into Monte Carlo simulations using real market data."
summary: "Darshan demos a full-stack app that extracts financial goals from natural language and runs Monte Carlo simulations to show whether your retirement plan actually works."
keywords: ["ai financial goal simulator", "monte carlo retirement simulation", "fastapi ollama llama 3.1", "yfinance monte carlo python", "natural language financial goal extraction", "react recharts financial dashboard", "retirement savings success probability", "monte carlo portfolio simulation python", "llm goal extraction confidence scoring", "ai retirement planning tool"]
generated: "article"
---

Most people can state a financial goal in one sentence: retire in twenty years with a million and a half dollars, saving five thousand a month. Turning that sentence into a real answer about whether the plan works usually means a spreadsheet, a financial advisor, or a lot of guesswork. Darshan built a system that skips the form-filling entirely and lets you type the goal the way you'd say it out loud, then backs it with thousands of simulated market outcomes.

## A goal extraction pipeline built on local AI

The application is a full-stack platform with a FastAPI backend and a React frontend, and its first job is understanding what the user actually wants. Rather than asking for a structured form, it accepts a plain-English description of a goal and runs it through a local Llama 3.1 model served by Ollama. The model extracts structured data from the sentence, along with a confidence score, and because it's a language model doing the parsing rather than a rigid form, typos and casual phrasing don't break it. The backend exposes this as one of three core REST endpoints, alongside health checks and simulation, and each is documented through FastAPI's interactive API docs so another developer can see the exact parameters and response bodies without reading the source.

That decoupling matters beyond the demo. Because the endpoints are independent of the React frontend, they can be called from a mobile app, wired into a spreadsheet, or dropped into a chatbot workflow built in n8n, which is the same automation tool used elsewhere in Humanitarians AI's other finance-focused work under the Mycroft project.

## Monte Carlo simulation with real market data

Once a goal is extracted, the real work happens in a custom Monte Carlo engine. It pulls real historical market data from Yahoo Finance through the free yfinance library, then runs the numbers across thousands of simulated scenarios to calculate portfolio statistics and a success probability. The engine relies on numpy for vectorized computation, which keeps it fast even at scale: a run of a thousand simulations across two goals at once finished in under a second.

## Three-step workflow: extract, configure, view results

The interface walks a user through three stages. First, they describe the goal in natural language with no jargon and no required format. Clicking "extract goal" sends the sentence to the backend, which parses it and pre-populates a configuration form with details like target amount, timeline, and current savings. From there, the user can adjust the assumptions: asset allocation percentages, which must add up to 100 percent, and the inflation rate used in the projections. Once the configuration looks right, running the simulation produces the third stage, a results view built with Recharts on a Tailwind CSS interface.

The results screen leads with the overall portfolio success rate, the probability of hitting the stated goal given the chosen allocation and contributions. Below that sits a breakdown of median, worst-case, and best-case outcomes, an expected shortfall figure, and an interactive chart showing percentile outcomes across the simulation. When a goal isn't on track, the system also surfaces recommendations for what to change.

## Stress-testing multiple goals at once

The demo doesn't stop at a single goal. Darshan added a second one, a fifteen-year timeline with $45,000 in current savings, and ran the Monte Carlo simulation again with both goals combined. The combined configuration was too ambitious for the contributions on the books, and the success rate dropped straight to zero. The system still computed the worst-case outcomes and offered a recommendation: increase the monthly contribution by about $3,500. Bumping the contribution to $4,000 and re-running the simulation pushed the success rate back up to 99.9 percent, a concrete before-and-after that shows the tool isn't just producing a static report but letting users iterate toward a plan that actually works.

## Built for reliability, not just demos

Two engineering choices stand out for making this practical rather than fragile. On the language model side, the extraction pipeline uses prompt engineering with few-shot examples and structured output parsing, so the system handles messy natural language input, including misspellings, without failing outright. On the simulation side, the numpy-vectorized Monte Carlo engine is what keeps thousands of scenarios across multiple goals running in near real time instead of taking minutes. Full documentation for the system, including the API reference, lives in the project's GitHub repository.

## Key takeaways

- The system pairs a locally run Llama 3.1 model with FastAPI to turn a plain-English financial goal into structured, confidence-scored data.
- A custom Monte Carlo engine pulls real market data from Yahoo Finance via yfinance and uses numpy for fast, vectorized simulation.
- Three decoupled REST endpoints (health, goal extraction, simulation) mean the backend can plug into mobile apps, spreadsheets, or chatbot tools like n8n.
- The results view reports a success probability alongside median, worst-case, and best-case outcomes and an expected shortfall.
- Adding a second goal shows how combined targets can drop a success rate to zero, and how a specific contribution increase can recover it.
- Prompt engineering with few-shot examples keeps goal extraction resilient to typos and casual phrasing.

## Try it yourself

If you're comfortable with FastAPI, Ollama, or Monte Carlo methods in Python, the project's GitHub repository has the full documentation needed to set this up locally, including the API reference for building your own front end on top of it. Anyone curious about how natural language processing and financial simulation can work together should find the walkthrough a useful starting point.
