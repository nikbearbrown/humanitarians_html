---
title: "Nyquist Limit, Sample Rate & Aliasing Explained | Rohan"
seoTitle: "Nyquist Limit and Aliasing in Digital Audio"
description: "Rohan Vijaykumar explains sample rate, the Nyquist limit, and how under-sampling produces aliasing, the trap of a high pitch recorded as a fake low one."
summary: "Rohan Vijaykumar explains how digital audio stores discrete snapshots, why the Nyquist frequency caps what a sample rate can capture, and why upsampling cannot recover pitches never actually sampled."
keywords: ["what is the nyquist limit in audio", "how does sample rate affect audio quality", "why does aliasing happen in digital audio", "sample rate vs nyquist frequency explained", "can upsampling restore lost audio frequencies", "44100 hz vs 16000 hz sample rate", "high pitch sounds like low pitch recording", "how to test sampling theorem in python"]
generated: "article"
---

Rohan Vijaykumar of Humanitarians AI explains why digital audio is not a continuous recording of sound but a list of discrete snapshots, and what that distinction costs you if you ignore it. The video works through sample rate, the Nyquist limit, and the specific failure mode called aliasing, where a pitch too high for the sample rate gets recorded as a different, lower pitch instead of simply disappearing.

## Digital audio is snapshots, not a wave

A microphone picks up a continuous wiggle of air pressure, but a computer cannot store a continuous signal. It stores a number, waits, then stores another. Sample rate is how many of those numbers get taken each second. 44,100 times a second is the compact disc default. Every one of those measurements is a single point, not a smooth curve, and the smooth curve you see on a waveform display is a reconstruction built from those points, not a recording of the original wave itself.

## The Nyquist frequency sets a hard ceiling

Two numbers matter here, and mixing them up is the trap. Sample rate is how often you measure the air. The Nyquist frequency is the highest pitch those measurements can uniquely capture, and it is always half the sample rate. A compact disc sampling at 44,100 hertz can uniquely represent pitches up to 22,050 hertz, which sits near the top of human hearing. Speech tools often sample at 16,000 hertz, giving them a Nyquist ceiling of just 8,000 hertz. Anything above that ceiling in the original sound is either lost or, worse, folded down into the wrong place.

## When under-sampling turns a high pitch into a fake low one

You need more than two samples per cycle of a given pitch to capture it uniquely. Sample below that threshold and the reconstructed curve is not a rough guess at the true wave, it is the unique wave that those sparse dots could actually belong to, and that wave is a slower, lower-pitched signal than what was really there. This is aliasing: a high pitch stored as a fake low pitch. A spectrogram of an aliased file will show energy sitting in the wrong place entirely, because the true high-frequency content was never captured to begin with, not just recorded poorly.

## Upsampling does not undo a low sample rate

A common mistake is treating a higher sample rate as something that can be added back in after the fact. Stretching an existing list of samples, or upsampling a 16 kHz voice recording to a higher rate, does not invent the missing cycles that were never captured the first time. Recording at 192 kHz is not automatically better either, if the original source was already band-limited below what a lower rate could have captured. The sample rate you record at is the only thing that determines what frequencies are actually stored; nothing downstream can add that information back once it is gone.

## Key takeaways

- Digital audio is a series of discrete numeric snapshots, not a continuous recording of the sound wave.
- Sample rate is how often you measure; the Nyquist frequency, always half the sample rate, is the highest pitch you can uniquely capture.
- A compact disc at 44,100 Hz has a Nyquist ceiling near 22,050 Hz; a 16,000 Hz speech tool caps out at 8,000 Hz.
- Sampling a pitch too fast for its cycle produces aliasing, where the high pitch is recorded as a different, lower pitch rather than lost cleanly.
- Upsampling after the fact cannot recover frequencies that the original sample rate never captured.

## Who this is for

Anyone working with audio, speech, or signal data who needs a working grasp of sample rate and the Nyquist limit before choosing a recording rate or diagnosing why a recording sounds off, especially developers picking a sample rate for a speech tool or debugging unexpected pitch artifacts in a spectrogram.
