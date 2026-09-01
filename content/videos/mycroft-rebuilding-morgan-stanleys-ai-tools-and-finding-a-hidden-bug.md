---
title: "Mycroft: Rebuilding Morgan Stanley's AI Tools (And Finding a Hidden Bug)"
seoTitle: "Rebuilding Morgan Stanley's AI Tools: A Bug Found"
description: "Tanmay Kulkarni rebuilds two Morgan Stanley AI assistant tools for Mycroft and shares a three-question test that catches a real missing guard in his own code."
summary: "Rebuilding two of Morgan Stanley's published AI assistant tools from public material alone, Tanmay Kulkarni develops a three-question specification check and uses it to catch a missing write guard in his own repository."
keywords: ["mycroft financial ai morgan stanley", "rebuilding ai tools from press release", "specification test for ai design", "assertion test not equal states", "write guard missing test bug", "ai assistant draft vs autonomous action", "financial advisor ai tool design", "software testing ai agent repository"]
generated: "article"
---

One sentence from a Morgan Stanley press release describes what its AI meeting assistant does: summarize key points, create an email for an advisor to edit and send at their discretion, and save a note into Salesforce. Three verbs in a row, and one of them carries ten extra words attached. That difference is easy to read straight past, and catching it turned into a specification check worth applying to any project built from someone else's design description.

## Rebuilding two published tools from public material only

Morgan Stanley built two AI tools for its financial advisors: one that searches the firm's research library, and one that sits in on client meetings and writes them up afterward. The rebuild here uses only what the firm has actually published, since Morgan Stanley reports strong results, 98% of advisor teams adopted the first tool, but does not publish how either tool works internally. That is normal for a bank, but it means every line of the rebuilt code has to trace back to a specific published sentence rather than to any inside knowledge of the real implementation.

## A three-question card for catching design collapse

The core method here is a simple three-question check that can run on anything built from somebody else's specification. First, what does the source treat as two different things? Second, are they still two different things in the code? Third, is there a line that fails if someone accidentally makes them one? The whole point is catching one specific failure: two genuinely different ideas in the source material that quietly collapsed into a single idea during implementation.

## Finding the real difference in Morgan Stanley's own wording

Applying question one to the press release means looking closely at the verbs. The tool "creates an email for an advisor to edit and send at their discretion." The advisor decides; nothing happens without them. But the tool also "saves a note into Salesforce," with no qualifier attached, nobody to wait for. That note is the only output confirmed finished rather than pending a human decision, and it is bounded to internal filing that no client ever sees. Morgan Stanley states this distinction plainly in its own sentence, right in the open.

## Where the first draft got it wrong

Applying question two revealed that the original design did not preserve this distinction. It described both outputs as one thing: a draft waiting on the advisor's decision. That was correct for the email and wrong for the note, since it treated a finished, autonomous action as if it were sitting in a pending state. The mistake was caught on review, checking the design back against the source material, and fixed before anything was finalized. Part of why it nearly slipped through is that the working summary used the word "drafts," while Morgan Stanley's actual word is "creates." Draft sounds unfinished; creates does not. The paraphrase was easier to read correctly than the original source, which is exactly the kind of trap careful rereading does not catch, since rereading is the same instrument pointed at the same sentence by someone who has already decided what it says.

## Locking the difference in with a test

Question three produced what became a favorite line in the whole repository: an assertion that the email status is not equal to the Salesforce note status. That line does not check that the email is waiting or that the note is saved; other tests already cover that. It only asserts that those two values can never become the same thing. If someone tidies the file next year and accidentally collapses that distinction, the test suite catches it immediately, rather than relying on a reviewer who might be tired at four in the afternoon.

## Turning the same check on his own repository

The second pass ran the identical three questions against a different codebase entirely: the project's own repository. Both pipelines in that repository end the same way, and both are supposed to carry a test that fails if a function with a dangerous name exists, such as send, finalize, submit, or dispatch. The debrief side of the code also checks for a function called write. The assistant side does not. Same guard, two different word lists, and four internal documents described it as a single guard. Running the full word list against all four modules found no matches; nothing is currently broken. But the coverage is narrower than assumed: two of the four modules are guarded, and two happen to be fine only by accident. Add a write function to the debrief side, and a test would fail immediately. Add the identical function to the assistant side, and everything would still pass.

## Being honest about what the finding actually proves

By the card's own standard, this counts as a real finding: a difference held up by nothing but memory is worth writing a line of code for before it costs anything. But it is worth being precise that this is an argument about risk rather than a demonstrated failure, since nothing is currently broken and there is no failure to show. The check also has a known limit: it reads the module's own list of guarded names, so it works partly because of how imports happen to be structured in this particular codebase. The full test suite covers two pipelines, twelve modules, and twenty-nine tests, all running on made-up data with nothing of Morgan Stanley's in it, and the write gap on the assistant side is left open on purpose, deliberately unfixed at the time of recording.

## Key takeaways

- A three-question check, what's different in the source, is it still different in the code, and is there a line that fails if it collapses, catches design mismatches from published specifications.
- Morgan Stanley's own wording distinguishes a human-edited, pending email from an autonomously saved, finished Salesforce note, a distinction the first draft missed.
- The word "draft" in a working summary was easier to misread than Morgan Stanley's actual word, "creates," showing how paraphrasing can smooth over an important distinction.
- A not-equal assertion test that only checks two states can never collapse into one is a lightweight, durable way to lock in a design distinction.
- Running the same three-question check on your own repository found a missing write guard on one module that a matching module already had, despite documentation describing them as identical.
- A finding with no demonstrated failure is still worth acting on if it depends only on human memory to hold up.

## Who this is for

This is for developers and researchers working in the Mycroft Financial AI framework, or anyone rebuilding a system from a public specification who wants a concrete method for catching quietly collapsed distinctions before they become real bugs. It is part of Humanitarians AI Fellows' ongoing work on the Mycroft project.
