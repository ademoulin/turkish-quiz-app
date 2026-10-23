import type {NominalCase} from './verbNounClauseCases';
/** Explicitly authored alternatives: same action/actor, only the outer case changes.
 * Yeni Hitit 1 §12.2 scope; these are app-authored drafts, not textbook questions.
 * Independent linguistic review and exact Ödkem mapping remain pending. */
export const clauseCaseChoices:Record<string,Record<NominalCase,string>>={
 'vn4-01':{accusative:'gelmeni',dative:'gelmene',ablative:'gelmenden'},
 'vn4-02':{accusative:'gelmesini',dative:'gelmesine',ablative:'gelmesinden'},
 'vn4-03':{accusative:'kalkmamızı',dative:'kalkmamıza',ablative:'kalkmamızdan'},
 'vn4-04':{accusative:'konuşmanızı',dative:'konuşmanıza',ablative:'konuşmanızdan'},
 'vn4-05':{accusative:'gelmemi',dative:'gelmeme',ablative:'gelmemden'},
 'vn4-06':{accusative:'etmemizi',dative:'etmemize',ablative:'etmemizden'},
 'vn4-07':{accusative:'gelmenizi',dative:'gelmenize',ablative:'gelmenizden'},
 'vn4-08':{accusative:'gelmelerini',dative:'gelmelerine',ablative:'gelmelerinden'},
 'vn4-09':{accusative:'beklememi',dative:'beklememe',ablative:'beklememden'},
 'vn4-10':{accusative:'konuşmanı',dative:'konuşmana',ablative:'konuşmandan'},
 'vn4-11':{accusative:'çalışmasını',dative:'çalışmasına',ablative:'çalışmasından'},
 'vn4-12':{accusative:'çalışmalarını',dative:'çalışmalarına',ablative:'çalışmalarından'},
};
