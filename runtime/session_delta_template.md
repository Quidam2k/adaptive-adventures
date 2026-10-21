# Session Delta — [ADVENTURE] / [PARTY] — YYYY-MM-DD

One instance per update pass. Save as `adventures/<name>/adapted/deltas/YYYY-MM-DD_delta.md` (session date). Fill this out **before** editing any layer file — see [`update_pass_protocol.md`](update_pass_protocol.md) Step 1. This file is the provenance record: every change made to the layer files this pass must trace back to a line here.

## Session

- **Session date:**
- **Summary source:** `[path to polish summary]`
- **DM clarifications:** `[path, or "none"]`

## Scenes touched

One block per scene that changed at the table. Use source/adaptation scene ids (V3, S_carousel, ...).

### [scene id] — [scene name]

- **What happened at the table:**
- **What state.js should now say:** (status, resolved/pending, NPC status, cliffhanger)

## New rulings

Only rulings the DM actually made at (or for) the table. Mark each **LOCKED** (→ append to rulings.js) or **SUGGEST, DON'T LOG** (→ party.js `rulesAmbiguitiesToPreEmpt`, or open threads below).

| Date | Ruling (exact wording to log) | sceneRefs | LOCKED? |
|---|---|---|---|
| | | | |

## Party changes

New items, level-ups, roster changes, new standing capabilities — with the `adaptationHistory` note each will get. Usually:

- **None.**

## Open threads / pending DM decisions

Things the session raised that no layer file can absorb yet (unresolved rules questions, "DM will decide before next session", dangling plot state the DM hasn't committed to).

-

## Pass checklist

- [ ] state.js rewritten wholesale; `lastSessionDate` advanced to session date
- [ ] rulings.js: LOCKED rulings appended (no edits to existing entries)
- [ ] party.js: untouched / touched only for the party changes listed above
- [ ] `python adaptation_lint.py <prefix>` → PASS (paste result below)
- [ ] Fact-check gate ([`fact_check_protocol.md`](fact_check_protocol.md)): findings file saved, **Critical = 0** (path + counts below)
- [ ] Dashboard eyeball: Tonight + every touched scene render correctly (hard-refresh first)

**Lint result:**

```
[paste]
```

**Fact-check findings:** `deltas/YYYY-MM-DD_factcheck.md` — Critical: 0, Warnings: N

**Dashboard spot-check notes:**
