# The Sunken Bell of Thornwell — example adventure

An **original, copyright-free** one-shot, built to show what an Adaptive Adventures
data file looks like and how the adaptation layer reshapes it for a real table.
Free to use, run, copy, and adapt (MIT — see the repo `LICENSE`).

> **The pitch.** For a month, every soul in the valley has dreamed the same
> drowning dream, and each dawn the floodwater around the old Thornwell mill
> climbs higher. The bell that once warded the valley now tolls underwater, of
> its own accord, mourning. The party must wade into the sunken mill, learn what
> the bell is grieving for, and either lay its keeper to rest — or silence the
> bell forever.

- **Tier:** heroes (level ~3) · **Party:** 3–5 · **Length:** one evening
- **Genre:** tender gothic — the horror is grief, not gore
- **The twist:** the "boss" is a negotiation, not a fight. The best ending never rolls initiative.

## Files

```
example_thornwell/
  source.js     ← party-agnostic adventure. No party, no campaign, universal DCs.
  adapted/
    sample-party-the-lantern-company.js  ← what a runtime produces for ONE table
  README.md     ← you are here
```

- **`source.js`** is the layer an author ships. It exercises every scene type:
  an `exploration` approach (T1), a `combat` nave (T2), a `trial` skill-challenge
  at the sluice (T3), an `exploration`/puzzle workshop (T4), a `negotiation`
  climax at the bell (T5), and a `combat` trigger scene (the failure branch).
- **`adapted/sample-party-the-lantern-company.js`** is the differentiator. It's
  the companion file a runtime writes after reading a party's context. The party
  here — *The Lantern Company* — is **fictional**, invented only to demonstrate
  the layer: per-scene `specialResources`, `ifTheyAsk` additions, combat
  briefings, passive-revelation tables, DC notes, campaign callbacks tied to two
  character backstories, and a narration-voice guide. It **never edits**
  `source.js`; it only adds.

## Run it

From the repo root:

```bash
python -m http.server 8888
# then open http://localhost:8888/dashboard.html
```

(Or, on Windows, double-click `launch-dashboard.bat`.) Pick **The Sunken Bell of
Thornwell**, optionally pick **The Lantern Company (sample party)** to see the
adaptation overlaid, and click **Launch**. Toggle the adaptation off (choose
"— None (generic) —") to see the bare party-agnostic source by comparison.

## Make your own adaptation

Point an LLM at `source.js`, this sample adaptation (as a worked example of the
output shape), `schema/scene_schema.md`, and `runtime/adaptation_protocol.md`,
plus your own party's character/campaign notes. Ask it to produce a new
`adapted/<your-party>.js`, then register it in `adventures/manifest.js`
(or your private `manifest.local.js`).
