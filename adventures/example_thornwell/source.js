// ─────────────────────────────────────────────────────────────────────────────
//  THE SUNKEN BELL OF THORNWELL — party-agnostic source
//
//  An original, copyright-free example adventure for Adaptive Adventures.
//  Free to use, copy, and adapt (MIT). This file is the UNIVERSAL layer:
//  no party, no campaign, no DCs tuned to anyone. The adaptation file in
//  ./adapted/ shows how a runtime reshapes it for one specific table.
//
//  Tier: heroes (level ~3). One evening's play. Genre: melancholy gothic.
// ─────────────────────────────────────────────────────────────────────────────
window.ADVENTURE_SOURCE = {
  "meta": {
    "title": "The Sunken Bell of Thornwell",
    "source": "Original — Adaptive Adventures example one-shot",
    "author": "Adaptive Adventures",
    "level": 3,
    "partySize": { "min": 3, "max": 5, "optimized": 4 },
    "expectedLength": "one-shot",
    "tags": ["gothic", "haunting", "rescue", "puzzle", "low-level"],
    "summary": "For a month, every soul in the valley has dreamed the same drowning dream, and each dawn the floodwater around the old Thornwell mill climbs a little higher. The bell that once warded the valley now tolls underwater, of its own accord, mourning. The characters must wade into the sunken mill, learn what the bell is grieving for, and either lay its keeper to rest — or silence the bell forever."
  },

  "lore": {
    "background": "Thornwell was a milling hamlet built around a chapel whose silver bell, the Vesper, was said to keep bad dreams from the water. Eighty years ago a spring flood broke the millrace dam. The bellfounder's apprentice, a girl named Sera Coll, rang the Vesper to wake the sleeping village — and kept ringing it as the water rose around the tower, until the flood took her with the rope still in her hands. The village survived; Sera did not. The chapel sank into the millpond and was abandoned. The Vesper never stopped tolling. For decades the valley folk called it a comfort. This past month it changed: the tolls now come at night, the water rises without rain, and everyone within a mile dreams of drowning in the dark while a bell rings just out of reach. Sera's grief has finally outgrown the bell that held it.",
    "prophecy": "When the Vesper weeps instead of warns, the water will come to listen."
  },

  "entering": {
    "description": "The valley road ends at a half-drowned millyard. The pond has swallowed the chapel to its eaves; only the bell tower's upper windows and the great moss-furred waterwheel still stand clear of the black water. It is dusk. Somewhere below the surface, slow and muffled, a bell is tolling."
  },

  "hooks": [
    {
      "id": "shared_dream",
      "name": "The Shared Dream",
      "description": "The characters themselves have been having the drowning dream for three nights running — the same dream the whole valley shares. Following it backward (a sunken bell, a girl's voice) leads them to Thornwell. No patron required; the adventure has already reached into their sleep.",
      "reward": null,
      "exclusiveWith": []
    },
    {
      "id": "the_reeve_s_plea",
      "name": "The Reeve's Plea",
      "description": "Aldermann Voss, reeve of the downstream town, will pay 150 gp to stop the flooding before it reaches his grain stores. He believes it's a broken sluice and a superstition; he does not believe in the dream, though he has stopped sleeping.",
      "reward": "150 gp",
      "exclusiveWith": []
    },
    {
      "id": "the_last_coll",
      "name": "The Last Coll",
      "description": "An elderly woman, Hester Coll, is the last of the bellfounder's line. She asks the characters to bring home anything of her great-aunt Sera's that remains in the chapel — and to ring the Vesper once, properly, so the family's apprentice can finally be called a master. She offers a family heirloom, the Bellfounder's Gloves.",
      "reward": "Bellfounder's Gloves (uncommon)",
      "exclusiveWith": []
    }
  ],

  "commonFeatures": [
    {
      "id": "rising_water",
      "name": "Rising Water",
      "summary": "Lower areas are flooded waist- to chest-deep; the level climbs each time the bell tolls.",
      "detail": "Flooded squares are difficult terrain; a creature swimming there moves at half speed unless it has a swim speed. Every time the Vesper tolls (see The Tolling, below), the water in every flooded area rises one foot. The DM tracks this as a soft clock: enough tolls and the lower chapel becomes fully submerged, cutting off non-swimmers."
    },
    {
      "id": "the_tolling",
      "name": "The Tolling",
      "summary": "The bell tolls roughly every 10 minutes, and on every strike: a Wisdom save or be staggered by grief.",
      "detail": "About once every ten minutes of exploration — and once at the start of each combat round inside the chapel — the Vesper tolls. Each non-deafened creature that can hear it makes a DC 12 Wisdom save. On a failure, it is overcome by borrowed sorrow until the end of its next turn: disadvantage on attack rolls and ability checks. A creature that cannot hear the bell (deafened, silence, earplugs improvised with a DC 10 check) is immune. The tolling is the adventure's heartbeat — use it to apply pressure, not to grind the party down."
    },
    {
      "id": "dim_and_drowned",
      "name": "Dim and Drowned",
      "summary": "Dim light throughout; everything is wet, cold, and slick.",
      "detail": "Waterlogged clouds sit low over the valley and the chapel interior is lit only by drowned glow — a faint phosphorescence clinging to the sunken stone. All interior areas are in dim light unless a character brings their own. Open flame sputters and gutters; a torch sheds only half its normal bright radius here."
    },
    {
      "id": "sympathetic_water",
      "name": "Sympathetic Water",
      "summary": "The floodwater is an extension of Sera's grief and reacts to kindness and cruelty.",
      "detail": "The water is not merely water. It calms (becoming still and shallow-seeming) around creatures who show the dead apprentice tenderness, and it grasps (counting as the grasping current hazard) around creatures who desecrate the chapel, attack the Tollkeeper unprovoked, or try to seize the bell by force. The DM uses this as a living reaction, not a stat block — it rewards the table's emotional read of the scene."
    }
  ],

  "resting": {
    "safeAreas": ["T1", "T4"],
    "condition": "The party must not be actively pursued by the Tollkeeper or sorrow-wisps. T1 (the millyard) is dry land; T4 (the workshop loft) is above the waterline.",
    "interruption": "If the characters take a long rest anywhere inside the chapel proper, the water rises a full five feet during their sleep and the drowning dream finds them — each character ends the rest having regained Hit Dice and spells but gaining one level of a homebrew 'haunted' condition (disadvantage on the first Wisdom save against the tolling). Short rests are safe in the safe areas."
  },

  "locations": {
    "T1": {
      "name": "The Drowned Millyard",
      "type": "exploration",
      "summary": "The flooded approach: a leaning waterwheel, a swamped chapel, and a grieving figure standing on the one dry stone. First contact with the haunting.",
      "readAloud": [
        "The road gives out at the lip of a black millpond. Where Thornwell's chapel once stood, only a bell tower and the upper arc of a moss-eaten waterwheel rise from the water, which laps at the eaves like a thing testing a door.",
        "On a single flat stone above the flood stands a figure in a sodden grey shift, her back to you, water streaming endlessly from the hem though no rain falls. From somewhere beneath the surface, slow and deep, a bell tolls once. The figure flinches as if struck.",
        "Half-sunk against the wheel, a flat-bottomed punt knocks gently at its mooring — big enough for four, if they don't mind wet boots."
      ],
      "secrets": [
        "The figure is a sorrow-echo of Sera Coll — an impression, not the spirit itself. The true spirit (the Tollkeeper) is bound to the bell in T5. Speaking gently to the echo is the cleanest way to learn what the adventure is actually about.",
        "The punt is the safe way across; swimming the pond risks the grasping current (see hazards). The waterwheel can be climbed but the axle-housing is a trap (see hazards)."
      ],
      "hookRefs": ["the_last_coll", "shared_dream"],

      "hazards": [
        {
          "name": "Grasping Current",
          "description": "A creature who enters the open millpond water rather than taking the punt feels the flood close around its legs. This hazard is suppressed entirely if the creature has shown the echo tenderness (see Sympathetic Water).",
          "saveDC": 13,
          "saveAbility": "Strength",
          "trigger": "Swimming the open pond, or starting a turn in deep pond water while the water is grasping.",
          "failEffect": "Dragged 10 feet toward the bell tower and grappled by the current (escape DC 13). While grappled this way, the creature is pulled under at the start of its next turn unless it breaks free or an ally hauls it out.",
          "successEffect": "The creature swims freely this turn."
        },
        {
          "name": "Waterwheel Axle",
          "description": "The great wheel can be climbed to reach a second-story window into T4. The rotted axle-housing at the top gives way under weight.",
          "identifyDC": 12,
          "identifySkill": "Investigation",
          "identifyAlt": "A passive Perception of 13 spots the splintered, water-black timber before climbing.",
          "saveDC": 12,
          "saveAbility": "Dexterity",
          "trigger": "Putting full weight on the axle-housing while climbing the wheel.",
          "failEffect": "Fall into the pond (no damage, but now subject to the Grasping Current).",
          "successEffect": "Catch a sound spoke and finish the climb to the T4 window."
        }
      ],

      "pointsOfInterest": {
        "seraEcho": {
          "name": "The Grey Figure (Sera's Echo)",
          "type": "social",
          "creature": "sorrow_echo",
          "description": "The figure does not turn unless addressed kindly. She is an echo of Sera Coll's last hour: a girl of perhaps sixteen, hands raw from a bell-rope, eyes fixed on the tower. She cannot hurt the characters and cannot leave her stone. She speaks haltingly, as if remembering how.",
          "interaction": "If the characters approach with violence or try to push past her, she dissolves into falling water and the pond begins to grasp (the water turns hostile until they leave or make amends). If they speak gently, she turns. She is grateful simply to be seen.",
          "motivation": "Sera does not know she is dead. She believes the flood is still coming and that she must keep ringing the bell to wake the village. She is desperate for someone to tell her whether the village woke — whether her ringing mattered.",
          "offers": [
            "If asked about the bell, she says the Vesper 'won't stop now, it's so tired, I'm so tired' — the first hint that the bell and the spirit are the same grief.",
            "If told the village survived (true), the echo steadies and the pond calms for the rest of the scene — and the Tollkeeper in T5 will start one full step less hostile.",
            "If asked the way in, she nods at the punt and warns them 'don't trust the water to hold you up, it only wants to hold you down.'"
          ],
          "ifAttacked": "She cannot be attacked meaningfully — weapons pass through falling water. The attempt itself turns the pond hostile (grasping) and starts the Tollkeeper one step MORE hostile.",
          "ifTheyAsk": [
            {
              "question": "Are you alive? / Are you a ghost?",
              "answer": "She doesn't understand the question. 'I'm the apprentice. I ring the bell. That's all there is to be.' Pushing the point makes her distressed and the water uneasy.",
              "dmNote": "The reveal that she's long dead lands harder in T5. Don't spend it here."
            },
            {
              "question": "What's down there with the bell?",
              "answer": "'Me. The part of me that won't come up.' She means the Tollkeeper literally — the bell-bound remnant of her in T5.",
              "dmNote": null
            }
          ]
        },
        "thePunt": {
          "name": "The Punt",
          "type": "feature",
          "leadsTo": "T2",
          "description": "A flat-bottomed boat, waterlogged but sound. It seats four and crosses the pond to the chapel's upper door (T2) without provoking the Grasping Current. A character can pole it with a DC 8 Strength (Athletics) check; failure just means slow progress, not capsizing."
        }
      },

      "connections": {
        "T2": { "via": "Punt across the pond, or the chapel's swamped front door", "note": "The punt is the safe route; swimming risks the Grasping Current." },
        "T4": { "via": "Climb the waterwheel to the second-story window", "note": "Shortcut to the workshop loft — beware the rotted axle." }
      },
      "safeRest": true
    },

    "T2": {
      "name": "The Flooded Nave",
      "type": "combat",
      "summary": "The chapel's main hall, chest-deep in black water. Drowned pew-husks rise when the bell next tolls. A submerged offering-grate hides the first clue.",
      "readAloud": [
        "Inside, the chapel is a drowned cathedral. Pews stand in rows beneath chest-deep water, and pale shapes are slumped across them — parishioners who came to pray and never left, now bloated and grey, swaying with the current.",
        "Light comes from a faint glow on the sunken stones. At the far end, a flooded stair descends into deeper dark toward the sound of the bell."
      ],
      "readAloudCondition": "Read the second line only if the party has their own light or can see in the dim glow.",
      "secrets": [
        "The 'parishioners' are drowned husks. They are dormant and will not stir until the Vesper next tolls — giving an observant party one free round to position, search, or sneak past.",
        "Beneath the central aisle, an iron offering-grate covers a niche holding Sera's apprentice-token (see treasure) and a scratched message: a clue that the bell must be STILLED, not destroyed."
      ],

      "encounters": [
        {
          "name": "The Waking Pews",
          "creatures": [
            { "id": "drowned_husk", "count": 3, "position": "slumped across the pews, dormant" },
            { "id": "sorrow_wisp", "count": 4, "position": "rising from the water when the husks wake" }
          ],
          "detection": {
            "skill": "Perception",
            "dc": 13,
            "result": "Notices the husks are subtly breathing-in-reverse — drawing water, not air — and are about to wake. Forewarned characters can act before the first toll."
          },
          "trigger": "The husks animate the next time the Vesper tolls (within ~1 minute of entering), or immediately if a character attacks one, loots the grate noisily, or speaks above a whisper near them.",
          "tactics": "The husks wade toward the nearest warm body and try to drag it under (grapple, then hold beneath the surface). The sorrow-wisps are minions that swarm and wail, pressing the tolling save. Husks fight until destroyed; wisps wink out if the party reaches the stair and shows no aggression, because the grief that fuels them is in the bell, not here. A party that flees downstairs rather than fighting is valid — this is a pressure scene, not a kill box."
        }
      ],

      "treasure": [
        {
          "name": "Sera's Apprentice-Token",
          "description": "A founder's-guild token of cheap pewter, stamped with a half-cast bell — the mark of an apprentice who never finished her masterwork. Worthless in coin; priceless to the Tollkeeper. Presenting it in T5 is the single strongest peace offering in the adventure.",
          "location": "Under the iron offering-grate in the central aisle.",
          "findDC": 12,
          "findSkill": "Investigation",
          "findDescription": "A character who searches the aisle floor finds the grate; lifting it is a DC 13 Strength (Athletics) check or simply slow, careful work."
        },
        {
          "name": "Scratched Message",
          "description": "Beside the token, words gouged into the niche stone by a drowning hand: 'DON'T BREAK HER — STILL HER. THE CLAPPER. IN THE WORKSHOP.' This points the party at the Clapper of Stilling in T4 and warns against the brute-force solution of smashing the bell.",
          "location": "Inside the offering niche, with the token."
        }
      ],

      "connections": {
        "T1": { "via": "Front door / punt mooring" },
        "T3": { "via": "Flooded stair down to the sluice undercroft" },
        "T5": { "via": "The bell-rope shaft, if anyone climbs it", "note": "Steep, slick, and the toll save has disadvantage this close to the bell." }
      }
    },

    "T3": {
      "name": "The Sluice Undercroft",
      "type": "trial",
      "summary": "A skill-challenge scene: the flooded machinery room beneath the nave. Reopen the old sluice to drain the chapel and buy time — under pressure, in the dark, with the water rising.",
      "readAloud": [
        "The stair bottoms out in a machine-room that is more river than room. Three great iron sluice-wheels stand rusted on their spindles along a submerged channel, and the millrace roars somewhere behind the wall, dammed and furious.",
        "A waterline of pale scum on the stone shows how far the flood has climbed — and a fresh, wet line two hands above it shows how fast."
      ],

      "trial": {
        "difficulty": "Standard",
        "complexity": "Standard",
        "dc": 13,
        "pace": "1 attempt per character per round; the bell tolls each round",
        "goal": "Reopen the dammed sluice to drain the lower chapel before the rising water seals the party in. Success drops the waterline (removing the rising-water clock and easing the T5 approach); failure floods T2 and T3, forcing the party to swim and giving the Tollkeeper the upper hand.",
        "tasks": [
          {
            "id": "A",
            "name": "Read the Machinery",
            "description": "Understand the three-wheel sluice: which wheel is the lock, which the gate, which the overflow. Until this is done, work on Task B is at disadvantage.",
            "successes": 2,
            "requirements": [],
            "skills": ["Investigation", "Arcana", "History"]
          },
          {
            "id": "B",
            "name": "Free the Wheels",
            "description": "The spindles are seized with eighty years of rust and grief. Break them loose — by strength, by oil and leverage, or by thawing the bound water with magic.",
            "successes": 3,
            "requirements": ["A"],
            "skills": ["Athletics", "Sleight of Hand", "Nature"]
          },
          {
            "id": "C",
            "name": "Hold Back the Race",
            "description": "When the gate opens the dammed millrace will surge through. Someone must brace the failing dam-timber or rig a diversion so the surge drains OUT instead of blowing the party off their feet.",
            "successes": 2,
            "requirements": [],
            "skills": ["Athletics", "Survival", "Acrobatics"]
          }
        ],
        "outcomes": [
          { "failures": "0", "tier": "Drained Clean", "description": "The sluice opens, the race diverts, and the floodwater sheets away. The rising-water clock STOPS, T2/T3 become merely damp, and the party approaches T5 dry-shod and confident. The Tollkeeper begins one step less hostile — the grief literally has less to stand in." },
          { "failures": "1-2", "tier": "Half-Drained", "description": "The water drops a few feet but the race won't fully divert. The rising-water clock slows but doesn't stop. Workable, with wet boots." },
          { "failures": "3", "tier": "Surge", "description": "A wheel gives way wrong and the dammed race blasts through. Everyone in T3 makes a DC 13 Strength save or is swept back up the stair (no damage, but dropped prone in T2 amid the husks). The water in the whole chapel rises five feet at once — non-swimmers now struggle." }
        ],
        "outcomeNarrations": [
          "With a groan that runs through the whole drowned building, the gate cranks wide. The black water finds its old road and RUSHES for it — and for the first time in eighty years, the level drops. The bell's next toll sounds smaller.",
          "The wheels turn, grudging, and the water sinks to your knees and stays there. Not drained — but no longer climbing as fast. It will do.",
          "Metal shrieks, the wrong timber lets go, and the dammed race detonates through the undercroft. The flood doesn't drain — it INVADES, and the bell above tolls as if it's pleased."
        ],
        "taskNarrations": {
          "A": {
            "crit-success": "The whole mechanism opens up in your mind like a diagram: lock, gate, overflow, and the one cracked spindle that's been holding the flood in place for a lifetime.",
            "success": "You trace the linkage — three wheels, one job. You know which to turn and in what order.",
            "failure": "The rust and the dark and the endless bell make the machinery swim in front of you. You're guessing.",
            "crit-failure": "You turn the overflow wheel thinking it's the gate; somewhere a counterweight drops and the water gives a hungry little surge.",
            "complete": "The sluice gives up its logic. Now it's just a matter of muscle and nerve."
          },
          "B": {
            "crit-success": "The spindle breaks free so cleanly you nearly go over backward — the wheel spins like it's grateful.",
            "success": "Rust flakes away in sheets and the wheel turns, an inch, then a foot.",
            "failure": "The wheel will not move. Eighty years of grief have welded it shut.",
            "crit-failure": "Something snaps that shouldn't — a tooth off the gear, a knuckle barked bloody — and the wheel jams harder than before.",
            "complete": "The last wheel turns. Behind the wall, the dammed race shifts, eager."
          },
          "C": {
            "crit-success": "You read the surge before it comes and pin the failing timber exactly right; the flood drains past you like a tide going out, neat as you please.",
            "success": "You brace, the surge hits, and you HOLD — the water finds its road and goes.",
            "failure": "The surge shoulders past your brace and a wall of water buys back everything you'd drained.",
            "crit-failure": "The dam-timber you're trusting splinters in your hands and the race throws you the length of the room."
          }
        },
        "challenges": [
          {
            "name": "The Rising Line",
            "description": "Every round the trial runs, the bell tolls and the water climbs one foot. After four rounds without Task C in progress, the undercroft exit begins to submerge — adding a swim check to any retreat. This is the clock that gives the trial its teeth."
          }
        ],
        "specialResourceSlots": [
          { "task": "B", "criterion": "Any source of heat, fire, or thaw (a firebolt, a heated weapon, a flask of alchemist's fire)", "effect": "1 automatic success on Task B — heat cracks the grief-bound rust loose." },
          { "task": "B", "criterion": "Expertise or a tool that grants advantage on the relevant check (thieves' tools, a crowbar, Guidance)", "effect": "Advantage on this character's Task B attempt." },
          { "task": "C", "criterion": "A spell or feature that controls water, creates a barrier, or grants a large creature/anchor (Shape Water, Mold Earth, a barbarian's brute strength, a familiar to scout the surge)", "effect": "1 automatic success on Task C, and the surge in the worst-case outcome is downgraded by one step." },
          { "task": "A", "criterion": "Proficiency in a relevant tool or knowledge skill (mason's tools, History, Arcana, a background tied to mills/water/machinery)", "effect": "This character may attempt Task A without the usual disadvantage and treats a roll of 9 or lower as a 10." }
        ]
      },

      "connections": {
        "T2": { "via": "Flooded stair back up to the nave" },
        "T5": { "via": "A maintenance crawl that surfaces inside the bell tower's base", "note": "Only passable AFTER the sluice drops the water at least one step." }
      }
    },

    "T4": {
      "name": "The Bellfounder's Workshop",
      "type": "exploration",
      "summary": "Above the waterline: Sera's master's workshop, dust-dry and untouched. Here lies the Clapper of Stilling — the tool to quiet the bell without breaking it — behind a maker's-mark puzzle.",
      "readAloud": [
        "The workshop loft sits above the flood, and crossing into it is like stepping out of a held breath. Everything is dry. Bell-molds in graduated sizes line the walls, a cold forge waits in the corner, and dust lies thick and undisturbed over a workbench still set with a half-finished casting.",
        "On the bench, in a velvet-lined case under a film of grime, rests a single bell-clapper of dark silver — and the case is locked with no keyhole, only a ring of nine maker's-marks around its lid."
      ],
      "secrets": [
        "The case holds the Clapper of Stilling: fitted into the Vesper, it silences the bell permanently and gently — the 'lay her to rest' path's best tool. Smashing the case is possible (AC 15, 10 HP) but the noise of breaking it briefly turns the floodwater grasping throughout the chapel.",
        "The nine maker's-marks are a sequence puzzle. The correct order is recorded in Sera's apprentice-token (T2) and in the workshop ledger on the shelf — the party does not need to guess blind."
      ],
      "safeRest": true,

      "pointsOfInterest": {
        "theCase": {
          "name": "The Maker's-Mark Case",
          "type": "puzzle",
          "description": "A casting-master's strongbox sealed not with a lock but with founder's-craft: nine small stamped marks around the lid that must be pressed in the order an apprentice learns them — the order in which a bell is made. Pressing them correctly opens the case; pressing them wrong stings the presser with a discharge of bound sorrow.",
          "checks": [
            {
              "skill": "Investigation",
              "dc": 13,
              "success": "Recognizes the marks as the nine stages of bell-casting (mold, core, cope, alloy, pour, cool, break-out, tune, consecrate) and that they must be pressed in process-order.",
              "successBy5": "Also recalls the correct order from craft knowledge alone, no ledger needed.",
              "synergy": "The workshop ledger on the shelf (DC 10 Investigation to find) spells out the order plainly. Sera's apprentice-token also encodes it for anyone who studies it."
            }
          ],
          "consequence": {
            "triggered": "A wrong sequence discharges bound grief: the presser takes 1d6 psychic damage and the tolling save is at disadvantage for them until the case is opened.",
            "avoided": "With the ledger or the token in hand, the order is known and the case opens cleanly with no check at all."
          }
        },
        "halfFinishedCasting": {
          "name": "The Half-Finished Bell",
          "type": "feature",
          "description": "The casting on the bench is Sera's interrupted masterwork — the bell she was making to earn her master's title when the flood came. It is unfinished, will never be finished, and seeing it is the clearest statement of what the Tollkeeper lost. A character who studies it (DC 10 Insight or History) understands, viscerally, that the spirit below is not a monster but an apprentice who never got to graduate."
        }
      },

      "treasure": [
        {
          "name": "Clapper of Stilling",
          "description": "See the Treasure Hoard for full properties. The peaceful key to the whole adventure: it ends the bell's tolling without destroying it.",
          "location": "Inside the maker's-mark case."
        }
      ],

      "connections": {
        "T1": { "via": "The second-story window over the waterwheel" },
        "T5": { "via": "A founder's catwalk that runs from the workshop straight to the bell-deck", "note": "The intended approach: arrive in T5 with the Clapper in hand." }
      }
    },

    "T5": {
      "name": "The Bell Deck",
      "type": "negotiation",
      "summary": "The climax: face to face with the Tollkeeper, the bell-bound remnant of Sera Coll. A negotiation, not a fight — unless the party makes it one. The Vesper hangs here, still tolling.",
      "readAloud": [
        "The bell deck is the one place the water never reached. The Vesper hangs at its center — a great silver bell gone black with age, swinging untouched, tolling, tolling — and wrapped around its rope, grown half into the metal, is what is left of the girl from the millyard. Older here. Colder. Her eyes are the deep grey of water with no bottom.",
        "'You came down,' she says, and the bell tolls under her words. 'Everyone always comes down. Have you come to make me stop? Or to ring it with me?'"
      ],
      "readAloudCondition": "If the party calmed Sera's echo in T1, add: she looks at you with something almost like hope, instead of only grief.",
      "secrets": [
        "The Tollkeeper is not evil and does not want to fight. She wants to know her ringing mattered and to be released from a duty she's been performing, alone, for eighty years. She attacks only if attacked, if the bell is seized by force, or if her patience runs out with a party that mocks or dismisses her.",
        "Two clean resolutions: (1) STILL her — fit the Clapper of Stilling from T4 and gently end the tolling, laying her to rest; (2) RING her — perform Sera's master-ringing properly (the thing Hester Coll asked for), which finishes her interrupted apprenticeship and frees her. Either ends the haunting. Smashing the bell also works but is the cruel path and has consequences (see hoard / outcomes)."
      ],

      "negotiation": {
        "npc": "the_tollkeeper",
        "request": "The Tollkeeper wants reassurance that her sacrifice meant something, and permission to stop. She is asking the characters, without knowing how to say it, to either release her or relieve her.",
        "motivations": ["Recognition (that her ringing saved the village)", "Rest (release from her endless duty)", "Completion (to finish her masterwork / apprenticeship)"],
        "pitfalls": ["Treating her as a monster to be put down", "Trying to take the bell by force", "Lying to her in a way she catches (she knows the bell's truth and the water tells her when she's deceived)", "Dismissing her grief or rushing her"],
        "attitude": "wary",
        "outcomes": [
          { "interest": 0, "tier": "Broken", "description": "Patience gone or attacked. The Tollkeeper's grief erupts — proceed to the trigger scene, The Final Toll." },
          { "interest": 1, "tier": "Refused", "description": "She will not trust them. She keeps tolling and turns away; the party must either leave the valley to its slow drowning or force the issue (combat)." },
          { "interest": 2, "tier": "Uneasy Truce", "description": "She lets them approach the bell but watches every move. They may attempt to Still or Ring it, but a fumble or an aggressive word tips her to Broken." },
          { "interest": 3, "tier": "Heard", "description": "She believes, for the first time, that someone sees her as Sera and not as the haunting. She steps back from the rope and lets them choose her fate — Still or Ring — without interference." },
          { "interest": 4, "tier": "Released", "description": "She offers it herself: 'Will you finish it for me? Or stop it for me? I can't do either alone.' The party's chosen ending plays out with her full cooperation, and the floodwater begins, at last, to recede on its own." },
          { "interest": 5, "tier": "At Peace", "description": "Beyond release — she is grateful. She gives them the bell's true blessing (see hoard: the Vesper's Grace), names them the village's new wardens, and the drowning dream lifts from the whole valley that very night." }
        ],
        "outcomeNarrations": [
          "The grief that has been pressing on this whole valley for a month finds a shape and a target. The water roars up the tower walls. 'Then RING WITH ME,' she screams, and the bell answers.",
          "She turns her face back to the bell. 'You're like all the others. You only came to make the noise stop.' The rope creaks. The toll goes on, and on, and you are not invited to change it.",
          "She lets you near the Vesper, but her grey eyes never leave your hands. 'Carefully,' she says. 'It's all I have left to do.'",
          "Something in her uncoils. 'You came DOWN,' she says again — but this time it sounds like thank you. 'Tell me what to do. I've forgotten how to be anything but the bell.'",
          "'Will you finish it for me?' She lets go of the rope for the first time in eighty years, and the bell's swing begins, gently, to slow. 'Or stop it for me. I can't do either alone.'",
          "She smiles, and it is Sera Coll's smile, sixteen and proud of her work. 'You heard me. You actually heard me.' The water lets go of the whole valley at once, draining away to leave only a clean, quiet pond and a bell that will toll, from now on, only when it's meant to."
        ]
      },

      "connections": {
        "T4": { "via": "The founder's catwalk" },
        "T3": { "via": "The maintenance crawl up from the undercroft" },
        "T2": { "via": "The bell-rope shaft down to the nave" }
      }
    }
  },

  "triggerScenes": [
    {
      "id": "the_final_toll",
      "name": "The Final Toll",
      "type": "combat",
      "trigger": {
        "conditions": [
          "tollkeeper_negotiation_reaches_broken",
          "party_attacks_the_tollkeeper_or_seizes_the_bell_by_force"
        ],
        "operator": "OR",
        "dmNote": "This fight is the failure state of the negotiation, not the intended climax — the BEST outcome is that this scene never triggers. If it does, play the Tollkeeper as a creature of overwhelming sorrow rather than malice, and leave the door open: at any point she can still be talked down (back to the T5 negotiation at Uneasy Truce) if a character presents Sera's token, performs the master-ringing, or speaks to the girl instead of the ghost."
      },
      "preamble": [
        "The Vesper's swing goes wild. The floodwater climbs the tower walls in a black spiral, the tolling becomes a continuous drowning roar, and the Tollkeeper rises off the rope with the grief of eighty years behind her.",
        "This is not a creature that wants to kill you. It is a wound that doesn't know how to close. Every round, the bell tolls and the water rises — end it quickly, by force or, better, by finally giving her grief somewhere to go."
      ],
      "suggestedLocations": ["T5"],
      "creatures": [
        { "id": "the_tollkeeper", "count": 1 }
      ],
      "notes": "The Tollkeeper fights defensively and targets whoever is most aggressive, ignoring characters who lower their weapons. Three 'mercy outs' end the fight instantly without reducing her to 0 HP: (1) present Sera's apprentice-token from T2; (2) fit the Clapper of Stilling from T4 to the bell (an action adjacent to the Vesper, contested by her grief — a DC 13 check); (3) succeed on a DC 15 Charisma (Persuasion) check to perform or promise the master-ringing. Reducing her to 0 HP 'wins' but shatters the bell and leaves the valley's dream to fade slowly and sadly over months rather than lifting at once — the hollow victory."
    }
  ],

  "hoard": {
    "location": "T4 / T5",
    "description": "Thornwell was never rich. Its treasure is craft and memory, not coin: a founder's masterpiece tool, a family heirloom, and — if the party earns it — the blessing of the bell itself.",
    "magicItems": [
      {
        "id": "clapper_of_stilling",
        "name": "Clapper of Stilling",
        "rarity": "Uncommon",
        "attunement": "No",
        "description": "A bell-clapper of dark, dream-quiet silver, forged to end sound rather than make it. Fitted into a ringing bell (an action), it silences that bell permanently and gently — the bell will never toll again unless the clapper is removed. As a one-use option it can instead be swung by hand against any single creature or object that is producing magical sound or vibration.",
        "benefits": [
          "Fitting it into the Vesper is the peaceful resolution to the adventure: the tolling stops, the haunting ends, and the Tollkeeper is laid to rest without violence.",
          "Once per long rest, as an action, swing the Clapper at a creature within 5 feet that is concentrating on a spell: the creature must succeed on a DC 13 Constitution save or its concentration ends and it is deafened until the end of its next turn.",
          "While held, you have advantage on saving throws against being deafened and against effects (like the tolling) that rely on harmful sound."
        ]
      },
      {
        "id": "bellfounders_gloves",
        "name": "Bellfounder's Gloves",
        "rarity": "Uncommon",
        "attunement": "Requires Attunement",
        "description": "Heavy leather gauntlets, scarred by hot metal and worn soft by generations of the Coll family. Hester Coll offers these as the reward for the The Last Coll hook; they are also simply found on the workshop forge if that hook isn't in play.",
        "benefits": [
          "You are immune to the harmful effects of nonmagical extreme heat and have resistance to fire damage from nonmagical sources (molten metal, forge-fire, boiling water).",
          "You have advantage on ability checks made with smith's tools and on Strength (Athletics) checks made to grip, hold, or hang from something (ropes, ledges, a swinging bell).",
          "Once per long rest you can grasp a single object or creature that is on fire, in molten metal, or being swept away by water and pull it free as part of your move, ignoring difficult terrain for that movement."
        ]
      }
    ],
    "consumables": [
      { "name": "Potion of Water Breathing", "count": 2 },
      { "name": "Potion of Healing", "count": 3 },
      { "name": "Vial of consecrated millpond water (acts as holy water)", "count": 2 }
    ],
    "specialItems": [
      {
        "id": "vespers_grace",
        "name": "The Vesper's Grace",
        "description": "Granted ONLY if the party reaches the 'At Peace' (interest 5) ending in T5. Not an object — a blessing spoken by Sera Coll as she is finally released.",
        "effect": "Each character present gains the Vesper's Grace: once, within the next thirty days, when you fail a saving throw against being frightened, charmed, or put to sleep, you may instead succeed, and a single clear bell-note rings that only you can hear. When used, the grace is spent. The DM may also rule that the valley of Thornwell will always offer these characters shelter, supplies, and a warm welcome — they are the bell's wardens now."
      }
    ],
    "mundaneWealth": [
      { "name": "Sera's apprentice-token (pewter, half-cast bell mark)", "value": "0 gp (priceless to the Tollkeeper)", "count": 1 },
      { "name": "Founder's-guild silver service, water-tarnished", "value": "75 gp", "count": 1 },
      { "name": "Reeve Voss's reward, if the Reeve's Plea hook is used", "value": "150 gp", "count": 1 }
    ],
    "coins": {
      "cp": 400,
      "sp": 120,
      "gp": 30,
      "pp": 0
    }
  },

  "bestiary": {
    "the_tollkeeper": {
      "name": "The Tollkeeper (Sera Coll)",
      "size": "Medium",
      "type": "Undead",
      "alignment": "Neutral (a grief, not a malice)",
      "cr": "4",
      "xp": 1100,
      "ac": 13,
      "acType": "unnatural stillness",
      "hp": 75,
      "hpFormula": "10d8 + 30",
      "speed": { "walk": 30, "fly": 20, "swim": 40 },
      "abilities": { "STR": 11, "DEX": 16, "CON": 16, "INT": 10, "WIS": 15, "CHA": 18 },
      "savingThrows": { "WIS": 4, "CHA": 6 },
      "skills": { "Perception": 4, "Insight": 4 },
      "conditionImmunities": ["charmed", "frightened", "exhaustion", "grappled", "restrained", "prone"],
      "damageResistances": ["necrotic", "cold", "bludgeoning, piercing, and slashing from nonmagical attacks"],
      "damageImmunities": ["poison"],
      "senses": { "darkvision": 60, "passivePerception": 14 },
      "languages": ["Common"],
      "proficiencyBonus": 2,
      "traits": [
        {
          "name": "Bound to the Bell",
          "description": "The Tollkeeper cannot move more than 60 feet from the Vesper and cannot be permanently destroyed while the bell tolls. If reduced to 0 hit points, she dissolves into water and reforms on the bell-rope at the start of her next turn UNLESS the bell has been silenced (by the Clapper of Stilling) or shattered. Fitting the Clapper or completing the master-ringing ends her without combat."
        },
        {
          "name": "Sorrow's Mercy",
          "description": "The Tollkeeper has disadvantage on attack rolls against any creature that has not attacked her, damaged the bell, or desecrated the chapel this combat. She is fighting because she's drowning in grief, not because she wants to hurt anyone — reflect this in every action."
        },
        {
          "name": "Toll of Grief",
          "description": "At the start of each of the Tollkeeper's turns, the Vesper tolls (see The Tolling). The save against this toll is DC 14 while she is manifested in combat."
        }
      ],
      "actions": [
        { "name": "Multiattack", "description": "The Tollkeeper makes two Drowning Touch attacks, or one Drowning Touch and one Wail of the Flood." },
        { "name": "Drowning Touch", "type": "Melee Spell Attack", "toHit": 6, "reach": 5, "damage": "2d6 + 3 cold plus 1d6 necrotic", "effect": "On a hit, the target's lungs fill with phantom water: it must succeed on a DC 14 Constitution save or be unable to speak (including verbal spell components) until the end of its next turn." },
        { "name": "Wail of the Flood", "type": "Ranged Spell Attack", "toHit": 6, "range": 30, "damage": "3d6 psychic", "effect": "DC 14 Wisdom save or the target is overcome by borrowed grief: it must spend its next turn moving toward the bell and may take no other action (a single sob of a curse, save ends at end of turn)." }
      ],
      "bonusActions": [
        { "name": "Dissolve", "description": "The Tollkeeper becomes a column of falling water until the start of her next turn: she gains resistance to all damage, can move through creatures and the gaps in the bell-frame, and cannot make attacks. She uses this to flee aggression, never to press an advantage." }
      ],
      "reactions": [
        { "name": "The Water Answers", "trigger": "A creature within 30 feet attacks her or strikes the bell.", "description": "The floodwater lashes the attacker: DC 13 Strength save or be pulled 10 feet toward the nearest deep water and knocked prone. She does NOT use this against a creature that merely defends itself." }
      ],
      "mercyOuts": "Present Sera's apprentice-token, fit the Clapper of Stilling, or succeed on a DC 15 Persuasion to promise the master-ringing — any of these ends the encounter instantly and peacefully, regardless of her remaining hit points."
    },

    "drowned_husk": {
      "name": "Drowned Husk",
      "size": "Medium",
      "type": "Undead",
      "alignment": "Unaligned",
      "cr": "1",
      "xp": 200,
      "ac": 11,
      "acType": "waterlogged",
      "hp": 32,
      "hpFormula": "5d8 + 10",
      "speed": { "walk": 20, "swim": 30 },
      "abilities": { "STR": 15, "DEX": 8, "CON": 15, "INT": 4, "WIS": 8, "CHA": 5 },
      "conditionImmunities": ["charmed", "exhaustion", "frightened", "poisoned"],
      "damageImmunities": ["poison"],
      "senses": { "darkvision": 60, "passivePerception": 9 },
      "languages": [],
      "proficiencyBonus": 2,
      "traits": [
        { "name": "Drowning Grasp", "description": "A creature grappled by the husk that is in or adjacent to deep water can be pulled under: at the start of the husk's turn, a grappled creature that is submerged must hold its breath or begin to drown." },
        { "name": "Amphibious", "description": "The husk can breathe air and water and is never impeded by deep water." }
      ],
      "actions": [
        { "name": "Slam", "type": "Melee Weapon Attack", "toHit": 4, "reach": 5, "damage": "1d8 + 2 bludgeoning", "effect": "If the target is a creature, the husk grapples it (escape DC 12). The husk has only two hands; it can grapple at most two creatures at once." }
      ]
    },

    "sorrow_wisp": {
      "name": "Sorrow-Wisp",
      "size": "Small",
      "type": "Undead (Incorporeal)",
      "alignment": "Unaligned",
      "cr": "1/8",
      "xp": 25,
      "ac": 12,
      "hp": 7,
      "hpFormula": "2d6",
      "speed": { "fly": 30, "hover": true },
      "abilities": { "STR": 1, "DEX": 14, "CON": 10, "INT": 6, "WIS": 12, "CHA": 13 },
      "damageImmunities": ["necrotic", "poison"],
      "conditionImmunities": ["charmed", "exhaustion", "frightened", "grappled", "paralyzed", "petrified", "poisoned", "prone", "restrained"],
      "senses": { "darkvision": 60, "passivePerception": 11 },
      "languages": [],
      "proficiencyBonus": 2,
      "traits": [
        { "name": "Minion", "description": "Any hit destroys a sorrow-wisp; on a miss that would still deal damage, it survives on a successful DC 10 save. Several wisps are dangerous only as a chorus." },
        { "name": "Incorporeal", "description": "Can move through creatures and objects as difficult terrain; takes 1d6 force if it ends its turn inside an object." },
        { "name": "Fades With the Grief", "description": "If the bell is silenced or the Tollkeeper is at peace, every sorrow-wisp winks out at once. They are only the overflow of her sorrow." }
      ],
      "actions": [
        { "name": "Keening Touch", "type": "Melee Spell Attack", "toHit": 4, "reach": 5, "damage": "1d4 psychic", "effect": "A creature reduced to grief by a wisp's wail (or already failing the tolling) takes this damage and has disadvantage on its next save against the tolling — the wisps exist to stack pressure, not to deal real damage." }
      ]
    },

    "sorrow_echo": {
      "name": "Sorrow-Echo (Sera's Echo)",
      "note": "Not a combatant. The grey figure in T1 is a harmless impression of the dead apprentice, included here for reference. It has no meaningful stat block: it cannot attack, cannot be attacked (weapons pass through falling water), and cannot leave its stone. Its only 'mechanic' is the social interaction in T1 — speaking to it kindly softens the Tollkeeper's starting attitude in T5; attacking or dismissing it hardens her.",
      "size": "Medium",
      "type": "Undead (harmless manifestation)",
      "alignment": "Neutral",
      "cr": "0",
      "xp": 0,
      "ac": 10,
      "hp": "—",
      "speed": { "walk": 0 },
      "abilities": { "STR": 1, "DEX": 10, "CON": 10, "INT": 10, "WIS": 14, "CHA": 16 },
      "senses": { "passivePerception": 12 },
      "languages": ["Common"],
      "proficiencyBonus": 2,
      "actions": []
    },

    "brine_weird": {
      "name": "Brine Weird",
      "note": "OPTIONAL. A guardian elemental the DM may place in T3 to raise the trial's stakes — a serpent of dirty floodwater coiled in the sluice channel. Use it only if the party is steamrolling and you want the undercroft to bite back.",
      "size": "Large",
      "type": "Elemental",
      "alignment": "Neutral",
      "cr": "3",
      "xp": 700,
      "ac": 13,
      "hp": 58,
      "hpFormula": "9d10 + 9",
      "speed": { "walk": 0, "swim": 60 },
      "abilities": { "STR": 17, "DEX": 16, "CON": 13, "INT": 6, "WIS": 12, "CHA": 8 },
      "damageResistances": ["fire", "bludgeoning, piercing, and slashing from nonmagical attacks while in water"],
      "damageImmunities": ["poison"],
      "conditionImmunities": ["exhaustion", "grappled", "paralyzed", "petrified", "poisoned", "prone", "restrained", "unconscious"],
      "senses": { "darkvision": 60, "passivePerception": 11 },
      "languages": ["understands Aquan but doesn't speak"],
      "proficiencyBonus": 2,
      "traits": [
        { "name": "Invisible in Water", "description": "While fully submerged, the weird is invisible. It can hide as a bonus action even while only lightly obscured by churning water." },
        { "name": "Bound to the Race", "description": "The brine weird cannot leave the flooded channels. Drain the sluice (Trial T3, Drained Clean) and it is left thrashing and helpless on the stone — a clever party can neutralize it without a single attack." }
      ],
      "actions": [
        { "name": "Constrict", "type": "Melee Weapon Attack", "toHit": 5, "reach": 5, "damage": "2d6 + 3 bludgeoning", "effect": "The target is grappled (escape DC 13) and pulled into the channel; until the grapple ends the target is restrained and may begin to drown if held under." }
      ]
    }
  }
}
;
