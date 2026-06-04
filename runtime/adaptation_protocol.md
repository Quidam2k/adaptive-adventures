# Adaptation Protocol — Draft v0.1

How the LLM runtime transforms a party-agnostic adventure into a party-specific playthrough.

## Inputs

1. **Source adventure** — the structured data file from `adventures/[name]/source.js`.
2. **Campaign context** — `[Campaign]_campaign_context.md` (the Story So Far, current situation, themes, threads).
3. **Character context** — one `[Campaign]_[CharName].md` per PC (In Action blurb, identity, capabilities, story).
4. **Optional DM steering** — free-text instructions ("lean horror", "emphasize the diplomacy angle", etc).

## Output

A **companion adaptation file** at `adventures/[name]/adapted/[campaign]-[YYYY-MM-DD].js`. Never mutate the source.

Structure:

```js
{
  sourceRef: "adventures/[name]/source.js",
  campaign: "CFK | AoA | Undermountain",
  party: ["Alkali", "Briarheart", ...],
  adaptedAt: "2026-04-15",

  // Layered additions/overrides keyed by scene id
  scenes: {
    [sceneId]: {
      // Add to, don't replace, source fields
      ifTheyAsk_additions: [ /* new Q&As tied to party capabilities */ ],
      specialResources: [ /* filled-in resources with named PC owners */ ],
      taskNarrations_overrides: { /* optional voice/tone matching campaign */ },
      dcAdjustments: { /* scaled to party level */ },
      skillSubstitutions: { /* reshape task skills to party's strengths */ }
    }
  },

  // Adapter's rationale — useful for debugging and iteration
  notes: "Why the adapter made the choices it made."
}
```

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
SYSTEM: You are an adventure adaptation runtime. Read the source adventure, the campaign context, and the character contexts. Produce an adaptation file per the schema in schema/scene_schema.md and the rules in runtime/adaptation_protocol.md. Preserve source fields; only add or override per the rules. Return a single JSON object.

USER:
<source adventure>
<campaign context>
<character contexts>
<optional DM steering>
```
