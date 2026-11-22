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

**Final asset pass (set 2026-11-21).** The current Watch boards and buildings are blockouts. At the end, every Watch board and building is redrawn with more detailed, less polygonal surfaces and finer detail, changing little about style, layout or structure.

**Branching options (added 2026-11-21).** The Watch needs a building set for each new option in doc 02: The Waking, The Far Isles, The Lotus Kingdoms, The Jade Court, The Marble Cities, The Kept Lamp, The Rebirth, The Gathering and The Thousand Years. They are reviewed one at a time like the first eight and recorded below as each is posted.

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

**6 The Meridian** (approved). The world of classical empires: roads, philosophy, law courts and occupation. Built bigger and more advanced than The Law while staying in period: multi-storey marble, upper arcades, large domes on drums, a three-tier aqueduct. Materials: white marble, colonnades, round arches, terracotta tile roofs, bronze domes, gold on the temple only.
Temple: the white and gold sanctuary. A towering marble front with engaged columns, a gold door in a red stone frame and a gold-spiked roof, raised on steps inside a colonnaded court, with altar, ramp and bronze basin. Home: the courtyard villa, four tiled wings around a pool court with a small columned porch. School: the academy, a columned hall under a blue-grey roof with a curved bench and globe outside. Market: the forum, arcaded shops on two sides and a round bronze-domed pavilion. Granary: the great warehouse, buttressed with arched doors and a loading dock. Court: the hall of judgment, a tall nave with side aisles, columned porch and a green domed apse. Garden: formal hedged garden with fountain, cypresses and pergola. Works: the two-tier aqueduct.

**7a The Other Fold** (approved, revised toward Book of Mormon imagery). A branch of the people carried across the sea, building great cities in a lush new land. Look to the tradition of Book of Mormon illustration: massive coursed stone, heavy pillars, gold crenellated cornices, red cloth, cement houses, timber and earth defences, deep forest. Materials: warm massive stone, gold, pale cement, red and turquoise trim, thatch on stores and towers.
Temple: the temple on the terrace. A tall stone house in the manner of The Law's temple, with two gold-capped pillars, a gold door and a gold battlemented roof, set on a three-step terrace with two grand stairs and braziers. Home: a two-level cement house with roof terrace, beside a striped family tent and a maize plot. School: the house of records, a strong stone hall with a corner tower, gold door, a stack of gold plates on a stand and a gold ball on a pedestal. Market: the plaza, cloth canopies before a red-pillared hall with a painted frieze and gold roof edge. Granary: round stone storehouses with conical thatch. Court: the judgment seat, a gold seat under a green canopy before a pillared hall, with a written banner on a tall pole and a speaking tower. Garden: the waters in the forest, a waterfall pool among rocks, palms and flowering trees. Works: timber watchtower inside a palisade on an earth bank. Harbour: a large timber ship at the quay.

**7b The Great Apostasy** (approved). The long dark age. Authority is lost and belief hardens into tradition; building is taller and more skilled than ever, but the light has gone out of it. Materials: grey coursed stone, dark slate, timber framing over plaster, coloured glass, cobbles. There is no fire or smoke on the temple and almost no gold. Nothing is cross shaped.
Temple: the great minster. Twin spired towers, a steep slate nave with buttresses and coloured glass, a round window and a rounded east end; magnificent and cold, with no altar fire. Home: timber-framed houses over stone ground floors with steep slate roofs and smoking chimneys around a well. School: the cloister, an arcaded court and garden beside a tall-windowed hall and bell turret. Market: the market hall, a timber hall over open stone arches with a clock turret, stalls and a market pillar. Granary: the great barn with buttresses, cart doors and a hay wagon. Court: the keep, a square tower with round corner turrets, gatehouse and green banners on a mound. Garden: the walled herb garden with beds, a roofed well, beehives and a dovecote. Works: the watermill.

**8 The Fulness** (in review). The restored and modern world. Everything lost comes back at once and the people build higher and faster than any age before; the Trial is The Last Crisis. Materials: white granite, red brick, white trim, glass, steel, concrete, asphalt, green copper domes.

- Temple: the granite temple. Six spires in two groups of three, the tallest on the east with a gold finial, round and arched windows, lawn, flower beds, reflecting pool, iron fence.
- Home: brick family house with a porch, chimney, garage, car and picket fence.
- School: the university. Brick hall with a white portico and blue dome, glass library, quad.
- Market: the department store. Glass front, striped awning, sign, car park, delivery truck.
- Granary: the grain elevator. Concrete silos, headhouse, conveyor, freight train on a siding.
- Court: the capitol. Columned porch, colonnaded drum, green copper dome, flags.
- Garden: the city park. Fountain, gazebo, crossing paths, flower beds, lamps, benches.
- Works: the glass tower, with brick factories (sawtooth roofs, stacks) and lattice pylons on the land.


**Before the Dawn: The Waking** (approved). The very first people, at the moment they become people: fire, paint and the first words, in ice-age country with mammoths. **Only the temple is a cave, and the cave is a hole in the ground the people come up out of, never a rock structure.** Every other building type barely exists yet: each is a proto version so slight that the player only recognises it once later Dispensations show what it grows into. Materials: raw rock, bone and tusk, hide, branches, ochre, fire.

- Temple: the opening in the earth. A dark hole in the ground with a low ring of stones, worn steps going down toward a faint glow, ochre hand prints on the rim, footprints leading out, two tusks and an offering stone.
- Home: a branch windbreak, a hide to sleep on, a small fire.
- School: a flat rock where flint is struck, with chips around it and one marked stone.
- Market: a marked stone and two hides laid out with shells and flint.
- Granary: one drying rack and a stone cairn over a cache.
- Court: a fire, five stones to sit on, one staff.
- Garden: the watering hole. Pool, reeds, berry bushes, a young mammoth drinking.
- Works: the mammoth herd.

**The Wandering: The Far Isles** (approved, with its own map: the people have voyaged out to sea, so the Watch land for this option is small islands and lagoons in open ocean, not the usual continent). A people who read the stars and the swells and cross the great ocean to islands no one has seen. Small, scattered, free, bound together by the canoe. Materials: black basalt platforms, steep golden thatch, lashed dark timber, white bark cloth with red bands, red and yellow feather standards, palms.

- Temple: the stone platform. Two basalt terraces, a row of upright stones, a tall lashed tower wrapped in white cloth, a thatched sacred house, an offering stand, drums, carved banded posts, torches.
- Home: the thatched house on a stone footing with a porch, a cook shelter, a taro patch, bananas and a small outrigger.
- School: the navigators' circle. A ring of stones marking the star houses, an open pavilion, a stick chart, a training canoe.
- Market: the beach exchange. A long open pavilion with mats of fish and fruit, bark cloth on a drying line, baskets, a canoe drawn up.
- Granary: the raised storehouse on posts with a ladder, a stone-lined pit, coconuts.
- Court: the meeting house. A tall open hall on a paved court, a speaking stone, seat stones, feather standards.
- Garden: the taro terraces. Flooded stepped paddies with water channels, bananas, palms.
- Works: the voyaging canoe. Twin hulls, a deck hut and two claw sails at a lagoon beach, with a canoe shed.

**The Law: The Lotus Kingdoms** (approved at round 3: must read unmistakably as India. Onion domes on every pavilion, cusped arches, a pink palace of windows, blue-washed houses with balcony bays, marigold garlands, a four-part water garden with cypresses and peacocks, elephants with howdahs; plus the Hindu and Buddhist architecture of round 2). River kingdoms of the warm south: crowded, colourful and devout, where law is duty and every act is weighed. Materials: red sandstone, cream plaster, white domes, painted gate towers, saffron, magenta and turquoise cloth, strings of prayer flags, gold finials, lamp towers, lotus pools.

- Temple: the tower shrine. A tall curving stone tower with a ribbed cap and gold finial, a painted tiered gate tower in front, a pillared porch, small towers, a lotus tank, a lamp tower, a bell, prayer flags.
- Home: the blue house. Blue-washed house with white parapets, projecting arched balcony bays, a roof room with an onion dome, a garlanded arched door, a painted doorstep pattern, a rope cot.
- School: the monastery and great dome. Brick cell ranges with arched doors around a white relic dome with a gold umbrella spire, a stone railing and four gateways, a tree on a platform, small votive domes, prayer flags.
- Market: the bazaar. Arcaded shops, cloth-roofed stalls of spice, cloth and fruit, an elephant, and a wheeled festival chariot with a tiered canopy.
- Granary: the domed granaries. Banded brick drums with plaster domes, sacks, an ox cart, a wayside shrine and bell.
- Court: the palace of windows. Four stepped tiers of pink stone covered in small arched windows and balcony bays, white trim, onion-domed pavilions and corner towers, an elephant with a howdah.
- Garden: the four-part garden. Crossing water channels, a white marble pavilion with an onion dome at the centre, flower beds, cypresses, mango trees, peacocks.
- Works: the stepwell. Stepped terraces down to water, corner pavilions, a colonnade, a gateway.

**The Law: The Vermilion Gate** (in review; was "The Jade Court"). The East Asian option, set by the person as **one blend of samurai castle town and shrine style**. Island warriors bound by an unwritten code, and shrine keepers who tend the places where the unseen touches the land. Materials: white plaster, dark timber frames, grey tile with upturned eaves, vermilion gates and fences, stone lanterns, pine and cherry blossom.

- Temple: the great shrine. A double vermilion gate, lantern-lined path, offering hall, a raised sanctuary with a bark roof, crossed gold finials and ridge logs, a rope with paper streamers, a water pavilion, a great roped tree.
- Home: the warrior house. Raised timber house with a veranda inside a tiled plaster wall and gate, raked gravel court, armour stand.
- School: the training hall. Long tiled hall, archery targets, practice posts, weapon rack, tall banners.
- Market: the merchant row. Three shopfronts with door curtains and lanterns, goods tables, a handcart, rice bales.
- Granary: the plaster storehouses. Thick white walls over dark tile-patterned bases, stacked rice bales, a paddy.
- Court: the castle keep. A battered stone base with three white tiers, sweeping tiled roofs and gold roof ornaments.
- Garden: the pond garden. Pond, arched vermilion bridge, cherry trees, pine, lantern, raked gravel, tea hut.
- Works: the swordsmith. Forge hall with chimney, anvil, quench tub, sword rack, armour stand.

**The Meridian: The Marble Cities** (approved). Small free cities of thinkers, sailors and arguers, each proud and none willing to be ruled. Materials: white marble with painted blue and red trim and gold roof ornaments, whitewashed walls, terracotta tile, olive and cypress.

- Temple: the hilltop temple. A colonnaded marble temple with a painted frieze and blue pediment on a rock outcrop, a small treasury, an altar fire, bronze tripods, a stair up the rock.
- Home: the courtyard house. Whitewashed rooms with tile roofs around a paved court with a basin, a porch, a walled yard, amphorae, a loom.
- School: the wrestling court and grove. Colonnaded ranges around a sand court, a curved stone bench with a sundial, olive trees.
- Market: the long colonnade. A two-aisled marble hall, awning stalls, amphorae, a fountain house, a tripod.
- Granary: oil and grain store. Tiled storehouse, a row of great jars, an olive press, sacks.
- Court: the hillside theatre. A half circle of stepped stone seats around a round floor, with a stage building.
- Garden: the round shrine and spring. A ring of columns under a conical roof, a spring basin, olives, cypresses, flowers.
- Works: the war galley. A ram-prowed oared ship with a striped sail at ship sheds on the harbour.

**The Long Night: The Kept Lamp** (approved). While other lands forget, the desert cities gather every book they can find, copy it, argue with it and add to it. Scholars, merchants and star watchers. Materials: sand brick, turquoise and deep blue domes, blue and white tile, red and white striped arches, carved wooden lattice, toothed parapets, palms and orange trees.

- Temple: the great mosque. A turquoise dome over the prayer hall with two small blue domes, an arcaded tile court with a washing fountain, a tiled portal, a tall and a short minaret.
- Home: the courtyard house. Blank outer walls around a tiled court with a fountain and orange trees, lattice bay windows, a wind tower, a shaded roof terrace.
- School: college and observatory. A great tiled arch portal, arcaded study cells around a tile court, an observatory dome with an open slit, a brass ringed sphere.
- Market: the domed bazaar. A row of domed shops with awnings (spice, carpets, brass lamps, fruit), carpets laid out, a gate, a resting camel.
- Granary: the caravan inn. A fortified square with corner towers and one great gate, arcades inside, bales, jars, camels.
- Court: the palace court. Red walls and a tower with green tiled roofs, slender white arcades around a long pool and tile floor.
- Garden: the four rivers garden. Four beds split by water channels, an eight-pointed basin, a domed kiosk, palms, orange trees, roses.
- Works: the great waterwheel. A tall wooden wheel with clay pots lifting river water into an arched channel, with plots beside it.

**The Awakening: The Rebirth** (approved at round 2: rebuilt around the hallmarks of Italian Renaissance art and architecture). The world wakes up curious. Merchants, painters, sculptors, printers and inventors measure everything again and trust what they can see. Materials: striped and inlaid white, green and pink marble, a ribbed terracotta dome, pink diamond-patterned canal palaces with white arcades, marble statues everywhere, round arches, terracotta roofs, cypress, canals.

- Temple: the great dome. The ribbed terracotta dome leads, over an inlaid marble church with a round window, bronze doors and statues on the front; a striped bell tower behind; an eight-sided striped baptistery with gold doors; a chequered square.
- Home: the canal palace. A pink palace with a white diamond pattern, two tiers of pointed white arcades and a toothed white parapet, on a canal with gondolas, striped mooring poles and a small arched bridge.
- School: the villa of the arts. A white villa with a columned porch, pediment and low dome, statues on the roof; a sculptor's yard with a marble block and a tall statue; painters' easels.
- Market: the bridge of shops. A three-arched stone bridge crowded with small overhanging shop houses, a market arcade and merchant house on the bank, a gondola.
- Granary: warehouse and vineyard. A tall brick warehouse with arched bays, a hoist and a painted panel, barrels, a wagon, vine rows.
- Court: town hall and statue loggia. A fortress-like block with battlements and a tall clock tower, statues at the door, a three-arched loggia sheltering statues, a fountain, a chequered square.
- Garden: the hedge garden. Clipped hedge beds, a tiered fountain, statues, a water stair and grotto, lemon pots, a cypress row, a pergola.
- Works: the inventor's workshop. An open-fronted shop with a screw press and drying sheets, a winged flying machine on a stand, a brass ringed sphere, an easel.

**The Awakening: The Gathering** (approved). A people gather on the frontier in the 1830s and 1840s and build a city from nothing beside a wide river. Materials: squared logs, red brick, white limestone, wood shingles, wagon canvas, picket and rail fences. It leans this way when Truth and Agency lead. It names no one and shows no real emblem.

- Temple: the temple on the bluff. White limestone hall with pilasters, gold sun stones at the top of each and pale moon stones at the foot, a row of gold stars under the eaves, tall arched windows, and a tiered tower with a clock face, a green dome and a gold vane.
- Home: the log cabin with a stone chimney, lean-to, porch, woodpile, chopping block, kitchen patch, a quilt line and a rail fence.
- School: the white clapboard schoolhouse with a bell cupola, and a grove with log benches and a speaking stand.
- Market: the red brick store with a porch and sign, barrels and crates, and a log smithy with a glowing forge.
- Granary: the red barn with a hay door and hoist, haystacks, a corn crib and a yoke of oxen.
- Court: the brick hall with a white columned porch, a cupola and a flag.
- Garden: orchard, crop rows, sunflowers, bee skeps on a bench and a roofed well.
- Works: the wagon company. Covered wagons, oxen, a handcart and a campfire. On the land the docks hold paddle steamers.

**The Fulness: The Thousand Years** (in review, round 2: kept bright and happy, rebuilt on grounded, science-based ideas instead of floating rings and symbols). The far future option for the last slot: a world that solved its problems with real tools. Materials: pearl white, clear blue glass, deep blue solar glass, a little gold, running water, and green growing on every roof and ledge. Nothing floats and nothing glows without a reason.

- Temple: the temple of light. A round terraced hall with a tall central spire and twelve smaller spires in a ring, with four streams running out to the edges of the tile.
- Home: the garden home. Rounded white homes with glass domes and green roofs, roof solar, a small wind turbine, a rain tank, a greenhouse, a pond and a kitchen patch.
- School: observatory and launch pad. A slit-dome telescope, a glass research tower, a radio dish and a small rocket on its gantry.
- Market: the market under solar trees. Hexagonal solar canopies shading produce tables, a kiosk, crates and a delivery drone.
- Granary: the vertical farm. Stacked glass floors with a planted ring on every level, seed domes, round pivot fields and a crop drone.
- Court: the glass forum. Tiered seats under an open lattice dome with glass panes.
- Garden: the rewilded park. A great tree, a stream and reed pond, deer, rabbits, beehives and a weather station.
- Works: the green tower with a maglev train on a raised line. On the land, fusion plants (white ring buildings) replace factories and wind turbines replace power lines.

**The Fulness: The Hollow Years** (planned, working name). The dark far future, the mirror of The Thousand Years: the same science, used on the people instead of for them.

**Endless boards (planned).** The four endless levels each need their own Watch board and building set: The Spirit World, Telestial, Terrestrial and Celestial.

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
