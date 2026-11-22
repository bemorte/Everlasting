import * as THREE from 'three';
import {buildModel,buildProp,rblob,vgrad} from '/models.js';
import {richMat,harmonize} from '/mats.js';
const Q=new URLSearchParams(location.search);globalThis.__HD=+(Q.get('hd')||0); const MERA=+Q.get('era')||6,ERA=MERA==9?7:MERA==10?1:MERA==11?2:MERA==12||MERA==13?5:MERA==14?6:MERA>=15&&MERA<=17?7:MERA==18||MERA==19?8:MERA, VIEW=Q.get('view')||'region', SEED=+Q.get('seed')||7;
const W=+Q.get('w')||1600,H=+Q.get('h')||1100;const RW=globalThis.__HD==2;
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});
renderer.setSize(W,H); renderer.setPixelRatio(1); renderer.setClearColor(0,0);
renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=1.18; renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap; document.body.appendChild(renderer.domElement);
const scene=new THREE.Scene();
// ---------- rng and noise ----------
function mulberry(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const hash=(x,y,s=0)=>{let h=Math.imul(x*374761393+y*668265263+(SEED+s)*2147483647|0,1274126177);h^=h>>>13;h=Math.imul(h,1274126177);return((h^h>>>16)>>>0)/4294967296};
const sm=t=>t*t*(3-2*t);
function vnoise(x,y,s){const xi=Math.floor(x),yi=Math.floor(y),xf=sm(x-xi),yf=sm(y-yi);const a=hash(xi,yi,s),b=hash(xi+1,yi,s),c=hash(xi,yi+1,s),d=hash(xi+1,yi+1,s);return a+(b-a)*xf+(c-a)*yf+(a-b-c+d)*xf*yf}
const fbm=(x,y,s)=>vnoise(x,y,s)*.55+vnoise(x*2.1,y*2.1,s+1)*.28+vnoise(x*4.3,y*4.3,s+2)*.17;
// ---------- the land: a height map in whole steps ----------
const NEWMAX=19;const N=60, SEA=1, STEP=.42;
const hgt=[],wet=[],kind=[]; const I=(x,y)=>x+y*N, inb=(x,y)=>x>=0&&y>=0&&x<N&&y<N;
for(let y=0;y<N;y++)for(let x=0;x<N;x++){const u=x/N-.5,v=y/N-.5;
  const edge=Math.max(Math.abs(u),Math.abs(v))*2; const ang=Math.atan2(v,u); const coast=.78+.34*fbm(Math.cos(ang)*1.6+4,Math.sin(ang)*1.6+4,3)+.12*Math.sin(ang*3+1.3);
  const r=Math.hypot(u,v)*2/coast/1.12; let mask=Math.max(0,1-Math.pow(Math.min(r,1.3),3.2));
  if(MERA==11){mask=0;for(const[cx,cy,cr]of[[0,.02,.2],[-.27,-.2,.115],[.26,-.23,.125],[-.25,.25,.13],[.29,.2,.105],[.0,-.36,.075],[.03,.38,.08],[-.4,.03,.06],[.4,-.03,.062],[.14,-.1,.04],[-.12,.16,.035]]){const dd=Math.hypot(u-cx,v-cy)/(cr*(.8+.45*fbm(x*.13+cx*9,y*.13+cy*9,4)));mask=Math.max(mask,Math.max(0,1-Math.pow(Math.min(dd,1.3),2.6)))}}
  const e=fbm(x*.07,y*.07,0), e2=fbm(x*.16+20,y*.16+7,8);
  const ridge=Math.exp(-Math.pow((u*.8-v*.6+.16+.05*Math.sin(y*.3))/.085,2))*Math.exp(-Math.pow((u*.6+v*.8+.02)/.34,2));
  const ridge2=Math.exp(-Math.pow((u*.3+v*.95-.2)/.06,2))*Math.exp(-Math.pow((u-.12)/.2,2));
  let h=(.9+e*3.6+e2*1.4)*mask+ridge*5.4*mask+ridge2*3.2*mask+(mask>0.02?1.25:0)-.35;
  if(MERA==11){const vol=Math.exp(-Math.pow(Math.hypot(u+.05,v+.03)/.06,2));h=(.7+e*1.6+e2*.8)*mask+vol*6.5+Math.exp(-Math.pow(Math.hypot(u+.25,v-.25)/.04,2))*3+(mask>0.05?1.3:0)-.3;if(mask<=.05)h=0} if(edge>.95||mask<=.02)h=0;
  hgt[I(x,y)]=Math.max(0,Math.min(10,Math.round(h))); wet[I(x,y)]=fbm(x*.06+9,y*.06+3,5)+(u*-.3)}
const NB=[[1,0],[-1,0],[0,1],[0,-1]];
// distance to the sea, for rivers and coasts
function bfs(src,pass){const d=new Array(N*N).fill(1e9),q=[];for(const s of src){d[s]=0;q.push(s)}for(let k=0;k<q.length;k++){const c=q[k],x=c%N,y=(c/N)|0;for(const[dx,dy]of NB){const X=x+dx,Y=y+dy;if(!inb(X,Y))continue;const j=I(X,Y);if(d[j]<1e9||!pass(j))continue;d[j]=d[c]+1;q.push(j)}}return d}
let seaT=[];for(let i=0;i<N*N;i++)if(hgt[i]<=SEA)seaT.push(i);
const dSea=bfs(seaT,()=>true);
// rivers: start high and wet, always step to lower or equal ground, carve where the land would block them
const river=new Array(N*N).fill(0);
function runRiver(sx,sy){let x=sx,y=sy,guard=0;const seen=new Set();while(guard++<400){const i=I(x,y);if(hgt[i]<=SEA)break;if(river[i]&&guard>1){river[i]=2;break}river[i]=Math.max(river[i],1);seen.add(i);
  let best=null,bs=1e9;for(const[dx,dy]of NB){const X=x+dx,Y=y+dy;if(!inb(X,Y))continue;const j=I(X,Y);if(seen.has(j))continue;const sc=hgt[j]*3+dSea[j]*.9+hash(X,Y,11)*1.4;if(sc<bs){bs=sc;best=[X,Y]}}
  if(!best)break;const j=I(best[0],best[1]);if(hgt[j]>hgt[i])hgt[j]=hgt[i];x=best[0];y=best[1]}}
{const cand=[];for(let y=4;y<N-4;y++)for(let x=4;x<N-4;x++){const i=I(x,y);if(hgt[i]>=5&&hgt[i]<=8)cand.push([hash(x,y,21)+dSea[i]*.05,x,y])}cand.sort((a,b)=>b[0]-a[0]);
 const picked=[];for(const c of cand){if(picked.length>=5)break;if(picked.every(p=>Math.hypot(p[1]-c[1],p[2]-c[2])>11)){picked.push(c);runRiver(c[1],c[2])}}}
seaT=[];for(let i=0;i<N*N;i++)if(hgt[i]<=SEA)seaT.push(i);
const dRiv=bfs([...river.keys()].filter(i=>river[i]),i=>hgt[i]>SEA), dSea2=bfs(seaT,()=>true);
// ---------- people: where they settle, by era ----------
const E={1:{cap:1.2,vil:0,vr:0,clear:1,fields:0},2:{cap:2.2,vil:2,vr:1.2,clear:2,fields:2},3:{cap:3.2,vil:3,vr:1.4,clear:3,fields:4},4:{cap:2.4,vil:5,vr:1.1,clear:2,fields:2},
 5:{cap:3.4,vil:4,vr:1.6,clear:3,fields:4},6:{cap:4.2,vil:6,vr:1.8,clear:4,fields:5},7:{cap:4.2,vil:7,vr:1.7,clear:3,fields:4},8:{cap:6.2,vil:8,vr:2.6,clear:5,fields:6}}[ERA];if(MERA==11)Object.assign(E,{cap:2.0,vil:7,vr:1.3,clear:2,fields:1});
const flat=(x,y)=>{let s=0;for(const[dx,dy]of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]]){if(!inb(x+dx,y+dy))return 9;s+=Math.abs(hgt[I(x+dx,y+dy)]-hgt[I(x,y)])}return s};
const sites=[];for(let y=5;y<N-5;y++)for(let x=5;x<N-5;x++){const i=I(x,y);if(hgt[i]<2||hgt[i]>4||river[i])continue;const sc=-dRiv[i]*(MERA==11?.02:1.6)+(MERA==11?hash(x,y,33)*3:0)-flat(x,y)*.8-Math.abs(hgt[i]-2)*.7-Math.abs(dSea2[i]-7)*.12+hash(x,y,31)*.5;if(dRiv[i]<=3||dSea2[i]<=2)sites.push([sc-(dRiv[i]>3&&MERA!=11?2.5:0),x,y])}
sites.sort((a,b)=>b[0]-a[0]); const towns=[];
for(const s of sites){if(towns.length>8)break;if(towns.every(t=>Math.hypot(t.x-s[1],t.y-s[2])>(towns.length?(MERA==11?7:8.5):0)))towns.push({x:s[1],y:s[2]})}
towns.forEach((t,k)=>{t.r=k==0?E.cap:E.vr;t.on=k==0||k<=E.vil;t.cap=k==0}); const live=towns.filter(t=>t.on); const CAP=towns[0];
const urban=new Array(N*N).fill(-1),field=new Array(N*N).fill(0),cleared=new Array(N*N).fill(0);
live.forEach((t,k)=>{const R=Math.ceil(t.r+E.fields+E.clear+1);for(let dy=-R;dy<=R;dy++)for(let dx=-R;dx<=R;dx++){const x=t.x+dx,y=t.y+dy;if(!inb(x,y))continue;const i=I(x,y);if(hgt[i]<=SEA)continue;const d=Math.hypot(dx,dy)+hash(x,y,41)*.9-.45;
  if(d<=t.r&&!river[i]&&hgt[i]<=5&&Math.abs(hgt[i]-hgt[I(t.x,t.y)])<=1)urban[i]=k;
  else if(d<=t.r+(t.cap?E.fields:E.fields*.6)&&!river[i]&&hgt[i]<=3&&Math.abs(hgt[i]-hgt[I(t.x,t.y)])<=1&&dRiv[i]<=4&&E.fields)field[i]=1+((x*3+y*5+((x>>2)+(y>>2))*7)%3);
  if(d<=t.r+E.fields+E.clear)cleared[i]=1}});
// roads: cheapest walk between towns; flat ground is cheap, a step is dear, water needs a bridge
const road=new Array(N*N).fill(0),paths=[];
function route(a,b,k=1){const d=new Float32Array(N*N).fill(1e9),prev=new Int32Array(N*N).fill(-1),open=[[0,I(a.x,a.y)]];d[I(a.x,a.y)]=0;const goal=I(b.x,b.y);
  while(open.length){let m=0;for(let q=1;q<open.length;q++)if(open[q][0]<open[m][0])m=q;const[c,i]=open.splice(m,1)[0];if(i==goal)break;if(c>d[i])continue;const x=i%N,y=(i/N)|0;
   for(const[dx,dy]of NB){const X=x+dx,Y=y+dy;if(!inb(X,Y))continue;const j=I(X,Y);if(hgt[j]<=SEA)continue;const st=Math.abs(hgt[j]-hgt[i]);if(st>1)continue;const cst=1+st*4+(river[j]?7:0)+(hgt[j]>=6?5:0)-(road[j]?.65:0)+hash(X,Y,51)*.3;if(c+cst<d[j]){d[j]=c+cst;prev[j]=i;open.push([d[j],j])}}}
  if(prev[goal]<0)return;const p=[];for(let i=goal;i>=0;i=prev[i]){p.push(i);road[i]=Math.max(road[i],k)}paths.push({p,k})}
if(ERA>=2)live.slice(1).forEach(t=>{let best=CAP,bd=1e9;for(const o of live){if(o===t)continue;const dd=Math.hypot(o.x-t.x,o.y-t.y)+(o.cap?-6:0);if(dd<bd&&live.indexOf(o)<live.indexOf(t)){bd=dd;best=o}}route(t,best,1)});
if(ERA==8&&live.length>3){route(live[1],live[live.length-1],2);route(live[2],live[3],2)}
const landT=[];for(let i=0;i<N*N;i++)if(hgt[i]>SEA)landT.push(i);const dLand=bfs(landT,()=>true);
// ---------- colours ----------
const C=h=>new THREE.Color(RW?harmonize(h):h);
const P={deep:C(0x154a98),sea:C(0x2478cf),shal:C(0x58bfe4),sand:C(0xf2cd72),grass:C(0x5fb848),grass2:C(0x55ad41),wood:C(0x3f9a52),hill:C(0x86a646),rock:C(0xa5876c),mount:C(0x8a7f8e),snow:C(0xf6f8ff),dry:C(0xe6b566),
 earth:C(0xb5713f),earth2:C(0x8f5632),stone:C(0x857a8c),f1:C(0xe2bb3c),f2:C(0x9fd24f),f3:C(0xcf9440),town:[0,0xd8c08a,0xdcb880,0xd9b77c,0xe0c592,0xe6d2a4,0xe2dccb,0xcfc9b8,0xc9ccd4].map(C),river:C(0x3d9be0)};
let BT='grass';function biome(x,y){const i=I(x,y),h=hgt[i],w=wet[i];BT='grass';if(urban[i]>=0){BT=ERA>=5?'pave':'dirt';return P.town[ERA]}if(field[i]){BT='straw';return [P.f1,P.f2,P.f3][field[i]-1]}
  if(h>=9){BT='snow';return P.snow}if(h>=7){BT='stone';return P.mount}if(h>=6){BT='stone';return P.rock}if(h==2&&dSea2[i]<=1){BT='sand';return P.sand}if(w<.28&&h<=4){BT='grass';return P.dry}if(h>=5)return P.hill;return ((x+y)%2?P.grass:P.grass2).clone().lerp(C(0x2f8f3c),Math.max(0,Math.min(.5,(w-.4)*1.6)))}
// ---------- build the land ----------
const boxG=new THREE.BoxGeometry(1,1,1); const M4=new THREE.Matrix4(),Qt=new THREE.Quaternion(),V3=(x,y,z)=>new THREE.Vector3(x,y,z);
function inst(geo,mat,items,cast=true,recv=true){const m=new THREE.InstancedMesh(geo,mat,items.length);items.forEach((it,k)=>{M4.compose(V3(...it.p),it.q||Qt.identity(),V3(...(it.s||[1,1,1])));m.setMatrixAt(k,M4);if(it.c)m.setColorAt(k,it.c)});m.castShadow=cast;m.receiveShadow=recv;scene.add(m);return m}
const top=[],body=[],water=[],bed=[]; const TY=i=>hgt[i]*STEP; const wx=x=>x-N/2+.5;
for(let y=0;y<N;y++)for(let x=0;x<N;x++){const i=I(x,y),h=hgt[i];
  if(h<=SEA){const dp=Math.min(dLand[i],4);const c=P.shal.clone().lerp(P.sea,Math.min(dp/2.2,1)).lerp(P.deep,Math.max(0,(dp-2.2)/2));water.push({p:[wx(x),SEA*STEP-.06,wx(y)],s:[1,.1,1],c});bed.push({p:[wx(x),(SEA*STEP-.11-1.6)/2-.4,wx(y)],s:[1,SEA*STEP-.11+1.6-.0,1],c:P.deep.clone().multiplyScalar(.55)});continue}
  const ty=TY(i), rv=river[i]?0.2:0; const tc=biome(x,y).clone(); const j=.94+hash(x,y,61)*.12; tc.multiplyScalar(j);
  top.push({p:[wx(x),ty-.07-rv,wx(y)],s:[1,.14,1],c:river[i]?P.sand.clone().multiplyScalar(.8):tc,t:river[i]?'sand':BT});
  const bh=ty-.14-rv+2; body.push({p:[wx(x),(ty-.14-rv)-bh/2,wx(y)],s:[1,bh,1],c:(h>=6?P.stone:(h%2?P.earth:P.earth2)).clone().multiplyScalar(.92+hash(x,y,62)*.14),t:h>=6?'stone':'strata'});
  if(river[i])water.push({p:[wx(x),ty-.1,wx(y)],s:[1,.1,1],c:P.river.clone().lerp(P.shal,.25)})}
const flatM=o=>new THREE.MeshStandardMaterial({roughness:.9,metalness:0,...o});
const C2={grass:0xdcf0a0,straw:0xe8dcb0,sand:0xf2e6cc,dirt:0xe2d2b8,pave:0xd6d2ca,snow:0xdfe8ff,stone:0xd8cec0,strata:0xf0d8b8,leaf:0xf2ff9a,needle:0xe6f5a0,bark:0x9a8a78,plank:0xb0a090};
const WM=(t,o={})=>richMat(0xffffff,{type:t,world:1,c2:C2[t],...o});
const byT=(items,cast,recv)=>{const g={};for(const it of items)(g[it.t]=g[it.t]||[]).push(it);for(const t in g)inst(boxG,WM(t),g[t],cast,recv)};
if(RW){byT(top,false,true);byT(body,true,true)}else{inst(boxG,flatM({}),top,false,true); inst(boxG,flatM({}),body,true,true)} inst(boxG,flatM({color:0xffffff}),bed,false,false);
if(RW){const wm=richMat(0xffffff,{type:'water',world:1,c2:0xe8f6ff});wm.transparent=true;wm.opacity=.92;inst(boxG,wm,water,false,true)}else inst(boxG,new THREE.MeshPhysicalMaterial({roughness:.12,metalness:0,transparent:true,opacity:.9,clearcoat:.6}),water,false,true);
const rnd=mulberry(SEED*977+ERA*0); const rndE=mulberry(SEED*31+ERA*7919);
// peaks, trees, furrows
{const peaks=[],snow=[],can=[],con=[],trunk=[],fur=[];const q45=new THREE.Quaternion().setFromAxisAngle(V3(0,1,0),Math.PI/4);
 const forestT={1:.44,2:.47,3:.5,4:.5,5:.52,6:.53,7:.48,8:.57}[ERA];
 for(let y=0;y<N;y++)for(let x=0;x<N;x++){const i=I(x,y),h=hgt[i];if(h<=SEA)continue;const ty=TY(i);
  if(h>=7&&hash(x,y,70)<.55){const ph=.7+hash(x,y,71)*.9+(h-7)*.35;peaks.push({p:[wx(x),ty+ph/2,wx(y)],s:[1.25,ph,1.25],q:q45,c:(h>=9?P.snow:P.mount).clone().multiplyScalar(.9+hash(x,y,72)*.15)});if(h>=8)snow.push({p:[wx(x),ty+ph*.79,wx(y)],s:[.54,ph*.44,.54],q:q45,c:P.snow})}
  if(field[i]){for(let k=0;k<3;k++)fur.push({p:[wx(x)+(field[i]%2?-.3+k*.3:0),ty+.012,wx(y)+(field[i]%2?0:-.3+k*.3)],s:field[i]%2?[.1,.03,.92]:[.92,.03,.1],c:biome(x,y).clone().multiplyScalar(.82)});continue}
  if(urban[i]>=0||river[i]||road[i]||h>=7)continue;
  const forest=wet[i]>forestT&&h<=6&&!(cleared[i]&&hash(x,y,73)<.85)&&!(h==2&&dSea2[i]<=1);const lone=hash(x,y,74)<(wet[i]<.28?.02:.07);
  const n=forest?2+Math.floor(hash(x,y,75)*2.2):(lone?1:0);
  for(let k=0;k<n;k++){const ox=(hash(x,y,80+k)-.5)*.7,oz=(hash(x,y,90+k)-.5)*.7,s=.75+hash(x,y,100+k)*.6;
   if(h>=4){con.push({p:[wx(x)+ox,ty+.26*s,wx(y)+oz],s:[.22*s,.52*s,.22*s],c:C(0x2f7f52).multiplyScalar(.85+hash(x,y,110+k)*.3)})}
   else{trunk.push({p:[wx(x)+ox,ty+.07*s,wx(y)+oz],s:[.05*s,.14*s,.05*s],c:C(0x7a4e2c)});can.push({p:[wx(x)+ox,ty+.26*s,wx(y)+oz],s:[.2*s,.2*s,.2*s],c:(wet[i]<.28?C(0x8fb548):C(0x3fa456)).multiplyScalar(.85+hash(x,y,110+k)*.3)})}}}
 if(RW){const pk=()=>{const g=new THREE.ConeGeometry(.74,1,40,14),p=g.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i),a=Math.atan2(z,x),t=y+.5;const k=1+.16*Math.sin(a*4+1)*(1-t)+.1*Math.sin(a*7+t*9+2)+.07*Math.sin(a*13+t*17);const cv=1-.22*Math.sin(Math.PI*t);p.setXYZ(i,x*k*cv,y,z*k*cv)}g.computeVertexNormals();return g};
  inst(pk(),richMat(0xffffff,{type:'stone',c2:C2.stone,scale:.6,bump:2.5}),peaks);if(snow.length)inst(pk(),richMat(0xffffff,{type:'snow',c2:C2.snow}),snow,false);
  if(can.length){const more=[];for(const t of can){const[x,y,z]=t.p,s=t.s[0],hh=hash(Math.round(x*31),Math.round(z*17),300);more.push({p:[x+s*.55*Math.cos(hh*6.28),y+s*.35,z+s*.55*Math.sin(hh*6.28)],s:[s*.68,s*.62,s*.68],c:t.c.clone().multiplyScalar(1.06)},{p:[x-s*.5*Math.cos(hh*6.28+.8),y-s*.1,z-s*.5*Math.sin(hh*6.28+.8)],s:[s*.72,s*.6,s*.72],c:t.c.clone().multiplyScalar(.95)});t.s=[s*1.05,s*.92,s*1.05]}
   const lm=richMat(0xffffff,{type:'leaf',vc:1,c2:C2.leaf});inst(vgrad(rblob(1,1.3,.09),.74,1.28),lm,can);inst(vgrad(rblob(1,4.1,.09),.74,1.28),lm,more);
   trunk.forEach(t=>{t.s=[t.s[0]*.75,t.s[1]*1.5,t.s[2]*.75];t.p[1]+=t.s[1]*.12});inst(new THREE.CylinderGeometry(.42,.6,1,12),richMat(0xffffff,{type:'bark',c2:C2.bark}),trunk)}
  if(con.length){const P2=[];for(let i=0;i<=40;i++){const t=i/40;P2.push(new THREE.Vector2(Math.max(0,1.05*(1-t)*(1+.22*(1-((t*3.2)%1))*(t<.94?1:0))+(t<.03?-.5*(1-t/.03):0)),t-.5))}inst(vgrad(new THREE.LatheGeometry(P2,28),.68,1.25),richMat(0xffffff,{type:'needle',vc:1,c2:C2.needle}),con)}
  if(fur.length)inst(boxG,WM('dirt'),fur,false)}
 else{inst(new THREE.ConeGeometry(.7071,1,4),flatM({flatShading:true}),peaks);if(snow.length)inst(new THREE.ConeGeometry(.7071,1,4),flatM({flatShading:true}),snow,false);
 if(can.length){inst(new THREE.IcosahedronGeometry(1,1),flatM({flatShading:true}),can);inst(boxG,flatM({}),trunk)} if(con.length)inst(new THREE.ConeGeometry(1,1,7),flatM({flatShading:true}),con); if(fur.length)inst(boxG,flatM({}),fur,false)}}
// roads and bridges
{const seg=[],ties=[],deck=[],dots=[];const RC=[0,0,0xc9a66a,0xc9a66a,0xd4b074,0xe9dfc4,0xf0eadb,0xb9b2a4,0x4b5060].map(C),RW=[0,0,.14,.16,.14,.2,.22,.18,.24][ERA];
 for(const {p,k} of paths){for(let n=0;n<p.length;n++){const i=p[n],x=i%N,y=(i/N)|0,ty=TY(i);const nb=[p[n-1],p[n+1]].filter(v=>v!==undefined);
   const col=k==2?C(0x3a3d48):RC[ERA],wd=k==2?.1:RW;
   for(const j of nb){const dx=(j%N)-x,dy=((j/N)|0)-y;const br=river[i];
     (br?deck:seg).push({p:[wx(x)+dx*.25,ty+(br?.04:.012),wx(y)+dy*.25],s:dx?[.5,br?.07:.03,wd+(br?.1:0)]:[wd+(br?.1:0),br?.07:.03,.5],c:br?C(ERA<5?0x9a6a40:ERA==8?0x9aa3b2:0xd9d2c0):col});
     if(k==2&&!br)ties.push({p:[wx(x)+dx*.25,ty+.03,wx(y)+dy*.25],s:dx?[.06,.02,.24]:[.24,.02,.06],c:C(0x8a8f9c)})}
   seg.push({p:[wx(x),ty+(river[i]?.04:.012),wx(y)],s:[wd,.03,wd],c:river[i]?C(0x9a6a40):col});
   if(k==1&&hash(x,y,120)<.3&&!river[i])dots.push({p:[wx(x)+(hash(x,y,121)-.5)*.1,ty+.07,wx(y)+(hash(x,y,122)-.5)*.1],s:[.045,.045,.045],c:C(0xfffbe8)})}}
 if(seg.length)inst(boxG,RW?WM(ERA>=5?'pave':'dirt'):flatM({}),seg,false);if(deck.length)inst(boxG,RW?WM(ERA<5?'plank':'course',{c2:C2.plank}):flatM({}),deck);if(ties.length)inst(boxG,flatM({}),ties,false);if(dots.length)inst(new THREE.SphereGeometry(1,10,8),new THREE.MeshBasicMaterial(),dots,false,false)}
// buildings
function put(kind,x,y,o={}){const era=o.era||MERA;const g=buildModel(kind,era,rndE);const i=I(Math.round(x),Math.round(y));g.position.set(wx(x),o.y??TY(i),wx(y));g.rotation.y=o.rot||0;g.scale.setScalar(o.s||1);scene.add(g);return g}
const used=new Set(); const markers=[];
live.forEach((t,k)=>{const tiles=[];for(let i=0;i<N*N;i++)if(urban[i]==k)tiles.push(i);if(!tiles.length)return;
 const dC=i=>Math.hypot(i%N-t.x,((i/N)|0)-t.y); const free=i=>!used.has(i)&&!road[i];
 const pick=(score)=>{let b=-1,bs=-1e9;for(const i of tiles){if(!free(i))continue;const s=score(i);if(s>bs){bs=s;b=i}}if(b>=0)used.add(b);return b};
 const big=t.cap&&ERA>=3; const tscale=t.cap?(ERA>=3?1.25:1):.7;
 const ti=pick(i=>hgt[i]*2-dC(i)*.9); if(ti>=0){put('temple',ti%N,(ti/N)|0,{s:tscale,rot:0});markers.push({kind:'temple',i:ti});if(big)for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]]){const j=I(ti%N+dx,((ti/N)|0)+dy);if(Math.abs(hgt[j]-hgt[ti])<1)used.add(j)}}
 const want=t.cap?['market','court','school','granary','garden']:(ERA>=5?['granary','market']:ERA>=2?['granary']:[]);
 for(const kd of want){const i=pick(i=>-(Math.abs(dC(i)-(kd=='granary'?t.r*.8:kd=='garden'?t.r*.6:1.2)))+hash(i%N,(i/N)|0,130)*.6+(kd=='garden'?-dRiv[i]*.3:0));if(i>=0){put(kd,i%N,(i/N)|0,{rot:Math.floor(rndE()*4)*Math.PI/2*0});markers.push({kind:kd,i})}}
 if(MERA==10){for(let q=0;q<2;q++){const i=pick(i=>-Math.abs(dC(i)-t.r*1.3)+hash(i%N,(i/N)|0,140+q));if(i>=0)put('flock',i%N,(i/N)|0)}}
 if(ERA>=2&&ERA<=5){const i=pick(i=>-dC(i)+hash(i%N,(i/N)|0,131));if(i>=0)put('well',i%N,(i/N)|0)}
 const dens={1:.9,2:.55,3:.7,4:.6,5:.7,6:.78,7:.8,8:.86}[ERA];
 for(const i of tiles){if(used.has(i))continue;const x=i%N,y=(i/N)|0;const core=ERA==8&&t.cap&&dC(i)<t.r*.42;
  if(core&&!road[i]){put('tower',x,y);continue}
  if(ERA==8&&t.cap&&dC(i)>t.r*.8&&hash(x,y,133)<.16&&!road[i]){put('factory',x,y,{rot:hash(x,y,134)<.5?0:Math.PI/2});continue}
  const slots=ERA==1?[[.0,.0]]:[[-.24,-.24],[.24,-.24],[-.24,.24],[.24,.24]];
  for(const[sx,sz]of slots){if(road[i]){const hz=paths.some(({p})=>{const n=p.indexOf(i);return n>=0&&[p[n-1],p[n+1]].some(j=>j!==undefined&&((j/N)|0)==y)});if(hz?Math.abs(sz)<.3&&false:false)continue; if(hash(x+sx*10,y+sz*10,135)<.45)continue}
   if(rndE()>dens)continue;put('house',x+sx+(rndE()-.5)*.08,y+sz+(rndE()-.5)*.08,{y:TY(i),rot:Math.floor(rndE()*2)*Math.PI/2,s:(.86+rndE()*.2)*(ERA<=NEWMAX?.56:1),era:MERA})}}
 // walls round the capital in the walled ages
 if(t.cap&&[3,5,6,7].includes(ERA))for(const i of tiles){const x=i%N,y=(i/N)|0;for(const[dx,dy]of NB){const j=I(x+dx,y+dy);if(urban[j]==k||hgt[j]<=SEA)continue;if(road[i]&&road[j]){put('gate',x+dx*.5-dy*.3,y+dy*.5-dx*.3,{y:TY(i)});put('gate',x+dx*.5+dy*.3,y+dy*.5+dx*.3,{y:TY(i)});continue}put('wall',x+dx*.5,y+dy*.5,{y:TY(i),rot:dx?Math.PI/2:0})}}
 // docks where the town meets water
 if(ERA>=3||MERA==11){let nd=0;for(const i of tiles){if(nd>=(t.cap?3:1))break;const x=i%N,y=(i/N)|0;for(const[dx,dy]of NB){const j=I(x+dx,y+dy);if((river[j]||hgt[j]<=SEA)&&hash(x,y,140)<.5){put('dock',x+dx*.62,y+dy*.62,{y:(hgt[j]<=SEA?SEA*STEP:TY(j))-.04,rot:dx?Math.PI/2:0});nd++;break}}}}
 // herds near the camps
 if(ERA==4||ERA==2)for(let n=0;n<(t.cap?3:2);n++){const a=rndE()*6.283,d=t.r+1+rndE()*2,x=Math.round(t.x+Math.cos(a)*d),y=Math.round(t.y+Math.sin(a)*d);if(inb(x,y)&&hgt[I(x,y)]>SEA&&!river[I(x,y)]&&hgt[I(x,y)]<5)put('flock',x,y)}
});
if(ERA==6||ERA==8){ // water or power brought from the hills
 let best=-1,bd=1e9;for(let i=0;i<N*N;i++)if(hgt[i]>=5&&hgt[i]<=6){const d=Math.hypot(i%N-CAP.x,((i/N)|0)-CAP.y);if(d<bd&&d>CAP.r+3){bd=d;best=i}}
 if(best>=0){let x=best%N,y=(best/N)|0,g=0;while((x!=CAP.x||y!=CAP.y)&&g++<80){const i=I(x,y);if(urban[i]<0&&!river[i]&&hgt[i]>SEA&&(ERA==6||g%2==0))put(ERA==6?'aqueduct':'pylon',x,y,{rot:Math.abs(CAP.x-x)>=Math.abs(CAP.y-y)?0:Math.PI/2});if(Math.abs(CAP.x-x)>=Math.abs(CAP.y-y))x+=Math.sign(CAP.x-x);else y+=Math.sign(CAP.y-y)}}}
if(RW&&MERA==11){let np=0,nc=0;for(let y=2;y<N-2&&np<140;y++)for(let x=2;x<N-2;x++){const i=I(x,y);if(hgt[i]==2&&dSea2[i]<=1&&urban[i]<0&&!river[i]&&hash(x,y,210)<.3){const g=buildProp('palm',1.5+hash(x,y,211));g.position.set(wx(x)+(hash(x,y,212)-.5)*.5,TY(i),wx(y)+(hash(x,y,213)-.5)*.5);g.rotation.y=hash(x,y,214)*6.28;scene.add(g);np++}}
 for(let y=2;y<N-2;y++)for(let x=2;x<N-2;x++){const i=I(x,y);if(hgt[i]>SEA)continue;const near=live.some(t=>Math.hypot(t.x-x,t.y-y)<t.r+3.5);const pr=dLand[i]<=2&&near?.16:dLand[i]>=3&&dLand[i]<=5?.012:0;if(hash(x,y,220)<pr&&nc<40){const g=buildProp(hash(x,y,221)<.45?'canoe':'canoe1');g.position.set(wx(x),SEA*STEP-.02,wx(y));g.rotation.y=hash(x,y,222)*6.28;g.scale.setScalar(1.7);scene.add(g);nc++}}}
// ---------- light and camera ----------
scene.add(new THREE.HemisphereLight(0xcfe4ff,0xa87a50,.95));
const sun=new THREE.DirectionalLight(0xfff0d0,3.5); const tgt=VIEW=='region'?V3(0,1.2,0):VIEW=='watch'?(()=>{let sx=0,sy=0,sh=0;for(const t of towns){sx+=wx(t.x);sy+=wx(t.y);sh+=TY(I(t.x,t.y))}const n=towns.length;return V3(sx/n,sh/n,sy/n)})():V3(wx(CAP.x),TY(I(CAP.x,CAP.y)),wx(CAP.y));
const S={region:N*.52,valley:9.5,street:3.4,watch:14}[VIEW];
sun.position.copy(tgt).add(V3(-.95,1.0,.3).multiplyScalar(80)); sun.target.position.copy(tgt); scene.add(sun,sun.target);
sun.castShadow=true; sun.shadow.mapSize.set(4096,4096); const sc=sun.shadow.camera; const SS=VIEW=='region'?N*.78:S*2.6; sc.left=-SS;sc.right=SS;sc.top=SS;sc.bottom=-SS;sc.near=1;sc.far=220;sun.shadow.bias=-.0008;sun.shadow.normalBias=.02;sun.shadow.radius=VIEW=='region'?2:4;
const asp=W/H; const cam=new THREE.OrthographicCamera(-S*asp,S*asp,S,-S,1,400); cam.position.copy(tgt).add(V3(1,.86,1).multiplyScalar(120)); cam.lookAt(tgt);
if(!RW)renderer.render(scene,cam);
const proj=markers.filter(m=>urban[m.i]==0).map(m=>{const v=V3(wx(m.i%N),TY(m.i)+.9,wx((m.i/N)|0)).project(cam);return{kind:m.kind,x:(v.x+1)/2*W,y:(1-v.y)/2*H}});
cam.updateMatrixWorld();cam.updateProjectionMatrix();const TP=towns.map(t=>{const i=I(t.x,t.y);const v=V3(wx(t.x),TY(i)+.5,wx(t.y)).project(cam);return{x:(v.x+1)/2*W,y:(1-v.y)/2*H,on:!!t.on,cap:!!t.cap}});window.__info=JSON.stringify({proj,towns:TP});
if(RW){const {renderRich}=await import('/post.js');window.__png=renderRich(renderer,scene,cam,W,H,{radius:VIEW=='region'?.6:.22,scale:1.3})}else window.__png=renderer.domElement.toDataURL('image/png'); document.title='done';
