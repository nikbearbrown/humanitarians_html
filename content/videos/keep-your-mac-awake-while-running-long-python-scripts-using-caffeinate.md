---
title: "Keep Your Mac Awake While Running Long Python Scripts (Using caffeinate)"
seoTitle: "Keep Your Mac Awake Running Python Scripts with caffeinate"
description: "Learn how to use the macOS caffeinate command on a specific Python process ID so your Mac stays awake overnight without blocking all sleep."
summary: "A late-night walkthrough of using caffeinate on a single Python process ID so a long-running script survives overnight without keeping the whole Mac awake."
keywords: ["keep mac awake python script", "caffeinate command macos", "caffeinate specific process id", "prevent mac sleep during script", "caffeinate pid python", "long running python script overnight", "macos caffeinate pid example", "stop mac sleeping overnight script"]
generated: "article"
---

A script that takes a full day to run has a very specific enemy: the Mac's own power-saving settings. Left alone, macOS will happily put the machine to sleep to save battery, and that pause can cost hours of progress on a long-running job. This video is a real-time, late-night fix for exactly that problem, recorded while a script was still running.

## Why the Mac wants to sleep

By default, macOS shuts things down to conserve power when the machine is left idle or the lid closes. That's normally the right behavior. But if a Python process is in the middle of a long batch job, sleep doesn't just pause the display, it pauses the script itself. An eight-hour sleep cycle can mean an eight-hour delay on a job that was supposed to finish overnight.

## What caffeinate actually does

The fix is a macOS utility called caffeinate, which keeps the system, or a specific part of it, from going to sleep. Rather than disabling sleep system-wide (which would keep the whole Mac awake even after the script finishes, wasting power for no reason), caffeinate can be pointed at a single running process. That targeted approach is the whole point: the Mac stays awake only for as long as that one task needs it.

## Finding the Python process ID and applying caffeinate

The practical steps are simple. First, find the running Python process and grab its process ID, the numeric identifier the operating system uses to track that specific script. Then apply caffeinate directly to that PID. Once it's attached, macOS won't sleep while that process is active, but everything else about normal sleep behavior stays untouched. When the script finishes, the caffeinate hold goes away with it.

## Key takeaways

- macOS will sleep during long scripts by default, which pauses whatever is running.
- caffeinate is the macOS utility for preventing sleep, and it can be scoped to one process instead of the whole system.
- Find the Python script's process ID first, then apply caffeinate to that specific PID.
- This keeps the Mac awake only for the task that needs it, so normal sleep behavior resumes once the script finishes.
- It's a reliable trick for batch jobs, long data pipelines, or anything meant to run unattended overnight.

## Try it yourself

Next time you kick off a long Python job before bed, look up its process ID with `ps` or Activity Monitor and apply caffeinate to that PID rather than disabling sleep entirely. It's a small habit that saves a lot of wasted overnight hours.
