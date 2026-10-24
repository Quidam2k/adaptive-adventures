# Adaptation Protocol — Draft v0.1

How the LLM runtime transforms a party-agnostic adventure into a party-specific playthrough.

## Inputs

1. **Source adventure** — the structured data file from `adventures/[name]/source.js`.
2. **Campaign context** — `[Campaign]_campaign_context.md` (the Story So Far, current situation, themes, threads).
3. **Character context** — one `[Campaign]_[CharName].md` per PC (In Action blurb, identity, capabilities, story).
4. **Optional DM steering** — free-text instructions ("lean horror", "emphasize the diplomacy angle", etc).

## Output

**Three companion files** at `adventures/[name]/adapted/`, split by lifecycle so an update pass rewrites only what actually changes. Never mutate the source. Each file assigns its own global; the dashboard loads them in order (via the manifest entry's `files: [...]` array) and deep-merges them.

### 1. `[party].party.js` → `window.ADVENTURE_ADAPTATION_PARTY`

The **stable layer** — changes rarely (new item, level-up, roster change):

```js
{
  sourceRef: "adventures/[name]/source.js",
  campaign: "CFK | AoA | Undermountain",
  party: ["Alkali", "Briarheart", ...],
  partyLevel: 12,
  adaptedAt: "2026-04-15",
  adapterPolicies: { /* standing rules the adapter follows */ },
  campaignIntegration: { /* hook status, thread mapping */ },

  // Stable additions keyed by scene id — add to, don't replace, source fields
  scenes: {
    [sceneId]: {
      ifTheyAsk_additions: [ /* new Q&As tied to party capabilities */ ],
      specialResources: [ /* filled-in resources with named PC owners */ ],
      passiveRevelations: { /* what passive scores reveal here */ },
      combatBriefing: { /* DM-side combat prep for this scene */ },
      tacticalNotes: { /* optional */ }
    }
  },

  narrationVoice: { /* campaign tone + per-PC voice notes */ },
  dcAdjustments: { /* scaled to party level */ },
  campaignCallbacks: { /* DM-decision intersections with campaign threads */ },
  adaptationHistory: [ { date, note }, ... ],
  notes: "Why the adapter made the choices it made."
}
```

### 2. `[party].state.js` → `window.ADVENTURE_ADAPTATION_STATE`

The **volatile layer** — **rewritten wholesale** at every post-session update pass:

```js
{
  continuityBriefing: { /* the Tonight view: where they are, what's next, prep focus */ },
  partyAt: "<source or improvised id>",          // optional: the ◆ party marker
  improvisedLocations: { /* table-invented places, see update_pass_protocol.md */ },
  scenes: {
    [sceneId]: {
      sessionState: { /* status, resolved/unresolved/pending, NPC status, cliffhanger */ }
    }
  }
}
```

### 3. `[party].rulings.js` → `window.ADVENTURE_ADAPTATION_RULINGS`

The **append-only layer** — update passes append entries, never edit or delete old ones:

```js
{
  campaign: "...",
  rulings: [
    { date: "2026-04-23",
      ruling: "The holy blade's light persists in magical darkness — locked, no hedging.",
      sceneRefs: ["S3", "L2"] }  // source scene/location ids
  ]
}
```

The dashboard surfaces rulings on their referenced scenes (a Table Rulings block, visible in Play mode) and on the Rulings Log reference page.

**Single source of truth:** each fact lives in exactly one layer. The renderer may display a fact in two places; the data stores it once. Old single-file adaptations (`{ file: "..." }` manifest entries assigning `window.ADVENTURE_ADAPTATION`) remain loadable for archival snapshots.

**Completion gate:** an initial adaptation is not complete until `python adaptation_lint.py <prefix>` PASSes **and** the fact-check gate ([`fact_check_protocol.md`](fact_check_protocol.md)) reports zero Critical findings (findings file: `adventures/[name]/adapted/deltas/YYYY-MM-DD_factcheck_initial.md`). The same gate runs on every subsequent update pass — see [`update_pass_protocol.md`](update_pass_protocol.md).

## Transformation Rules

### 1. Skill reshaping
For each trial task, look at the source `skills` list. Keep any skill that at least one PC has proficiency/expertise in. If fewer than 3 skills survive, add adjacent skills the party IS strong in (e.g. swap Religion → Arcana if no one has Religion but multiple have Arcana).

### 2. DC scaling
Compare source `tier` to party level. Scale DCs per a simple table (to be calibrated):
- heroes (1-4): base DC
- veterans (5-10): +2
- champions (11-16): +4
- epic (17-20): +6

Adapter may deviate with a note.

### 3. Special resource generation
For each `specialResourceSlots` entry, scan the party's character contexts for a match to `criterion`. Generate a named resource (e.g. slot criterion "radiant damage source" + Bueller has Sunblade → "Sunblade (Bueller) — 1 auto-success on Task B").

Aim for: **every PC gets at least one resource moment in each trial scene.** If a PC has no match, invent one from their capabilities ("Grumpf's Detect Magic ritual reveals the ward anchors").

### 4. IF THEY ASK augmentation
For each scene, generate 2-4 party-specific questions the players are likely to ask given their character sheets and campaign context. Always include answers that reference in-setting facts from the campaign context.

### 5. Narration voice
Match established campaign tone. For CFK, lean mythic/tragic. For AoA, lean grounded/personal. For Undermountain, lean noir-heist. Source narrations are starting points; adapter may rewrite for voice (store in `taskNarrations_overrides`).

### 6. Callbacks
When campaign context mentions ongoing threads (mysteries, chekhov's guns, unanswered player questions) that rhyme with adventure content, add IF THEY ASK entries or scene hooks that surface the connection. The adapter note should explain the callback.

## Player-Safe Guarantee

Adaptation MUST preserve the player-safe tagging from the source. Anything added must be tagged too. When in doubt, tag as DM-only.

## Non-Goals

- Don't rewrite plot. Scene structure, NPC motivations, and outcome branches stay as authored.
- Don't invent loot or magic items unless the source declares a slot.
- Don't alter outcome thresholds (failure counts, interest levels) — DC scaling only.

## Prompt Template (stub — to be built after first import)

```
SYSTEM: You are an adventure adaptation runtime. Read the source adventure, the campaign context, and the character contexts. Produce the three adaptation layer files (party / state / rulings) per the schema in schema/scene_schema.md and the rules in runtime/adaptation_protocol.md. Preserve source fields; only add or override per the rules.

USER:
<source adventure>
<campaign context>
<character contexts>
<optional DM steering>
```
