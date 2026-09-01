---
title: "Varun Nayyar's Progress in Medhavy in June 2026"
seoTitle: "Medhavy Month 2: Rendering Toolchain and Physics"
description: "Varun Nayyar documents standing up a WSL rendering toolchain from scratch and fixing a structural animation bug for the Medhavy physics project."
summary: "Varun Nayyar walks through his second month on Medhavy: standing up a WSL rendering toolchain, rebuilding two physics scenes for accuracy, and fixing a structural animation bug."
keywords: ["medhavy project physics animation", "manim rendering toolchain wsl", "windows subsystem for linux setup", "observable universe star field sampling", "physics animation bug fix", "manim scene rendering errors", "humanitarians ai fellows medhavy", "square root sampling star field", "manim structural animation fault"]
generated: "article"
---

Some months of technical work produce a visible deliverable early and steadily. This one didn't, and Varun Nayyar's update is refreshingly upfront about that: the first week of his second month on the Medhavy project produced nothing visible at all, because the actual work was standing up an environment from zero.

## Standing up a rendering toolchain from nothing

Medhavy's second month began as a standing start on a new toolchain, moving from an empty environment to working animated physics scenes over five weeks and roughly 100 documented hours. The environment in question was Windows Subsystem for Linux, and getting a rendering toolchain running there meant getting system libraries, a package manager that resolves paths correctly, and a file system that wouldn't fight back, all working together before a single frame could render. Two distinct failures had to be diagnosed first. The package manager was resolving against the wrong environment, which was fixed with the active flag. Separately, the Windows file system rejected the hard links the installer wanted to create, which was fixed by telling the installer to copy files instead. Only once both of those were resolved did the first scene render cleanly.

## Rebuilding two scenes for scientific accuracy

With the environment working, the actual animation work began on two scenes: the observable universe and the Milky Way. Both started as naive approximations, and both had to be rebuilt, because their first versions were geometrically wrong in ways an audience would feel even without being able to name exactly why. The star field is the clearest example of this. Scattering points uniformly across a radius causes them to cluster near the center, because area grows with the square of the radius, not linearly with it. The fix is to sample using the square root of a uniform draw instead. That single substitution in the sampling method is the difference between a star field that merely looks plausible and one that is actually correct.

## Tracing a structural animation bug

A separate, genuine animation bug also had to be solved. In a scene cycling through different physical quantities, static headings were vanishing after the very first iteration of the loop. It wasn't a rendering problem and it wasn't a timing problem; it was structural. Something in the code was clearing elements that were never supposed to be cleared. The root cause turned out to be a fade-out call placed inside the loop that cycled through the units, which meant every pass through the loop wiped the headings along with the values they were meant to label. Moving that fade-out call outside the loop fixed it. A related, subtler fix followed: swapping the transform so that fixed phrases stayed stationary on screen while only the variable unit symbols morphed between iterations.

## Approval and a scoped path forward

The completed videos went to Prof. Sridhar, who approved them and asked Varun to continue, both in writing and again verbally in the standing meeting. Later in the month, Prof. Nick directed a move to a new rendering tool, with explicit instructions to build visualizations only for topics that genuinely warranted one, rather than animating everything by default. Rather than making that call unilaterally, Varun submitted a scoped topic list for review before producing videos against it on the new tool. One piece did not land: the narration layer. The API key provided for voice generation was disabled, not due to a configuration error or a usage limit, but an inactive credential that only the account administrator could resolve.

## Key takeaways

- Standing up a rendering toolchain on WSL required fixing a package manager path resolution issue and a hard-link conflict with the Windows file system before any frame could render.
- Both the observable universe and Milky Way scenes were rebuilt because their initial versions were geometrically inaccurate, not just visually rough.
- Uniform radius sampling clusters points near the center; the correct approach samples the square root of a uniform draw to get proper density.
- A structural animation bug caused headings to vanish because a fade-out call sat inside the wrong loop; moving it outside the loop fixed the issue.
- Prof. Sridhar approved the completed videos and requested continued work, and Prof. Nick directed a scoped, reviewed topic list for the next phase rather than unlimited production.
- The narration layer stalled on a disabled API key, an account-level issue rather than a technical one on Varun's end.

## Who this is for

This is for Medhavy Fellows and contributors tracking the project's technical progress, and for anyone setting up a Manim or similar rendering pipeline on Windows Subsystem for Linux who wants to see real, diagnosed failure modes rather than a clean success story.
