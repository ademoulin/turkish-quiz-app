import React,{useState} from 'react';
import type {SentenceChunk} from './verbNouns';
import {chunkSlots,nounClauseSlots,nounCaseSlots,relativeSlots,parseChunkAnswer} from './sentenceChunks';
export function SentenceChunkBuilder({bank,value,onChange,disabled,nounClause=false,caseComplement=false,relativePhrase=false}:{bank:SentenceChunk[];value:string;onChange:(v:string)=>void;disabled:boolean;nounClause?:boolean;caseComplement?:boolean;relativePhrase?:boolean}){
 const [active,setActive]=useState(0),[history,setHistory]=useState<Array<{ids:Array<string|null>;active:number}>>([]);
 const ids=parseChunkAnswer(value);
 function place(id:string){if(disabled||ids.includes(id))return;const updated=[...ids];updated[active]=id;onChange(JSON.stringify(updated));setHistory(h=>[...h,{ids:[...ids],active}]);const empty=updated.findIndex(x=>x===null);if(empty>=0)setActive(empty);}
 function remove(slot:number){if(disabled)return;const updated=[...ids];updated[slot]=null;onChange(JSON.stringify(updated));setActive(slot);setHistory(h=>[...h,{ids:[...ids],active}]);}
 return <div>
 <p className="assembly-instruction">Guided frame: {relativePhrase?'relative modifier, head noun, main detail, supplied main predicate.':nounClause?'main subject, embedded subject, embedded action, main predicate.':'time clause first, then main clause.'} Select a slot and then a chunk. Other word orders can be grammatical; this exercise checks this frame.</p>
 <fieldset disabled={disabled}><legend>Sentence slots</legend>{(relativePhrase?relativeSlots:caseComplement?nounCaseSlots:nounClause?nounClauseSlots:chunkSlots).map((label,i)=><div key={label} className="chunk-slot"><button type="button" className="secondary" autoFocus={i===0} aria-pressed={active===i} onClick={()=>setActive(i)}>{i+1}. {label}: <span lang="tr">{bank.find(c=>c.id===ids[i])?.text||'Empty'}</span></button>{ids[i]&&<button type="button" className="text-button" aria-label={`Clear slot ${i+1}`} onClick={()=>remove(i)}>Clear</button>}</div>)}</fieldset>
 <fieldset disabled={disabled}><legend>Available chunks · two will be unused</legend><div className="chunk-bank">{bank.map(c=><button type="button" className="secondary" key={c.id} disabled={disabled||ids.includes(c.id)} onClick={()=>place(c.id)} lang="tr">{c.text}</button>)}</div></fieldset>
 <p aria-live="polite">{ids.filter(Boolean).length} of 4 slots filled. {disabled?'Answer checked.':`Choosing for slot ${active+1}.`}</p>
 <button type="button" className="text-button" disabled={disabled||!history.length} onClick={()=>{const previous=history[history.length-1];onChange(JSON.stringify(previous.ids));setActive(previous.active);setHistory(h=>h.slice(0,-1));}}>Undo last placement</button>
 <button type="button" className="text-button" disabled={disabled||!ids.some(Boolean)} onClick={()=>{onChange('');setActive(0);setHistory([]);}}>Reset sentence</button>
 </div>;
}
