---
title: "Why Claude's Click Lands in the Wrong Spot — and the One Ratio That Fixes It"
seoTitle: "Claude Computer Use: Fix Click Coordinate Scaling"
description: "Claude's clicks miss their target when a downscaled screenshot's coordinates get sent straight to the OS. One scaling ratio, applied per axis, fixes it."
summary: "A computer-use app sends Claude a downscaled screenshot, so Claude's returned coordinates describe that smaller image, not your real screen. This walks through the one ratio that maps them back correctly."
keywords: ["claude computer use coordinate scaling", "claude click wrong spot fix", "scale screenshot coordinates for os click", "claude computer use retina display", "device pixel ratio claude computer use", "vision api screenshot resolution scaling", "claude computer use click formula", "downscaled screenshot coordinate mapping"]
generated: "article"
---

People assume Claude's click landing in the wrong spot means Claude guessed wrong. It isn't a guessing problem. It's a scaling problem, and once you see the mechanism, it's a two-line fix rather than a mystery.

## The setup: two different sizes for the same screen

A computer-use app doesn't send Claude your full-resolution screen. It sends a downscaled screenshot, because that's the resolution the vision API accepts, for example a 1456 by 819 image representing a 1920 by 1080 screen. Claude looks at that smaller image, picks a point on it, and returns coordinates like 700, 410. Those coordinates are correct for the image Claude actually saw. The mistake happens one step later.

## Why sending coordinates raw misses the target

If those coordinates get passed straight to the OS input driver without adjustment, the click lands in the wrong place. The API only ever showed Claude the 1,456 by 819 view, so the coordinates Claude returns belong to that smaller image's coordinate space, not to your real screen's pixel grid. Sent raw, a click aimed at a button in the smaller image can miss the equivalent spot on the actual display entirely.

## The one ratio that fixes it

The fix is a single scaling operation: multiply Claude's coordinates by the ratio of original size over sent size, calculated separately for each axis. That ratio is the inverse of whatever resize happened when the screenshot was downscaled, and applying it maps the smaller image's pixels back onto the real screen. Using the example numbers, a coordinate of 700, 410 becomes 700 multiplied by 1920/1456, and 410 multiplied by 1080/819, which works out to roughly 960, 540, dead center on a button in the middle of the screen.

## The formula generalizes across resolutions

The same math holds regardless of what resolution the screenshot was downscaled to or what the target screen's actual resolution is. Sent at the same 1,456 by 819 view, a 2,560 by 1,440 screen still gets a correctly placed click using the identical approach: multiply by original over sent, per axis. That's what makes it a general fix rather than a one-off patch for a single resolution pair.

## What happens if you skip it on Retina displays

The stakes get higher on a Retina display with a device pixel ratio of two, where the OS itself is already working with a scaled coordinate system layered on top of the physical pixel grid. Skipping the scaling step there compounds the error, since you'd be feeding coordinates meant for one image size into a system that's already translating between two others. Getting the ratio right per axis, and accounting for device pixel ratio where it applies, is what keeps clicks landing where they're supposed to.

## Key takeaways

- Claude's returned click coordinates describe the downscaled screenshot it was shown, not your screen's actual resolution.
- Sending those coordinates to the OS input driver unscaled causes clicks to land in the wrong spot.
- The fix is one ratio per axis: original size divided by sent size, multiplied into Claude's returned coordinates.
- This ratio is the inverse of the resize applied when the screenshot was downscaled for the vision API.
- The same formula holds at any resolution pair, and needs extra care on Retina displays with a device pixel ratio of two.

## Try it yourself

If you're building on Claude's computer-use capability, run this prompt against your own setup: describe your app's screenshot resolution and your screen's actual resolution, ask for the two-line scaling formula before coordinates hit your OS input driver, and ask what breaks if you skip it on a Retina display with a device pixel ratio of two. This kind of practical, mechanism-first walkthrough is part of Humanitarians AI's Claude Basics series.
