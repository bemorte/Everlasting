# 07 — Mechanics workshop (Nov 2026)

> Status: Notes v0.1 · Source: Bemorte, 2026-11-22. These notes change docs 01, 04 and 05. Open questions are being answered as tap cards; each answer is folded into the matching doc and listed in the Decisions table below.

## 1. Era names (settled)

The three Eras of every Dispensation are now called **The Revelation**, **The Kingdom** and **The Faith Crisis** (formerly Morning, Noon, Trial). Nothing structural changes: The Revelation is the easiest, The Kingdom is harder, The Faith Crisis is the boss Era. The Faith Crisis still carries a **Trial**, the rule-bending boss modifier, so "signature Trial" keeps its meaning.

**Naming clash to settle:** "the Revelation" was also the name of the card phase. One of the two needs a new name (open question N1).

## 2. The reveal mini-game: choosing a witness (new)

When the player taps **Reveal Yourself** to end a Watch, a short mini-game opens before the next card phase:

- **Seven people** from the current Watch are offered, each with a **short biography** written from their actual sim state (household, faith, needs, what they have lived through in this world).
- The player picks **one** to reveal themself to.
- That choice **steers the direction of the next Dispensation** (it feeds the slot-scoring in doc 04) and **changes how the next card phase plays** (for example which suit is favoured or which Trial is likely).

How it fits the rules:
- The seven candidates and their stats are chosen by the rules engine and the Spark model, sampled with the seeded RNG. The Voice (doc 05) only writes the biography prose; the template grammar writes it when no LLM is available. Mechanics never depend on the prose.
- Biographies are an exception to "thought bubble only" (doc 01): everyday taps still show one thought; only this moment shows a short biography. People still have no faces (doc 06): silhouettes only.

Open questions R1–R4 below.

## 3. The card phase: Balatro, with no guessing (new direction)

- It should **feel very much like Balatro**: the same tension, combo hunting and run escalation.
- **The player always knows what a hand will do once scored.** Before playing, a live preview shows the hand's effect on the **Command, Punish, Inspire and Reveal levels** (and therefore on the dials), not just its Witness × Glory. No hidden effects on card text; random effects are shown as ranges or odds.
- **Deck building is a core strategy**, as in Balatro: the player can shape the deck toward a particularly powerful hand or an **ideological approach** (for example a Command-heavy lawgiver deck or an Inspire-only "hidden god" deck).
- **Advancing is the core mechanic.** Beating each Era's target and climbing through the run should carry the same pressure as Balatro's antes.

Open questions C1–C4 below.

## 4. The Watch: Mini Metro feel, Plague Inc depth (to be workshopped)

Direction from Bemorte:
- The **addictive, satisfying feel of Mini Metro** with **simple controls**.
- Combined with Plague Inc's system of **farming points and evolving society in the direction you choose**.

This is the least settled part of the game, so it gets the most questions (W1–W10). Current design in docs 01 and 04 (one-tap routes, buildings, Prayers, crises, one in-game year minimum) stays until answers replace it.

---

## Open questions

| # | Area | Question |
|---|---|---|
| N1 | Naming | Which gets renamed: the card phase or the first Era? |
| R1 | Witness | How often does the pick of seven happen? |
| R2 | Witness | What does the chosen person do in the next card phase? |
| R3 | Witness | How much do the biographies reveal about the mechanical effect? |
| R4 | Witness | What happens to the chosen person afterwards? |
| C1 | Cards | What does the hand preview show? |
| C2 | Cards | What happens when you miss an Era's target? |
| C3 | Cards | How does a deck commit to an ideology? |
| C4 | Cards | How does the deck change between Eras? |
| W1 | Watch | What is the main thing your finger does? |
| W2 | Watch | What travels along your routes? |
| W3 | Watch | What is the scarce resource, like Mini Metro's lines? |
| W4 | Watch | What do you farm, and how? |
| W5 | Watch | What do you spend it on to steer society? |
| W6 | Watch | What spreads across the map, Plague Inc style? |
| W7 | Watch | How can a Watch go wrong? |
| W8 | Watch | How does the map grow? |
| W9 | Watch | How long should a typical Watch be? |
| W10 | Watch | What does the Watch hand to the next card phase? |

## Decisions

| # | Question | Decision |
|---|---|---|
| 1 | Era names | **The Revelation, The Kingdom, The Faith Crisis** (2026-11-22). The Faith Crisis keeps its Trial modifier |
| 2 | Reveal mini-game | **Pick 1 of 7 people** from the Watch, from model-written short bios; steers the next Dispensation and the card phase (2026-11-22) |
| 3 | Card clarity | **Effects on the Command, Punish, Inspire and Reveal levels are always visible before scoring** (2026-11-22) |
| 4 | W1 Main Watch control | **Drag paths between settlements**, Mini Metro style; redraw lines as needs shift (2026-11-22) |
| 5 | W4 Farming | **Both**: deliveries along paths pay a steady trickle; rarer prayer bubbles give bursts and hint at local needs (2026-11-22) |
| 6 | W5 Spending | **A society tree, like Plague Inc**: points grow traits (writing, law, astronomy, charity...) that push society the player's way. Buying buildings with points is out; how buildings appear is still open (2026-11-22) |
| 7 | W7 Failure in the Watch | **Overflow raises Collapse**: towns left waiting fill with unrest; each overflow adds Collapse, the Watch continues (2026-11-22) |
| 8 | W8 Map growth | **Camera pulls out**, Mini Metro style: start on a small valley, the view widens as new towns appear at the edges (2026-11-22) |
| 9 | W9 Watch length | **Player decides freely**: keep one in-game year minimum, then stay as long as you like as it gets harder (2026-11-22) |
| 10 | W10 Watch to cards | **Cards plus currency**: some things the people build add cards to the deck; leftover points become Light (2026-11-22) |
