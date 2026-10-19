// Display labels for the existing v82 curriculum IDs.
// IDs remain unchanged for filtering, scoring, and saved references.
export const sectionTopics: Record<string, string> = {
  '0': 'Alphabet, vowel harmony & plurals',
  '1.2': 'Nominal sentences & personal endings',
  '1.3': 'Existence (var/yok) & ordinal numbers',
  '2.1': 'Present continuous (-iyor)',
  '2.2': 'Direction & location: dative, locative, ablative',
  '2.3': 'Time expressions & before/after',
  '3.1': 'Possessive endings',
  '3.2': 'Genitive & possession',
  '3.3': 'Noun compounds & adjective phrases',
  '4.1': 'Definite past tense (-DI)',
  '4.2': 'Past-tense nominal sentences',
  '4.3': 'Past continuous, -ken & ile',
  '5.1': 'Commands & imperatives',
  '5.2': 'With/without (-lI/-sIz) & suggestions',
  '5.3': 'Comparatives & superlatives',
  '6.1': 'Definite direct objects (accusative)',
  '6.2': 'Definite vs. indefinite objects',
  '6.3': 'The -ki suffix & additive de',
  '7.1': 'Future tense (-AcAk)',
  '7.2': 'Future in the past (-AcAktI)',
  '7.3': 'Equative -CA & comparison postpositions',
  '8.1': 'Reported/inferred past (-mIş)',
  '8.2': 'Reported continuous & future forms',
  '8.3': 'The -DIr predicate ending',
  '9.1': 'Aorist: habits & general truths',
  '9.2': 'Ability & inability (-Abil/-AmA)',
  '9.3': 'Past & reported habits',
  '10.1': 'Reasons, results & nested possession',
  '10.2': 'Purpose: için & üzere',
  '10.3': 'Before & after actions',
  '11.1': 'Connecting actions: -(y)Ip & -mAdAn',
  '11.2': 'Manner: -(y)ArAk & olarak',
  '11.3': 'Repeated actions: -A -A',
  '12.1': 'Verb nouns: -mA & -mAk',
  '12.2': 'Possessive verb nouns & embedded clauses',
  '12.3': 'Reported instructions',
  'Appendix introduction': 'Foundations: sound changes & word order',
};

// One curriculum concept per ID family; variant numbers remain distinct exercises.
export const skillTopics: Record<string, string> = {
  '00-01': 'Turkish alphabet & vowels', '00-02': 'Numbers & dates', '00-03': 'Plural suffix (-lAr)',
  '01-01': 'Nominal predicates: statements, negation & questions', '01-02': 'Personal endings in nominal sentences',
  '01-03': 'Existence: var, yok & questions', '01-04': 'Ordinal numbers (-IncI)',
  '02-01': 'Present continuous: positive, negative & questions',
  '02-02': 'Dative case: destinations & recipients', '02-03': 'Locative case: where something is',
  '02-04': 'Ablative case: movement from a place', '02-05': 'Before, after & until',
  '02-TIME': 'Telling time & scheduled times',
  '03-01': 'Possessive suffixes', '03-02': 'Genitive–possessive constructions',
  '03-03': 'Noun compounds', '03-04': 'Adjectives before nouns',
  '04-01': 'Definite past tense: forms & questions', '04-02': 'Past nominal predicates',
  '04-03': 'Past continuous: forms & questions', '04-04': 'When/while (-ken)', '04-05': 'With/by (ile, -(y)lA)',
  '05-01': 'Imperative commands', '05-02': 'With/without (-lI/-sIz)', '05-03': 'Let’s… (-(y)AlIm)',
  '05-04': 'Comparisons (daha, -DAn)', '05-05': 'Superlatives (en)',
  '06-01': 'Accusative case for definite objects', '06-02': 'Definite vs. indefinite objects',
  '06-03': 'Modifiers with -ki', '06-04': 'Additive de vs. locative -de',
  '07-01': 'Future tense: forms & questions', '07-02': 'Future in the past',
  '07-03': 'Equative suffix (-CA)', '07-04': 'According to (göre)', '07-05': 'Like/as much as (gibi, kadar)',
  '08-01': 'Inferred/reported past: verbs', '08-02': 'Inferred/reported nominal predicates',
  '08-03': 'Reported present continuous', '08-04': 'Reported future', '08-05': 'Third-person predicate -DIr',
  '09-01': 'Aorist: habitual forms & questions', '09-02': 'Ability & inability',
  '09-03': 'Past habitual (-ArDI)', '09-04': 'Reported habitual (-ArmIş)',
  '10-01': 'Reason & result connectors', '10-02': 'Nested possessive phrases',
  '10-03': 'Purpose with için', '10-04': 'Purpose/intention with üzere',
  '10-05': 'After doing (-DIktAn sonra)', '10-06': 'Before doing (-mAdAn önce)',
  '11-01': 'Successive actions (-(y)Ip)', '11-02': 'Without doing (-mAdAn)',
  '11-03': 'Manner converb (-(y)ArAk)', '11-04': 'Working as (olarak)', '11-05': 'Reduplicated -A converb',
  '12-01': 'Verb nouns (-mA/-mAk)', '12-02': 'Possessive verb nouns & clauses',
  '12-03': 'Reported instructions',
  'FOUND-01': 'Vowel harmony', 'FOUND-02': 'Consonant voicing',
  'FOUND-03': 'Consonant softening', 'FOUND-04': 'Vowel loss',
  'FOUND-05': 'Buffer consonants', 'FOUND-06': 'Consonant doubling',
  'FOUND-07': 'Basic word order & noun phrases',
};

export function sectionLabel(section: string): string {
  return sectionTopics[section] ? `${section} — ${sectionTopics[section]}` : section;
}

export function skillLabel(id: string): string {
  const match = /^YH1-(FOUND-\d+|\d\d-(?:\d\d|TIME))-S(\d+)$/.exec(id);
  if (!match) return id;
  const topic = skillTopics[match[1]];
  return topic ? `${topic} · Exercise ${Number(match[2])}` : id;
}
