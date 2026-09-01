---
title: "Two Resolutions, One Click — The macOS Coordinate Roundtrip."
seoTitle: "macOS Coordinate Roundtrip for Claude Computer Use"
description: "How Claude's screenshot resizing on macOS shifts click coordinates, and the exact formula to invert the transform so clicks land correctly."
summary: "A worked example shows how Claude's vision budget resizes macOS screenshots, shifting coordinates, and how to invert the transform so a click lands on the real pixel."
keywords: ["claude computer use coordinate scaling", "macos screenshot resize click drift", "target_image_size binary search", "claude vision budget 1568 pixels", "retina screenshot coordinate mismatch", "invert claude click coordinates", "computer use api image resize algorithm", "claude click lands wrong spot macos", "coordinate roundtrip computer use", "claude screenshot pixel scaling formula"]
generated: "article"
---

When Claude looks at a screenshot during macOS computer use, it's tempting to assume the coordinates it reports back land exactly where you'd expect on your screen. They don't. The API caps every image at a 1568-pixel long edge and 1568 tiles of 28-by-28 patches, well under what a native Retina display captures, and if a screenshot isn't resized before it's sent, the server resizes it anyway, in a space that was never actually observed. The result is click drift: a click meant for one button lands somewhere else.

## One button, two numbers

The concrete case makes the mismatch obvious. On a native 1920-by-1080 screen, a button sits at (960, 540). Before Claude ever sees the screenshot, the reference implementation's `target_image_size()` resizes it to 1456 by 819. On that resized image, the same button now sits at (728, 409), a different number for the exact same pixel on screen.

## Doing the resize yourself

`target_image_size()` runs a binary search for the largest width and height that keep the long edge under 1568 pixels and the tile count under 1568, while preserving the original aspect ratio. Calling it before sending the screenshot, and recording what it returns, is what makes the next step possible: those sent dimensions, 1456 by 819 in this case, become the denominator of every inverse calculation that follows.

## Inverting the transform

The formula is straightforward: real coordinate equals model coordinate times original dimension divided by sent dimension. Working through the example, 728 times 1920 over 1456 comes out to 960, and 409 times 1080 over 819 comes out to 540. The click lands exactly on the button, but only because the sent dimensions came from an actual resize call rather than a guess.

## When there's nothing to invert

If a screenshot is already inside the vision budget and passes through unresized, `target_image_size()` simply hands the input back unchanged, and there's no scaling left to invert.

## Key takeaways

- Claude's vision budget caps images at a 1568px long edge and 1568 tiles of 28x28 patches, below what a native Retina screenshot captures.
- Skipping the resize doesn't avoid the problem: the server resizes the image anyway, in a space you never recorded, causing click drift.
- The reference implementation's `target_image_size()` runs a binary search for the largest dimensions under budget that preserve aspect ratio.
- The inverse transform is: real coordinate = model coordinate x original dimension / sent dimension.
- In the worked example, a button at (960, 540) on a 1920x1080 screen, resized to 1456x819 and reported at (728, 409), inverts back to exactly (960, 540).
- When a screenshot already fits inside budget, `target_image_size()` returns it unchanged, so there's nothing to invert.

## Try it yourself

The video's own prompt is a good place to start: your screenshot gets resized to 1456 by 819 before Claude sees it, so write the inverse transform so the click hits the native display, then run it against your own macOS computer-use setup. The reference code for this exact example is linked from the video description, from the Humanitarians AI GitHub repository, for anyone who wants to port `target_image_size()` directly into their own project.
