---
title: "Data Science Query Assistant - Part II"
seoTitle: "Data Science Query Assistant: Code Walkthrough Part 2"
description: "Sahil Padyal walks through the code behind a Streamlit app combining Cohere, EdenAI, LangChain, and spaCy for explanations, quizzes, and CSV analysis."
summary: "A code walkthrough of the Data Science Query Assistant, showing how Cohere, EdenAI, LangChain, and spaCy power topic explanations, quizzes, flash cards, CSV analysis, and website chat."
keywords: ["cohere langchain prompt template", "streamlit rag project code", "edenai csv agent langchain", "spacy keyword extraction flashcards", "langchain retrieval chain website", "streamlit chat session state", "csv dataset analysis langchain agent", "cohere api key setup tutorial"]
generated: "article"
---
Building a tool that can explain a concept, quiz you on it, read a spreadsheet, and chat about a website all in one app sounds like four separate projects stitched together. In this follow-up video, Sahil Padyal opens up the actual code behind the Data Science Query Assistant, a Streamlit application built with Cohere, EdenAI, and spaCy, and walks through how each of those pieces fits into one coherent system.

## Setting up models and prompt templates

The project begins with environment setup: importing the necessary libraries and loading API keys for the two language models the app relies on, Cohere and EdenAI. Both offer free API keys after signing in, Cohere through GitHub login and EdenAI through its own signup, and Padyal notes that EdenAI is also useful for image and video generation in other projects. Once the keys are in place, the model is initialized with a temperature of 0.75 and a max token count of 800, values chosen because the app needs to generate a fair amount of theoretical text for each query.

From there, the code defines prompt templates using LangChain. A prompt template lets the app plug a variable, such as a topic typed in by the user, into a pre-written instruction, so the model always receives a consistent, well-formed request like "as a data science teacher, could you explain the concept of [topic]." A second template follows the same pattern to generate quiz questions and answers in a fixed format, which matters later when the app needs to parse the model's response back into structured data.

## Generating flash cards from key points

One of the trickier parts of the build was flash card generation. The app first gets a full explanation from the model, then needs to identify the key points within that response worth turning into flash cards, and finally sends those key points back to the model to get a short, two-line explanation for each one. To pull out those key points, the app uses spaCy, a natural language processing library with models for tasks like embedding, parsing, and named entity recognition. Here, spaCy's `en_core_web_sm` model parses the response text and matches it against a list of predefined data science keywords, extracting whichever of those terms appear so they can be turned into flash cards automatically.

## Parsing quiz responses and building the interface

Because the model's quiz output follows the same fixed format defined in the prompt template, the app can reliably parse out individual questions and answers from the raw response text. The interface itself is built with Streamlit, including its newer `st.chat` module for chat-style interactions, along with Streamlit's container components to lay out the quiz and flash cards. To avoid Streamlit's default behavior of re-running the entire script on every button click, the app uses `st.session_state` to preserve values across interactions, keeping the flow from resetting unexpectedly.

## Adding CSV analysis with EdenAI

The next feature is CSV file analysis, built on EdenAI's model, which is provided by OpenAI and uses GPT-3.5 Instruct under the hood. This part of the app uses a LangChain agent, specifically `create_csv_agent` from LangChain's experimental agents module, which is purpose-built for interacting with CSV files. The interface lets a user upload a file, store it in a variable, and type a natural language question; the agent then runs against the file using `agent.run()` to produce an answer, an implementation Padyal describes as straightforward once the right LangChain agent was identified.

## Chatting with a website through retrieval

The final feature lets users converse with content pulled live from a website, built as a retrieval-augmented generation pipeline. It starts with embeddings, using LangChain's free, open-source embedding option rather than a paid alternative, to convert website content into a form the app can search. A vector store is created from the given URL: the app loads the document, splits it into smaller chunks so the model isn't forced to process the entire page at once, and then retrieves the most relevant chunk based on the user's question.

On top of that vector store, the app builds a retrieval chain using Cohere, combining the language model, the retriever, and a prompt that reformulates the user's input into a better search query given the conversation so far. A second function builds the conversational RAG chain itself, answering the user's question based on the context retrieved from the website and the ongoing chat history, so the model doesn't need to be re-told the website's context on every new question.

## Key takeaways

- The app combines Streamlit, Cohere, EdenAI, and spaCy into one system with four distinct features.
- Prompt templates in LangChain let variables like topic or key point get inserted into consistent, reusable instructions.
- spaCy's parsing model extracts key terms from a generated explanation to drive automatic flash card creation.
- CSV analysis is handled by a dedicated LangChain agent designed specifically for querying CSV files.
- Website chat is built as a retrieval-augmented generation pipeline: embed the site, chunk it, retrieve relevant chunks, and answer using both the retrieved context and chat history.
- `st.session_state` is used to prevent Streamlit's default script rerun behavior from resetting the app's state on every interaction.

## Try it yourself

The full code for the Data Science Query Assistant is available on GitHub, and Padyal encourages viewers to experiment with it directly, including trying different LLM models to compare results. This kind of applied, end-to-end AI build is representative of the project work coming out of the Humanitarians AI community.
