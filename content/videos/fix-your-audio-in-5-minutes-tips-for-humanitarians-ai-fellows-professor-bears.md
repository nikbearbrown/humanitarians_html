---
title: "Fix Your Audio in 5 Minutes: Tips for Humanitarians AI Fellows | Professor Bear's Quick Demo"
seoTitle: "Fix Video Audio Fast with FFmpeg and Audacity"
description: "Professor Bear shows how to fix bad video audio in five minutes using free tools FFmpeg and Audacity, then replace it in your editor before uploading."
summary: "A five-minute fix for poor microphone audio: extract it with FFmpeg, amplify it in Audacity, then swap it back into your video before you upload."
keywords: ["fix bad audio ffmpeg tutorial", "extract audio ffmpeg command", "audacity amplify quiet audio", "replace video audio camtasia", "fix video audio volunteers", "ffmpeg audacity workflow tutorial", "humanitarians ai fellows video tips", "free tools fix microphone audio"]
generated: "article"
---

Most volunteers making educational videos are not professional YouTubers, and their microphones show it. Professor Bear's quick demo tackles a problem that quietly undermines otherwise good content: audio so poor it makes an entire video hard to sit through, and it shows exactly how to fix it in about five minutes using two free tools.

## The problem: good footage, unusable sound

The demo starts with a real example, a video where the visuals look solid but the audio is bad enough to effectively ruin the piece. That gap between visual quality and audio quality is common among volunteers who never had access to professional microphones, and it is treated here as fixable rather than as a reason to scrap the footage or feel discouraged.

## Extracting audio with FFmpeg

The first step is pulling the audio track out of the video using FFmpeg, a free command-line tool. On a Mac, it installs through Homebrew. The commands themselves are simple: specify the encoding, in this case a wave file, and the name of the source file, then run it. The result is a standalone .wav file that can be worked on independently of the video.

## Amplifying with Audacity

That extracted wave file typically looks weak when opened in Audacity, another free tool, with a visibly flat waveform that reflects just how quiet and thin the original recording actually was. The fix is to double-click the track, go to Effect, then Volume and Compression, and apply amplification. In the demo, the amplification level defaults to 27.5, and the fix is to pull it back slightly to around 27 rather than pushing it all the way to the top. Stopping just short of the maximum is deliberate, since driving the gain too high risks introducing distortion that would undo the entire point of the fix. The difference is audible immediately: what was a barely usable track becomes clear and listenable, to the point where the specific words being said, in the demo's example clip, an introduction to a web scraping and automation tool, become easy to follow.

## Swapping the audio back into your edit

Once the audio sounds right, it gets saved under the same file name and brought into whatever video editor you use, Premiere Rush, Premiere Pro, After Effects, or Camtasia. The old, unusable audio track is removed from the video and replaced with the newly cleaned version. The demo overwrites the original low-quality file entirely rather than keeping it, since there is no real reason to preserve audio nobody can understand. The version with the improved audio is the one that gets uploaded to YouTube.

## Why this matters for volunteers specifically

The core argument is practical rather than technical: if viewers cannot understand what you are saying, the video is not doing its job, no matter how good it looks. Fixing audio after recording takes roughly five minutes and makes a substantial difference in whether people can actually follow the content. Professor Bear is explicit that he understands most volunteers do not have professional microphones, especially those who just graduated as students, and that this is a completely reasonable starting point. The expectation is not that everyone shows up with studio equipment; it is that everyone takes the extra five minutes after recording to make sure what they said can actually be heard.

This is framed explicitly as part of an onboarding series for Humanitarians AI Fellows, aimed at helping volunteers without professional equipment still produce videos people can watch and understand. The video is presented as the first of what is intended to be an ongoing set of small, practical tips and tricks for making better videos, and while it is aimed primarily at Fellows producing content for Humanitarians AI, the underlying FFmpeg-and-Audacity technique works for anyone recording with an imperfect microphone.

## Key takeaways

- Extract audio from your video using FFmpeg, a free tool installable via Homebrew on a Mac.
- Open the extracted wave file in Audacity and use Effect, then Volume and Compression, to amplify it.
- Amplify close to the top of the range without maxing it out, to avoid distortion.
- Import the cleaned audio into your video editor, remove the original poor-quality track, and overwrite the file before uploading.
- The whole process takes about five minutes and can make an otherwise unusable video watchable.

## Who this is for

This tutorial is aimed directly at Humanitarians AI Fellows recording videos without access to professional microphones, though the technique applies to anyone whose video content is being undercut by weak audio. It is part of a broader onboarding series covering practical video production tips for volunteers.
