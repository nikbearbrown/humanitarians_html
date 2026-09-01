---
title: "Minimax Hailuo 02.3 | LLM Dance Off: How Good Are AI Video Models at Dancing?"
seoTitle: "Minimax Hailuo 02.3: How Good Is It at AI Dance Video?"
description: "Professor Nik Bear Brown tests Hailuo AI's dance video generation with simple prompts to see whether the model was actually trained on dance movement."
summary: "Testing Hailuo AI with deliberately simple prompts reveals whether the model was trained on real dance footage, while also exposing serious face distortion in its fast mode."
keywords: ["hailuo ai dance video test", "minimax hailuo 02.3 review", "ai video model trained on dance", "hailuo fast vs standard model", "ai video generator face distortion", "hailuo preset saving feature", "ai dance video prompt test", "llm dance off video model comparison"]
generated: "article"
---

The fastest way to tell whether an AI video model actually understands dance is to strip the prompt down to almost nothing and see what comes out. If a bare-bones prompt produces convincing choreography, the model was trained on real dance footage. If it doesn't, no amount of clever prompting will fix that underlying gap. This hands-on test puts Hailuo AI (Minimax's Hailuo 02.3, referred to throughout as "Halo") through exactly that test.

## Setting up the comparison

The test starts with an uploaded image of a National Guardsman and a simple goal: get the model to dance. Hailuo's interface offers a choice between its own model and Google's model, along with a fast versus standard option; the fast option costs 15 tokens versus 25 for standard. The general pattern with fast models is that they're cheaper and quicker but lower quality, and since upscaling afterward with a tool like Topaz is standard practice anyway, starting with the fast, cheaper option and upscaling later is usually the better value than paying more for a model's built-in upscaling, which doesn't come close to what a dedicated tool like Topaz provides.

## Testing with deliberately simple prompts

Rather than writing an elaborate, paragraph-long prompt, the test deliberately keeps prompts minimal, just enough to specify a hip-hop dance and change the subject count from three girls to three men. The logic is direct: if a bare-bones prompt still produces high-quality dance movement, that's strong evidence the model was actually trained on dance footage rather than just following literal instructions without any real movement fluency underneath.

## What the results showed

The initial results were encouraging. The dance quality looked better than most models typically produce, suggesting Hailuo has been trained on at least some real dance data. A more specific request for a "crip walk" produced a dance that wasn't actually a crip walk, more of an Irish step-dance pattern, but the movement itself still looked clean and well-formed. The takeaway was that the model appears to have been trained on several kinds of dance without covering every style; it doesn't recognize a crip walk specifically, but its general dance training is solid enough that even an unmatched style still comes out looking like real, fluid movement rather than a garbled mess.

## The preset saving feature

One interface detail stood out as genuinely useful: an "add to presets" button that saves a prompt after generation so it can be reused later, named and stored for future runs. That matters specifically for dance work, where landing on a short choreography sequence you like is valuable enough to want to reuse without rewriting the prompt from scratch. It also changes how prompts get written in the first place: knowing a good prompt might get saved as a reusable preset pushes toward writing prompts in a more generic way (using "person one, person two, person three" rather than baking in specific details like "National Guardsman") so the saved preset can be dropped onto any reference image later.

## Cost and resolution tradeoffs

Pricing tiers for Hailuo run from roughly $7 to $30 a month, with $7 unlocking basic access and higher tiers required to reach longer clip lengths, including a jump to 10-second videos. Resolution has a real cost impact too: switching from 768p to 1080p more than tripled the token cost for the same generation. The video holds off on upgrading to the higher tier until testing the cheaper option more fully, treating that decision explicitly as one to make only after seeing enough results to judge whether the higher tiers are worth it.

## The face distortion problem

The clearest weakness surfaced late in the test: reviewing the fast-model output closely showed the middle guardsman's face badly warped and distorted, a problem visibly worse than in the standard model. This doesn't appear to be simply a byproduct of lower-resolution upscaling, it looks like the fast model renders faces differently and worse. The practical conclusion is that fast mode may be fine for simpler, more stylized content, like a line drawing or cartoon, but it's not reliable for anything involving a recognizable human or humanlike face.

## Key takeaways

- Testing with deliberately simple prompts is a fast way to check whether a video model was actually trained on real dance footage.
- Hailuo's dance output looked strong even with minimal prompts, suggesting real training data behind the movement.
- The model handled some dance styles well but didn't recognize a specific move like the crip walk, producing a different but still fluid dance instead.
- The "add to presets" feature lets a good prompt be saved and reused, which also encourages writing more generic, reusable prompts.
- Switching from 768p to 1080p resolution more than tripled the token cost of a generation.
- The fast model produced significant face distortion on human subjects, a tradeoff not worth it for anything beyond simple, stylized content.

## Who this is for

This hands-on evaluation from Humanitarians AI is aimed at educators, content creators, and anyone exploring AI video generation tools who wants a realistic sense of a model's strengths and weaknesses, dance training quality, cost tiers, and rendering tradeoffs, before spending real budget on generation credits.
