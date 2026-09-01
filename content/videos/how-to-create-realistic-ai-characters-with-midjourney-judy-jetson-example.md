---
title: "How to Create Realistic AI Characters with Midjourney (Judy Jetson Example)"
seoTitle: "Create Realistic AI Characters with Midjourney"
description: "A seven-step Midjourney v7.0 workflow that turns a cartoon character into a photorealistic portrait using the describe function and reference weights."
summary: "Judy Jetson goes from cartoon to photorealistic portrait in Midjourney v7.0 through a seven-step process built around the describe function and two rounds of reference weighting."
keywords: ["midjourney cartoon to realistic photo", "midjourney describe function tutorial", "midjourney oref reference weight", "midjourney v7 photorealistic prompt", "how to make cartoons realistic ai", "judy jetson ai photorealistic", "midjourney character design prompt", "midjourney ow parameter explained", "ai art cartoon to human portrait"]
generated: "article"
---

Turning a flat cartoon character into a convincing photorealistic portrait sounds like it should require either a skilled illustrator or dozens of failed prompt attempts. This tutorial lays out a specific seven-step process in Midjourney v7.0 that gets there methodically, using Judy Jetson as the working example precisely because her iconic blonde ponytail and futuristic style make it easy to judge whether the final result still reads as her.

## Starting from the cartoon itself

The process begins by uploading the cartoon reference image directly into Midjourney, rather than trying to describe the character from memory. From there, Midjourney's describe function is run on the uploaded image, which generates a text description of what the AI sees in the artwork. That raw output is a starting point, not a finished prompt, it needs to be reshaped before it's useful.

## Turning a description into a directive

The raw description gets rewritten into a clear, directive prompt: "real-life Judy Jetson as a beautiful blonde woman in a white and pink dress with a ponytail hairstyle and bangs." The word "real-life" is doing specific work here, it's what signals to Midjourney to steer toward human realism rather than defaulting back to cartoon styling.

## Balancing the cartoon reference against realism

The next step reintroduces the original cartoon image, but carefully. Using the `--oref` parameter with the cartoon image and a low weight value, `--ow 55`, tells Midjourney to draw inspiration from the source art without being tightly bound to its cartoon style. That low weight is what keeps the character recognizable while still leaving room for a genuinely realistic interpretation rather than a stylized hybrid.

## Pushing toward photorealism with specific keywords

To move the image further into convincing realism, the prompt adds targeted descriptive terms: natural skin, visible pores, hyperrealist, in the style of National Geographic, along with an aspect ratio of 3:4 and the `--v 7.0` version flag. These aren't generic "realistic" tags, they're specific enough to guide Midjourney toward the kind of skin texture and photographic quality that separates a convincing portrait from an obviously synthetic one.

## Generating and comparing variations

With the full prompt assembled, combining the directive description, the low-weight cartoon reference, and the realism keywords, the next step is simply running it to generate several output variations. Not every result lands the same way; some variations skew more photorealistic, others retain more cartoon character. Reviewing multiple outputs before committing to one is treated as a normal, expected part of the process rather than a sign something went wrong.

## The refinement pass: raising the reference weight

Once a strong photorealistic result comes out of that batch, it becomes the new reference image for a second pass, and the reference weight changes dramatically. The same prompt structure is reused, but now with `--oref` pointing at the realistic image instead of the cartoon, and the weight raised all the way to `--ow 155`. That much higher value tells Midjourney to stay closely faithful to the new realistic reference this time, while still allowing for small refinements and additional variation, rather than treating it as loose inspiration the way the original cartoon reference was.

## Why the two-stage reference approach matters

The core technical insight running through the whole process is that reference weight should change depending on what you're referencing and why. A low weight against the cartoon original protects creative freedom to reinterpret the character realistically. A high weight against your own best realistic output protects consistency once you've already found a version worth keeping. Treating those as two different jobs, rather than picking one weight and using it throughout, is what makes the iterative refinement actually converge on a usable result.

## Key takeaways

- Start from an uploaded cartoon reference and Midjourney's describe function rather than writing a prompt from scratch.
- The word "real-life" in the prompt is what steers Midjourney toward human realism instead of cartoon styling.
- A low `--ow` value (around 55) on the original cartoon reference preserves recognizability without over-constraining the result.
- Specific realism keywords like natural skin, visible pores, and a named photographic style push the output toward genuine photorealism.
- Generating multiple variations and picking the strongest one before refining is a normal part of the workflow.
- A much higher `--ow` value (around 155) on your own best realistic output, used as a new reference, locks in consistency during the final refinement pass.

## Try it yourself

If you want to convert your own cartoon or illustrated character into a photorealistic portrait, this seven-step structure, describe, draft, low-weight reference, realism keywords, generate variations, then high-weight refine, is directly reusable on any source image. The tutorial's audio comes courtesy of Humanitarians AI, whose YouTube channel carries more walkthroughs like this one for anyone building out AI art and character design skills.
