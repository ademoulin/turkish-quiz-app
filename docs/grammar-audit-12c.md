# Audit implementation: Lesson 12C

Scope: existing audit recommendation for 12C only — retain inner/outer case distinctions and parallelize alternatives. No new audit or other lesson revisions.

- Eight structure views now ask for a complete inflected word in a sentence gap. Alternatives retain the same nominalizer and subject agreement while contrasting dative, ablative and accusative. No requested case, translation or nominalizer cue is shown.
- Four structure views retain the complete Turkish sentence and ask which bracketed unit complements the main predicate. Alternatives bracket the full noun clause, the embedded accusative object or the genitive subject. All alternatives reproduce the same sentence and have equal character lengths.
- Meaning and guided assembly, including all 12 Turkish model sentences and chunk targets, remain unchanged. Assembly keeps its requested nominalizer: -mA and -DIK overlap with evaluative predicates, so this is necessary to define the graded task.
- Twelve revised structure views receive new `-v2` IDs. Their original snapshots remain importable/exportable as earlier-version evidence, outside current review and progress evidence. Active lesson count remains 860.
- Newly authored draft alternatives are not textbook quotations. Original supplied-source scope remains Yeni Hitit 2 §11.3 p.136 / support p.188. Independent linguistic review and exact Ödkem catalog mapping remain pending.

PR #50 (12B) passed 354 unit and 127 browser tests and was merged before this PR. This branch preserves its changes; combined retired lesson views total 240.

Validation: 354 unit tests pass locally, including original 12C scoring, manual correction and backup tests plus two regression tests for this revision. Production validation/build checks and GitHub browser CI are recorded in the PR. Two added browser scenarios cover focused/random parity, delayed feedback, keyboard/touch checks and correction identity for both question formats.
