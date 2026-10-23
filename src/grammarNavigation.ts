/** Curriculum presentation only. These numbers are never storage or question IDs. */
export const grammarSections=[
 {number:'1',title:'Cases and noun endings'},
 {number:'2',title:'Possession and noun phrases'},
 {number:'3',title:'Verb nouns and noun clauses'},
 {number:'4',title:'Relative clauses and participles'},
 {number:'5',title:'Connecting actions and time'},
] as const;
export const sectionHeading=(section:typeof grammarSections[number])=>`${section.number}: ${section.title}`;
export const grammarActivities={
 cases:{number:'1.1',title:'Case Forms',section:'1'},
 'choose-case':{number:'1.2',title:'Choose the Case',section:'1'},
 possessives:{number:'2.1',title:'Possessive forms',section:'2'},
 phrases:{number:'2.2',title:'Build a noun phrase',section:'2'},
 'possessed-cases':{number:'2.3',title:'Possessive forms with case endings',section:'2'},
} as const;
export const grammarLessonCatalog={
 activity:{number:'3.1',title:'Actions as nouns',section:'3'},
 cases:{number:'3.2',title:'Action nouns with case endings',section:'3'},
 action_forms:{number:'3.3',title:'Choose -mak or -ma',section:'3'},
 subjects:{number:'3.4',title:'The action has its own subject',section:'3'},
 clause_cases:{number:'3.5',title:'Case endings on the whole clause',section:'3'},
 negation:{number:'3.6',title:'Negation and meaningful contrasts',section:'3'},
 content_dik:{number:'3.7',title:'-DIK: facts inside a sentence',section:'3'},
 content_future:{number:'3.8',title:'-(y)AcAK: future inside a sentence',section:'3'},
 contrasts:{number:'3.9',title:'Choose -mA, -DIK or -(y)AcAK',section:'3'},
 noun_clause_building:{number:'3.10',title:'Build sentences with noun clauses',section:'3'},
 noun_clause_cases:{number:'3.11',title:'Noun clauses with dative and ablative',section:'3'},
 subject_relatives:{number:'4.1',title:'-(y)An: describe who does it',section:'4'},
 object_relatives:{number:'4.2',title:'Object relatives: who acts on what',section:'4'},
 relative_building:{number:'4.3',title:'Build sentences with relative clauses',section:'4'},
 relative_roles:{number:'4.4',title:'Relative clauses: to, in and from',section:'4'},
 relative_negation:{number:'4.5',title:'Negation inside relative clauses',section:'4'},
 converb_ip:{number:'5.1',title:'-(y)Ip: link actions',section:'5'},
 converb_arak:{number:'5.2',title:'-(y)ArAk: how you do it',section:'5'},
 converb_madan:{number:'5.3',title:'-mAdAn: without doing',section:'5'},
 temporal_order:{number:'5.4',title:'Before and after actions',section:'5'},
 temporal_when:{number:'5.5',title:'-(y)IncA: when and once',section:'5'},
 temporal_while:{number:'5.6',title:'-ken: while actions overlap',section:'5'},
 state_ken:{number:'5.7',title:'-ken: states and places',section:'5'},
 temporal_contrasts:{number:'5.8',title:'Choose the time connection',section:'5'},
 sentence_building:{number:'5.9',title:'Build a sentence from clauses',section:'5'},
} as const;
export const numberedTitle=(item:{number:string;title:string})=>`${item.number}: ${item.title}`;
export type GrammarLessonId=keyof typeof grammarLessonCatalog;
export const lessonNavigationGroups=grammarSections.slice(2).map(section=>({...section,lessons:Object.entries(grammarLessonCatalog).filter(([,lesson])=>lesson.section===section.number).map(([id,lesson])=>({id:id as GrammarLessonId,...lesson}))}));
