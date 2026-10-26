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
