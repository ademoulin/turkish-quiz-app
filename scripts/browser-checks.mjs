import {execFileSync,spawnSync} from 'node:child_process';
import {appendFileSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

// Only known content-only changes get a narrower run. Shared/unknown code runs all.
const contentChecks={
 'src/lessonGuides.tsx':['e2e/grammar-numbering.spec.ts','e2e/lesson-interactions.spec.ts','e2e/verb-noun-lessons.spec.ts'],
 'src/clauseCaseFeedback.ts':['e2e/clause-case-choices.spec.ts','e2e/verb-noun-lessons.spec.ts'],
 'src/grammarMcRevisions.ts':['e2e/grammar-mc-revisions.spec.ts','e2e/grammar-progress-random.spec.ts'],
};
export function browserScope(paths,forceFull=false){
 const full={mode:'full',files:[]};
 if(forceFull||!paths.length||paths.some(p=>!existsSync(p)))return full;
 const tests=new Set();
 for(const path of paths){
  if(Object.hasOwn(contentChecks,path))for(const test of contentChecks[path])tests.add(test);
  else if(/^e2e\/[^/]+\.spec\.ts$/.test(path))tests.add(path);
  else if(path==='README.md'||/^docs\/.*\.md$/.test(path)||/^src\/[^/]+\.test\.ts$/.test(path))continue;
  else return full;
 }
 if(!tests.size)return {mode:'none',files:[]};
 tests.add('e2e/grammar-layout.spec.ts');
 return {mode:'targeted',files:[...tests].sort()};
}

if(process.argv[1]===fileURLToPath(import.meta.url)){
 let paths=process.argv.slice(2);
 if(!paths.length&&process.env.PR_BASE_SHA&&process.env.PR_HEAD_SHA){
  try{paths=execFileSync('git',['diff','--name-only','-z',process.env.PR_BASE_SHA,process.env.PR_HEAD_SHA],{encoding:'utf8'}).split('\0').filter(Boolean);}
  catch{paths=[];} // Missing diff information safely falls back to the full suite.
 }
 const scope=browserScope(paths,process.env.UI_FULL_BANK==='1');
 console.log(`Browser scope: ${scope.mode}${scope.files.length?' · '+scope.files.join(', '):''}`);
 if(process.env.GITHUB_OUTPUT)appendFileSync(process.env.GITHUB_OUTPUT,`mode=${scope.mode}\n`);
 if(scope.mode!=='none'){
  const result=spawnSync('npm',['run','test:e2e','--',...scope.files],{stdio:'inherit'});
  process.exit(result.status??1);
 }
}
