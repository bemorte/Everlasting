#!/usr/bin/env python3
"""Everlasting prototype dealer v0. Deals, previews and scores card-phase hands honestly.
State lives in a JSON file so a chat game can continue across turns.

  python3 dealer.py new SEED          start a run (Dispensation 1, The Revelation)
  python3 dealer.py show              show hand, preview nothing
  python3 dealer.py preview 1 3 5     show what playing these cards would do (no change)
  python3 dealer.py play 1 3 5        play cards (positions in hand, 1-based)
  python3 dealer.py discard 2 4       discard and redraw
"""
import json, random, sys, itertools, os
from collections import Counter
HERE = os.path.dirname(os.path.abspath(__file__))
T = json.load(open(os.path.join(HERE, "tuning.json")))
STATE = os.environ.get("EVERLASTING_STATE", os.path.join(HERE, "state.json"))
SYM = {"Command": "C", "Punish": "P", "Inspire": "I", "Reveal": "R"}
DIALS = ["Truth", "Joy", "Progress", "Redemption", "Agency", "Collapse"]

def witness(rank): return T["rank_witness"].get(str(rank), rank)
RN = {1: "A", 11: "J", 12: "Q", 13: "K"}
def label(c): return f"{RN.get(c[1], c[1])}{SYM[c[0]]}"

def classify(cards):
    """Return (hand name, scoring cards). Balatro rules; Ace (1) can be high or low in a Ladder."""
    ranks = [c[1] for c in cards]; cnt = Counter(ranks)
    suits = {c[0] for c in cards}; n = len(cards)
    flush = n == 5 and len(suits) == 1
    rs = sorted(set(ranks))
    straight = n == 5 and len(rs) == 5 and (rs[-1] - rs[0] == 4 or rs == [1, 10, 11, 12, 13])
    groups = sorted(cnt.values(), reverse=True)
    def of(k): return [c for c in cards if cnt[c[1]] >= k]
    if straight and flush: return "Fulness", cards
    if groups[0] >= 4: return "Four Corners", of(4)
    if groups[:2] == [3, 2]: return "Council", cards
    if n == 5 and len(suits) == 4: return "Full Witness", cards
    if flush: return "One Voice", cards
    if straight: return "Ladder", cards
    if groups[0] == 3: return "Presidency", of(3)
    if groups[:2] == [2, 2]: return "Covenant", of(2)
    if groups[0] == 2: return "Two Witnesses", of(2)
    best = max(cards, key=lambda c: witness(c[1]))
    return "A Word", [best]

def evaluate(cards, s):
    name, scoring = classify(cards)
    w, g = T["hand_types"][name]
    lvl = s["hand_levels"].get(name, 1)
    w += (lvl - 1) * 15; g += (lvl - 1) * 1   # Key level-ups, Balatro-like
    w += sum(witness(c[1]) for c in scoring)
    suit_delta = Counter(c[0] for c in scoring)
    dial = Counter()
    for c in scoring:
        for k, v in T["dial_per_scored_card"][c[0]].items(): dial[k] += v
    return name, scoring, w, g, w * g, suit_delta, dial

def bar(v, d=0, width=10):
    full = min(v, width); ghost = min(v + d, width) - full
    return "█" * full + "▒" * ghost + "·" * (width - full - ghost)

def render_preview(cards, s):
    name, scoring, w, g, total, sd, dial = evaluate(cards, s)
    out = [f"{name}: {w} Witness × {g} Glory = {total}  (scoring: {' '.join(label(c) for c in scoring)})"]
    for su in T["suits"]:
        out.append(f"  {su:8} {bar(s['levels'][su], sd[su])} {s['levels'][su]}→{s['levels'][su]+sd[su]}")
    out.append("  Dials (hold): " + ", ".join(f"{k} {v:+d}" for k, v in dial.items() if v) )
    return "\n".join(out)

def draw(s):
    while len(s["hand"]) < T["hand_size"] and s["deck"]: s["hand"].append(s["deck"].pop())
    s["hand"].sort(key=lambda c: (-witness(c[1]) if c[1] != 1 else -99, -c[1], c[0]))

def new_era(s):
    rng = random.Random(f"{s['seed']}-{s['disp']}-{s['era']}")
    s["deck"] = [[su, r] for su in T["suits"] for r in range(1, 14)]
    rng.shuffle(s["deck"]); s["hand"] = []; s["score"] = 0
    s["hands"] = T["hands_per_era"]; s["discards"] = T["discards_per_era"]
    draw(s)

def status(s):
    tgt = T["targets"][s["disp"] - 1][s["era"]]
    hand = sorted(enumerate(s["hand"], 1), key=lambda x: x[0])
    return (f"Dispensation {s['disp']} · {T['era_names'][s['era']]} · score {s['score']}/{tgt} · "
            f"hands {s['hands']} · discards {s['discards']} · Light {s['light']}\n"
            "Hand: " + "  ".join(f"[{i}] {label(c)}" for i, c in hand) + "\n"
            "Levels: " + "  ".join(f"{su} {s['levels'][su]}" for su in T["suits"]) + "\n"
            "Dials: " + "  ".join(f"{d} {s['dials'][d]}" for d in DIALS))

def pick(s, args):
    idx = sorted({int(a) for a in args}, reverse=True)
    assert all(1 <= i <= len(s["hand"]) for i in idx), "bad card position"
    return idx, [s["hand"][i - 1] for i in sorted(idx)]

def main():
    cmd, args = sys.argv[1], sys.argv[2:]
    if cmd == "new":
        s = {"seed": args[0] if args else "1", "disp": 1, "era": 0, "light": 4, "over": False,
             "levels": {su: 0 for su in T["suits"]}, "dials": {d: 0 for d in DIALS}, "hand_levels": {}}
        new_era(s)
    else:
        s = json.load(open(STATE))
        if s["over"]: print("Run is over. Start again with: new SEED"); return
        if cmd in ("preview", "play"):
            idx, cards = pick(s, args)
            assert 1 <= len(cards) <= T["max_play"], "play 1 to 5 cards"
            print(render_preview(cards, s))
            if cmd == "play":
                name, scoring, w, g, total, sd, dial = evaluate(cards, s)
                s["score"] += total; s["hands"] -= 1
                for su, v in sd.items(): s["levels"][su] += v * T["suit_level_per_card"]
                for k, v in dial.items(): s["dials"][k] = max(-100, min(100, s["dials"][k] + v)) if k != "Collapse" else max(0, min(100, s["dials"][k] + v))
                for i in idx: s["hand"].pop(i - 1)
                draw(s)
                tgt = T["targets"][s["disp"] - 1][s["era"]]
                if s["score"] >= tgt:
                    L = T["light"]; earned = L["era_reward"][s["era"]] + s["hands"] * L["per_unused_hand"] + min(L["interest_cap"], s["light"] // L["interest_per"])
                    s["light"] += earned
                    print(f"\n*** Target {tgt} beaten! +{earned} Light. (Shop and Watch happen here.) ***")
                    s["era"] += 1
                    if s["era"] == 3: s["era"] = 0; s["disp"] += 1
                    if s["disp"] > 8: print("All eight Dispensations survived!"); s["over"] = True
                    else: new_era(s)
                elif s["hands"] == 0:
                    print(f"\n*** Out of hands at {s['score']}/{tgt}. The run ends. ***"); s["over"] = True
        elif cmd == "discard":
            assert s["discards"] > 0, "no discards left"
            idx, cards = pick(s, args); assert len(cards) <= T["max_play"]
            for i in idx: s["hand"].pop(i - 1)
            s["discards"] -= 1; draw(s)
        elif cmd != "show": print(__doc__); return
    json.dump(s, open(STATE, "w"))
    print("\n" + status(s))

if __name__ == "__main__": main()
