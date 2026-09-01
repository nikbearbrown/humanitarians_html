---
title: "Aengus | Building a Personalized AI Tool for Music Video | Text-to-Video Prompt Engineering"
seoTitle: "Aengus: Personalized AI Tool for Music Video Prompts"
description: "Professor Nik Bear Brown builds a custom GPT trained on his own prompts, lyrics, and art to generate personalized text-to-video prompts for a music video."
summary: "Professor Nik Bear Brown builds a custom GPT trained on his own handwritten prompts and art, then tests the text-to-video prompts it generates for a Lyrical Literacy music video across multiple AI video platforms."
keywords: ["custom gpt text to video prompts", "personalized ai music video tool", "lyrical literacy music video ai", "text to video prompt engineering", "custom gpt training own writing samples", "seedance higgs field video generation", "nik bear brown ai music video", "ai video generation model comparison", "personalization ai prompt engineering", "how to train custom gpt style"]
generated: "article"
---

Most people who use AI tools for creative work take whatever the tool suggests and rewrite it into their own voice. This project asks a more interesting question: what happens if you build a tool that already writes in your voice, because it was trained on nothing but your own work? Professor Nik Bear Brown walks through building exactly that kind of custom GPT, and uses it, unedited, to generate a full music video.

## Testing the tool with no manual rewriting

Normally, even when using a tool that suggests prompts, the habit is to try a prompt, evaluate it, and hand-rewrite it a few times before settling on a final version. For this particular experiment, that step was deliberately skipped. The prompt came straight out of the custom tool with no editing, and that unedited prompt was what generated the finished music video shown at the start, a holiday-themed piece built around the lyrics "over the river and through the wood to grandmother's house we go." Showing the result first, before explaining how the tool was built, was a deliberate choice to let the output speak for the process.

## Why personalization changes what a custom GPT can do

The tool itself is built as a custom GPT plugin, and its structure reveals the actual mechanism behind why it works. Building a tool like this starts with uploading a large amount of your own material, in this case, a file full of actual handwritten prompts written over time. That step matters more than it sounds. Without genuine writing samples, a custom GPT tends to produce generic output, the same way a tool asked to write professional emails "in your style" without any real examples of your writing will default to a bland, average style rather than anything distinctive. Uploading real samples, songs actually written, prompts actually used, general reference material on relevant topics like dance, is what lets the model align its output with a specific creative voice rather than a generic one.

The same principle extends to visual style. AI-assisted art in this workflow starts from an actual hand-drawn piece, which then gets refined through prompting until it settles into a consistent visual style, tracked using what are described as P-codes to help maintain that consistency across generated images. The underlying theme across both text and image generation is personalization: the value is not in using a generic tool like ChatGPT on its own, but in combining a specific creative style with the tool's capabilities to produce something neither could produce alone.

## From lyrics to video prompts

The practical workflow for this specific tool is to paste in song lyrics, paste in reference images, and have the tool suggest text-to-video prompts that connect the images and lyrics while matching an established creative style. The song used in this test was written for an artist and is part of the Lyrical Literacy project, an initiative from Humanitarians AI focused on getting people singing as a way to exercise the brain, based on the idea that biological systems generally follow a use-it-or-lose-it pattern, so activities that only exercise logic, like puzzles, leave other brain functions underdeveloped, while music engages far more of the brain at once. The tool also includes a small script that batches uploaded images into groups of ten, since many AI video and image tools cap how many reference images they can accept in a single batch.

## Comparing across AI video platforms

Once prompts were generated, the same prompt and image set were tested across multiple AI video generation platforms, including Seedance and Higgs Field, with plans to extend testing to other available tools as well. This comparison surfaced real inconsistencies: the same prompt produced noticeably different results depending on the platform, and in at least one case, a platform introduced an unrelated figure into the generated video that had no basis in the prompt, prompting further investigation into whether that behavior was tied to the specific prompt wording or to that particular platform. Testing the same prompts and images across many models is treated as a separate, ongoing project in its own right, aimed at understanding which platforms handle which kinds of creative direction well.

## Why building your own tool matters more than using this one

The broader point made throughout this walkthrough is that the specific tool being demonstrated is less important than the underlying approach. A tool built from someone else's writing, art, and prompt history will always produce output closer to their creative voice than to yours. The recommendation is to build a personalized version using your own material rather than relying on someone else's tool, since general-purpose AI systems do not have access to hundreds of your own prompts, samples, or stylistic choices unless you deliberately provide them.

## Key takeaways

- A custom GPT trained on real handwritten prompts and creative samples produces output much closer to a specific creative voice than a generic AI tool.
- The demonstrated music video used an AI-generated prompt with zero manual rewriting, straight out of the custom tool.
- Personalization applies to both text prompts and visual art, with P-codes used to help maintain visual consistency across generated images.
- The same prompt and images were tested across multiple AI video platforms, including Seedance and Higgs Field, revealing inconsistent results between them.
- The underlying song is part of the Lyrical Literacy project, which uses singing as a whole-brain exercise rather than just entertainment.

## Try it yourself

Anyone doing regular creative work with AI tools can apply the same approach: build a custom GPT or similar tool using your own writing samples, prompts, and reference material rather than relying on a generic one. This project supports the Lyrical Literacy initiative from Humanitarians AI, which uses music and singing to engage learners who struggle with more traditional teaching methods.
