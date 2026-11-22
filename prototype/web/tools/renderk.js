const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const root=__dirname;const mime={'.js':'text/javascript','.html':'text/html'};
for(const job of process.argv.slice(2)){const [era,view,w,h,seed]=job.split(':');const p=await b.newPage({viewport:{width:+w,height:+h}});
 p.on('console',m=>{if(m.type()=='error')console.log('ERR',m.text())});p.on("pageerror",e=>{console.log("PAGEERR",e.message,(e.stack||"").slice(0,400));process.exit(3)});
 await p.route('http://s3d.local/**',r=>{const u=new URL(r.request().url());const f=path.join(root,u.pathname);if(fs.existsSync(f))r.fulfill({body:fs.readFileSync(f),contentType:mime[path.extname(f)]||'application/octet-stream'});else r.fulfill({status:404,body:''})});
 await p.goto(`http://s3d.local/${view=="kit"?"kit":"world"}.html?era=${era}&view=${view}&w=${w}&h=${h}&seed=${seed||7}&hd=${process.env.HD||0}${process.env.KINDS?'&kinds='+process.env.KINDS:''}`,{waitUntil:'commit',timeout:0});
 await p.waitForFunction(()=>document.title=='done',null,{timeout:900000});
 const d=await p.evaluate(()=>window.__png);fs.writeFileSync(path.join(root,`${process.env.OUT||''}world_${era}_${view}${view=='kit'&&seed?seed:''}${process.env.KINDS||''}.png`),Buffer.from(d.split(',')[1],'base64'));
 fs.writeFileSync(path.join(root,`world_${era}_${view}.json`),await p.evaluate(()=>window.__info));console.log('ok',job);await p.close()}
await b.close()})();
