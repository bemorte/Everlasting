# Everlasting browser prototype

A lightweight, phone-playable HTML prototype that simulates a full run before the Swift build. No build step: serve this folder (`python3 -m http.server`) and open `index.html`, or open the published artifact.

## What it plays
- **Run:** 8 Dispensations × 3 Eras (The Revelation, The Kingdom, The Faith Crisis with its Trial). Starts at The Waking (Before the Dawn) and Dawn; the other six slots are chosen by the people from the dials, the Watch and the witness (doc 02 lean rules). The Northern Halls is not in yet (no art).
- **Cards:** 52-card deck in Command / Punish / Inspire / Reveal, poker hands plus Four Suits and the three secret hands, Witness × Glory, 4 hands / 3 discards / hand size 8, targets from `prototype/tuning.json`. Exact score preview, suit bars with ghosted landing points, press-and-hold for dial changes (doc 07 decision 14). Three starting decks.
- **Shop:** Godhood Powers, Keys (the 13 god-framework Keys), Tablets, Packs, Mantles, each with a "fits your run" line (finding S1).
- **Watch:** Mini Motorways-style path drawing between towns on the final-pass board of the current Dispensation; believers walk paths and carry travellers to Temple / School / Market / Court; deliveries pay Devotion / Insight / Plenty / Harmony; overflow spreads ink and raises Collapse; prayer bubbles; buildings rise on their own and add cards; Plague Inc-style society tree; camera pulls out as towns appear; Reveal Yourself after one year.
- **Witness:** pick 1 of 7 after each Faith Crisis Watch; becomes a temporary Power and leans the next slot.

## Stand-ins and assumptions (not settled design)
- The people (choices, names for God, Voice lines, bios) are a seeded stand-in for the Records model.
- Suit levels: +1 Witness per 2 levels on that suit's cards (open question in doc 07).
- Watch-to-cards mapping: Temple adds Reveal cards, School adds Inspire, Court adds Command, cleansing ink adds Punish, Market adds Light.
- Collapse starts at 20 (run-through finding).

## Assets
Everything in `a/` is rendered from the existing brand pipeline, no new art:
- Cards, Powers, Keys, Tablets, Packs, Mantles, dial and suit emblems: `brand/round7/ds.py` (court figures from the twelve-figure set; witness silhouettes are those figures in one flat tone).
- Watch boards (`board_*.webp`): `brand/round6/world.js` final-pass 3D scenes, rendered with a new `watch` camera view centred on the towns (same seed for every era, so it is one world through time).
- Watch buildings (`b_*.webp`): cut from the `review/final-pass/` kit rows.
- Logo: `brand/round7/uploads3/everlasting-symbol.svg`.

## Rebuilding the assets
`tools/` holds the scripts used: `gen.py` + `shot.js` (card and UI assets from `brand/round7/ds.py`), `world.js` (copy of `brand/round6/world.js` with the added `watch` view and town projection) and `renderk.js` (render `HD=2 node renderk.js <era>:watch:2400:1120`), `boards.py` (WebP boards and `boards.js` town positions). Building sprites were cut from the `review/final-pass/` sheets.

Playable link: https://claude.ai/artifact/62Y67hnVW6k6cYMxPZAA1r
