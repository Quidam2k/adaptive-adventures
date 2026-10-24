#!/usr/bin/env python3
"""Deterministic lint for adaptation layer files (party / state / rulings).

Usage:
    python adaptation_lint.py adventures/shadowkeep/adapted/undermountain
    python adaptation_lint.py <prefix> [<prefix> ...]
    python adaptation_lint.py --claims <prefix> [<prefix> ...]

Each <prefix> names a three-file adaptation: <prefix>.party.js, <prefix>.state.js,
<prefix>.rulings.js. Paths are relative to this script's directory (project root)
or absolute.

Checks (all deterministic, no LLM):
  1. Parse contract — each layer file is `window.<EXPECTED_GLOBAL> = <strict JSON>;`
     (optional // comment header allowed above the assignment).
  2. Layer classification — state.js top-level keys within its allowlist; state.js
     per-scene keys within the state-key list; party.js carries none of the state
     keys (top-level or per-scene).
  3. Single source of truth — no key present in both layers (top-level or within
     the same scene), `scenes` container excepted.
  4. Rulings shape — every entry has ISO date, non-empty ruling, sceneRefs array;
     entries in chronological (non-decreasing) date order.
  5. sceneRefs validity — every ref resolves to a source location / trigger-scene /
     scene id, or to a scene id defined by the adaptation itself (party or state).
     Source ids are extracted by shelling out to node (source.js is hand-written JS).
  6. Mojibake — cp1252 double-encoding sequences in any layer file or source.js.
  7. Currency — state.js has continuityBriefing.lastSessionDate (ISO date).
  8. Improvised places — every state.js improvisedLocations entry names a `parent`
     that is a source id and carries only known keys; partyAt resolves to a source
     id or an improvised id. Improvised ids are valid sceneRefs.

Exit code 0 = all prefixes PASS, 1 = any finding (or usage error).

--claims mode (informational, exit 0): prints a deterministic inventory of every
`DC <n>` / `passive <ability> <n>` claim in the three layers' string values, with
file + JSON path — the fact-check gate's checklist (runtime/fact_check_protocol.md).
Verification of each claim is the fact-checker's job; the inventory guarantees
none are missed. Default lint behavior is unchanged.

Protocol: runtime/update_pass_protocol.md
"""
import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))

LAYERS = {
    'party':   'ADVENTURE_ADAPTATION_PARTY',
    'state':   'ADVENTURE_ADAPTATION_STATE',
    'rulings': 'ADVENTURE_ADAPTATION_RULINGS',
}

# Layer classification (see runtime/update_pass_protocol.md "Layer classification").
STATE_TOP_ALLOW = {'continuityBriefing', 'storyTracker', 'forSession', 'scenes',
                   'improvisedLocations', 'partyAt'}
# Improvised places: table-made rooms the source doesn't have (#9287).
IMPROVISED_KEYS = {'parent', 'name', 'key', 'summary', 'readAloud', 'sessionState',
                   'creatures', 'connections'}
STATE_SCENE_KEYS = {
    'sessionState',                    # Shadowkeep pattern (default for new adventures)
    'status', 'currentState', 'openingBeatsForNextSession',
    'stateChangesAlreadyResolved', 'session1_outcomes', 'carryForward',
    'stubStatus', 'reasonRetired', 'reason',                  # WBtW pattern
}

ISO_DATE = re.compile(r'^\d{4}-\d{2}-\d{2}$')

# --claims inventory: mechanical claims the fact-check gate must disposition.
CLAIM = re.compile(r'DC \d+|passive \w+ \d+', re.IGNORECASE)

# Mojibake = cp1252 double-encoding: U+00E2 followed by U+20AC (the 'a-circ euro'
# start of mangled em dashes / curly quotes), or U+00C2/U+00C3 followed by a
# cp1252-tail char. Plain accented letters (U+00E9, U+00FB, ...) never match.
MOJIBAKE = re.compile(
    '\u00e2\u20ac'
    '|[\u00c2\u00c3]['
    '\u00a0-\u00bf'                                    # NBSP..inverted-?  (covers raquo, times)
    '\u20ac\u201a\u0192\u201e\u2026\u2020\u2021\u02c6\u2030\u0160'
    '\u2039\u0152\u017d\u2018\u2019\u201c\u201d\u2022\u2013\u2014'
    '\u02dc\u2122\u0161\u203a\u0153\u017e\u0178'
    ']')

# Optional BOM + // comment header, then the assignment, then strict JSON, then ';'
CONTRACT = re.compile(
    '^\ufeff?\\s*(?://[^\\n]*\\n\\s*)*'
    r'window\.([A-Z_][A-Z0-9_]*)\s*=\s*(.*?);?\s*$',
    re.DOTALL)

NODE_ID_SCRIPT = """
const fs = require('fs');
const p = %s;
const w = {}; const window = w;
eval(fs.readFileSync(p, 'utf8'));
const s = w.ADVENTURE_SOURCE;
if (!s) { console.error('no ADVENTURE_SOURCE global in ' + p); process.exit(2); }
const ids = [];
function collect(v) {
  if (!v) return;
  if (Array.isArray(v)) { for (const x of v) if (x && x.id) ids.push(x.id); }
  else if (typeof v === 'object') {
    for (const k of Object.keys(v)) if (!k.startsWith('_')) ids.push(k);
  }
}
collect(s.locations); collect(s.triggerScenes); collect(s.scenes);
console.log(JSON.stringify(ids));
"""


def display(path):
    """Project-relative path for findings; absolute if on a different drive."""
    try:
        return os.path.relpath(path, ROOT)
    except ValueError:
        return path


class Findings:
    def __init__(self):
        self.items = []

    def add(self, file, path, message):
        self.items.append((file, path, message))


def parse_layer(path, expected_global, findings):
    """Return the parsed JSON body, or None on any parse-contract finding."""
    rel = display(path)
    if not os.path.isfile(path):
        findings.add(rel, '$', 'file missing')
        return None
    text = open(path, encoding='utf-8').read()
    m = CONTRACT.match(text)
    if not m:
        findings.add(rel, '$', 'does not match contract `window.<GLOBAL> = {...};` '
                               '(optional // header allowed)')
        return None
    if m.group(1) != expected_global:
        findings.add(rel, '$', 'wrong global: window.%s (expected window.%s)'
                     % (m.group(1), expected_global))
        return None
    try:
        return json.loads(m.group(2))
    except json.JSONDecodeError as e:
        findings.add(rel, '$', 'body is not strict JSON: %s' % e)
        return None


def check_mojibake(path, findings):
    rel = display(path)
    if not os.path.isfile(path):
        return
    for lineno, line in enumerate(open(path, encoding='utf-8'), 1):
        m = MOJIBAKE.search(line)
        if m:
            findings.add(rel, 'line %d' % lineno,
                         'mojibake sequence %s (cp1252 double-encoding)'
                         % ascii(m.group(0)))


def source_ids(source_path, findings):
    """Extract location / trigger-scene / scene ids from source.js via node."""
    rel = display(source_path)
    if not os.path.isfile(source_path):
        findings.add(rel, '$', 'sourceRef does not resolve to a file')
        return None
    script = NODE_ID_SCRIPT % json.dumps(source_path.replace('\\', '/'))
    try:
        out = subprocess.run(['node', '-e', script], capture_output=True,
                             text=True, encoding='utf-8', timeout=60)
    except FileNotFoundError:
        findings.add(rel, '$', 'node not found on PATH — cannot extract source ids')
        return None
    if out.returncode != 0:
        findings.add(rel, '$', 'node failed to load source.js: %s'
                     % out.stderr.strip()[:200])
        return None
    return set(json.loads(out.stdout))


def lint_prefix(prefix):
    findings = Findings()
    prefix_abs = prefix if os.path.isabs(prefix) else os.path.join(ROOT, prefix)
    paths = {layer: prefix_abs + '.%s.js' % layer for layer in LAYERS}
    docs = {layer: parse_layer(paths[layer], g, findings)
            for layer, g in LAYERS.items()}
    party, state, rulings = docs['party'], docs['state'], docs['rulings']

    def relp(layer):
        return display(paths[layer])

    # --- classification: state.js keys ---
    if state is not None:
        for k in state:
            if k not in STATE_TOP_ALLOW:
                findings.add(relp('state'), '$.%s' % k,
                             'top-level key not in state allowlist %s'
                             % sorted(STATE_TOP_ALLOW))
        for sid, scene in (state.get('scenes') or {}).items():
            for k in scene:
                if k not in STATE_SCENE_KEYS:
                    findings.add(relp('state'), '$.scenes.%s.%s' % (sid, k),
                                 'scene key not in state-key list (belongs in party.js?)')

    # --- classification: party.js must carry no state keys ---
    if party is not None:
        for k in party:
            if k in STATE_TOP_ALLOW - {'scenes'}:
                findings.add(relp('party'), '$.%s' % k,
                             'state-layer key in party.js (belongs in state.js)')
        for sid, scene in (party.get('scenes') or {}).items():
            for k in scene:
                if k in STATE_SCENE_KEYS:
                    findings.add(relp('party'), '$.scenes.%s.%s' % (sid, k),
                                 'state-layer scene key in party.js (belongs in state.js)')

    # --- single source of truth: no key in both layers ---
    if party is not None and state is not None:
        for k in set(party) & set(state) - {'scenes'}:
            findings.add(relp('state'), '$.%s' % k,
                         'key present in both party.js and state.js')
        shared_scenes = set(party.get('scenes') or {}) & set(state.get('scenes') or {})
        for sid in sorted(shared_scenes):
            both = set(party['scenes'][sid]) & set(state['scenes'][sid])
            for k in sorted(both):
                findings.add(relp('state'), '$.scenes.%s.%s' % (sid, k),
                             'scene key present in both party.js and state.js')

    # --- rulings shape + order ---
    entries = []
    if rulings is not None:
        entries = rulings.get('rulings')
        if not isinstance(entries, list):
            findings.add(relp('rulings'), '$.rulings', 'missing or not an array')
            entries = []
        prev_date = None
        for i, e in enumerate(entries):
            p = '$.rulings[%d]' % i
            if not isinstance(e, dict):
                findings.add(relp('rulings'), p, 'entry is not an object')
                continue
            date = e.get('date')
            if not (isinstance(date, str) and ISO_DATE.match(date)):
                findings.add(relp('rulings'), p + '.date',
                             'missing or not an ISO date (YYYY-MM-DD)')
                date = None
            if not (isinstance(e.get('ruling'), str) and e['ruling'].strip()):
                findings.add(relp('rulings'), p + '.ruling', 'missing or empty')
            if not isinstance(e.get('sceneRefs'), list):
                findings.add(relp('rulings'), p + '.sceneRefs', 'missing or not an array')
            if date and prev_date and date < prev_date:
                findings.add(relp('rulings'), p + '.date',
                             'out of chronological order (%s after %s) — '
                             'rulings are append-only' % (date, prev_date))
            if date:
                prev_date = date

    # --- sceneRefs validity ---
    src_path = None
    if party is not None and isinstance(party.get('sourceRef'), str):
        src_path = os.path.normpath(os.path.join(ROOT, party['sourceRef']))
    elif party is not None:
        findings.add(relp('party'), '$.sourceRef', 'missing (needed to locate source.js)')
    valid_ids = source_ids(src_path, findings) if src_path else None
    if valid_ids is not None:
        adaptation_ids = set()
        for doc in (party, state):
            if doc is not None:
                adaptation_ids |= set(doc.get('scenes') or {})
        source_only = set(valid_ids)
        valid_ids |= adaptation_ids
        improvised = (state or {}).get('improvisedLocations') or {}
        for iid, place in improvised.items():
            p = '$.improvisedLocations.%s' % iid
            if not isinstance(place, dict):
                findings.add(relp('state'), p, 'entry is not an object')
                continue
            if place.get('parent') not in source_only:
                findings.add(relp('state'), p + '.parent',
                             'parent %r is not a source id' % place.get('parent'))
            for k in sorted(set(place) - IMPROVISED_KEYS):
                findings.add(relp('state'), p + '.' + k,
                             'unknown improvised-place key (allowed: %s)' % sorted(IMPROVISED_KEYS))
            if not (isinstance(place.get('name'), str) and place['name'].strip()):
                findings.add(relp('state'), p + '.name', 'missing or empty')
        valid_ids |= set(improvised)
        party_at = (state or {}).get('partyAt')
        if party_at is not None and party_at not in valid_ids:
            findings.add(relp('state'), '$.partyAt',
                         'partyAt %r is not a source or improvised id' % party_at)
        for i, e in enumerate(entries):
            if isinstance(e, dict) and isinstance(e.get('sceneRefs'), list):
                for ref in e['sceneRefs']:
                    if ref not in valid_ids:
                        findings.add(relp('rulings'),
                                     '$.rulings[%d].sceneRefs' % i,
                                     'unknown scene ref %r (not a source or '
                                     'adaptation scene id)' % ref)

    # --- currency ---
    if state is not None:
        lsd = (state.get('continuityBriefing') or {}).get('lastSessionDate')
        if not (isinstance(lsd, str) and ISO_DATE.match(lsd)):
            findings.add(relp('state'), '$.continuityBriefing.lastSessionDate',
                         'missing or not an ISO date — state.js must say when it '
                         'was last rewritten')

    # --- mojibake: all three layers + source.js ---
    for layer in LAYERS:
        check_mojibake(paths[layer], findings)
    if src_path:
        check_mojibake(src_path, findings)

    return findings


def iter_strings(node, path='$'):
    """Yield (json_path, string) for every string value in a parsed document."""
    if isinstance(node, dict):
        for k, v in node.items():
            yield from iter_strings(v, '%s.%s' % (path, k))
    elif isinstance(node, list):
        for i, v in enumerate(node):
            yield from iter_strings(v, '%s[%d]' % (path, i))
    elif isinstance(node, str):
        yield path, node


def claims_prefix(prefix):
    """Print the DC / passive-score claim inventory for one prefix."""
    prefix_abs = prefix if os.path.isabs(prefix) else os.path.join(ROOT, prefix)
    total = 0
    for layer, expected_global in LAYERS.items():
        path = prefix_abs + '.%s.js' % layer
        parse_findings = Findings()
        doc = parse_layer(path, expected_global, parse_findings)
        for file, jpath, message in parse_findings.items:
            print('  NOTE  %s  %s: %s (skipped)' % (file, jpath, message))
        if doc is None:
            continue
        rel = display(path)
        for jpath, s in iter_strings(doc):
            for m in CLAIM.finditer(s):
                total += 1
                start = max(0, m.start() - 30)
                snippet = s[start:m.end() + 30].replace('\n', ' ')
                if start > 0:
                    snippet = '...' + snippet
                if m.end() + 30 < len(s):
                    snippet += '...'
                print('  CLAIM  %s  %s: %s  |  %s'
                      % (rel, jpath, m.group(0), snippet))
    print('  TOTAL: %d claim%s' % (total, 's' if total != 1 else ''))


def main(argv):
    args = argv[1:]
    claims_mode = args and args[0] == '--claims'
    if claims_mode:
        args = args[1:]
    if not args:
        print(__doc__)
        return 1
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except AttributeError:
        pass
    if claims_mode:
        for prefix in args:
            print('== %s' % prefix)
            claims_prefix(prefix.rstrip('/').removesuffix('.js'))
        return 0
    any_fail = False
    for prefix in args:
        findings = lint_prefix(prefix.rstrip('/').removesuffix('.js'))
        print('== %s' % prefix)
        for file, path, message in findings.items:
            print('  FAIL  %s  %s: %s' % (file, path, message))
        if findings.items:
            any_fail = True
            print('  RESULT: FAIL (%d finding%s)'
                  % (len(findings.items), 's' if len(findings.items) != 1 else ''))
        else:
            print('  RESULT: PASS')
    return 1 if any_fail else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv))
