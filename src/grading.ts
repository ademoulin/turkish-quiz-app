import { normalize } from './vocab';

// Conjugation practice targets morphology, so an English keyboard is sufficient.
// Keep this separate from vocabulary normalization, which preserves Turkish letters.
export function matchesConjugation(answer: string, accepted: string[]): boolean {
  const fold = (s: string) => normalize(s, 'tr').replace(/[ğıçşöü]/g, c => ({'ğ':'g','ı':'i','ç':'c','ş':'s','ö':'o','ü':'u'})[c]!);
  return accepted.some(expected => fold(expected) === fold(answer));
}
