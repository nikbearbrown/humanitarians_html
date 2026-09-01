---
title: "Fix Terrible Audio in Videos: Professor Bear's Guide to Using FFmpeg and 11labs"
seoTitle: "Fix Terrible Audio in Videos with FFmpeg and 11Labs"
description: "Professor Bear shows how to extract bad audio with FFmpeg, clean it in Audacity, and rebuild it in 11Labs when a volunteer's recording has no usable mic."
summary: "A volunteer's unusable audio gets extracted with FFmpeg, cleaned in Audacity, then completely rebuilt with an 11Labs voice, turning an unwatchable recording into a usable video."
keywords: ["fix bad audio in video with ffmpeg", "ffmpeg extract audio from video mac", "11labs voice changer for bad audio", "audacity remove click from recording", "fix volunteer recording no mic", "11labs voice cloning tutorial", "replace video audio with ai voice", "audacity amplify audio tutorial", "how to rescue unusable video audio"]
generated: "article"
---

A lot of good videos never get published because of one fixable problem: the audio is unusable. Volunteers at Humanitarians AI are graduates with real engineering credentials, but most of them aren't professional YouTubers or voiceover talent, and most don't own professional microphones. Professor Bear's fix isn't to reshoot anything. It's to strip the bad audio out entirely and rebuild it with an AI voice, using two free tools and one paid one.

## The core idea

Rather than trying to salvage a recording made on a laptop mic in a noisy room, the process removes the original audio from the video entirely and remaps it onto a cleaner voice using 11Labs. If the speaker has a good-quality voice clone of their own, that's the ideal choice. Without one, the fallback is picking a similar voice, matching language, accent, and gender as closely as possible, so the final result still sounds like a plausible match for the person on screen. In the example worked through here, the original speaker didn't have a voice clone available, so the fix was selecting another voice with a similar accent and gender rather than trying to force an exact match.

## Step one: pull the audio out with FFmpeg

The first tool is FFmpeg, a free command-line utility. On a Mac, it installs through Homebrew; on Windows, the recommended path is simply asking ChatGPT how to install it, since the process differs by system. Once installed, a single command line pulls the audio track out of the video file and saves it as an intermediate MP3, a working file that isn't the final product, just the raw material for the next step.

## Step two: clean it up in Audacity

That raw audio gets opened in Audacity, a free tool praised here as genuinely serious software, on par with paid options that cost far more. The waveform itself tells you a lot before you even listen: a badly recorded track shows a visibly poor, cramped vocal range. Zooming into the waveform can also reveal specific defects, like a click or blip from a mic bump, that are easy to isolate, select, and silence, leaving a natural pause in place of an audible pop rather than cutting the audio outright.

From there, the fix for a weak vocal range is Audacity's amplify effect, reached through Effect, Volume and Compression. The tool will show the maximum boost available, sometimes close to a sevenfold increase, but pushing all the way to that ceiling causes distortion, since it drives the loudest peaks into clipping. Backing off slightly from the maximum gives a genuinely improved range without introducing new artifacts. The cleaned track is then exported as a higher-quality WAV file, replacing the rough intermediate MP3.

## Step three: split the audio if it's too long

11Labs' voice changer tool has a practical limit of roughly five minutes of spoken audio per upload. If the cleaned track is close to that ceiling, it needs to be split into two pieces at a natural point where nobody is speaking, cut cleanly so the two halves line up exactly with no gap or overlap once they're rejoined later.

## Step four: pick a voice and regenerate

Inside 11Labs, voices can be filtered by language, accent, gender, and other traits, English, an Indian accent, and a female voice in this case, since matching those attributes for the original speaker mattered more than any other factor. With a close voice selected, each audio chunk gets uploaded to the voice changer and regenerated in the new voice. The difference is dramatic: a original line so garbled it was barely intelligible in spots becomes clean and fully understandable, and importantly, all the natural imperfections of real human speech remain, since a real person is still speaking, just without the background noise and weak mic that made the original nearly unusable.

## Step five: rebuild the video

Once both regenerated chunks are downloaded, using clear names rather than 11Labs' default unreadable filenames, they get brought into a video editor like Premiere Pro or Adobe Rush. The original audio track is separated from the video and removed entirely, and the new AI-generated audio is placed in its exact position, since the timing is a one-to-one match with the original recording. From there, the video exports normally, ready to be titled, described, and published.

## Key takeaways

- The fix isn't repairing bad audio in place, it's extracting it, cleaning it, and rebuilding it as a new track in a matched AI voice.
- FFmpeg extracts audio from video for free on both Mac and Windows, using a single terminal command.
- Audacity can silence clicks and blips and boost a weak vocal range, but pushing amplification to its maximum introduces distortion.
- 11Labs' voice changer has roughly a five-minute limit per upload, so longer recordings need to be split into matched chunks first.
- Choosing a voice with a similar language, accent, and gender to the original speaker keeps the final video feeling like a natural match, even without an exact voice clone.

## Who this is for

This workflow is built specifically for Humanitarians AI fellows who have access to 11Labs but not to professional recording equipment, giving them a practical way to publish videos that would otherwise be unusable because of audio quality alone. It's a direct, repeatable process anyone in a similar position can follow end to end, from a rough recording to a finished, watchable video.
