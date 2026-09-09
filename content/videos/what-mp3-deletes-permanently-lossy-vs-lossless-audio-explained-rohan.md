---
title: "What MP3 Deletes Permanently: Lossy vs Lossless Audio Explained | Rohan"
seoTitle: "What MP3 Compression Actually Deletes From Your Audio"
description: "Rohan measures what MP3 encoding permanently removes, from the 16 kHz cutoff at 128 kbps to generation loss from repeated re-encoding."
summary: "Rohan explains how MP3 encoding permanently deletes audio frequencies based on an auditory masking model, why 128 kbps and 320 kbps differ, and why re-encoding an MP3 repeatedly causes cumulative, irreversible generation loss."
keywords: ["what does mp3 compression actually delete", "why does mp3 cut off high frequencies", "how does auditory masking work in mp3 encoding", "128 kbps vs 320 kbps mp3 quality difference", "what is generation loss in audio re-encoding", "when to use lossless vs lossy audio masters", "why re-exporting mp3 degrades audio quality", "how mp3 encoders decide what to discard"]
generated: "article"
---

An MP3 is not a smaller copy of your song. Rohan explains that it is a different song entirely, one where an algorithm decided which parts you would not miss and then deleted them permanently.

## The 16 kHz cutoff at 128 kbps

Rohan demonstrates this directly with white noise, a signal that contains every frequency at equal energy. Encoded at 128 kilobits and examined again, everything above 16 kilohertz is simply gone, not quieter, gone. Measured directly, at 17 kilohertz the encoded file sits 13 decibels down from the original. That shelf is the first thing every MP3 encoder discards.

## Why the encoder targets what your ear cannot hear

The 16 kilohertz cutoff is not arbitrary. The encoder is not trying to preserve the raw signal at all; it is modeling your ear. When a loud sound and a quiet sound sit close together in frequency, you physically cannot hear the quiet one, the loud one masks it. This is auditory masking, and it is the entire trick behind MP3 compression: the encoder finds every masked sound in the signal and spends zero bits encoding it, deleting exactly what you were never going to perceive in the first place.

## How bitrate controls the aggressiveness of deletion

The bitrate you choose decides how aggressive that deletion gets. At 128 kilobits, the resulting file is roughly eleven times smaller than the original, and the frequency cliff sits at 16 kilohertz. At 320 kilobits, the file is only about four and a half times smaller, and the audio survives intact all the way up to 19 kilohertz. Same song, same encoder, the only difference is how much the algorithm was permitted to discard.

## The hidden cost of re-encoding: generation loss

Here is the part that catches most people off guard. Every re-encode starts the deletion process over from scratch. Rohan took a 128 kilobit file and ran it through ten more rounds of encoding. After those ten passes, the 12 kilohertz band had lost seven decibels. Each pass throws away a little more of the signal, and none of what is discarded ever comes back. Editing an MP3 file and re-exporting it is not a neutral operation, it compounds loss with every round.

## When lossy compression is fine, and when it is a mistake

Lossy compression is genuinely fine for listening, streaming, or sharing a rough mix. A well-encoded 320 kilobit file is transparent for almost everyone in these contexts. It becomes a mistake for archiving, mastering, anything you plan to edit later, or anything you intend to feed into a model. The right practice is to keep a lossless master at all times and export a lossy version only at the very end, exactly once. Never work from a file that has already been thinned by a previous round of compression.

## Key takeaways

- An MP3 is not a compressed copy of the original audio, it is a permanently altered version with specific frequencies deleted entirely.
- At 128 kbps, everything above roughly 16 kHz is removed; at 320 kbps, audio survives intact up to about 19 kHz.
- MP3 encoders exploit auditory masking, discarding quiet sounds that sit near louder sounds in frequency because the ear cannot perceive them anyway.
- Higher bitrate means less aggressive deletion: 128 kbps shrinks a file about elevenfold, 320 kbps only about four and a half times.
- Re-encoding an already-compressed MP3 causes cumulative generation loss, ten re-encodes of a 128 kbps file lost seven decibels in the 12 kHz band, and none of it returns.

## Who this is for

Anyone recording, editing, or archiving audio who needs to understand why working from an MP3 instead of a lossless master causes permanent, compounding quality loss, and when lossy compression is actually the right tool to use.
