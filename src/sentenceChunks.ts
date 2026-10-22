import type {SentenceChunk} from './verbNouns';
export const nounClauseSlots=['Main-clause subject','Embedded subject (genitive)','Embedded action + agreement + accusative','Main predicate (finite verb supplied)'] as const;
export const chunkSlots=['Time context + time-clause subject','Time-clause action','Main-clause subject','Main-clause action (finite verb supplied)'] as const;
export function parseChunkAnswer(value:string):Array<string|null>{
 try {const v:unknown=JSON.parse(value);if(Array.isArray(v)&&v.length===4&&v.every(x=>x===null||typeof x==='string'))return v;}catch{}
 return [null,null,null,null];
}
export function completeChunks(ids:unknown,bank:SentenceChunk[]):ids is string[]{
 return Array.isArray(ids)&&ids.length===4&&new Set(ids).size===4&&ids.every(id=>typeof id==='string'&&bank.some(c=>c.id===id));
}
export const assembledSentence=(ids:string[],bank:SentenceChunk[])=>ids.map(id=>bank.find(c=>c.id===id)!.text).join(' ')+'.';
export const chunksCorrect=(selected:string[],expected:string[])=>selected.every((id,i)=>id===expected[i]);
/** Validate saved snapshots without depending on the current question bank. */
export function validChunkSnapshot(a:{chunks?:SentenceChunk[];selectedChunkIds?:string[];expectedChunkIds?:string[];answer:string;expected:string;correct:boolean;manual:boolean}):boolean{
 const bank=a.chunks;
 return Array.isArray(bank)&&bank.length===6&&bank.every(c=>c&&typeof c.id==='string'&&!!c.id.trim()&&typeof c.text==='string'&&!!c.text.trim())&&new Set(bank.map(c=>c.id)).size===6&&
 completeChunks(a.selectedChunkIds,bank)&&completeChunks(a.expectedChunkIds,bank)&&a.answer===assembledSentence(a.selectedChunkIds,bank)&&a.expected===assembledSentence(a.expectedChunkIds,bank)&&
 (a.manual?a.correct===true:a.correct===chunksCorrect(a.selectedChunkIds,a.expectedChunkIds));
}
