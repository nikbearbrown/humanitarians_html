---
title: "Data Science Query Assistant - Part I"
seoTitle: "Data Science Query Assistant Demo: RAG Learning Tool"
description: "Sahil Padyal demos a Streamlit RAG app that explains data science topics, quizzes users, analyzes CSV files, and lets you chat with any website."
summary: "A live demo of the Data Science Query Assistant, a retrieval-augmented generation app built with Streamlit and LangChain for topic explanations, CSV analysis, and website chat."
keywords: ["retrieval augmented generation demo", "streamlit data science assistant", "chat with csv file ai", "langchain website chat demo", "cohere model data science tool", "ai quiz generator flash cards", "chat with documentation ai", "rag project langchain streamlit"]
generated: "article"
---
What if you could ask a tool to explain a data science concept, quiz you on it, analyze a spreadsheet you just uploaded, and answer questions about a live website, all from the same interface? That's the pitch behind the Data Science Query Assistant, and in this first-part demo, creator Sahil Padyal shows the tool in action before diving into the code in a follow-up video.

## A retrieval-augmented generation project

Padyal describes the assistant as a retrieval-augmented generation, or RAG, project, built with Streamlit and LangChain. It combines three tools in one interface: a query assistant for explaining topics, a dataset analysis tool for working with uploaded CSV files, and a link tool for chatting with any website.

## Explaining topics, generating quizzes, and building flash cards

The demo starts with the query assistant. Typing in a topic, machine learning in this case, produces both a theoretical explanation and a set of quiz questions, limited to two in the demo, along with flash cards designed to support a more active style of learning. The underlying model for this feature is Cohere, which Padyal calls a strong, open-source option for the NLP processing involved.

## Chatting with a CSV file

Next, the demo shows uploading a CSV dataset, in this case a forest fires dataset, and asking direct questions about it in plain language. Asking "what is this data set about" prompts the app to run a LangChain agent behind the scenes, visible in the demo as an agent executor chain working through the file, and returns an answer describing the dataset's contents: information about forest fires including location, day, weather conditions, and the area affected. Follow-up questions work the same way. Asking how many rows and columns the file contains triggers the agent to apply `df.shape` and returns the answer directly: 517 rows and 13 columns. Asking the tool to remove duplicate rows results in the agent applying `df.drop_duplicates()` and confirming the duplicates have been removed. The effect is a natural-language interface over ordinary pandas operations, letting a user interact with a dataset without writing code themselves.

## Chatting with any website

The final feature lets users paste in a website link and converse directly with its content, which is especially useful for information that isn't reflected in a general-purpose model's training data. Padyal demonstrates this by loading a news site and asking for the top five headlines, and the tool extracts and returns them directly from the live page. He also shows a second use case: pointing the tool at technical documentation, in this case for LangChain, and asking how to install it. The tool extracts the relevant instructions straight from the documentation page, which Padyal frames as a more reliable alternative to asking a general chatbot that may not have current or accurate information about a fast-moving library.

## Where the project could go next

Padyal is candid about the tool's current limitations. He's using a trial-based, open-source API for some of the language model calls, which means the app can get stuck under heavy request volume since only four or five requests are allowed at a time under the current plan. Looking ahead, he mentions wanting to add an image generator to the query assistant for creating mind maps as a further learning aid.

## Key takeaways

- The Data Science Query Assistant combines three features in one Streamlit app: topic explanation, CSV analysis, and website chat.
- Topic explanations use the Cohere language model and come paired with auto-generated quizzes and flash cards.
- CSV analysis is powered by a LangChain agent that translates plain-language questions into pandas operations like `df.shape` and `df.drop_duplicates()`.
- The website chat feature extracts and answers from live page content, useful for both current events and technical documentation.
- The app is currently limited by trial API rate limits, which can cause it to stall under heavy use.

## Who this is for

This walkthrough is aimed at anyone curious about what a practical RAG application looks like end to end, from a user's perspective, before getting into implementation. It's a useful preview for students, educators, or builders in the Humanitarians AI community who want to see the finished product before following the code-focused Part II.
