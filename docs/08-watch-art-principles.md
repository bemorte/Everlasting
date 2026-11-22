# 08 · Watch art principles

Rules for every Watch building set, tree, animal and land tile. Set by Bemorte on 2026-11-22 after detail samples 3 and 4, before the full detail pass. Where this doc and doc 03 differ on Watch models, this doc wins.

## The one-line rule

**Same layout, clean forms, real materials.** Detail comes from what a surface is made of and how light falls on it, never from piling up small pieces.

## The eight principles

| # | Topic | Decision | What it means in practice |
|---|---|---|---|
| 1 | Part count | **Moderate detail** | Keep roughly today's parts and layout per building. Each part is one clean, smooth form. Nothing is built from clusters of tiny lumps (sample 3's 30-lump trees and bumpy wool were the mistake). |
| 2 | Where richness comes from | **Texture and light, balanced** | Every surface gets a moderate material texture, and every scene gets soft shadows, gentle top-light gradients and ambient occlusion. Neither carries it alone. |
| 3 | Texture feel | **Real material** | A high-end miniature diorama: real wood grain, stone, brick, plaster, thatch, fur, leaves, water. Texture is at believable scale for the object. Not painterly brush marks, not tidy graphic patterns. |
| 4 | Edges | **Crisp built, soft nature** | Buildings, walls, props and boats keep crisp edges with a small bevel that catches light. Trees, animals, rocks and terrain are fully smooth and organic. |
| 5 | Nature realism | **Simplified real** | True proportions and anatomy (a mammoth reads as a mammoth, a palm as a palm), with simplified, smoothed forms. Not cute or chunky, not photoreal. |
| 6 | Colour | **Shared base, era accent** | One natural base palette for all boards (grass, soil, stone, wood, water, foliage). Each Dispensation adds two or three accent colours of its own. |
| 7 | Zoom | **Silhouette first** | At the furthest phone zoom every object must read by shape and colour alone. Texture is the reward for zooming in. One model per object. |
| 8 | Temples | **Same rules, richer materials** | Temples follow the same form rules as everything else. They stand out through the best materials: gold, glowing glass, fine dressed stone. This replaces the earlier note that temples should be the most intricate pieces. |

## Rules carried over from earlier rounds

- The Watch keeps one consistent visual style across all Dispensations (CLAUDE.md rule 5). Eras change shapes and accents, not the rendering rules.
- Buildings are big: they fill their tile and are tall, elaborate in shape, and true to their era's time period.
- Nothing is low-res on purpose: no flat-shaded facets, and enough segments that curves look round.
- Pre-Dawn structures stay proto (a hole in the ground for the cave). The Far Isles board is islands and sea.

## Checklist for each set

1. Does it read at the furthest zoom by silhouette and colour?
2. Is every part one clean form, with no lump clusters?
3. Does each surface look like a real material at the right scale?
4. Are built edges crisp and bevelled, and natural forms smooth?
5. Are the colours from the shared base, plus no more than three era accents?
6. Do the animals and trees have true proportions?
7. If it is a temple, do the materials (not extra parts) make it the richest thing on the tile?

## How the principles are applied (full pass, 2026-11-22)

The full pass ran over all 19 building sets and the land with the rich render mode (`HD=2`). No model changed its layout or part count. What changed:

- **Materials, not colours.** Every part is given a material from its colour and shape: coursed stone, brick, adobe, plaster, concrete, plank, timber, bark, shingle, clay tile, thatch, straw, cloth, hide, fur, shag, wool, leaf, needle, grass, soil, sand, paving, marble, weathered copper, glass, water, snow. Each material is a tileable procedural texture with its own relief, projected at one believable scale for the whole world, so a brick is the same size on every building.
- **Shared base palette.** Greens, woods, soils, sands and greys are pulled toward one shared hue each before texturing. Saturated colours (cloth, paint, tile glazes, gold, neon) are left alone and act as the era accents.
- **Light.** One sun with soft shadows, a sky fill, and ambient occlusion on every scene. Smoke, flame, glass and light beams are excluded from occlusion.
- **Edges.** Boxes carry a small bevel. Trees, animals, rocks and terrain are smooth forms.
- **Nature.** Broadleaf trees are a bark trunk with five smooth leaf masses; conifers and cypresses are turned forms; palms have ribbon fronds; animals keep true anatomy with fur, shag or wool as texture; mammoth trunks and tusks are smooth tapered tubes.
- **Era rules.** Modern eras (The Fulness, The Thousand Years, The Hollow Years) read grey masonry as concrete and green roofs as weathered copper; The Hollow Years reads timber-coloured boxes as painted metal.

## Pipeline notes

Sources live in project files under `everlasting/brand/round6/`:

- `mats.js`: material textures, the shared palette (`harmonize`) and the colour-and-shape classifier (`classify`).
- `models.js`: all building sets. `RICH()` is true when `HD=2`.
- `world.js`: the land, including the Far Isles board.
- `post.js`: the final render with ambient occlusion.
- `runall.sh era...`: renders both building rows, the valley and the street at double size, then `final_sheet.py` composes the sheet using `labels.json`.

Final sheets are in `everlasting/review/final-pass/`, one per set, plus the Far Isles board.
