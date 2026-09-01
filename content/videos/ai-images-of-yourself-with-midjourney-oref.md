---
title: "AI images of yourself with Midjourney OREF"
seoTitle: "How to Use Midjourney OREF for Photos of Yourself"
description: "Learn how Midjourney's Omni Reference tool and Omni Weight parameter let you place your own face and details into AI-generated scenes with precision."
summary: "Professor Nik Bear Brown walks through Midjourney's Omni Reference feature, showing how the oref and ow parameters let you insert your own face, outfit, or objects into AI art with fine control over fidelity."
keywords: ["midjourney oref tutorial", "midjourney omni reference feature", "put your face in ai art", "midjourney omni weight explained", "ai family photo reimagined", "midjourney oref ow parameter", "studio sessions with bear midjourney", "ai historical portrait yourself"]
generated: "article"
---

Turning an old family photo into a mythic portrait, or reimagining yourself in a historical setting, used to require either serious Photoshop skill or accepting that the AI-generated version would look nothing like you. Midjourney's Omni Reference feature closes that gap, and this Studio Sessions with Bear episode walks through exactly how to use it.

Omni Reference, written as `--oref` in a prompt, lets you embed a specific person, object, vehicle, or creature from a reference image directly into a new AI-generated scene. Instead of describing a face in words and hoping the model gets close, you point it at an actual photo and it carries real, specific details, facial features, outfits, or object characteristics, into the final image. The mechanism is simple to invoke: add `--oref` followed by the URL of your reference image to any prompt.

## Controlling how strongly the reference is followed

The real control comes from the Omni Weight parameter, written as `--ow`, which ranges from 1 to 1,000, with 100 set as the default. Professor Nik Bear Brown frames this as a dial for reference fidelity rather than an on-off switch. Lower values, around 25, only lightly suggest the reference, which works well for style transfers, such as taking a photo and reimagining it as an anime character while keeping just the basic shape and feel. The default of 100 offers a balanced influence, and the 100 to 300 range provides moderate guidance without letting the reference overpower the rest of the prompt. When precision actually matters, pushing the value to 400 or higher preserves specific details like facial features, clothing patterns, or object characteristics with much greater accuracy. For projects that need maximum fidelity, the value can go all the way to 1,000, though at that extreme the results can sometimes turn out unexpected.

## A practical rule of thumb

One clear guideline from the session: keep Omni Weight below 400 unless you are deliberately working with heavily stylized images, in which case the weight should be increased accordingly to match that stylization. This matters because pairing a strongly stylized prompt with a low-weight reference can produce a mismatched, muddled result, while pairing it with a higher weight helps the stylization and the reference details cohere.

## The cost of precision

Using Omni Reference is not free in terms of processing. The session notes that it consumes roughly twice the GPU time of a standard image generation. That tradeoff is presented as worth it for creators who need consistent, high-fidelity results, since getting a recognizable likeness or an exact object reproduction reliably is otherwise difficult to achieve through text description alone.

## Who benefits from this feature

The session frames Omni Reference as valuable for a wide range of use cases: mythic or historical portraits that place a real face into an entirely different era or setting, stylized storybook scenes, and maintaining character likeness consistently across different styles, timelines, or creative worlds. That consistency is especially useful for educators, storytellers, and game developers who need the same character or subject to appear recognizably across many different generated images.

## Key takeaways

- Midjourney's `--oref` parameter embeds specific elements, faces, outfits, objects, from a reference image into a new AI generation.
- The `--ow` parameter controls how strongly that reference is followed, ranging from 1 to 1,000 with a default of 100.
- Lower Omni Weight values suit light style transfers; higher values preserve exact details like facial features or clothing patterns.
- Keep Omni Weight below 400 unless working with heavily stylized images, which need a higher weight to stay coherent.
- Omni Reference uses about twice the GPU time of a standard image, a worthwhile tradeoff for consistent, high-fidelity results.

## Try it yourself

If you want to put your own face, an old family photo, or a specific object into an AI-generated scene, start with the default Omni Weight of 100 and adjust from there based on how closely you want the result to match your reference. This session is part of the Studio Sessions with Bear series from Humanitarians AI, where Professor Nik Bear Brown demonstrates practical AI creative workflows for educators, storytellers, and creators.
