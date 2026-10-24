# Update Pass Protocol

The post-session update pass: how an adaptation's layer files get refreshed after a session is played. This is the operating manual; the three-file layer spec itself lives in [`adaptation_protocol.md`](adaptation_protocol.md) — read that first if the party/state/rulings split is unfamiliar.

Every pass follows the same seven steps, in order. The pass is complete only when Step 5 (lint), Step 6 (fact-check gate), and Step 7 (dashboard eyeball) all pass. **Completion may not be reported with lint FAILs or Critical fact-check findings outstanding.**

## Inputs

1. **Session summary** — the polish version (`[DATE]_session_summary_polish.md`).
2. **DM clarifications** — `[DATE]_clarifications.md`, if the clarification form ran.
3. **The three current layer files** — `<prefix>.party.js`, `<prefix>.state.js`, `<prefix>.rulings.js`.
4. **The source adventure** — `adventures/<name>/source.js` (never modified; consulted for scene ids and mechanics).

## Step 1 — Session delta first

Fill out [`session_delta_template.md`](session_delta_template.md) **before touching any layer file**. Save it to `adventures/<name>/adapted/deltas/YYYY-MM-DD_delta.md` (session date, not processing date).

The delta is the pass's provenance record. The layer files are JS, so the `<!-- src:MM.DD Lxxx -->` citation convention from the markdown context files doesn't apply; the delta file carries the session→change mapping instead. If a future reader asks "why does state.js say this?", the answer must be findable in a delta file.

The delta also forces classification up front: every observed change gets sorted into **state** / **ruling** / **party** before any editing starts. Misclassification caught here costs nothing; caught after editing, it costs a re-pass.

## Step 2 — state.js: rewrite wholesale

Rewrite `<prefix>.state.js` from the delta plus the prior state. **Nothing in state.js is preserved by default** — carrying a stale paragraph forward is a bug, not caution. If a fact is still true, it's re-stated because the delta + prior state say it's still true, not because it was already in the file.

- `continuityBriefing.lastSessionDate` **must advance** to the new session date (lint enforces presence; you enforce advancement).
- `continuityBriefing` is the Tonight view — write it for the DM sitting down to prep: where they are, what they're doing, likely next actions, prep focus.
- Scene entries whose state resolved to "nothing pending, nothing changed from source" are **dropped**, not kept with empty fields.

## Step 3 — rulings.js: append only

New locked rulings get `{ "date": "YYYY-MM-DD", "ruling": "...", "sceneRefs": [...] }` entries **appended** to the array. Never edit, reword, reorder, or delete existing entries — lint enforces chronological order, which makes silent edits detectable.

A ruling is **locked** only if the DM actually ruled it at (or for) the table. Pre-emptive suggestions ("we should probably rule X before it comes up") are not rulings — they go in party.js under `combatBriefing.rulesAmbiguitiesToPreEmpt` (or the delta's open-threads list if no scene fits).

`sceneRefs` use source location / trigger-scene / scene ids (or adaptation-defined scene ids) so the dashboard can surface the ruling on those views. Empty `[]` is valid for campaign-wide rulings.

## Step 4 — party.js: touched only for real party changes

`<prefix>.party.js` changes only for: a new item, a level-up, a roster change, or a new standing capability. Each such change also gets an `adaptationHistory` entry (`{ date, note }`).

**If a pass wants to edit party.js for anything else, that's a classification smell.** Stop and re-check the delta — the change is almost certainly session state (→ Step 2) or a ruling (→ Step 3).

## Layer classification

What goes where, codified from the Phase 3 split (2026-07-17). `adaptation_lint.py` enforces these lists mechanically.

### state.js top-level keys (allowlist)

| Key | Meaning |
|---|---|
| `continuityBriefing` | The Tonight view (required; must carry `lastSessionDate`) |
| `storyTracker` | Cross-scene narrative state (WBtW) |
| `forSession` | Next-session framing block (WBtW) |
| `scenes` | Per-scene state container |
| `partyAt` | Where the party is right now: a source location id or an `improvisedLocations` id. Drives the ◆ party marker in the sidebar. Omit it when unsure; no marker is better than a guessed one. |
| `improvisedLocations` | Places the table invented that the book doesn't have (see below) |

### Improvised places (since 2026-10-23, #9287)

When the party goes somewhere the source has no location for (a cave the DM improvised, a side room), give it its own entry instead of burying it in the nearest location's `sessionState`:

```json
"partyAt": "I_l12_minotaur_gate",
"improvisedLocations": {
  "I_l12_minotaur_gate": {
    "parent": "L_l12_tunnel_top",
    "name": "The minotaur gate",
    "summary": "One line, shown in hover previews and the sidebar.",
    "readAloud": "...", "sessionState": { }, "creatures": [ ], "connections": [ ]
  }
}
```

- Ids start with `I_`. `parent` must be a **source** location id; the dashboard files the page under it (key = parent key + a, b, … unless you set `key`) and no longer lists it as an orphan.
- Allowed keys: `parent`, `name`, `key`, `summary`, `readAloud`, `sessionState`, `creatures`, `connections` (`IMPROVISED_KEYS` in `adaptation_lint.py`). `name` is required.
- Both fields are additive: a state file without them renders exactly as before.
- This supersedes the older rule "put the improvised place under the nearest source location's `sessionState`". Migrate such entries when you next touch that adaptation.

### state.js per-scene keys

| Adventure | State keys per scene |
|---|---|
| Shadowkeep (default for new adventures) | `sessionState` |
| WBtW | `status`, `currentState`, `openingBeatsForNextSession`, `stateChangesAlreadyResolved`, `session1_outcomes`, `carryForward`, `stubStatus`, `reasonRetired`, `reason` |

**Default for new adventures:** use the Shadowkeep pattern — one `sessionState` object per scene holding status / resolved / pending / NPC status / cliffhanger. Only grow a WBtW-style key set if a single object genuinely doesn't fit, and add any new state keys to `STATE_SCENE_KEYS` in `adaptation_lint.py` in the same commit.

Everything not in these lists is party-layer (or rulings). No key may appear in both layers — each fact lives in exactly one file (the renderer may *display* it in several places).

## File format contract

Every layer file is:

```js
// optional comment header (any number of // lines)
window.<GLOBAL> = <strict JSON>;
```

with globals `ADVENTURE_ADAPTATION_PARTY` / `_STATE` / `_RULINGS` matching the `.party.js` / `.state.js` / `.rulings.js` suffix. The body is **strict JSON** — double-quoted keys, no trailing commas, no comments, no JS expressions. This is what makes the files Python-lintable; an update pass that emits non-JSON bodies breaks the toolchain even if the browser still loads it.

## Step 5 — run the linter

```
python adaptation_lint.py adventures/<name>/adapted/<prefix>
```

Fix every FAIL and re-run until PASS. Findings cover: parse contract, layer classification, single-source-of-truth, rulings shape and order, sceneRef validity (against source + adaptation scene ids), mojibake, and `lastSessionDate` presence.

## Step 6 — fact-check gate

Run the gate per [`fact_check_protocol.md`](fact_check_protocol.md): fresh-context subagent(s) that did **not** write this pass verify the pass's claims against `source.js`, the delta, and the session summary — mechanics grounding, ownership, source fidelity, state provenance, ruling fidelity, navigable location refs. The deterministic claim inventory feeds it:

```
python adaptation_lint.py --claims adventures/<name>/adapted/<prefix>
```

Findings land in `adventures/<name>/adapted/deltas/YYYY-MM-DD_factcheck.md`. Fix every **Critical** finding in the layer files (classification rules above still apply — a fix goes in the layer the fact belongs to), re-run the gate until Critical = 0, and re-run Step 5's lint after any layer edit. Warnings don't block, but must be listed in the completion report.

## Step 7 — dashboard eyeball

Load the dashboard (local server, e.g. `:8899` — **hard-refresh first**; the browser caches `manifest.local.js` and the layer files aggressively) and check:

1. **Tonight view** reflects the new session — date, where-they-are, next actions.
2. **Every scene the delta touched** renders and reads correctly (session state, any new Table Rulings block).
3. Console shows no new errors (favicon 404 is the known baseline).

Record the lint result, the fact-check findings file (with its final Critical/Warning counts), and the eyeball confirmation in the delta file's checklist. Then — and only then — the pass is done.
