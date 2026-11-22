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

## Pipeline notes

The rich render mode is `HD=2` in `brand/round6/renderk.js` (see `RICH()` in `models.js`). Sample 4 (`review/33-*`) is the starting point. For the full pass it needs to move from painted textures to real-material textures (principle 3), and from per-era colours to a shared base palette (principle 6).
