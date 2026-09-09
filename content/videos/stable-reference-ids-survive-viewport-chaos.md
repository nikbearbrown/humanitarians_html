---
title: "Stable Reference IDs Survive Viewport Chaos."
seoTitle: "Stable Element Refs for Browser Automation"
description: "A concrete example shows why pixel-coordinate clicks break on resize and how stamping elements with stable reference ids fixes browser automation."
summary: "Liam explains why browser automation that clicks by pixel coordinate breaks when a window resizes, and shows how stamping each element with a stable reference id fixes it."
keywords: ["why does browser automation break on resize", "stable element reference ids automation", "pixel coordinate clicks fail after resize", "how to fix computer use viewport resize", "data-ref attribute browser automation", "claude computer use clicking elements", "browser automation clicking wrong element", "confirm order button resize example"]
generated: "article"
---

Browser automation that clicks by pixel coordinate ties a command to one spot in one viewport. Resize the window and the page reflows, the button moves, the coordinate does not, and the click lands somewhere else every time. This video walks through why that happens and the fix that runs before Claude ever looks at the page.

## The problem with pixel coordinates

A pixel coordinate describes a spot on the screen, not the button sitting there. As long as the window stays the exact same size, clicking that spot works. The moment the viewport changes, the page reflows and everything on it shifts position, but the recorded coordinate stays frozen at its old value. The click still fires at that same spot, except the button is no longer there.

## A concrete before-and-after

The video anchors this with one example. A "Confirm Order" button sits at pixel position 960, 540 on a 1920 by 1080 window. Resize that window down to 1440 by 900, and the same button is now at 720, 405. A script still aimed at 960, 540 lands on empty page, because nothing about the button changed except where the browser chose to draw it.

## Stamping stable reference ids

The fix runs before Claude ever looks at the page. A script walks every clickable element and stamps it with a stable reference id, baked into the page itself as an attribute such as `data-ref="confirm_order_1"`. Claude then targets elements by that name instead of by pixel position. The reference id is attached to the element itself, not to a screen coordinate, so a resize that moves the button's pixel position leaves the ref completely unchanged.

## Why the ref survives what the coordinate cannot

After the resize in the example, the Confirm Order button's pixel position moved to 720, 405, but its ref stayed exactly `confirm_order_1`. Claude clicks that ref and lands on the button every time, regardless of where the layout puts it. A pixel coordinate describes a moment in one viewport; a stable ref describes the button itself. That difference is the entire reason one survives a resize and the other does not.

## What this approach does not cover

The fix only reaches elements the stamping script already saw. Anything added to the page after that pass, such as a modal that opens later or content loaded dynamically, has no ref yet and needs its own re-injection pass to get one. The video is also explicit about scope: it does not get into the JavaScript injection mechanics or CSS specificity rules that affect how refs get attached, and it does not make a claim that ref-based targeting is the single right way to build browser automation. That is left as a design judgment for whoever is building the system.

## Key takeaways

- Pixel-coordinate clicks tie a command to a screen position in one specific viewport, and that position breaks the moment the window resizes and the page reflows.
- A stable reference id, stamped onto each clickable element before Claude looks at the page, is attached to the element itself rather than to a screen position.
- In the example, a button's pixel position moved from 960, 540 to 720, 405 after a resize, while its reference id stayed unchanged and the click still landed.
- Reference ids only cover elements present when the stamping script ran; anything added to the page afterward needs its own pass to get a ref.
- The video does not cover the injection mechanics or CSS specificity details, and does not claim ref-based targeting is the only valid approach to browser automation.

## Who this is for

This is for anyone building or debugging browser automation or computer-use workflows with Claude who has run into clicks landing on the wrong element after a window resize.
