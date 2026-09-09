---
title: "The Optimism Trap: Predicting Deadlines with Monte Carlo Simulations | Sanjana"
seoTitle: "Monte Carlo Simulation for Realistic Project Deadlines"
description: "Sanjana shows how to build a 10,000-run Monte Carlo simulation with Claude to find a realistic P80 project deadline."
summary: "Sanjana, a Humanitarians AI project manager, explains why single-number deadlines are always too optimistic and walks through building a 10,000-run Monte Carlo simulation with Claude to find a real P80 commit date."
keywords: ["how to build a monte carlo schedule simulation", "why do project deadlines always run late", "p50 vs p80 vs p90 project deadline", "how to use claude for project scheduling", "monte carlo simulation with claude code", "why single number estimates fail projects", "how task dependencies delay a project", "best case likely case worst case estimating"]
generated: "article"
---

Sanjana, a project manager at Humanitarians AI, tackles the one number every project comes down to: the deadline. She walks through Monte Carlo schedule risk, a method for letting a computer play out a project thousands of times so the team can see not just when they hope it finishes, but when it realistically will.

## Why single-number deadlines are too optimistic

Most project plans give each task a single best-guess number of days, add them up, and call the sum the deadline: design five days, back end eight, testing four, release two, nineteen days done. The problem is that a best guess isn't a promise. Some tasks finish a little early, but others blow up by a week, and a task can only save a plan a day or two while it can cost many more. Add up enough of those lopsided guesses and the real finish date almost always lands later than the plan predicted. The single number isn't just rough, it's quietly too optimistic nearly every time.

## The four-step Monte Carlo method

Instead of one guess per task, Sanjana lays out four steps. First, give each task three numbers instead of one: a best case, a most likely case, and a worst case, which together form the task's range. Second, let the computer pick a random length for every task inside its range and add them up, producing one possible version of the whole project. Third, repeat that ten thousand times, turning one guess into ten thousand outcomes. Fourth, instead of averaging, read the date the project hits eighty percent of the time, the P80, which is the date a team can actually promise.

## Building it with Claude

The instructions given to Claude are short: take the list of tasks with their three numbers each, pick a random length for every task inside its range, add them up for one run, repeat that ten thousand times, and report the results. Because the instructions are specific about exactly what to do, the code Claude writes back is code that can be read and checked directly, a sampling function that leans toward the likely value while leaving room for the worst case, one trial that sums every task into a single run, and the whole thing repeated ten thousand times, printed next to the old single-number plan for comparison.

## Why parallel tasks change everything

Running the simulation shows ten thousand outcomes stacking into a shape, with the original plan's date landing at the hopeful, early edge of that distribution and the true P80 further out. But the first version of the simulation quietly cheated by adding tasks as if they happened one after another. Real projects run tasks in parallel, back-end and front-end starting together after design, with testing unable to begin until both finish. When two paths join back up, the project has to wait for the slower one. Fixing this means telling Claude which task depends on which, so each task starts only once everything before it is done, each task starting at the latest finish time of the tasks that feed into it. Re-running the simulation with dependencies included shifts the distribution further right and wider, exactly what waiting for the slowest path predicts.

## Key takeaways

- Single-number deadlines are systematically too optimistic because tasks can save a little time but lose a lot, and the losses dominate the sum.
- Giving each task a best case, likely case, and worst case turns one fragile guess into a realistic range.
- Running ten thousand randomized trials produces a distribution of outcomes instead of one number, from which P50, P80, and P90 can be read.
- P80, the date the project finishes eighty percent of the time, is the date a team can actually commit to, not the average or the original plan.
- Parallel task paths matter: a project has to wait for its slowest concurrent path, which pushes the real deadline out further than a simple sum suggests.

## Who this is for

This is for project managers, team leads, and anyone estimating deadlines who wants a concrete, buildable method, using Claude to write the simulation code, for turning optimistic guesses into a defensible, statistically grounded commitment date.
