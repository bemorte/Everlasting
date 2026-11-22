# Prototype v0: chat run-through

Step 1 of the prototype plan (docs/07). Plays the card phase honestly so a chat game master never invents numbers.

- `tuning.json`: every number (Balatro starting values, suit dial effects). Change numbers here.
- `dealer.py`: seeded dealer and scorer. `python3 dealer.py new SEED`, then `preview`, `play`, `discard` with 1-based card positions.
- `RULES.md`: the one-page rules sheet.

Not modelled yet: shop, Godhood Powers, Keys, Tablets, Trials, the Watch, the witness pick. The game master narrates those by hand from RULES.md during the run-through.
