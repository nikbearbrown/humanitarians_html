#!/usr/bin/env python3
"""Insert <OpenHours /> after the block that holds each page's LAST humanitarians.ai email.
Usage: python3 scripts/add_open_hours.py [--apply]   (dry run by default)"""
import re, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
EMAIL = re.compile(r"[a-z.]+@humanitarians\.ai")
SKIP = {"app/contact/page.tsx"}                       # has the full When We're Open card
apply = "--apply" in sys.argv
ind = lambda s: len(s) - len(s.lstrip(" "))
def opening_tag(s):
    m = re.match(r"\s*<([A-Za-z][\w.]*)", s); return m.group(1) if m and not s.strip().startswith("</") else None
report = []
for f in sorted((ROOT / "app").rglob("page.tsx")):
    rel = str(f.relative_to(ROOT))
    src = f.read_text(); lines = src.split("\n")
    if rel in SKIP or "<OpenHours" in src or not EMAIL.search(src): continue
    L = max(i for i, l in enumerate(lines) if EMAIL.search(l))
    O = next(i for i in range(L, -1, -1) if opening_tag(lines[i]) in {"a", "PrimaryButton", "SecondaryButton", "Link", "p"})
    tag = opening_tag(lines[O])
    target = O if tag == "p" else next(i for i in range(O - 1, -1, -1) if opening_tag(lines[i]) and ind(lines[i]) < ind(lines[O]))
    for _ in range(3):                                    # never become an extra cell in a card grid
        parent = next((i for i in range(target - 1, -1, -1) if opening_tag(lines[i]) and ind(lines[i]) < ind(lines[target])), None)
        if parent is None or not re.search(r'className="[^"]*\bgrid\b', lines[parent]): break
        target = parent
    close = next(i for i in range(L, len(lines)) if lines[i].strip().startswith("</") and ind(lines[i]) == ind(lines[target]))
    pad = " " * ind(lines[target])
    report.append(f"{rel:52} email@{L+1} in <{tag}>  →  after {lines[close].strip()} @{close+1} (container <{opening_tag(lines[target])}> @{target+1})")
    if apply:
        lines.insert(close + 1, f'{pad}<OpenHours className="mt-6" />')
        imports = [i for i, l in enumerate(lines) if l.startswith("import ")]
        last = imports[-1]
        while not re.search(r"""from\s+["'][^"']+["']""", lines[last]): last += 1   # multi-line import
        lines.insert(last + 1, 'import OpenHours from "@/components/OpenHours"')
        f.write_text("\n".join(lines))
print("\n".join(report)); print(f"{len(report)} pages {'updated' if apply else '(dry run)'}")
