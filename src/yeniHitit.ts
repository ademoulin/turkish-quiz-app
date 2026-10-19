import dataset from './data/yeni_hitit_1_codex_staging_v82.json';
export type GrammarQuestion = (typeof dataset.questions)[number];
export const bank = dataset;
export function validateBank(value: unknown): asserts value is typeof dataset {
  const d = value as typeof dataset;
  if (!d || d.schema_version !== '1.0' || d.dataset_version !== 'v82-codex-staging' || d.source_version !== 'v81' || d.review_status !== 'UNVERIFIED_DRAFT_NOT_APPROVED_FOR_PUBLIC_RELEASE' || !Array.isArray(d.questions) || d.questions.length !== 588) throw Error('Invalid v82 dataset metadata/count');
  const ids = new Set<string>();
  const skills = new Map<string, number>();
  for (const q of d.questions) {
    if (!q || typeof q.id !== 'string' || !q.id.trim() || ids.has(q.id) || typeof q.section !== 'string' || !q.section.trim() || typeof q.skill_id !== 'string' || !q.skill_id.trim() || q.type !== 'single_select' || typeof q.prompt !== 'string' || !q.prompt.trim() || typeof q.explanation !== 'string' || !q.explanation.trim()) throw Error(`Invalid question ${q?.id}`);
    if (/stress|prosody|vurgu/i.test(q.prompt + ' ' + q.explanation) || /^YH1-00-03-S0[34]$/.test(q.skill_id)) throw Error(`Excluded prosody question ${q.id}`);
    if (!Array.isArray(q.options) || q.options.length !== 4 || new Set(q.options.map(o => o.id)).size !== 4 || new Set(q.options.map(o => o.text?.trim())).size !== 4 || q.options.some(o => typeof o.id !== 'string' || !o.id.trim() || typeof o.text !== 'string' || !o.text.trim()) || !q.options.some(o => o.id === q.correct_option_id)) throw Error(`Invalid options/key ${q.id}`);
    ids.add(q.id); skills.set(q.skill_id, (skills.get(q.skill_id) || 0) + 1);
  }
  if (skills.size !== 196 || [...skills.values()].some(n => n !== 3)) throw Error('Expected 196 skills with three variants each');
}
export function shuffle<T>(items: readonly T[], random = Math.random): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]; }
  return result;
}
export function selectQuestions(section = '', skill = '', random = Math.random) {
  return shuffle(bank.questions.filter(q => (!section || q.section === section) && (!skill || q.skill_id === skill)), random).map(q => ({...q, options: shuffle(q.options, random)}));
}
export type Session = { questions: GrammarQuestion[]; index: number; answers: Record<string, string> };
export function startSession(section = '', skill = ''): Session { return { questions: selectQuestions(section, skill), index: 0, answers: {} }; }
export function submitAnswer(s: Session, option: string): Session {
  const q = s.questions[s.index];
  if (!q || s.answers[q.id] !== undefined || !q.options.some(o => o.id === option)) return s;
  return {...s, answers: {...s.answers, [q.id]: option}};
}
export function nextQuestion(s: Session): Session { const q = s.questions[s.index]; return q && s.answers[q.id] !== undefined ? {...s, index: s.index + 1} : s; }
export function score(s: Session) { return { attempted: Object.keys(s.answers).length, correct: s.questions.filter(q => s.answers[q.id] === q.correct_option_id).length }; }
