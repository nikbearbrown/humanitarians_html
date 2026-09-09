---
title: "Claude, Nav Tieout."
seoTitle: "What Claude's nav-tieout skill actually checks"
description: "Explains how Claude's nav-tieout skill recomputes an LP capital account from NAV components and flags mismatches, without auditing the NAV itself."
summary: "The nav-tieout skill has Claude recompute an LP's capital account from a fund's NAV components and flag any line that disagrees with the LP statement, without ever verifying whether the underlying NAV figures are correct."
keywords: ["does claude verify a funds nav is correct", "nav tieout skill explained", "how to reconcile an lp statement to nav pack", "recompute lp capital account from nav components", "flagged mismatch between nav pack and lp statement", "claude skill checker versus auditor fund accounting", "why a clean tie out doesnt prove the nav is right", "lp statement reconciliation with claude ai"]
generated: "article"
---

Claude picks up a skill called nav-tieout. Does that mean it is now verifying that a fund's net asset value is correct? No. The skill assumes the NAV pack is right and checks something narrower: whether an LP statement agrees with it. Understanding that boundary matters before relying on the output.

## What the skill does not touch

It sounds like nav-tieout might be independently confirming the fund's NAV is accurate, auditing the number itself. It never does that. Run it on a period with a known LP-statement error, and the fund's NAV components are exactly what they were before the run. Only a flagged mismatch shows up on the LP side. The NAV pack itself is never questioned or recalculated from first principles.

## The anchor case: a four thousand dollar gap

Say the NAV pack puts an LP's capital account at $404,000, but the LP statement the fund actually sent shows $400,000. Nav-tieout recomputes the capital account directly from the NAV components and flags the $4,000 gap. It works one LP statement at a time, comparing what should have been sent against what was.

## A fixed three-step process

The skill follows a fixed order: recompute the capital account straight from the NAV components, compare that recomputed figure to what the LP was actually sent, then flag any differences. The steps do not branch unless the SKILL.md instructions themselves specify a branch. That structure is what makes this a checker rather than an auditor of the fund.

## The payoff and the limit

The payoff is consistency: the same mismatch gets caught the same way, every time, before a statement goes out to an LP. The limit is just as firm: nav-tieout never questions whether the NAV pack itself is right. It only checks whether the LP statement agrees with whatever the NAV pack says.

## Why neither result is proof on its own

A flagged mismatch does not prove the LP statement is wrong. The NAV pack could be the one containing the error, and the LP statement could be correct. Equally, an LP statement that ties out cleanly does not prove the fund's NAV was calculated correctly. A clean tie-out only means the two documents agree with each other; it says nothing about whether the number both documents agree on is actually right. Fixing a flagged discrepancy, and figuring out which document is wrong, is still a human decision.

## Running it on your own numbers

Before relying on nav-tieout, it helps to ask Claude to read the skill and walk through exactly what it will do before it does it. That makes visible which NAV components it recomputes from before a single line gets flagged, so you can judge whether that recomputation actually matches how your fund's accounting works.

## Key takeaways

- Nav-tieout checks whether an LP statement agrees with the fund's NAV pack; it does not verify the NAV pack itself.
- The process is fixed: recompute the capital account from NAV components, compare to the LP statement, flag disagreements.
- A flagged mismatch does not prove the LP statement is wrong; the NAV pack could contain the error instead.
- A clean tie-out does not prove the NAV was calculated correctly; it only shows the two documents agree with each other.
- Ask Claude to walk through which NAV components it will recompute from before trusting a flagged result.

## Who this is for

Fund accounting and investor relations teams who use Claude to reconcile LP capital account statements against a NAV pack, and want a precise understanding of what a clean or flagged result actually proves.
