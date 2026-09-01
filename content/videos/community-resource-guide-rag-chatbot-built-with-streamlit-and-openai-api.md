---
title: "Community Resource Guide | RAG Chatbot Built with Streamlit and OpenAI API"
seoTitle: "RAG Chatbot for Community Resources in Streamlit"
description: "See how a Streamlit chatbot built with OpenAI API and Hugging Face search helps Durham, NC residents find healthcare, education, and emergency resources."
summary: "A Humanitarians AI developer walks through a RAG chatbot that helps Durham, NC residents find healthcare, education, and emergency services in plain conversation."
keywords: ["rag chatbot streamlit tutorial", "openai api community resource app", "retrieval augmented generation chatbot demo", "streamlit chatbot hugging face search", "durham nc community resources app", "rag chatbot for nonprofits", "chatbot for local social services", "multilingual community resource chatbot"]
generated: "article"
---

Finding the right social service in a city like Durham, North Carolina, usually means digging through directories, phone trees, and outdated PDFs. A resident who needs housing help, healthcare, or emergency assistance often has to know exactly which organization to call before they can get an answer. This video introduces a project built to remove that friction: a retrieval-augmented generation chatbot that lets people simply ask what they need in plain language.

## What the Community Resource Guide does

The tool is a chatbot built on Streamlit that sits on top of a structured database of Durham-area organizations. Instead of browsing a list, a user types a question, and the chatbot searches a curated set of community resources and responds with a natural, conversational answer. The goal is to make essential services such as healthcare, education, and emergency assistance easier to reach, especially for people in underserved communities who may not know where to start looking.

## How retrieval-augmented generation powers the answers

The chatbot is powered by the OpenAI API, which handles the natural, conversational side of the interaction, while Hugging Face's search capabilities help retrieve the most relevant resources for a given question. Each entry in the resource database is enriched with metadata and embeddings, which is what allows the system to match a user's question to the right organization quickly and accurately rather than relying on simple keyword matching. This retrieval-augmented approach means the chatbot's answers stay grounded in the actual database of organizations rather than drifting into generic or invented responses.

## From question to curated resource list

When someone asks a question, the chatbot returns a curated list of matching resources, complete with contact information and direct links, so the user can immediately follow up with the organization that can help them. This structure is meant to shorten the path between "I need help" and "here is who to call," which matters most for people navigating a crisis or an unfamiliar system for the first time.

## Built for accessibility

Two design choices stand out in how the app was built. First, it supports multiple languages, so language is not a barrier to finding services for residents who are more comfortable communicating in something other than English. Second, it is currently hosted on Streamlit and built to work on both web and mobile platforms, meaning someone can look up a resource from a phone just as easily as from a desktop browser.

## Where the project is headed

The team behind the guide has identified next steps for the project, including improved error handling and UI updates to smooth out the experience, plus expanding the resource database beyond Durham so the same approach could serve a broader audience. Scaling the platform further will depend on funding, which would let the team move to more robust infrastructure to support additional users and locations.

## Key takeaways

- The Community Resource Guide is a RAG chatbot that answers natural-language questions with a curated list of local organizations.
- It combines the OpenAI API for conversational responses with Hugging Face search for accurate retrieval from a metadata-enriched database.
- Each response includes contact details and direct links so users can act immediately.
- The app supports multiple languages and works on both web and mobile.
- Future plans include better error handling, UI refinements, and expanding coverage beyond Durham, NC.

## Who this is for

This video is useful for developers interested in building practical RAG applications, and for anyone curious how Humanitarians AI applies AI tools to real community needs. It is a good example for builders who want to see a retrieval-augmented chatbot used for social good rather than as an abstract demo.
