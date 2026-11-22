'use strict';
// Everlasting playable prototype. Rules are deterministic and seeded; the people are a simple stand-in for the Records model.
const $ = id => document.getElementById(id);
const A = n => 'a/' + n + '.webp';
function mulberry(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
let R = Math.random; // replaced by the run's seeded RNG
const ri = (a,b)=>a+Math.floor(R()*(b-a+1));
const pick = arr => arr[Math.floor(R()*arr.length)];
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(R()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const fmt = n => Math.round(n).toLocaleString('en-US');
const cap1 = s => s[0].toUpperCase()+s.slice(1);

// ---------------- stage: fixed 844x390 landscape, scaled to fit; rotated on a portrait phone ----------------
const ST = {s:1, rot:false, ox:0, oy:0};
function fit(){
  const vw=innerWidth, vh=innerHeight, el=$('stage');
  ST.rot = vh>vw*1.1;
  if(!ST.rot){ST.s=Math.min(vw/844,vh/390);ST.ox=(vw-844*ST.s)/2;ST.oy=(vh-390*ST.s)/2;el.style.transform=`translate(${ST.ox}px,${ST.oy}px) scale(${ST.s})`}
  else{ST.s=Math.min(vh/844,vw/390);ST.ox=vw-(vw-390*ST.s)/2;ST.oy=(vh-844*ST.s)/2;el.style.transform=`translate(${ST.ox}px,${ST.oy}px) rotate(90deg) scale(${ST.s})`}
  if(WV.canvas) sizeCanvas();
}
function toStage(cx,cy){ return ST.rot ? {x:(cy-ST.oy)/ST.s, y:(ST.ox-cx)/ST.s} : {x:(cx-ST.ox)/ST.s, y:(cy-ST.oy)/ST.s}; }
addEventListener('resize', fit);

// ---------------- small UI helpers ----------------
function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('on',s.id===id)); hideTip(); $('bQ').style.display = id==='sTitle'?'none':'flex';}
let toastT=0;
function toast(html,ms=2600){const t=$('toast');t.innerHTML=html;t.style.display='block';clearTimeout(toastT);toastT=setTimeout(()=>t.style.display='none',ms)}
function showTip(html, anchor, below=true){
  const t=$('tip'); t.innerHTML=html; t.style.display='block'; t.style.pointerEvents='auto';
  const r=anchor.getBoundingClientRect(); const p=toStage(r.left+r.width/2, below?r.bottom:r.top), q=toStage(r.right,r.bottom);
  let x = ST.rot ? toStage(r.left, r.top+r.height/2).x : p.x;
  const w=t.offsetWidth, h=t.offsetHeight; let y = ST.rot ? toStage(r.right - (below?0:r.width), r.top).y : p.y;
  if(ST.rot){ const a=toStage(r.left,r.top), b=toStage(r.right,r.bottom); x=(a.x+b.x)/2; y= below?Math.max(a.y,b.y):Math.min(a.y,b.y); }
  t.style.left=clamp(x-w/2,6,844-w-6)+'px'; t.style.top=clamp(below?y+8:y-h-8,6,390-h-6)+'px';
}
function hideTip(){const t=$('tip');t.style.display='none'}
document.addEventListener('pointerdown',e=>{ if(!e.target.closest('#tip')&&!e.target.closest('[data-tip]')) hideTip(); },true);
function gaugeSVG(v,collapse){
  const r=13,cx=15,cy=15; const a0=-Math.PI/2; const span = collapse? 2*Math.PI*v/100 : Math.PI*0.97*v/100;
  const a1=a0+span; const col = collapse?'#ee6a4f':(v>=0?'url(#gGoldS)':'#a9adc8');
  let arc='';
  if(Math.abs(span)>0.01){const x0=cx+r*Math.cos(a0),y0=cy+r*Math.sin(a0),x1=cx+r*Math.cos(a1),y1=cy+r*Math.sin(a1);
    arc=`<path d="M${x0} ${y0}A${r} ${r} 0 ${Math.abs(span)>Math.PI?1:0} ${span>0?1:0} ${x1.toFixed(2)} ${y1.toFixed(2)}" fill="none" stroke="${col}" stroke-width="2.2" stroke-linecap="round"/>`}
  return `<svg viewBox="0 0 30 30"><defs><linearGradient id="gGoldS" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff0b5"/><stop offset=".5" stop-color="#d9a93a"/><stop offset="1" stop-color="#f1d37a"/></linearGradient></defs><circle cx="15" cy="15" r="10.5" fill="#080a1a"/><circle cx="15" cy="15" r="13" fill="none" stroke="#2a3268" stroke-width=".8"/>${arc}<path d="M15 .8V3.6" stroke="#a9adc8" stroke-width="1"/></svg>`;
}
function renderDials(id, delta){
  const box=$(id); let h='';
  for(const k of [...DIALS,'collapse']){
    if(k==='collapse') h+='<div class="sep"></div>';
    const v = k==='collapse'?S.collapse:S.dials[k]; const d = delta?delta[k]||0:0;
    const dt = d? `<div class="gd" style="color:${(k==='collapse'?-d:d)>0?'#f0d58a':'#ee8a7a'}">${d>0?'+':''}${Math.round(d)}</div>`:'';
    h+=`<div class="gauge" data-tip="${k}">${gaugeSVG(clamp(v,k==='collapse'?0:-100,100),k==='collapse')}<img src="${A('i_'+k)}">${dt}<div class="gv">${Math.round(v)}</div></div>`;
  }
  box.innerHTML=h;
  box.querySelectorAll('.gauge').forEach(g=>g.onclick=()=>{const k=g.dataset.tip;showTip(`<h5>${DIALNAME[k]}</h5><p>${DIALTIP[k]}</p>`,g)});
}
const DIALTIP = {truth:'True religion against corrupt. Raised by Reveal and Punish cards and temples.',joy:'Happiness against suffering. Inspire raises it; Punish lowers it.',progress:'Advancement against stagnation. Inspire and schools raise it; Command lowers it.',redemption:'Saved against condemned. Reveal cards and temple trips raise it.',agency:'Free against controlled. Inspire raises it; Command and Reveal lower it.',collapse:'If Collapse reaches <b>100</b>, the people destroy themselves and the run ends. Command and Punish lower it; unrest in the Watch raises it.'};

// ---------------- run state ----------------
let S = null;
let deckChoice = 'even';
function newCard(suit,rank){ return {id:'k'+(S.nid++), suit, rank}; }
function startRun(){
  const seed = (Date.now() ^ (Math.random()*1e9))>>>0;
  R = mulberry(seed);
  S = {seed, nid:1, deck:[], powers:[], cons:[], light:T.startLight, dials:{truth:0,joy:0,progress:0,redemption:0,agency:0}, collapse:T.collapseStart,
    lv:{}, suitLv:{command:0,punish:0,inspire:0,reveal:0}, mantles:{}, disp:0, era:0, route:[], played:{command:0,punish:0,inspire:0,reveal:0}, handPlays:{},
    watchesKept:0, lastSeasons:0, witness:null, godName:null, unlocked:new Set(), dispCur:{devotion:0,insight:0,plenty:0,harmony:0}, temples:0,
    world:null, history:[]};
  for(const h in HANDS) S.lv[h]=0;
  const D = DECKS[deckChoice];
  for(const s in D.suits){ const n=D.suits[s]; for(let i=0;i<n;i++) S.deck.push(newCard(s, (i%13)+1)); }
  if(D.power) S.powers.push(D.power);
  S.route.push('waking');
  initWorld();
  beginDisp();
}

// ---------------- dispensation and era flow ----------------
const DISPKEY = () => S.route[S.disp];
function godName(){
  const tot = Object.values(S.played).reduce((a,b)=>a+b,0);
  if(tot<6) return null;
  const top = Object.entries(S.played).sort((a,b)=>b[1]-a[1])[0][0];
  return pick(GODNAMES[top]);
}
function ideology(){
  const tot = Object.values(S.played).reduce((a,b)=>a+b,0); if(tot<15) return null;
  const e = Object.entries(S.played).sort((a,b)=>b[1]-a[1]);
  if(e[0][1]/tot<0.36) return {name:'The Patient One', suit:null};
  return {name:{command:'The Lawgiver',punish:'The Refiner',inspire:'The Hidden Hand',reveal:'The Open Heaven'}[e[0][0]], suit:e[0][0]};
}
function msg(html){ $('msgBody').innerHTML=html; show('sMsg'); }
function beginDisp(){
  const key=DISPKEY(), D=DISP[key], slot=SLOTS[S.disp];
  S.dispCur={devotion:0,insight:0,plenty:0,harmony:0};
  S.godName = godName() || S.godName;
  const tr=TRIALS[D.trial];
  msg(`<div class="lab">Dispensation ${roman(S.disp+1)} of VIII \u00b7 ${slot.name}</div>
   <div class="h1 gtext">${D.name}</div>
   <div class="p" style="max-width:480px">${D.blurb}</div>
   <div class="p mi" style="font-size:13px">${S.godName?`Your people now call you <b style="color:var(--g3)">${S.godName}</b>.`:'Your people have no name for you yet.'}${S.witness?`<br>${S.witness.name} walks with you this Dispensation.`:''}</div>
   <div class="plate" style="padding:7px 14px;margin-top:4px"><div class="lab" style="color:var(--red)">Trial of the Faith Crisis</div><div class="p" style="font-size:13px">${tr.name}: ${tr.text}</div></div>
   <div class="btn gold" id="bGo" style="margin-top:8px">Begin</div>`);
  $('bGo').onclick=()=>{S.era=0; eraSelect();};
}
function roman(n){return ['','I','II','III','IV','V','VI','VII','VIII'][n]}
function eraSelect(){
  const D=DISP[DISPKEY()]; const tgt=T.targets[S.disp][S.era]; const tr=TRIALS[D.trial];
  const skip = S.era<2;
  const skipReward = S.era===0?4:6;
  msg(`<div class="lab">${D.name} \u00b7 Era ${S.era+1} of 3</div><div class="h1 gtext">${T.eraNames[S.era]}</div>
   <div class="row" style="gap:16px;margin-top:6px">${T.eraNames.map((n,i)=>`<div class="plate choice ${i===S.era?'on':''}" style="width:150px;opacity:${i<S.era?.35:1}"><div class="h2">${n}</div><div class="lab">To be witnessed</div><div class="gtext" style="font:600 20px var(--serif)">${fmt(T.targets[S.disp][i])}</div>${i===2?`<div class="p" style="font-size:11.5px;color:var(--red);margin-top:4px">${tr.name}: ${tr.text}</div>`:`<div class="p mi" style="font-size:11.5px;margin-top:4px">Reward ${T.eraReward[i]} Light</div>`}</div>`).join('')}</div>
   <div class="row" style="margin-top:10px"><div class="btn gold" id="bPlayEra">Play ${T.eraNames[S.era]}</div>${skip?`<div class="btn dark" id="bSkip">Skip for ${skipReward} Light</div>`:''}</div>
   ${skip?'<div class="p mi" style="font-size:11.5px">Skipping loses this Era\u2019s shop and its Watch.</div>':''}`);
  $('bPlayEra').onclick=startEra;
  if(skip) $('bSkip').onclick=()=>{S.light+=skipReward; toast(`Skipped. +${skipReward} Light.`); S.era++; eraSelect();};
}

// ---------------- card phase ----------------
let C=null; // current era
function trial(){ return S.era===2 ? TRIALS[DISP[DISPKEY()].trial] : null; }
function startEra(){
  const tr=trial();
  const hs = T.handSize + (S.mantles.plenty?1:0) + (tr&&tr.handSize||0);
  C = {target:T.targets[S.disp][S.era], score:0, hands:T.hands+(S.mantles.endurance?1:0)+(tr&&tr.hands||0), disc:Math.max(0,T.discards+(S.mantles.patience?1:0)+(tr&&tr.discards||0)),
    hs, pile:shuffle(S.deck.slice()), hand:[], sel:new Set(), busy:false, sort:'rank'};
  draw(); show('sCards'); renderCards();
  const tt=$('trialtag'); if(tr){tt.style.display='block';tt.textContent=`Trial \u00b7 ${tr.name}: ${tr.text}`}else tt.style.display='none';
}
function draw(){ while(C.hand.length<C.hs && C.pile.length) C.hand.push(C.pile.pop()); sortHand(); }
function rv(c){ return c.rank===1?14:c.rank; }
function sortHand(){ if(C.sort==='rank') C.hand.sort((a,b)=>rv(b)-rv(a)||SUITS.indexOf(a.suit)-SUITS.indexOf(b.suit)); else C.hand.sort((a,b)=>SUITS.indexOf(a.suit)-SUITS.indexOf(b.suit)||rv(b)-rv(a)); }
function witnessOf(c){ return c.rank===1?11:c.rank>10?10:c.rank; }
function cardName(c){ const r=c.rank===1?'I':c.rank; return c.rank>10? `${COURT[c.rank][c.suit]} \u00b7 ${SUITNAME[c.suit]} ${r}` : `${r} of ${SUITNAME[c.suit]}`; }

function evalHand(cards){
  const n=cards.length; if(!n) return null;
  const byR={}; cards.forEach((c,i)=>{(byR[c.rank]=byR[c.rank]||[]).push(i)});
  const groups=Object.values(byR).sort((a,b)=>b.length-a.length||rv(cards[b[0]])-rv(cards[a[0]]));
  const suits=new Set(cards.map(c=>c.suit));
  const flush = n===5 && suits.size===1;
  let straight=false;
  if(n===5 && groups.length===5){ const v=cards.map(rv).sort((a,b)=>a-b); straight = v[4]-v[0]===4 || v.join()==='2,3,4,5,14'; }
  const all=[...Array(n).keys()];
  const g0=groups[0].length, g1=groups[1]?groups[1].length:0;
  let name, idx;
  if(g0===5&&flush){name='Flush Five';idx=all}
  else if(g0===3&&g1===2&&flush){name='Flush House';idx=all}
  else if(g0===5){name='Five of a Kind';idx=all}
  else if(straight&&flush){name='Straight Flush';idx=all}
  else if(g0===4){name='Four of a Kind';idx=groups[0]}
  else if(n===5&&suits.size===4){name='Four Suits';idx=all}
  else if(g0===3&&g1===2){name='Full House';idx=all}
  else if(flush){name='Flush';idx=all}
  else if(straight){name='Straight';idx=all}
  else if(g0===3){name='Three of a Kind';idx=groups[0]}
  else if(g0===2&&g1===2){name='Two Pair';idx=groups[0].concat(groups[1])}
  else if(g0===2){name='Pair';idx=groups[0]}
  else {name='High Card';idx=[all.sort((a,b)=>rv(cards[b])-rv(cards[a]))[0]]}
  return {name, idx};
}
function handBase(name){ const [w,g,dw,dg]=HANDS[name]; const l=S.lv[name]; return [w+dw*l, g+dg*l]; }
// Full deterministic score with a step list for the animation and the dial/suit deltas for the preview.
function score(cards, held){
  const ev=evalHand(cards); if(!ev) return null;
  const tr=trial(); const P=new Set(S.powers);
  let [W,G]=handBase(ev.name); const steps=[]; const dd={truth:0,joy:0,progress:0,redemption:0,agency:0,collapse:0}; const sd={command:0,punish:0,inspire:0,reveal:0};
  const scoring = ev.idx.map(i=>cards[i]);
  const hasReveal = scoring.some(c=>c.suit==='reveal');
  let dead = (tr&&tr.five&&cards.length<5) || (tr&&tr.noFlush&&/Flush/.test(ev.name));
  if(tr&&tr.glory) G=Math.max(1,G+tr.glory);
  const ide=ideology();
  for(const c of scoring){
    if(tr&&tr.debuff===c.suit){ steps.push({c, txt:'silent'}); continue; }
    let w = witnessOf(c) + Math.floor(S.suitLv[c.suit]/2); let txt=`+${w}`;
    if(S.witness && S.witness.suit===c.suit){ w+=S.witness.w; }
    if(P.has('fisher') && S.dials.redemption>=20 && (c.suit==='reveal'||c.suit==='inspire')) w+=10;
    W+=w; txt=`+${w}`;
    if(c.suit==='inspire'&&P.has('still')&&!hasReveal){G+=3; txt+=' +3G'}
    if(c.suit==='punish'&&P.has('refiner')){G+=2; dd.truth+=2; txt+=' +2G'}
    if(c.suit==='reveal'&&P.has('pillar')){G*=1.5; dd.agency-=1; txt+=' \u00d71.5'}
    if(c.suit==='inspire'&&P.has('bread')&&S.dials.joy<0){G*=2; txt+=' \u00d72'}
    for(const k in T.dialPerCard[c.suit]) dd[k]+=T.dialPerCard[c.suit][k];
    sd[c.suit]+=1;
    steps.push({c, txt});
  }
  if(P.has('lawgiver')) for(const c of held) if(c.suit==='command'){ W+=20; dd.agency-=2; steps.push({held:c, txt:'+20'}); }
  if(P.has('temple') && S.temples) W+=5*S.temples;
  if(P.has('lamp') && /Flush/.test(ev.name)){ W+=40; dd.truth+=2; }
  if(P.has('gardener')) G+=Math.min(10,S.lastSeasons);
  if(P.has('harvest')) G+=2*S.watchesKept;
  if(ide&&ide.suit&&scoring.some(c=>c.suit===ide.suit)) W+=5;
  if(P.has('wayfinder') && /Straight/.test(ev.name)) G*=2;
  if(P.has('accord') && ev.name==='Four Suits') G*=2;
  if(P.has('shadow')){ G*=3; dd.joy-=3; }
  G=Math.round(G*10)/10;
  const total = dead?0:Math.floor(W*G);
  return {name:ev.name, idx:ev.idx, W, G, total, steps, dd, sd, dead};
}
function selCards(){ return C.hand.filter(c=>C.sel.has(c.id)); }
function renderCards(){
  const D=DISP[DISPKEY()];
  $('pEra').textContent=`Dispensation ${roman(S.disp+1)} \u00b7 ${T.eraNames[S.era]}`;
  $('pDisp').textContent=D.name;
  $('target').textContent=fmt(C.target);
  $('progI').style.width=Math.min(100,C.score/C.target*100)+'%';
  $('score').textContent=fmt(C.score);
  $('cH').textContent=C.hands; $('cD').textContent=C.disc; $('cL').textContent=S.light;
  const ide=ideology(); $('ideol').textContent = ide? `Your people see you as ${ide.name}` : '';
  $('deckN').textContent=`${C.pile.length} of ${S.deck.length}`;
  renderPowers(); renderCons(); renderHand(); updatePreview();
}
function renderHand(){
  const box=$('hand'); box.innerHTML=''; const n=C.hand.length; const W=554, cw=72; const step = n>1?Math.min(78,(W-cw)/(n-1)):0; const x0=(W-(cw+step*(n-1)))/2;
  const tr=trial();
  C.hand.forEach((c,i)=>{
    const d=document.createElement('div'); d.className='card'+(C.sel.has(c.id)?' sel':'')+(tr&&tr.debuff===c.suit?' deb':''); d.style.left=(x0+i*step)+'px'; d.style.zIndex=i; d.dataset.id=c.id;
    d.innerHTML=`<img src="${A('c_'+c.suit+'_'+c.rank)}" alt="${cardName(c)}">`;
    d.onclick=()=>{ if(C.busy) return; if(C.sel.has(c.id)) C.sel.delete(c.id); else if(C.sel.size<T.maxPlay) C.sel.add(c.id); else return; d.classList.toggle('sel'); updatePreview(); };
    let ht; d.onpointerdown=()=>{ht=setTimeout(()=>showTip(`<h5>${cardName(c)}</h5><p><b>${witnessOf(c)}</b> Witness${S.suitLv[c.suit]>1?` +${Math.floor(S.suitLv[c.suit]/2)} from ${SUITNAME[c.suit]} level`:''}.</p><i>When scored: ${Object.entries(T.dialPerCard[c.suit]).map(([k,v])=>`${DIALNAME[k]} ${v>0?'+':''}${v}`).join(', ')}.</i>`,d,false),420)};
    d.onpointerup=d.onpointerleave=()=>clearTimeout(ht);
    box.appendChild(d);
  });
}
function updatePreview(sc){
  const cards=selCards(); const held=C.hand.filter(c=>!C.sel.has(c.id));
  const r = sc || score(cards, held);
  const pv=$('preview');
  if(r){ pv.style.display='block'; $('pvT').textContent=r.name; $('pvS').innerHTML = r.dead?'This Trial silences it: <b>0</b>':`${fmt(r.W)} \u00d7 ${r.G} = <b style="color:var(--g3)">${fmt(r.total)}</b>`;
    $('handname').textContent=`${r.name} \u00b7 Lv ${S.lv[r.name]+1}`; $('wW').textContent=fmt(r.W); $('wG').textContent=r.G; }
  else { pv.style.display='none'; $('handname').textContent=''; $('wW').textContent=0; $('wG').textContent=0; }
  renderBars(r?r.sd:null);
  renderDials('cdials', r?r.dd:null);
  $('bPlay').classList.toggle('off', !cards.length||C.hands<=0);
  $('bDisc').classList.toggle('off', !cards.length||C.disc<=0);
}
function renderBars(sd){
  const mx = Math.max(10, ...Object.values(S.suitLv).map(v=>v+6));
  $('bars').innerHTML = SUITS.map(s=>{ const v=S.suitLv[s], d=sd?sd[s]:0; const bonus=Math.floor((v+d)/2);
    return `<div class="bar"><img src="${A('e_'+s)}"><span style="width:44px">${SUITNAME[s]}</span><div class="tr"><i class="gh" style="width:${(v+d)/mx*100}%;background:${SUITCOL[s]}"></i><i style="width:${v/mx*100}%;background:${SUITCOL[s]}"></i></div><b>Lv ${v}${d?` \u2192 ${v+d}`:''}</b></div>`}).join('')
    + `<div class="lab" style="font-size:6.5px;margin-top:1px">+1 Witness per 2 levels</div>`;
}
function renderPowers(){
  const box=$('powers'); const slots=5+(S.powers.includes('mansions')?1:0); let h='';
  if(S.witness) h+=`<div class="pslot wit" data-w="1"><img src="${A(S.witness.sil)}" style="object-fit:contain;padding:2px"></div>`;
  for(let i=0;i<slots;i++){ const p=S.powers[i]; h+= p?`<div class="pslot" data-p="${p}"><img src="${A('p_'+p)}"></div>`:'<div class="pslot"></div>'; }
  box.innerHTML=h;
  box.querySelectorAll('[data-p]').forEach(el=>el.onclick=()=>{const P=POWERS[el.dataset.p];showTip(`<h5>${P.name}</h5><p>${P.text}</p><i>${P.flavor}</i>`,el)});
  const w=box.querySelector('[data-w]'); if(w) w.onclick=()=>showTip(`<h5>${S.witness.name} \u00b7 Witness</h5><p>${S.witness.fx}</p><i>${S.witness.bio}</i>`,w);
}
function renderCons(){
  const box=$('cons'); box.innerHTML='';
  for(let i=0;i<2;i++){ const c=S.cons[i]; const d=document.createElement('div'); d.className='cslot';
    if(c){ d.innerHTML=`<img src="${A(c.type==='key'?'key':'t_'+c.id)}">`; d.setAttribute('data-tip','1'); d.onclick=()=>consTip(i,d); }
    box.appendChild(d); }
}
function consTip(i, el){
  const c=S.cons[i]; let h;
  if(c.type==='key'){ const [nm,sub]=KEYS[c.id]; const [w,g]=handBase(c.id); const H=HANDS[c.id]; h=`<h5>Key \u00b7 ${nm}</h5><p>${sub}. Levels up <b>${c.id}</b>: ${w}\u00d7${g} \u2192 ${w+H[2]}\u00d7${g+H[3]}.</p>`; }
  else { const t=TABLETS[c.id]; h=`<h5>${t.name}</h5><p>${t.text}</p><i>Select cards in your hand first.</i>`; }
  h+=`<div style="display:flex;gap:6px;justify-content:center;margin-top:7px"><div class="btn gold small" id="tUse">Use</div><div class="btn dark small" id="tSell">Sell for 1</div></div>`;
  showTip(h, el); $('tUse').onclick=()=>{hideTip();useCons(i)}; $('tSell').onclick=()=>{hideTip();S.cons.splice(i,1);S.light+=1;renderCards()};
}
function useCons(i){
  const c=S.cons[i];
  if(c.type==='key'){ S.lv[c.id]++; S.cons.splice(i,1); toast(`${KEYS[c.id][0]}: ${c.id} is now level ${S.lv[c.id]+1}.`); renderCards(); return; }
  const t=TABLETS[c.id]; const sel=selCards();
  if(!sel.length || sel.length>t.n){ toast(`Select 1 to ${t.n} cards first.`); return; }
  const inDeck = id => S.deck.find(x=>x.id===id);
  if(SUITS.includes(c.id)) sel.forEach(x=>{x.suit=c.id; const d=inDeck(x.id); if(d) d.suit=c.id;});
  if(c.id==='rise') sel.forEach(x=>{x.rank=x.rank===13?1:x.rank===1?1:x.rank+1; const d=inDeck(x.id); if(d) d.rank=x.rank;});
  if(c.id==='ash'){ sel.forEach(x=>{S.deck=S.deck.filter(d=>d.id!==x.id); C.hand=C.hand.filter(h=>h.id!==x.id);}); C.sel.clear(); draw(); }
  if(c.id==='twin'){ const n=newCard(sel[0].suit, sel[0].rank); S.deck.push(n); C.pile.push(n); shuffle(C.pile); }
  S.cons.splice(i,1); C.sel.clear(); toast(`${t.name} used.`); sortHand(); renderCards();
}
function applyDials(dd){
  for(const k in dd){ if(k==='collapse') S.collapse=clamp(S.collapse+dd[k],0,100); else S.dials[k]=clamp(S.dials[k]+dd[k],-100,100); }
}
async function playHand(){
  if(C.busy) return; const cards=selCards(); if(!cards.length||C.hands<=0) return;
  C.busy=true; const held=C.hand.filter(c=>!C.sel.has(c.id)); const r=score(cards,held);
  C.hands--; updatePreview(r);
  const sleep=ms=>new Promise(res=>setTimeout(res,ms));
  let W=handBase(r.name)[0];
  for(const st of r.steps){
    const el = document.querySelector(`.card[data-id="${(st.c||st.held).id}"]`);
    if(el){ el.classList.add('scoring'); const p=document.createElement('div'); p.className='pop'; p.textContent=st.txt; el.appendChild(p); }
    await sleep(230);
    if(el) el.classList.remove('scoring');
  }
  await sleep(200);
  // bookkeeping
  for(const c of r.idx.map(i=>cards[i])){ S.played[c.suit]++; }
  for(const s in r.sd) S.suitLv[s]+=r.sd[s];
  S.handPlays[r.name]=(S.handPlays[r.name]||0)+1;
  if(SECRET.includes(r.name) && !S.unlocked.has(r.name)){ S.unlocked.add(r.name); toast(`A hidden hand: ${r.name}. Its Key, ${KEYS[r.name][0]}, can now appear in the shop.`,3600); }
  applyDials(r.dd);
  const from=C.score; C.score+=r.total;
  const t0=performance.now(); await new Promise(res=>{const f=()=>{const k=Math.min(1,(performance.now()-t0)/500); $('score').textContent=fmt(from+(C.score-from)*k); $('progI').style.width=Math.min(100,(from+(C.score-from)*k)/C.target*100)+'%'; k<1?requestAnimationFrame(f):res()}; f();});
  C.hand=held; C.sel.clear(); draw(); C.busy=false; renderCards();
  if(S.collapse>=100) return gameOver('collapse');
  if(C.score>=C.target) return eraWon();
  if(C.hands<=0) return gameOver('miss');
}
function discard(){
  if(C.busy||C.disc<=0) return; const cards=selCards(); if(!cards.length) return;
  C.disc--; C.hand=C.hand.filter(c=>!C.sel.has(c.id)); C.sel.clear(); draw(); renderCards();
}
function eraWon(){
  const base=T.eraReward[S.era], unused=C.hands, interest=Math.min(5,Math.floor(S.light/5));
  const tot=base+unused+interest; S.light+=tot;
  msg(`<div class="lab">${DISP[DISPKEY()].name} \u00b7 ${T.eraNames[S.era]}</div><div class="h1 gtext">Witnessed</div>
   <div class="p">${fmt(C.score)} of ${fmt(C.target)}</div>
   <div class="plate" style="padding:10px 22px;min-width:260px;text-align:left;font:500 14px/1.6 var(--serif)">
    <div style="display:flex;justify-content:space-between"><span>Era reward</span><span class="light"><img src="${A('i_light')}">${base}</span></div>
    <div style="display:flex;justify-content:space-between"><span>Unused hands</span><span class="light"><img src="${A('i_light')}">${unused}</span></div>
    <div style="display:flex;justify-content:space-between"><span>Held Light (1 per 5)</span><span class="light"><img src="${A('i_light')}">${interest}</span></div></div>
   <div class="btn gold" id="bCash" style="margin-top:6px">Collect ${tot} Light</div>`);
  $('bCash').onclick=openShop;
}

// ---------------- shop ----------------
let SH=null;
function fitLine(kind,id){
  const tot=Object.values(S.played).reduce((a,b)=>a+b,0);
  const topHand = Object.entries(S.handPlays).sort((a,b)=>b[1]-a[1])[0];
  if(kind==='power'){ const P=POWERS[id];
    if(P.suit) return S.played[P.suit]? `You have scored ${S.played[P.suit]} ${SUITNAME[P.suit]} cards.` : `You have not leaned on ${SUITNAME[P.suit]} yet.`;
    if(id==='temple') return `Your people have built ${S.temples} temple${S.temples===1?'':'s'}.`;
    if(id==='gardener') return `Your last Watch lasted ${S.lastSeasons} seasons.`;
    if(id==='harvest') return `You have kept ${S.watchesKept} Watch${S.watchesKept===1?'':'es'}.`;
    if(id==='wayfinder') return `Straights played: ${S.handPlays['Straight']||0}.`;
    if(id==='lamp') return `Flushes played: ${S.handPlays['Flush']||0}.`;
    if(id==='accord') return `Four Suits played: ${S.handPlays['Four Suits']||0}.`;
    if(id==='fisher') return `Redemption is ${Math.round(S.dials.redemption)} now.`;
    if(id==='shadow') return 'Strong at once. Joy pays for it.';
    if(id==='school') return `Insight on hand: ${Math.floor(S.world.cur.insight)}.`;
    return '';
  }
  if(kind==='key') return topHand&&topHand[0]===id? `Your most played hand (${topHand[1]} times).` : (S.handPlays[id]?`Played ${S.handPlays[id]} times.`:'');
  return '';
}
function openShop(){
  SH={items:[], rerolls:0}; stockShop(); show('sShop'); renderShop();
}
function stockShop(){
  const own=new Set(S.powers); const pool=Object.keys(POWERS).filter(p=>!own.has(p)&&(POWERS[p].rare? R()<.5:true));
  shuffle(pool); SH.items=[];
  pool.slice(0,2).forEach(p=>SH.items.push({kind:'power',id:p,cost:POWERS[p].cost}));
  for(let i=0;i<2;i++){ if(R()<.55){ const hs=Object.keys(HANDS).filter(h=>!SECRET.includes(h)||S.unlocked.has(h)); SH.items.push({kind:'key',id:pick(hs),cost:3}); } else SH.items.push({kind:'tablet',id:pick(Object.keys(TABLETS)),cost:3}); }
  SH.items.push({kind:'pack',id:'keys',cost:4});
  const ms=Object.keys(MANTLES).filter(m=>!S.mantles[m]); if(ms.length && (S.era===2||R()<.3)) SH.items.push({kind:'mantle',id:pick(ms),cost:MANTLES[ms[0]].cost});
}
function renderShop(){
  $('shDisp').textContent=DISP[DISPKEY()].name; $('shL').textContent=S.light;
  $('shNote').innerHTML = `Each item says how it fits your run. Tap to buy.<br><br>Powers ${S.powers.length}/${5+(S.powers.includes('mansions')?1:0)} \u00b7 Tablets and Keys ${S.cons.length}/2` + (S.powers.length?`<div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:4px;justify-content:center">${S.powers.map((p,i)=>`<img src="${A('p_'+p)}" data-own="${i}" style="width:28px;border-radius:3px;cursor:pointer">`).join('')}</div><div class="lab" style="margin-top:3px">Tap a Power to sell it</div>`:'');
  $('bReroll').textContent=`Reroll \u00b7 ${3+SH.rerolls} Light`; $('bReroll').classList.toggle('off', S.light<3+SH.rerolls);
  document.querySelectorAll('[data-own]').forEach(el=>el.onclick=()=>{const i=+el.dataset.own,p=S.powers[i];const v=Math.floor(POWERS[p].cost/2);showTip(`<h5>${POWERS[p].name}</h5><p>${POWERS[p].text}</p><div style="margin-top:6px"><div class="btn dark small" id="sellP">Sell for ${v} Light</div></div>`,el);$('sellP').onclick=()=>{S.powers.splice(i,1);S.light+=v;hideTip();renderShop()}});
  const box=$('shelf'); box.innerHTML='';
  SH.items.forEach((it,i)=>{
    const d=document.createElement('div'); d.className='it'+(it.sold?' sold':'');
    let img,name,k,tx,fit='';
    if(it.kind==='power'){const P=POWERS[it.id]; img=A('p_'+it.id); name=P.name; k=P.rare?'Rare Godhood Power':'Godhood Power'; tx=P.text; fit=fitLine('power',it.id);}
    if(it.kind==='key'){const [nm,sub]=KEYS[it.id]; const [w,g]=handBase(it.id); const H=HANDS[it.id]; img=A('key'); name=nm; k='Key \u00b7 '+sub; tx=`<b>${it.id}</b> ${w}\u00d7${g} \u2192 ${w+H[2]}\u00d7${g+H[3]}`; fit=fitLine('key',it.id);}
    if(it.kind==='tablet'){const t=TABLETS[it.id]; img=A('t_'+it.id); name=t.name; k='Tablet'; tx=t.text;}
    if(it.kind==='pack'){img=A('pack'); name='A Pack of Keys'; k='Pack'; tx='Open it: choose 1 of 3 Keys, used at once.';}
    if(it.kind==='mantle'){const m=MANTLES[it.id]; img=A('m_'+it.id); name=m.name; k='Mantle \u00b7 lasts the run'; tx=m.text;}
    const no=S.light<it.cost;
    d.innerHTML=`<div class="im"><img src="${img}"></div><div class="k">${k}</div><h6>${name}</h6><div class="tx">${tx}</div>${fit?`<div class="fit">${fit}</div>`:''}<div class="price ${no?'no':''}"><img src="${A('i_light')}">${it.cost}</div>`;
    d.onclick=()=>buy(i);
    box.appendChild(d);
  });
}
function buy(i){
  const it=SH.items[i]; if(it.sold) return; if(S.light<it.cost) return toast('Not enough Light.');
  if(it.kind==='power'){ const slots=5+(S.powers.includes('mansions')?1:0); if(S.powers.length>=slots) return toast('Your Power slots are full. Sell one first.'); S.powers.push(it.id); }
  if(it.kind==='key'||it.kind==='tablet'){ if(S.cons.length>=2) return toast('Hold at most two Tablets or Keys.'); S.cons.push({type:it.kind==='key'?'key':'tablet', id:it.id}); }
  if(it.kind==='mantle'){ S.mantles[it.id]=true; }
  S.light-=it.cost; it.sold=true;
  if(it.kind==='pack'){ openPack(); return; }
  renderShop();
}
function openPack(){
  const hs=Object.keys(HANDS).filter(h=>!SECRET.includes(h)||S.unlocked.has(h)); const ch=shuffle(hs.slice()).slice(0,3);
  const o=$('helpO'); o.classList.add('on');
  $('helpB').innerHTML=`<div class="center" style="gap:10px"><div class="h2">Choose one Key</div><div class="row">${ch.map(h=>{const [nm,sub]=KEYS[h];const [w,g]=handBase(h);const H=HANDS[h];return `<div class="plate choice" data-h="${h}"><img src="${A('key')}" style="width:60px"><div class="h2" style="margin-top:4px">${nm}</div><div class="lab">${sub}</div><div class="p" style="margin-top:4px"><b>${h}</b><br>${w}\u00d7${g} \u2192 ${w+H[2]}\u00d7${g+H[3]}</div></div>`}).join('')}</div></div>`;
  $('helpB').querySelectorAll('[data-h]').forEach(el=>el.onclick=()=>{S.lv[el.dataset.h]++;o.classList.remove('on');toast(`${KEYS[el.dataset.h][0]}: ${el.dataset.h} levelled up.`);renderShop()});
}

// ---------------- the world (persistent across the run) ----------------
const TYPEORDER=['temple','school','market','court','school','temple','market','court','school'];
function townName(){ return pick(NAMEBITS[0])+pick(NAMEBITS[1])+pick(NAMEBITS[2]); }
function initWorld(){
  const B=BOARDS[10].towns; const cap=B[0];
  const order=[0,...B.map((t,i)=>i).slice(1).sort((a,b)=>Math.hypot(B[a].x-cap.x,B[a].y-cap.y)-Math.hypot(B[b].x-cap.x,B[b].y-cap.y))];
  S.world={ towns:order.map((bi,k)=>({bi, name:townName(), type:TYPEORDER[k], active:k<2, q:[], over:0, ink:0, del:0, built:[], waited:0, sawInk:false})),
    paths:[], believers:2, traits:new Set(), cur:{devotion:0,insight:0,plenty:0,harmony:0}, devoCount:0 };
}
function townXY(t){ const b=BOARDS[DISP[DISPKEY()].board].towns[t.bi]; return b; }

// ---------------- the Watch ----------------
const WV={canvas:null, ctx:null, dpr:1, cam:{x:0,y:0,s:.5}, target:{x:0,y:0,s:.5}, run:false};
let WS=null; // this Watch's session
const imgCache={};
function img(n){ if(!imgCache[n]){ const i=new Image(); i.src=A(n); imgCache[n]=i; } return imgCache[n]; }
function sizeCanvas(){ const c=WV.canvas; WV.dpr=Math.min(3,(window.devicePixelRatio||1)*ST.s); c.width=844*WV.dpr; c.height=390*WV.dpr; }
function startWatch(){
  const D=DISP[DISPKEY()];
  WS={t:0, speed:1, spawn:{}, bubble:null, bubbleT:4, newTownT:0, gathered:{devotion:0,insight:0,plenty:0,harmony:0}, cards:[], built:[], drag:null, voiceT:0, charityT:0, ended:false, overflows:0};
  $('board').src=A('board_'+D.board);
  if(!WV.canvas){ WV.canvas=$('wc'); WV.ctx=WV.canvas.getContext('2d'); bindWatch(); }
  sizeCanvas();
  for(const k in PLACES) img(PLACES[k].icon); img('b_'+D.board); img('i_collapse');
  camTarget(true);
  show('sWatch'); setSpeed(1); renderCoins(); renderDials('wdials'); $('bReveal').classList.add('off');
  say('idle', S.world.towns[0]);
  WV.run=true; WV.last=performance.now(); requestAnimationFrame(loop);
}
function activeTowns(){ return S.world.towns.filter(t=>t.active); }
function camTarget(snap){
  const ts=activeTowns().map(townXY); let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;
  ts.forEach(p=>{x0=Math.min(x0,p.x);y0=Math.min(y0,p.y);x1=Math.max(x1,p.x);y1=Math.max(y1,p.y)});
  const pad=230; x0-=pad; x1+=pad; y0-=pad*.8; y1+=pad*.8;
  const s=clamp(Math.min(844/(x1-x0), 390/(y1-y0)), 844/2400*1.0, 1.1);
  const cx=(x0+x1)/2, cy=(y0+y1)/2;
  WV.target={s, x:clamp(422-cx*s, 844-2400*s, 0), y:clamp(195-cy*s, 390-1120*s, 0)};
  if(snap) WV.cam={...WV.target};
}
function w2s(p){ return {x:p.x*WV.cam.s+WV.cam.x, y:p.y*WV.cam.s+WV.cam.y}; }
function setSpeed(v){ WS.speed=v; $('bPause').classList.toggle('on',v===0); $('bP1').classList.toggle('on',v===1); $('bP2').classList.toggle('on',v===2); }
function say(kind, town, place){ const L=VOICE[kind]; let q=pick(L).replace('{t}',town?town.name:'').replace('{p}',place?PLACES[place].name.toLowerCase():'temple');
  const where = kind==='deliver'||kind==='build'? `Heard at the ${PLACES[place||'temple'].name.toLowerCase()} \u00b7 ${town.name}` : `Heard in ${town?town.name:'the valley'}`;
  $('vWhere').textContent=where; $('vQ').textContent=q; WS.voiceT=0; }
function renderCoins(){
  const c=S.world.cur; const col={devotion:['#fff0b0','#8a5a12'],insight:['#ffffff','#5d6470'],plenty:['#f6c9a0','#5e3214'],harmony:['#d6f2dc','#1f5a3a']};
  $('coins').innerHTML=Object.keys(c).map(k=>`<div class="coin" data-tip="1" data-c="${k}"><span style="background:linear-gradient(135deg,${col[k][0]},${col[k][1]})"><img src="${A('i_'+k)}"></span>${Math.floor(c[k])}</div>`).join('');
  $('coins').querySelectorAll('[data-c]').forEach(el=>el.onclick=()=>{const k=el.dataset.c;const pl=Object.values(PLACES).find(p=>p.cur===k);showTip(`<h5>${CURNAME[k]}</h5><p>Earned when travellers reach a ${pl.name}. Spend it in Society.</p>`,el)});
  const used=S.world.paths.filter(p=>p.wk).length; $('bel').textContent=`${used} of ${S.world.believers}`;
  const yr=Math.floor(WS.t/(T.season*4)), se=Math.floor(WS.t/T.season)%4;
  $('wYear').textContent=`The Watch \u00b7 Year ${['One','Two','Three','Four','Five','Six','Seven','Eight'][Math.min(7,yr)]}`; $('wSeason').textContent=['Spring','Summer','Late Summer','Winter'][se];
}
function addTravellerTypes(){ const s=new Set(activeTowns().map(t=>t.type)); return [...s]; }
function loop(now){
  if(!WV.run) return;
  const dt=Math.min(0.05,(now-WV.last)/1000); WV.last=now;
  if(WS.speed>0) step(dt*WS.speed);
  // camera ease
  const k=Math.min(1,dt*2.2); for(const a of ['x','y','s']) WV.cam[a]+=(WV.target[a]-WV.cam[a])*k;
  $('board').style.transform=`translate(${WV.cam.x}px,${WV.cam.y}px) scale(${WV.cam.s})`;
  drawWatch(now/1000);
  requestAnimationFrame(loop);
}
function graphDist(type){
  const ts=S.world.towns; const d=new Map(); const q=[];
  ts.forEach(t=>{ if(t.active&&t.type===type){d.set(t,0);q.push(t)} });
  while(q.length){ const t=q.shift(); for(const p of S.world.paths){ if(!p.wk) continue; const o=p.a===t?p.b:p.b===t?p.a:null; if(o&&!d.has(o)){d.set(o,d.get(t)+1);q.push(o)} } }
  return d;
}
function step(dt){
  const Wd=S.world; WS.t+=dt; const yr=WS.t/(T.season*4);
  const D=S.disp; const late = Math.max(0, WS.t-T.season*4)/T.season;
  const rate = (0.17 + D*0.022) * Math.pow(1.12, late);
  const types=addTravellerTypes(); const cap=6+(Wd.traits.has('law')?2:0);
  // new towns
  WS.newTownT+=dt; const every=(Wd.traits.has('missions')?12:17);
  if(WS.newTownT>every){ WS.newTownT=0; const nt=Wd.towns.find(t=>!t.active); if(nt){ nt.active=true; camTarget(); toast(`A new town: <b>${nt.name}</b>. Its people need a road to the ${PLACES[nt.type].name.toLowerCase()} and beyond.`,2400);} }
  const dist={}; for(const ty of types) dist[ty]=graphDist(ty);
  for(const t of activeTowns()){
    const others=types.filter(x=>x!==t.type); if(!others.length) continue;
    t.sp=(t.sp||R()*2)+dt*rate*(t.ink?1.6:1);
    if(t.sp>1.6){ t.sp=0; t.q.push(pick(others)); }
    if(t.q.length>cap){ t.over+=dt; if(t.over>6){ t.over=0; t.q.splice(0,3); t.ink=Math.min(3,t.ink+1); t.sawInk=true; WS.overflows++; t.waited++; applyDials({collapse:3,joy:-2,truth:-1}); renderDials('wdials'); say('ink',t); toast(`Unrest in <b>${t.name}</b>. Collapse +3. Tap the ink to cleanse it.`); if(S.collapse>=100){WV.run=false;return gameOver('collapse');} } }
    else t.over=Math.max(0,t.over-dt*.5);
  }
  if(Wd.traits.has('charity')){ WS.charityT+=dt; if(WS.charityT>5){WS.charityT=0; const t=activeTowns().sort((a,b)=>b.q.length-a.q.length)[0]; if(t&&t.q.length) t.q.pop();} }
  // walkers
  const speed=150*(Wd.traits.has('roads')?1.4:1);
  for(const p of Wd.paths){ if(!p.wk) continue; const A_=townXY(p.a), B_=townXY(p.b); const len=Math.hypot(B_.x-A_.x,B_.y-A_.y)||1;
    p.wk.pos+=p.wk.dir*speed*dt/len;
    if(p.wk.pos>=1||p.wk.pos<=0){ p.wk.pos=clamp(p.wk.pos,0,1); const at=p.wk.pos>=1?p.b:p.a, from=at===p.a?p.b:p.a;
      // unload
      const keep=[]; for(const ty of p.wk.load){ if(at.type===ty) deliver(at,ty); else at.q.push(ty); } p.wk.load=keep;
      // load
      for(let i=at.q.length-1;i>=0&&p.wk.load.length<4;i--){ const ty=at.q[i]; const dm=dist[ty]; if(!dm) continue; const da=dm.has(at)?dm.get(at):99, db=dm.has(from)?dm.get(from):99; if(db<da){ p.wk.load.push(ty); at.q.splice(i,1);} }
      p.wk.dir*=-1; }
  }
  // prayer bubbles
  WS.bubbleT-=dt; if(WS.bubble){ WS.bubble.ttl-=dt; if(WS.bubble.ttl<=0) WS.bubble=null; }
  if(!WS.bubble && WS.bubbleT<=0){ const t=pick(activeTowns()); WS.bubble={t, type:pick(Object.keys(PLACES)), ttl:7}; WS.bubbleT=6+R()*4; }
  WS.voiceT+=dt; if(WS.voiceT>9){ const t=pick(activeTowns()); say(t.q.length>4?'wait':'idle',t); }
  if(WS.t>=T.season*4) $('bReveal').classList.remove('off');
  renderCoinsThrottle(dt);
}
let coinT=0; function renderCoinsThrottle(dt){ coinT+=dt; if(coinT>.25){coinT=0; renderCoins();} }
function deliver(t,ty){
  const Wd=S.world, pl=PLACES[ty]; let amt=1; if(ty==='school'&&Wd.traits.has('writing')) amt=2;
  Wd.cur[pl.cur]+=amt; WS.gathered[pl.cur]+=amt; S.dispCur[pl.cur]+=amt;
  const nudge={temple:{redemption:.6,truth:.3}, school:{progress:.6}, market:{joy:.6}, court:{collapse:-.4, agency:Wd.traits.has('councils')?0:-.2}}[ty];
  if(ty==='court'&&Wd.traits.has('councils')) nudge.collapse=-.7;
  applyDials(nudge);
  if(ty==='temple'){ Wd.devoCount++; if(Wd.devoCount%10===0 && Wd.believers<12){ Wd.believers++; toast('A new believer will walk your paths.'); } }
  t.del++;
  if(R()<.18) say('deliver',t,ty);
  if(t.del%8===0) build(t);
  if(R()<.1) renderDials('wdials');
}
const KITFOR={temple:[0,6],school:[2,1],market:[3,4],court:[5,7]};
function build(t){
  const opts=KITFOR[t.type]; const k=opts[t.built.length%2]; t.built.push(k); WS.built.push({t,k});
  const pl=PLACES[t.type]; let line=`<b>${['Temple','Home','School','Market','Granary','Court','Garden','Works'][k]}</b> rose in ${t.name}.`;
  if(k===0) S.temples++;
  if(pl.card){ const c=newCard(pl.card, ri(2,10)); S.deck.push(c); WS.cards.push(c); line+=` +${c.rank} of ${SUITNAME[c.suit]} added to your deck.`; }
  else { S.light+=2; line+=' +2 Light.'; }
  toast(line,2800); say('build',t,t.type);
}
function drawWatch(time){
  const c=WV.ctx, d=WV.dpr; c.setTransform(d,0,0,d,0,0); c.clearRect(0,0,844,390);
  const Wd=S.world; const sc=WV.cam.s; const B=img('b_'+DISP[DISPKEY()].board);
  // buildings the people raised
  for(const t of activeTowns()){ const p=w2s(townXY(t)); t.built.forEach((k,i)=>{ const a=(i*2.1+0.6), r=(28+i*6)*Math.max(.7,sc*1.4); const x=p.x+Math.cos(a)*r*1.3, y=p.y+Math.sin(a)*r*.7; const sz=Math.max(26,92*sc);
    if(B.complete) c.drawImage(B,k*240,0,240,240,x-sz/2,y-sz*.8,sz,sz); }); }
  // paths
  for(const p of Wd.paths){ const a=w2s(townXY(p.a)), b=w2s(townXY(p.b));
    c.lineCap='round'; c.setLineDash(p.wk?[]:[5,6]);
    c.strokeStyle='#080a1aaa'; c.lineWidth=6.5; c.beginPath(); c.moveTo(a.x,a.y); c.lineTo(b.x,b.y); c.stroke();
    c.strokeStyle=p.wk?'#f0d58a':'#a9adc8'; c.lineWidth=p.wk?3.4:2; c.beginPath(); c.moveTo(a.x,a.y); c.lineTo(b.x,b.y); c.stroke(); c.setLineDash([]);
    if(p.wk){ const x=a.x+(b.x-a.x)*p.wk.pos, y=a.y+(b.y-a.y)*p.wk.pos; c.fillStyle='#fff6d8'; c.strokeStyle='#6e4a10'; c.lineWidth=1.2; c.beginPath(); c.arc(x,y,5.5,0,7); c.fill(); c.stroke();
      p.wk.load.forEach((ty,i)=>{ c.fillStyle=PLACES[ty].col; c.beginPath(); c.arc(x-6+i*4,y-9,1.9,0,7); c.fill(); }); }
  }
  if(WS.drag){ const a=w2s(townXY(WS.drag.from)); c.strokeStyle='#f0d58acc'; c.lineWidth=3; c.setLineDash([4,4]); c.beginPath(); c.moveTo(a.x,a.y); c.lineTo(WS.drag.x,WS.drag.y); c.stroke(); c.setLineDash([]); }
  // towns
  for(const t of activeTowns()){ const p=w2s(townXY(t)); const pl=PLACES[t.type];
    if(t.ink){ const r=16+t.ink*7; const g=c.createRadialGradient(p.x+8,p.y+6,2,p.x+8,p.y+6,r); g.addColorStop(0,'#05060fee'); g.addColorStop(.7,'#0a0b1ccc'); g.addColorStop(1,'#0a0b1c00'); c.fillStyle=g; c.beginPath();
      for(let a=0;a<6.3;a+=.35){ const rr=r*(.75+.25*Math.sin(a*3+time*.8+t.bi)); c.lineTo(p.x+8+Math.cos(a)*rr,p.y+6+Math.sin(a)*rr*.7);} c.fill(); }
    c.fillStyle='#080a1a'; c.beginPath(); c.arc(p.x,p.y,11,0,7); c.fill();
    c.strokeStyle='#d9a93a'; c.lineWidth=1.6; c.beginPath(); c.arc(p.x,p.y,11,0,7); c.stroke();
    if(t.over>0){ c.strokeStyle='#ee6a4f'; c.lineWidth=2.6; c.beginPath(); c.arc(p.x,p.y,14,-Math.PI/2,-Math.PI/2+t.over/6*6.283); c.stroke(); }
    const ic=img(pl.icon); if(ic.complete) c.drawImage(ic,p.x-7,p.y-7,14,14);
    // waiting travellers
    t.q.forEach((ty,i)=>{ const col=i%4,row=Math.floor(i/4); c.fillStyle=PLACES[ty].col; c.strokeStyle='#080a1a'; c.lineWidth=1; c.beginPath(); c.arc(p.x+17+col*6.5,p.y-5+row*6.5,2.6,0,7); c.fill(); c.stroke(); });
    c.font='600 8px Jost,sans-serif'; c.textAlign='center'; c.fillStyle='#fff'; c.shadowColor='#000'; c.shadowBlur=3; c.fillText(t.name.toUpperCase(),p.x,p.y+22); c.shadowBlur=0;
  }
  if(WS.bubble){ const p=w2s(townXY(WS.bubble.t)); const y=p.y-30-Math.sin(time*3)*2; const al=Math.min(1,WS.bubble.ttl);
    c.globalAlpha=al; c.fillStyle='#fff8e2'; c.strokeStyle='#d9a93a'; c.lineWidth=1.5; c.beginPath(); c.arc(p.x,y,11,0,7); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(p.x-3,y+10); c.lineTo(p.x,y+16); c.lineTo(p.x+3,y+10); c.fill();
    const ic=img(PLACES[WS.bubble.type].icon); if(ic.complete){ c.filter='brightness(.35) sepia(1) saturate(3)'; c.drawImage(ic,p.x-7,y-7,14,14); c.filter='none'; } c.globalAlpha=1; }
}
function townAt(x,y,r=20){ let best=null,bd=r; for(const t of activeTowns()){ const p=w2s(townXY(t)); const d=Math.hypot(p.x-x,p.y-y); if(d<bd){bd=d;best=t} } return best; }
function pathAt(x,y){ for(const p of S.world.paths){ const a=w2s(townXY(p.a)), b=w2s(townXY(p.b)); const vx=b.x-a.x, vy=b.y-a.y, L=vx*vx+vy*vy; const u=clamp(((x-a.x)*vx+(y-a.y)*vy)/L,0,1); if(u>.15&&u<.85&&Math.hypot(a.x+vx*u-x,a.y+vy*u-y)<9) return p; } return null; }
function freeBelievers(){ return S.world.believers - S.world.paths.filter(p=>p.wk).length; }
function bindWatch(){
  const cv=$('wc');
  cv.addEventListener('pointerdown',e=>{ if(!WS||WS.ended) return; const p=toStage(e.clientX,e.clientY); cv.setPointerCapture(e.pointerId);
    if(WS.bubble){ const b=w2s(townXY(WS.bubble.t)); if(Math.hypot(b.x-p.x,b.y-30-p.y)<18){ answerPrayer(); return; } }
    const t=townAt(p.x,p.y); if(t){ WS.drag={from:t,x:p.x,y:p.y,moved:false}; return; }
    const pa=pathAt(p.x,p.y); if(pa) tapPath(pa);
  });
  cv.addEventListener('pointermove',e=>{ if(!WS||!WS.drag) return; const p=toStage(e.clientX,e.clientY); if(Math.hypot(p.x-WS.drag.x,p.y-WS.drag.y)>6) WS.drag.moved=true; WS.drag.x=p.x; WS.drag.y=p.y; });
  cv.addEventListener('pointerup',e=>{ if(!WS||!WS.drag) return; const p=toStage(e.clientX,e.clientY); const from=WS.drag.from; const moved=WS.drag.moved; WS.drag=null;
    if(!moved){ if(from.ink) cleanse(from); else showTownTip(from); return; }
    const to=townAt(p.x,p.y,26); if(!to||to===from) return;
    if(S.world.paths.some(q=>(q.a===from&&q.b===to)||(q.a===to&&q.b===from))) return toast('There is already a path there.');
    const pa={a:from,b:to,wk:null}; if(freeBelievers()>0) pa.wk={pos:0,dir:1,load:[]}; else toast('No believer is free to walk it. Tap another path to free one, or earn more at the temple.');
    S.world.paths.push(pa); renderCoins();
  });
}
function tapPath(pa){
  if(pa.wk){ pa.wk.load.forEach(ty=>pa.a.q.push(ty)); pa.wk=null; S.world.paths.splice(S.world.paths.indexOf(pa),1); toast('Path taken up. Its believer is free.'); }
  else if(freeBelievers()>0){ pa.wk={pos:0,dir:1,load:[]}; toast('A believer now walks this path.'); }
  else { S.world.paths.splice(S.world.paths.indexOf(pa),1); }
  renderCoins();
}
function showTownTip(t){ toast(`<b>${t.name}</b> \u00b7 ${PLACES[t.type].name}. ${t.q.length} waiting. ${t.del} arrived here. Drag from a town to another to lay a path.`,2400); }
function answerPrayer(){ const b=WS.bubble; WS.bubble=null; const pl=PLACES[b.type]; S.world.cur[pl.cur]+=4; WS.gathered[pl.cur]+=4; S.dispCur[pl.cur]+=4; b.t.q.splice(0,2); say('prayer',b.t);
  let extra=''; if(R()<.25 && S.world.believers<12){ S.world.believers++; extra=' One of them will walk your paths.'; }
  toast(`Prayer answered in ${b.t.name}: +4 ${CURNAME[pl.cur]}.${extra}`); renderCoins(); }
function cleanse(t){ const W=S.world; if(W.cur.devotion<5) return toast('Cleansing the ink costs 5 Devotion.');
  W.cur.devotion-=5; t.ink=Math.max(0,t.ink-1); const c=newCard('punish',ri(2,10)); S.deck.push(c); WS.cards.push(c); applyDials({truth:2,collapse:-2}); renderDials('wdials');
  toast(`The ink thins in ${t.name}. Truth +2. +${c.rank} of Punish added to your deck.`); renderCoins(); }
function openTree(){
  setSpeed(0); const o=$('treeO'); o.classList.add('on');
  const W=S.world;
  $('tree').innerHTML=TRAITS.map(tr=>{ const have=W.traits.has(tr.id), lock=tr.need&&!W.traits.has(tr.need); const cost=Object.entries(tr.cost).map(([k,v])=>`${v} ${CURNAME[k]}`).join(' \u00b7 ');
    const can=!have&&!lock&&Object.entries(tr.cost).every(([k,v])=>W.cur[k]>=v);
    return `<div class="plate trait ${have?'have':''} ${lock?'lock':''}" data-t="${tr.id}" style="opacity:${have||can?1:.6}"><div class="h2">${tr.name}</div><div class="p">${tr.text}</div><div class="c">${have?'Grown':lock?`Needs ${TRAITS.find(x=>x.id===tr.need).name}`:cost}</div></div>`}).join('');
  $('tree').querySelectorAll('[data-t]').forEach(el=>el.onclick=()=>{ const tr=TRAITS.find(x=>x.id===el.dataset.t); if(W.traits.has(tr.id)) return; if(tr.need&&!W.traits.has(tr.need)) return toast('Grow the trait before it first.');
    if(!Object.entries(tr.cost).every(([k,v])=>W.cur[k]>=v)) return toast('Your people have not gathered enough yet.');
    for(const k in tr.cost) W.cur[k]-=tr.cost[k]; W.traits.add(tr.id); applyDials(tr.fx); if(tr.id==='pilgrimage') W.believers+=2; renderDials('wdials'); renderCoins(); toast(`${tr.name} spreads through your people.`); openTree(); });
}
function endWatch(){
  WS.ended=true; setSpeed(0);
  S.lastSeasons=Math.floor(WS.t/T.season); S.watchesKept++;
  const W=S.world; const left=W.cur.devotion+W.cur.insight+W.cur.plenty+W.cur.harmony; const toLight=Math.floor(left/10);
  const school = S.powers.includes('school')? Math.floor(W.cur.insight/4):0;
  const g=WS.gathered;
  const o=$('treeO'); o.classList.add('on');
  $('tree').innerHTML=''; o.querySelector('.center').innerHTML=`<div class="lab">The Watch ends after ${S.lastSeasons} seasons</div><div class="h1 gtext" style="font-size:18px">You reveal yourself</div>
   <div class="p">Gathered ${Math.floor(g.devotion)} Devotion, ${Math.floor(g.insight)} Insight, ${Math.floor(g.plenty)} Plenty, ${Math.floor(g.harmony)} Harmony.<br>
   ${WS.built.length?`Raised: ${WS.built.map(b=>['a temple','homes','a school','a market','a granary','a court','a garden','works'][b.k]+' in '+b.t.name).join(', ')}.`:'Nothing new was built.'}
   ${WS.cards.length?`<br>New cards: ${WS.cards.map(c=>`${c.rank===1?'I':c.rank} of ${SUITNAME[c.suit]}`).join(', ')}.`:''}${WS.overflows?`<br>Unrest broke out ${WS.overflows} time${WS.overflows>1?'s':''}.`:''}</div>
   <div class="row" style="margin-top:6px"><div class="btn gold" id="bConv">Turn leftovers into ${toLight+school} Light</div><div class="btn dark" id="bKeep">Keep them for Society${school?` (+${school} Light)`:''}</div></div>
   <div class="p mi" style="font-size:11.5px">Leftover Devotion, Insight, Plenty and Harmony turn into Light at 10 to 1, or stay with your people for the society tree.</div>`;
  const done=(conv)=>{ if(conv){ S.light+=toLight; for(const k in W.cur) W.cur[k]=0; } S.light+=school; o.classList.remove('on'); restoreTree(); WV.run=false; afterWatch(); };
  $('bConv').onclick=()=>done(true); $('bKeep').onclick=()=>done(false);
}
function restoreTree(){ $('treeO').querySelector('.center').innerHTML='<div class="h2">Society \u00b7 spend what the people gathered</div><div class="tree" id="tree"></div><div class="btn dark small" id="bTreeX">Back to the Watch</div>'; $('bTreeX').onclick=()=>{$('treeO').classList.remove('on'); setSpeed(1);}; }
function afterWatch(){
  if(S.collapse>=100) return gameOver('collapse');
  if(S.era<2){ S.era++; eraSelect(); return; }
  if(S.disp===7) return victory();
  witnessPick();
}

// ---------------- the witness: pick 1 of 7 ----------------
function witnessPick(){
  const ts=activeTowns(); const next=SLOTS[S.disp+1]; const opts=next.opts;
  const sils=['s_11','s_11_1','s_11_2','s_11_3','s_12','s_12_1','s_12_2','s_12_3','s_13_1'];
  const people=[]; const usedS=shuffle(sils.slice());
  for(let i=0;i<7;i++){ const t=ts[i%ts.length]; const role=pick(ROLES); const name=townName();
    const suit = t.ink? 'punish' : (PLACES[t.type].card || pick(SUITS));
    const life = t.sawInk? 'Watched the dark settle over the well and did not leave.' : t.built.length? `Helped raise the ${['temple','homes','school','market','granary','court','garden','works'][t.built[t.built.length-1]]} in ${t.name}.` : t.waited? `Waited three days at the crossing for a path that never came.` : t.del>10? `Walks the path to the ${PLACES[t.type].name.toLowerCase()} every week, rain or not.` : 'Has never seen anything holy and still looks up at night.';
    const faith = S.dials.truth>15? 'Believes what the elders teach, and asks why.' : S.dials.truth<-15? 'Thinks the priests are lying, and suspects you are not.' : S.dials.joy<-10? 'Prays mostly for the pain to stop.' : 'Hopes someone is listening.';
    const lean=opts.length>1?opts[i%opts.length]:null; const dial=pick(DIALS); const dv=pick([5,5,-4,8]);
    const w=8+S.disp*6;
    people.push({name, role, town:t.name, sil:usedS[i%usedS.length], suit, w, dial, dv, lean, bio:`A ${role} in ${t.name}. ${life} ${faith}`,
      fx:`${SUITNAME[suit]} cards +${w} Witness through the next Dispensation. ${DIALNAME[dial]} ${dv>0?'+':''}${dv} now.${lean?` Leans toward ${DISP[lean].name}.`:''}`});
  }
  $('msgBody').innerHTML=`<div class="lab">Before the next Dispensation</div><div class="h2" style="font-size:13px">Choose one person to reveal yourself to</div>
    <div class="ppl">${people.map((p,i)=>`<div class="plate per" data-i="${i}"><img src="${A(p.sil)}"><div class="h2">${p.name}</div><div class="r">${p.role} \u00b7 ${p.town}</div><div class="bio">${p.bio.split('. ').slice(1).join('. ')}</div><div class="fx">${p.fx}</div></div>`).join('')}</div>
    <div class="p mi" style="font-size:11px">The person you choose walks with you as a Witness for one Dispensation, and tilts which world comes next.</div>`;
  show('sMsg');
  document.querySelectorAll('.per').forEach(el=>el.onclick=()=>{ const p=people[+el.dataset.i]; S.witness=p; applyDials({[p.dial]:p.dv}); resolveSlot(); });
}
function resolveSlot(){
  const next=SLOTS[S.disp+1]; const d={...S.dials, collapse:S.collapse}; const c={...S.dispCur, towns:activeTowns().length};
  if(next.opts.length===1){ S.route.push(next.opts[0]); S.disp++; beginDisp(); return; }
  const sc=next.opts.map(o=>{ const [fn,why]=next.lean[o]; let v=fn(d,c)+(S.witness&&S.witness.lean===o?25:0)+R()*3; return {o,v,why}; });
  const mx=Math.max(...sc.map(s=>s.v)), mn=Math.min(...sc.map(s=>s.v));
  const win=sc.find(s=>s.v===mx);
  S.history.push({disp:DISP[DISPKEY()].name, score:C?C.score:0});
  msg(`<div class="lab">Slot ${S.disp+2} of 8 \u00b7 ${next.name}</div><div class="h2" style="font-size:13px">Your people turn toward</div>
    <div class="row">${sc.map(s=>`<div class="plate slotopt ${s===win?'win':''}"><div class="h2">${DISP[s.o].name}</div><div class="p mi" style="font-size:11.5px;margin-top:4px">When ${s.why}</div><div class="sc"><i style="width:${mx===mn?100:Math.max(6,(s.v-mn)/(mx-mn)*100)}%"></i></div></div>`).join('')}</div>
    <div class="p" style="font-size:13px">${DISP[win.o].name}, because ${win.why}${S.witness.lean===win.o?`, and ${S.witness.name} pointed the way`:''}.</div>
    <div class="btn gold" id="bNextD">Enter ${DISP[win.o].name}</div>`);
  $('bNextD').onclick=()=>{ S.route.push(win.o); S.disp++; beginDisp(); };
}

// ---------------- endings ----------------
function godScore(){ const d=S.dials; return Math.round((d.truth+d.joy+d.progress+d.redemption+d.agency)*10 + (100-S.collapse)*5 + S.disp*500); }
function summary(){ const d=S.dials; return `<div class="row" style="gap:14px">${[...DIALS,'collapse'].map(k=>`<div style="text-align:center"><img src="${A('i_'+k)}" style="width:20px"><div class="lab">${DIALNAME[k]}</div><div style="font:600 15px var(--serif)">${Math.round(k==='collapse'?S.collapse:d[k])}</div></div>`).join('')}</div>
  <div class="p mi" style="font-size:12px">Your path: ${S.route.map(k=>DISP[k].name).join(' \u2192 ')}</div>`; }
function gameOver(why){
  WV.run=false;
  msg(`<div class="lab">The run ends</div><div class="h1" style="color:var(--red)">${why==='collapse'?'The people fell':'Not enough was witnessed'}</div>
   <div class="p">${why==='collapse'?'Collapse reached 100. The people destroyed themselves.':`${fmt(C.score)} of ${fmt(C.target)} in ${T.eraNames[S.era]} of ${DISP[DISPKEY()].name}.`}</div>
   ${summary()}<div class="h2">God Score ${fmt(godScore())}</div><div class="btn gold" id="bAgain">Start a new run</div>`);
  $('bAgain').onclick=()=>show('sTitle');
}
function victory(){
  msg(`<div class="lab">Eight Dispensations kept</div><div class="h1 gtext">Everlasting</div><div class="p">Your people reached ${DISP[DISPKEY()].name}. In the full game the endless levels begin here.</div>${summary()}<div class="h2">God Score ${fmt(godScore())}</div><div class="btn gold" id="bAgain">Start a new run</div>`);
  $('bAgain').onclick=()=>show('sTitle');
}

// ---------------- help ----------------
const HELP=`<h3>The run</h3><p>Eight Dispensations, each with three Eras: The Revelation, The Kingdom, The Faith Crisis. Beat each Era's target with 4 hands and 3 discards. Miss a target, or let Collapse reach 100, and the run ends. Every run starts with The Waking and Dawn; your people decide the other six from the dials and what they did in the Watch.</p>
<h3>The cards</h3><p>Pick 1 to 5 cards and play a poker hand. Score is Witness \u00d7 Glory. The plate shows the exact score before you play; the suit bars show where each suit's level will land. Press and hold the plate to see the dials move. Every 2 levels in a suit gives that suit's cards +1 Witness (a stand-in until the design settles it). Hold a card to read it. Tap Powers, Tablets and Keys for details.</p>
<h3>The shop</h3><p>Spend Light on Godhood Powers (5 slots), Keys that level a hand, Tablets that change cards, Packs and Mantles. Each item says how it fits your run.</p>
<h3>The Watch</h3><p>Drag from one town to another to lay a path. A believer walks each path and carries travellers who want a Temple, School, Market or Court. Arrivals pay Devotion, Insight, Plenty or Harmony and slowly move the dials. Paths without a believer stay dashed and carry no one; tap a path to take it up and free its believer. If too many people wait in a town, unrest spreads ink and raises Collapse: tap the ink to cleanse it for 5 Devotion. Tap prayer bubbles for a burst. Every 8 arrivals the people build something, which can add cards to your deck. Open Society to grow traits. After one year, Reveal Yourself ends the Watch; staying longer gets harder.</p>
<h3>The witness</h3><p>After each Faith Crisis Watch, choose 1 of 7 people. They walk with you for the next Dispensation and tilt which world comes next.</p>
<h3>What is simulated</h3><p>The people (their choices, names for you, words and bios) come from a seeded stand-in, not the on-device model. All rules and numbers come from the design docs and are meant to be tuned.</p>
<div style="text-align:center;margin-top:10px"><div class="btn gold" id="bHelpX">Close</div></div>`;
function help(){ const o=$('helpO'); o.classList.add('on'); $('helpB').innerHTML=HELP; $('bHelpX').onclick=()=>o.classList.remove('on'); if(WS&&!WS.ended&&$('sWatch').classList.contains('on')) setSpeed(0); }

// ---------------- wiring ----------------
function init(){
  fit();
  $('deckPick').innerHTML=Object.entries(DECKS).map(([k,d])=>`<div class="plate choice ${k===deckChoice?'on':''}" data-d="${k}"><div class="h2">${d.name}</div><div class="p">${d.text}</div></div>`).join('');
  document.querySelectorAll('[data-d]').forEach(el=>el.onclick=()=>{deckChoice=el.dataset.d;document.querySelectorAll('[data-d]').forEach(x=>x.classList.toggle('on',x===el))});
  $('bStart').onclick=startRun; $('bHelp').onclick=help; $('bQ').onclick=help;
  $('bPlay').onclick=()=>{ if(holdFired){holdFired=false;return;} playHand(); };
  $('bDisc').onclick=discard;
  $('bSortR').onclick=()=>{C.sort='rank';sortHand();renderHand()}; $('bSortS').onclick=()=>{C.sort='suit';sortHand();renderHand()};
  for(const id of ['preview','bPlay']){ const el=$(id); let t; el.addEventListener('pointerdown',()=>{t=setTimeout(()=>{holdFired=id==='bPlay';$('cdials').classList.add('hold')},300)}); const up=()=>{clearTimeout(t);$('cdials').classList.remove('hold')}; el.addEventListener('pointerup',up); el.addEventListener('pointerleave',up); el.addEventListener('pointercancel',up); }
  $('bReroll').onclick=()=>{const c=3+SH.rerolls; if(S.light<c) return; S.light-=c; SH.rerolls++; stockShop(); renderShop();};
  $('bShopNext').onclick=startWatch;
  $('bPause').onclick=()=>setSpeed(0); $('bP1').onclick=()=>setSpeed(1); $('bP2').onclick=()=>setSpeed(2);
  $('bReveal').onclick=()=>{ if(WS.t<T.season*4) return; endWatch(); };
  $('bTree').onclick=openTree; $('bTreeX').onclick=()=>{$('treeO').classList.remove('on'); setSpeed(1);};
  // preload card art
  for(const s of SUITS) for(let r=1;r<=13;r++) img('c_'+s+'_'+r);
}
let holdFired=false;
init();
// test hooks (used by the automated check, harmless for players)
window.__E={get S(){return S},get C(){return C},get WS(){return WS},startRun,startEra,startWatch,endWatch,eraWon,openShop,witnessPick,score,evalHand};
