---
title: "Mycroft Update: Why Your AI Agent Ignores Your Code"
seoTitle: "Why Your AI Agent Ignores Your Code"
description: "The model never reads your function body when you wire up a tool, only what you wrote about it. This breaks down what actually crosses the wire and how to write it well."
summary: "When you give an AI agent a tool, only the name, docstring, and type-hint schema cross the wire, never the function body, which means the description is the real product."
keywords: ["function calling never reads code", "llm tool description best practices", "ai agent tool docstring", "when not to use a tool description", "mycroft project fellows series", "tool schema type hints ai agent", "agent picks wrong tool fix", "writing robust tool contracts llm"]
generated: "article"
---

Nearly everyone who wires up their first tool for an AI agent makes the same assumption: expose the function, and the model will figure out how to use it. Then the agent either never calls it, or calls it at the worst possible moment. The instinct is to go debug the function. That's almost always the wrong place to look, because the model never actually reads your code.

## What actually crosses the wire

When a language model calls a tool, it isn't reading your implementation. It's choosing from labels. What crosses the wire is the function name, the description, which is your docstring copied verbatim, and a parameter schema derived from your type hints, including which arguments are required. That's the entire payload. Printed out, it looks like a compact block: a name, a docstring-as-description, and a schema listing arguments and requirement status. The function body itself never leaves your machine. If you read only that payload, the question becomes whether you could actually tell when to use the tool from it alone, and for most first-draft tools, the honest answer is no.

Because that description is the only thing the model ever sees, writing it isn't a cleanup task you do after the real work is finished. It is the real work.

## The three questions a description has to answer

Most tool descriptions fail in the same three ways, because they only attempt to answer the easiest of three necessary questions. A robust description has to cover:

1. **What comes back** when the tool is called, the easy one that most descriptions already get right.
2. **When you should reach for it**, which requires naming the specific situation the tool solves.
3. **When you should not**, the question almost nobody writes an answer to, and the one that's responsible for stopping an agent from grabbing the wrong tool among several similar options.

The point is illustrated with two versions of the exact same function, byte-identical bodies, where only the description text changes. One version is three words long and answers none of the three questions. The other runs 292 characters and answers all three. Since the function itself is identical in both cases, whatever difference shows up in the agent's behavior comes entirely from the sentence, not the code.

## The payload test

A practical way to check your own tool descriptions: write the description before you write the function, in the words a caller would actually think in, and explicitly name the case where reaching for this tool would be wrong. Then read back only the payload, the name, description, and schema, ignoring your own implementation, and ask whether a stranger could pick the right tool from that alone. If you can't answer that confidently, neither can the model.

## Every tool has a cost, even a good one

Adding a tool isn't free, even when its description is well written. Each tool eats a share of context on every single call it's exposed for. It adds one more option an agent could confuse with a similar tool. It widens the blast radius of what a wrong decision by the agent can reach. And it becomes a promise you now have to keep maintaining. The practical rule that follows: four sharp, well-described tools beat twenty vague ones.

## Key takeaways

- Only the function name, the docstring-derived description, and a type-hint-based parameter schema cross the wire to the model. The function body never does.
- A robust tool description must answer three questions: what it returns, when to use it, and when not to use it, with the third question being the one most descriptions skip.
- Two byte-identical functions can produce very different agent behavior purely because their descriptions differ.
- Test your own tools with the payload test: read only the name, description, and schema, and ask if a stranger could pick correctly.
- Every added tool costs context, adds ambiguity between similar options, and widens what a wrong call can affect.
- Four sharp tools outperform twenty vague ones.

## Try it yourself

The episode ends with a direct exercise: take two tools you've defined, show only their names, descriptions, and schemas (not your implementations) to the model, and ask which one it would call for each of five different requests, noting where it's genuinely unsure. Rewrite whichever tool caused the confusion, and run this on two of your own similar tools; the resulting "unsure" list is the whole exercise. This is episode three of ten in the Mycroft series from Humanitarians AI, with the next episode covering memory and context.
