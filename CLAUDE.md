# CLAUDE.md — Adaptive Adventures

## Project Overview

Adventures distributed as structured scene data + LLM adaptation. See `README.md` for full vision.

## Prior Art (read these first)

Two working prototypes in the parent workspace define the patterns this project generalizes:

- `Q:/DnD/trials_and_challenges/encounters/the_dark_door.js` — canonical trial scene. Study: `trial` metadata, `tasks`, `outcomes`, `scenes` (with IF THEY ASK blocks), `outcomeNarrations`, `taskNarrations` (crit-success / success / failure / crit-failure / complete), `specialResources`, `challenges`, `playerNarrations`.
- `Q:/DnD/mcdm_negotiations/encounters/wands_light_project.js` — canonical negotiation scene. Study: `npc`, `request`, `motivations`, `pitfalls`, `outcomes` (by interest level), `outcomeNarrations`.

Do **not** re-derive the conventions from those files — treat them as canon and extend.

## Canonical Scene Types

Every adventure is a graph of scenes. Scene types (expand as needed):

- `trial` — skill challenge with tasks, successes/failures, outcomes (Giffyglyph-style).
- `negotiation` — NPC interaction with interest/patience (MCDM/Drawsteel-style).
- `combat` — tactical encounter with creatures, terrain, objectives.
- `exploration` — location investigation with points of interest and hidden content.
- `social` — non-negotiation roleplay scene (brief conversation, information gather).
- `transition` — read-aloud connective tissue between scenes.
- `choice` — branching hub where party decisions route to different next scenes.

## Adaptation Layer (core differentiator)

Every adventure data file has **party-agnostic** content. The LLM runtime produces a **party-adapted** copy by reading campaign/character context files and transforming the source. Adaptation touches:

- Skill lists on tasks (reshape to what the party is actually good at)
- DCs (scale to party level / tier)
- Special resources (generate from party inventory + class features, like the Sunblade/Dagger-of-Blindsight moments in The Dark Door)
- "IF THEY ASK" blocks (add party-specific questions + answers)
- Narration voice (match established campaign tone)
- NPC motivations/pitfalls (align with campaign themes when reusable)

Source stays untouched. Adaptation is additive metadata + derived fields.

## Where Evil Lives Import

First real test case: import a one-shot from MCDM's *Where Evil Lives*. Source PDF lives in `reference/` once Todd provides it.

Workflow:
1. Read the source one-shot.
2. Decompose into scenes (trial / negotiation / combat / exploration / etc).
3. Fill the schema for each scene, keeping content **party-agnostic**.
4. Save as `adventures/[adventure-name]/source.js` (or .json).
5. Design the adaptation protocol prompt that converts source → party-specific.
6. Test adaptation against an existing party (CFK / AoA / Undermountain).

## Tech Stack (eventual)

Same pattern as the two prototypes: HTML + vanilla JS, localStorage for state, postMessage for player-view sync, no backend. Don't build the UI until the schema is load-tested against at least one real adventure.

## Design Principles

- **Schema follows content.** Drive the schema from the Where Evil Lives import — don't design in the abstract.
- **Keep party-agnostic and party-specific layers separate.** Never bake a party's details into the source adventure file.
- **Narration is data.** Treat read-aloud text, task narrations, and IF-THEY-ASK answers as first-class fields, not comments.
- **Player-safe by default.** Anything that might reach a player view is player-safe; DM-only notes are clearly tagged.

## Adaptation Quality Rules

When generating or editing adaptation files, these rules are mandatory. They are enforced by the fact-check gate (`runtime/fact_check_protocol.md`), which runs on every pass — including initial adaptation — and blocks completion while Critical findings remain.

### Location references are navigable
Any mention of a location ID (V1, V3, etc.) in narrative text — hook status, campaign integration, If They Ask answers, special resource moments — will automatically become a clickable link in the dashboard. **Use location IDs consistently** when referring to where something or someone is. Don't write "the war room" when you mean V3; write "V3 (War Room)" so the link renders correctly and the DM can navigate there instantly.

### Special resources must be grounded in source mechanics
Every `specialResources` claim must be traceable to a mechanical check, creature stat, or environmental detail in the source JSON. The pattern to avoid:

> ❌ "Henry's passive Perception 18 spots the crimson door's trap." *(The door is visible to everyone in the read-aloud. No Perception check exists in the source.)*

> ✅ "Henry's Gloves of Thievery (+5) give him the best shot at the DC 20 thieves' tools check on the Black Oak doors." *(Source explicitly lists DC 20 thieves' tools.)*

Before writing a `specialResources` moment that references a DC, check that DC exists in the source. Before claiming a passive score beats a check automatically, confirm the check exists and the DC is correct. Invented checks undermine DM trust in the tool.

### Adaptation is additive only
The source JSON is never modified. Adaptations add fields (`specialResources`, `ifTheyAsk_additions`, `tacticalNotes`, `rhodarTelepathy_personalized`, `dcAdjustments`, `campaignCallbacks`, `narrationVoice`) but never overwrite source content.
