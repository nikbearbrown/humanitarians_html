---
title: "Why the server hands back an encrypted context you're only going to echo"
seoTitle: "Claude Context Compaction: The Encrypted Blob"
description: "When Claude compacts a long conversation, it returns a readable summary and an encrypted blob. Only the blob actually restores the full context on the next call."
summary: "A twenty-turn conversation that triggers context compaction returns two things, a readable summary and an encrypted blob, and only the encrypted blob actually restores what compaction saved."
keywords: ["claude context compaction encrypted content", "anthropic sdk encrypted_content field", "claude compaction summary vs blob", "server verifiable token context", "multi turn php app anthropic sdk", "claude api context overflow handling", "encrypted_content blob explained", "claude basics context compaction", "threading blob back into messages array", "claude sdk long conversation memory"]
generated: "article"
---

When a long Claude conversation triggers compaction, the response that comes back carries two different fields, and it's easy to assume the wrong one is the important part. There's a readable summary you can actually look at and understand, and there's an opaque encrypted blob that looks like noise. The natural guess is that the readable text, being the part a person can parse, is what carries the conversation's memory forward. It isn't, and building a multi-turn app around that assumption breaks context in exactly the cases where compaction matters most.

## What compaction actually returns

When a conversation gets long enough, compaction fires and hands back two things: a `content` field with the earlier conversation summarized in plain English, and an `encrypted_content` field, a sealed string. In a twenty-turn conversation that overflows and triggers compaction, threading the readable summary text alone into the next call causes context to break. Threading the encrypted blob back instead holds. That's the concrete test case the distinction rests on.

## Display text versus a server-verifiable token

The reason for that difference comes down to what each field is actually for. The readable text is display and debug output, meant for a person to read, not for the model to rely on. The encrypted blob is a server-verifiable token that reconstructs the full compressed context, including turn boundaries, roles, and metadata, all the structural information that plain prose summarization throws away in the process of making it readable. On the next call, passing only the blob doesn't cause the server to replay all twenty prior messages. It rebuilds the full context directly from the token, restoring everything compaction had saved. That doesn't make the readable summary pointless, it's still exactly what you'd want to show a user or write to a log. It's just not what the model needs to remember the conversation.

## What this means for a real implementation

For anyone building a multi-turn app on the Anthropic SDK, the practical implication is specific: detect a compaction block in the response, and thread the `encrypted_content` blob, not the human-readable summary, back into the next `messages` array. Sending the summary text instead is the mistake that breaks context in longer sessions, precisely because that text was never meant to carry the conversation's state.

## Key takeaways

- Compaction returns two fields: a readable summary meant for humans, and an encrypted blob meant for the server.
- Only the encrypted blob is a server-verifiable token that reconstructs turn boundaries, roles, and metadata.
- Passing the summary alone into the next call breaks context in a twenty-turn test case; passing the blob holds.
- On the next call, the blob lets the server rebuild full context directly, without replaying every prior message.
- The readable summary still has value for display and logging, it's just the wrong field to pass back into the conversation.

## Try it yourself

If you're building a multi-turn PHP app with the Anthropic SDK, detect a compaction block in the response and write the code that threads the `encrypted_content` blob back into the next messages array instead of the summary text, then check what breaks if you send the summary instead. This walkthrough is part of Humanitarians AI's Claude Basics series.
