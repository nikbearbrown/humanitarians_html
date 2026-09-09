---
title: "Website Restructure Week 4: Clean Navigation & Design-Dev Handoff | Muskan"
seoTitle: "Website Restructure Week 4: Nav Cleanup & Handoff"
description: "Muskan Agrawal covers removing dead footer links with the developer and a four-part design-to-dev collaboration framework."
summary: "Muskan Agrawal reports on week four of the Humanitarians AI website restructure, covering a navigation cleanup done directly with the developer and a four-part framework for design-to-dev handoff."
keywords: ["how to audit website navigation links", "removing dead links from website footer", "design to developer handoff framework", "figma dev mode vs written handoff spec", "how to build a figma component library", "specifying ui interaction states hover focus", "website navigation bare proper nouns problem", "responsive breakpoint agreement design dev"]
generated: "article"
---

Muskan Agrawal reports on week four of the Humanitarians AI website restructure: a navigation cleanup completed directly with the developer, and a working agreement for how design and development hand work to each other going forward.

## An honest status update

The stakeholder meeting prepared in week three still hasn't happened, so the clarity it's meant to produce on audience priority, messaging, and success metrics remains pending. Rather than lose a week waiting, the team moved to the part of the work that wasn't blocked by that meeting. Removing links to things that don't exist doesn't depend on knowing the audience, so the week 2 link audit stopped being a static report and became a working document, reviewed link by link with the developer.

## Cleaning up dead-end navigation

Working through every navigation and footer link, the team asked one question of each: is there a defined project behind this link? The projects column is where the answer was most often no. Of eleven links in that column, five pointed at names a first-time visitor can't decode and that have no built-out concept behind them, the same five bare proper nouns flagged in the week 1 audit and counted again in week three. This week, three videos after they were first flagged, those links were actually scoped for removal with the developer present. The projects column goes from eleven links to six, footer links overall go from thirty-three to twenty-eight, and only one of the six bare proper nouns counted in week three remains. Agrawal is careful to note the distinction between decided and deployed: this is decided and specified, not yet live, since the old links are still on the site as measured today. The decision is made; shipping it is the developer's next task.

## A four-part design-to-dev framework

With navigation scoped to real content, the rest of the week went into something less visible but more useful: agreeing how design and development would actually work together before any visuals started. Most handoff friction isn't a disagreement about design, it's a disagreement about what a finished handoff looks like, discovered halfway through the work. So the question went to the developer first: would she rather inspect components, spacing, and style values directly in Figma dev mode, or receive a written handoff with specs, component states, and requirements documented before implementation begins. Her answer set the format, and out of that conversation came a four-part framework: a shared Figma component library mirroring the site's actual coded components, dev mode access with clean structured layer naming, a short written spec for interaction states, hover, focus, active, and the mobile collapse state, and agreed breakpoint definitions so navigation behaves predictably across mobile, tablet, and desktop.

## Why the component library and interaction states matter

The component library is the part that compounds: if the file mirrors what's actually coded, every later screen starts from real components instead of a redrawing of them, and the gap between design and build stops widening over time. Interaction states are described as the classic gap, since a design file typically shows one state while a browser has to show four; whatever isn't specified gets invented at build time and argued about at review instead. The week closed with a working session on technical feasibility and a phase-by-phase rollout roadmap, so implementation now has an order rather than a wish list.

## Key takeaways

- A stakeholder-meeting delay didn't stall the week; the team moved to navigation cleanup, which doesn't depend on audience clarity.
- Five bare proper noun links, flagged across three prior weeks, were finally scoped for removal directly with the developer.
- The decision to remove links is made and specified, but not yet deployed, the old links remain live as of this update.
- A four-part design-to-dev framework, shared component library, dev mode access, interaction-state spec, and agreed breakpoints, was set from asking the developer her preferred handoff format.
- Interaction states, hover, focus, active, and mobile collapse, are the classic gap between a design file and a working browser if left unspecified.

## Who this is for

This is for design and development teams working out handoff friction, and for anyone following the Humanitarians AI website restructure who wants to see how a navigation cleanup and a collaboration framework get decided before any visual redesign begins.
