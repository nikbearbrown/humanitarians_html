---
title: "NASA's ExoMiner: How Explainable AI Validated 301 New Planets"
seoTitle: "NASA's ExoMiner: Explainable AI Validated 301 Planets"
description: "Learn how NASA's ExoMiner classifier uses branch-based diagnostic tests to explain why a signal is a real planet, validating 301 new exoplanets at once."
summary: "NASA's ExoMiner classifier runs the same diagnostic checks a human vetter would, explaining its verdicts instead of just guessing yes or no, and validated 301 new exoplanets in one pass."
keywords: ["nasa exominer explainable ai", "how exominer classifies exoplanets", "kepler unconfirmed planet signals", "eclipsing binary transit signal ai", "centroid check exoplanet detection", "odd even transit binary star", "exominer plus tess candidates", "explainable ai space exploration"]
generated: "article"
---

By 2021, thousands of signals flagged by NASA's Kepler mission as possible planets were still sitting unconfirmed, not because anyone had missed them, but because turning a "maybe" into a "yes" requires real proof. This video explains how NASA built an AI classifier that doesn't just guess yes or no on a planetary signal, it shows exactly which test convinced it.

## The three impostors behind every "maybe"

A dip in a star's brightness doesn't automatically mean a planet crossed in front of it. There are three common impostors. An eclipsing binary is a pair of stars orbiting each other; when one passes in front of the other, it produces a dip that can look identical to a planet transit. Stellar variability is a star dimming on its own, often from star spots or flares, with no planet or companion involved at all. The third impostor isn't even a real astronomical signal, it's an instrumental artifact caused by the camera itself. Telling these three apart by hand took specialist time that nobody had enough of to clear the backlog.

## ExoMiner: a classifier that thinks like a human vetter

In 2021, NASA's Ames Research Center built ExoMiner to close that gap. Instead of just scanning the light curve and spitting out a probability, ExoMiner runs the same diagnostic tests a human vetter would perform, with each test built as its own separate branch of the network, checked independently before anything gets decided.

## The diagnostic branches

One branch runs a centroid check, asking whether the light causing the dip is really coming from the target star or sneaking in from a neighboring star instead. A second branch compares odd-numbered and even-numbered transits against each other; a genuine planet repeats its transit identically every time, but an eclipsing binary often produces a subtly different pattern between odd and even passes. A third branch hunts for a second, shallower dip in the data, the kind of signature a hidden stellar companion would leave behind. Only after every branch reports back does the network merge them into a single, explainable verdict.

## The results

The performance gain was substantial. ExoMiner reached 99% precision while recovering 93.6% of real planets, compared to the previous best classifier, which caught only 76.3% in a single pass through Kepler's unconfirmed backlog. Run against that backlog, it validated 301 new exoplanets at once. By 2026, the same diagnostic-branch design had been extended into ExoMiner Plus for NASA's TESS mission, screening its ongoing candidate stream and flagging 7,330 likely planets among more than 147,000 unconfirmed TESS signals.

## Why explainability is the real breakthrough

The headline number is 301 new planets, but the more important shift is what the system can say about each one. ExoMiner doesn't just output a yes or no anymore, it shows exactly which diagnostic test, the centroid check, the odd-even comparison, the search for a hidden companion, convinced it that a given signal is real. That explainability is what lets a system operate at this scale without simply replacing human judgment with an unaccountable black box.

## Key takeaways

- Kepler's backlog of "maybe" planetary signals sat unconfirmed because ruling out impostors takes real specialist verification, not just more data.
- The three common impostors behind a false planet signal are eclipsing binaries, stellar variability, and camera-caused instrumental artifacts.
- ExoMiner runs each diagnostic test as a separate branch of the network, then merges the branch results into one explainable verdict.
- Its branches include a centroid check, an odd-versus-even transit comparison, and a search for hidden stellar companions.
- ExoMiner reached 99% precision and recovered 93.6% of real planets, well above the previous best classifier's 76.3%, and validated 301 new exoplanets in one pass.
- The design was later extended as ExoMiner Plus to screen TESS's candidate stream, flagging 7,330 likely planets among over 147,000 unconfirmed signals.

## Who this is for

This video is a Humanitarians AI Fellows piece for anyone interested in how explainable AI design, building a verdict out of separately checkable diagnostic branches, can outperform a black-box classifier while staying accountable for its reasoning, whether the application is astronomy or any other high-stakes classification problem.
