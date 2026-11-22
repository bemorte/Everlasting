# 01 — Influences: what we take from each game

> Status: Draft v0.1 · Source: Bemorte's answers to blueprint questions 1a–1c

Everlasting is **three games stitched into one loop**, and each influence owns a specific layer. We do not blend them everywhere; we use each where it is strongest.

| Layer | When it happens | Primary influences | Feel |
|---|---|---|---|
| **The Revelation** (card layer) | Each *Era* inside a *Dispensation* | Balatro | Tense, turn-based, combo-hunting |
| **The Watch** (sim layer) | Between Eras | Plague Inc, Mini Motorways, Roller Coaster Tycoon | Cozy, real-time, corrective |
| **The People** (simulation model) | Always running underneath | SimCity, Plague Inc | Emergent, surprising, alive |

The core design rule from 1a/1b: **in the Revelation you make point-in-turn choices; in the Watch you make corrective choices while time flows.** Both feed, and are fed by, the people model.

---

## Balatro → the Revelation layer

**What we take**
- **Run structure.** Antes become *Dispensations* (8 of them), blinds become *Eras* (3 per Dispensation: The Revelation, The Kingdom, The Faith Crisis). The Faith Crisis is the "boss blind": it carries a **Trial**, a rule-bending modifier. See [04-game-structure](04-game-structure.md).
- **Hand building and scoring.** You draw cards from four suits (Command, Punish, Inspire, Reveal), play up to five, and score a combo. Score is `Witness × Glory` (our chips × mult).
- **Jokers → Godhood Powers.** Permanent, slot-limited powers that bend scoring rules. The shop between Eras sells them.
- **Planet cards → Keys.** Consumables that level up a specific hand type permanently for the run ("priesthood keys" in spirit, never named that way).
- **Tarot cards → Tablets.** Consumables that alter cards in your deck (change suit, add an enhancement, duplicate).
- **Stakes → Veils.** Stacking difficulty tiers unlocked by winning.
- **Endless mode.** After Dispensation 8, four extra levels (Spirit World + three Glories) where change gets steeply harder.
- **Readable feedback.** Every card says, in a few words, which world dials it pushes (for example "+Truth, −Agency"). This is the "know roughly how it will affect the dynamics" requirement from 1c.

**What we change**
- Score is not the only output. Every hand also **moves the world's five dials** (Truth, Joy, Progress, Redemption, Agency) and the Collapse meter. A huge score that tanks Agency can win the Era and still doom the world.
- Missing an Era's target does **not** end the run. It triggers an *Apostasy* (penalties, lost faith, higher Collapse). Only self-destruction ends a run.

## Plague Inc → the Watch layer, plus world readout

**What we take**
- A **world map that reacts in real time** while you spend points. Ideas, faiths and crises spread region to region.
- **Pop-up bubbles** to collect (Plague Inc's DNA bubbles) become *Prayers*: tap to collect Devotion, and they also tell you where people are hurting.
- **Counter-pressure.** Just as Plague Inc's world researches a cure, our people develop resistances: skepticism, institutional corruption, false prophets, and the Shadow.
- **Global stat panel** that makes the dials legible at a glance.

**What we change**
- You are not trying to wipe out humanity; you are trying to keep it from wiping itself out. The "spread" mechanic is used for truth, art, science and also for corruption.

## Mini Motorways → the Watch layer's hands-on play

**What we take**
- **Routing, kept light.** (Updated 2026-11-22: drag a path, Mini Motorways style, and believers walk it; see doc 07.) Tap two settlements to connect them, and prophets, scholars and traders travel the route. Ideas move along routes; missing or overloaded routes create bottlenecks (unrest, isolation, heresy hotspots). No tile-by-tile road drawing, so it stays comfortable on a phone.
- **Escalating pressure over time.** The longer you stay in a Watch, the more settlements appear and the more demand piles up. This is the cost of lingering (from 4b).
- **Leaving a Watch.** Every Watch lasts at least **one in-game year** (one full seasonal cycle). After that, you tap **Reveal Yourself** whenever you are ready to start the next Era.
- **Limited weekly-style upgrades.** At intervals you pick one of two gifts (a temple, a school, a bridge, a granary).
- **Minimal, calm visual language** for the sim (see [03-look-and-feel](03-look-and-feel.md)).

## Roller Coaster Tycoon → buildings and visible happiness

**What we take (1b: "B-ish")**
- **Placing structures** that change how people nearby feel and behave: temples, schools, markets, libraries, hospitals, watchtowers, gardens.
- **Per-person thought bubbles.** Tap a person to see a single short thought ("I wish the river road was safer"). Deliberately just one line, no biography screen. The one exception is the witness pick once per Dispensation (doc 07), which shows seven short biographies. This is our main window into the non-deterministic people.
- **Upkeep and wear.** Structures decay or get corrupted if neglected.

**What we skip**
- Fine-grained construction (no tile-by-tile coaster building). Placing a structure is one tap plus a valid location.

## SimCity → the people underneath

**What we take**
- **Systemic simulation.** Population, economy, belief, culture, technology and conflict interact. You set conditions; you do not puppet people.
- **Zoning by influence, not by command.** Your buildings and routes shape what people choose, but people still choose.

**What we change**
- Agents are driven by a **learned model that improves across your runs** (see [05-non-deterministic-people-ai](05-non-deterministic-people-ai.md)). That model is effectively the opponent.

---

## How the layers trade with each other (1c)

```
Revelation (cards) ──── moves dials, earns Light ────▶ Shop (Powers, Keys, Tablets)
       ▲                                                    │
       │ new cards, styles,                                 │ Powers enhance cards
       │ shop pool shaped by culture                        ▼
The People model ◀── choices, beliefs, culture ── The Watch (sim)
       │                                                    ▲
       └──── how people *receive* your acts ────────────────┘
             gives Watch currencies (Devotion, Insight, Plenty, Harmony)
```

- How the population **receives** your card plays determines which Watch currencies they generate. A faithful population yields **Devotion**, which buys temples during the Watch, which raises Redemption. A curious one yields **Insight** for schools and observatories. A prosperous one yields **Plenty**; a peaceful one yields **Harmony**.
- You can lean into a specialty: a more advanced, happier, more faithful or more protected society. Each specialty has its own Power synergies.

---

## Decisions (settled 2026-11-20)

| # | Question | Decision |
|---|---|---|
| 1 | Tablets and Keys | **Keep both**, like Balatro. Keys level up hand types; Tablets change, enhance or copy cards |
| 2 | Ending a Watch | **Fixed minimum, then free.** Minimum is one in-game year (doc 04), then tap Reveal Yourself |
| 3 | Routing depth | **Light, one-tap connections** between settlements |
| 4 | Tapping a person | **Thought bubble only** |
