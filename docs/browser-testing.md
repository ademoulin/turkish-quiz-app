# Browser checks and content coverage

Every PR runs the complete fast test suite, validates the original 588-question bank and builds production. Browser coverage is selected conservatively from changed files. The app and question content are unchanged by this maintenance work.

## Routine versus exhaustive browser checks

`npm run test:e2e` runs the routine suite. Eleven repetitive per-model lesson walkthroughs have the `@bank-walkthrough` tag and are replaced in routine runs by nine short representative lesson tests. These cover each available choice/typed/assembly interaction, delayed feedback, keyboard/touch input, disabled incomplete answers, chunk undo/reset/clear, score locking, completion, correction identity and reload persistence. Existing mixed-session, random, progress, backup, spelling, navigation and Pages/sandbox regressions still run.

Fast tests continue checking all lesson data and generation/balance rules. `src/lessonBankGrading.test.ts` additionally exercises every current question's correct answer, all supplied wrong choices or unused chunk substitutions, empty/duplicate checks, saved snapshots and manual corrections. UI samples do not replace linguistic content review.

For all original walkthroughs as well as the samples, run:

```sh
UI_FULL_BANK=1 npm run test:e2e
```

Or dispatch **Grammar integration checks** in GitHub Actions and select **Also run exhaustive per-question browser walkthroughs**. Use `npx playwright test --list` (or `UI_FULL_BANK=1 npx playwright test --list`) for current counts. The exhaustive tests are retained, not deleted.

## CI setup

- Pin the runner to `ubuntu-24.04`, which includes stable Chrome and its system dependencies. `PLAYWRIGHT_CHANNEL=chrome` uses Playwright's supported branded-browser channel; `google-chrome --version` records the actual runner browser. No repeated apt/browser installation and no Playwright dependency downgrade. The runner's stable Chrome can update independently of the npm lockfile.
- Local runs retain the existing `CHROMIUM_PATH` / system Chromium / Playwright-managed browser fallback unless a channel is explicitly selected.
- Build production once before browser checks. CI sets `PLAYWRIGHT_REUSE_BUILD=1`, so the Pages preview server serves that existing build. Normal local runs still build automatically. The grammar-preview build remains separate and runs after browser checks.
- Two CI workers run independent tests, including tests within a file, in parallel. Each test retains Playwright's isolated browser context/storage. No retries or reduced assertions mask failures.

Timing comparisons belong in the PR with workflow links and job/step durations. Compare setup, browser execution and total job time separately; runner/network variance means one run is evidence, not a fixed performance guarantee.

## Narrow PR checks and release verification

`scripts/browser-checks.mjs` has an explicit three-file allowlist:

| Changed content | Browser coverage (plus shared layout checks) |
|---|---|
| `src/lessonGuides.tsx` | Numbered navigation, representative lesson interactions and lesson-specific checks |
| `src/clauseCaseFeedback.ts` | All clause-case choices, random review and lesson-specific checks |
| `src/grammarMcRevisions.ts` | Revised MC sessions, legacy results, random/progress and backup checks |

Multiple edits combine their checks. Existing edited browser specs are included.
Documentation and unit-test-only edits skip browser execution; all fast checks and
builds still run. Changed/deleted files outside the allowlist, missing diff data,
shared UI, grading, storage, registry, dependencies and workflow changes run the
full routine suite. No inferred dependency graph or new test framework is used.

PR checkout includes base/head commits so the selector examines the whole PR,
not just the final commit. A workflow dispatch always runs the full routine suite;
`full_bank_ui` additionally includes exhaustive walkthroughs as before.

Local targeted example (production builds automatically as before):

```sh
node scripts/browser-checks.mjs src/grammarMcRevisions.ts
```

With no file arguments or PR diff environment, the same command runs the full
routine suite. The selected scope and files are printed in the workflow log.

**Publishing now runs the full routine browser suite before deploying**, alongside
unit tests and the production build. A browser failure blocks the upload. This
shifts full verification to releases for narrow edits; it does not eliminate it.
Release publication therefore includes the roughly three-minute browser run.
Unknown/shared changes still receive full browser checks at both PR and release.
