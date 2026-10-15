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

A session asks one question per selected entry, up to 10, 20, or all selected entries. Selecting only one verb produces one question; start another session for another randomly selected form. All forms come from your selected settings. Mixed mode chooses vocabulary or conjugation randomly for verbs; non-verbs always get vocabulary questions.

## Update vocabulary

[Open the source sheet](https://docs.google.com/spreadsheets/d/1JrqWacx9e4RH7yhk7dlpPTLr68YwNS5n4L38mQHo8Yo/edit). The app reads **Sheet1**.

| Column                                     | How to use it                                                                                                                                                               |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ID`                                       | Required unique, permanent ID such as `v00001`. Keep it through edits/sorting; never reuse a deleted ID. Use a new ID for a different meaning you want to study separately. |
| `Verb` or `Turkish`                        | Required Turkish word or phrase. Different entries may share a spelling.                                                                                                    |
| `Type`                                     | Required. Verbs: `vt`, `vi`, `vt/i`. Other labels currently include `adv`, `adj`, `n`, `conj`, `interj`, `postp`, and combined labels such as `adv/n`.                      |
| `Meaning`                                  | Required display definition. Simple comma/semicolon alternatives become accepted English answers. Text in parentheses is optional.                                          |
| `Case`, `Case Notes`                       | Optional metadata for future case exercises; not inferred from transitivity.                                                                                                |
| `Acceptable English` or `Accepted English` | Optional authoritative override, with alternatives separated by `\|`. Leave blank to use automatic alternatives from Meaning.                                               |

Reload the app or choose **Refresh vocabulary** after editing. No rebuild is needed. A successful refresh is cached with its timestamp. A failed refresh uses that cached download and says so. Empty rows are ignored; malformed rows and duplicate IDs are flagged and skipped. A failed/invalid whole-sheet response does not replace the cache. Treat complex definitions with slashes or explanatory clauses as candidates for an explicit accepted-answer override.

The live Google CSV endpoint was verified from a real Chromium browser. The existing public viewing permission worked; **Publish to web was not required**. If permissions later change, restore public viewing access or use the previous cached vocabulary. The app never modifies sharing or sheet data.

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

Validation completed: **175 unit checks**, **8 browser checks**, and the production build passed. Browser checks include a 390px mobile viewport; the initial direct-local-file check was blocked by browser policy and is not claimed as passed.

See [DECISIONS.md](DECISIONS.md) for grading and scope choices.
