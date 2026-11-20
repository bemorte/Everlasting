# Everlasting

A god game for Apple platforms. You are an eternal being guiding a new world through **eight Dispensations**, trying to keep humanity from destroying itself while raising truth, joy, progress, redemption and agency.

It plays in two layers:

- **The Revelation**: a Balatro-style card game. Play hands from four suits (Command, Punish, Inspire, Reveal), score combos, and buy Godhood Powers.
- **The Watch**: a cozy real-time sim in the spirit of Plague Inc and Mini Motorways. Build temples, schools and markets, route prophets and traders, and correct crises as they spread.

Underneath both, the **people** are driven by a small on-device model that learns from every world you play. Those learned **Records** carry into your next world, so the people you face keep getting wiser. They are the real opponent.

## Blueprint

| Doc | Topic |
|---|---|
| [01 — Influences](docs/01-influences.md) | What we take from Balatro, Plague Inc, Mini Motorways, Roller Coaster Tycoon and SimCity |
| [02 — Cosmology and story](docs/02-cosmology-and-story.md) | The world's cosmology, the eight Dispensations, endless levels, opposition |
| [03 — Look and feel](docs/03-look-and-feel.md) | Visual languages, per-era styles, platform and tech, art plan |
| [04 — Game structure](docs/04-game-structure.md) | Runs, scoring, hands, shop, Watch, winning, difficulty, progression |
| [05 — Non-deterministic people](docs/05-non-deterministic-people-ai.md) | The people model, on-device training, open LLM options, iOS viability |

Each doc ends with multiple-choice **Open questions** to settle next.

## Status

Design phase. No code yet. Planned stack: Swift 6, SwiftUI, Metal shaders, RealityKit, MLX Swift. See doc 03.

## Working on this with Claude Code

```bash
git clone https://github.com/bemorte/everlasting.git
cd everlasting
claude
```

Claude Code reads [CLAUDE.md](CLAUDE.md) automatically for project context and conventions.
