const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1400,height:1000}});
await p.goto('file://'+__dirname+'/assets.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
const items=JSON.parse(fs.readFileSync(__dirname+'/items.json'));
for(const [id] of items){const el=await p.$('#'+id);await el.screenshot({path:__dirname+'/png/'+id+'.png',omitBackground:true})}
await b.close();console.log('done')})();
