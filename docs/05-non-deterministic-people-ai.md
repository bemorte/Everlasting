# 05 — Non-deterministic people: models, training and iOS viability

> Status: Draft v0.1 · Source: answers 5a–5c. Constraint: **free and on-device only**, open-source models preferred.

## The goal in one paragraph

The **game** is deterministic: rules, scoring, card effects and prices never surprise you. The **people** are not. They are driven by a small learned model that runs on the device and **trains on every world you play**. The trained model is saved as **the Records** (doc 02), so each new world's people inherit the experience of worlds before. Each player has **one lifelong Records** that can never be reset or frozen. A fresh model is naive and easy to steer; a well-trained one anticipates your habits. In effect, **the Records are the opponent you play against across your whole career** (5a).

## Three tiers

| Tier | What it does | Technology | Deterministic? | Required? |
|---|---|---|---|---|
| **1. Rules engine** | Scoring, card effects, dials, Collapse, buildings, crisis rules | Plain Swift (`EverlastingCore`) | Yes, fully | Yes |
| **2. The Spark model** (people policy) | Decides what people and groups *choose* each tick | Small neural network, **MLX Swift** for training, Core ML or MLX for inference | Seeded: same seed + same weights = same world | Yes |
| **3. The Voice** (language layer) | Writes religion names and doctrines, the Chronicle and Testament, event and crisis text, names | Apple Foundation Models first, small open LLM as fallback, templates last | Text varies; mechanics never depend on the prose | Optional |

The key separation: **models choose from menus that the rules engine defines.** A model can never invent a new mechanic, a new currency or a score change. This is how we get "within expected parameters" (5c).

---

## Tier 2: the Spark model (the heart of it)

### What an "agent" is

Simulating every individual with a neural net is too heavy, and unnecessary. We simulate **households and groups**:

- **Households** (≈ 300–2,000 per world): the unit that works, worships, studies, trades, migrates, marries, rebels.
- **Institutions** (≈ 5–60): religions, states, guilds, schools, armies. Each has leaders who are themselves agents.
- **Individuals** are generated on demand when you tap someone (doc 01), drawn from their household's state, so the thought bubble is consistent with the sim.

### Observation → action

Each tick, each agent sees a compact vector (≈ 64–128 numbers):
- its needs (food, safety, belonging, status, meaning), wealth, health, education;
- beliefs: allegiance to each religion, trust in you, and how much it heeds **the Light** (its conscience prior);
- neighborhood: nearby buildings, routes, crises, neighbors' average beliefs;
- recent divine acts: which suits you played lately, how directly, and what followed.

It outputs a probability distribution over a **fixed action menu** (≈ 20–30 actions), for example:
`work · trade · study · worship · preach · build · migrate · marry · create-art · invent · join-religion · found-religion · reform-religion · obey · resist · rebel · raid · go-to-war · seek-peace · hoard · give · emigrate-along-route`

Institutions have their own menus: `expand · tax · persecute · tolerate · codify-doctrine · split · ally · conquer · fund-school · build-temple`.

### Network size and cost

- A shared MLP or tiny transformer, **≈ 100k–2M parameters** (under 10 MB).
- One batched forward pass for 2,000 households is microseconds-to-milliseconds on any recent iPhone GPU. We run it a few times per in-game year, not per frame.
- **This tier works on every device we support.** It is not the risky part.

### How it learns (on-device training)

Each agent is trained to pursue **its own wellbeing**, not your God Score. Its reward mixes needs met, status, belonging and meaning, with a weight on the Light. That is what makes the people feel real: they respond to your acts the way self-interested, partly conscientious beings would.

1. **During a run** we log trajectories (observation, action, outcome) to a replay buffer on disk.
2. **After each Dispensation** (a natural pause) we run a short training pass: a few hundred gradient steps with a policy-gradient method (PPO or advantage actor-critic) using **MLX Swift**, which supports automatic differentiation and optimizers on Apple GPUs. Expected time: a few seconds on A17/M-class chips.
3. **Between runs**, a longer pass can run as a `BGProcessingTask` while the phone is charging.
4. The new weights are saved to the Records with a version and hash.

### Why a trained population is harder (difficulty by learning)

Untrained people use a **naive prior**: they mostly respond to divine acts the way the designer intended. As the Records mature, the learned policy takes over and people start doing what self-interested agents do:
- learning that **outward piety earns blessings** without inward change, which produces corrupt religions (Truth −);
- learning to **anticipate your Punish patterns** and hide behavior instead of changing it;
- learning that **Command-heavy gods can be leveraged** by kings who claim divine right;
- learning to **ignore Reveal** if you spam it (a thinning Veil makes witnesses common).

Implementation:
```
policy(obs) = mix( naive_prior(obs), learned_policy(obs), α )
α = maturity of the Records (0 on the first world, rising with worlds played)
```
- **Veils** (difficulty tiers, doc 04) cap α: Veil 1 caps it low, Veil 8 forces α = 1.
- A **difficulty governor** keeps the learned policy from becoming unwinnable: if a world's dials trend far worse than a reference bot achieves with the same weights, α eases off for that world.
- A shipped **base Records** model, pre-trained on a Mac through self-play against scripted god-bots, means the first world is coherent, not random.

### Determinism and replays

- All sampling uses a **seeded RNG**. A world is reproducible from `(seed, Records weights hash, player inputs)`.
- That enables replays and bug reports. (Sharing seeds or Records with other players is out of scope for v1.)
- The rules engine validates every action. An invalid or impossible choice is dropped.

### Group dynamics and emergence

Religions, empires, art movements and sciences are not scripted. They **emerge** when enough agents choose `found-religion`, `invent`, `create-art` or `conquer` and the rules engine crystallizes them into institutions. Relationships between groups (alliances, schisms, trade, war) come from institution agents acting on each other. The final crisis in Dispensation 8 is selected by scoring which threat the world's history has made ripe (doc 02).

---

## Tier 3: the Voice (language layer)

### What it writes (5c: all of it, within parameters)

| Output | How it stays bounded |
|---|---|
| **Religion names and doctrines** | The sim picks a structured doctrine: a set of 4–8 **tenets** from a fixed vocabulary (≈ 60 tenets), each tagged true, partial or corrupt relative to the game's hidden "true" set. Truth is computed from tenets, **never from prose**. The LLM only names the faith and phrases its creed. |
| **Chronicle entries** | Given a structured event (who, what, where, outcome), it writes 1–3 sentences in the voice of the Dispensation. |
| **The Testament** (your people's scripture) | Assembled from Chronicle events, Witness revelations and the doctrine tenets. The LLM phrases short verses; structure and accuracy come from the sim. |
| **Event and crisis text** | Fills a template slot for a crisis the rules engine already chose. |
| **Names** | People, places, faiths, dynasties, styled per culture trait. |
| **Art** (5c: C) | **Not by image model.** Art variation comes from the parametric style system in doc 03, driven by culture traits the sim produces. See viability below. |

All generation uses **schema-constrained output** (JSON with fixed fields and length limits), runs **between phases** (never blocking a turn), and is **cached** into the Records.

### Content guardrails

Because the subject is religion, guardrails matter:
- block real-world religion, church, prophet and deity names and real scripture;
- block slurs, sexual content and real political figures;
- every generated string passes a local filter; failures fall back to the template grammar.

### Template fallback (always available)

A hand-written grammar system (Tracery-style) can produce every output type. Devices that cannot run an LLM, or players who disable it, get this. The game must be fully playable on the fallback alone.

---

## Model choices (free only)

### Tier 2: no external model needed
We train our own small network. **Tools:** MLX Swift (Apple, MIT license) for on-device training and inference; optionally Core ML for inference on the Neural Engine. **Cost: free.**

### Tier 3 backend order (decided)

1. **Apple Foundation Models** where the device supports Apple Intelligence. Free, no download, guided generation built in. Not open source, which is the one exception to the open-source preference.
2. **Open model fallback** (Qwen3 0.6B class) as an optional download for capable devices without Apple Intelligence or with it turned off.
3. **Template grammar** everywhere else.

### Tier 3 candidates (verify current versions at build time)

| Model | Size (4-bit) | License | Notes |
|---|---|---|---|
| **Qwen3 0.6B** | ≈ 0.4–0.5 GB | Apache 2.0 | **Recommended open fallback.** Clean license, good at structured JSON for its size |
| Qwen3 1.7B | ≈ 1.0 GB | Apache 2.0 | Better prose; needs 8 GB RAM devices |
| Gemma 3 1B | ≈ 0.7 GB | Gemma terms | Good writing quality; license has use restrictions to review |
| SmolLM2 360M / 1.7B | ≈ 0.25 / 1.0 GB | Apache 2.0 | Smallest option; weaker but very light |
| Llama 3.2 1B | ≈ 0.7 GB | Llama community license | Fine, but attribution and naming terms apply |
| *Apple Foundation Models* | Built into the OS | Free, **not open source** | **Primary backend.** No download, guided generation built in, only on Apple Intelligence devices |

Runtime: **MLX Swift** (`mlx-swift-examples` includes LLM loading) or **llama.cpp** (MIT) with Metal. One runtime only; MLX keeps us on a single stack with Tier 2.

---

## Viability on iOS: honest assessment

| Capability | Verdict | Why |
|---|---|---|
| Rules engine, seeded and deterministic | ✅ Easy | Standard engineering |
| Spark model **inference** (households, institutions) | ✅ Viable on all supported devices | Tiny network, batched GPU inference |
| Spark model **training on-device** after each Dispensation | ✅ Viable | Small model, small buffer, seconds of compute. MLX Swift supports training on iOS. Needs testing on the oldest supported iPhone for thermals |
| Records persisting and improving across runs | ✅ Viable | Weights are a few MB. iCloud sync is possible later |
| Learned people being genuinely "smarter" over time | ⚠️ Viable but needs design care | RL on small populations is noisy. The naive-prior mix, the governor and a pre-trained base model make it reliable. Expect several tuning iterations |
| LLM text generation (Qwen3 0.6B class) | ⚠️ Viable on newer devices | Realistic on 8 GB RAM devices (iPhone 15 Pro and later, M-series iPads). Older devices use the template fallback. Model is an optional ≈ 0.5 GB download (Background Assets) to keep the app small |
| Fine-tuning the LLM per player (LoRA) | ❌ Not recommended for v1 | Technically possible with MLX, but slow, hot and battery-heavy for little gain. Instead we condition the LLM on Records summaries (retrieval), which gets most of the "my people remember" feel for free |
| On-device image generation for art | ❌ Not recommended | Multi-GB models, seconds per image, inconsistent style, licensing friction. The parametric style system gives "endless variations" with art direction intact |
| Free and offline | ✅ Yes | Everything above runs locally. No servers, no API costs |

**Bottom line:** the part you care most about, people who learn across worlds and become your opponent, is the most viable part. It uses a small custom model, not a big LLM. The LLM is decoration on top, and the game must never depend on it.

### Device and size budget (targets)

- App download: under 200 MB without the LLM.
- Optional Voice pack: ≈ 0.5 GB.
- Records: under 20 MB per player, including history.
- Memory: Spark model + sim under 300 MB; with the Voice loaded, under 1.5 GB (may need the increased-memory-limit entitlement).
- Training pass: under 10 seconds per Dispensation on A17 Pro class hardware.

---

## Build plan

1. **Rules-only sim** with scripted heuristic agents (this becomes the naive prior).
2. **Spark model v0** trained on a Mac with MLX (Python or Swift) via self-play against god-bots. Ship as base Records.
3. **On-device inference** in the app; confirm determinism with seed replay tests.
4. **On-device training** after each Dispensation; measure time, heat and battery on the oldest target device.
5. **Records maturity and the α mix**; tie to Veils; build the governor.
6. **Template text system** for all Voice outputs.
7. **Voice tier** with Apple Foundation Models first and Qwen3 0.6B as fallback, behind a feature flag, with schema-constrained output and filters.
8. **Records screen** that turns what the model learned into plain-language lessons (for example "Your people have learned that kings who claim your name are rewarded").
9. **Playtest the "opponent" curve**: does run 10 feel meaningfully different from run 1?

---

## Decisions (settled 2026-11-20)

| # | Question | Decision |
|---|---|---|
| 1 | Records scope | **One lifelong Records per player** (and, per doc 04, never reset) |
| 2 | Showing what people learned | **Yes, a Records screen** with plain-language lessons |
| 3 | Voice backend | **Apple Foundation Models first**, open model (Qwen3 0.6B class) as fallback, templates last |
| 4 | Sharing worlds | **No sharing in v1** |
