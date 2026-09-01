# Ad Grants long-tail campaign plan

Generated from data/youtube + content/videos. 20 campaigns, 424 ad groups/ads, 3745 phrase-match keywords (3567 unique).
Daily budget: $329/day total (the $10,000/month cap) split into 23 shares of $14.30; flagship campaigns take several shares (see weight in adgrants/campaigns/*.json), each series campaign takes one.

## Import order (Google Ads Editor > Account > Import > From file)

1. `1-campaigns.csv` (campaigns are PAUSED on import; enable after review)
2. `2-sitelinks.csv`
3. `3-keywords.csv`
4. `4-ads.csv`

Bid strategy is Maximize clicks with a $2.00 max CPC bid limit (the Ad Grants-allowed non-Smart-Bidding option). Once an ad group records conversions, move that campaign to Maximize conversions.

## Campaigns

| Campaign | Ad groups | Keywords | $/day |
|---|---|---|---|
| OPT | International students | 23 | 228 | 57.22 |
| LT | HAI | 19 | 164 | 14.30 |
| LT | Humanitarians AI Fellows 1 | 25 | 217 | 14.30 |
| LT | Humanitarians AI Fellows 2 | 25 | 222 | 14.30 |
| LT | Mycroft Financial AI | 44 | 403 | 14.30 |
| LT | Madison | 7 | 64 | 14.30 |
| LT | INFO7375 Branding & AI | 21 | 181 | 14.30 |
| LT | Claude | 21 | 189 | 14.30 |
| LT | Lyrical Literacy | 18 | 177 | 14.30 |
| LT | Lyrical Literacy (Songs for Pre-School Kids) | 8 | 75 | 14.30 |
| LT | Medhavy | 6 | 53 | 14.30 |
| LT | React | 5 | 43 | 14.30 |
| LT | NeuroVEP | 1 | 8 | 14.30 |
| LT | Popper (Computational Skepticism) | 1 | 7 | 14.30 |
| LT | RAMAN Effect | 1 | 8 | 14.30 |
| LT | More Videos 1 | 36 | 317 | 14.30 |
| LT | More Videos 2 | 40 | 332 | 14.30 |
| LT | More Videos 3 | 41 | 347 | 14.30 |
| LT | More Videos 4 | 41 | 369 | 14.30 |
| LT | More Videos 5 | 41 | 341 | 14.30 |

## Operating rules

- Start every campaign small and equal. After 2 weeks, move budget toward campaigns with CTR above 5% and any clicks at all; pause ad groups with zero impressions after 30 days.
- Keep phrase match. Broad match on a $2 cap in Ad Grants tends to buy nothing or buy junk.
- Ad Grants policy: no single-word keywords, no generic keywords, pause keywords with Quality Score 1-2, keep account CTR at or above 5%, at least 2 ad groups per campaign and 2 sitelinks.
- Every final URL is a page on humanitarians.ai (never a YouTube link).
- Geotargeting: United States, India, China, South Korea, Canada, Taiwan, Vietnam, Nigeria, Bangladesh, Brazil, Nepal, Japan, Mexico, Saudi Arabia, Germany, United Kingdom, Colombia, Pakistan, Ghana, Turkey, Indonesia, Kenya, France, Spain, Italy. That is the US plus the largest F-1 (OPT-eligible) source countries. Students on F-1/OPT travel home for breaks and do coursework remotely, so the home countries are part of the same audience, not a separate prospective one; pass --locations to change the list. If the Ads Editor importer rejects a multi-value Location column, set locations per campaign after import. Google Search barely serves in mainland China, so expect little from that row.
