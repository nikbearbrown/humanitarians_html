#!/usr/bin/env python3
"""
Build a Google Ad Grants "long tail" campaign plan from the video articles.

    python3 scripts/youtube/build-adgrants-plan.py [--daily-total 329] [--out adgrants]

One Search campaign per YouTube playlist (series), one ad group per video, phrase-match
keywords taken from each article's frontmatter `keywords`, one responsive search ad per
ad group pointing at the video article page. Output is Google Ads Editor-importable CSVs
(Account > Import > From file, then map columns) plus a README summary.

Nothing here touches the Ads account; review, then import.
"""
import argparse, csv, json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
BASE = 'https://www.humanitarians.ai'
GENERIC = {'ai', 'artificial intelligence', 'machine learning', 'tutorial', 'video', 'free course',
           'humanitarians ai', 'nonprofit', 'ai tutorial', 'ai video'}
# Ad Grants forbids single-word keywords and overly generic ones; also drop branded terms of others.
BANNED_TOKENS = {'youtube', 'google', 'openai', 'chatgpt', 'anthropic'}
# Geotargeting: the US (where OPT students physically are) plus the countries that send the
# most F-1 students to the US, i.e. people who will be OPT-eligible. Override with --locations.
DEFAULT_LOCATIONS = ';'.join([
    'United States', 'India', 'China', 'South Korea', 'Canada', 'Taiwan', 'Vietnam', 'Nigeria',
    'Bangladesh', 'Brazil', 'Nepal', 'Japan', 'Mexico', 'Saudi Arabia', 'Germany', 'United Kingdom',
    'Colombia', 'Pakistan', 'Ghana', 'Turkey', 'Indonesia', 'Kenya', 'France', 'Spain', 'Italy',
])


def parse_front(raw):
    m = re.match(r'^---\n([\s\S]*?)\n---', raw)
    fm = {}
    if m:
        for line in m.group(1).split('\n'):
            if ':' in line:
                k, v = line.split(':', 1)
                try:
                    fm[k.strip()] = json.loads(v.strip())
                except Exception:
                    fm[k.strip()] = v.strip().strip('"')
    return fm


def clean_kw(k):
    k = re.sub(r'[^a-z0-9 +#\-]', ' ', k.lower())
    k = re.sub(r'\s+', ' ', k).strip()
    words = k.split()
    if len(words) < 2 or len(words) > 6 or len(k) > 80:
        return None
    if k in GENERIC or set(words) & BANNED_TOKENS:
        return None
    return k


def title_case(s):
    small = {'a', 'an', 'the', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'with', 'vs', 'at', 'by'}
    out = []
    for i, w in enumerate(s.split()):
        if w.isupper() and len(w) <= 5:
            out.append(w)
        elif w.lower() in small and i:
            out.append(w.lower())
        else:
            out.append(w[:1].upper() + w[1:])
    return ' '.join(out)


def fit(s, n):
    s = re.sub(r'\s+', ' ', s).strip()
    if len(s) <= n:
        return s
    cut = s[:n].rsplit(' ', 1)[0].rstrip(' ,;:-|')
    return cut if len(cut) >= max(10, n // 2) else s[:n].rstrip()


def headlines_for(v, fm, playlist_title):
    hs = []
    def add(h, allow_cut=False):
        h = re.sub(r'\s+', ' ', h).strip().rstrip('.!,;:')
        if len(h) > 30:
            if not allow_cut:
                return
            h = fit(h, 30)
        if h and h.lower() not in {x.lower() for x in hs} and len(h) >= 8:
            hs.append(h)
    # from the title, split on separators
    for part in re.split(r'\s*[|:\-–—]\s*', v['title']):
        if part.strip():
            add(title_case(part.strip()))
    if fm.get('seoTitle'):
        add(title_case(fm['seoTitle']))
    for k in (fm.get('keywords') or [])[:10]:
        add(title_case(k))
    # words 1..n of the title, longest prefix that fits, as a last resort
    words = re.split(r'\s*[|:\-–—]\s*', v['title'])[0].split()
    stop = {'a', 'an', 'the', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'with', 'vs', 'at', 'by', 'is', 'are', 'your', 'how', 'why', 'what'}
    for n in range(len(words), 2, -1):
        cand = words[:n]
        while cand and cand[-1].lower().strip(',:;') in stop:
            cand = cand[:-1]
        cand = ' '.join(cand)
        if cand and len(cand) <= 30 and len(hs) < 6:
            add(title_case(cand)); break
    for g in [f'{playlist_title} Series', 'Watch the Video + Article', 'Free From a 501(c)(3)', 'Humanitarians AI', 'Free AI Education', 'Read the Full Explainer', 'Chapters and Transcript']:
        add(g)
    return hs[:15]


def descriptions_for(v, fm):
    ds = []
    def add(d):
        d = fit(d, 90)
        if d and d not in ds and len(d) >= 25:
            ds.append(d)
    for src in [fm.get('description'), fm.get('summary')]:
        if src:
            for sent in re.split(r'(?<=[.!?])\s+', src):
                add(sent)
            add(src)
    add(f'{v["durationLabel"]} video with a full written article, chapters and transcript. Free.')
    add('Humanitarians AI is a 501(c)(3) nonprofit. Every video, course and tool is free.')
    add('Learn by doing with our Fellows program. Real projects, verifiable experience.')
    return ds[:4]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--daily-total', type=float, default=329.0, help='Ad Grants cap is $10,000/month ≈ $329/day')
    ap.add_argument('--out', default='adgrants')
    ap.add_argument('--max-cpc', default='2.00')
    ap.add_argument('--locations', default=DEFAULT_LOCATIONS,
                    help='semicolon-separated campaign locations (default: US + the largest F-1 / OPT source countries)')
    a = ap.parse_args()
    out = ROOT / a.out
    out.mkdir(exist_ok=True)

    videos = json.loads((ROOT / 'data/youtube/videos.json').read_text())
    # Curated flagship campaigns (adgrants/campaigns/*.json): hand-written ad groups + keywords,
    # plus a list of video slugs that should live in this campaign instead of their series.
    specs = []
    for f in sorted((ROOT / 'adgrants' / 'campaigns').glob('*.json')):
        specs.append(json.loads(f.read_text()))
    claimed = {slug for sp in specs for slug in sp.get('videoSlugs', [])}
    playlists = [p for p in json.loads((ROOT / 'data/youtube/playlists.json').read_text()) if p['videoIds']]
    by_id = {v['id']: v for v in videos}
    slug_to_id = {v['slug']: v['id'] for v in videos}
    claimed_ids = {slug_to_id[sl] for sl in claimed if sl in slug_to_id}
    for p in playlists:
        p['videoIds'] = [vid for vid in p['videoIds'] if vid not in claimed_ids]
    videos_for_loose = [v for v in videos if v['id'] not in claimed_ids]
    # A video can sit in several playlists (e.g. the catch-all "HAI" list). Give it ONE ad group,
    # in its most specific series (the smallest playlist that contains it), so campaigns never
    # bid against each other for the same page.
    smallest = {}
    for p in sorted(playlists, key=lambda p: len(p['videoIds'])):
        for vid in p['videoIds']:
            smallest.setdefault(vid, p['id'])
    for p in playlists:
        p['videoIds'] = [vid for vid in p['videoIds'] if smallest.get(vid) == p['id']]
    playlists = [p for p in playlists if p['videoIds']]
    in_pl = {vid for p in playlists for vid in p['videoIds']}
    # Videos in no playlist get their own catch-all campaign
    loose = [v for v in videos_for_loose if v['id'] not in in_pl]
    if loose:
        playlists.append({'id': 'LOOSE', 'slug': 'more-videos', 'title': 'More Videos', 'videoIds': [v['id'] for v in loose]})

    CHUNK = 45
    chunked = []
    for p in playlists:
        ids = p['videoIds']
        if len(ids) <= CHUNK:
            chunked.append(p)
            continue
        parts = (len(ids) + CHUNK - 1) // CHUNK
        size = (len(ids) + parts - 1) // parts
        for i in range(parts):
            q = dict(p)
            q['title'] = f"{p['title']} {i + 1}"
            q['videoIds'] = ids[i * size:(i + 1) * size]
            chunked.append(q)
    playlists = chunked
    shares = sum(sp.get('weight', 1) for sp in specs) + len(playlists)
    share_value = a.daily_total / shares
    budget_each = round(share_value, 2)
    n = len(playlists) + len(specs)

    camp_rows, kw_rows, ad_rows, sl_rows = [], [], [], []
    all_kw = set()
    stats = []

    def sitelinks(camp):
        for text, url, d1, d2 in [
            ('Become a Fellow', f'{BASE}/fellows', 'Real AI projects for students', 'and early-career researchers'),
            ('OPT Volunteer Work', f'{BASE}/opt-volunteer-opportunities', 'Documented hours that keep', 'your OPT status active'),
            ('80 Days to Stay', f'{BASE}/80-days-to-stay', 'Free sponsor database and', 'job tools for OPT students'),
            ('All Video Articles', f'{BASE}/videos/library', 'Every video, with a full', 'article and transcript'),
        ]:
            sl_rows.append({'Campaign': camp, 'Sitelink text': text, 'Final URL': url, 'Description line 1': d1, 'Description line 2': d2})

    for sp in specs:
        camp = sp['name'][:120]
        budget = round(share_value * sp.get('weight', 1), 2)
        camp_rows.append({'Campaign': camp, 'Campaign Type': 'Search', 'Campaign Status': 'Paused',
                          'Budget': f'{budget:.2f}', 'Budget type': 'Daily', 'Networks': 'Google search',
                          'Languages': 'en', 'Location': a.locations, 'Bid Strategy Type': 'Maximize clicks',
                          'Max CPC bid limit': a.max_cpc, 'Ad rotation': 'Optimize for clicks',
                          'Campaign Goal': 'Website traffic'})
        sitelinks(camp)
        ags = 0; kws_total = 0
        for ag in sp['adGroups']:
            kws = []
            for k in ag['keywords']:
                c = clean_kw(k)
                if c and c not in kws:
                    kws.append(c)
            for k in kws:
                kw_rows.append({'Campaign': camp, 'Ad Group': ag['name'], 'Keyword': k, 'Criterion Type': 'Phrase', 'Status': 'Enabled', 'Final URL': ag['url']})
                all_kw.add(k)
            hs = [fit(h, 30) for h in ag['headlines']][:15]
            ds = [fit(d, 90) for d in ag['descriptions']][:4]
            row = {'Campaign': camp, 'Ad Group': ag['name'], 'Ad type': 'Responsive search ad', 'Status': 'Enabled', 'Final URL': ag['url'],
                   'Path 1': 'opt', 'Path 2': fit(re.sub(r'[^a-z0-9]+', '-', ag['name'].lower()).strip('-'), 15)}
            for i, h in enumerate(hs, 1):
                row[f'Headline {i}'] = h
            for i, d in enumerate(ds, 1):
                row[f'Description {i}'] = d
            ad_rows.append(row)
            ags += 1; kws_total += len(kws)
        # the claimed videos become ad groups in this campaign too
        for sl in sp.get('videoSlugs', []):
            v = by_id.get(slug_to_id.get(sl, ''))
            if not v:
                continue
            art = ROOT / 'content/videos' / f'{v["slug"]}.md'
            fm = parse_front(art.read_text()) if art.exists() else {}
            kws = []
            for k in (fm.get('keywords') or []) + v.get('tags', [])[:6]:
                c = clean_kw(k)
                if c and c not in kws:
                    kws.append(c)
            if len(kws) < 2:
                continue
            agn = fit(v['title'], 250); url = f'{BASE}/videos/{v["slug"]}'
            for k in kws[:20]:
                kw_rows.append({'Campaign': camp, 'Ad Group': agn, 'Keyword': k, 'Criterion Type': 'Phrase', 'Status': 'Enabled', 'Final URL': url})
                all_kw.add(k)
            hs = headlines_for(v, fm, sp['name'].split('|')[0].strip()); ds = descriptions_for(v, fm)
            if len(hs) < 3 or len(ds) < 2:
                continue
            row = {'Campaign': camp, 'Ad Group': agn, 'Ad type': 'Responsive search ad', 'Status': 'Enabled', 'Final URL': url, 'Path 1': 'videos', 'Path 2': 'opt'}
            for i, h in enumerate(hs, 1):
                row[f'Headline {i}'] = h
            for i, d in enumerate(ds, 1):
                row[f'Description {i}'] = d
            ad_rows.append(row); ags += 1; kws_total += min(len(kws), 20)
        stats.append((camp, ags, kws_total, budget))

    for p in playlists:
        camp = f'LT | {p["title"]}'[:120]
        camp_rows.append({'Campaign': camp, 'Campaign Type': 'Search', 'Campaign Status': 'Paused',
                          'Budget': f'{budget_each:.2f}', 'Budget type': 'Daily', 'Networks': 'Google search',
                          'Languages': 'en', 'Location': a.locations, 'Bid Strategy Type': 'Maximize clicks',
                          'Max CPC bid limit': a.max_cpc, 'Ad rotation': 'Optimize for clicks',
                          'Campaign Goal': 'Website traffic'})
        sitelinks(camp)
        vids_written = 0
        kws_total = 0
        for vid in p['videoIds']:
            v = by_id.get(vid)
            if not v:
                continue
            art = ROOT / 'content/videos' / f'{v["slug"]}.md'
            fm = parse_front(art.read_text()) if art.exists() else {}
            kws = []
            for k in (fm.get('keywords') or []) + v.get('tags', [])[:6]:
                c = clean_kw(k)
                if c and c not in kws:
                    kws.append(c)
            # a phrase from the title itself
            t = clean_kw(re.split(r'\s*[|:\-–—]\s*', v['title'])[0])
            if t and t not in kws:
                kws.insert(0, t)
            if len(kws) < 2:
                continue  # Ad Grants wants ad groups with real keyword sets
            ag = fit(v['title'], 250)
            url = f'{BASE}/videos/{v["slug"]}'
            for k in kws[:20]:
                kw_rows.append({'Campaign': camp, 'Ad Group': ag, 'Keyword': k, 'Criterion Type': 'Phrase', 'Status': 'Enabled', 'Final URL': url})
                all_kw.add(k)
            hs = headlines_for(v, fm, p['title'])
            ds = descriptions_for(v, fm)
            if len(hs) < 3 or len(ds) < 2:
                continue
            row = {'Campaign': camp, 'Ad Group': ag, 'Ad type': 'Responsive search ad', 'Status': 'Enabled', 'Final URL': url,
                   'Path 1': 'videos', 'Path 2': fit(p['slug'], 15)}
            for i, h in enumerate(hs, 1):
                row[f'Headline {i}'] = h
            for i, d in enumerate(ds, 1):
                row[f'Description {i}'] = d
            ad_rows.append(row)
            vids_written += 1
            kws_total += min(len(kws), 20)
        stats.append((camp, vids_written, kws_total, budget_each))

    def write(name, rows):
        if not rows:
            return
        cols = []
        for r in rows:
            for k in r:
                if k not in cols:
                    cols.append(k)
        with open(out / name, 'w', newline='') as f:
            w = csv.DictWriter(f, fieldnames=cols)
            w.writeheader()
            w.writerows(rows)

    write('1-campaigns.csv', camp_rows)
    write('2-sitelinks.csv', sl_rows)
    write('3-keywords.csv', kw_rows)
    write('4-ads.csv', ad_rows)
    (out / 'all-keywords.txt').write_text('\n'.join(sorted(all_kw)))

    lines = ['# Ad Grants long-tail campaign plan', '',
             f'Generated from data/youtube + content/videos. {len(camp_rows)} campaigns, {len(ad_rows)} ad groups/ads, {len(kw_rows)} phrase-match keywords ({len(all_kw)} unique).',
             f'Daily budget: ${a.daily_total:.0f}/day total (the $10,000/month cap) split into {shares} shares of ${share_value:.2f}; flagship campaigns take several shares (see weight in adgrants/campaigns/*.json), each series campaign takes one.', '',
             '## Import order (Google Ads Editor > Account > Import > From file)', '',
             '1. `1-campaigns.csv` (campaigns are PAUSED on import; enable after review)',
             '2. `2-sitelinks.csv`', '3. `3-keywords.csv`', '4. `4-ads.csv`', '',
             'Bid strategy is Maximize clicks with a $2.00 max CPC bid limit (the Ad Grants-allowed non-Smart-Bidding option). Once an ad group records conversions, move that campaign to Maximize conversions.', '',
             '## Campaigns', '', '| Campaign | Ad groups | Keywords | $/day |', '|---|---|---|---|']
    for c, vw, kt, b in stats:
        lines.append(f'| {c} | {vw} | {kt} | {b:.2f} |')
    lines += ['', '## Operating rules', '',
              '- Start every campaign small and equal. After 2 weeks, move budget toward campaigns with CTR above 5% and any clicks at all; pause ad groups with zero impressions after 30 days.',
              '- Keep phrase match. Broad match on a $2 cap in Ad Grants tends to buy nothing or buy junk.',
              '- Ad Grants policy: no single-word keywords, no generic keywords, pause keywords with Quality Score 1-2, keep account CTR at or above 5%, at least 2 ad groups per campaign and 2 sitelinks.',
              '- Every final URL is a page on humanitarians.ai (never a YouTube link).',
              f'- Geotargeting: {a.locations.replace(";", ", ")}. That is the US plus the largest F-1 (OPT-eligible) source countries. Students on F-1/OPT travel home for breaks and do coursework remotely, so the home countries are part of the same audience, not a separate prospective one; pass --locations to change the list. If the Ads Editor importer rejects a multi-value Location column, set locations per campaign after import. Google Search barely serves in mainland China, so expect little from that row.']
    (out / 'README.md').write_text('\n'.join(lines) + '\n')
    print(f'{len(camp_rows)} campaigns, {len(ad_rows)} ads, {len(kw_rows)} keywords ({len(all_kw)} unique) -> {out}')


if __name__ == '__main__':
    main()
