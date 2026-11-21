# 03 — Look and feel, and the plan to get there

> Status: Draft v0.1 · Source: answers 3a–3c

## The two visual worlds

Everlasting deliberately has **two visual languages**, one for each layer of play (doc 01).

| | **The Watch** (sim) | **The Revelation** (cards) |
|---|---|---|
| Style (3a) | **Monument Valley pastel geometry** (flat vector with texture overlays), presented as a **tilt-shift diorama**. Mini Motorways stays the reference for play feel | **Stained glass** (flat vector with texture overlays), a **moderately different style per Dispensation**, same bones |
| Changes over the run? | **No.** The Watch keeps one consistent, calm look so it stays readable. Only the *architecture on the map* advances with technology. | **Yes.** Every Dispensation brings a new style. Later, the people help choose it. |
| Mood | Cozy, quiet, toy-like | Sacred, dramatic, ornate |
| Camera | Top-down diorama, pinch to zoom, slight tilt | Card table framed by a manuscript page |
| Orientation | **Landscape** | **Landscape** |

### The Watch: a living diorama

- **Shape language.** Soft-edged low-poly terrain, flat color fields, no textures. Settlements are clusters of simple forms; routes are clean colored strokes like Mini Motorways roads.
- **Tilt-shift.** Shallow depth-of-field blur at the top and bottom of the screen makes the world feel like a tabletop miniature. Light changes with time of day.
- **Readability first.** Each Watch currency has one color: Devotion (gold), Insight (blue), Plenty (green), Harmony (rose). Crisis bubbles use one alert color (deep red). The dials sit in a thin top bar.
- **Architecture advances quietly.** Huts, then mud brick, then stone, then columns, then spires, then steel, keeping the same silhouette families so players always recognize "temple", "school" and "market".

### Watch world rules (review round 2, 2026-11-21, awaiting sign-off)

The Watch is a generated land, not a hand-placed diorama. The render style (stepped tiles, flat shaded low-poly, one warm sun, saturated palette) never changes. What stands on the land advances with each Dispensation.

**Land**
1. The world is one large island on a 60 × 60 grid of stepped tiles: deep sea, shallows, sand, grass, hills, rock, snow peaks. Forest grows where the ground is wet, conifers on high ground.
2. Water always runs downhill from the mountains to the sea. Rivers never cross, climb or end inland.
3. Settlements start only on flat ground beside fresh water or a sheltered coast. The capital takes the best site.
4. Fields ring a settlement on flat ground. Forest is cleared as a settlement grows.
5. Routes follow the flattest path between settlements and cross rivers only on bridges.

**Buildings**
6. Each building has one job, one currency colour and one silhouette family that stays recognisable in every era: Temple (Devotion, gold), School (Insight, silver), Market and Granary (Plenty, bronze), Court and Garden (Harmony, green).
7. The temple stands on the highest ground in the capital. The market sits on the main route, the granary beside the fields, the court on the square, the school near the temple, the garden by water.
8. Nothing on the map is cross shaped.

**Three zoom levels**
- **The Land:** the whole world. Read routes, growth and where crises are spreading.
- **The Valley:** one settlement and its fields. Build and route here.
- **The Street:** people, prayers and small miracles.

**How each Dispensation changes the land**

| Dispensation | Temple | Homes and secular buildings | Infrastructure | Land |
|---|---|---|---|---|
| 1 Dawn | Altar of unhewn stones with a fire | Hide huts, drying racks, storage pit, council fire ring | Footpaths, a spring | Almost all forest, one clearing |
| 2 The Walking City | Raised platform shrine | Round mud houses, awning stalls, clay silos, elders' mound | Dirt tracks, flocks | First fields, small clearings |
| 3 The Waters | Stepped mud-brick temple | Flat-roofed brick houses, covered market, domed granaries, city gate court | Docks and boats, mud walls | Wide fields, cleared lowlands |
| 4 The Covenant | Tent of meeting inside a walled court | Striped tents, open trading ground, store hut, standing-stone court | Tracks, wells, flocks | Light footprint, camps move |
| 5 The Law | Hewn stone house with a bronze basin | Stone houses, porticoed school and court, vaulted storehouses | Stone walls and gates, paved roads | Terraced fields |
| 6 The Meridian | Columned temple with a gilded roof | Tiled-roof houses, colonnaded market, great barn, domed court | Aqueducts, paved roads, harbour | Villages along every river |
| 7 The Other Fold / The Great Apostasy | Stone hall with twin towers | Timber-frame houses, cloister school, market hall, mill, keep | Stone walls, mill races | Dense towns, slate roofs |
| 8 The Fulness | White modern temple with one spire and a gold finial | Brick houses, domed university, store, silos, civic hall, towers | Rail, power lines, factories | Cities, most land worked |

### Buildings by Dispensation (reviewed one at a time from 2026-11-21)

Each Dispensation's buildings must evoke their period through material, silhouette and ornament, not only through size. Every building sits fully inside its own tile. Reference sheets live in project files under `everlasting/review/` and the 3D models in `everlasting/brand/round6/models.js`.

**1 Dawn** (approved). One small family at the edge of the garden they have left. No metal, no writing, no walls. Materials: unhewn stone, hide, bone, wood, ochre, fire. Land: almost all forest, one clearing.
Temple: altar of stacked unhewn stones with a burning offering, ringed by ochre-banded standing stones. Home: hide lodge on poles with an ochre band and bone doorway. School: the painted stone with ochre handprints and sitting stones. Market: drying racks and a trade mat of shells and flint. Granary: raised cache on stilts, baskets below. Court: the council fire with log seats and a speaking staff. Garden: the garden edge, a grove with one great tree bearing golden fruit. Works: the spring.

**2 The Walking City** (approved). Many villages, one becoming the first true city. Farming, herding, fired clay, the first written marks. Materials: mud brick, lime plaster, reed thatch, red earth paint. Homes are round and share yards.
Temple: white plastered sanctuary on a two-tier earth mound, ringed by red-capped pillars, gold fire bowl on the roof. Home: three round thatched houses in a walled yard. School: the house of tablets, plastered and flat-roofed, tablets drying under a shade cloth. Market: striped awning stalls. Granary: beehive clay silos on a raised floor. Court: the elders' mound, seats under a shade tree behind a gateway. Garden: irrigated palm orchard. Works: the sheepfold.

**3 The Waters** (approved). River empires, walled cities, wealth and spreading cruelty. Materials: baked brick with buttressed walls, blue glazed brick, pitch, reed, white limestone stairs.
Temple: three-tier stepped temple with a white stair and a blue shrine crowned in gold. Home: flat-roofed courtyard houses with roof stairs and striped shade cloths. School: the tablet house, a buttressed hall with a blue frieze and tablet shelves in its yard. Market: the covered bazaar, a brick arcade under a reed roof. Granary: three barrel-vaulted storehouses with bronze doors. Court: the city gate, twin crenellated towers with a blue arch and green banners. Garden: terraced garden with a falling stream. Works: timber quay and reed boat.

**4 The Covenant** (approved). Nomads and herders moving between wells under a promise, while kingdoms and idols rise elsewhere. Nothing is built to last except stone markers. Materials: black goat-hair tents with woven red, indigo and cream bands, field stone, bronze, rugs. Ground is sand.
Temple: the tent sanctuary. A linen-curtained court on bronze-footed posts with a blue, purple and scarlet gate; inside, a bronze horned altar with a ramp, a bronze basin, and a tent of gilded boards under layered coverings with a pillar of cloud above it. Home: the black tents, fully dressed pavilions with cloth walls, banded roofs, scalloped valances, gold finials and a striped porch. All folding structures in this era are elaborate and well made, never makeshift. School: the teaching canopy, an indigo and silver shade over rugs, with a sighting stone for the stars. Market: the caravan halt, loaded camels by a striped awning. Granary: store tent, great jars, sacks and a hand mill. Court: the heap of witness, a cairn and banded pillar where oaths are sworn. Garden: the oasis. Works: well with a trough and flock.

**5 The Law** (approved, at the larger scale: buildings fill their tile and stand taller). The wanderers have a land, a written law and kings; empires and slavery press on every border. Everything that was cloth is now cut stone. Materials: coursed pale limestone, cedar beams and parapets, bronze fittings, gold on the temple, paved courts.
Temple: the stone house. A tall hall with lower side chambers and a cedar parapet, gold doors behind two free-standing bronze pillars, a great bronze basin on twelve bronze oxen, and a stepped stone altar, all in a walled paved court. Home: pillared courtyard house with a flat roof, roof stair and reed shade. School: the house of scribes, a columned porch with scroll niches and two stone tablets on a plinth. Market: stone stalls at the gate with awnings and a bronze balance. Granary: the pillared storehouse and a stone-lined silo. Court: the judgment gate, twin crenellated towers with benches inside and a judge's seat. Garden: vineyard and olive terraces with a stone watchtower and winepress. Works: the cistern with steps and a sweep.

**6 The Meridian** (in review). The world of classical empires: roads, philosophy, law courts and occupation. Built at the larger scale. Materials: white marble, colonnades, round arches, terracotta tile roofs, bronze domes, gold on the temple only.
Temple: the white and gold sanctuary. A towering marble front with engaged columns, a gold door in a red stone frame and a gold-spiked roof, raised on steps inside a colonnaded court, with altar, ramp and bronze basin. Home: the courtyard villa, four tiled wings around a pool court with a small columned porch. School: the academy, a columned hall under a blue-grey roof with a curved bench and globe outside. Market: the forum, arcaded shops on two sides and a round bronze-domed pavilion. Granary: the great warehouse, buttressed with arched doors and a loading dock. Court: the hall of judgment, a tall nave with side aisles, columned porch and a green domed apse. Garden: formal hedged garden with fountain, cypresses and pergola. Works: the two-tier aqueduct.

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

Targets: **iPhone only at first**, played in **landscape**. iPad and Mac come later. Apple TV and Vision Pro are out of scope for v1.

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
