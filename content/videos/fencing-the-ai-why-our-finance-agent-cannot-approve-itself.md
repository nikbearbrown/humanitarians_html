---
title: "Fencing the AI: Why Our Finance Agent Cannot Approve Itself"
seoTitle: "Fencing the AI: Why a Finance Agent Can't Self-Approve"
description: "Onyx explains how Mycroft's review.py gate blocks AI agents from approving their own findings, requiring a named human with an evidence-backed cause."
summary: "A look at review.py, the control that stops Mycroft's finance agent from approving its own variance findings, requiring a named human and an evidence-backed cause instead."
keywords: ["ai agent cannot approve itself", "mycroft finance investigator review gate", "review.py human approval control", "ai governance financial agent", "variance bridge verified evidence", "sha256 run log verification finance", "json schema approval decision", "blocking agent identities from approval"]
generated: "article"
---

An AI system can compute a number and be completely right about it. That is not the same question as whether it should be allowed to sign off on what that number means. This update walks through the exact control built to keep those two things separate in Mycroft's finance investigator: a system that can compute a verified variance, but is programmatically blocked from approving its own explanation of it.

## Computing is safe, blessing it is not

On a synthetic sample of 43 data rows across six data sets, the engine computed a budgeted EBITDA of 350,000 against an actual of 230,000, a variance of minus 120,000, backed by seven tool steps and 41 evidence references, with every number traced back to its source. All of that is verified. None of it is approved. The trap is straightforward: if the same agent that produced those numbers were also allowed to sign off on why the variance happened, the human control boundary would effectively disappear, since the system would be both making the claim and blessing it. Calculating the bridge between budget and actual is a math problem. Deciding that the result is acceptable, and why, is a judgment call, and this update fences that judgment off from the agent entirely.

## Inside the review gate

The investigator's only move in this system is to open a request. It stamps the exact run ID, a SHA-256 hash of the run log, sets the gate status to open, and deliberately leaves the reviewer name blank. The file itself carries its own instruction: a named human completes this, the investigator cannot approve itself. Four rules stand between an open request and a cleared one. The request is bound to the run by both ID and hash. It rejects agent identities outright, checking reviewer names against a known set of agent identities and raising an error if a match is found, meaning the investigator or another agent cannot clear a human gate. It requires evidence the run actually collected, rejecting anything else. And approval has to be earned with a human materiality decision plus at least one evidence-backed causal explanation; once a decision is recorded, it is written once, with no overrides.

## What a valid decision has to contain

The shape of an approval is not left to chance. It is pinned by a JSON schema: a decision names the run, the reviewer, and a timestamp, picks exactly one verdict among approve, request changes, or block, states a materiality decision, and requires every causal explanation it lists to cite at least one piece of evidence. Miss any of that and the approval is refused outright, regardless of who is submitting it.

## Testing that the gate actually holds

The gate gets tested, not just asserted. First, a review request opens the gate, bound to the run. Then the agent attempts to record its own approval, signing in as the investigator, and the gate refuses. Only when a named human supplies a decision with an evidence-backed cause does the gate clear, and that record is written once, append-only, with no way to overwrite it later. Seven new review control tests back this up: the request opens bound to the run's hash, an agent identity is rejected, an approval demands a causal explanation, unknown evidence is rejected, a recorded decision is append-only, and the decision has to match the run. Combined with the rest of the finance suite, that brings the project to 19 passing tests this week. The sample review request left in the codebase as an artifact is deliberately still open, with no human approval and no fabricated causal explanation used to close it.

## Key takeaways

- Computing a verified financial variance and approving the explanation behind it are treated as two separate, distinct actions.
- The review gate in review.py opens a request bound to the exact run ID and a SHA-256 hash of the run log, with the reviewer field left blank.
- The gate programmatically rejects any known agent identity attempting to record an approval, blocking the investigator from clearing its own request.
- A valid approval requires a human materiality decision and at least one evidence-backed causal explanation, enforced by a JSON schema.
- Recorded decisions are append-only, and the control is backed by seven new tests, bringing the finance suite to 19 passing tests.

## Try it yourself

This gate stops a finance agent from approving itself, but approving is only half the risk, publishing what gets approved is the other half. What controls would you require before letting a finance agent publish its own findings? That's the kind of governance question driving the design work on Mycroft Financial AI, part of the Humanitarians AI Fellows program.
