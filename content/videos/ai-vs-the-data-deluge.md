---
title: "AI Vs The Data Deluge"
seoTitle: "How AI Found Kepler-90i: Data Deluge in Astronomy"
description: "A neural network found an eighth planet human astronomers had missed, not because the data was hidden, but because there was too much to check by hand."
summary: "AI helps astronomers sort real signals from noise in datasets far too large for any human team to review, from Kepler's light curves to the Vera Rubin Observatory."
keywords: ["kepler-90i discovery neural network", "ai finds exoplanet humans missed", "kepler light curve neural network", "vera rubin observatory data volume", "transiting planet detection ai", "christopher shallue andrew vanderburg", "ai astronomy data deluge", "kepler mission light curves ai"]
generated: "article"
---

In 2017, a computer found a planet that every human who had looked at the same data had missed. Not because the signal was hidden or obscured, but because there was simply too much data for any person to check by hand. That single discovery captures the real reason AI matters in astronomy today: it isn't smarter than human judgment, it's built to handle scale that human judgment was never designed for.

## The problem: data deluge in astronomy

The Kepler space telescope stared at up to 200,000 stars continuously for four years, recording brightness readings every 30 minutes. That adds up to millions of individual light curves, each one a record of how a star's brightness changed over time. A transiting planet, one that passes in front of its star from Kepler's point of view, leaves a distinctive signature in that data: a tiny, periodic dip in brightness. Automated pipelines flagged thousands of candidate dips, but sorting the real transits from noise, instrument artifacts, and false positives took more time than any team of astronomers had available. The question wasn't whether the signal existed somewhere in the data. It was how to find the one signal worth a human's attention among thousands nobody had time to check.

## Training the neural network

In 2017, Google engineer Christopher Shallue and astronomer Andrew Vanderburg took a different approach. They trained a neural network on 15,000 light curves that humans had already labeled by hand as either real transits or false positives. Rather than examining a single view of each curve, the network compared two: the full orbital light curve and a close-up of just the brightness dip itself. The wide view exposes impostor signals, like a case where what looks like a transit is actually two separate stars eclipsing each other rather than a planet passing in front of one star. The close-up view checks the shape of the dip itself. Only after weighing both views together did the network decide whether a candidate was a real planet or another false alarm.

## Discovering Kepler-90i: a human-missed planet

That two-view approach flagged a candidate around the star Kepler-90 with only a one in 10,000 chance of being a false alarm. The candidate, now known as Kepler-90i, made Kepler-90 the first known star system found to have eight planets outside our own solar system. Across the full dataset, the network correctly distinguished real planets from false alarms 96% of the time, a result that human review of the same volume of data simply could not have matched in a comparable amount of time.

## Future-proofing: Vera Rubin Observatory and the coming data volume

Kepler's dataset, massive as it was for its time, is small compared to what's coming next. The Vera Rubin Observatory alone is expected to produce about 10 terabytes of images every night, generating up to 7 million alerts nightly across a planned 10-year survey, for a total approaching 60 petabytes of data. No human team could review that volume of information, which makes the same neural-network approach that found Kepler-90i not just useful but necessary for the next generation of astronomical surveys.

## Key takeaways

- The universe was never short on signals, only on the hours available to check for them by hand.
- A 2017 neural network trained on 15,000 labeled light curves found Kepler-90i, a planet every prior human review had missed.
- Comparing a wide orbital view with a close-up of the brightness dip let the network rule out impostor signals like eclipsing binary stars.
- The network correctly told real planets from false alarms 96% of the time.
- The Vera Rubin Observatory's expected 60 petabytes of data over a 10-year survey makes AI-assisted filtering essential, not optional.
- AI doesn't replace the astronomer at the telescope; it decides what's worth their limited time.

## Who this is for

This video is part of the Humanitarians AI Fellows series, which walks through real applications of AI and machine learning across different fields. It's a good starting point for anyone curious about how neural networks get applied to genuine scientific data problems, not just synthetic benchmarks.
