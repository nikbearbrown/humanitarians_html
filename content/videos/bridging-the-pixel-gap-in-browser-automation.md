---
title: "Bridging the Pixel Gap in Browser Automation."
seoTitle: "Bridging the Pixel Gap in Browser Automation"
description: "Claude's screenshots get resized before analysis, so click coordinates need scaling back to your real screen resolution. Here's the exact math."
summary: "Claude's vision encoder resizes every screenshot to 1456x819 before reporting click coordinates, so those coordinates need to be scaled back to your real screen before you click."
keywords: ["claude computer use click coordinates", "browser automation coordinate scaling", "claude vision encoder screenshot resize", "1456x819 screenshot resize claude", "computer use pixel scaling fix", "claude click coordinates wrong screen", "16:9 viewport coordinate ratio", "claude browser automation misclick"]
generated: "article"
---

Anyone building browser automation with Claude's computer use has probably hit this without realizing it: Claude reports a click coordinate, you send it to your actual screen, and the click lands nowhere near the button you wanted. The instinct is to assume something's broken. It isn't. Claude's coordinates were never in your screen's real pixels to begin with.

## The wrong guess

When Claude's browser tool takes a screenshot, it doesn't analyze your screen at its native resolution. Claude's vision encoder resizes every 16:9 image to exactly 1456 by 819 pixels before it looks at anything. The natural assumption is that the (x, y) coordinates Claude reports back afterward are already in your screen's real pixel space. They aren't. Click at that raw coordinate on your actual viewport and you'll miss the target entirely.

## A concrete case: the anchor point

Take a specific example: Claude's screenshot comes back at 1456 by 819, and it reports a click at (728, 409), which is dead center of that resized image. If your real viewport is 2560 by 1440 and you click at that same raw pixel value on your actual screen, you land near the top-left corner, nowhere close to where the button actually is. The mismatch is entirely a function of the resize that happened before Claude ever "saw" the screenshot.

## The fix: the inverse resize ratio

The fix is the inverse of the resize ratio. Multiply Claude's reported x by your viewport width divided by 1456, and multiply its reported y by your viewport height divided by 819. Then clamp both results to the screen's edges so a rounding error never sends a click off-screen entirely. That's the whole trick, and it's short enough to implement in about 20 lines of code.

Running the numbers on the anchor case shows why it works: 2560 divided by 1456 is about 1.76, and 1440 divided by 819 works out to the same ratio, because both the screenshot and the real viewport share a 16:9 aspect ratio. Multiplying 728 and 409 by that ratio lands the click at (1280, 720), dead center of the real screen and exactly on target.

## Where this breaks down

The single-ratio trick only works because the viewport in this example is 16:9, matching the screenshot's aspect ratio. A different aspect ratio needs its own lookup table rather than one multiplication, since the resize behavior for a non-16:9 viewport doesn't reduce to the same simple ratio. That's a deliberately separate problem this walkthrough doesn't attempt to solve.

## The takeaway in one line

Claude's coordinates live in a resized copy of your screen, not your screen itself. Multiply by the ratio back to real pixels before you click, or the click lands nowhere near the button you meant to hit.

## Key takeaways

- Claude's vision encoder resizes any 16:9 screenshot to exactly 1456x819 before analyzing it, so reported click coordinates are relative to that resized image, not your real screen.
- The fix is a simple inverse ratio: multiply Claude's x by (your viewport width / 1456) and its y by (your viewport height / 819), then clamp to the screen's edges.
- This ratio-based fix only holds for 16:9 viewports; a different aspect ratio requires a different lookup approach entirely.
- This is specifically about coordinate scaling for computer use and browser automation, not about DOM navigation, CSS-selector clicking, or a judgment on which approach is "right."

## Try it yourself

If you're building your own browser automation or computer-use setup, try this: your model clicks at (700, 410) on a 1456x819 screenshot, but your real screen is 1920x1080. Write out the scaling calculation and confirm exactly where that click should land. The code for this walkthrough is available in the Humanitarians AI YouTube GitHub repository under the Claude Basics playlist.
