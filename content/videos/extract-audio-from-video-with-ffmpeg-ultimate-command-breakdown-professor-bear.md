---
title: "Extract Audio from Video with FFmpeg: Ultimate Command Breakdown | Professor Bear Tech Tutorials"
seoTitle: "Extract Audio from Video with FFmpeg Command"
description: "A plain-language breakdown of the FFmpeg command that pulls high-quality WAV audio out of any video file, plus quick cleanup steps in Audacity."
summary: "One FFmpeg command line pulls CD-quality audio out of a video file, and a few minutes in Audacity gets it trimmed, cleaned, and ready to use."
keywords: ["extract audio from video ffmpeg command", "ffmpeg convert video to wav", "ffmpeg pcm_s16le audio extraction", "how to extract audio from mp4", "ffmpeg command line explained", "trim and amplify audio in audacity", "wav vs mp3 audio extraction", "free audio editing tool audacity"]
generated: "article"
---

Pulling clean audio out of a video file sounds like it should require dedicated software, a paid subscription, or at least a few confusing menus. It doesn't. It takes one command line, one free tool, and a couple of minutes.

## The command, piece by piece

The whole extraction runs through a single line: `ffmpeg -i github.mp4 -vn -acodec pcm_s16le -ar 44100 audio.wav`. FFmpeg is a free command-line tool you install once, and after that this becomes a repeatable step for any video you need audio from. `-i github.mp4` tells it which video file to read from. `-vn` strips out the video stream entirely, so you're left with audio only. `-acodec pcm_s16le` sets the audio codec to uncompressed PCM at 16-bit depth, which is what gives you a clean, full-quality WAV file rather than a compressed, lossy one. `-ar 44100` sets the sample rate to 44.1kHz, the same standard used for CD-quality audio. The output, `audio.wav`, is the resulting file. Hit return, and FFmpeg creates that WAV file from the video in seconds.

If any of those flags aren't self-explanatory, you don't have to memorize a reference manual. You can paste the whole command into an AI assistant and ask what each parameter does, which is a faster way to actually understand the command than hunting through documentation. You can also just use the command as-is once you know it works, without needing to re-derive it every time.

## Why WAV instead of MP3

This particular command is set up to produce a WAV file rather than an MP3, because WAV is uncompressed and preserves full audio quality, which matters for anything downstream like transcription, podcast editing, or further audio processing. If you wanted an MP3 instead, the codec and quality parameters in the command would need to change, but the core structure, read the video, strip the video stream, encode the audio, stays the same.

## Cleaning up the extracted audio in Audacity

Once you have the WAV file, the next step is cleanup, and that's where Audacity comes in. Audacity is a free tool, and despite costing nothing, it can do practically anything you'd need done with audio. Whether a paid tool like Pro Tools does more is beside the point when a free tool covers what most people actually need.

The first cleanup step is trimming. Go to Edit, then the trim or remove special option, and cut off dead space at the start, useful if, like most people recording without a script, you tend to pause a couple of seconds before actually starting to talk.

The next step addresses volume. If the waveform isn't using its full range, meaning the recording is quieter than it should be, select the whole track, go to Effect, then Volume and Compression, then Amplify. Rather than pushing the amplification all the way up, which can also amplify background noise, a more moderate boost is usually the better call if there's noticeable noise in the recording. Save the file under the same name to overwrite the original rough version rather than keeping both.

## Editing around pauses, if you need to

Once you're looking at the waveform in Audacity, you can also see exactly where the pauses in your speech are. If you wanted a tighter final cut, you could trim out those gaps directly from the waveform. That said, if the audio needs to stay in sync with something happening on screen in a matching video, tightening pauses that way isn't always the right move, since it can throw off the timing between what's said and what's shown.

## Key takeaways

- The full extraction runs on one FFmpeg command: `ffmpeg -i github.mp4 -vn -acodec pcm_s16le -ar 44100 audio.wav`.
- `-vn` removes video, `-acodec pcm_s16le` sets an uncompressed 16-bit codec, and `-ar 44100` sets a 44.1kHz CD-quality sample rate.
- Getting an MP3 instead of a WAV requires changing the codec and quality parameters, but the overall command structure stays the same.
- Audacity, a free audio editor, handles the cleanup: trimming dead space, and amplifying volume through Effect, then Volume and Compression, then Amplify.
- You can paste the command into an AI assistant to get a plain-language explanation of what each parameter does.

## Try it yourself

If you've got a video file and just need the audio out of it, cleanly, this is a two-tool workflow: FFmpeg to extract, Audacity to trim and clean up. This tutorial comes from Professor Bear's Tech Tutorials, part of Humanitarians AI's ongoing series of practical, no-fluff walkthroughs for content creators and developers.
