# Ad Grants long-tail campaign plan

Generated from data/youtube + content/videos. 20 campaigns, 424 ad groups/ads, 3745 phrase-match keywords (3567 unique).
Daily budget: $314/day for these campaigns, split into 23 shares of $13.65; flagship campaigns take several shares (see weight in adgrants/campaigns/*.json), each series campaign takes one. The remaining $15/day of the $329 cap stays with the three pre-existing campaigns (Humanitarians AI, Fellows, AI Literacy) at $5/day each: niche, not irrelevant, but switched to Maximize clicks ($2 cap) and phrase match.

## Import order (Google Ads Editor > Account > Import > From file)

1. `1-campaigns.csv` (campaigns are PAUSED on import; enable after review)
2. `2-sitelinks.csv`
3. `3-keywords.csv`
4. `4-ads.csv`

Bid strategy is Maximize clicks with a $2.00 max CPC bid limit (the Ad Grants-allowed non-Smart-Bidding option). Once an ad group records conversions, move that campaign to Maximize conversions.

## Campaigns

| Campaign | Ad groups | Keywords | $/day |
|---|---|---|---|
| OPT | International students | 23 | 228 | 54.61 |
| LT | HAI | 19 | 164 | 13.65 |
| LT | Humanitarians AI Fellows 1 | 25 | 217 | 13.65 |
| LT | Humanitarians AI Fellows 2 | 25 | 222 | 13.65 |
| LT | Mycroft Financial AI | 44 | 403 | 13.65 |
| LT | Madison | 7 | 64 | 13.65 |
| LT | INFO7375 Branding & AI | 21 | 181 | 13.65 |
| LT | Claude | 21 | 189 | 13.65 |
| LT | Lyrical Literacy | 18 | 177 | 13.65 |
| LT | Lyrical Literacy (Songs for Pre-School Kids) | 8 | 75 | 13.65 |
| LT | Medhavy | 6 | 53 | 13.65 |
| LT | React | 5 | 43 | 13.65 |
| LT | NeuroVEP | 1 | 8 | 13.65 |
| LT | Popper (Computational Skepticism) | 1 | 7 | 13.65 |
| LT | RAMAN Effect | 1 | 8 | 13.65 |
| LT | More Videos 1 | 36 | 317 | 13.65 |
| LT | More Videos 2 | 40 | 332 | 13.65 |
| LT | More Videos 3 | 41 | 347 | 13.65 |
| LT | More Videos 4 | 41 | 369 | 13.65 |
| LT | More Videos 5 | 41 | 341 | 13.65 |

## Operating rules

- Start every campaign small and equal. After 2 weeks, move budget toward campaigns with CTR above 5% and any clicks at all; pause ad groups with zero impressions after 30 days.
- Keep phrase match. Broad match on a $2 cap in Ad Grants tends to buy nothing or buy junk.
- Ad Grants policy: no single-word keywords, no generic keywords, pause keywords with Quality Score 1-2, keep account CTR at or above 5%, at least 2 ad groups per campaign and 2 sitelinks.
- Every final URL is a page on humanitarians.ai (never a YouTube link).
- Geotargeting: United States, India, China, South Korea, Canada, Taiwan, Vietnam, Nigeria, Bangladesh, Brazil, Nepal, Japan, Mexico, Saudi Arabia, Germany, United Kingdom, Colombia, Pakistan, Ghana, Turkey, Indonesia, Kenya, France, Spain, Italy. That is the US plus the largest F-1 (OPT-eligible) source countries. Students on F-1/OPT travel home for breaks and do coursework remotely, so the home countries are part of the same audience, not a separate prospective one; pass --locations to change the list. If the Ads Editor importer rejects a multi-value Location column, set locations per campaign after import. Google Search barely serves in mainland China, so expect little from that row.
