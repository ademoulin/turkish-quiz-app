# Grammar exercise design audit

Reviewed 2026-10-22 against main de242e02560d42802e14dcb6d6695db205ab6bf8.

## Decision

Keep useful beginner scaffolding, but stop treating the same three task types as a requirement for every concept. Prioritize interpreting endings, clause roles and meaningful contrasts. Retire redundant scored tasks only after a replacement path and history compatibility are designed. This audit changes no app behavior or question data.

## Scope and limits

The current registry contains 1,836 question objects: 936 lesson tasks from 312 models in 25 lessons, 238 typed noun/form questions, 74 two-part case-choice questions, and the original 588 multiple-choice questions. These are not 1,836 independent sentences.

Reviewed the generators, grading/session logic, actual presentation helpers and representative rendered question objects for every lesson and practice family. Inspected additional examples in subject, clause-case, negation, content-clause and temporal families. The accompanying CSV inventories every current ID and screens all lesson objects for specified structural patterns. It is not an independent linguistic review of all sentences or a claim that each of the 588 MC items received a manual editorial review. MC inspection is a design-level sample plus duplicate screening. No learner error-rate data was available; difficulty judgments are design judgments, not measured outcomes.

Current source takes precedence over textbook mapping. No new Turkish answers are authored here; existing draft/review status remains unchanged. Source PDFs were not needed to establish these design defects. Textbook verification and independent linguistic review belong in the subsequent content rewrite.

## Findings with exact evidence

1. **Visible actor bypasses agreement.** `vn3-11-structure`: “Onların gelmeleri önemli.” asks who comes; “onlar” is available. All 12 Lesson 3 structure questions and 12 meaning questions expose the genitive actor. The meaning alternatives mainly change that actor, so meaning and structure test almost the same recognition. Keep overt genitives in introductions and agreement-production drills; selectively omit them in interpretation tasks, after ambiguity review. Do not delete all third-person subjects mechanically.
2. **Boundary spotting has a low ceiling.** `vn1-01-structure` offers “Yüzmek”, “sağlıklıdır”, and the whole sentence. `vn2-01-structure` offers “Denizde yüzmeyi”, “seviyorum”, and the whole sentence. All 24 such structure tasks use this unit/main/whole-sentence template. Useful as brief instruction; weak as a recurring scored mode. Replace with nested boundaries or clause-role contrasts where there is a real competing analysis.
3. **A choice task states the answer category.** `vn11h-01-structure` displays “Requested timing: Explicit before” and offers “-mAdAn önce · explicit before”. All 12 Lesson 11H structure tasks have this category-label shortcut. Replace with interpreting a Turkish connection or choosing among Turkish expressions for a concrete scenario. Typed production may still request an exact connection to avoid rejecting valid paraphrases.
4. **Some actor questions survive removing the target construction.** `vn12a-01-structure` shows “Dün ben ___ sen kapıyı kontrol ettin.” and asks who belongs to each clause. The two explicit actor positions supply the answer while the target time expression is missing. All 12 use that presentation pattern. Show the complete Turkish sentence for analysis; ask about time or clause attachment rather than simply reading visible actor labels.
5. **A supplied base can reduce production to copying.** Lesson 11F supplies e.g. `okur-` and requests `okurken`. All 12 typed tasks add invariant `ken` to a supplied linking base. Legitimate introductory attachment practice, but narrow evidence. Keep briefly; emphasize meaning/overlap and shared versus distinct actors in later practice. Do not turn this into finite conjugation practice; that stays in Conjugation.
6. **Choice wording can reveal the key.** Across all 624 lesson choice tasks (312 meaning + 312 structure), 214 correct options are uniquely longest. Structure-only examples: 11A 11/12, 11B 11/12, 11C 12/12, 12C 12/12, 12E 12/12. This is a screening flag, not proof of low value. Correct options often explain while wrong options merely assert. Make options parallel in length, detail and grammatical form; move reasoning into feedback.
7. **Some wrong choices are implausible for the intended learner.** `vn9-01-structure` contrasts a student reading a book with a book reading a student. `vn10-01-structure` likewise makes the book an actor. These introduce roles clearly but can be solved by world knowledge. Use reversible human roles where appropriate, with explicit contexts and unambiguous syntax. For content clauses, retain plausible actor reversal, construction and viewpoint mistakes.
8. **Scaffolded assembly still has a real but limited role.** All 72 assembly questions provide four labeled slots, six chunks and two distractors. Noun-clause slot labels explicitly mention genitive/agreement/case. These assess selecting and arranging supplied forms, not independently forming endings or freely constructing sentences. Keep guided assembly as such; reduce unnecessary labels in a later task or assess a targeted choice separately. Do not remove cues globally without redesigning grading for valid alternative orders.
9. **The original MC bank has mixed purposes.** Some items recognize suffix spelling; others choose usage. E.g. `YH1-V36-Q017` explicitly requests -mA with accusative and then offers `meyi` alongside finite forms. That is a named-form recognition drill, not construction choice. `YH1-V64-Q013` supplies the -Ip family through context and tests harmony across ıp/ip/up/üp: legitimate spelling recognition, weaker than typing for independent production. Preserve all 588 items. Categorize their purpose in a future review rather than silently rewriting them. Exact prompt + unordered choice-text screening found no duplicated MC groups; this says nothing about semantic redundancy or correctness.

## Recommended task mix by lesson

“Replace” means replace a task design in a future implementation, not delete history or all existing questions. “Intro only” means retain in study guidance or a short explicitly scaffolded stage, with any results distinguished from independent interpretation.

| Lesson | Decision | Recommended progression |
|---|---|---|
| 1 Actions as nouns | Keep meaning and named infinitive production; move simple boundary spotting to intro | Meaning → form; boundary demonstration in guide |
| 2 Action nouns + case | Keep named-case production; replace generic boundary choices | Identify activity/main connection → produce requested ending; usage selection can live in 2B |
| 2B -mak versus -ma | Keep form choice and typed choice; revise weak translation distractors | Choose form → type form; meaning as selective support, not mandatory third track |
| 3 Own embedded subject | Highest priority: revise meaning, replace actor shortcut in structure | Read actor from agreement → distinguish actors across clauses → produce agreement |
| 4 Whole-clause case | Keep typed drill; replace repetitive generic structure distractors | Locate entire complement and predicate → distinguish inner/outer case → produce form |
| 5 Negation | Keep scope contrasts; merge duplicate actor/translation views where redundant | Decide what is negated → distinguish wanting actor/action actor → produce supplied target |
| 6 -DIK content | Keep interpretation and production; revise overt-genitive shortcuts | Embedded/main actors → contextual time versus nominalizer → form |
| 7 Future content | Keep viewpoint contrasts and production; revise actor-only items | Future from reporting viewpoint → actor roles → form |
| 8 Nominalizer choice | Keep choice and production; make meaning optional where repetitive | Wanted action versus reported nonfuture/future content → produce choice |
| 9 Subject relatives | Revise semantic giveaways; retain participle production | Identify described noun/relative actor with plausible alternatives → form |
| 10 Object relatives | Revise book-as-actor distractors and overt-pronoun shortcut | Relative actor versus head → compare subject/object relatives → form |
| 11A -Ip | Keep form drill; revise repetitive actor/tense explanation options | Interpret linked actions/shared actor → form; avoid claiming -Ip universally encodes strict sequence |
| 11B -ArAk | Meaning and manner analysis overlap; consolidate selected items | Manner versus sequence/overlap → form |
| 11C -mAdAn | Keep negation-scope contrast; merge duplicate paraphrase/structure items | Which action occurs/is omitted? → form; distinguish before-contexts carefully |
| 11D Before/after | Keep event order; remove duplicate translation/structure pairs | Order events from Turkish → produce requested expression |
| 11E When/once | Keep relation/actors, revise overt-subject-only shortcuts | Reference event and actors → form; avoid universal immediacy/causation claims |
| 11F While | De-emphasize base + ken attachment after introduction | Interpret overlap/actors → contrast connections; short attachment drill optional |
| 11G State/location -ken | Keep noun/location attachment and interpretation; simplify options | State/location setting and actors → form; no extra finite conjugation |
| 11H Time contrast | Replace label-matching structure task | Read relation from Turkish → choose expression for scenario → optional requested-form production |
| 12A Time assembly | Replace gapped actor analysis; keep guided assembly | Analyze complete clause relation/actors → assemble for intended meaning |
| 12B Noun-clause assembly | Keep actor/case boundary analysis; revise long options and labeled scaffold | Read whole-clause object/actors → select transformed complement → guided assembly |
| 12C Dative/ablative clauses | Keep inner/outer case target; parallelize options | Choose predicate-required outer case → analyze boundary → guided assembly |
| 12D Relative assembly | Keep head-case distinction; improve plausible role alternatives | Relative actor/head/main role → select modifier/head → guided assembly |
| 12E Relative complements | Keep inner versus outer role distinction; shorten parallel options | Recover inner to/in/from role → distinguish outer role → guided assembly |
| 12F Relative negation | Keep polarity contrast; reduce duplicated translation/scope questions | Identify negation in each clause → assemble intended polarity |

## Other practice families

| Family | Questions | Recommendation |
|---|---:|---|
| Case Forms | 50 | Keep named-case form drills, including accusative and genitive. Explicit case is necessary task definition, not a giveaway. Mixed cases require reading the requested target. |
| Pronoun case forms | 24 | Keep; irregular bana/sana and third-person n are meaningful production targets. |
| Possessive forms | 24 | Keep explicit owner/number: agreement production is the intended skill. Do not remove the owner and leave an underdetermined blank. |
| Genitive–possessive phrases | 20 | Keep two-word production; supplied relationship is needed. Later add construction contrasts separately. |
| Add case to possessed form | 72 | Keep as an intermediate drill; it deliberately does not test making the possessive base. |
| Build from base | 48 | Keep full chain production. Overlaps with add-case but removes a real scaffold, so not redundant. |
| Choose the Case | 74 | Keep joint case/form response; intended English meaning constrains e.g. source versus destination. Revise only item-specific weak contexts. Verb-selected cases offer strong practice beyond English-preposition matching. |
| Grammar Multiple Choice | 588 | Preserve unchanged; conduct a separate item-level editorial/linguistic review before proposing any rewrite. Some finite-form recognition overlaps Conjugation; flag for navigation/scope discussion, not deletion. |

## Implementation order

1. Redesign Lesson 3, Lesson 11H structure and Lesson 12A structure; introduce shorter parallel options across high-risk structure families.
2. Replace generic unit/main/whole-sentence boundary questions and implausible role distractors; selectively omit pronouns only where answers stay unambiguous.
3. Give lessons explicit supported task lists and their own recommended progression. Do not merely hide weak tasks in the focused dropdown while leaving them in Mix of everything.
4. Rebalance session selection: it currently assumes 12 questions, four per task, exactly three task types. Update task filtering, mixed sessions, review, registry, progress availability and UI labels together.
5. Preserve existing attempt snapshots and stable identity. A materially changed assessment should get a new question ID/version so older evidence is not represented as performance on a harder task. Retired IDs must remain import/export-safe; explicitly label legacy evidence if it cannot be mapped. Do not overwrite older backup data or credit supporting rules automatically.
6. Review MC separately, preserving the 588-question original bank. This audit does not justify deleting it or treating 1,464 unflagged objects as approved.

## Acceptance checks for a later implementation

- Each scored task has a one-sentence target skill and plausible errors tied to that skill.
- Try solving without the target ending/construction: if the answer survives, either mark it introductory or redesign it.
- Answers and pre-check cues reviewed together in focused and random modes; post-check feedback may explain fully.
- No random mixing of a new task with the same model's answer-revealing task within one session.
- Keep named construction/case requests for form drills; require inference only when that is the stated target.
- Third-person ambiguity, dropped-subject reference, equivalent Turkish expressions and flexible word order checked before changing grading.
- Strict Turkish typed grading, single scoring, correction identity, history and backup compatibility retained.
- Preserve all vocabulary/conjugation functionality. No finite conjugation drills added here.
- Browser tests cover at least one revised task from each affected family, task availability, mixed/review sessions and old backup import. Mechanical tests cannot certify teaching value; inspect rendered prompts/options as well.

## Verification for this audit

Read-only inventory: 1,836 unique IDs; family counts sum correctly. Generated CSV: one row per current ID. Selected structural flags cover 372 distinct rows; 1,464 have no selected-pattern flag. All 25 lessons appear in the recommendation table. No app files, answers or original bank contents changed. No merge or deployment requested or performed.
