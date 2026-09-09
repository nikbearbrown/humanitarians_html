---
title: "Claude, Escalation Flagger."
seoTitle: "Does Claude Flag Risk by Judgment or Match?"
description: "How the escalation-flagger Claude skill flags items by matching written criteria in SKILL.md, not by sensing what feels risky."
summary: "This video shows that a Claude skill named escalation-flagger flags items by checking them against numbered criteria in SKILL.md, not by any independent sense of risk."
keywords: ["does claude judge risk on its own", "claude escalation flagger skill explained", "how to write skill.md criteria for flagging", "claude skill matches input not judges it", "why did claude not flag this input", "how to test a claude skill's criteria", "claude skill same input same output", "flag by match not by feeling claude"]
generated: "article"
---

When a Claude skill named escalation-flagger flags something for a human to look at, is that Claude exercising its own judgment about what looks risky, or is it matching input against criteria written down in a file a person could read and edit? This video answers that question directly by walking through how the skill's matching mechanism actually works.

## The file is the whole program

Every Claude skill is a folder with one file, SKILL.md, written in plain sentences rather than code, and that file is the entire program. For escalation-flagger, everything the skill knows lives in that single file: a numbered list of criteria checked one after another. Claude reads the file and then follows it. The file decides what gets flagged, not some separate judgment process inside Claude.

## Checked, not sensed

The video names the wrong guess most people make directly: that Claude is sensing which things feel risky, as if it had some independent intuition about danger. It isn't. Claude checks each item on the list, one criterion after another, and flags only where one actually matches. This is demonstrated by removing a criterion from the file: inputs that used to trigger a flag under that criterion stop getting flagged, and nothing hidden fills the gap. The behavior changes exactly as much as the file changes, and no more.

## Consistency inside the file's scope

Run the same input through escalation-flagger twice, and it produces the same match and the same flag both times, for as long as that input matches something written in the file. This repeatability is the direct payoff of the flag being decided by a written, checkable list rather than a judgment call that could vary from one run to the next.

## What happens outside the file's scope

The guarantee of consistency holds only for input the file actually describes. Send through a case the criteria list never anticipated, and nothing gets flagged. The video is precise about why: not because Claude judged the case safe, but because nothing in the file matched it. A flag's absence is not a safety verdict; it is simply the absence of a match.

## The prompt to try

The video's suggested exercise is to write a SKILL.md with three short numbered criteria for flagging something a person deals with often, then hand it inputs on both sides, one that matches and one that doesn't, and watch whether the flag follows the file rather than a feeling. Watching for the flag to fire exactly where a criterion matches, and stay silent everywhere else, is the test of whether the match-not-judgment claim actually holds for a skill written by hand.

## Key takeaways

- Escalation-flagger's entire behavior lives in one SKILL.md file: a numbered list of criteria checked in order.
- Claude flags input by matching it against those written criteria, not by sensing risk independently.
- Removing a criterion from the file stops the flags it used to trigger, with nothing hidden filling the gap.
- The same input run twice produces the same match and flag, as long as it matches something in the file.
- An unmatched case produces no flag, which reflects an absence of a match, not a judgment that the case is safe.

## Who this is for

This is for anyone building a Claude skill meant to flag or escalate items for human review, and for anyone who wants to understand what a "flag" from a skill-based system actually represents before trusting it.
