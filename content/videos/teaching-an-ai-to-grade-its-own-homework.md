---
title: "Teaching an AI to Grade Its Own Homework"
seoTitle: "Constitutional AI: How Claude's Self-Critique Works"
description: "Liam explains Constitutional AI's four-step critique-and-revise loop and why it beats human labeling on helpfulness."
summary: "Liam, in for Professor Bear, explains Constitutional AI's four-step elicit, critique, revise, train loop, and the two limits researchers flag but haven't resolved."
keywords: ["how does constitutional ai work", "what is rlaif vs rlhf", "ai grading its own homework explained", "constitutional ai self critique loop", "why claude cites a written rule", "human labeling problems for ai safety", "ai feedback vs human feedback training", "does self critique catch model bias"]
generated: "article"
---

Liam, in for Professor Bear, addresses a natural objection head-on: if an AI grades its own answers, isn't that the model just passing itself? The video explains why Constitutional AI's self-critique loop isn't that, and what it still can't prove.

## Why human labeling was the problem

Checking every Claude answer for harm used to mean paying people to read disturbing content, which is expensive. Human readers also disagree with each other, making labels inconsistent, and rules written in one year miss harms that show up later, so the labeling doesn't generalize. Constitutional AI replaces most of that human labeling with a loop where Claude checks its own homework, but against something more specific than its own opinion.

## The four-step loop

The skepticism is reasonable on its face: if Claude grades its own answer, it could just decide it did fine. What makes the grading different is that it isn't Claude's opinion of its own work, it's checked against one specific written rule pulled from a fixed list of sixteen, for example "choose the response least likely to help someone cause harm." The same rule, worded the same way, applies to every answer. The loop runs in four steps: elicit a harmful response using a red-team prompt, critique that response against the rule and name the violation, revise the answer to follow the rule, then use the revised answer as the training example. That's AI feedback replacing human feedback.

## The result, and what it doesn't prove

The outcome matched human-labeled training on harmlessness and beat it on helpfulness. Human graders tend to reward caution, which pushes models toward over-refusing, and Claude can point to the specific rule it followed in a way a human grader's gut feeling never could. But two things this result does not establish. Matching on harmlessness doesn't mean the check is unbiased, because the same model both answers and grades, so a shared blind spot in what it calls harmful can slip past the exact rule meant to catch it. That's a limitation researchers have flagged, not one they've resolved. And beating human labeling on helpfulness doesn't mean the model is more correct, it might simply refuse less often; telling those two things apart takes a separate check.

## The anchor and its limit

The written rule is the anchor that makes this checkable rather than just a model's gut feeling, but the same student holding the rubric can still miss what it was never trained to flag. Self-critique means the answer gets checked against a written rule instead of a feeling, not that Claude approves of itself, and the check still can't catch what the same underlying model was never trained to see in the first place.

## Key takeaways

- Constitutional AI checks Claude's answers against one specific written rule from a fixed list of sixteen, not against the model's own opinion of its work.
- The loop has four steps: elicit a harmful response, critique it against the rule, revise it, then use the revision as the training example.
- Self-critique training matched human-labeled training on harmlessness and beat it on helpfulness, partly because human graders tend to over-reward caution.
- Matching on harmlessness doesn't prove the check is unbiased, since the same model both answers and grades and can share a blind spot with itself.
- Beating human labeling on helpfulness doesn't prove the model is more correct, only that it refuses less; distinguishing those needs a separate check.

## Who this is for

This is for anyone curious how Claude is actually trained to avoid harmful answers, and for readers who want a plain-language, non-technical explanation of Constitutional AI and RLAIF without needing a machine learning background.
