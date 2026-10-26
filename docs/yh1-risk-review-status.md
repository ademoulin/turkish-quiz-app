# Yeni Hitit 1 risk reconciliation — provisional

34 historical flags: 15 high, 19 medium. **This is a desk review, not native-speaker verification.** Source: v82 staging question bank and historical risk queue. All 34 IDs and answer keys match the supplied staging source. No live question changes are proposed yet.

| Source ID | Section | Preliminary disposition | Original answer option |
|---|---|---|---|
| YH1-V14-Q005 | 8.3 | retired | C |
| YH1-V14-Q009 | 10.2 | provisionally sound; verify | B |
| YH1-V14-Q012 | 11.3 | retired | C |
| YH1-V14-Q013 | 11.3 | provisionally sound; verify | B |
| YH1-V14-Q014 | 11.3 | retired | B |
| YH1-V66-Q023 | 8.3 | provisionally sound; verify | B |
| YH1-V66-Q024 | 8.3 | provisionally sound; verify | D |
| YH1-V68-Q007 | 10.2 | provisionally sound; verify | B |
| YH1-V68-Q008 | 10.2 | provisionally sound; verify | C |
| YH1-V68-Q013 | 11.3 | editorial candidate | A |
| YH1-V68-Q014 | 11.3 | provisionally sound; verify | B |
| YH1-V68-Q015 | 11.3 | provisionally sound; verify | B |
| YH1-V68-Q016 | 11.3 | provisionally sound; verify | A |
| YH1-V68-Q017 | 11.3 | provisionally sound; verify | C |
| YH1-V68-Q018 | 11.3 | provisionally sound; verify | B |
| YH1-V10-Q010 | 2.2 | provisionally sound; verify | D |
| YH1-V10-Q018 | 3.2 | provisionally sound; verify | B |
| YH1-V12-Q014 | 2.2 | provisionally sound; verify | A |
| YH1-V13-Q027 | 10.2 | provisionally sound; verify | B |
| YH1-V46-Q007 | 3.2 | provisionally sound; verify | C |
| YH1-V46-Q008 | 3.2 | provisionally sound; verify | D |
| YH1-V54-Q021 | 2.2 | provisionally sound; verify | A |
| YH1-V54-Q022 | 2.2 | provisionally sound; verify | A |
| YH1-V6-Q003 | 4.2 | provisionally sound; verify | A |
| YH1-V6-Q007 | 4.3 | provisionally sound; verify | A |
| YH1-V6-Q014 | 6.1 | editorial candidate | A |
| YH1-V6-Q015 | 6.1 | provisionally sound; verify | A |
| YH1-V64-Q005 | 10.2 | provisionally sound; verify | B |
| YH1-V64-Q006 | 10.2 | provisionally sound; verify | C |
| YH1-V7-Q002 | 7.2 | retired | B |
| YH1-V7-Q006 | 8.3 | provisionally sound; verify | B |
| YH1-V7-Q008 | 9.2 | retired | C |
| YH1-V7-Q014 | 11.2 | editorial candidate | A |
| YH1-V7-Q016 | 12.3 | provisionally sound; verify | A |

Five source IDs are retired by the complete `grammarMcScope.ts` rules: V14-Q005, V14-Q012, V14-Q014, V7-Q002 and V7-Q008 (full IDs above). The last two are retired via finite-verb family exclusions, which the initial desk review missed. Three editorial candidates: V68-Q013 (*güle güle* pragmatic ambiguity), V6-Q014 (clarify accusative target), V7-Q014 (English bus-journey gloss). Of the 28 initially provisionally sound items, two are retired by finite-verb scope, leaving 26 potentially active; inspect all options and naturalness independently. Original IDs and saved history must remain intact if revised. Next: reconcile the active runtime pipeline, independently review alternatives, make versioned fixes only when justified, then advanced grammar audit.

## Second-pass option-by-option desk review (2026-10-25)

The 29 potentially active source questions were inspected against their complete four-option sets and explanations in `src/data/yeni_hitit_1_codex_staging_v82.json`. This checks grammatical form and prompt/key alignment; it **does not** establish native-speaker acceptance or exact textbook provenance.

### Actionable findings

- **YH1-V68-Q013 — replace or retire, high priority.** `Çocuk güle güle ayrıldı` is formally recognizable as a repeated -A expression, but `güle güle` is strongly conventionalized as a farewell; teaching it as the unqualified normal way to describe leaving cheerfully risks confusing learners. Prefer a clear productive example such as `Çocuk koşa koşa eve gitti` for repeated -A, or use a paired `güle oynaya` example. Keep the old question as retired history; a new version needs separate review.
- **YH1-V6-Q014 — minor wording improvement, no wrong key.** `Bu arabayı satın aldım` correctly requires accusative for the demonstrative-marked direct object. Explain that `bu` identifies the object and that `-yı` is the suffix fragment after `araba`; no change to keyed A needed.
- **YH1-V7-Q014 — English-gloss precision, no wrong key.** `Otobüse binerek şehir merkezine gittim` is grammatical; `binerek` literally expresses boarding/taking the bus as a means. Explain that the suffix is `-erek` after `bin-` and avoid implying that `binmek` alone means the entire ride. Key A remains defensible.

### Additional option-level observations

- **YH1-V68-Q015 / Q016:** Other distractors (e.g. `gülüp oynayarak`) can be grammatical Turkish; the keyed `güle oynaya` is unique **because the prompt explicitly asks for the paired -A construction**. Retain that constraint in any future wording.
- **YH1-V64-Q006:** `senin erken gitmeni` is also grammatical in an accusative-governing sentence; the key `senin erken gitmen` is unique only because the prompt explicitly requires **unmarked/non-accusative** form.
- **YH1-V6-Q007:** `otobüs ile` is valid but is not offered; the question explicitly requests the attached form `otobüsle`.
- **YH1-V66-Q023 / Q024 and V7-Q006:** `-DIr` can indicate inference or formal/categorical assertion; the contextualized or morphological wording avoids presenting conjecture as its sole meaning. Do not reword as a categorical rule.
- **YH1-V6-Q015:** The answer requires both accusative `kitabı` and past `bitirdim`; distractors changing tense are ruled out by the explicit “yesterday” cue.
- **YH1-V68-Q017 / Q018:** `ağlaya ağlaya` is the requested repeated -A form; do not treat all repeated Turkish forms as equivalent.
- **YH1-V14-Q009 / V68-Q007 / V68-Q008 / V13-Q027 / V64-Q005:** Genitive-subject and possessive agreement agree with the keyed option; none of the listed alternatives match the explicit subject.
- **YH1-V10-Q010 / V10-Q018 / V12-Q014 / V46-Q007 / V46-Q008 / V54-Q021 / V54-Q022:** Proper-name case suffixes and buffer consonants align with the keyed forms.
- **YH1-V6-Q003 / V6-Q014 / V7-Q016:** Copular past, demonstrative-object accusative, and reported-instruction nominalization have defensible unique keys in the stated contexts.
- **YH1-V14-Q013 / V68-Q014 / V68-Q016 / V7-Q014:** Keyed converb construction is morphologically appropriate; idiomaticity and educational value remain open to independent review.

### Disposition and limits

**Five retired**, **one high-priority potential replacement/retirement (V68-Q013)**, **two minor editorial clarifications (V6-Q014, V7-Q014)**, **26 other potentially active source questions with no second-pass key conflict identified**. These categories overlap the 29 active total as 1+2+26. The assessment is limited to these 34 historical flags, not the entire 588-question bank. No source question or answer key has been modified in this review. Before implementation, preserve original question IDs for history and test old/new progress behavior.
