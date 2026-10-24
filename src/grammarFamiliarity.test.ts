import {test} from 'node:test';
import assert from 'node:assert/strict';
import {grammarProgress,grammarFamiliarity} from './grammarProgress';
import {grammarItems,itemGroup,recordGrammarItem} from './grammarRegistry';
import {correctPilot,validatePilotImport,type PilotAttempt} from './casePilot';
const first=grammarItems.find(i=>i.kind==='typed')!;
const pool=grammarItems.filter(i=>i.kind==='typed'&&itemGroup(i)===itemGroup(first));
function history(count=10){return Array.from({length:count},(_,n)=>{
 const item=pool[n%5];if(item.kind!=='typed')throw Error('typed');
 const a=recordGrammarItem([],item,item.q.answer,'session-'+Math.floor(n/5),'')[0];
 return {...a,id:'check-'+n,time:`2026-10-${String(1+Math.floor(n/4)).padStart(2,'0')}T12:00:00Z`};
});}
function rating(a:PilotAttempt[]){return grammarFamiliarity(grammarProgress(a).concepts.find(c=>c.id===itemGroup(first))!);}
test('familiarity requires accuracy, varied questions and practice across days',()=>{
 assert.equal(rating([]).level,'new');assert.equal(rating(history(1)).level,'learning');
 assert.equal(rating(history(5)).level,'familiar');assert.equal(rating(history()).level,'well_known');
 const oneDay=history().map(a=>({...a,time:'2026-10-01T12:00:00Z'}));assert.equal(rating(oneDay).level,'learning');
 const repeated=history().map(a=>({...a,questionId:first.q.id,time:`2026-10-${String(Number(a.id.slice(6))+1).padStart(2,'0')}T12:00:00Z`}));assert.equal(rating(repeated).level,'learning');
 const weaker=history().map((a,n)=>({...a,correct:n>=2}));assert.equal(rating(weaker).level,'familiar');
 assert.equal(rating(history().map((a,n)=>({...a,correct:n>=3}))).level,'learning');
});
test('duplicates, manual corrections, retired results and backups cannot inflate familiarity',()=>{
 const a=history(),before=structuredClone(a);assert.equal(rating([...a,...a]).level,'well_known');
 const fixed=a.reduce((list,entry)=>correctPilot(list,entry.id),a.map(x=>({...x,correct:false})));
 assert.equal(rating(fixed).level,'learning');assert.equal(rating(fixed).stats!.recentCount,0);
 assert.equal(rating(a.map(x=>({...x,questionId:'retired-unknown'}))).level,'new');
 assert.equal(rating(validatePilotImport({version:1,pilotAttempts:a})).level,'well_known');
 assert.deepEqual(a,before);assert.equal(rating(validatePilotImport({version:1})).level,'new');
});
test('recognition cannot override available but unpractised production',()=>{
 const row=grammarProgress([]).concepts.find(c=>c.id===itemGroup(first))!;
 const strong=rating(history()).stats!;
 assert.equal(grammarFamiliarity({...row,attempts:10,modes:{...row.modes,recognition:strong}}).level,'learning');
 assert.equal(grammarFamiliarity({...row,attempts:10,modes:{recognition:strong}}).level,'well_known');
});
