# 04 — Game structure: runs, winning, difficulty, progression

> Status: Draft v0.1 · Source: answers 4a–4c, plus 1c and 2c. All numbers are starting points for tuning.

## A run at a glance (4a: A, with endless)

```
The Council Before (pick starting Covenant deck + Veil difficulty)
│
├─ Dispensation 1 … 8
│    ├─ Era: Morning   → Revelation (cards) → Shop → Watch (sim)
│    ├─ Era: Noon      → Revelation (cards) → Shop → Watch (sim)
│    └─ Era: Trial     → Revelation with boss modifier → Shop → Watch
│
├─ Final grading → Telestial / Terrestrial / Celestial world
│
└─ Optional endless: Spirit World → Telestial → Terrestrial → Celestial
```

- **Length:** a core run of 8 Dispensations is designed for **30–60 minutes** if you keep Watches short. Players who linger in Watches can stretch a run across several sessions (autosave at every phase).
- 24 Revelations per core run, plus up to 4 endless levels.

## The world's state

Five **dials** (each −100 to +100) plus one **Collapse** meter (0 to 100).

| Dial | Negative pole | Positive pole | Mostly raised by | Mostly lowered by |
|---|---|---|---|---|
| **Truth** | Corrupt religion | True religion | Reveal, Inspire | Command overuse, neglect (drift) |
| **Joy** | Suffering | Happiness | Inspire, Plenty, gardens | Punish, war, the Shadow |
| **Progress** | Stagnation | Advancement | Inspire, schools, low interference | Punish, Command, isolation |
| **Redemption** | Condemned | Saved | Reveal, temples, Witnesses | Low Truth, pride, low Agency discount |
| **Agency** | Controlled | Free | Inspire, non-interference | Command, Reveal (veil thinning), tyranny |

**Collapse** rises with war, famine, tyranny, nihilism and runaway technology. It falls with Harmony, Joy and wise Punish plays. **If Collapse reaches 100, the world destroys itself and the run ends.** That is the only loss condition (4b).

### The interference trade-off

Each suit has a **Directness** value. Direct acts are powerful but cost belief-in-freedom and progress:

| Suit | Directness | Typical effect |
|---|---|---|
| Reveal | Very high | Big Witness, +Redemption, +Truth, thins the Veil, −Agency |
| Command | High | Big Glory, +Order (−Collapse), −Agency, −Progress |
| Punish | Medium | −Collapse, −Joy, can purge corruption (+Truth) |
| Inspire | Low | Small Witness, +Progress, +Joy, +Agency, but people credit themselves, not you (−faith) |

**The Veil** is the long-term version of this trade-off. Reveal thins it: faith comes easily, but Redemption earned under a thin Veil is discounted. Play only Inspire and the Veil stays thick: society advances, but people stop listening and Redemption stalls (2c).

## The Revelation (cards)

- **Deck:** 52 cards. Four suits × ranks 1–13. Each card shows its suit, rank, Witness value and a **two-to-three-word dial hint** ("+Truth −Agency").
- **Each Era:** draw 8, play up to 5 per hand, **4 hands and 3 discards** per Era (base).
- **Score:** `Witness × Glory`. Beat the Era's **target** to clear it.
- **Every hand also moves the dials**, based on the suits and ranks played and on how the people receive it (doc 05).

### Hand types (Balatro analogs, renamed)

| Hand | Pattern | Base Witness × Glory | Flavor |
|---|---|---|---|
| A Word | High card | 5 × 1 | A single act |
| Two Witnesses | Pair | 10 × 2 | "In the mouth of two witnesses" |
| Covenant | Two pair | 20 × 2 | Promise for promise |
| Trinity | Three of a kind | 30 × 3 | Three in one purpose |
| Ladder | Straight | 30 × 4 | Ascending steps |
| One Voice | Flush (5 same suit) | 35 × 4 | Single-minded act |
| Council | Full house | 40 × 4 | Three decide, two consent |
| Four Corners | Four of a kind | 60 × 7 | To the ends of the earth |
| **Full Witness** *(new)* | All four suits + any | 45 × 5 | Balance of all your ways |
| Fulness | Straight flush | 100 × 8 | Perfect act |

**Keys** (consumables) level up a hand type for the rest of the run.

### Era targets

| Dispensation | Morning | Noon | Trial |
|---|---|---|---|
| 1 | 300 | 450 | 600 |
| 2 | 800 | 1,200 | 1,600 |
| 3 | 2,000 | 3,000 | 4,000 |
| 4 | 5,000 | 7,500 | 10,000 |
| 5 | 11,000 | 16,500 | 22,000 |
| 6 | 20,000 | 30,000 | 40,000 |
| 7 | 35,000 | 52,500 | 70,000 |
| 8 | 50,000 | 75,000 | 100,000 |

Watch length also scales targets: each extra minute in the previous Watch adds a small percentage to the next target (see "Lingering" below).

### Skipping an Era

Before a **Morning or Noon** Era you may skip it (Trials can never be skipped). Skipping grants a reward tag (for example a free Pack, extra Light, or a free Key) but you **lose that Era's shop and its Watch**: fewer buildings, less culture, and no say for your people in the next style.

### Missing a target: Apostasy

Failing to reach a target **does not end the run.** Instead:
- Collapse +15, Truth −20.
- One random Godhood Power goes dormant for the next Era.
- The next Watch opens with a heresy outbreak.

Two Apostasies in the same Dispensation turns the Trial into a harder variant.

### Trials (boss Eras)

Each Dispensation has a signature Trial (doc 02) plus a pool of generic modifiers, for example:
- *Babel:* cards of one suit are face down.
- *Silence:* Reveal cards score zero Witness.
- *Golden Calf:* the highest-rank card in each hand is discarded.
- *Pharaoh:* Command cards also cost Agency twice.
- *Doubting:* first hand of the Era scores zero.

The Last Crisis in Dispensation 8 is chosen by the people model from the world's history.

## The Shop

Between Revelation and Watch. You spend **Light** (earned from clearing Eras, unused hands and interest on saved Light).

| Item | Balatro analog | Notes |
|---|---|---|
| **Godhood Powers** | Jokers | 5 slots. Permanent for the run |
| **Keys** | Planet cards | Level up a hand type |
| **Tablets** | Tarot cards | Change, enhance or copy cards |
| **Packs** | Booster packs | Pick 1 of 3–5 |
| **Vouchers → Mantles** | Vouchers | Permanent run upgrades (e.g. +1 hand) |

### Example Godhood Powers

| Power | Effect |
|---|---|
| **Still Small Voice** | Inspire cards give +3 Glory if no Reveal card is played this hand |
| **Pillar of Fire** | Reveal cards give ×1.5 Glory; Veil thins twice as fast |
| **Lawgiver** | Each Command card in hand: +20 Witness; −2 Agency each |
| **Refiner's Fire** | Punish cards also raise Truth |
| **Patient Gardener** | +1 Glory per minute spent in the last Watch (cap +10) |
| **Temple Builder** | Each temple on the map: +5 Witness to every hand |
| **School of the Prophets** | Insight from the Watch also counts as Light |
| **Many Mansions** | +1 Power slot |
| **Bread of Heaven** | When Joy < 0, Inspire cards give ×2 Glory |
| **The Shadow** *(rare, optional)* | ×3 Glory on all hands; Joy decays each Era; requires Devotion upkeep. Faithful people under the Shadow count double for Redemption. Can be dismissed for 20 Light |

## The Watch (sim)

After the shop, time flows on the world map.

- **Currencies** come from how people received your Revelation: **Devotion** (faithful), **Insight** (curious), **Plenty** (prosperous), **Harmony** (peaceful). They are generated by people, not by you.
- **Build:** Temples (Devotion), Schools and Libraries (Insight), Markets and Granaries (Plenty), Gardens and Courts (Harmony).
- **Route:** connect settlements so Witnesses, scholars and traders can travel.
- **Collect Prayers:** tap bubbles for currency and to reveal local needs.
- **Small miracles:** limited corrective acts (heal a plague, calm a storm, stop a battle) that cost currency and thin the Veil slightly.
- **Crises** spawn and spread (heresy, famine, war, plague, tyranny). Resolve them or they raise Collapse.

### Lingering (4b)

Every Watch lasts at least **one in-game year** (one seasonal cycle). After that, tap Reveal Yourself whenever you like, or stay as long as you want.

| Stay short | Stay long |
|---|---|
| Faster run, lower difficulty growth | More unique culture traits → more unique cards, styles and shop items |
| Fewer currencies and buildings | More buildings, deeper personalization of the population |
| Generic next Dispensation | People shape the next Dispensation's style and Trial |
| Low complexity | Complexity climbs like Mini Motorways: more settlements, more crises, higher next target |

This is the cozy side of the game. It should feel like a choice of playstyle, not a trap.

## Winning and grading (4b)

- **Survive** all 8 Dispensations without Collapse reaching 100.
- **God Score** at the end:
  `GodScore = Σ(weighted dials) × Redemption-quality × (1 − Collapse/200)`
  where Redemption-quality is discounted by how thin the Veil became.
- **World grade:**
  - **Telestial world:** survived.
  - **Terrestrial world:** God Score above the silver threshold, no dial below −25.
  - **Celestial world:** God Score above the gold threshold, all dials positive, Agency above +40.

## Endless (4a: "kind of C")

Four extra levels, each one Revelation with no Watch between them, targets ×3 each step:
1. **Spirit World** (temples count double), 2. **Telestial**, 3. **Terrestrial**, 4. **Celestial.**
Clearing all four with no Apostasy is the game's highest honor: *Worlds Without End*.

## Difficulty layers

1. **Within a run:** targets scale per Dispensation; Trials bend rules; Watch complexity grows with time.
2. **Veils (stakes):** stacking tiers unlocked by winning. Example: Veil 2 = Trials give no Light; Veil 3 = Collapse decays slower; Veil 4 = Powers can be corrupted; … Veil 8 = the Records always play at full strength.
3. **The Records (the real opponent):** the people model trained on your previous worlds gets more capable over time. **The Records are permanent and lifelong: they cannot be reset or frozen.** Early runs face naive people who are easy to steer; later runs face people who anticipate your patterns. See doc 05.

## What carries between runs (4c)

- **Unlocks, Balatro-style:** each Godhood Power, Covenant deck and Mantle has an unlock condition (for example "Win a run with Agency above +60" unlocks *Still Small Voice*). Once unlocked, it **enters the shop pool** and can be bought again in any future run.
- **Veils:** highest Veil cleared per Covenant deck.
- **The Records:** the trained people model, plus the Chronicle and Testament of every past world. One lifelong set per player, never reset.
- **Collection:** a gallery of discovered cards, Powers, styles, crises and religions your people invented.

---

## Decisions (settled 2026-11-20)

| # | Question | Decision |
|---|---|---|
| 1 | Eras per Dispensation | **Three: Morning, Noon, Trial** |
| 2 | Skipping | **Morning and Noon can be skipped for a reward**, losing that Era's shop and Watch |
| 3 | Resetting the Records | **Neither reset nor freeze.** The Records are permanent |
| 4 | Watch minimum | **One in-game year** |
