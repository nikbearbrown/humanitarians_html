---
title: "Build AI Text-to-SQL with Knowledge Graphs | Pipeline Demo | Humanitarians AI"
seoTitle: "Build AI Text-to-SQL Using Neo4j Knowledge Graphs"
description: "A demo of a text-to-SQL pipeline that uses a Neo4j knowledge graph, vector search, and Google Gemini agents to turn plain English questions into SQL."
summary: "Ask a question in plain English and this pipeline searches a Neo4j knowledge graph for the relevant schema, prunes the context with one AI agent, and generates SQL with another."
keywords: ["text to sql knowledge graph pipeline", "neo4j database schema knowledge graph", "vector similarity node search sql", "google gemini sql generation agent", "nl2sql pipeline demo", "breadth first search context graph", "openai embeddings schema search", "flask ai sql query interface"]
generated: "article"
---

Asking a database a question in plain English and getting back a correct SQL query sounds simple until you consider what the system actually has to know first: which tables exist, how they connect, and which ones are even relevant to the question being asked. This demo walks through a pipeline that answers that problem by representing a database schema as a knowledge graph and letting AI agents search and reason over it.

## The example question

The demo starts with a real question: what is the alphabetically ordered list of all distinct medicines? Rather than writing SQL by hand, the question goes through a multi-step AI pipeline that processes it end to end, from raw English to an executed query and its results, with no manual SQL writing required.

## Retrieving context from a knowledge graph

The first step retrieves context from the knowledge graph, searching for the database schema elements relevant to the question. This runs through vector similarity node search to find semantically similar nodes, so a question about "medications" can still find a table literally named "drugs" even without an exact word match. From there, the system builds a context graph around the retrieved nodes using a breadth-first search algorithm, pulling in the surrounding schema structure rather than just the isolated nodes that matched.

## Pruning and generating the SQL

Once the raw context graph is built, an AI agent prunes and standardizes it, filtering out redundant information and organizing what's left into a cleaner structure. A second agent then takes that cleaned context and generates the actual SQL query, mapping the original question onto the relevant tables. Both agents use Google's Gemini AI model, guided by system prompts written specifically for their roles: the pruning agent's job is removing noise, the generation agent's job is producing a valid query grounded in the pruned schema context. In the demo, this pipeline correctly produces a query that selects distinct medications ordered alphabetically, and the results appear immediately after execution.

## Building the knowledge graph itself

Behind the live demo sits the actual graph construction work. A dedicated connection module handles talking to a Neo4j Aura database, a cloud-hosted graph database chosen specifically because it's well suited to representing schemas as interconnected nodes. A database schema gets converted into that graph by creating nodes for databases, tables, and columns, then establishing relationships between them: foreign keys become connections between columns, and primary keys are tracked as well. Every schema node also gets an embedding generated with OpenAI's embedding model, which is what makes the semantic search step possible in the first place, letting the system find relevant tables even when a user's wording doesn't match the schema's naming exactly.

## The full workflow, end to end

The project's main workflow file ties all of these pieces together. The process starts with the user's question, searches the knowledge graph using vector node similarity to find relevant nodes, retrieves a subgraph around those elements using the breadth-first search algorithm, and passes that context to the pruning agent for filtering and standardization. The generation agent then takes the cleaned context and produces the SQL query, which gets executed, with results returned to the user. Each step along the way is tracked with a status update, which is what powers the pipeline visualization shown live in the demo, giving a real-time view of exactly which stage the system is working through.

## Why the components fit together

The system's project layout keeps these pieces separated by responsibility: an agents directory for the pruning and generation agents, connection logic for Neo4j, and the main workflow file that orchestrates the whole sequence. That separation is part of what makes the pipeline legible enough to demo live, since each stage, from schema retrieval to context pruning to query generation, can be inspected and shown independently rather than existing as one opaque black box.

## Key takeaways

- The pipeline converts a database schema into a Neo4j knowledge graph, with nodes for databases, tables, and columns and edges representing foreign key and primary key relationships.
- OpenAI embeddings on every schema node enable semantic search, so a query about "medications" can still match a "drugs" table.
- A breadth-first search algorithm builds a context subgraph around the nodes found through vector similarity search.
- Two Google Gemini-powered agents divide the work: a pruning agent that filters and standardizes the retrieved context, and a generation agent that produces the final SQL query.
- Every pipeline step is tracked with a status update, driving a real-time visualization of the system's progress from question to executed query.

## Who this is for

This walkthrough is aimed at data scientists, AI engineers, and database professionals who want to bridge natural language and structured data querying, and it's a useful reference for anyone building a text-to-SQL interface for non-technical stakeholders. It's part of the applied AI tooling work coming out of Humanitarians AI.
