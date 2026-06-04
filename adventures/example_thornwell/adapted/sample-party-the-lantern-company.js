// ─────────────────────────────────────────────────────────────────────────────
//  THE SUNKEN BELL OF THORNWELL — sample adaptation
//
//  This is what a runtime produces when it reads source.js together with a
//  party's campaign + character context. The party here — "The Lantern
//  Company" — is FICTIONAL, invented purely to demonstrate the adaptation
//  layer. Swap in your own party's context and an LLM regenerates all of this.
//
//  Adaptation is ADDITIVE: it never edits source.js. It layers per-scene
//  specialResources, ifTheyAsk additions, combat briefings, passive
//  revelations, DC notes, campaign callbacks, and a narration-voice guide.
// ─────────────────────────────────────────────────────────────────────────────
window.ADVENTURE_ADAPTATION = {
  "sourceRef": "adventures/example_thornwell/source.js",
  "campaign": "The Lantern Company (sample)",
  "party": ["Bram", "Quill", "Orla", "Sister Vane"],
  "adaptedAt": "2026-06-03",
  "partyLevel": 3,

  "adapterPolicies": {
    "demo": "This adaptation is a teaching example. Every specialResources moment is traceable to a real check or stat in source.js (per the project's adaptation rules), and every campaign reference points to the fictional Lantern Company sketch below. Use it as a template for shape and depth, not as canon.",
    "partySketch": "THE LANTERN COMPANY (fictional, for the demo): Bram — human Paladin of a dawn-god, oath of redemption, carries a censer he can light (radiant + fire flavor) and Lay on Hands. Quill — halfling Rogue, thieves'-tools expertise, Cunning Action, a sentimental streak about lost children. Orla — half-elf Druid (Circle of the Land, coast), Shape Water, Mold Earth, Produce Flame, a raven familiar named Soot. Sister Vane — human Cleric of a grief-and-memory goddess, Channel Divinity, Guidance, Sanctuary, and a personal history of having lost a sibling to drowning."
  },

  "continuityBriefing": {
    "lastSessionDate": "2026-05-27",
    "lastSessionSummary": "The Lantern Company has been sleeping badly. For three nights all four shared the same dream: black water, a girl's voice, a bell tolling just out of reach. Sister Vane recognized it as no ordinary nightmare — it has the shape of a soul calling for help. They traced the dream upriver to the drowned hamlet of Thornwell and arrived at the millyard at dusk, where a bell is tolling somewhere under the pond. They have not yet crossed the water.",
    "whereTheyAre": "Standing at the edge of the Drowned Millyard (T1), looking at the grey figure on the dry stone and the punt knocking at the half-sunk waterwheel.",
    "whatTheyAreDoing": "Deciding whether to hail the figure, take the punt, or have Orla send Soot the raven ahead to scout. Sister Vane is visibly shaken — the drowning dream cuts close to her own history.",
    "whatTheyKnowNow": [
      "The whole valley shares the drowning dream; it has gotten worse over the past month.",
      "A bell is tolling underwater, on its own, and the floodwater is rising without rain.",
      "Sister Vane is certain a grieving soul is at the center of this, not a malevolent one."
    ],
    "mostLikelyNextActions": [
      "Speak to the grey figure (T1) — strongly recommended; it softens the entire back half of the adventure (see Campaign Integration).",
      "Take the punt across to the Flooded Nave (T2) rather than swimming.",
      "Send Soot to scout the bell tower (T5) from the air — the raven can see the Tollkeeper before the party commits."
    ],
    "prepFocus": "T1 (set the tone and let them earn the soft-start) and T5 (the negotiation is the real climax — read the Tollkeeper as Sera, not as a monster). T3's trial is the mechanical centerpiece; the specialResources below let every Lantern Company member shine in it.",
    "openThreadsForDM": [
      "Sister Vane's drowned sibling: the adventure will press on this. Decide in advance how hard to lean — it can be the emotional key that talks the Tollkeeper down (a griever recognizing a griever), or it can be too much for the player. Read the table.",
      "Bram's oath of redemption literally forbids killing a creature that can still be saved. The Tollkeeper CAN be saved (three mercy outs). If the party drifts toward the kill-the-bell path, Bram's oath is the in-fiction brake — surface it."
    ]
  },

  "campaignIntegration": {
    "arrivalMethod": "Pulled in by the shared drowning dream (the 'shared_dream' hook), which the Lantern Company has been suffering directly. No patron needed — though Sister Vane's order would also recognize Thornwell as exactly the kind of unquiet grief they exist to lay to rest.",
    "primaryObjective": "Find the source of the dream and end it. For Sister Vane this is personal; for Bram it's an oath-bound duty to redeem rather than destroy.",
    "secondaryObjective": "If the DM wants a coin reward, fold in the Reeve's Plea (150 gp from Aldermann Voss). The Last Coll hook also slots in cleanly and hands the party the Bellfounder's Gloves plus the single best clue to the peaceful ending.",
    "lullabySinger": "The girl's voice in the shared dream is Sera Coll — the same figure standing in T1 and bound to the bell in T5. The party has, in a sense, already 'met' her in their sleep.",
    "hookStatus": {
      "shared_dream": "PRIMARY. This is how the Lantern Company got here and it gives Sister Vane an immediate, personal stake.",
      "the_last_coll": "Recommended add-on. Hester Coll's request ('bring home Sera's things, and ring the bell properly') hands the party the master-ringing resolution on a plate and rewards the Gloves. Strong fit for a redemption-flavored party.",
      "the_reeve_s_plea": "Optional. Use it only if the table wants a mercenary framing or a gold reward; it slightly undercuts the emotional read, so the demo de-emphasizes it."
    },
    "toneDirective": "Tender gothic. The horror is grief, not gore. Let the water be sad before it's dangerous. Every monster in this adventure is a wound — play the husks and wisps as pitiable, and let the party feel the difference between fighting a thing and helping a person."
  },

  "narrationVoice": {
    "tone": "Tender gothic — melancholy, hushed, water everywhere",
    "description": "Lean into quiet and cold and the sound of dripping. Save loudness for the tolls. Describe the dead with sorrow, not disgust. When the party shows kindness, let the world visibly soften (the water stilling, the light warming) so they feel their compassion landing.",
    "characterVoices": {
      "bram": "Frame his moments around redemption and shelter — he stands between the frightened and the dark. His censer-light is a beacon, not a weapon. He hates that some of these things must be put down and will reach for any way not to.",
      "quill": "The sentimental rogue. Sera was a kid who never got to grow up, and Quill feels that in the gut. Give Quill the small, human beats — finding the apprentice-token, noticing the half-finished bell, being the one who says the kind thing.",
      "orla": "Elemental and practical. Water and earth answer her, so the flood is something she can almost reason with. Soot the raven is her eyes. Her Shape Water and Mold Earth are the party's best mechanical levers on the sluice and the surge.",
      "vane": "The griever who knows grief. Her drowned sibling makes her the one person at the table who can look the Tollkeeper in the eye and mean 'I understand.' Her voice should be steady when everyone else's shakes — and crack exactly once, at the right moment."
    }
  },

  "dcAdjustments": {
    "policy": "Party is level 3; the adventure is built for level 3. All source DCs are kept as written — no scaling needed.",
    "notes": "The only tuning here is informational: the auto-successes below tell you what the Lantern Company gets for free given their passive scores and proficiencies, so you can narrate those reveals confidently instead of calling for doomed-to-succeed rolls.",
    "autoSuccesses": {
      "quill_passive_perception_14": [
        "T1 Waterwheel Axle (passive Perception 13 to spot the rotted timber before climbing) — Quill auto-spots it; let her warn the party.",
        "T2 The Waking Pews (DC 13 Perception to notice the husks are about to wake) — Quill clears this passively, granting the party its free positioning round."
      ],
      "vane_guidance_and_religion": [
        "T4 The Half-Finished Bell (DC 10 Insight/History to grasp what the Tollkeeper lost) — Vane understands instantly; this is her thematic beat, not a roll."
      ]
    }
  },

  "campaignCallbacks": {
    "vanesDrownedSibling": {
      "description": "Sister Vane lost a sibling to drowning years ago — the wound the whole adventure rhymes with. This is the adaptation's strongest lever and its biggest 'handle with care.'",
      "options": [
        { "id": "the-key", "description": "Vane's grief becomes the literal key to the negotiation: at the climax she can speak to Sera as one drowning-griever to another, granting advantage on the T5 Persuasion mercy-out and likely pushing the outcome to 'At Peace.'", "pros": "Pays off the character's backstory at the perfect moment.", "cons": "Heavy. Check the player is up for it before the session." },
        { "id": "the-mirror", "description": "Play it lighter: Sera's plight simply unsettles Vane, coloring her roleplay without a mechanical payoff.", "pros": "Safe, still resonant.", "cons": "Leaves a great beat on the table." }
      ],
      "dmNote": "Ask the player privately, before the session, how close they want to fly to this. Let their answer pick the option."
    },
    "bramsOathOfRedemption": {
      "description": "Bram's oath forbids killing what can still be redeemed. The Tollkeeper can be redeemed. This is the in-fiction reason the party should seek the peaceful ending.",
      "suggestions": [
        "If the party reaches for the kill-the-bell path, Bram's oath tugs back — surface it as genuine inner conflict, not a rules lawyer's veto.",
        "Bram fitting the Clapper of Stilling (T4) to the Vesper is the perfect redemption-paladin climax: he ends the threat by saving the soul, not slaying it."
      ]
    }
  },

  "scenes": {
    "T1": {
      "sessionState": {
        "status": "ACTIVE — first scene, party has just arrived",
        "npcStatus": {
          "seraEcho": "Standing on the dry stone, back turned, waiting to be addressed kindly. Has not yet reacted to the party."
        }
      },
      "passiveRevelations": {
        "theRottedAxle": {
          "partyAgnostic": [
            { "threshold": "Passive Perception 13+", "reveals": "Spots the splintered, water-black axle-housing on the waterwheel before anyone trusts their weight to it." }
          ],
          "namedPcAccess": [
            { "pc": "Quill", "access": "Passive Perception 14 — auto-spots the rotted axle (T1). Narrate her catching someone's arm before they climb." }
          ]
        }
      },
      "specialResources": [
        {
          "pc": "Orla",
          "capability": "Raven familiar (Soot) + Find Familiar",
          "moment": "Orla can send Soot to scout across the pond and even down the bell-rope shaft toward T5, seeing the Tollkeeper before the party commits to the crossing. The familiar's flight bypasses the Grasping Current entirely.",
          "narrativeHook": "First real use of Soot as the company's eyes — establishes a tool they'll lean on in T2 and T5.",
          "dmNote": "Soot can see but not safely interact; if it lingers near the Vesper it takes the tolling save like anyone who can hear."
        },
        {
          "pc": "Sister Vane",
          "capability": "Cleric of grief/memory; personal history of a drowned sibling",
          "moment": "Vane is the natural first speaker to Sera's echo. Roleplay alone (no check) softens the echo if Vane speaks as one griever to another; if you want a roll, a DC 10 Charisma (Persuasion) or Wisdom (Insight) is generous and thematic.",
          "narrativeHook": "Plants the seed for the T5 negotiation — Vane is establishing the relationship that pays off at the bell.",
          "dmNote": "Calming the echo here makes the Tollkeeper start one full step less hostile in T5 (per source secret). This is the single most valuable thing the party can do in T1."
        }
      ],
      "ifTheyAsk_additions": [
        {
          "question": "(Vane) Did you lose someone to the water too?",
          "answer": "The echo doesn't understand the past tense — but she goes very still and says, 'I lost everyone. That's why I have to ring it.' The line should land on Vane specifically.",
          "campaignThread": "vanesDrownedSibling"
        }
      ]
    },

    "T2": {
      "passiveRevelations": {
        "theWakingPews": {
          "partyAgnostic": [
            { "threshold": "DC 13 Perception", "reveals": "The 'parishioners' are about to wake — a free round to position or sneak before the first toll." }
          ],
          "namedPcAccess": [
            { "pc": "Quill", "access": "Passive Perception 14 clears this automatically — the company gets its free round whether or not anyone rolls." }
          ]
        }
      },
      "combatBriefing": {
        "sceneSummary": "Three [[drowned_husk]] dormant on the pews, four [[sorrow_wisp]] minions rising with them. This is a pressure scene over the [[T2]] nave, not a kill box — fleeing downstairs to [[T3]] is a valid 'win.'",
        "sceneLevelHazards": [
          {
            "name": "Chest-Deep Water + the Tolling",
            "detail": "The nave is flooded chest-deep (difficult terrain; half speed for non-swimmers) and the Vesper tolls each round (DC 12 Wis or disadvantage on attacks/checks). The husks want to drag PCs UNDER, where the tolling is the least of their problems.",
            "pcImpact": "Bram and Sister Vane in armor are the most at risk of being dragged under. Keep them off the deep central aisle.",
            "recommendedRuling": "A creature held under by a husk's Drowning Grasp starts drowning per the standard suffocation rules — frightening but survivable for a level-3 party with two healers."
          }
        ],
        "creatures": {
          "drowned_husk": {
            "count": 3,
            "stats": "CR 1, AC 11, HP 32. Grapples (escape DC 12), pulls grappled targets under.",
            "signatureMechanics": [
              "Drowning Grasp — grappled + submerged target must hold breath or drown.",
              "Amphibious + swim 30 — never slowed by the deep water the party struggles in."
            ],
            "killPriority": "Whichever husk has grappled a heavy-armor PC (Bram/Vane) — free them before they go under.",
            "tacticalNotes": [
              "Orla's Mold Earth can raise a lip of stone to deny a husk the deep water it wants to drag people into.",
              "Bram's censer-light (radiant/fire flavor) and Sister Vane's bludgeoning mace both bypass nothing special here — husks have no resistances — so this fight is winnable fast if the party concentrates fire."
            ]
          },
          "sorrow_wisp": {
            "count": 4,
            "stats": "CR 1/8 minions, AC 12, HP 7. Any hit destroys one.",
            "signatureMechanics": [
              "Minion — one hit each; they exist to stack tolling pressure, not deal real damage.",
              "Fades With the Grief — all wisps wink out instantly if the bell is later silenced or the Tollkeeper is at peace."
            ],
            "killPriority": "Low. Don't waste high-damage actions on 7-HP minions; Orla's Produce Flame or Quill's offhand clears them.",
            "tacticalNotes": [
              "Sister Vane's Channel Divinity (Turn Undead, if her domain has it) routs the whole wisp chorus and even sends the husks reeling — a strong, thematic button for this scene."
            ]
          }
        },
        "creatureSynergies": [
          "Wisps press the tolling save; failed tolling means disadvantage; disadvantage means a PC is easier for a husk to grab and drown. Break the chain by clearing wisps early or by deafening a key front-liner against the toll."
        ]
      },
      "specialResources": [
        {
          "pc": "Quill",
          "capability": "Thieves'-tools expertise; nimble; small",
          "moment": "Quill is the ideal one to slip to the central aisle, lift the iron offering-grate (the source allows careful work in place of the DC 13 Athletics), and recover Sera's apprentice-token + the scratched 'STILL HER' message while the others hold the husks.",
          "narrativeHook": "The sentimental rogue is the one who finds the dead girl's token — give Quill the quiet gut-punch of realizing whose it was.",
          "dmNote": "The token is the strongest peace offering in T5 and the message points at the Clapper in T4. Make sure the party leaves T2 with both."
        },
        {
          "pc": "Sister Vane",
          "capability": "Channel Divinity (Turn Undead) + Sanctuary",
          "moment": "Turn Undead scatters the wisp chorus and staggers the husks; Sanctuary on a PC who's been grabbed buys a turn to escape a drowning grapple.",
          "narrativeHook": "Vane's faith pushing back the valley's grief — a preview of the larger mercy she'll offer at the bell.",
          "dmNote": "Both are RAW cleric features; no invented mechanics."
        }
      ]
    },

    "T3": {
      "combatBriefing": {
        "sceneSummary": "The sluice trial in the [[T3]] undercroft — the mechanical heart of the adventure. The optional [[brine_weird]] is available if the party needs a threat to make the trial bite. Draining the sluice (Drained Clean) literally strands the weird and eases the [[T5]] climax.",
        "sceneLevelHazards": [
          {
            "name": "The Rising Line (the trial clock)",
            "detail": "Each round the bell tolls and the water climbs a foot; after four rounds the exit starts to submerge. This is what makes the trial tense — don't let the party treat it as untimed.",
            "pcImpact": "Orla and Quill (lighter, more mobile) can afford to gamble on the harder tasks; Bram and Vane should anchor Task C (Hold Back the Race)."
          }
        ]
      },
      "dcAdjustments": {
        "policy": "Source DC 13 kept as written for all three tasks.",
        "notes": "The specialResources below convert most of the Lantern Company's kit into auto-successes or advantage, so a coordinated party can hit 'Drained Clean.' That's intended — reward the synergy."
      },
      "specialResources": [
        {
          "pc": "Orla",
          "capability": "Shape Water + Mold Earth (both at-will cantrips)",
          "moment": "Shape Water directly manipulates the dammed race and Mold Earth raises a diversion channel — this matches the Task C slot ('a spell or feature that controls water, creates a barrier...') for 1 automatic success on Task C AND downgrades the worst-case Surge by one step. Produce Flame can also feed the Task B heat slot if no one else has fire.",
          "narrativeHook": "Orla's whole identity is that water and earth answer her. This is the scene where that pays off mechanically — let it be spectacular.",
          "dmNote": "Traceable to two source specialResourceSlots (Task C water-control; Task B heat). No invented effects."
        },
        {
          "pc": "Quill",
          "capability": "Thieves' tools + expertise; Cunning Action",
          "moment": "Thieves' tools match the Task B slot ('a tool that grants advantage') for advantage on freeing the seized wheels; Cunning Action lets Quill reposition each round without spending the action she needs for the trial.",
          "narrativeHook": "The rogue picking the lock on eighty years of rust.",
          "dmNote": "Traceable to the Task B tool slot."
        },
        {
          "pc": "Bram",
          "capability": "Heavy armor, high Strength; a lit censer (fire flavor); Bellfounder's Gloves if earned from the The Last Coll hook",
          "moment": "Bram anchors Task C by main strength (Athletics). If he earned the Bellfounder's Gloves in T4, they grant advantage on Athletics checks to grip/brace and let him pull a swept-away ally free — perfect for the Surge. His censer can also feed the Task B heat slot in a pinch.",
          "narrativeHook": "The paladin as the immovable point the flood breaks against.",
          "dmNote": "Gloves benefit is from the hoard item as written; only applies if the party has them by now."
        },
        {
          "pc": "Sister Vane",
          "capability": "Guidance; History/Religion proficiency",
          "moment": "Guidance on whoever attempts Task A (Read the Machinery) plus Vane's own knowledge proficiencies match the Task A slot — she can attempt Task A without disadvantage and treat low rolls as a 10.",
          "narrativeHook": "The scholar-priest reading the old craft like scripture.",
          "dmNote": "Traceable to the Task A proficiency slot."
        }
      ],
      "ifTheyAsk_additions": [
        {
          "question": "Can we just drain it with magic instead of the wheels?",
          "answer": "Orla's cantrips can't move this much water alone, but they're decisive force-multipliers on the wheels (Task C) — the trial is the drain, the magic makes it clean. Frame partial magic as a head start, not a bypass.",
          "campaignThread": null
        }
      ]
    },

    "T4": {
      "passiveRevelations": {
        "theMakersMarkOrder": {
          "partyAgnostic": [
            { "threshold": "DC 10 Investigation", "reveals": "Finds the workshop ledger, which spells out the nine-mark casting order — opening the case with no risk of the wrong-sequence discharge." }
          ],
          "namedPcAccess": [
            { "pc": "Quill", "access": "Thieves'-tools expertise: even brute-forcing the case is on the table (AC 15, 10 HP), but the ledger or Sera's token makes it free and quiet. Steer her to the clue, not the crowbar — breaking it turns the water grasping." }
          ]
        }
      },
      "specialResources": [
        {
          "pc": "Quill",
          "capability": "Investigation; thieves' tools; the apprentice-token recovered in T2",
          "moment": "If Quill carries Sera's token (from T2), the maker's-mark order is already in hand — the case opens cleanly, no check, no psychic discharge. Otherwise a DC 13 Investigation or the ledger (DC 10) gets there.",
          "narrativeHook": "The token the rogue pocketed two scenes ago turns out to be the key. Reward the foresight.",
          "dmNote": "Traceable to the source puzzle's stated synergy (token/ledger encode the order)."
        },
        {
          "pc": "Bram",
          "capability": "Oath of Redemption; this is where the peaceful weapon lives",
          "moment": "Recovering the Clapper of Stilling gives Bram the means to end the haunting by saving Sera rather than destroying her — the literal instrument of his oath. Let him be the one to take it.",
          "narrativeHook": "Set up Bram fitting the Clapper to the Vesper in T5 as his redemption climax.",
          "dmNote": "The Clapper's properties are as written in the hoard; no changes."
        }
      ]
    },

    "T5": {
      "sessionState": {
        "status": "CLIMAX — the negotiation with the Tollkeeper",
        "npcStatus": {
          "theTollkeeper": "Starting attitude depends on T1: 'wary' by default, one step warmer ('the echo was calmed') if the party was kind to Sera's echo, one step colder if they attacked or dismissed it."
        },
        "cliffhangerResolution": "Two peaceful endings: Still her (fit the Clapper of Stilling from [[T4]]) or Ring her (perform the master-ringing from the The Last Coll hook). Either lays Sera to rest and lifts the valley's dream. The fight ([[the_final_toll]]) is only the failure branch."
      },
      "combatBriefing": {
        "sceneSummary": "This is a NEGOTIATION first. The [[the_final_toll]] combat is the failure state — read [[the_tollkeeper]] as a grieving girl, not a boss. Three mercy-outs end any fight instantly: the apprentice-token, the Clapper, or a DC 15 Persuasion to promise the master-ringing.",
        "creatures": {
          "the_tollkeeper": {
            "count": 1,
            "stats": "CR 4, AC 13, HP 75. Bound to the Bell (can't be permanently destroyed while it tolls). Sorrow's Mercy (disadvantage vs. anyone who hasn't attacked her).",
            "signatureMechanics": [
              "Sorrow's Mercy — she fights at disadvantage against anyone who lowers their weapon. A wholly non-aggressive party is in very little danger.",
              "Bound to the Bell — reducing her to 0 HP only reforms her unless the bell is silenced/shattered. Brute force literally cannot finish this; the mercy-outs can.",
              "Toll of Grief — DC 14 toll each of her turns."
            ],
            "tacticalNotes": [
              "If the party attacks, have her target the most aggressive PC and visibly spare the rest — make her restraint legible so the table reads 'this doesn't have to be a fight.'",
              "Vane's drowned-sibling backstory (campaignCallbacks.vanesDrownedSibling, 'the-key' option) can grant advantage on the Persuasion mercy-out — a griever recognizing a griever.",
              "Bram fitting the Clapper of Stilling is an action adjacent to the Vesper, contested by her grief (DC 13). On success the bell stills, she is laid to rest, and every sorrow-wisp in the building winks out at once."
            ]
          }
        }
      },
      "ifTheyAsk_additions": [
        {
          "question": "(Vane) Did your ringing wake the village? Did it work?",
          "answer": "This is THE question. If the party can tell her truthfully that the village survived because of her — and especially if Vane, who knows drowning-grief, is the one to say it — the Tollkeeper's interest jumps toward 'Released' or 'At Peace.' She has waited eighty years to be told her sacrifice mattered.",
          "campaignThread": "vanesDrownedSibling"
        },
        {
          "question": "(Bram) You don't have to keep doing this. Let us carry it.",
          "answer": "A redemption-paladin offering to take up her burden so she can rest speaks directly to what she wants (Rest + Completion). Treat a sincere version of this as worth advantage on the next social check, or as the roleplay that earns the 'Heard' outcome outright.",
          "campaignThread": "bramsOathOfRedemption"
        }
      ],
      "specialResources": [
        {
          "pc": "Sister Vane",
          "capability": "Cleric of grief/memory; lost a sibling to drowning; Channel Divinity",
          "moment": "Vane is the emotional key to the whole climax. Speaking to Sera as one drowning-griever to another can carry the negotiation to 'At Peace' (interest 5) and the Vesper's Grace blessing for the whole party. If a check is wanted, the DC 15 Persuasion mercy-out at advantage (per the campaign callback).",
          "narrativeHook": "Everything Vane has been since session one points at this single conversation. Let her crack, once, here.",
          "dmNote": "Confirm with the player beforehand how far to lean on the drowned-sibling history."
        },
        {
          "pc": "Bram",
          "capability": "Oath of Redemption; the Clapper of Stilling (from T4)",
          "moment": "Bram fitting the Clapper to the Vesper is the redemption ending in physical form — he ends the threat by saving the soul. DC 13 check adjacent to the bell, contested by her grief; trivially easy if she's already at 'Heard' or better.",
          "narrativeHook": "The paladin's oath made literal: the monster was a person, and he saved her.",
          "dmNote": "Clapper mechanics exactly as written in the hoard."
        },
        {
          "pc": "Quill",
          "capability": "The apprentice-token (from T2); a sentimental streak",
          "moment": "Quill simply holding out Sera's half-cast token — the mark of the master's title she never earned — is one of the three instant mercy-outs. Sometimes the rogue's quiet gesture says more than any speech.",
          "narrativeHook": "The token Quill pocketed in grief two scenes ago becomes the thing that sets Sera free.",
          "dmNote": "Presenting the token ends any in-progress fight instantly per the source notes."
        },
        {
          "pc": "Orla",
          "capability": "Shape Water; raven familiar; coastal druid attuned to water-spirits",
          "moment": "If the negotiation reaches a peaceful end, Orla can help the floodwater recede — Shape Water guiding the last of it back to the pond as Sera is released, a visible sign that the valley is healing. If things go violent, Soot can carry the Clapper or the token across the deck to whoever needs it.",
          "narrativeHook": "The druid as the one who tends the water's grief back into stillness.",
          "dmNote": "Cosmetic/utility use of Shape Water; no mechanical stretch."
        }
      ]
    }
  },

  "notes": "Sample adaptation for the fictional Lantern Company, authored to demonstrate the adaptation layer end-to-end. Note how every specialResources moment traces to a real source check or stat block, how the negotiation (T5) is foregrounded over the optional fight, and how two character backstories (Vane's drowned sibling, Bram's redemption oath) are woven into IF-THEY-ASK answers and campaign callbacks without altering one word of source.js."
};
