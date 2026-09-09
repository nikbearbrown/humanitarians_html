# Ad Grants long-tail campaign plan

Generated from data/youtube + content/videos. 23 campaigns, 609 ad groups/ads, 4651 phrase-match keywords (4437 unique).
Daily budget: $314/day for these campaigns, split into 26 shares of $12.08; flagship campaigns take several shares (see weight in adgrants/campaigns/*.json), each series campaign takes one. The remaining $15/day of the $329 cap stays with the three pre-existing campaigns (Humanitarians AI, Fellows, AI Literacy) at $5/day each: niche, not irrelevant, but switched to Maximize clicks ($2 cap) and phrase match.

## Import order (Google Ads Editor > Account > Import > From file)

1. `1-campaigns.csv` (campaigns are PAUSED on import; enable after review)
2. `2-sitelinks.csv`
3. `3-keywords.csv`
4. `4-ads.csv`

Bid strategy is Maximize clicks with a $2.00 max CPC bid limit (the Ad Grants-allowed non-Smart-Bidding option). Once an ad group records conversions, move that campaign to Maximize conversions.

## Campaigns

| Campaign | Ad groups | Keywords | $/day |
|---|---|---|---|
| OPT | International students | 23 | 228 | 48.31 |
| LT | Claude | 19 | 74 | 12.08 |
| LT | HAI | 11 | 56 | 12.08 |
| LT | Humanitarians AI Fellows | 73 | 543 | 12.08 |
| LT | Mycroft Financial AI | 44 | 403 | 12.08 |
| LT | Claude Basics | 43 | 278 | 12.08 |
| LT | Claude for Education | 38 | 179 | 12.08 |
| LT | Madison | 17 | 110 | 12.08 |
| LT | Behind the Model | 23 | 119 | 12.08 |
| LT | Lyrical Literacy | 23 | 204 | 12.08 |
| LT | INFO7375 Branding & AI | 21 | 181 | 12.08 |
| LT | Claude Plugins | 2 | 18 | 12.08 |
| LT | Brutalist (Film as Code) | 13 | 70 | 12.08 |
| LT | Extending Claude — Skills, Plugins & Connectors | 13 | 119 | 12.08 |
| LT | Causal Couture | 8 | 70 | 12.08 |
| LT | Claude Code | 7 | 37 | 12.08 |
| LT | Lyrical Literacy (Songs for Pre-School Kids) | 8 | 75 | 12.08 |
| LT | React | 5 | 43 | 12.08 |
| LT | AI+1 | 3 | 15 | 12.08 |
| LT | RAMAN Effect | 3 | 22 | 12.08 |
| LT | NeuroVEP | 1 | 8 | 12.08 |
| LT | Popper (Computational Skepticism) | 1 | 7 | 12.08 |
| LT | More Videos | 210 | 1792 | 12.08 |

## Operating rules

- Start every campaign small and equal. After 2 weeks, move budget toward campaigns with CTR above 5% and any clicks at all; pause ad groups with zero impressions after 30 days.
- Keep phrase match. Broad match on a $2 cap in Ad Grants tends to buy nothing or buy junk.
- Ad Grants policy: no single-word keywords, no generic keywords, pause keywords with Quality Score 1-2, keep account CTR at or above 5%, at least 2 ad groups per campaign and 2 sitelinks.
- Every final URL is a page on humanitarians.ai (never a YouTube link).
- Geotargeting: United States, India, China, South Korea, Canada, Taiwan, Vietnam, Nigeria, Bangladesh, Brazil, Nepal, Japan, Mexico, Saudi Arabia, Germany, United Kingdom, Colombia, Pakistan, Ghana, Turkey, Indonesia, Kenya, France, Spain, Italy. That is the US plus the largest F-1 (OPT-eligible) source countries. Students on F-1/OPT travel home for breaks and do coursework remotely, so the home countries are part of the same audience, not a separate prospective one; pass --locations to change the list. If the Ads Editor importer rejects a multi-value Location column, set locations per campaign after import. Google Search barely serves in mainland China, so expect little from that row.
