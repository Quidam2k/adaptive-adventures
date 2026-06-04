# Scene Description Language — Draft v0.1

This is the **party-agnostic** schema. Adaptation fields (per-party customization) live in a separate companion file per play-through.

> ⚠️ **Draft.** Expect this to shift once we decompose the first *Where Evil Lives* one-shot. Schema follows content, not the other way around.

## Top-Level Adventure

```js
{
  meta: {
    title: "Adventure Name",
    source: "Where Evil Lives, pp. 42-58",
    author: "MCDM",
    tier: "heroes",              // heroes / veterans / champions / epic — abstract, adapter scales to edition
    partySize: { min: 3, max: 6 },
    expectedLength: "one-shot",  // one-shot / short-arc / long-arc
    tags: ["horror", "dungeon", "heist"],
    summary: "One paragraph pitch. What happens and why it's interesting."
  },

  hooks: [
    // How the party gets pulled in. Multiple options; adapter picks one that fits the campaign.
    { type: "patron",  text: "..." },
    { type: "rumor",   text: "..." },
    { type: "accident", text: "..." }
  ],

  scenes: {
    [sceneId]: { /* see Scene schema below */ }
  },

  // Optional: the graph. If omitted, scenes are assumed linear in declaration order.
  flow: {
    start: "sceneId_1",
    edges: [
      { from: "sceneId_1", to: "sceneId_2", condition: "default" },
      { from: "sceneId_1", to: "sceneId_3", condition: "if they choose to parley" }
    ]
  },

  // Cross-scene elements
  cast: { [npcId]: { /* NPC schema */ } },
  locations: { [locId]: { /* Location schema */ } },
  items: { [itemId]: { /* Item schema */ } },

  // Adapter hints — hand-authored guidance to the LLM runtime
  adapterNotes: "Anything the adapter should know that's not captured structurally."
}
```

## Scene (common fields, all types)

```js
{
  id: "unique_id",
  type: "trial | negotiation | combat | exploration | social | transition | choice",
  title: "Human-readable title",
  location: "locId",                     // reference into `locations`
  summary: "One sentence DM-facing summary.",

  readAloud: "Text the DM reads when the scene opens.",
  playerNarration: "Short atmosphere caption for the player view (optional).",

  ifTheyAsk: [                           // load-bearing — see design note below
    {
      question: "How do we get back out?",
      answer: "Same phrase works from the other side — at least it did for Yessa.",
      dmNote: "Optional DM-only hint about how this ties to outcomes."
    }
  ],

  // Type-specific payload
  trial:       { /* Trial schema — see below */ },
  negotiation: { /* Negotiation schema */ },
  combat:      { /* Combat schema */ },
  exploration: { /* Exploration schema */ },
  social:      { /* Social schema */ },
  choice:      { /* Choice schema */ }
}
```

## Trial (ported from `trials_and_challenges`)

Mirror of the Giffyglyph-style format already in production:

```js
trial: {
  difficulty: "Easy | Standard | Hard",
  complexity: "Simple | Standard | Complex",
  dc: 15,                                // adapter may scale
  pace: "1 per Turn",
  goal: "...",
  tasks: [
    {
      id: "A",
      name: "...",
      description: "...",
      successes: 4,
      requirements: [],                  // task ids that must complete first
      skills: ["Perception", "Stealth"]  // adapter may reshape
    }
  ],
  outcomes: [
    { failures: "0",   tier: "Clean Entry",   description: "..." },
    { failures: "1-2", tier: "Quiet Arrival", description: "..." }
  ],
  outcomeNarrations: ["...", "...", "...", "..."],
  taskNarrations: {
    "A": { "crit-success": "...", "success": "...", "failure": "...", "crit-failure": "...", "complete": "..." }
  },
  challenges: [ /* environmental / escalation events */ ],
  specialResourceSlots: [
    // Party-agnostic *opportunities* for the adapter to fill.
    // Example: "Anyone with a radiant-damage weapon or spell → 1 auto-success on Task B."
    { task: "B", criterion: "radiant damage source", effect: "1 auto-success" }
  ]
}
```

**Key difference from The Dark Door:** `specialResources` in the prototype are party-specific (Sunblade, Ioko, etc). In the schema, source declares **slots/criteria**, and the adapter fills them with actual party-member-named resources.

## Negotiation (ported from `mcdm_negotiations`)

```js
negotiation: {
  npc: "npcId",                          // reference into `cast`
  request: "What the party is asking for.",
  motivations: ["Protection", "Higher Authority", "Justice"],
  pitfalls: ["Greed", "Legacy"],
  attitude: "neutral",                   // sets starting interest/patience per MCDM table
  outcomes: [ /* 6 entries, interest 0-5 */ ],
  outcomeNarrations: [ /* 6 read-aloud blocks */ ]
}
```

## Combat (new — to be designed during first import)

Placeholder. Likely fields: creatures, terrain, objectives, escalation clocks, loot, surrender conditions. Draw from existing monster stat-block formats.

## Exploration (new)

Placeholder. Likely: points of interest, hidden content (with perception/investigation DCs), traps, secret doors.

## Social (new)

Lighter than negotiation — short roleplay beats without interest/patience mechanics.

## Choice (new)

A decision hub that routes to different next scenes based on party choice. No mechanics — pure narrative fork.

## Design Note: IF THEY ASK

The `ifTheyAsk` array is the adaptation seam. Source ships with the universal questions; adapter **adds** party-specific ones (e.g. "Can I use the Sunblade on it?" shows up because the adapter saw Bueller has a Sunblade). Never prune source entries during adaptation — only add.

## Player-Safe Tagging

Any string field may be a plain string (player-safe) OR an object:

```js
"field": { public: "what players can see", dm: "what the DM knows" }
```

Renderers show `.public` on player view and `.dm` in the DM dashboard. Plain strings default to player-safe.
