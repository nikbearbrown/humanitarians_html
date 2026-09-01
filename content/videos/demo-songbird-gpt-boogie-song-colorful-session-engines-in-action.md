---
title: "Demo: Songbird GPT (boogie/song/colorful.session engines) in Action"
seoTitle: "Songbird GPT Demo: Music Video Prompt Tool"
description: "A hands-on demo of Songbird, a custom GPT for generating music-video prompts and producer-style session notes, tested live on a Sanskrit devotional chant."
summary: "Bear tests Songbird, a custom GPT that generates sequenced music-video prompts and detailed producer session notes, live on a Sanskrit devotional chant."
keywords: ["songbird gpt music video prompts", "custom gpt session notes music", "ai music video b-roll generator", "song colorful prompt mode", "ai production notes for musicians", "gaia mantra ai music video", "sequenced ai video prompts filenames", "midjourney workflow music video"]
generated: "article"
---

Building B-roll for music videos by hand is slow, and prompting an AI image or video tool one clip at a time is slower still if you don't have a system for keeping the results organized. Songbird is a custom GPT built to solve that specific problem, and this video is an unpolished, work-in-progress demo of it running on real input, a Sanskrit devotional chant, with no heavy editing of what it returns.

## What Songbird does

Songbird is a custom GPT built to generate music-video ideas through a handful of simple mode commands. Boogie handles dance video concepts. Song takes lyrics and turns them into a sequence of music-video prompts. Colorful applies an iPhone-style, hyper-saturated color treatment to whatever is generated. There's also an Unreal mode, plus a small holiday switch: saying "mantra" during the right season will swap the theme toward Krampus or Santa Claus imagery instead of its default output. Typing "list" or asking for commands makes the tool spell out everything it currently supports, which matters given that the tool is explicitly still being expanded.

## Why prompts get numbered

Like its sibling project Unreal Reels, Songbird prepends a sequence number to each generated prompt, and for the same practical reason: most text-to-image and text-to-video tools, including Midjourney, use the prompt text as the output filename, which normally makes it hard to tell what order a batch of clips or images belongs in. By putting a number at the front, Songbird ensures the generated files sort correctly by name, since tools that ignore that number in their interpretation of the prompt still keep it in the filename they produce.

## Testing it on a real chant

For this demo, the input is Gayatri's Mantra, a Sanskrit devotional chant, run through the song and colorful settings together with essentially no prompt editing, so viewers can see exactly what the tool returns unfiltered. Clicking through produces a sequenced set of prompts styled for the colorful, iPhone-hyper-color treatment, meant to become the raw material for a music video built around the chant, with the understanding that prompts would normally be refined further and mixed with original footage before a final edit.

## The bigger addition: session notes

The most substantial part of the demo is a newer function called session, which generates what the video calls session notes, or production notes. The idea addresses a real gap in AI music generation: current AI music tools cannot read sheet music, and plenty of working musicians can't read traditional notation either, yet they still need a way to communicate what they want from a track. Session notes are built to solve that by translating a feel, a tone, a vibe into detailed, plain-language guidance a producer or an AI music generator can actually use.

Tested on a modified version of "Up on the Housetop," the session command produces highly detailed notes describing what the song is about and what direction the musicians (or the generator) should take, along with variant versions, including a more Motown Christmas take and a more gospel-leaning one. Because AI music generation is inherently probabilistic rather than deterministic, these detailed notes won't be followed exactly, but they push the output meaningfully closer to what the creator actually wants than a vague, casual description would.

## A practical caveat

One useful piece of guidance offered directly: many AI music generators have character limits on their prompts, so a set of detailed session notes may need to be shortened before it can be pasted in. That's described as an easy fix, just ask a language model to compress the notes down to whatever character limit your specific music generator enforces, while keeping the core direction intact.

## Key takeaways

- Songbird is a custom GPT with distinct modes (boogie, song, colorful, Unreal, and a holiday "mantra" switch) for generating music-video prompt sequences.
- Generated prompts carry a leading sequence number specifically so output files sort correctly by filename, since many tools ignore the number's meaning but keep it in the file name.
- The demo tests Songbird on Gayatri's Mantra, a Sanskrit devotional chant, using the song and colorful modes with minimal prompt editing.
- A newer "session" function generates detailed production notes, aimed at giving musicians and AI music generators clear guidance even when the person requesting a track can't read sheet music.
- Session notes can be shortened on request to fit the character limits of a specific AI music generator without losing the core creative direction.

## Try it yourself

Songbird is an active work in progress, with new functions like session notes being added regularly. Anyone curious to try it can find a link to the tool and instructions for using it through Humanitarians AI's music and creative tools page.
