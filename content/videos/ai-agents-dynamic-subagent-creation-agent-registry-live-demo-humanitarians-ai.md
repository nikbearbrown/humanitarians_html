---
title: "AI Agents  Dynamic Subagent Creation & Agent Registry   Live Demo! | Humanitarians AI Fellows"
seoTitle: "Dynamic Subagent Creation & Agent Registry Demo"
description: "A live demo of AI agents dynamically creating subagents, assigning roles, and checking a ChromaDB and Neo4j registry to avoid creating duplicate agents."
summary: "A Humanitarians AI student fellow demonstrates how a parent agent can dynamically spin up subagents with assigned roles, then checks a ChromaDB and Neo4j registry to avoid recreating an agent that already exists."
keywords: ["dynamic subagent creation demo", "agent registry chromadb neo4j", "multi agent system architecture", "avoid duplicate ai agents", "parent child agent relationships", "chromadb metadata storage agents", "neo4j graph agent relationships", "llama fastapi agent system", "similarity search agent registry", "humanitarians ai fellows demo"]
generated: "article"
---

A single AI agent handling one task is straightforward. A system where agents can create other agents on demand, assign them roles, and avoid redundantly building the same agent twice, is a genuinely different kind of architecture. This live demo, built by a Humanitarians AI student fellow, walks through exactly how that kind of self-expanding agent system works, and shows it running against real problem statements.

## Two modules, one goal

Scaling an AI agent infrastructure to handle a wide range of tasks requires two connected pieces working together. The first is dynamic subagent creation and role assignment: given a problem statement from an external agent, typically a "super" parent agent, the system needs to decide whether a new subagent is required, and if so, generate that subagent along with a role, a description, and a task prompt. The second piece is the agent registry and metadata database, which keeps track of every agent that already exists so the system is not constantly recreating agents that could already solve the problem at hand.

## How a new agent gets built

When a parent agent hands off a problem statement, the system assigns a role description and a task prompt to the resulting subagent, using structured JSON output from the underlying language model to keep agent creation consistent and machine-readable. Before actually creating anything new, the system consults the agent registry to check whether an existing agent could already handle the problem, which avoids the waste of spinning up duplicate agents for tasks that are functionally the same. Every agent created this way carries a defined set of fields: an agent ID, an assigned role, a role description, a task prompt, the parent agent ID that created it, any dependencies, and metadata like a timestamp and which language model was used to generate it.

## Where the registry actually lives

The registry itself is split across two different databases, each doing a different job. ChromaDB stores the metadata for every agent in the ecosystem, the kind of information that benefits from vector-based similarity search. Neo4j stores the relationships between agents, specifically the parent-child dependencies that map out which agent created which. When a new problem statement comes in, the system checks ChromaDB first using similarity search against a defined threshold; if a sufficiently similar existing agent is found, that agent is reused and mapped to the new parent rather than triggering a new build. If nothing similar enough exists, a new subagent gets created, registered in ChromaDB, and linked into Neo4j as a new node under its parent.

## Watching it run

The live demonstration uses Llama 3.1 as the underlying model, with FastAPI handling the input layer, and the codebase organized into a main file, a ChromaDB integration, a Neo4j integration, and a dedicated agent creation module. The first test submits a brand-new problem statement, "create a data analysis report," under a parent labeled "parent A." Since no similar agent exists yet, the logs confirm no sufficiently similar agent was found, and a new subagent is created with the role of data analyst, which then shows up in Neo4j as a node connected to its parent.

The second test submits a new problem statement that is deliberately similar in meaning to the first one, under a new parent ID. This time the logs report that an existing agent was found and reused, meaning no new agent was created at all, the new parent is simply mapped to the previously created data analyst agent. A third test introduces a genuinely different problem statement under a new parent, "parent C," and the logs again confirm that no sufficiently similar agent exists, triggering the creation of an entirely new subagent, which then also appears correctly connected in Neo4j.

## Why this matters for scaling agent systems

The core value of this architecture is that it lets an agent ecosystem grow only when it actually needs to. Without a registry and similarity check, a system that creates subagents freely would end up with redundant agents doing the same work under slightly different names, wasting compute and making the resulting agent graph impossible to reason about. By checking against existing agents before creating new ones, the system keeps its agent population efficient while still being able to expand to handle genuinely new problem types as they appear.

## Key takeaways

- The system splits into two modules: dynamic subagent creation with role assignment, and an agent registry with a metadata database.
- ChromaDB stores agent metadata and supports similarity search; Neo4j stores parent-child relationships between agents.
- New agents are created with structured JSON output, including a role, description, task prompt, parent ID, dependencies, and metadata.
- Before creating a new agent, the system checks the registry via similarity search to avoid building redundant agents for similar problems.
- The live demo, built on Llama 3.1 and FastAPI, showed both correct new-agent creation and correct reuse of an existing agent for a similar problem.

## Who this is for

This demo is aimed at developers and students interested in multi-agent AI architecture, particularly anyone trying to understand how to prevent agent sprawl in systems that can create their own subagents. It was created by a student fellow through the Humanitarians AI Fellows program, which supports students and recent graduates in developing and teaching technical AI skills.
