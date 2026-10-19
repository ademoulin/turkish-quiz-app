# Codex implementation brief — Yeni Hitit 1 grammar quiz

## Goal
Integrate the supplied `yeni_hitit_1_codex_staging_v82.json` into the existing Turkish quiz app repository. Preserve existing navigation, visual styling, and working quiz modes. This is **practice/testing**, not a lesson-writing project.

## Inputs and trust
- Dataset is a **draft**, not native-speaker-certified. It contains 588 questions across 196 skills. The six unverified word-stress questions and their two skills are intentionally omitted.
- The full 594-question editorial master (`yeni_hitit_1_question_bank_v81.json`) is for audit/history, **not** for runtime import.
- Do not silently restore excluded questions, invent replacement questions, or describe the bank as verified.
- Keep quiz content behind a development/preview flag until an explicit release approval.

## Runtime schema
Top level: `schema_version`, `dataset_version`, `source_version`, `review_status`, `questions`.
Each question: `id`, `section`, `skill_id`, `type` (currently `single_select`), `prompt`, `options` (array of `{id,text}`), `correct_option_id`, `explanation`.

## Implementation requirements
1. Inspect the repository and its existing question models, routes, persistence, and tests before editing. Map the dataset into the existing app architecture; do not rebuild the app.
2. Import JSON as a versioned static asset, with stable question IDs. Validate on build: IDs unique; exactly four unique options; valid answer key; nonempty prompt/explanation; no prosody exclusions reintroduced.
3. Render prompt and four choices; select once; submit/check; show correct/incorrect state, correct answer and **brief existing explanation**; allow next question. Never expose the answer before submission.
4. Support choosing a section or skill when consistent with existing UI. Randomize question order, optionally option order, **without breaking correct-option mapping**. Avoid repeat questions within a session until pool exhaustion.
5. Scoring: count one attempt per question, prevent double scoring, display correct/attempted; allow restart. Preserve existing progress storage conventions if present.
6. Treat the content as text, not HTML. Escape user-facing content and support Turkish characters/apostrophes/diacritics on desktop and mobile.
7. Respect existing GitHub Pages base path and static asset routing. Do not break other quiz content.
8. Add tests for schema validation, answer mapping after shuffling, duplicate submission, section filtering, empty/unknown skill, session completion and reset, and excluded-question absence.

## Acceptance criteria
- App builds and existing tests pass.
- 588 draft questions available in preview, 196 skills, 3 variants each.
- All four options render and only the correct answer scores as correct.
- Turkish text renders correctly; keyboard/touch interactions work; mobile layout is usable.
- GitHub Pages build/path works in preview.
- No public launch or production-ready claim without explicit approval after independent linguistic review.

## Do not spend time on
Rewriting explanations, generating extra questions, complex analytics, or broad curriculum restructuring. Flag any actual content defects you encounter with question IDs instead of improvising corrections.
