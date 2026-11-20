# 03 — Look and feel, and the plan to get there

> Status: Draft v0.1 · Source: answers 3a–3c

## The two visual worlds

Everlasting deliberately has **two visual languages**, one for each layer of play (doc 01).

| | **The Watch** (sim) | **The Revelation** (cards) |
|---|---|---|
| Style (3a) | **A + B**: clean minimalist 2D in the Mini Motorways tradition, presented as a **tilt-shift 3D diorama** | **C + D**: painterly, illuminated-manuscript art, a **different style per Dispensation** |
| Changes over the run? | **No.** The Watch keeps one consistent, calm look so it stays readable. Only the *architecture on the map* advances with technology. | **Yes.** Every Dispensation brings a new style. Later, the people help choose it. |
| Mood | Cozy, quiet, toy-like | Sacred, dramatic, ornate |
| Camera | Top-down diorama, pinch to zoom, slight tilt | Card table framed by a manuscript page |
| Orientation | **Landscape** | **Landscape** |

### The Watch: a living diorama

- **Shape language.** Soft-edged low-poly terrain, flat color fields, no textures. Settlements are clusters of simple forms; routes are clean colored strokes like Mini Motorways roads.
- **Tilt-shift.** Shallow depth-of-field blur at the top and bottom of the screen makes the world feel like a tabletop miniature. Light changes with time of day.
- **Readability first.** Each Watch currency has one color: Devotion (gold), Insight (blue), Plenty (green), Harmony (rose). Crisis bubbles use one alert color (deep red). The dials sit in a thin top bar.
- **Architecture advances quietly.** Huts, then mud brick, then stone, then columns, then spires, then steel, keeping the same silhouette families so players always recognize "temple", "school" and "market".

### The Revelation: illuminated eras (3b: A)

The same **structures and surfaces** every Dispensation: card frame, table, shop, score panel, dial gauges. Each Dispensation **restyles** them with its own palette, ornament, typography and material.

| # | Dispensation | Style direction | Palette | Material cues |
|---|---|---|---|---|
| 1 | Dawn | Cave pigment, hand-print ornament | Ochre, charcoal, bone | Stone, bark |
| 2 | The Walking City | Early pictographic, clay seals | Terracotta, river blue | Clay tablets |
| 3 | The Waters | Flowing ink, wave borders | Indigo, silt, storm grey | Reed paper, water stains |
| 4 | The Covenant | Desert textile, starfield patterns | Saffron, night blue, sand | Woven wool, tents |
| 5 | The Law | Carved relief, hieratic symmetry | Granite, lapis, gold leaf | Stone tablets, papyrus |
| 6 | The Meridian | Mosaic and fresco | Olive, terracotta, white | Tesserae, plaster |
| 7 | The Other Fold | Engraved metal plates, glyph borders | Bronze, jade, jungle green | Hammered metal |
| 8 | The Fulness | Stained glass to modern print | Prismatic, then clean whites | Glass, paper, light |
| E | Endless levels | Pure light, then three distinct glories | Silver → moon white → sun gold | Light itself |

**Card faces:** common cards show the suit symbol, rank and the Dispensation's ornament frame. Only **rare cards** (and Godhood Powers) get full illustrations.

**Familiar structures** means the card frame, suit symbols and layout never move. A player's hands learn the UI once; their eyes enjoy a new world each time.

### The four suits

| Suit | Symbol idea | Base color (shifts per era) | Felt as |
|---|---|---|---|
| Command | A raised hand / scepter | Deep crimson | Authority, law |
| Punish | Lightning / sword | Iron black | Judgment, consequence |
| Inspire | Flame / dove | Warm gold | Influence, invitation |
| Reveal | An open eye / star | Clear white-blue | Direct presence |

### People-driven styles (endless variations)

From answer 3b: **the people in the sim can decide the style of the next Dispensation.** The style system is parametric, not a set of fixed illustrations.

- Each Dispensation has a **base style** (the table above).
- During a Watch, the people's culture accumulates **style traits**: for example "loves geometry", "river people", "martial", "mourning", "prosperous", "scholarly".
- At the next Revelation, those traits **modulate** the base style through a controlled set of parameters (decided: **medium** range): palette shift, ornament density and motif set, typography, card-back pattern, and ambient music layer. Styles never blend two Dispensations together.
- The result: the same "The Law" Dispensation looks austere in one world and opulent in another, always within a hand-designed range.

## Sound

- **Watch:** soft ambient bed, generative and calm; small tactile sounds for placing and routing.
- **Revelation:** each Dispensation has a theme played on period-evoking instruments. Combo scoring escalates musically (choir layers on big Glory multipliers).
- **Haptics:** card snap, combo crescendo, Collapse warning heartbeat.

## Platform and tech (3c: Apple platforms only)

Targets: **iPhone and iPad first, Mac (native Apple silicon) second**, played in **landscape**. Apple TV and Vision Pro are out of scope for v1.

| Need | Choice | Why |
|---|---|---|
| Language | **Swift 6** | First-party, strict concurrency for the simulation thread |
| App shell, menus, shop | **SwiftUI** | Fast iteration, native feel, built-in accessibility |
| Card layer | **SwiftUI + Metal shaders** (`.layerEffect`, `.colorEffect`) | Foil, glow, paper and ink effects on cards; per-era styling as shader parameters |
| Watch diorama | **To be decided by a one-week bake-off**: RealityKit (true 3D, tilt-shift post-process) vs SpriteKit (2.5D pre-rendered isometric layers) | Pick on frame rate on the oldest target iPhone, battery, and how cozy it feels. SceneKit is deprecated, so it is not a candidate |
| Simulation core | **Pure Swift package** (`EverlastingCore`), no UI imports | Testable, deterministic, runs on Mac for fast tests and model training |
| ML | **Core ML** for inference, **MLX Swift** for on-device training | See doc 05 |
| Persistence | **SwiftData** for saves, plain files for Records and model weights | Simple and local |

Minimum OS: decide after the prototype; likely current iOS minus one.

## Plan to achieve it

1. **Greybox (2–3 weeks).** Watch as flat 2D shapes, cards as plain rectangles with text. Prove the loop is fun before any art.
2. **Style frames (parallel).** Paint one Revelation frame for Dispensations 1, 5 and 8, plus one Watch diorama shot. Lock the suit symbols and card frame.
3. **Parametric style system.** Build the card renderer so palette, ornament set and typography are data. One Dispensation done end to end.
4. **Diorama bake-off, then pass.** One week each prototyping the Watch in RealityKit and SpriteKit; pick one. Then build tilt-shift, time of day, and architecture tiers for three building types.
5. **Remaining Dispensations.** Roll out the other styles as data plus asset packs.
6. **People-driven style traits.** Wire culture traits into the style parameters.
7. **Polish.** Sound, haptics, accessibility (Dynamic Type in menus, color-blind-safe suit shapes, reduced motion).

**Art sourcing (free-friendly):** hand-made vector ornaments and shader-generated textures keep cost low. Any AI-assisted art used in development must be from models whose licenses allow commercial use, and generated assets are curated by hand. In-game generation is limited to parameters, not images (see doc 05).

---

## Decisions (settled 2026-11-20)

| # | Question | Decision |
|---|---|---|
| 1 | Watch rendering | **Prototype RealityKit and SpriteKit for one week each**, then pick on performance and feel |
| 2 | Orientation | **Landscape** for the whole game |
| 3 | Card faces | **Suit symbol + era ornament**; illustrations only on rare cards |
| 4 | People-driven styles | **Medium**: palette, ornament, typography and card backs. No blending of two Dispensations |
