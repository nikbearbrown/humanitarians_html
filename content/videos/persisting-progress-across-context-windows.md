---
title: "Persisting Progress Across Context Windows"
seoTitle: "Persisting Agent Progress Across Context Windows"
description: "A coding agent doesn't remember past sessions. Learn how a feature_list.json file plus git lets an agent resume exactly where it left off, every time."
summary: "When an AI coding agent's context window fills up, the next session opens blank. A feature_list.json file plus git as a commit ledger lets it resume exactly where it stopped."
keywords: ["agent context window reset", "feature list json checkpoint", "claude agent resume session", "git commit ledger ai agent", "coding agent checkpointing pattern", "externalize agent progress file", "long running agent task tracking", "claude basics agent memory"]
generated: "article"
---

People assume a coding agent remembers where it left off between sessions. It doesn't. A context window has a hard limit, and once it fills, the session ends and the next one starts with no memory of what passed and what failed. That gap creates a real problem for anyone running an agent through a long list of features: how does the next session know to pick up at feature 51 and not feature one?

## The naive framing, and why it fails

Without a fix, an agent facing a fresh context window has exactly two bad options. It can reread everything already done, which burns through a large portion of the new session's context before any new work happens. Or it can guess where it left off, which is simply unreliable. Neither approach scales to a long-running project with dozens or hundreds of discrete features to build.

## The fix: one file plus git as a ledger

The solution is to externalize the agent's progress instead of relying on the model to hold it in memory. That means a single file, `feature_list.json`, with one entry per feature. Each entry carries an ID and a status, either incomplete or passing. Alongside that file, git commits serve as an immutable ledger: one commit per completed feature, so there's a durable, ordered record of exactly what changed and when.

## How the anchor works in practice

Say session one works through the list and finishes features one through 50. Each of those flips from incomplete to passing, and each gets its own commit. Feature 51 is the first entry still marked incomplete, and that's the anchor for whatever comes next. Every new session follows the exact same three-step routine: open `feature_list.json`, find the first entry still marked incomplete, and start exactly there. Implement it, run the tests, commit, mark it passing, then repeat: read, find the gap, fill it.

## The anchor returns in session two

This is where the mechanism proves itself. Session two opens the same file and finds feature 51 marked incomplete, the same one session one left behind, and starts precisely there. There's no rereading the first 50 completed features and no guessing about what's already been handled. By the end of session two, features 51 through 100 are passing too, and the ledger has grown accordingly. The pattern repeats cleanly for as many sessions as the project needs.

## Why this reframes what a context window is for

The bigger idea underneath the mechanics is a reframe: an agent's context window isn't its memory, it's a workspace. Treating it that way changes how you build anything long-running with an agent. Instead of trying to keep the whole project state inside the model's context, you externalize the state to a file and a version control history that persists independently of any single session, and each new session's whole job becomes reading that state, finding the first gap, and filling it.

## Key takeaways

- A coding agent's context window resets every session; it has no built-in memory of previous work.
- Rereading everything or guessing where to resume are both bad options: one burns context, the other is unreliable.
- A `feature_list.json` file, one entry per feature with an id and a status of incomplete or passing, externalizes progress outside the model's context.
- Git commits, one per completed feature, function as an immutable ledger backing up the file's state.
- Every new session follows the same loop: open the file, find the first incomplete entry, implement it, test it, commit it, mark it passing, repeat.
- The context window should be treated as a workspace, not memory; the real memory lives in the file and the commit history.

## Try it yourself

The prompt to run against your own long-running agent task: externalize my agent's progress to a `feature_list.json` plus git, so it can resume across sessions, then prove it picks up exactly where it left off, without replaying finished work. This kind of checkpointing pattern is part of the Claude Basics material that Humanitarians AI publishes for people building with agents day to day.
