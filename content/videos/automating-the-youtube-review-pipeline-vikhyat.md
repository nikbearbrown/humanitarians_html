---
title: "Automating the YouTube Review Pipeline | Vikhyat"
seoTitle: "Automating a Fellow Video Review Pipeline"
description: "Vikhyat lays out a four-stage plan to catch low-resolution renders before upload and automate outro and channel checks for fellow videos."
summary: "Vikhyat proposes a four-stage automation plan that checks video resolution and outro handles locally before upload, replacing a wasteful upload-then-delete review loop."
keywords: ["how to automate youtube video review process", "check video resolution before uploading to youtube", "brutalist render stretches undersized video warning", "automate outro and channel handle checks", "why does youtube upload loop waste time", "google cloud project youtube api upload permissions", "local pixel check before youtube processing", "youtube api upload channel owner authorization"]
generated: "article"
---

Vikhyat asks how much of the fellow video review process can actually be automated, and splits the answer three ways: sorting can be almost fully automated, uploading needs two remaining human steps, and judging quality stays entirely human.

## The current wasteful loop

Right now every video a fellow submits gets uploaded to YouTube before anyone knows whether it is usable. The reviewer waits for YouTube to process it, checks whether a 4K option appeared, and deletes the ones that did not qualify. Vikhyat's point is that YouTube is not making a quality judgment here, it is just counting pixels, and the video's dimensions are already readable from the file itself in about a second. Uploading to find that out wastes the processing time on videos that were never going to pass.

## The Brutalist render trap

A pixel count alone is not quite enough. The Brutalist toolkit stretches any undersized piece of footage to fill the frame, and on the video path it does this without warning anyone. That means a file can measure a full 4K, satisfy YouTube's resolution check, and still look soft because one underlying piece was rendered small and stretched to fit. Vikhyat suspects the render default changed at some point, since the code still carries a note about it, and a fellow working from an older copy of the toolkit would produce soft cuts with no warning.

## Stage one and two: local checks before anything uploads

Stage one is a script that watches the Drive folder, checks each new file's actual dimensions against the target for its format, and sorts passes from fails, with a note explaining what to fix. Nothing gets deleted at this stage. Vikhyat notes this is not even a new idea, since Brutalist's own documentation already describes the check; nobody had written the code yet. Stage two adds a second check on the same pass: confirming a Humanitarians AI video closes with the correct Humanitarians AI outro and channel handle, since shipping the wrong channel's handle is a real failure that has already happened once and is checkable just by reading the settings file and comparing it to the outro.

## Stage three and four: building checks into the tools

Stage three moves the check inside the rendering tool itself, so the tool refuses to finish a video that would fail the checks and tells the fellow to update before recording, stopping the problem before it starts rather than catching it after the fact. Stage four uploads whatever passes as a private video and gives the professors a list to approve from.

## The security limits that remain

Two things in stage four are outside Vikhyat's control. First, a video uploaded through an unapproved Google Cloud project gets locked private permanently, so the team needs to confirm they already have an approved project before relying on this stage. Second, only the channel owner can authorize the API access personally; managers cannot do it on the owner's behalf, and Vikhyat is explicit that he would show how to do this but would never hold the key himself.

## Key takeaways

- Video resolution is readable directly from a file's dimensions, so a YouTube upload is not needed just to check if a render is 4K.
- A file can pass a 4K pixel check and still look soft if an undersized piece was stretched to fill the frame.
- Local checks for resolution and correct channel outro can be automated with a script that sorts pass from fail without deleting anything.
- Moving checks into the rendering tool itself stops bad renders from being created in the first place, not just from being uploaded.
- YouTube API uploads require an approved Google Cloud project and personal authorization from the channel owner, which cannot be delegated to a manager.

## Who this is for

This is for teams running a recurring video review and upload pipeline who want to cut wasted processing time by moving quality checks earlier, before anything gets uploaded.
