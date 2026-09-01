#!/usr/bin/env python3
"""
Unity Project Walker
Scans a Unity project and generates a CLAUDE.md population report.
Usage: python unity_project_walker.py /path/to/unity/project
"""

import os
import re
import json
import argparse
from pathlib import Path
from collections import defaultdict
from datetime import datetime

# ─────────────────────────────────────────────
# CONFIG: what to scan
# ─────────────────────────────────────────────

SCRIPT_EXT       = {'.cs'}
ASSET_EXT        = {'.unity', '.prefab', '.asset', '.mat', '.anim',
                    '.controller', '.overrideController'}
BINARY_MEDIA_EXT = {'.png', '.jpg', '.jpeg', '.tga', '.psd', '.bmp',
                    '.gif', '.mp3', '.wav', '.ogg', '.aif',
                    '.fbx', '.obj', '.blend', '.3ds', '.dae',
                    '.ttf', '.otf', '.fnt'}
CONFIG_EXT       = {'.json', '.xml', '.csv', '.txt', '.yaml', '.yml'}

UNITY_SPECIAL_FOLDERS = {
    'Editor', 'Editor Default Resources', 'Gizmos',
    'Plugins', 'Resources', 'StreamingAssets', 'Standard Assets'
}

# Deprecated / legacy API patterns to flag
LEGACY_PATTERNS = {
    'OnLevelWasLoaded':     'Removed in Unity 5.4 — use SceneManager',
    'Application.LoadLevel':'Removed in Unity 5.3 — use SceneManager',
    'iTween':               'Legacy tween library',
    'NGUI':                 'Legacy UI system',
    'UnityEngine.WWW':      'Deprecated — use UnityWebRequest',
    'FindObjectOfType':     'Performance warning in hot paths',
    'GameObject.Find(':     'Fragile — consider injection',
    'SendMessage(':         'Reflection-based — consider events',
    'BroadcastMessage(':    'Reflection-based — consider events',
    '#pragma strict':       'UnityScript legacy (JS era)',
    '.js':                  'UnityScript — needs rewrite to C#',
    'using UnityEngine.Networking': 'UNET deprecated — use Netcode/Mirror',
    'NetworkBehaviour':     'UNET deprecated',
    'Resources.Load(':      'Prefer Addressables',
    'DontDestroyOnLoad':    'Singleton smell — consider SO architecture',
}

# Render pipeline detection
RENDER_PIPELINE_INDICATORS = {
    'com.unity.render-pipelines.universal': 'URP',
    'com.unity.render-pipelines.high-definition': 'HDRP',
    'UniversalRenderPipeline': 'URP',
    'HDRenderPipeline': 'HDRP',
}

# Patterns that suggest hardcoded asset coupling
HARDCODED_ASSET_PATTERNS = [
    r'Resources\.Load\s*[(<]',
    r'\[SerializeField\].*(?:Sprite|Texture|AudioClip|Material|GameObject|Prefab)',
    r'public\s+(?:Sprite|Texture2D|AudioClip|Material|GameObject)\s+\w+\s*;',
    r'"[^"]*\.(png|jpg|mp3|wav|ogg|fbx|prefab)"',
]

# Patterns that suggest hardcoded strings/magic numbers
MAGIC_VALUE_PATTERNS = [
    r'(?<!=\s)"[A-Za-z][A-Za-z0-9_/\s]{3,}"(?!\s*\+)',  # string literals
    r'\b(?<!\w)(?:100|200|500|1000|0\.5f|0\.1f|360f|180f)\b',  # magic numbers
]


# ─────────────────────────────────────────────
# SCANNERS
# ─────────────────────────────────────────────

def get_unity_version(project_root: Path) -> str:
    version_file = project_root / 'ProjectSettings' / 'ProjectVersion.txt'
    if version_file.exists():
        content = version_file.read_text(encoding='utf-8', errors='ignore')
        m = re.search(r'm_EditorVersion:\s*(.+)', content)
        if m:
            return m.group(1).strip()
    return 'Unknown'


def get_render_pipeline(project_root: Path) -> str:
    # Check manifest.json
    manifest = project_root / 'Packages' / 'manifest.json'
    if manifest.exists():
        txt = manifest.read_text(encoding='utf-8', errors='ignore')
        for key, label in RENDER_PIPELINE_INDICATORS.items():
            if key in txt:
                return label

    # Check ProjectSettings
    settings = project_root / 'ProjectSettings' / 'ProjectSettings.asset'
    if settings.exists():
        txt = settings.read_text(encoding='utf-8', errors='ignore')
        for key, label in RENDER_PIPELINE_INDICATORS.items():
            if key in txt:
                return label

    return 'Built-in (Legacy)'


def get_packages(project_root: Path) -> dict:
    manifest = project_root / 'Packages' / 'manifest.json'
    if not manifest.exists():
        return {}
    try:
        data = json.loads(manifest.read_text(encoding='utf-8', errors='ignore'))
        return data.get('dependencies', {})
    except Exception:
        return {}


def scan_scripts(assets_root: Path) -> dict:
    results = {
        'total_scripts': 0,
        'classes': [],           # (file, class_name, base_class)
        'monobehaviours': [],
        'scriptableobjects': [],
        'interfaces': [],
        'legacy_hits': defaultdict(list),     # pattern -> [file:line]
        'hardcoded_assets': defaultdict(list),
        'magic_values': defaultdict(list),
        'namespaces': set(),
        'asmdef_files': [],
        'editor_scripts': [],
        'js_files': [],
    }

    for path in assets_root.rglob('*'):
        # UnityScript legacy
        if path.suffix == '.js' and 'ThirdParty' not in str(path):
            results['js_files'].append(str(path.relative_to(assets_root)))

        if path.suffix == '.asmdef':
            results['asmdef_files'].append(str(path.relative_to(assets_root)))

        if path.suffix not in SCRIPT_EXT:
            continue

        results['total_scripts'] += 1
        rel = str(path.relative_to(assets_root))

        # Flag editor scripts
        if 'Editor' in path.parts:
            results['editor_scripts'].append(rel)

        try:
            lines = path.read_text(encoding='utf-8', errors='ignore').splitlines()
        except Exception:
            continue

        for i, line in enumerate(lines, 1):
            loc = f"{rel}:{i}"

            # Class / interface declarations
            m = re.search(r'\b(class|interface)\s+(\w+)(?:\s*:\s*(\w[\w,\s<>]*?))?(?:\s*{|$)', line)
            if m:
                kind      = m.group(1)
                name      = m.group(2)
                base      = (m.group(3) or '').strip().split(',')[0].strip()
                entry     = (rel, name, base)
                results['classes'].append(entry)
                if 'MonoBehaviour' in base:
                    results['monobehaviours'].append(entry)
                if 'ScriptableObject' in base:
                    results['scriptableobjects'].append(entry)
                if kind == 'interface':
                    results['interfaces'].append(entry)

            # Namespace
            ns = re.search(r'^\s*namespace\s+([\w.]+)', line)
            if ns:
                results['namespaces'].add(ns.group(1))

            # Legacy API patterns
            for pattern, note in LEGACY_PATTERNS.items():
                if pattern in line:
                    results['legacy_hits'][f"{pattern} — {note}"].append(loc)

            # Hardcoded asset patterns
            for pat in HARDCODED_ASSET_PATTERNS:
                if re.search(pat, line):
                    results['hardcoded_assets'][rel].append((i, line.strip()))

            # Magic values (sample — cap per file to avoid noise)
            if len(results['magic_values'][rel]) < 5:
                for pat in MAGIC_VALUE_PATTERNS:
                    if re.search(pat, line):
                        results['magic_values'][rel].append((i, line.strip()))

    return results


def inventory_assets(assets_root: Path) -> dict:
    counts  = defaultdict(int)
    folders = defaultdict(int)
    special = []
    third_party = []
    large_files = []   # > 50 MB
    total_size  = 0

    for path in assets_root.rglob('*'):
        if path.is_dir():
            if path.name in UNITY_SPECIAL_FOLDERS:
                special.append(str(path.relative_to(assets_root)))
            # Heuristic: top-level dirs not matching project name = vendor
            if path.parent == assets_root and path.name not in (
                'Editor', 'Gizmos', 'Plugins', 'Resources',
                'StreamingAssets', 'Standard Assets',
                'AddressableAssetsData', 'TextMesh Pro',
            ):
                folders[path.name] += 1
            continue

        if path.suffix == '.meta':
            continue

        ext = path.suffix.lower()
        counts[ext] += 1

        try:
            sz = path.stat().st_size
            total_size += sz
            if sz > 50 * 1024 * 1024:
                large_files.append((str(path.relative_to(assets_root)), sz))
        except Exception:
            pass

        # Vendor detection: path contains known store markers
        rel = str(path)
        if any(marker in rel for marker in ['Asset Store', 'ThirdParty',
                                             'Plugins', 'Packages']):
            top = path.relative_to(assets_root).parts[0] \
                  if len(path.relative_to(assets_root).parts) > 1 else path.name
            third_party.append(top)

    return {
        'counts':       dict(counts),
        'special':      special,
        'third_party':  sorted(set(third_party)),
        'large_files':  sorted(large_files, key=lambda x: -x[1])[:20],
        'total_size_mb': round(total_size / (1024 * 1024), 1),
        'top_folders':  dict(folders),
    }


def scan_scenes(assets_root: Path) -> list:
    scenes = []
    for path in assets_root.rglob('*.unity'):
        rel = str(path.relative_to(assets_root))
        try:
            content = path.read_text(encoding='utf-8', errors='ignore')
            go_count  = content.count('m_Name:')
            has_light = 'LightmapSettings' in content
            scenes.append({
                'path':          rel,
                'gameobj_approx': go_count,
                'has_baked_light': has_light,
                'size_kb':       round(path.stat().st_size / 1024, 1),
            })
        except Exception:
            scenes.append({'path': rel, 'gameobj_approx': 0,
                           'has_baked_light': False, 'size_kb': 0})
    return sorted(scenes, key=lambda x: -x['size_kb'])


def detect_architecture(script_data: dict) -> dict:
    bases = [c[2] for c in script_data['classes']]
    notes = []

    if script_data['scriptableobjects']:
        notes.append('ScriptableObjects present')
    if any('Singleton' in b for b in bases):
        notes.append('Singleton pattern detected')
    if any('StateMachine' in b or 'State' in b for b in bases):
        notes.append('State machine pattern detected')
    if any('Observer' in b or 'Event' in b for b in bases):
        notes.append('Observer/Event pattern detected')
    if not script_data['asmdef_files']:
        notes.append('NO Assembly Definitions — everything in default assembly')
    if not script_data['namespaces']:
        notes.append('NO namespaces — global scope throughout')
    if script_data['js_files']:
        notes.append(f"UnityScript (.js) files: {len(script_data['js_files'])} — must rewrite to C#")

    return {'observations': notes}


# ─────────────────────────────────────────────
# REPORT GENERATION
# ─────────────────────────────────────────────

def build_report(project_root: Path) -> str:
    assets_root = project_root / 'Assets'
    if not assets_root.exists():
        return f"ERROR: No Assets folder found at {project_root}"

    print("  Detecting Unity version...")
    unity_ver  = get_unity_version(project_root)
    render     = get_render_pipeline(project_root)
    packages   = get_packages(project_root)

    print("  Scanning scripts...")
    scripts    = scan_scripts(assets_root)

    print("  Inventorying assets...")
    assets     = inventory_assets(assets_root)

    print("  Scanning scenes...")
    scenes     = scan_scenes(assets_root)

    arch       = detect_architecture(scripts)

    now = datetime.now().strftime('%Y-%m-%d %H:%M')
    lines = [
        f"# Unity Project Walker Report",
        f"Generated: {now}",
        f"Project: {project_root.name}",
        "",
        "─" * 60,
        "## 1. ENGINE & ENVIRONMENT",
        "─" * 60,
        f"Unity Version : {unity_ver}",
        f"Render Pipeline: {render}",
        "",
    ]

    if packages:
        lines.append("Key Packages:")
        for pkg, ver in sorted(packages.items()):
            if any(k in pkg for k in ['addressables', 'render-pipelines',
                                       'cinemachine', 'inputsystem',
                                       'timeline', 'animation.rigging',
                                       'textmeshpro', 'localization']):
                lines.append(f"  {pkg}: {ver}")
    lines.append("")

    lines += [
        "─" * 60,
        "## 2. ASSET INVENTORY",
        "─" * 60,
        f"Total size (Assets/): {assets['total_size_mb']} MB",
        "",
        "File counts by extension:",
    ]
    for ext, cnt in sorted(assets['counts'].items(), key=lambda x: -x[1])[:25]:
        lines.append(f"  {ext or '(no ext)':20s}  {cnt:5d}")

    lines += ["", "Special Unity folders found:"]
    if assets['special']:
        for s in assets['special']:
            lines.append(f"  {s}")
    else:
        lines.append("  (none — good)")

    lines += ["", "Likely third-party / vendor folders:"]
    if assets['third_party']:
        for t in assets['third_party']:
            lines.append(f"  {t}")
    else:
        lines.append("  (none detected)")

    if assets['large_files']:
        lines += ["", "Large files (>50 MB):"]
        for f, sz in assets['large_files']:
            lines.append(f"  {round(sz/1024/1024,1):6.1f} MB  {f}")
    lines.append("")

    lines += [
        "─" * 60,
        "## 3. SCENE INVENTORY",
        "─" * 60,
    ]
    if scenes:
        for s in scenes:
            lines.append(
                f"  {s['path']}"
                f"  ({s['size_kb']} KB, ~{s['gameobj_approx']} objects"
                f"{', baked lighting' if s['has_baked_light'] else ''})"
            )
    else:
        lines.append("  No .unity scene files found")
    lines.append("")

    lines += [
        "─" * 60,
        "## 4. SCRIPT ANALYSIS",
        "─" * 60,
        f"Total C# scripts: {scripts['total_scripts']}",
        f"MonoBehaviours  : {len(scripts['monobehaviours'])}",
        f"ScriptableObjects:{len(scripts['scriptableobjects'])}",
        f"Interfaces      : {len(scripts['interfaces'])}",
        f"Assembly .asmdef: {len(scripts['asmdef_files'])}",
        f"Namespaces      : {len(scripts['namespaces'])}",
        f"Editor scripts  : {len(scripts['editor_scripts'])}",
        f"UnityScript .js : {len(scripts['js_files'])}",
        "",
        "Architecture observations:",
    ]
    for obs in arch['observations']:
        lines.append(f"  ⚠  {obs}")
    lines.append("")

    if scripts['scriptableobjects']:
        lines += ["ScriptableObject classes:"]
        for f, name, base in scripts['scriptableobjects'][:30]:
            lines.append(f"  {name:40s}  {f}")
        if len(scripts['scriptableobjects']) > 30:
            lines.append(f"  ... and {len(scripts['scriptableobjects'])-30} more")
        lines.append("")

    if scripts['interfaces']:
        lines += ["Interfaces (existing contracts):"]
        for f, name, _ in scripts['interfaces'][:20]:
            lines.append(f"  {name:40s}  {f}")
        lines.append("")

    if scripts['namespaces']:
        lines += ["Namespaces in use:"]
        for ns in sorted(scripts['namespaces']):
            lines.append(f"  {ns}")
        lines.append("")

    if scripts['asmdef_files']:
        lines += ["Assembly definitions:"]
        for a in scripts['asmdef_files']:
            lines.append(f"  {a}")
        lines.append("")

    lines += [
        "─" * 60,
        "## 5. LEGACY / DEPRECATED API HITS",
        "─" * 60,
    ]
    if scripts['legacy_hits']:
        for pattern, locs in sorted(scripts['legacy_hits'].items()):
            lines.append(f"\n  [{pattern}]")
            for loc in locs[:5]:
                lines.append(f"    {loc}")
            if len(locs) > 5:
                lines.append(f"    ... and {len(locs)-5} more occurrences")
    else:
        lines.append("  No legacy patterns detected")
    lines.append("")

    lines += [
        "─" * 60,
        "## 6. HARDCODED ASSET REFERENCES",
        "─" * 60,
        "Files with serialized or code-bound asset references:",
        "(These need migration to ContentRegistry / Addressables)",
        "",
    ]
    if scripts['hardcoded_assets']:
        for f, hits in list(scripts['hardcoded_assets'].items())[:30]:
            lines.append(f"  {f}")
            for lineno, text in hits[:3]:
                lines.append(f"    L{lineno}: {text[:80]}")
        if len(scripts['hardcoded_assets']) > 30:
            lines.append(f"  ... and {len(scripts['hardcoded_assets'])-30} more files")
    else:
        lines.append("  None detected")
    lines.append("")

    lines += [
        "─" * 60,
        "## 7. CLAUDE.md POPULATION GUIDE",
        "─" * 60,
        "",
        "Paste the following block into your root CLAUDE.md:",
        "",
        "```markdown",
        f"# {project_root.name} — Claude Code Constitution",
        "",
        "## Tech Stack",
        f"- Unity {unity_ver}",
        f"- Render Pipeline: {render}",
        "- C# — .NET Standard 2.1",
        "",
        "## Architecture State (pre-refactor)",
    ]
    for obs in arch['observations']:
        lines.append(f"- {obs}")

    lines += [
        "",
        "## Assembly Boundaries (to be created)",
        "- Core.asmdef        — no dependencies",
        "- Gameplay.asmdef    — depends on Core only",
        "- UI.asmdef          — depends on Core only",
        "- Content/           — NO asmdef, assets only",
        "",
        "## Critical Rules",
        "1. NEVER modify files in ThirdParty/ or Plugins/",
        "2. NEVER move files outside the Unity Editor window",
        "3. NEVER create direct asset references in Gameplay/ or Core/",
        "4. ALL asset access through ContentRegistry ScriptableObject",
        "5. Stop and show diff after each file — wait for approval",
        "6. Do not refactor more than one script per turn",
        "",
        "## Do Not Touch",
    ]
    for t in assets['third_party'][:10]:
        lines.append(f"- Assets/{t}/")

    lines += [
        "",
        "## Refactor Phase",
        "CURRENT: Audit complete — awaiting Phase 2 (Interface Generation)",
        "```",
        "",
        "─" * 60,
        "## 8. SUGGESTED REFACTOR PRIORITY",
        "─" * 60,
    ]

    priority = []
    if scripts['js_files']:
        priority.append(f"CRITICAL: {len(scripts['js_files'])} UnityScript files must become C# before anything else")
    if unity_ver != 'Unknown':
        try:
            major = int(unity_ver.split('.')[0])
            if major < 2019:
                priority.append(f"HIGH: Unity {unity_ver} — upgrade to LTS before refactoring assets")
        except Exception:
            pass
    if not scripts['asmdef_files']:
        priority.append("HIGH: No .asmdef files — create assembly boundaries first")
    if not scripts['namespaces']:
        priority.append("MEDIUM: No namespaces — add before creating new classes")
    legacy_count = sum(len(v) for v in scripts['legacy_hits'].values())
    if legacy_count:
        priority.append(f"MEDIUM: {legacy_count} legacy API calls need updating")
    hardcoded_count = len(scripts['hardcoded_assets'])
    if hardcoded_count:
        priority.append(f"MEDIUM: {hardcoded_count} scripts with hardcoded asset refs — migration targets")

    if priority:
        for p in priority:
            lines.append(f"  → {p}")
    else:
        lines.append("  Project appears relatively modern — proceed to Phase 2")

    lines.append("")
    return "\n".join(lines)


# ─────────────────────────────────────────────
# ENTRY POINT
# ─────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description='Walk a Unity project and generate a CLAUDE.md population report'
    )
    parser.add_argument('project_path', help='Path to Unity project root')
    parser.add_argument('--out', default=None,
                        help='Output file path (default: print to stdout)')
    args = parser.parse_args()

    root = Path(args.project_path).resolve()
    if not root.exists():
        print(f"ERROR: Path does not exist: {root}")
        return

    print(f"Scanning: {root}")
    report = build_report(root)

    if args.out:
        Path(args.out).write_text(report, encoding='utf-8')
        print(f"Report written to: {args.out}")
    else:
        print("\n" + report)


if __name__ == '__main__':
    main()
