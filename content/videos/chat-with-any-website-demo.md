---
title: "Chat with any website Demo"
seoTitle: "Chat with Any Website Using RAG and Pinecone"
description: "A demo of a RAG chatbot that lets you chat with any website using Pinecone, OpenAI embeddings, and Streamlit, built to beat ChatGPT's knowledge cutoff."
summary: "This demo shows a retrieval-augmented chatbot that scrapes any website, stores it in Pinecone, and answers questions with current information ChatGPT can't reach."
keywords: ["chat with any website rag project", "pinecone vector store tutorial", "openai embeddings website chatbot", "streamlit rag chatbot demo", "retrieval augmented generation website scraping", "chatgpt knowledge cutoff workaround", "info 6105 data science project", "conversational retrieval chain openai"]
generated: "article"
---
ChatGPT is useful, but it has a hard limit: it only knows what it was trained on, and current events or newly released documentation fall outside that window. This demo, built by Agash Uthayasuriyan as a teaching assistant project for the INFO 6105 data science course, tackles that gap directly with an application that lets you chat with the actual content of any website, in real time.

## The problem with relying on ChatGPT alone

The motivation is simple: language models like GPT-3.5 and GPT-4 are not reliable for current affairs or recently released information. GPT-3.5 will often say outright that its knowledge only goes up to a certain month and year, and GPT-4 will attempt an answer but frequently misses the specific detail being asked for. If a new library has just had a major update and its functions have changed, or a news article was published minutes ago, neither model can speak to it directly. The application built here solves this by letting a user paste in a website link and start a conversation grounded in that page's actual, current content.

## Seeing it in action

The demo uses a live Google News article about Kamala Harris visiting an abortion clinic and declaring a health crisis, published and updated only minutes before the demo. Asking ChatGPT directly where she made that declaration returns a response admitting its knowledge only goes up to January 2022, with no real-time information. Asking GPT-4 gets closer but still doesn't surface the specific location. Pulling the same article's URL into the custom chatbot and asking the identical question returns the correct, specific answer: she visited Twin Cities and St. Paul, Minnesota, and declared a health crisis around access to reproductive medical care. The chatbot can also handle looser, more conversational follow-ups, like asking "what was the event about" without repeating any names, and it still correctly ties the question back to the loaded website's content.

## How it works under the hood

The pipeline starts by scraping the text content of the given website. That text is converted into vectors using an embedding model and stored in a vector store, in this case Pinecone. When a user submits a question, that input is also converted into a vector, and the system searches the vector store to find the closest match to the user's query. The best-matching content is then handed to a large language model to generate the actual answer. Pinecone is used here specifically as the vector database, with the website URL loaded, the page content split into chunks, and those chunks converted into embeddings using OpenAI's embeddings model before being stored. Pinecone's free tier runs on Google Cloud and uses cosine similarity to measure distance between vectors.

## Building the conversational chain

The language model layer is also powered by OpenAI. Given the ongoing chat history, a retriever chain first generates a search query to look up relevant information related to the conversation, then pulls the most suitable matching vector from the store. That retrieved context is passed into a conversational RAG chain, where a prompt instructs the model to answer the user's question based specifically on the provided context. The whole interface is built with Streamlit, using Streamlit's session state to keep the chat history and vector store persistent across interactions, so the app doesn't reload or lose its data and reprocess the website content on every refresh.

## Key takeaways

- Standard LLMs like ChatGPT have a knowledge cutoff and struggle with current, page-specific information.
- The application scrapes a target website, embeds its content, and stores it in a Pinecone vector store.
- User questions are embedded the same way and matched against stored vectors to retrieve the most relevant content.
- A conversational retrieval chain generates search queries from chat history, then answers using only the retrieved website context.
- Streamlit's session state keeps the chat history and vector store alive across interactions without reprocessing the website each time.

## Try it yourself

The code for this project is available on the AI4ED GitHub repository under the Chat with Website RAG Project folder, and it's a strong starting point for anyone in the Humanitarians AI community who wants to build a retrieval-augmented chatbot grounded in live, up-to-date web content rather than a model's fixed training data.
