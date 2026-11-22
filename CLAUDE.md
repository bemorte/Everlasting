# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this project is

**Everlasting** is a god game for Apple platforms (iPhone only at first, landscape; iPad and Mac later). The design blueprint lives in `docs/` and is the source of truth until code exists. Read the relevant doc before proposing changes:

- `docs/01-influences.md`: the three layers (Revelation cards, Watch sim, People model) and what each influence contributes
- `docs/02-cosmology-and-story.md`: cosmology concept map, the eight Dispensations, endless levels, the Shadow
- `docs/03-look-and-feel.md`: visual rules per layer, per-Dispensation styles, tech stack
- `docs/04-game-structure.md`: dials, hand types, targets, shop, Watch, grading, Veils, unlocks
- `docs/05-non-deterministic-people-ai.md`: the Spark model, the Records, the Voice, viability
- `docs/06-content-and-brand-guide.md`: name, voice and tone, lore canon, card and visual identity rules. Follow it for any player-facing text or art
- `docs/08-watch-art-principles.md`: the eight rules for every Watch building, tree, animal and land tile. Follow it for any Watch art

## Non-negotiable design rules

1. **The game is deterministic; the people are not.** Rules, scoring and card effects live in a pure Swift rules engine. Models only choose from action menus the engine defines, sampled with a seeded RNG.
2. **Free and on-device only.** No paid APIs, no required network. Open-source or free models only.
3. **The game must be fully playable without the LLM** (template text fallback).
4. **Tone: aligned with Latter-day Saint cosmology, but not obvious to outsiders.** In anything player-facing, use the in-game names from the concept map in doc 02, never the internal reference terms. No real scripture, prophets, church names or logos.
5. **The Watch keeps one consistent visual style; only the Revelation (card layer) changes style per Dispensation.**

## Vocabulary

Dispensation (ante; eight slots per run, two fixed and six chosen by the people, see doc 02) · Era: Morning, Noon, Trial (blinds) · Revelation (card phase) · Watch (sim phase) · Witness × Glory (chips × mult) · Godhood Powers (jokers) · Keys (planets) · Tablets (tarots) · Mantles (vouchers) · Veils (stakes) · Light (shop currency) · Devotion, Insight, Plenty, Harmony (Watch currencies) · Dials: Truth, Joy, Progress, Redemption, Agency · Collapse (loss meter) · The Records (persistent trained people model)

## Planned code layout (not created yet)

```
EverlastingCore/    Swift package: rules engine, sim, scoring. No UI imports. Fully unit tested.
EverlastingModel/   Swift package: Spark model inference and training (MLX Swift), Records I/O
EverlastingVoice/   Swift package: optional LLM text + template grammar fallback
Everlasting/        App target: SwiftUI shell, Revelation (SwiftUI + Metal), Watch (RealityKit)
training/           Mac-side scripts for pre-training the base Records via self-play
```

## Conventions

- Swift 6 with strict concurrency. Sim runs off the main actor.
- Every random draw goes through the seeded RNG in `EverlastingCore`. Never use `Int.random()` or `SystemRandomNumberGenerator` in game logic.
- Tuning numbers (targets, card values, costs) belong in data files, not hard-coded.
- When a design decision changes, update the matching doc in `docs/` in the same commit.
