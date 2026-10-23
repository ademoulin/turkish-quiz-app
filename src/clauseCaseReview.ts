import type {VerbNounQuestion} from './verbNouns';
import {additionalClauseForms} from './clauseCaseCompletionContent';
// Newly authored alternatives for the existing 12C models, not textbook questions.
// Same nominalizer/agreement in every form option; only the outer case changes.
const forms:Record<string,[string,string,string]>={
 'vn12c-01':['çalışmana','çalışmandan','çalışmanı'],
 'vn12c-02':['gelmesine','gelmesinden','gelmesini'],
 'vn12c-03':['başlamamızdan','başlamamıza','başlamamızı'],
 'vn12c-04':['konuşmalarından','konuşmalarına','konuşmalarını'],
 'vn12c-07':['yürüdüğünden','yürüdüğüne','yürüdüğünü'],
 'vn12c-08':['yüzdüğümüzden','yüzdüğümüze','yüzdüğümüzü'],
 'vn12c-11':['kalacaklarından','kalacaklarına','kalacaklarını'],
 'vn12c-12':['geleceğinizden','geleceğinize','geleceğinizi'],
};
const innerObjects:Record<string,string>={'vn12c-05':'sınavı','vn12c-06':'raporu','vn12c-09':'sınavı','vn12c-10':'işi'};
export function earlierCaseClause(q:VerbNounQuestion):VerbNounQuestion{
 const unit=q.expected.match(/\[([^\]]+)\]/)![1];
 const choices=forms[q.exampleId];
 if(choices){
  const sentence=q.sentence.replace(new RegExp(choices[0]+'(?= )'),'___');
  return {...q,id:q.id+'-v2',sentence,prompt:'Choose the form that completes the sentence.',expected:choices[0],optionLanguage:'tr',
   options:choices.map((text,i)=>({id:i===0?'target':`other-${i}`,text}))};
 }
 const subject=unit.slice(0,unit.indexOf(' ')),inner=innerObjects[q.exampleId];
 const bracket=(part:string)=>q.sentence.replace(part,`[${part}]`);
 const expected=bracket(unit),predicate=q.sentence.slice(q.sentence.indexOf(unit)+unit.length+1,-1);
 return {...q,id:q.id+'-v2',prompt:`Which bracketed unit is the complement of ${predicate}?`,expected,optionLanguage:'tr',
  options:[{id:'target',text:expected},{id:'other-1',text:bracket(inner)},{id:'other-2',text:bracket(subject)}]};
}
const completions:Record<string,string[]>={...forms,
 'vn12c-05':['geçtiğime','geçtiğimden','geçtiğimi'],
 'vn12c-06':['bitirdiğinize','bitirdiğinizden','bitirdiğinizi'],
 'vn12c-09':['geçeceğime','geçeceğimden','geçeceğimi'],
 'vn12c-10':['bitireceğine','bitireceğinden','bitireceğini'],
 ...additionalClauseForms,
};
export function reviseCaseClause(q:VerbNounQuestion):VerbNounQuestion{
 const choices=completions[q.exampleId],expected=choices[0];
 return {...q,id:q.id+'-v3',sentence:q.sentence.replace(expected,'___'),prompt:'Choose the form that completes the sentence.',expected,optionLanguage:'tr',
  options:choices.map((text,i)=>({id:i===0?'target':`other-${i}`,text}))};
}
