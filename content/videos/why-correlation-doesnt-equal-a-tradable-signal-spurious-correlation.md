---
title: "Why Correlation Doesn't Equal a Tradable Signal (Spurious Correlation)"
seoTitle: "Why Correlation Isn't a Tradable Trading Signal"
description: "Aishwarya Patil explains spurious correlation in market data, using the Nicolas Cage and pool drownings example to show why causation matters."
summary: "A strong statistical correlation in market data does not mean you've found a tradable signal. Aishwarya Patil explains why, using a famous spurious correlation example."
keywords: ["spurious correlation trading signal", "correlation vs causation market data", "tyler vigen spurious correlations project", "nicolas cage pool drownings correlation", "testing too many variables backtest", "financial signal finding causal mechanism", "mycroft financial ai correlation", "auditing data signals with claude"]
generated: "article"
---

Two variables in a set of market data moved together for eight straight years with a correlation of 0.91. A model flagged it as a signal. Nobody asked why. That's the trap Aishwarya Patil, from the Mycroft team at Humanitarians AI, walks through in this video: a correlation that looks statistically airtight but tells you nothing about whether it will hold up in the future, because nobody checked whether it means anything at all.

## What a 0.91 correlation actually tells you

Correlation measures whether two variables move together. That's all it measures. It says nothing about whether one variable causes the other, and it says nothing about whether both are being driven by some third factor entirely outside the data you're looking at. A number like 0.91 feels convincing precisely because it's high, but a high correlation coefficient is compatible with a real causal relationship, a coincidence, and everything in between. The number itself can't tell you which one you're looking at.

## Where correlation fails: testing too many variables

The deeper problem shows up at scale. Given enough variables and enough time, you will always find some pair that correlates strongly by pure chance. This is a known, measurable effect called spurious correlation, and it gets worse the more variables you test against each other. Run enough pairwise comparisons across a large dataset and some of them are going to line up just by luck, with no underlying connection at all. The fix is that causation requires an actual mechanism, a specific reason why moving one variable would move the other, plus a way to rule out a shared underlying driver behind both. Correlation alone can never supply either of those two things. It can only tell you that two things happened to move together in the data you already have.

## The Nicolas Cage and pool drownings example

To show how far this can go, Aishwarya points to Tyler Vigen's widely covered Spurious Correlations project, which compiled roughly a decade of real data, from about 1999 to 2009, and found a strong, statistically significant correlation between the number of people who drowned in swimming pools each year and the number of films Nicolas Cage appeared in that year. The correlation itself is genuinely real, calculated from real numbers. The causal story connecting the two is absurd, because there isn't one. That gap between a real statistical relationship and a real causal one is exactly the trap.

## Why this matters for financial signal finding

Financial signal finding faces the same risk, just at a larger scale. Testing many variable pairs against historical price data will surface some strong-looking correlations by chance alone, and those chance correlations are indistinguishable on the numbers from a genuine signal. A model doesn't know the difference between a real driver and a coincidence; it only sees the correlation coefficient. That's why a high correlation showing up in a backtest is the start of the investigation, not the end of it.

## Key takeaways

- Correlation measures whether two variables move together, not whether one causes the other or whether both are driven by something else.
- Testing enough variable pairs against enough historical data will always surface some strong correlations by pure chance, a known effect called spurious correlation.
- A real causal claim needs a plausible mechanism plus a way to rule out a shared underlying driver; correlation alone supplies neither.
- The Nicolas Cage and swimming pool drownings correlation from Tyler Vigen's Spurious Correlations project is a real, statistically significant, and entirely meaningless relationship.
- In backtesting, a strong correlation found by testing many variable pairs against price data can look identical, on the numbers, to a genuine signal.

## Try it yourself

Before trusting any correlation you find or are shown, ask Claude whether there's a plausible causal mechanism connecting the two variables, or whether a shared third factor could explain both. Then list what evidence would actually distinguish a real signal from a coincidental one. This kind of grounded, evidence-first approach to market data is a running theme across the Mycroft Financial AI work coming out of Humanitarians AI.
