---
title: "Generating Video with AI (Studio Sessions with Bear)"
seoTitle: "Generating Video with AI: Full Workflow Walkthrough"
description: "A live training session walks through the full AI video pipeline, from voiceover scripts to B-roll generation, audio editing, and branded intros and outros."
summary: "In this live Humanitarians AI training, Professor Nik Bear Brown builds an educational video from scratch on screen, covering scripting, voiceover generation, stem separation, AI B-roll, and editing in real time."
keywords: ["how to make videos with ai", "ai voiceover script workflow", "elevenlabs vs suno voiceover", "audacity trim amplify voiceover", "midjourney runway b-roll workflow", "ai video production tutorial", "opt portal project video", "studio sessions with bear"]
generated: "article"
---

Most explanations of AI video production stay abstract, listing tools without showing how they actually connect. This recorded training session does the opposite: Professor Nik Bear Brown builds a real explainer video, for a project called the OPT Portal, live and on screen, narrating every decision as he makes it. The result is less a tutorial and more a look over the shoulder at how a working AI video pipeline actually runs end to end.

The session opens with a simple question: how do you quickly make a video that explains a project well enough that other people want to support it? The answer starts not with cameras or footage, but with a script.

## From project notes to a voiceover script

The first step is turning existing project documentation into a spoken script using an AI assistant, in this case Claude. Rather than writing from scratch, the whole project description gets pasted in with a prompt to write a voiceover script. That script gets saved into a dedicated project folder structure, specifically a scripts subfolder, so it can always be found later rather than getting lost in some chat session nobody can relocate. This organizational habit is treated as important as the generation itself: AI makes it fast to produce drafts, but only if you can find them again.

Once a draft script exists, it still needs a human pass. The session is explicit that scripts coming out of an AI assistant may not reflect how a real person wants to phrase something, so editing for voice and accuracy is a required step, not optional polish. Capitalization and spacing matter too, since a voiceover engine will pronounce an acronym like OPT differently depending on how it is capitalized in the text, which means the script has to be checked by ear, not just by eye.

## Comparing voiceover engines

The session tests two different voice generation approaches side by side. ElevenLabs offers cloned and stock voices with fine control over pacing, and the session demonstrates adjusting speed after an initial take comes out too slow. It also shows how to browse and select from a library of voices, including a custom cloned voice built specifically for a prior project. But ElevenLabs voices are described as having a percussive, somewhat robotic rhythm that does not always match natural human speech patterns.

As an alternative, the session turns to Suno, a tool not built for voiceover work but adapted for it anyway. Suno is used with a spoken word style setting, sometimes combined with a poetry tag, to get a more lyrical, natural-sounding delivery. A key technical advantage comes up here: Suno outputs WAV files, which are higher quality and stereo, while ElevenLabs' MP3 output is compressed and mono. The session generates several takes at once, since Suno typically produces five to seven variations per request, and treats picking the best one as a normal part of the process rather than a sign anything went wrong.

## Cleaning up audio in Audacity

Once a voiceover take is chosen, the raw file gets cleaned up in Audacity, described as both the best tool for this job and, conveniently, free. The workflow shown includes trimming dead air and trailing background music that Suno tends to add automatically, then adjusting amplitude using the effect menu's volume and compression tools. A specific caution comes up here: the software will calculate a maximum amplification value for full vocal range, but pushing all the way to that maximum risks audible distortion, so the session settles on a lower, safer amplification value instead. Fades are applied at cut points to avoid abrupt audio spikes.

## Separating vocals with stem splitting

For cases where only the spoken vocal track is needed, separate from any background music baked into the generation, the session uses a free tool called Fader to split the audio into stems, isolated bass, drums, instrumental, and vocal tracks. Reviewing these stems in Audacity individually shows exactly when each element starts and stops, which helps explain why a track sounds a certain way and makes it possible to keep just the vocal line when that is all that is needed.

## Building the storyboard and generating B-roll

With a working voiceover in hand, the session moves to visuals. Rather than manually storyboarding every shot up front, the workflow feeds the script back into an AI assistant with a request for a mix of tool-demonstration footage and AI-generated B-roll, with suggested scene lengths around three to five seconds. This produces a rough shot list that functions as a starting point rather than a final plan.

Actual B-roll images are generated in Midjourney, and the session is candid that most generations get rejected. Producing three minutes of finished video might mean generating half an hour of raw B-roll and keeping only what actually works. Images are then animated into short video clips using Runway, sometimes with additional prompted effects layered on top, such as visual elements swirling in front of a subject's eyes to represent stress or overwhelm.

## Personalizing images with Omni Reference

A significant portion of the session is devoted to Midjourney's `--oref` (Omni Reference) parameter, which lets a real photograph inform a new AI generation, useful for turning old personal or family photos into higher-quality, reimagined versions, or placing a real face into an entirely different setting or era. This is distinguished from `--sref` (Style Reference), which borrows the visual feel of a reference image without trying to preserve a specific face. Both parameters take a weight value that controls how closely the output should match the reference, and the session recommends checking Midjourney's own documentation, or asking an AI assistant to explain it, when the exact ranges are unclear.

## Editing, transitions, and brand consistency

The final stretch covers assembling everything in a video editor: importing voiceover, stem tracks, and generated B-roll, matching visuals to specific lines of narration, and changing scenes on natural pauses in the speech rather than mid-sentence. The session also covers building a consistent intro and outro using Illustrator for title cards in a matching typeface, so that every video on the channel shares the same visual identity regardless of who is editing it.

## Key takeaways

- The workflow starts with an AI-drafted voiceover script that still requires human editing for voice, accuracy, and pronunciation.
- ElevenLabs and Suno offer different tradeoffs: ElevenLabs gives more control but can sound percussive, while Suno produces more natural-sounding, higher-quality stereo WAV output.
- Audacity is used to trim, amplify without distorting, and fade audio cleanly before it goes into a video edit.
- Stem-splitting tools can isolate vocals from background music when only the spoken track is needed.
- Midjourney's Omni Reference and Style Reference parameters serve different purposes: preserving a specific face versus borrowing a general visual style.
- Producing a short finished video typically means generating and discarding far more raw material than ends up in the final cut.

## Who this is for

This session is aimed at anyone on a nonprofit or small team who needs to produce explainer or training videos without a traditional production budget. It is a direct, practical companion to other Humanitarians AI content on AI-generated video, music, and character design, and shows the actual iterative process, generate, review, discard, regenerate, that sits behind those finished pieces.
