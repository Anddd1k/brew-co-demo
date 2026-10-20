import assert from 'node:assert/strict';
const base=process.env.VERIFY_URL||'http://127.0.0.1:3101';
const response=await fetch(base);
assert.equal(response.status,200);
const html=await response.text();
assert.match(html,/CONCEPT/);
assert.match(html,/Brew/);
assert.match(html,/name="description"/);
assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
assert.equal(response.headers.get('x-content-type-options'),'nosniff');
assert.equal(response.headers.get('x-frame-options'),'DENY');
for(const [,href] of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)){
 const url=new URL(href,base);assert.equal(url.origin,new URL(base).origin,'No unverified external links');
 assert.ok(url.hash&&html.includes(`id="${url.hash.slice(1)}"`),`Invalid anchor ${href}`);
}
for(const path of ['/robots.txt','/icon.svg'])assert.equal((await fetch(new URL(path,base))).status,200);
assert.equal((await fetch(new URL('/not-a-page',base))).status,404);
console.log('PASS: Brew & Co. routes, anchors, metadata, demo label, headers and assets. Interactive bag verified separately in browser.');
