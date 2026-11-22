import sys, os, json
R7='/mnt/project-files/everlasting/brand/round7'
sys.path.insert(0,R7); os.chdir(R7)
import ds
from ds import star, pol, f
ARCH="M14 176V70C14 34 42 12 75 12C108 12 136 34 136 70V176Z"
items=[]  # (id, svg, w, h)
SU=['command','punish','inspire','reveal']
for s in SU:
    for r in range(1,14):
        items.append((f'c_{s}_{r}', ds.card_svg(s,r).replace('class="cardsvg "','width="240" height="336"'),240,336))
items.append(('c_back', ds.card_back().replace('class="cardsvg"','width="240" height="336"'),240,336))
def power(name, kind, rare=False, dialk=None, seed=4):
    em = ds.dial(dialk,"#f3e2a4","#7a5516") if dialk else ds.emblem(kind,"#f3e2a4","#7a5516")
    sc = 34/32 if dialk else 36/48
    off = (58,69) if dialk else (57,68)
    ring = '<rect x="2.5" y="2.5" width="145" height="245" rx="11" fill="none" stroke="url(#gGold)" stroke-width="3" filter="url(#fLeaf)"/>' if rare else '<rect x="5" y="5" width="140" height="240" rx="9" fill="none" stroke="#9a6f1c" stroke-width=".7"/>'
    nm=name.split("|")
    txt="".join(f'<text x="75" y="{(210 if len(nm)>1 else 216)+i*15}" text-anchor="middle" font-family="Cinzel,serif" font-weight="600" font-size="9.5" letter-spacing="1.6" fill="url(#gGold)">{t.upper()}</text>' for i,t in enumerate(nm))
    return f'''<svg viewBox="0 0 150 250" width="180" height="300"><rect width="150" height="250" rx="13" fill="#080a1a"/>{ring}
{ds.window("power",seed,"glass",world=False,clipd=ARCH)}<path d="{ARCH}" fill="none" stroke="#0a0a10" stroke-width="3"/><path d="{ARCH}" fill="none" stroke="url(#gGold)" stroke-width="1" filter="url(#fLeaf)"/>
<circle cx="75" cy="96" r="27" fill="url(#gGold)" filter="url(#fLeaf)"/><circle cx="75" cy="96" r="27" fill="none" stroke="#0a0a10" stroke-width="2"/><circle cx="75" cy="96" r="22.5" fill="none" stroke="#5a3d0c" stroke-width=".7"/>
<g transform="translate({off[0]} {off[1]+8}) scale({sc})" filter="url(#fEmboss)">{em}</g>
<path d="M40 190H110" stroke="#9a6f1c" stroke-width=".6"/><path d="{star(75,190,4,1.5,4)}" fill="url(#gGold)"/>{txt}</svg>'''
POW=[('still','Still Small|Voice','inspire',False,None,4),('pillar','Pillar of|Fire','reveal',False,None,5),('lawgiver','Lawgiver','command',False,None,2),
     ('refiner',"Refiner's|Fire",'punish',False,None,6),('gardener','Patient|Gardener',None,True,'plenty',9),('temple','Temple|Builder',None,False,'devotion',3),
     ('school','School of the|Prophets',None,False,'insight',7),('mansions','Many|Mansions',None,True,'hands',8),('bread','Bread of|Heaven',None,False,'joy',11),
     ('shadow','The|Shadow',None,True,'collapse',13),('harvest','The Long|Harvest',None,False,'progress',12),('fisher','Fisher of|the Deep',None,False,'redemption',14),
     ('wayfinder','The|Wayfinder',None,False,'agency',15),('lamp','The Kept|Flame',None,False,'truth',16),('accord','The|Accord',None,False,'harmony',17)]
for pid,nm,k,rare,dk,seed in POW: items.append((f'p_{pid}', power(nm,k,rare,dk,seed),180,300))
beads="".join(f'<circle cx="{f(pol(55,55,44,a)[0])}" cy="{f(pol(55,55,44,a)[1])}" r="1.5"/>' for a in range(0,360,12))
key=f'''<svg viewBox="0 0 110 110" width="132" height="132"><circle cx="55" cy="55" r="53" fill="url(#gGold)" filter="url(#fLeaf)"/>
<g filter="url(#fEmboss)" fill="#e9c868"><circle cx="55" cy="55" r="50" fill="none" stroke="#e9c868" stroke-width="2.4"/>{beads}<circle cx="55" cy="55" r="38" fill="none" stroke="#e9c868" stroke-width="1.4"/>
<path d="{star(55,55,31,19,8,-90)}" fill="none" stroke="#e9c868" stroke-width="1.6"/><path d="{star(55,55,31,19,8,-67.5)}" fill="none" stroke="#e9c868" stroke-width="1.6"/>
<circle cx="55" cy="49" r="6.5"/><path d="M51.6 52L49 68H61L58.4 52Z"/></g></svg>'''
items.append(('key',key,132,132))
TARCH="M8 150V52C8 24 28 8 50 8C72 8 92 24 92 52V150Z"
def tab(suit,icon,seed):
    ic = f'<g transform="translate(38.5 64.5) scale({23/48})">{ds.emblem(icon)}</g>' if icon in SU else f'<g transform="translate(39 65) scale({22/32})" filter="url(#fLeaf)">{ds.dial(icon)}</g>'
    return f'''<svg viewBox="0 0 100 158" width="120" height="190"><path d="M2 156V52C2 20 24 2 50 2C76 2 98 20 98 52V156Z" fill="#0a0a10"/>
<g transform="translate(-25 -18)">{ds.window(suit,seed,"glass",world=False,clipd="M33 168V70C33 42 53 26 75 26C97 26 117 42 117 70V168Z")}</g>
<path d="{TARCH}" fill="none" stroke="#0a0a10" stroke-width="2.5"/><circle cx="50" cy="76" r="17" fill="#080a1a"/><circle cx="50" cy="76" r="16" fill="none" stroke="url(#gGold)" stroke-width="1.3" filter="url(#fLeaf)"/>{ic}</svg>'''
for s in SU: items.append((f't_{s}',tab(s,s,5),120,190))
items.append(('t_ash',tab('punish','discard',8),120,190)); items.append(('t_rise',tab('inspire','progress',9),120,190)); items.append(('t_twin',tab('reveal','hands',3),120,190))
rays="".join(f'<path d="M{f(pol(60,84,16,a)[0])} {f(pol(60,84,16,a)[1])}L{f(pol(60,84,120,a)[0])} {f(pol(60,84,120,a)[1])}"/>' for a in range(0,360,20))
cp=ds.uid()
pack=f'''<svg viewBox="0 0 132 180" width="158" height="216"><rect x="12" y="2" width="118" height="166" rx="7" fill="#0b0f2a" stroke="#9a6f1c" stroke-width=".8"/><rect x="7" y="7" width="118" height="166" rx="7" fill="#0f1436" stroke="#9a6f1c" stroke-width=".8"/>
<rect x="1" y="12" width="120" height="167" rx="7" fill="#141a40"/><clipPath id="{cp}"><rect x="6" y="17" width="110" height="157" rx="4"/></clipPath><g clip-path="url(#{cp})" fill="none" stroke="#9a6f1c" stroke-width=".5" opacity=".8" transform="translate(1 12)">{rays}<circle cx="60" cy="84" r="30"/><circle cx="60" cy="84" r="46"/></g>
<rect x="1.8" y="12.8" width="118.4" height="165.4" rx="6.4" fill="none" stroke="url(#gGold)" stroke-width="1.5" filter="url(#fLeaf)"/><rect x="6" y="17" width="110" height="157" rx="4" fill="none" stroke="#9a6f1c" stroke-width=".5"/>
<circle cx="61" cy="96" r="17" fill="#141a40"/><g transform="translate(43 78) scale({36/32})" filter="url(#fLeaf)">{ds.dial("light")}</g>
<rect x="1" y="142" width="120" height="16" fill="url(#gGold)" filter="url(#fLeafFine)"/><text x="61" y="153.4" text-anchor="middle" font-family="Cinzel,serif" font-weight="700" font-size="7.5" letter-spacing="2" fill="#1a1304">SEALED</text></svg>'''
items.append(('pack',pack,158,216))
def mantle(a,b,icon):
    return f'''<svg viewBox="0 0 170 120" width="204" height="144"><path d="M6 6H164V84L85 114L6 84Z" fill="#080a1a"/><path d="M6 6H164V84L85 114L6 84Z" fill="none" stroke="url(#gGold)" stroke-width="1.4" filter="url(#fLeaf)"/><path d="M10.5 10.5H159.5V81L85 109L10.5 81Z" fill="none" stroke="#9a6f1c" stroke-width=".5"/>
<g transform="translate(71 15) scale({28/32})" filter="url(#fLeaf)">{ds.dial(icon)}</g>
<text x="85" y="61" text-anchor="middle" font-family="Cinzel,serif" font-weight="600" font-size="8.5" letter-spacing="1.6" fill="url(#gGold)">{a}</text><text x="85" y="75" text-anchor="middle" font-family="Cinzel,serif" font-weight="600" font-size="8.5" letter-spacing="1.6" fill="url(#gGold)">{b}</text></svg>'''
items.append(('m_patience',mantle('MANTLE OF','PATIENCE','discard'),204,144))
items.append(('m_endurance',mantle('MANTLE OF','ENDURANCE','hands'),204,144))
items.append(('m_plenty',mantle('MANTLE OF','PLENTY','plenty'),204,144))
for k in ['truth','joy','progress','redemption','agency','collapse','light','devotion','insight','plenty','harmony','hands','discard']:
    items.append((f'i_{k}', ds.dial_svg(k,96),96,96))
for s in SU: items.append((f'e_{s}', ds.emblem_svg(s,96),96,96))
# silhouettes for the seven witnesses: court statues in one flat tone
for n in ['11','11_1','11_2','11_3','12','12_1','12_2','12_3','13_1']:
    J=ds._flat('flat_statue_'+n)
    body="".join(f'<path d="{l["d"]}" fill="#c9cde0" stroke="#c9cde0" stroke-width="1.2"/>' for l in J['layers'])
    items.append((f's_{n}', f'<svg viewBox="0 0 {J["w"]} {J["h"]}" width="160" height="240">{body}</svg>',160,240))
html='<!doctype html><html><head><meta charset="utf-8">'+ds.FONTS+'<style>body{margin:0;background:transparent}.a{display:inline-block;margin:4px;line-height:0}</style></head><body>'+ds.DEFS
html+="".join(f'<div class="a" id="{i}" style="width:{w}px;height:{h}px">{s}</div>' for i,s,w,h in items)+'</body></html>'
out=sys.argv[1]
open(os.path.join(out,'assets.html'),'w').write(html)
json.dump([[i,w,h] for i,s,w,h in items],open(os.path.join(out,'items.json'),'w'))
print(len(items))
