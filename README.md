# Quiz My Turkish

A calm, mobile-friendly Turkish vocabulary and conjugation app. It reads the living Google Sheet directly; no account, API key, AI service, or backend is required.

## Open the app

This project has been built and tested in the Codex workspace and uploaded to [GitHub](https://github.com/ademoulin/turkish-quiz-app). A ready-to-serve website is also available on the `gh-pages` branch. GitHub Pages must be enabled in repository Settings → Pages before it is publicly available.

A packaged single-file version is also generated at `dist/quiz-my-turkish.html`. It was verified when served as a normal web page. Direct double-click opening could not be verified because this environment's browser administrator blocks local-file pages; browser storage rules for local files also vary. Use the server instructions below for the verified workflow.

For your own computer, install Node.js 22 or 24 LTS, download this project, and open a terminal in its folder:

```sh
npm ci
npm run dev
```

Open the address Vite prints in your browser. Keep that terminal running while studying. To use it on your phone, deploy the production `dist` folder to a static web host; choose hosting separately before publishing. No paid service is required by the application itself.

In the cloud environment, the project is at `/workspace/turkish-quiz-app`. Start with `npm run dev -- --port 5173`. A publicly accessible preview URL is not supplied by this onboarding environment.

## Use the hosted website (no installation)

In [repository Pages settings](https://github.com/ademoulin/turkish-quiz-app/settings/pages), choose **Deploy from a branch**, select **gh-pages** and **/ (root)**, then Save. GitHub will show the published website address after its deployment finishes. The expected project address is https://ademoulin.github.io/turkish-quiz-app/; do not assume it is live before GitHub reports deployment success.

The deployment branch contains only the built static site, with relative asset paths and `.nojekyll`. No Node.js installation is needed on your device to study on the hosted site. Sheet edits are fetched live and do not require a deployment. Application code changes require rebuilding and updating the deployment branch.

Progress belongs to the website address and browser: a hosted site does not automatically share progress with a local app or another device. Export/import can transfer it.

## Start studying

1. Wait for the live vocabulary status, then choose Vocabulary, Conjugation, or Surprise me.
2. Filter/search the list and select individual words or **Select all matching**. Selections remain saved even when you change the filter.
3. Choose direction, session length, and (for conjugation) tenses, persons, polarity, and ability.
4. Type an answer. Enter checks it; Enter again advances. Feedback stays visible until you advance.
5. If a valid answer was missed, choose **My answer was correct**. This updates the original attempt and score rather than recording two attempts.
6. Review mistakes or see your progress. Export a backup under **Your progress**.

A session asks one question per selected entry, up to 10, 20, 50, 100, or all selected entries. Selecting only one verb produces one question; start another session for another randomly selected form. All forms come from your selected settings. Mixed mode chooses vocabulary or conjugation randomly for verbs; non-verbs always get vocabulary questions.

## Update vocabulary

[Open the source sheet](https://docs.google.com/spreadsheets/d/1JrqWacx9e4RH7yhk7dlpPTLr68YwNS5n4L38mQHo8Yo/edit). The app reads **Sheet1**.

| Column                                     | How to use it                                                                                                                                                               |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ID`                                       | Required unique, permanent ID such as `v00001`. Keep it through edits/sorting; never reuse a deleted ID. Use a new ID for a different meaning you want to study separately. |
| `Word` (also accepts `Verb` or `Turkish`)                        | Required Turkish word or phrase. Different entries may share a spelling.                                                                                                    |
| `Type`                                     | Required. Verbs: `vt`, `vi`, `vt/i`. Other labels currently include `adv`, `adj`, `n`, `conj`, `interj`, `postp`, and combined labels such as `adv/n`.                      |
| `Meaning`                                  | Required display definition. Simple comma/semicolon alternatives become accepted English answers. Text in parentheses is optional.                                          |
| `Case`, `Case Notes`                       | Optional metadata for future case exercises; not inferred from transitivity.                                                                                                |
| `Acceptable English` or `Accepted English` | Optional authoritative override, with alternatives separated by `\|`. Leave blank to use automatic alternatives from Meaning.                                               |

Reload the app or choose **Refresh vocabulary** after editing. No rebuild is needed. A successful refresh is cached with its timestamp. A failed refresh uses that cached download and says so. Empty rows are ignored; malformed rows and duplicate IDs are flagged and skipped. A failed/invalid whole-sheet response does not replace the cache. Treat complex definitions with slashes or explanatory clauses as candidates for an explicit accepted-answer override.

The live Google CSV endpoint was verified from a real Chromium browser. The existing public viewing permission worked; **Publish to web was not required**. If permissions later change, restore public viewing access or use the previous cached vocabulary. The app never modifies sharing or sheet data.

## Vocabulary familiarity

Words show **New**, **Learning**, **Familiar**, or **Well known** in vocabulary and mixed practice. Use the **Vocabulary familiarity** buttons to choose one or more levels (for example, New + Learning), then select words or Select all matching. Previously selected words outside those familiarity levels stay saved but are excluded from new sessions. All levels clears the familiarity restriction. Word selection remains random within the eligible group; there is no automatic weighting or spaced-repetition scheduler.

English → Turkish and Turkish → English have separate levels. Mixed directions show both labels and filter using the less familiar level. Conjugation-only mode hides and ignores the familiarity filter; conjugation results never change a word's vocabulary level. Review mistakes remains a separate review flow and ignores setup filters.

- **New:** no vocabulary evidence in that direction.
- **Learning:** some evidence, not yet consistently recalled across days.
- **Familiar:** at least 4 fully successful sessions across 2 days, recent confidence score of at least 3, and at least 60% success over the last 5 sessions (or all if fewer).
- **Well known:** at least 12 fully successful sessions across 3 days, recent confidence score of at least 8, and at least 80% success over the last 5 sessions.

Confidence uses the last 12 sessions: a fully correct session adds 1; a session with a miss subtracts 2, with a floor of zero after each step. Only one evidence point is counted per entry/direction/session, so repeated immediate retries cannot inflate knowledge. A session with any uncorrected miss is not a successful session for that word. Manual grading corrections update the original attempt and count as correct. This is a simple heuristic, not a proficiency certification; thresholds can be adjusted later. Labels do not decay merely because time passes.

New attempts record a session ID. Existing version-1 histories and backups remain supported: legacy sessions are estimated from gaps greater than 30 minutes between recorded attempts. Day boundaries use UTC for consistent results across devices/time zones. No history is erased or transferred between word IDs. Exports/imports preserve session IDs and results; familiarity is recalculated from that history.

For conjugation answers only, an English keyboard is sufficient: g/ğ, i/ı, c/ç, s/ş, o/ö, and u/ü are equivalent. The displayed correct form keeps proper Turkish spelling. Vocabulary answer checking still requires the distinct Turkish letters, except that a/â are equivalent in all modes.

## Grammar scope

Supported: present continuous `-iyor`, definite past `-di`, future `-ecek`, past continuous `-iyordu`, aorist/general `-r`, open conditional (aorist + `-se/-sa`), and bare hypothetical/wish `-se/-sa`. All six persons and affirmative/negative forms are included.

Ability uses `-(y)Abil-` in the non-conditional tenses, and the distinct negative-ability pattern `-(y)Ama-`. For general “can”, select Aorist. Ability + conditional is deferred; conditional questions always display the actual ordinary form being requested.

Rules cover vowel harmony, past consonant assimilation, vowel contraction, future softening, an explicit aorist exception list, known stem changes, `demek`/`yemek`, and multiword verbs conjugated on the final verb. Unrecognized spellings and unsupported combinations are flagged. Rare irregular verbs and additional tense combinations may require new checked exceptions; the engine is not a complete Turkish morphological dictionary.

Third-person plural prompts explicitly show `onlar`. Both plural agreement and the singular-form predicate are accepted; past continuous also accepts the alternative placement of plural agreement. Feedback explains this choice. English cues are clearly labeled **pattern examples with “come”**; they illustrate the requested person/tense rather than claiming to translate the entire vocabulary definition.

Later features: case/postposition exercises, verbal nouns and subordinate clauses, reported past and other complex combinations, spaced repetition, accounts, automatic cross-device sync, and a fully offline app shell.

## Progress and privacy

Vocabulary cache, settings, selections, and attempts live in this browser's local storage. They do not sync to Google or another device. Clearing site data removes them. **Export progress** downloads a JSON backup; **Import progress** merges attempts by attempt ID and preserves existing results. Backups contain progress, not a replacement vocabulary source. Mistake review repeats the original direction/grammar request using the current sheet entry, excluding mistakes subsequently answered correctly. Entries removed from the sheet retain their history but cannot be quizzed until restored under the same ID.

No spreadsheet text is executed as HTML. No analytics or remote AI calls are included. Loading vocabulary makes a public request to Google.

## Validation and development

```sh
npm test          # grammar, parsing, answer matching and backup validation
npm run build     # TypeScript check and production build
npm run test:e2e   # starts/reuses development and production-preview servers
```

Browser tests use the system Chromium when present. Else install a Playwright browser with `npx playwright install chromium`, or set `CHROMIUM_PATH`. The cloud's HTTPS proxy must be configured for browser tests, and its provided CA must be trusted by Chromium. Never disable certificate verification. In this cloud sandbox, Chromium needs access to its writable NSS certificate store; browser testing was run with the required sandbox permission.

The development and packaged-production browser checks use the real sheet. Other browser tests use small controlled sheet responses to exercise failure paths, edits, invalid rows, HTML-like data, conjugation, and backups. Reference conjugation tests contain hand-written expected forms, independent of the generator.

Validation completed: **190 unit checks**, **10 browser checks**, and the production build passed. Browser checks include a 390px mobile viewport; the initial direct-local-file check was blocked by browser policy and is not claimed as passed.

See [DECISIONS.md](DECISIONS.md) for grading and scope choices.

### Yeni Hitit 1 grammar preview (v82)

The attached source bank is preserved verbatim in
`src/data/yeni_hitit_1_codex_staging_v82.json`: 588 draft questions, 196 skills,
three variants per skill. The implementation brief is saved alongside this README.
This bank is **unverified and not approved for public release**. Word-stress
questions remain excluded. Explanations are the supplied text, without rewriting.

`npm run dev` enables the grammar preview. `npm run build` validates the bank and
builds the existing production app with the preview UI and question bank excluded.
For local review, use `npm run build:grammar-preview` followed by `npm run preview`.
Do not publish that preview build without explicit release approval and independent
linguistic review. Vite's relative base preserves the GitHub Pages project path;
the generated standalone HTML includes the bank only in a preview build.

Open “Grammar preview” in practice setup. Choose a section and/or stable skill ID,
then start a session. Every question in the selected pool appears once in shuffled
order; choices are shuffled by ID. Select a choice and check it to reveal the
answer and supplied explanation. Scores count one attempt per question. End or
restart a session at any time. Radio choices support keyboard and touch input.
Preview scores live only in the current session and do not change vocabulary
familiarity, progress backups, or existing quiz modes.

Validation: `npm test`, `npm run build`, `npm run build:grammar-preview`, and
`npm run test:e2e`. The browser suite includes an existing live vocabulary test
that requires Google Sheets access; all other browser tests use local fixtures.
The preview bundle currently produces Vite's advisory warning for a chunk over
500 kB; no runtime content is fetched from GitHub.

Local changes can be preserved with:

```sh
git bundle create yeni-hitit-v82-integration.bundle codex/yeni-hitit-v82-integration
```

On another checkout, import with `git fetch /path/to/yeni-hitit-v82-integration.bundle
codex/yeni-hitit-v82-integration:codex/yeni-hitit-v82-integration`, then check out
that branch. A bundle includes commit history and needs no GitHub connection.

## Case Forms

Open **Grammar practice → Case Forms**, select the required case,
and start a 10-question session. Type the complete inflected base word; Turkish
letters count. Enter checks an answer; the focused Next button advances after
feedback. Turkish-letter buttons are available for touch and keyboard users.
“My answer was correct” updates the existing attempt once.

There are 50 newly authored draft exercises (10 per case), guided by Yeni Hitit 1
§2.2 p.29, §3.2 p.40, and §6.1 p.73 (printed pages), and mapped to Ödkem Rules IDs 14–16, 35, and partially 21 from the supplied workbook. Genitive questions test only the genitive word; the possessed noun is supplied.
These exercises are not textbook quotations or independently certified content.
Supporting phonological rules are recorded separately from the tested case.

Pilot evidence is saved in the existing browser store and included in progress
export/import as optional `pilotAttempts`. Old version 1 backups remain supported;
imports merge by attempt ID. Session scores and saved history are evidence only,
with no grammar mastery classification. The existing 588-question multiple-choice
bank and other grading policies are unchanged.

To try an unmerged branch locally: `npm ci`, then `npm run dev`. No branch preview
is automatically published to GitHub Pages. Checks: `npm test`, `npm run build`,
`npm run test:e2e` (requires Playwright Chromium).

### Mixed case practice and grammar mistake review

Choose **Mixed cases · 12 questions** for a shuffled set of two or three questions per
case, covering all five cases. Each prompt still explicitly names the required case. Single-case practice
continues to use 10 questions.

**Review grammar mistakes** practices questions whose latest saved result was
incorrect, within the selected case (or all cases with Mixed). A subsequent
correct answer or manual correction clears a question; a later miss brings it
back. Empty review queues disable the button. Results remain evidence without
mastery labels, and older progress backups remain compatible.

### Typed possessive forms

Open **Grammar practice → Typed endings · Possessive forms**. Select an owner
for four questions, or **Mixed owners · 12 questions** for two per owner.
Type only the complete possessed noun, without the owner pronoun. Every prompt
states the owner and noun number: the “their” questions request plural
possessions; the other owners request one possessed item.

There are 24 newly authored draft exercises, guided by Yeni Hitit 1 §3.1,
printed p.37 and Ödkem rule 20. Independent linguistic review is pending. This
batch tests possessive forms only; whole phrases and possessed-case combinations
have their own separate activities. Singular possessions with plural owners are deferred.

Possessive mistakes have their own review button. Case practice stays separate.
Both use the same strict Turkish spelling, keyboard/touch controls, manual
correction and browser history. Export/import preserves owner and noun-number
evidence alongside existing case results; old version-1 backups remain supported.
There are no grammar mastery labels or thresholds.

### Whole genitive–possessive noun phrases

Open **Grammar practice → Build a noun phrase · Genitive + possessive**.
A session contains 20 shuffled draft exercises. Each gives two base nouns in
possessor + possessed order, the intended meaning, and singular number for both.
Type the complete two-word Turkish phrase, adding endings to both nouns.

These are newly authored drafts guided by Yeni Hitit 1 §3.2, printed p.40 and
Ödkem rule 21; independent linguistic review remains pending. The construction
is explicitly requested. Case stacking has its own separate activity; plural noun
phrases, construction choice and full sentence production remain deferred.

Turkish spelling, word order and both words' endings count. Extra internal or
surrounding whitespace does not affect phrase grading; punctuation and extra
words do. Phrase attempts use their own exercise type, retain both noun bases
and number constraints, and appear in a separate mistake-review queue. Existing
case/possessive histories and old progress backups remain supported. No grammar
mastery classifications are assigned.

### Case endings on possessed nouns

Open **Grammar practice → Practice activity → Combine endings · Possessive + case**.
Choose a case and possessed noun number: Singular (48 questions), Plural (24),
or Mixed (72). Singular remains the default. A single-case session has 12 singular,
6 plural, or 18 mixed questions. Both filters also apply to mistake review.
Each prompt names the required case and supplies the possessed form, including
its existing possessive ending. Add only the case ending. For a supplied two-word
phrase, return both words and keep the first word unchanged.

These are newly authored drafts guided by Yeni Hitit 1 case and possessive sections
and grammar appendix §7.5(i), which explicitly covers third-person possessive n
before case suffixes. Ödkem mappings: tested cases 14/15/16/35; supporting rules
20 (supplied possession), 21 (supplied phrases), 2/3 (harmony), and 8 (partial buffer
mapping). The n is required even before -de/-den. Independent review is pending.
Every question states the owner and whether the possessions are singular or
plural. Third-person plural owners in this batch explicitly have plural
possessions; the intended reading is supplied rather than inferred. No genitive
case stacking is included. This activity tests adding a named case, not choosing a
case or producing the underlying possessive form.

Word answers retain strict Turkish spelling and existing word normalization.
Two-word answers also normalize repeated internal whitespace. Each saved result
has a distinct possessed-case concept and exercise type, supplied form, case,
answer scope, owner and noun-number context. Review remains separate. Corrections
update original attempts; version-1 export/import supports both new evidence and
older backups. No grammar mastery labels or thresholds are added.

### Practice guidance and repeated contrasts

Every grammar activity includes plain-English instructions and an unscored worked
example before starting. Examples disappear during a session so they cannot
reveal the current answer. Typed case questions include short meaning cues;
accusative is explained as marking a specific direct object rather than assigning
it a misleading English preposition. Possessed-case prompts show the English
meaning and owner of the supplied form, and explain whether to type one word or
both words of a phrase.

Possessed-case practice now includes 48 authored draft questions (12 per case),
including repeated my/your/his-her house contrasts. The original 24 question IDs,
answers and saved evidence remain valid; the 24 additions keep singular
possessions and the same textbook/catalog scope. Plural forms and case choice
remain future work. Independent linguistic review remains pending.

### Plural possessed-case drills

Combine endings now adds 24 authored draft plural drills (six per case, one per
owner). The plural and possessive endings are already supplied; only adding the
named case is assessed. Preserve both endings, e.g. kitapların → kitaplarına.
The explicit owner and plural number disambiguate forms like çantaları.
Yeni Hitit 1 grammar appendix §7.5(i) explicitly includes arabaları + case forms;
the existing case/possessive source and Ödkem mappings apply. Plural production
is supporting context, not separate mastery evidence. Independent review remains
pending. Old singular questions and histories remain unchanged. Version-1 backups
now also accept plural possessed-case snapshots; no new backup version is needed.

### Build endings from the base noun

Inside **Combine endings**, choose **Practice method → Build from base**.
The default **Add case only** method and its 72 questions remain available.
Build from base has 24 new authored drafts: six per case, one per owner, with
12 singular and 12 plural possessions. All four cases + Mixed number includes
all 24; choosing one case gives six, and one case + one number gives three.
Their questions always request plural possessions.

Read the bare noun, owner, possession number and named case. Produce one
complete Turkish word, building plural (when required), possession and case.
Do not type the owner pronoun or a sentence. Setup includes an unscored example;
question answers and the build-up appear only after checking.

These full-chain attempts use distinct suffix_chain_* concepts and
typed_suffix_chain exercise type with baseNoun, owner, nounNumber and
requiredCase snapshots. Their mistake queue is separate from Add case only,
and respects both case and number. Switching methods preserves unfinished
sessions while grammar practice stays open. Corrections update original results;
version-1 progress exports/imports retain new and older evidence.

Source scope: Yeni Hitit 1 plural forms printed p.11, possessives p.37, cases
pp.29/73 and grammar appendix §7.5(i). Ödkem maps possession (20), cases
(14/15/16/35) and supporting harmony/phonology (2/3/4/8). A dedicated plural-noun
catalog row was not identified in the provided snapshot; that exact mapping is
pending rather than invented. Exercises are newly authored drafts, not textbook
quotations; independent linguistic review remains pending. No case-choice task,
sentence production or mastery labels are added.

### Owner-focused practice

Both Combine endings methods now have **Owner to practice** alongside case and
possession number. Choose my/your/his-her/our/their or All owners. Add case only
also offers Named owner for supplied noun phrases; these are kept separate from
the personal his/her choice. Filters apply to both practice and latest-mistake
review. Session pools are fixed after starting. Empty combinations explain which
filters to change and disable Start; their + singular possessions remains outside
the authored scope.

Build from base now has 48 authored draft questions: 12 per case (six singular,
six plural), two per owner per case. New IDs 07–12 append to the original 01–06.
The additional ev contrasts deliberately keep identical surfaces such as evinde
or evlerinde as separate questions with explicit owner/number evidence. The
original 24 questions, all Add case only questions, grading and backups remain
unchanged. Sources and draft review status remain as described above; independent
linguistic review and the dedicated plural catalog mapping remain pending.

### Mixed Grammar Review

Choose **Grammar practice → Practice activity → Mixed Grammar Review**.
All questions starts 12 shuffled questions across six typed families:
noun case forms, personal pronoun cases, possessives, noun phrases, Add case only,
and Build from base. Every family contributes exactly two questions. Multiple choice remains its own activity.

Follow the Task heading for each question. The original instructions, owner,
number, case, base label and one-word/two-word answer format are shown.
Answers and explanations appear only after checking. The setup example is
unscored and disappears during sessions.

Previous mistakes reviews up to 12 latest missed question IDs across these
families. Sparse families contribute what is available; no cleared items are
added to fill a session. With fewer than 12 mistakes, review is shorter.
A later correct answer or manual correction clears the same question from both
mixed and focused queues. Active review pools remain fixed while answering.

Mixed review reuses the 238 registered question objects and their IDs; the
pronoun activity supplies 24 new authored drafts, and mixed review adds no
further question content or mastery classification. Attempts keep the original concept, exercise
type, supporting rules and prompt context. Optional practiceMode values
mixed_grammar and mixed_grammar_review identify the session source in version-1
backups while older backups remain supported. Existing strict Turkish spelling,
phrase whitespace policy, correction and scoring are unchanged.

### Personal pronoun case forms

Open **Case Forms → Case word type → Personal pronouns**. Nouns remains the default
and keeps all 50 existing questions. Personal pronouns has 24 new authored
drafts: ben/sen/o/biz/siz/onlar × locative, dative, ablative and accusative.
Choose all 24 or six forms for one case. Type only the complete inflected
pronoun. A worked setup example and post-check explanations cover bana/sana,
singular o → on- before case endings, and harmony on onlar.

Locative sentences naturally describe an item being with a person / in their
keeping (Anahtar bende), rather than treating every locative pronoun as a house
location. Genitive and possessive forms are outside this small batch.
Yeni Hitit 1 case sections §2.2 p.29 and §6.1 p.73 guide scope; Ödkem case rules
14/15/16/35 and supporting harmony/buffer rules 2/3/8 apply as partial case-rule
mapping. Exact dedicated catalog mapping for irregular bana/sana remains pending.
Exercises are authored drafts, not textbook quotations; independent review is
pending.

Pronoun attempts retain pronoun and requiredCase snapshots under distinct
pronoun_* concepts and typed_pronoun_case exercise type. Their focused queue
is separate from noun cases; Mixed Grammar Review now has six families and
samples two of each in 12-question sessions. Correct mixed results clear the
same pronoun question. Version-1 exports/imports support old and new histories,
and manual corrections update the original attempt. No mastery labels.

### Choose the Case

Grammar practice → Practice activity → **Choose the Case**. Read the sentence and intended English meaning, choose locative/dative/ablative, and type the complete inflected word. **Check case and word** (or Enter in the word field) checks both together. Case choice and intended word form have separate scores and correction buttons. Turkish spelling is strict; Turkish-letter buttons support touch input. Normal sessions have 12 questions, four per case, sampled from 30 authored drafts. A separate mistake queue reviews up to 12 questions where either part was missed. Attempts and both component scores use the existing local progress history and version-1 backups. This activity is not yet included in Mixed Grammar Review. Content needs independent linguistic review; exact tutor-catalog usage mapping remains pending.

Choose the Case now includes **50** authored drafts: the original 30 plus ten pairs contrasting an identified accusative object with an unmarked nonspecific object/activity. Select **Accusative** or **No case ending** as appropriate; with No case ending, type the unchanged base word. English intended meanings disambiguate the target. A normal twelve-question session samples two or three from each of the five categories, randomizing the extra slots. This supersedes the earlier 30-question/four-per-case description. Scores, mistake review, corrections and progress backups remain in the same activity. New content follows Yeni Hitit 1 §6.1 p.73; independent linguistic review and exact tutor-catalog mapping for bare-object usage remain pending.

**Common verb patterns** is now a Practice focus inside Choose the Case: 24 new authored drafts (two each for 12 verbs), bringing the full pool to **74**. Select this focus to practise four questions each of dative/ablative/accusative in a 12-question session. Verbs are supplied; type only the missing noun. All case choices keeps the existing five-category balance. Review shares evidence across the two focuses. Optional verb-pattern snapshots survive export/import and appear in progress history. Independent linguistic review and exact per-verb source/catalog mapping remain pending. See ROADMAP.md for the next priority: nominalized verbs and subordinate clauses. Verb conjugation drills stay in Conjugation.

### Verb nouns and clauses

Open Grammar practice → **Verb nouns and clauses**. This begins the nominalization course with **1 · Actions as nouns** and **2 · Action nouns with case endings**. There are **24 model sentences and 72 exercises**: each model has a meaning check, a whole-action-chunk check and a typed completion. Use Lesson practice to choose a task or a mixed session. Mixed sessions have twelve different model sentences and four questions per task; focused sessions cover all twelve models for one task.

Check before seeing the translation, bracketed action unit and suffix breakdown. The setup guide and worked examples are unscored. Typed tasks supply a stem and name the construction to practise; the finite verb or description is already supplied. Grammar builds a noun-like action unit here; finite-verb conjugation drills remain in Conjugation. Correct Turkish spelling is required. Button, Enter and Turkish-letter touch controls are supported.

All lesson checks are saved in the existing progress history and version-1 backups, including comprehension choices. Lesson/task IDs keep meaning, structure and production evidence separate. Review lesson mistakes respects both filters; later correct answers and original-attempt manual corrections clear the corresponding question. Existing history and older backups are supported. Original Grammar Multiple Choice still keeps scores in its current session only. No mastery ratings are added.

New exercises are authored drafts guided by Yeni Hitit 1 nominalization sections pp.145/149. Independent linguistic review and exact Ödkem nominalization mappings are pending. Later lessons on possessive subjects, noun clauses, participles and converbs are planned in ROADMAP.md; they are not yet implemented.

**Lesson 3 · The action has its own subject** now adds twelve models and 36 exercises inside the same section, bringing it to **36 models and 108 exercises**. Choose subjects explicitly with genitive forms (benim/senin/onun/bizim/sizin/onların), identify who acts, and build the matching -ma/-me + possessive word. Each person has two models. No outer case ending is added yet. For onların, typed exercises specifically request overt -ları/-leri agreement; the guide notes that singular agreement is also possible. Lesson 3 keeps its own meaning, who-acts and production evidence and saves nominalSubject snapshots in existing backups. Earlier models and history remain unchanged. Authored draft content still needs independent review and exact tutor mapping. Lesson 4 will add case to the whole clause.

**Lesson 4 · Case endings on the whole clause** adds twelve models and 36 exercises, bringing the section to **48 models and 144 exercises**. Each person appears twice, with four accusative, four dative and four ablative clauses. Identify what the outer case connects to, then build forms such as senin gelmeni and onun gelmesini. Checked breakdowns distinguish possessive n from buffer n and show inner versus outer case scope. Verbs/predicates are supplied. Typed prompts name the outer case and request overt plural agreement for onların. Saved nominalCase and nominalSubject snapshots round-trip through existing backups; earlier models, questions and history are preserved. New content remains authored draft pending independent review and exact tutor mapping. Negation/contrast lessons are next in ROADMAP.md.

**Lesson 5 · Negation and meaningful contrasts** adds 12 models / 36 exercises (60 models / 180 exercises total). In Grammar practice → Verb nouns and clauses, choose lesson 5, then mixed, meaning, structure or production. Distinguish nominalizing -mA from negative -mA, action negation from supplied main-verb negation, and shared versus separate actors. Explicit polarity cues keep typed answers unambiguous. Negation-scope snapshots join existing history/export/import; old backups remain supported. Yeni Hitit 1 §12.1 p.145 and §12.2 p.149 inform these newly authored drafts; independent linguistic review and exact Ödkem mapping remain pending. No finite conjugation drills are added.

**Lesson 6 · -DIK: facts inside a sentence** adds 12 models / 36 exercises (72 models / 216 exercises total). Find it under Grammar practice → Verb nouns and clauses → Lesson 6. Every person appears twice, with six past events and six habitual facts. Explicit time phrases teach that -DIK is not automatically past. Build genitive subject + -DIK + agreement + accusative clauses with supplied main verbs. Checked breakdowns explain four-way harmony, d/t, k/ğ, plural k retention and buffer n. Content-time, subject and case snapshots survive existing progress backups, including older imports. Earlier banks are unchanged. Newly authored drafts informed by Yeni Hitit 2 §11.3 p.136 and Grammar Support p.188; independent review and exact tutor mapping pending.

**Lesson 7 · -(y)AcAK: future inside a sentence** adds 12 models / 36 exercises (84 models / 252 exercises total). Grammar practice → Verb nouns and clauses → Lesson 7 offers meaning, structure and typed production. Each subject appears in both a current future context (yarın) and a future-in-past report (ertesi gün). Learn subject agreement, outer accusative, buffer y/n, k→ğ, retained k before overt plural agreement, and git→gid. Supplied main predicates establish the viewpoint. Reports do not assert that planned events actually occurred. Future context snapshots round-trip through existing version-1 backups; earlier content is unchanged. Newly authored drafts informed by Yeni Hitit 2 nominalization and indirect reports, with independent review and exact Ödkem mapping pending.

**Lesson 8 · Choose -mA, -DIK or -(y)AcAK** adds four contrast sets / 12 models / 36 exercises (96 models / 288 exercises total). Find it under Grammar practice → Verb nouns and clauses → Lesson 8. Meaning tasks show the full sentence; comparison tasks show a blank and intended message, so the answer is not already in the sentence. Production gives the intended message and stem with a family-neutral cue. All three forms take supplied-subject agreement and accusative. Saved nominalConstruction evidence round-trips through version-1 backups alongside older histories. Earlier content is unchanged. Newly authored drafts draw on supplied Yeni Hitit 1/2 nominalization guidance; independent review and exact tutor mapping remain pending.
