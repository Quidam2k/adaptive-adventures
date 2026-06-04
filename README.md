# Adaptive Adventures

**A format for distributing tabletop adventures as structured data, plus an LLM
runtime that adapts them to your specific party — and a browser dashboard to run
them from.**

Books can't adapt. Video games are too rigid. Adaptive Adventures is neither.

An adventure ships as a **structured data file** — scenes, skill challenges,
NPCs, monsters, outcomes, treasure, and load-bearing "if they ask" blocks — that
is both machine-readable and human-DMable. An **LLM runtime**, given a party's
campaign and character notes, writes a *companion adaptation file* that reshapes
the source for that exact table: which skills fit which tasks, DCs scaled to
level, per-character "special resource" moments, narration that matches your
campaign's tone, and NPC beats that call back to your ongoing threads.

The same adventure runs differently for a stealth-heavy party than a social one —
not because the DM rewrote it, but because the runtime did. The source file is
**never edited**; adaptation is purely additive.

A single-file **DM dashboard** (`dashboard.html`, vanilla JS, no backend) merges
source + adaptation into a navigable prep-and-play interface: room-by-room
navigation, inline stat blocks, clickable location links, collapsible sections,
and session-pickup state.

---

## Try it in two minutes

```bash
# From the repo root:
python -m http.server 8888
# then open http://localhost:8888/dashboard.html
```

On Windows you can instead double-click **`launch-dashboard.bat`**.

In the loader, pick **The Sunken Bell of Thornwell** (a complete, original,
free-to-use example one-shot), optionally pick the **Lantern Company** sample
adaptation to see the party-specific layer overlaid, and click **Launch**. Toggle
the adaptation to "— None (generic) —" to see the bare source by comparison.

Requirements: Python 3 (for the static server) and any modern browser. That's it —
no install, no database, no API key needed just to explore.

---

## What's in this repo

```
adaptive_adventures/
  dashboard.html        — the DM dashboard (single-file app, no backend)
  launch-dashboard.bat  — Windows one-click launcher
  schema/               — the scene description language spec
  runtime/              — the LLM adaptation protocol + prompt template
  adventures/
    manifest.js         — lists the published example adventure(s)
    example_thornwell/  — "The Sunken Bell of Thornwell" (original example)
      source.js                              — party-agnostic adventure
      adapted/sample-party-...js             — sample adaptation (fictional party)
  README.md · LICENSE · CLAUDE.md
```

Start with **`adventures/example_thornwell/`** — its README walks through the
example end to end. Then read **`schema/scene_schema.md`** for the data format and
**`runtime/adaptation_protocol.md`** for how source becomes party-specific.

---

## Bring your own adventures

The published repo intentionally ships **only the tooling and one original
example**. Published commercial adventures (e.g. by Wizards of the Coast or MCDM)
are copyrighted and are **not** included — and neither are real players' campaign
data. To use this with your own material:

1. Create `adventures/<your-adventure>/source.js`, modeled on the example and the
   schema. Keep it **party-agnostic**.
2. Generate an adaptation. Point an LLM at your `source.js`, the
   `schema/`, the `runtime/adaptation_protocol.md`, the sample adaptation as a
   worked example, and your own party/campaign notes; have it write
   `adventures/<your-adventure>/adapted/<your-party>.js`.
3. Register both in a manifest. Add a public entry to `adventures/manifest.js`,
   **or** — for private, unpublished material — create
   `adventures/manifest.local.js` (gitignored) using the same shape. The
   dashboard loads the public manifest first, then appends the local one if
   present, so your private adventures show up locally but never get committed.

> **Publishing safety.** `.gitignore` is set up to default-deny every adventure
> folder except the example, ignore all PDFs, and exclude the local manifest and
> any session artifacts. Run `git status` before each commit and confirm only
> tooling + the example are staged.

---

## Design principles

- **Party-agnostic source, party-specific adaptation.** The adventure file is
  universal. The adaptation layer is the party's. The two never mix.
- **Everything the book encodes should be structured.** Read-aloud text, DCs,
  skill options, monster stats, loot, branches — all first-class fields, not
  comments.
- **"If they ask" blocks are load-bearing.** They're the seams where adaptation
  lives: source ships the universal questions, the adapter *adds* party-specific
  ones, never pruning.
- **Narration is data.** Read-aloud, task narrations, and outcome text are fields
  the dashboard renders, not prose buried in a PDF.
- **Player-safe by default.** Anything that might reach a player view is
  player-safe; DM-only notes are clearly tagged.
- **Offline-capable, no backend.** Runs from local files in a browser.

---

## Status & origin

Working tool. The schema and dashboard were load-tested against real adventure
imports before this was published; what ships here is the generalized tooling
plus the original Thornwell example. The pattern grew out of two earlier
single-scene prototypes (a Giffyglyph-style skill-trial runner and an
MCDM/Drawsteel-style negotiation runner) — Adaptive Adventures generalizes
"one scene at a time" into "a whole adventure as a graph of scenes."

## License

MIT — see [`LICENSE`](LICENSE). Covers the dashboard, schema, runtime protocol,
and the original Thornwell example. It does **not** grant rights to any
third-party adventure material; use the tooling with content you own or have the
right to adapt.
