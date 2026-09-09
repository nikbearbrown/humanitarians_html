---
title: "claude liam brutalist skill deep explainer"
seoTitle: "Deep Explainer skill: how it differs from AI Explainer"
description: "Breaks down what makes the deep-explainer video skill its own thing rather than a longer version of AI Explainer, including its two hard gates."
summary: "Walks through the deep-explainer skill's own SKILL.md to show its inherited bookends, its multi-act structure for linked mechanisms, and the two gates that set it apart from AI Explainer."
keywords: ["what is the deep explainer skill in claude", "difference between deep explainer and ai explainer", "how does claude skill.md inheritance work", "deep explainer gate d1 previz explained", "deep explainer shopping list gate d2 explained", "vox beat still earns its beat rule", "when to use deep explainer vs ai explainer", "reading a claude skill.md to explain itself"]
generated: "article"
---

There's a skill in the video-making toolkit called deep-explainer that most people skip past, assuming it's just a longer version of the AI-explainer skill. It isn't. Asking Claude to read the whole SKILL.md and explain what makes it its own thing surfaces a structure with two hard gates that the parent skill doesn't have.

## What it inherits versus what it owns

Every skill in this toolkit is a folder Claude reads before working, and deep-explainer is a SKILL.md file plus three reference files covering continuity, a shopping list, and vox beats. The doctrine is small on purpose: deep-explainer extends AI-explainer, which itself extends explainer. Nothing further down the chain repeals what the parent skills establish, so the fixed bookends, the show-don't-tell law, and the illustrate law all carry through automatically. The spine is fixed: a cold open, a hesitant-writer overview, then acts one through n making up the documentary body, then a verdict recap, a Your Turn prompt, and a title outro. The middle section, the acts themselves, is what deep-explainer actually owns and defines.

## Restraint as the first rule

The first rule is about restraint, not length. A five-to-ten-minute runtime is a natural landing zone for a concept that genuinely needs multiple linked mechanisms, never a target to pad toward. Deep-explainer isn't "make it longer." It's "this idea needs several linked mechanisms, each with its own evidence." That framing matters because it changes when the skill is the right tool: reaching for it because a topic needs five minutes of runtime is the wrong reason; reaching for it because a topic has several distinct mechanisms that each need separate evidence is the right one.

## What changed about supporting stills

An older version of the skill required a fixed quota, twenty to twenty-five percent of body beats had to be pantry stills (documentary-style vox beats). That quota is gone. The current rule is stricter and more specific: a still earns its place in a beat only when the still is the evidence itself, not atmosphere or decoration. Under this rule, zero vox beats can be the correct outcome for a given episode, if no still actually serves as evidence anywhere in it.

## Continuity is scoped hard

Documentary-style continuity between beats is expensive to produce, so deep-explainer scopes it tightly. Continuity chains apply only inside a vox run, meaning two or three consecutive vox beats authored as one continuous camera move. A run never crosses an act boundary, and the maximum length is three beats. Everywhere else in the episode, cuts are hard cuts with no continuity requirement.

## The two gates

Gate D1 requires that the first compile of any deep-explainer episode is always a full-length, watchable previz. Vox beats render as slates showing the beat ID and narration line, while Manim and Remotion beats render for real, with real audio throughout. This is honest by design at this length: since the pantry of source stills is typically the bottleneck, the previz is what a human actually reviews for pacing before more work goes in. Gate D2 requires that the shopping list for needed stills is written after audio is locked, never before. A card written before a beat's real length is known can only ask for "a clip of X." Written after lock, it can ask for a specific duration, at least a set number of seconds of that clip, so trimming down from a longer clip becomes the default and stretching a short clip out (which degrades quality) never has to happen.

## What a finished folder contains

A completed deep-explainer episode's folder holds the beat sheet as its core artifact, plus a build prompt, a build log, a fact-check record, a sources list, the shopping list, and the working slots: pantry stills, media, Manim clips, and narration MP3s. Every episode builds into the book it belongs to, never into the toolkit itself.

## Key takeaways

- Deep-explainer inherits AI-explainer's fixed bookends and laws; it only owns the structure of the middle acts.
- The five-to-ten-minute length follows from needing several linked mechanisms with separate evidence, not from a target runtime.
- A supporting still only earns its beat when it is the actual evidence, not decoration; zero vox beats can be correct.
- Continuity chaining is scoped to runs of two or three consecutive vox beats within a single act, never across act boundaries.
- Gate D1 requires a full watchable previz first; Gate D2 requires the shopping list to be written only after audio is locked.

## Who this is for

Anyone producing explainer videos with this toolkit who needs to decide between deep-explainer and AI-explainer for a given topic, and viewers curious how a Claude Skill can be read aloud, verbatim, to explain its own mechanism.
