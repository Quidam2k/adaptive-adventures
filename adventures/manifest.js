// ─────────────────────────────────────────────────────────────────────────────
//  PUBLIC manifest — committed. Lists the shippable, copyright-free example(s).
//
//  The dashboard loads this first, then optionally loads manifest.local.js
//  (gitignored) which appends your private, unpublished adventures. Each file
//  CONCATS onto window.ADVENTURES_MANIFEST so both sets coexist locally while
//  only this one is published.
// ─────────────────────────────────────────────────────────────────────────────
window.ADVENTURES_MANIFEST = (window.ADVENTURES_MANIFEST || []).concat([
  {
    id: 'example_thornwell',
    title: 'The Sunken Bell of Thornwell',
    subtitle: 'Example one-shot (original, free to use)',
    source: 'adventures/example_thornwell/source.js',
    adaptations: [
      {
        id: 'sample-party-the-lantern-company',
        label: 'The Lantern Company (sample party)',
        file: 'adventures/example_thornwell/adapted/sample-party-the-lantern-company.js'
      }
    ]
  }
]);
