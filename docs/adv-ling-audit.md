# ADV-LING — advanced grammar linguistic audit

Status: in progress; source-based desk review, not independent native-speaker certification.

## Scope

- `src/verbNounTemporalWhen.ts`: -IncA actor reference and temporal meaning.
- `src/verbNounTemporalWhile.ts`: -ken concurrency and different-actor cues.
- `src/verbNounTemporalOrder.ts`: before/after temporal sequencing.
- `src/verbNounRelativeRoles.ts`: embedded complement case versus external head-noun case.
- `src/verbNounClauseCases.ts`: genitive subjects, possessive agreement, matrix-verb case government.

## Initial sampled checks

- `Dün ben gülünce kendimi daha iyi hissettim.` Same actor; converb itself has no finite tense/person.
- `Yarın ben adresi okuyunca sen adresi haritada işaretleyeceksin.` Different actors are overtly named.
- `Yarın ben yemek yaparken sen masayı hazırlayacaksın.` Different actors and concurrent actions are explicit.
- `Yarın ben bu kitabı okuduktan sonra sen kitabı kütüphaneye götüreceksin.` Sequence and actors are explicit.
- Relative-role model contrasts `öğretmene telefon etmek` with `öğretmeni tanımak`: internal dative role versus external accusative role.
- Nominal clauses `Senin gelmeni istiyorum` and `Benim gelmeme sevindi` illustrate matrix-verb case government.

No confirmed linguistic error in this limited sample. These examples are **not** a full option-by-option audit. Next: systematic authored-row and distractor review, then targeted fixes/tests for confirmed problems. Preserve stable history and avoid adding new exercise formats.

## Expanded authored-row pass (2026-10-25)

Reviewed **all 36 source sentence/English-meaning pairs** across the three temporal files (12 -IncA, 12 -ken, 12 before/after), **all 12 relative-role models**, and **all 12 nominal-case model rows**: **60 authored model rows in total**. Checked overt subject reference, main-verb person/tense, temporal order, embedded complement roles, external head case, and matrix predicate case government. This is a model-level desk review, **not** a complete generated distractor or answer-acceptance audit.

### Findings

- **Temporal -IncA (12/12):** Past/future/habitual framing and actor assignments agree with the supplied Turkish sentence and English gloss. The suffix is not incorrectly treated as finite tense or person in sampled explanations.
- **Temporal -ken (12/12):** The Turkish sentences and English meanings preserve overlapping actions and explicit same/different subjects. No obvious subject swap found.
- **Before/after (12/12):** The `-mAdAn önce` and `-DIktAn sonra` examples preserve event order; English meanings and explicit actors agree with the Turkish.
- **Relative-role models (12/12):** Reviewed the dative/locative/ablative embedded-role matrix crossed with bare/accusative/dative/ablative outer head forms. Examples such as `Senin dün telefon ettiğin öğretmeni tanıyoruz` correctly separate embedded `öğretmene` from outer `öğretmeni`. No confirmed case mismatch in the 12 models.
- **Nominal-case models (12/12):** Reviewed four accusative, four dative, and four ablative rows. Matrix predicates `istemek/beklemek`, `sevinmek`, and `rahatsız olmak/hoşlanmak/memnun olmak` govern the keyed cases as modeled. Agreement and actor cues are consistent at the model level.

### Editorial watchlist (not confirmed errors)

1. The English gloss **“they” for singular `o`** is a reasonable gender-neutral translation, but learners might confuse it with Turkish plural `onlar`. Preserve overt actor metadata and verify the answer choices never rely on English “they” to uniquely distinguish number.
2. The relative-role example `Onların her yaz kaldıkları oteli` uses overt plural possessive agreement; elsewhere Turkish permits some singular/plural agreement variation with `onların`. Do not mark a plausible alternative ungrammatical solely because it differs in agreement without checking context.
3. The model `Benim gelmeme sevindi` correctly uses dative with `sevinmek`; review generated distractors to ensure they do not wrongly imply that the nominalized action's dative is optional.

**Disposition:** 60/60 authored model rows desk-reviewed; **0 confirmed key/form errors at model level**, **3 review cautions**. Still outstanding: generated question options, typed-answer normalization, ambiguous alternate valid completions, and independent Turkish-speaker review. No content fixes justified by this pass alone.

## Generated exercise and scoring inspection

Inspected `src/temporalWhenCompletionExpansion.ts`, `src/temporalWhileCompletionExpansion.ts`, `src/relativeRoleCompletionExpansion.ts`, `src/verbNouns.ts`, and `src/verbNounPractice.ts`.

- Temporal expansion creates one typed complete time-clause item and one multiple-choice finite-predicate item per source model; both retain the source intended meaning. Distractors are selected from other models with different main subjects or temporal frames. **Potential risk:** selection by metadata is not proof that each alternative is semantically impossible in the supplied frame; full rendered-option checking remains necessary.
- Relative-role expansion creates a typed relative modifier and a head-case multiple-choice item per source model. Distractors include the embedded-case head form and bare head form, explicitly contrasting embedded versus main-clause case. **Potential risk:** grammatical alternatives may arise when the main predicate accepts multiple case readings, although no confirmed case-key conflict was found in the reviewed 12 source models.
- `verbNounPractice.ts` grades typed responses via `matchesCase` (or `matchesPhrase` for temporal contrasts) and MC responses by option ID. Consequently the next high-priority verification is whether `matchesCase` fairly accepts legitimate orthographic or morphological variants; an MC answer's grammatical acceptability cannot be inferred from ID-based scoring.

No production code changed in this inspection. Avoid claiming that 60 source-model reviews imply all generated exercises are validated.

## Regression verification added

`src/advLingGeneratedChoices.test.ts` now exercises generated multiple-choice option uniqueness, correct-key identity, and every offered option's scoring for temporal when/while/order and relative-role completion. It also protects Turkish-sensitive typed comparison (`öğretmeni` vs `öğretmene`, Turkish diacritics, nominal case and person contrasts). These are **mechanical** checks, not proof that every distractor is linguistically invalid. CI status must be checked against the latest commit before declaring tested.

## Option-level temporal finite-predicate review

Inspected all **36 generated finite-predicate multiple-choice items** (12 each for when, while, before/after) by reconstructing the two distractors selected by the current source-array filter. All 36 use the same two early source-row distractors in most later items. This is **a confirmed pedagogical-quality issue** (repetitive, predictable choices), though not a confirmed second-correct-answer bug: the intended English meaning differentiates those unrelated predicates. Future improvement should select varied, semantically close but unambiguously wrong alternatives without introducing valid alternate completions. Do not silently count this as linguistic invalidity.

The first new regression suite passed the CI **unit-test step**; overall workflow was still running when checked. It tests keyed uniqueness and scoring, not semantic uniqueness. The repetitive-distractor finding warrants a targeted improvement with tests, ideally separately from full independent linguistic certification.
