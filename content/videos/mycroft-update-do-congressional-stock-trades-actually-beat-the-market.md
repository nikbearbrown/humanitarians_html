---
title: "Mycroft Update: Do Congressional Stock Trades Actually Beat the Market?"
seoTitle: "Do Congressional Stock Trades Beat the Market?"
description: "Liam analyzes 13,877 congressional stock trades against SPY to test whether Congress beats the market, and finds the real edge hides in trade clustering."
summary: "Congress doesn't beat the market on average, but clustered trades where multiple members buy the same stock show a real, if small, edge. Liam breaks down the data."
keywords: ["congressional stock trades beat market", "stock act disclosure data analysis", "congressional trading alpha spy benchmark", "cluster trading signal congress", "ameya deshmukh congressional trades", "market adjusted alpha calculation python", "look ahead bias backtest congress", "congress trading win rate gap"]
generated: "article"
---

Whole apps exist that let retail investors copy congressional stock trades, trade for trade, on the assumption that Congress has an edge. Liam, filling in for Ameya Deshmukh, decided to actually test that claim against the data rather than take it on faith, scraping 13,877 congressional trades and asking a narrow, testable question: if you followed every disclosed congressional buy mechanically, would you beat the index?

## Where the data comes from

Since 2012, the STOCK Act has forced every member of Congress to disclose their stock trades within 45 days of making them. A law meant to deter insider trading ended up producing something else entirely: a large, public dataset documenting what powerful people actually do with their own money. Liam scraped that disclosure data, pulling 13,877 trades from 108 members of Congress across three years of filings, and set out to test the popular claim that Congress reliably beats the market.

## The methodology: benchmarking against SPY

The test is deliberately narrow and strict. For every single trade, the method measures the stock's return over the 30 days following the disclosure date, since that's the first day a retail investor could actually act on the information. It then subtracts SPY's return over that identical window. That subtraction is the entire methodology: a stock that simply rose alongside the broader market shows zero alpha, because rising with the index isn't skill. One function fetches SPY's price at disclosure and again 30 days later, matching the exact window each individual trade gets, and one line does the actual judging: abnormal return equals the stock's post-disclosure move minus SPY's move over the same period. No annualizing, no portfolio smoothing, every trade benchmarked against the market it actually traded in.

## The aggregate result: essentially no edge

Run across 5,162 buys, the raw return looked promising at first glance: plus 2.23%. But once SPY's return over those same windows, plus 2.10%, gets subtracted out, the picture changes completely. Alpha comes out to plus 0.13%, essentially nothing. Sells came in at essentially zero as well. In aggregate, Congress does not beat the market. Congress is the market, with a rounding error sitting on top.

## Where the real signal hides: clustering

A flat aggregate result can still hide real structure underneath it, and that's exactly what the next stage of the analysis found. Instead of scoring trades in isolation, the revised approach looks for convergence: flagging every buy where two or more independent members bought the same ticker within a 30-day window. Each cluster gets scored using only entry-time information, cluster size multiplied by the group's maximum buy conviction ratio, and every trade is tiered before its return is even known, which rules out look-ahead bias. The tier is locked in on the day someone reading the filings could actually have acted on it.

Running that cluster analysis splits the results meaningfully. Clustered buys in the top two tiers, "strong" and "watch," covering roughly 2,000 events, earned positive alpha of plus 0.23% and plus 0.54% respectively, winning just over half the time. Solo buys, roughly 3,000 of them, went negative on average and won only about 45% of the time. That five-point gap in win rate across 5,000 events is described as the most robust result in the entire study. Framed in dollar terms, $10,000 spread across the strong tier finished at $10,247, $23 ahead of the same money simply parked in SPY. Real, but tiny.

## The honest verdict

The edge, such as it is, lives specifically in cluster membership, independent members converging on the same ticker, rather than in any individual member's conviction. Notably, the "watch" tier actually outperformed the "strong" tier, meaning the conviction-weighting inside the score adds no real ranking power once a cluster exists. One important caution from the process: on an earlier pass using only 64 members, the effect actually looked inverted, and it only stabilized once the dataset grew to the full 108 members, a reminder of how unstable small-sample results can be. The overall framing is blunt: this signal functions as a noise filter, not a profit engine. Its real value is in identifying the roughly 95% of congressional trades that should simply be ignored.

## Key takeaways

- Analyzing 13,877 congressional trades from 108 members shows Congress does not meaningfully beat the market in aggregate; alpha came out to just plus 0.13%.
- Every trade was benchmarked against SPY's return over the identical 30-day post-disclosure window, with no annualizing or smoothing, to avoid inflating the result.
- The real edge appeared in clustered trades, where two or more independent members bought the same ticker within 30 days, not in individual conviction.
- Clustered buys in the top tiers showed a five-point win rate advantage over solo buys across roughly 5,000 events, the study's most robust finding.
- The effect looked inverted at 64 members and only stabilized at 108, underscoring how much small-sample size can distort a result.
- The overall signal is a noise filter that flags the roughly 95% of trades worth ignoring, not a standalone profit engine, and this is framed as research, not investment advice.

## Try it yourself

The prompt Liam hands off: pull the last 90 days of congressional buy disclosures, find every ticker with two or more distinct buyers inside a 30-day window, and compare each cluster's 30-day return to SPY. It tests the one claim that actually mattered in this build, that convergence among independent members, not congressional genius, is where the signal lives. This kind of build-it-then-take-it-apart approach is a running theme in the Mycroft Financial AI work at Humanitarians AI.
