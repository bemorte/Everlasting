from PIL import Image; import json,glob,os,re
P='/tmp/claude-0/-home-claude/ff1677fc-2862-5f5c-8c6e-84aaa8860c9a/scratchpad'
B={}
for f in sorted(glob.glob(P+'/w/world_*_watch.json')):
    e=re.search(r'world_(\d+)_watch',f).group(1)
    png=f.replace('.json','.png')
    out=f'{P}/proto/a/board_{e}.webp'
    if not os.path.exists(out) or os.path.getmtime(out)<os.path.getmtime(png):
        im=Image.open(png).convert('RGBA'); bg=Image.new('RGBA',im.size,(13,18,48,255)); bg.alpha_composite(im); bg.convert('RGB').save(out,quality=80,method=5)
    B[e]={'towns':[{k:(round(v) if isinstance(v,float) else v) for k,v in t.items()} for t in json.load(open(f))['towns']]}
for e in ['10','1','2','3','4','11','5','12','13','6','14','7','9','15','16','17','8','18','19']:
    if e not in B: B[e]=B['10']
open(P+'/proto/boards.js','w').write('const BOARDS='+json.dumps(B,separators=(',',':'))+';\n')
print(len(B))
