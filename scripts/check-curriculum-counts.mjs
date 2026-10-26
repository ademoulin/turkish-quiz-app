// Guard against reintroducing brittle whole-curriculum numeric totals.
// Session limits, fixture sizes, and linguistic coverage constraints are not bank totals.
import {readFileSync,readdirSync} from 'node:fs';
import {join} from 'node:path';

const roots=['src','e2e','scripts'];
const patterns=[
  /(?:\.length|\.size)\s*,\s*\d{3,}\b/g,
  /\.length\s*(?:===|==|!==|!=)\s*\d{3,}\b/g,
  /(?:toHaveLength|toHaveCount)\(\s*\d{3,}\s*\)/g,
];
const violations=[];
for(const root of roots){
 for(const file of readdirSync(root)){
  if(!/\.(?:ts|tsx|mjs|js)$/.test(file)||file==='check-curriculum-counts.mjs')continue;
  const path=join(root,file),content=readFileSync(path,'utf8');
  for(const pattern of patterns){
   pattern.lastIndex=0;
   for(const match of content.matchAll(pattern)){
    const line=content.slice(0,match.index).split('\n').length;
    violations.push(path+':'+line+': '+match[0]);
   }
  }
 }
}
if(violations.length){console.error('Fixed whole-curriculum count assertions detected:\n'+violations.join('\n'));process.exitCode=1;}
else console.log('No fixed three-digit curriculum count assertions detected.');
