---
title: "Automate Everything with n8n!   No Code & Low Code Workflow Automation |  Humanitarians AI"
seoTitle: "Automate Everything with n8n: No Code Workflow"
description: "A Humanitarians AI student fellow builds a custom n8n AI agent from scratch, adding memory and Gmail so it can hold conversations and send real emails."
summary: "A Humanitarians AI student fellow builds a custom n8n AI agent step by step, connecting a Gemini chat model, adding conversation memory, and wiring up Gmail so the agent can actually send emails on request."
keywords: ["n8n ai agent tutorial", "n8n gemini chat model setup", "n8n window buffer memory", "n8n gmail tool integration", "no code ai agent builder", "n8n workflow automation tutorial", "n8n tools agent setup", "humanitarians ai fellows n8n"]
generated: "article"
---

Most workflow automation tutorials stop at connecting two apps together. This one goes further, building an actual conversational AI agent from an empty n8n canvas, one that remembers what you've told it and can send a real email on your behalf, without writing a line of code.

## What n8n is doing under the hood

Before building anything, the video frames what n8n actually is: an open-source workflow automation tool that lets users automate tasks and connect different services and applications visually, without code. It supports over 200 integrations, including Google Sheets, Slack, GitHub, and custom APIs, and workflows are built by placing nodes on a canvas and connecting them, which is what makes the tool accessible to non-technical users as well as developers.

## Building the chat-triggered agent

The build starts with a chat trigger node, made publicly available with a custom initial message. From there, connecting that trigger to an AI agent means using n8n's Advanced AI category, which lists several agent types: a tools agent, a conversational agent, an OpenAI functions agent, a SQL agent built for interacting with databases, and a ReAct agent that combines reasoning and action iteratively. The tutorial uses the tools agent, and connects its input directly from the chat trigger's chat input field. With the agent node in place but no chat model attached, n8n flags a warning triangle, since a chat model is required. The video attaches a Google Gemini chat model here, using an API key generated from Google AI Studio, and selects the Gemini 1.5 Flash model specifically. A quick "hello" test confirms the connection works end to end, chat trigger to agent to Gemini and back.

## Giving the agent a memory

A plain chat model has no memory between messages, which the video demonstrates directly: asking "what's my name" before adding memory gets an honest "I don't have access to personal information." To fix that, a memory node is added, with window buffer memory as the option used here, alongside alternatives like Redis, Postgres, or Zep for different storage backends. The memory node uses a session ID and session key to track what's been said in a given conversation. After typing "my name is HP," asking the agent "what is my name" correctly returns the stored name, confirming the memory buffer is working.

## Turning conversation into email action

With chat and memory working, the tutorial adds a Gmail tool node to the agent, connected to a Gmail account, with a manually written tool description of "send emails." Configuring the node means setting the resource and operation, choosing from options like adding a label, deleting a message, marking read or unread, or sending, and the tutorial selects "send." The recipient email, subject, and message body are all set as dynamic expressions pulled from the conversation rather than hardcoded values. Testing it with the prompt "send an email to Naira to fix an appointment" doesn't send anything blindly. Instead, the agent asks for the missing pieces it needs: Naira's email address, a subject line, and what the message body should say. Once those details are supplied, the email sends successfully, visible as a completed step with the input and output both shown in the workflow.

## Beyond this one workflow

The tutorial closes by pointing at how this same pattern extends. A data transformation node can reshape information before it's written to storage. An Airtable integration can save contact details, like email addresses, so they don't have to be typed out fresh every time an email gets sent. The underlying idea is that this specific agent, chat plus memory plus one Gmail action, is a template: the same trigger-to-agent-to-tool structure works for storing data in a spreadsheet, filtering records, or wiring in other services like Slack or Teams.

## Key takeaways

- The agent is built from a chat trigger connected to a tools agent node, which requires a connected chat model, here Google Gemini 1.5 Flash, to function.
- Window buffer memory, tracked by session ID, gives the agent the ability to recall details like a user's name across a conversation.
- A Gmail tool node lets the agent actually send emails, with the agent asking clarifying questions for any missing recipient, subject, or message details.
- Fields like recipient email and subject are set as dynamic expressions pulled from the conversation, not hardcoded.
- The same trigger-plus-agent-plus-tool pattern extends to other integrations, including data transformation nodes and Airtable for storing contact information.

## Who this is for

This is a hands-on starting point for anyone who wants to build a working conversational AI agent without writing code, whether for personal use or as a first automation project. It was created by a student in Humanitarians AI's Fellows Program, which pairs a learn-by-doing and learn-by-teaching approach to help students and recent graduates build both technical skills and the ability to explain them to others.
