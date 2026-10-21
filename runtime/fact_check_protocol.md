# Fact-Check Gate Protocol

The factual-accuracy gate for adaptation passes. Lint (`adaptation_lint.py`) catches **structural** drift — wrong layer, bad refs, bad shapes. This gate catches **factual** drift: invented DCs, wrong item owners, claims that contradict `source.js` or the session record. It is the mechanical enforcement of the "Adaptation Quality Rules" in the project `CLAUDE.md` (grounded specialResources, navigable location IDs) — the rules live there; this gate enforces them.

## When it runs

- **Every update pass** — [`update_pass_protocol.md`](update_pass_protocol.md) Step 6: after lint PASSes, before the dashboard eyeball.
- **Every initial adaptation** — before the adaptation is reported complete ([`adaptation_protocol.md`](adaptation_protocol.md), Output section).

**Completion may not be reported while Critical findings > 0.** No exceptions. Fix the layer files, re-run the gate, re-run lint if layers changed.

## Inputs

1. The three layer files — `<prefix>.party.js`, `<prefix>.state.js`, `<prefix>.rulings.js`.
2. The source adventure — `adventures/<name>/source.js`.
3. **Update pass:** the session delta (`deltas/YYYY-MM-DD_delta.md`). **Initial adaptation:** the campaign + character context files the adaptation was built from.
4. The session summary the delta was built from (update pass), or the most recent session summary if state.js carries session facts (initial adaptation of an in-progress adventure).
5. `python adaptation_lint.py --claims <prefix>` — deterministic inventory of every `DC N` / `passive <ability> N` claim in the three layers, with file + JSON path. **Every inventoried claim must be dispositioned** (verified ✓ or written up as a finding). Verification of each claim is the fact-checker's job; the inventory guarantees none are missed.

## Method

**Fresh-context subagent(s) that did NOT write the pass** — Sonnet-class, mirroring the campaign pipeline's Stage 4.5 fact-check. The author of a pass never fact-checks their own work in the same context; self-review rubber-stamps its own assumptions. Split across 2–3 subagents by category when the adaptation is large (e.g. mechanics+fidelity vs. ownership+provenance).

Each subagent receives the relevant inputs plus the `--claims` inventory, and returns findings. Each finding records:

| Field | Content |
|---|---|
| File | which layer file |
| JSON-path | `$.scenes.V3.specialResources[1]`-style path (from `--claims` or located manually) |
| Claim | the claim as written, quoted |
| Evidence | the source.js / summary / character-file line that confirms or contradicts it |
| Severity | Critical or Warning |

If a prior audit or fact-check file exists for this adaptation, give it to the subagents as a baseline: findings the DM has already reviewed and accepted (flavor-tier caveats, deliberate deviations recorded in rulings.js) don't re-block. An old **unfixed** Critical still blocks — age doesn't downgrade an invented mechanic.

## Check categories

1. **Mechanics grounding** — every DC, check, passive-score, or creature-stat claim in adaptation prose traces to `source.js` (or to an explicit `dcAdjustments` entry). The canonical Critical (from CLAUDE.md): *"Henry's passive Perception 18 spots the crimson door's trap"* when no Perception check exists in the source. Also in scope: abilities treated as ambient that are actually actions/rituals/limited-use (Detect Magic always-on, Divine Sense as passive floodlight, once-per-rest features invoked in every scene).
2. **Ownership** — items and capabilities attributed to the right PC. Control ≠ ownership (same rule as the campaign entity-ownership manifests). Verify every possessive against the character context files.
3. **Source fidelity** — quoted values (HP, AC, damage dice, save bonuses, room contents, NPC names, door/exit topology) match `source.js` exactly.
4. **State provenance** — every state.js assertion traces to the delta / session summary. Nothing asserted that didn't happen; nothing stale carried forward that the summary contradicts.
5. **Ruling fidelity** — appended rulings.js entries match what the DM actually ruled per the delta (wording, scope, sceneRefs). A "ruling" the DM never made is Critical.
6. **Navigable location refs** — prose says "V3 (War Room)", not "the war room" (Warning tier; the dashboard auto-links location IDs).

## Severity

- **Critical** — invented mechanics or checks, wrong owner, contradicts source.js or the session summary, ruling the DM didn't make. **Blocks completion.**
- **Warning** — style issues, thin grounding (claim plausible but not verifiable from inputs), non-navigable location refs, hedging that should be firmer. Doesn't block; **must be listed in the completion report**.

## Output

Findings file next to the delta:

- Update pass: `adventures/<name>/adapted/deltas/YYYY-MM-DD_factcheck.md` (session date, matching the delta).
- Initial adaptation: `adventures/<name>/adapted/deltas/YYYY-MM-DD_factcheck_initial.md` (adaptation date).

Contents: inputs used (with claims-inventory count), findings grouped by category (each with file / JSON-path / claim / evidence / severity), and a scoreboard (Critical and Warning counts).

**Re-runs append.** After fixing Criticals, re-run the gate and append a dated **Re-check** section to the same file recording what was fixed and the new counts — never a new file. The file's final section must show Critical = 0 before the pass may be reported complete.
