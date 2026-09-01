---
title: "Mars Rover Autonomy: Scored Paths & Target Selection"
seoTitle: "Mars Rover Autonomy: Scored Paths & Target Selection"
description: "Om Mali explains how NASA's Perseverance rover navigates Mars on its own, scoring driving paths and using AEGIS to pick rocks for laser analysis."
summary: "Because a round-trip signal to Mars can take up to 44 minutes, Perseverance has to score its own driving paths and pick its own science targets without waiting for Earth."
keywords: ["perseverance rover autonomous navigation", "aegis rover target selection", "mars rover communication delay", "how mars rovers choose rocks", "perseverance scored path driving", "snowdrift peak rover crossing", "mars rover roughness grid", "autonomous rock targeting laser"]
generated: "article"
---

A question sent to Mars can take up to 22 minutes to arrive, and the answer takes just as long to come back. That round-trip delay means there's no joystick controlling NASA's Perseverance rover in real time. Instead, the rover has to decide where to drive and what to examine largely on its own, and the method behind those decisions is a real shift from how most people imagine space exploration works.

## The distance problem

Every previous topic in this series has been about handling too much data. This one is about distance instead. Perseverance gets one plan uploaded from Earth per day. Whatever that plan doesn't cover, the rover has to figure out alone, scoring driving paths against a map of the terrain and scoring rocks against a definition of "interesting" that was written by scientists long before the rover ever launched.

## From stereo cameras to roughness grids

The 3-to-22-minute one-way signal delay is the number that forces all of this. With no possibility of live joystick control, Perseverance runs commands that were written the day before. To make its own decisions in between, it relies on two cameras that build a stereo view of the terrain, which becomes a height map. Most of that detailed map gets discarded, leaving behind a simplified grid of cells, each one holding a single value: how rough that patch of ground is.

## Scored paths and target selection

With that roughness grid in hand, Perseverance imagines roughly 1,700 possible paths reaching about six meters ahead, scoring each one on a combination of time and roughness. Most of those paths run straight through terrain the rover can't actually cross, so it clearance-checks the remaining candidates and drives the best option while continuously reassessing as the wheels turn.

The science side works the same way. The AEGIS system finds edges in the surrounding terrain, groups them into closed outlines, and measures each one's size, brightness, and distance. It then ranks those candidates against a profile of what scientists consider worth investigating, and the top-ranked rock gets hit with the laser for analysis.

## What the autonomy actually buys

The payoff shows up clearly in a real crossing. In 2023, Perseverance crossed a boulder field called Snowdrift Peak. A straight path across would have been 520 meters, but the rover autonomously drove 759 meters over six days, finishing 12 days faster than its predecessor, Curiosity, would have managed on the same terrain. The broader numbers back this up: Curiosity drove only about 6% of its total distance autonomously, while Perseverance drives close to 90%. Its longest unreviewed autonomous drive was nearly 700 meters, and AEGIS hit its intended material over 93% of the time.

## The design tell: rules written on Earth

None of this means the rover decides for itself what counts as interesting. It applies a definition that geologists wrote in advance: big, bright, close, a particular shape. That definition is a document, and it has an author. The caution built into the system has a real cost too. Roughly 239 of the meters driven across Snowdrift Peak went around obstacles rather than through them, and the rover can only revise its own decision-making on the mission's own clock, across specific mission sols.

## Key takeaways

- Perseverance operates autonomously because a round-trip signal to Mars can take up to 44 minutes, ruling out real-time control.
- Driving decisions come from scoring roughly 1,700 candidate paths against a simplified roughness grid built from stereo camera data.
- The AEGIS system autonomously selects rock targets for laser analysis by ranking outlines against a scientist-defined profile.
- Perseverance drives autonomously roughly 90% of the time, compared to about 6% for Curiosity.
- Even fully autonomous decisions still follow criteria written by humans on Earth well before the rover encounters the terrain.

## Try it yourself

If you're designing any system that has to make judgment calls before a human ever reviews its output, the same questions apply: what criteria should it use, how conservative should it be when being wrong carries asymmetric risk, and how will you update those criteria after deployment. Working through those three questions for your own project is the practical exercise this video points toward.
