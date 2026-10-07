const V='shopbill-v1',FILES=['./','./index.html','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(FILES.map(f=>c.add(f).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 e.respondWith((async()=>{const c=await caches.open(V);
  try{const ctl=new AbortController(),t=setTimeout(()=>ctl.abort(),4000),n=await fetch(r,{signal:ctl.signal,cache:'no-cache'});clearTimeout(t);if(n.ok)c.put(r,n.clone());return n}
  catch(x){return (await c.match(r,{ignoreSearch:true}))||(r.mode==='navigate'&&((await c.match('./index.html'))||(await c.match('./'))))||Response.error()}})())});
