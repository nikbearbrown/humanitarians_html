---
title: "claude liam brutalist skill duration planner"
seoTitle: "how the duration planner skill sets video length"
description: "Breaks down the duration planner skill, which treats video length as an output of content pacing rather than a fixed target to hit."
summary: "The duration planner skill sizes each explainer video beat by beat using content-type floors and measured narration timing, treating total runtime as an output rather than a target to hit or pad toward."
keywords: ["how long should an explainer video be", "duration planner skill explained", "why duration is an output not a target", "content type consolidation floor video pacing", "kokoro narration timing video length", "how to avoid padding a video to hit a target length", "beat sheet timing floor ceiling table", "why the six minute engagement rule is wrong"]
generated: "article"
---

Every video creator eventually hits the same question: how long should this video be. The duration planner skill answers it by refusing to treat duration as something you decide in advance. Instead, duration is an output. You size the script for the content, and the runtime falls out of that decision rather than the other way around.

## Duration as output, not target

The skill's core thesis, stated directly in its own file, is that duration is an output, never a target. A complex mechanism might land at three or four minutes; a definitional explainer might land at thirty to sixty seconds. Both are correct if the pacing was driven by the content. A uniform target, whether that is thirty seconds or one minute, has no basis in how people actually learn from video. Hitting a fixed number either compresses content and destroys the integration a viewer needs to follow it, or pads the video with material that adds nothing but extraneous load. Either way, learning suffers.

## How the pipeline actually works

The duration planner folder is deliberately small: one skill file describing the doctrine, one short reference file with the evidence and a floor-and-ceiling table, and one advisory script that reads timings and reports back. Every beat in a storyboard carries a content type set at storyboard time, and the storyboard becomes the master clock. Once Kokoro (the narration engine) measures the actual spoken timing for a beat, the skill compares that measured narration against the floor table for that beat's content type. If the narration comes in under its floor, the skill recommends a hold. If it goes over the ceiling, it recommends a split. Total runtime is simply what falls out of applying this beat by beat. The skill reports the number and stops; it does not adjust content to hit a target.

## Content-type floors, concretely

Each content type carries its own consolidation floor, the minimum time a viewer's working memory needs to register a new element before the beat cuts away. A title beat needs three to five seconds. A structural or geometric beat needs six to eight. A mechanism step needs six to ten. An equation step needs seven to twelve. If narration for a beat lands under its floor, the fix is not to shorten the next beat or speed up the voice. The fix is to add a hold.

## Holds are automatic, and stay in sync

Holds are applied automatically: the scene base holds the final frame of a beat up to its content type's floor, and the compile step pads that beat's audio with matching silence so audio and video stay synchronized. This can be turned off per video with a hold-floors setting in the metadata. Both the render step and the reassembly step read from the same pacing table, which matters because rendering with one setting while assembling with another would desynchronize the final video.

## Where the discipline actually bites

Once an idea has landed on screen, adding decorative motion or filler graphics just to stretch the video toward a round number like one minute is treated as a coherence violation, the same kind of extraneous load that degrades learning as compressing content too far. Padding to hit thirty seconds is exactly as wrong as compressing to hit it. The skill also explicitly rejects the commonly cited "six-minute engagement" rule, noting it comes from a watch-time finding on a MOOC platform that has not been shown to replicate in real courses, and isn't itself a learning result. The trade the skill accepts is shorter watch time in exchange for a cleaner learning schema.

## Key takeaways

- Duration is treated as an output of content pacing, never as a target the script is built to hit.
- Each beat's content type has a floor and ceiling; measured narration against that table decides whether to hold or split.
- Under-floor beats get an automatic hold with matching audio silence, not a rushed voice or a shortened neighbor beat.
- Padding to reach a target length is treated as seriously wrong as compressing content to fit one.
- The often-cited six-minute engagement rule is a watch-time statistic from a MOOC platform, not a validated learning result, and the skill rejects it as a basis for pacing.

## Who this is for

Anyone producing explainer or educational video content who wants a defensible, repeatable method for deciding runtime, rather than guessing at a target length and cutting or padding to reach it.
