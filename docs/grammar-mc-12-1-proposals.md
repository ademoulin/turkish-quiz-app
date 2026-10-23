# Three MC replacement proposals: section 12.1, S03

Newly authored drafts, not textbook questions. Independent linguistic review
and exact Ödkem mapping remain pending. These proposals are implemented on
`codex/mc-activity-replacements` for review, pending publication approval. The
original 588 question objects remain unchanged.

These replace three near-identical infinitive-subject recognition tasks with
three different connections. They concern general activities, with no possessed
verbal nouns or separately specified embedded subjects. All distractors are real
nonfinite words; no option is a finite conjugation or a malformed word.

Each learner prompt says **Choose the word that completes the sentence.** Do not
display the target case, pattern name, answer or explanation before checking.
The headings and explanations below are reviewer information, not pre-check hints.

## 1. Infinitive for purpose

Replacement candidate for `YH1-V13-Q034`.

**Türkçe ___ için her gün pratik yapıyorum.** *(öğrenmek)*

| Option | Word |
|---|---|
| A | öğrenmeyi |
| B | öğrenmek |
| C | öğrenmeye |
| D | öğrenmekten |

**Answer: B — öğrenmek.**

After-check explanation: “İçin expresses purpose here: Türkçe öğrenmek için
means ‘in order to learn Turkish.’ Use the infinitive before için.”

Target: select the infinitive for a purpose phrase, rather than automatically
adding an activity-object or complement case. The supplied base word is a lemma,
not an instruction to retain its ending: learners must choose the complete form.

## 2. Activity complement of başlamak

Replacement candidate for `YH1-V64-Q019`.

**Geçen hafta düzenli olarak ___ başladım.** *(yürümek)*

| Option | Word |
|---|---|
| A | yürümekten |
| B | yürümeyi |
| C | yürümek |
| D | yürümeye |

**Answer: D — yürümeye.**

After-check explanation: “Başlamak takes a dative activity complement:
yürümeye başladım means ‘I started walking.’”

Target: infer the dative from the supplied predicate. A finite predicate is given,
not conjugated by the learner. No English “to” is supplied as a shortcut.

## 3. Activity complement of korkmak

Replacement candidate for `YH1-V64-Q020`.

**Denizde tek başıma ___ korkuyorum.** *(yüzmek)*

| Option | Word |
|---|---|
| A | yüzmekten |
| B | yüzmeye |
| C | yüzmeyi |
| D | yüzmek |

**Answer: A — yüzmekten.**

After-check explanation: “Korkmak takes an ablative activity complement here:
yüzmekten korkuyorum means ‘I am afraid of swimming.’ Keep k in -mekten.”

Target: distinguish a feared activity from an object or destination complement.
Do not add `yüzmeden` as a distractor: a ‘without swimming’ adjunct can create a
different grammatical reading rather than a clean wrong form for this target.

## Review notes and implementation boundary

- Each item has one intended completion among its four supplied choices in the
  ordinary reading. No claim is made that these are the only grammatical ways
  to express the ideas. This is an editorial assessment, not native-speaker signoff.
- Purpose, dative and ablative add three distinct decisions to this tiny MC
  section. Its two retained sevmek drills already cover the accusative. These
  concepts also exist in lesson 3.3; this improves optional MC recognition, not
  overall concept coverage or independent typed-production evidence.
- We deliberately avoid a bare-infinitive versus accusative istemek question:
  an accusative nominal complement can also be grammatical. An explicit requested
  pattern would make a legitimate form drill, but not an unconstrained usage test.
- Topic guidance: supplied Yeni Hitit 1 purpose material (§10.2, printed p.125),
  nominalization table (printed p.145) and Unit XII grammar support; also checked
  against current app `verbNounActionForms.ts` patterns and surface forms. The
  sentences above are authored for this proposal, not quoted textbook exercises.
- Replacing subject-recognition tasks with predicate/case decisions materially
  changes the assessment. Do not overwrite the old question IDs or credit their
  attempts as success on these proposals. Preserve the 588 originals, add a
  versioned active-question mapping, and handle focused MC, random practice,
  progress, mistake review and backups together if implementation is authorized.
- Keep three active variants for S03. The remaining S02 review candidates and
  all other MC sections are outside this batch. No app implementation or deployment
  is included in this document.

## Implementation

`grammarMcRevisions.ts` overlays the three authored replacements with new `-v2`
IDs and explicit draft/source metadata. `bank` remains the unchanged original
source dataset; `activeGrammarQuestions` supplies focused selection, filters and
the mixed registry. There are still 588 active MC questions and three variants
per skill. The other 585 originals remain active without changes.

The retired three remain importable under their original IDs. Progress lists
them as earlier-version checks, outside current recognition statistics and
playable mistake review. Current attempts keep existing browser-storage and
version-1 backup formats; corrections update the original attempt snapshot.
Unknown old question IDs remain preserved and unlinked as before.

Unit tests cover source preservation, active counts, all answer options, filter
selection, random identity, correction/single scoring and mixed-version backups.
A short browser session covers all three revisions, keyboard/touch checking,
old progress, random mistake review, export/import and reload persistence.

Try: Grammar practice → Grammar Multiple Choice → section **12.1** → the third
**Verb nouns (-mA/-mAk)** skill (`YH1-12-01-S03`) → Start grammar practice.
MC section numbers are the existing textbook labels, independent of numbered
app lessons. No changes to other modes or content are part of this batch.
