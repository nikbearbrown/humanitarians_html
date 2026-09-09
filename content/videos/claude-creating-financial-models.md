---
title: "Claude, Creating Financial Models"
seoTitle: "How Claude's Financial Modeling Skill Works"
description: "Liam explains how Claude builds a DCF or sensitivity table by following a fixed SKILL.md file, not by reasoning about finance on its own."
summary: "Liam explains that Claude's financial modeling skill runs a fixed three-step spec, DCF model, sensitivity analysis, valuation, against whatever revenue numbers it is given, rather than reasoning about finance independently."
keywords: ["how does claude build a dcf financial model", "claude skill for sensitivity analysis finance", "what is a skill md file in claude", "does claude reason about finance on its own", "how to stress test a revenue projection with claude", "dcf model py sensitivity analysis py skill", "claude creating financial models anthropic skill", "monte carlo simulation scenario planning claude skill"]
generated: "article"
---

Liam, in for Bear, corrects an assumption behind a common question: how do you teach Claude to build financial models? The framing is off, Claude is not trained for this task in any special sense. It is pointed at a skill it reads before acting, and that skill is what actually determines what happens next.

## A skill is a folder Claude reads, not something it is trained on

The creating-financial-models skill is a folder containing two scripts, dcf_model.py and sensitivity_analysis.py, plus a four-kilobyte SKILL.md file holding the full instruction set in plain language, with no hidden logic. Claude reads that file and then acts. The file is the program, not the model's own training.

## Three steps, always in order

The instructions sit in a Steps section: read SKILL.md, execute each step in order, return the result. The pipeline is linear, with no branching unless a step itself says so. The anchor example in the video is straightforward: hand the skill a five-year revenue projection, and it reads the assumptions, runs dcf_model.py, and hands back a valuation, the same three steps every time.

## Same input, same output

This determinism is the actual payoff of the file being the program rather than a judgment call. Hand the skill the identical revenue projection twice, and dcf_model.py returns the identical valuation both times. That consistency is what makes the skill useful as a repeatable process rather than a one-off exercise.

## The limit is the spec, not the model's judgment

The reverse also holds. Hand the skill a projection its steps were not written for, and it still runs those same steps against numbers the SKILL.md file never specified. The skill does not pause to check whether the input actually fits its assumptions, it just executes. The stated scope of what it covers is DCF analysis, sensitivity testing, Monte Carlo simulations, and scenario planning for investment decisions, and nothing outside that scope.

## What this means in practice

A financial modeling skill is not Claude inventing a model from its own judgment about finance. It is a spec that Claude reads and runs the same way against whatever numbers it is handed. That is both the strength, consistent, repeatable output, and the caveat, the skill will not flag a projection that does not fit its assumptions.

## Try it yourself

The video closes with a direct prompt: tell Claude you want to stress-test a five-year revenue projection, ask it to read the creating-financial-models skill, and have it walk you through what it will build before it touches a single number. That clause, before you touch a number, is the discipline the spec enforces: the plan becomes visible before the model actually runs.

## Key takeaways

- Claude does not reason about finance independently; it follows a fixed SKILL.md spec inside the creating-financial-models skill.
- The skill's pipeline is three linear steps: read the assumptions, run dcf_model.py, return a valuation.
- The same revenue projection run twice produces the identical valuation, since the file is the program.
- The skill runs its fixed steps even against a projection its assumptions were not written for, without flagging the mismatch.
- Its stated scope covers DCF analysis, sensitivity testing, Monte Carlo simulations, and scenario planning, and nothing beyond that.

## Who this is for

This is for finance professionals and analysts using Claude to build or stress-test financial models who want an accurate picture of what the skill automates versus what still requires human judgment about whether the inputs make sense.
