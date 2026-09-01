---
title: "Midjourney Style and SREF Codes | Professor Bear AI Art Series"
seoTitle: "Midjourney SREF Codes and Style Explained"
description: "Professor Bear explains Midjourney Style Reference (SREF) codes and Personalization profiles, how to combine them, and how to control their strength."
summary: "Every image in this series is generated with Midjourney using Style Reference and Personalization codes, and this episode breaks down what each one does and how to combine them."
keywords: ["midjourney sref codes explained", "midjourney sref random command", "midjourney style reference vs personalization", "midjourney sw stylize weight setting", "midjourney personalization profile code", "midjourney combining sref and profile", "midjourney consistent ai video style", "midjourney style codes for beginners"]
generated: "article"
---

Getting a consistent look out of Midjourney used to mean a lot of trial and error, retyping prompts and hoping the vibe landed close to what came before. Style Reference codes and Personalization profiles change that, and after a year spent generating thousands of these codes, testing, tweaking, and discarding most of them, Professor Bear walks through exactly what they are and how to use them.

## What Style Reference (SREF) actually does

Think of SREF as borrowing the vibe of an image without copying it directly. You are telling Midjourney "I like these colors, this lighting, these textures" and applying that energy to a new image. The advantage over uploading a reference image every time is that once you have a code, you just paste it into future prompts. No re-uploading, no re-selecting a source image.

## Finding new styles with sref random

Typing `--sref random` has Midjourney pull a surprise style from its own library. Once it finishes generating, you get a code you can save and reuse indefinitely. Running `--sref random` repeatedly is a genuine way to discover new styles you would not have thought to search for on your own, closer to hunting for something unexpected than searching for something specific.

## Controlling strength with --sw

The `--sw` parameter, set anywhere from 0 to 1000, controls how strongly a style reference influences the final image. Higher numbers push the style to dominate the result, while lower numbers add just a hint of it without overwhelming the rest of the prompt.

## Personalization profiles

Personalization works differently from SREF. Instead of borrowing from an existing image, you teach Midjourney your own taste by ranking image pairs and building moodboards. You can maintain separate profiles for different aesthetics, such as fantasy, hyperreal photography, or Art Deco, each with its own code. Adding a profile's code to a prompt with `--p` tells Midjourney exactly what look you are going for, and like style reference, the strength of that influence can be controlled through the stylize setting.

## Combining SREF and Personalization

The most powerful results come from mixing a Style Reference code with a Personalization profile in the same prompt. That combination pulls from an established, tested style while also layering in your own trained taste, effectively blending two distinct influences into one image. This combined method is what has been refined across the thousands of codes built up over the past year, and it produces a noticeably more consistent look, which also carries over well into AI video projects that need visual continuity across multiple generated frames.

## Key takeaways

- SREF codes let you borrow the color, lighting, and texture of a reference image without re-uploading it in every prompt.
- `--sref random` generates a surprise style code from Midjourney's library, which you can save and reuse.
- The `--sw` parameter, from 0 to 1000, controls how dominant a style reference is in the final image.
- Personalization profiles are trained by ranking image pairs and building moodboards, and are applied to prompts with `--p`.
- Combining a Style Reference code with a Personalization profile in one prompt produces the most consistent, refined results.
- Consistent styling from these codes also helps maintain visual continuity across AI video projects.

## Who this is for

This is for Midjourney users who want to move past one-off prompting and build a repeatable visual identity for their projects, whether for still images or AI video. It is part of Professor Bear's ongoing AI Art series from Humanitarians AI, with new codes shared regularly on the channel.
