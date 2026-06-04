# Adventures

One subfolder per adventure. Layout:

```
adventures/
  manifest.js              — public manifest: lists shippable adventure(s)
  manifest.local.js        — (optional, gitignored) your private adventures
  <adventure-slug>/
    source.js              — party-agnostic, authored from your source material
    README.md / notes.md   — import notes, decisions, open questions
    adapted/
      <party>-<date>.js    — party-specific adaptation output (additive only)
```

## What ships here

Only **`example_thornwell/`** — *The Sunken Bell of Thornwell*, an original,
copyright-free example one-shot. Start there; its README walks through the
source + adaptation end to end.

## Adding your own

Published commercial adventures are copyrighted and are **not** included in this
repo, and real campaign adaptations contain player data. To use the tooling with
your own material:

1. Create `adventures/<your-adventure>/source.js` (party-agnostic — see the
   example and `../schema/scene_schema.md`).
2. Generate `adapted/<your-party>.js` with an LLM (see
   `../runtime/adaptation_protocol.md`). Adaptation is additive — never edit the
   source.
3. Register it. Add a public entry to `manifest.js`, or — for private,
   unpublished material — create `manifest.local.js` (gitignored) with the same
   shape. The dashboard loads `manifest.js` first, then appends
   `manifest.local.js` if it exists.
