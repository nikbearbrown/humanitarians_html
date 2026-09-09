---
title: "How to Read an Audio Spectrogram (And What It Hides) | Rohan"
seoTitle: "How to Read an Audio Spectrogram (And What It Hides)"
description: "Rohan Vijayakumar explains what a spectrogram actually measures, how to read its axes and harmonics, and the three things it cannot tell you."
summary: "Rohan Vijayakumar explains how a spectrogram maps audio energy across time and frequency, how to read harmonics and window-size tradeoffs, and the three things a spectrogram cannot tell you."
keywords: ["how to read an audio spectrogram", "how to plot a spectrogram in librosa", "why spectrograms cant show phase", "waveform vs spectrogram explained", "librosa python spectrogram tutorial claude", "harmonics and spectral brightness explained", "spectrogram looks blurry check window size", "what a spectrogram hides about a mix"]
generated: "article"
---

A spectrogram is the picture audio people stare at when a waveform isn't enough. Rohan Vijayakumar teaches what that picture actually measures, when to use it, and the three things it will not tell you, even when it looks decisive.

## Waveform vs. spectrogram

A waveform plots air pressure against time, so you can see loud and quiet, but you can't see which pitches are present. Two completely different sounds can share a similar-looking wiggle. A spectrogram exists to unpack that wiggle into pitches, turning a single line into a map of energy over time and frequency.

## Reading the axes

Time runs left to right, frequency runs up, and each cell's brightness shows how much energy sat in that pitch at that moment. A sung note lights up a band. Noise looks like speckle with no pitch to hold onto. Read the picture as a histogram of loudness sliced by time and by frequency, not as a single measurement.

## Harmonics and spectral brightness

A sung note is not a single line on the spectrogram, it's a stack, a lowest band with fainter copies above it. Those copies are harmonics. Brightness is energy, not correctness, so a bright smear can mean a distortion artifact or two notes fighting each other. The point is to read the shape of what's there, not to assume brightness alone tells you what it means.

## The window size tradeoff

A spectrogram is built from a sliding window, and the window's length trades one kind of clarity for another. A short window is sharp in time, showing you the exact attack of a drum hit. A long window is sharp in pitch, showing you a sung note sitting still. You cannot have both at once. If a section of the picture looks blurry, check the window size before assuming the problem is in the recording itself.

## What a spectrogram hides

Three things don't show up no matter how good the picture looks. Phase: two sounds can produce the same spectrogram and still cancel each other out in the air. Overlapping voices: multiple sources smear into a single stain instead of separating cleanly. Quiet sounds: consonants and other low-energy detail can fall below the visible floor entirely. Use a spectrogram to find a note, a breath, a cut, or a dropout, not to declare a mix clean or to claim a model understood a lyric.

## Key takeaways

- A spectrogram maps energy across time and frequency; a waveform only shows loudness over time.
- Harmonics appear as a stack of bands above a fundamental pitch, not as a single line.
- Window length trades time precision against frequency precision, you can't maximize both at once.
- A spectrogram cannot show phase, cannot cleanly separate overlapping voices, and cannot reveal sound below its energy floor.
- Use a spectrogram to locate structure (a note, a breath, a cut), not as proof that a mix is clean or a lyric was understood.

## Who this is for

Anyone working with songs, speech, or lyrics who relies on spectrograms, and wants a clear sense of what the picture is actually showing versus what it only looks like it's showing.
