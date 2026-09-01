---
title: "Calculating Confidence Intervals for Google Ad Grants Keywords | CTR Statistical Analysis Nonprofits"
seoTitle: "CTR Confidence Intervals for Google Ad Grants"
description: "Professor Nik Bear Brown shows how to use Hoeffding and Wilson confidence intervals to decide if a low-CTR Google Ad Grants keyword is truly failing or just unlucky."
summary: "Professor Nik Bear Brown explains how nonprofits can use Hoeffding and Wilson confidence intervals to tell whether a low-CTR keyword is genuinely underperforming or just short on data."
keywords: ["google ad grants 5% ctr requirement", "hoeffding bound confidence interval ctr", "wilson score interval click through rate", "nonprofit google ads keyword removal", "ctr confidence calculator nonprofits", "google ad grants keyword optimization", "statistical significance low ctr keyword", "givealytics ctr tool"]
generated: "article"
---

Google Ad Grants comes with a hard rule: every keyword in a nonprofit's account needs to maintain a 5% click-through rate, or risk the account being flagged. The problem is that a keyword shown 100 times and clicked 3 times has a 3% observed CTR, but that doesn't necessarily mean its true underlying rate is below 5%. With that small a sample, you could just be unlucky. Professor Nik Bear Brown walks through the statistics that actually answer the question of whether to remove a keyword or give it more time.

## The core problem with small samples

An observed click-through rate is just an estimate, and estimates built on small numbers of impressions carry real uncertainty. A keyword that got 3 clicks out of 100 impressions has an observed rate of 3%, but the true rate, the rate you'd see if you ran that keyword for an enormous number of impressions, could plausibly be higher or lower. Removing a keyword based purely on a low observed rate from a small sample risks cutting something that would have performed fine given more data. The fix is to calculate a confidence interval around the observed rate rather than trusting the raw number by itself.

## Two statistical methods, two different postures

The video introduces two approaches for calculating an upper confidence bound on the true CTR: the Hoeffding bound and the Wilson score interval. Hoeffding is described as assumption-light, meaning it makes fewer statistical assumptions about the underlying distribution, which makes it safer and wider, particularly useful for tiny sample sizes or extreme click-through rates. Wilson uses a normal approximation instead, and becomes tighter, meaning more precise, once the sample size reaches roughly 30 or more impressions. In practice, Wilson tends to be the more conservative of the two once there's enough data, producing a lower, tighter upper bound than Hoeffding does.

## Walking through a real example

Using an interactive calculator built for this purpose, the video runs through concrete numbers: 33 clicks out of 789 impressions. Google's target CTR of 5% doesn't change; what changes is how confident you can be about whether a given keyword's true rate is above or below that target. With an alpha (confidence level) of 5%, meaning a 95% confidence bound, the Hoeffding calculation says it's still reasonably possible, with 95% confidence, that the true click-through rate could be as high as 8.54%. The Wilson calculation, more conservative, gives an upper bound around 5.52%. Since both upper bounds sit at or above the 5% target, the recommendation in both cases is to keep the keyword rather than remove it, because there's still a statistically reasonable chance its true rate clears the bar.

## When the numbers say to cut a keyword

The video also demonstrates what a genuinely weak keyword looks like under the same math: a case poor enough that even the optimistic upper bound sits clearly below the 5% target, indicating a true click-through rate around 1%. In that scenario, both Hoeffding and Wilson agree the keyword should be removed, since even the most favorable statistically plausible estimate doesn't reach the required threshold. That's the actual decision rule being taught here: if the upper bound of your confidence interval is still below your target CTR, it's statistically reasonable to remove the keyword; if the upper bound clears the target, give it more time.

## Sample size and how fast you can decide

How many impressions you need before you can confidently make a call depends heavily on how far the keyword's actual performance is from the 5% target. A keyword getting essentially no clicks can be flagged for removal after as few as 50 tries. A keyword hovering around 1% CTR takes longer, roughly 80 samples, to build reasonable evidence that it's genuinely underperforming. The closer a keyword's true rate sits to the 5% threshold itself, say a keyword actually performing at 4.8%, the more data is required to distinguish it statistically from the target, and the video notes that a keyword performing at 4.8% is unlikely to draw serious concern from Google in practice anyway, even though technically it doesn't meet the letter of the 5% rule.

## A third metric worth knowing, and avoiding here

The calculator also includes a UCB, or upper confidence bound, score, which the video flags explicitly as not a confidence interval at all. UCB is a bandit-algorithm score, combining an estimate with an exploration bonus, and it's useful for choosing what to explore next when you have multiple options competing for attention, such as picking which channel to test. It is not the right tool for the keep-or-remove decision covered here, and is included mainly for theoretical completeness.

## Key takeaways

- Google Ad Grants requires a 5% click-through rate across all keywords, but small sample sizes make raw observed CTR unreliable on its own.
- The Hoeffding bound is assumption-light and wider, better suited to small samples or extreme CTR values; the Wilson score interval is tighter once sample size passes roughly 30.
- The decision rule: if the upper confidence bound on a keyword's true CTR is still below your 5% target, it's statistically reasonable to remove it; otherwise, keep it.
- Very poorly performing keywords can be confidently flagged after as few as 50 impressions, while keywords near the 5% threshold require substantially more data to evaluate confidently.
- UCB score is a bandit exploration score, not a confidence interval, and shouldn't be used for the keep-or-remove decision.

## Try it yourself

Professor Brown built an interactive CTR confidence calculator, available on his site, where nonprofits can plug in their own click and impression numbers and see both the Hoeffding and Wilson bounds calculated automatically. A tool called Givealytics is also being developed to automate this analysis across a nonprofit's full keyword list, letting organizations download all their keywords and get keep-or-remove guidance without doing the math by hand.
