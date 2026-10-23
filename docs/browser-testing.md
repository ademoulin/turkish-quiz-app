# Browser checks and content coverage

Routine checks run the complete fast test suite, validate the original 588-question bank, build production, then exercise browser interactions. The app and question content are unchanged by this maintenance work.

## Routine versus exhaustive browser checks

`npm run test:e2e` runs the routine suite. Eleven repetitive per-model lesson walkthroughs have the `@bank-walkthrough` tag and are replaced in routine runs by nine short representative lesson tests. These cover each available choice/typed/assembly interaction, delayed feedback, keyboard/touch input, disabled incomplete answers, chunk undo/reset/clear, score locking, completion, correction identity and reload persistence. Existing mixed-session, random, progress, backup, spelling, navigation and Pages/sandbox regressions still run.

Fast tests continue checking all lesson data and generation/balance rules. `src/lessonBankGrading.test.ts` additionally exercises every current question's correct answer, all supplied wrong choices or unused chunk substitutions, empty/duplicate checks, saved snapshots and manual corrections. UI samples do not replace linguistic content review.

For all original walkthroughs as well as the samples, run:

```sh
UI_FULL_BANK=1 npm run test:e2e
```

Or dispatch **Grammar integration checks** in GitHub Actions and select **Also run exhaustive per-question browser walkthroughs**. Routine discovery: 127 tests. Full discovery: 138 tests. The exhaustive tests are retained, not deleted.

## CI setup

- Pin the runner to `ubuntu-24.04`, which includes stable Chrome and its system dependencies. `PLAYWRIGHT_CHANNEL=chrome` uses Playwright's supported branded-browser channel; `google-chrome --version` records the actual runner browser. No repeated apt/browser installation and no Playwright dependency downgrade. The runner's stable Chrome can update independently of the npm lockfile.
- Local runs retain the existing `CHROMIUM_PATH` / system Chromium / Playwright-managed browser fallback unless a channel is explicitly selected.
- Build production once before browser checks. CI sets `PLAYWRIGHT_REUSE_BUILD=1`, so the Pages preview server serves that existing build. Normal local runs still build automatically. The grammar-preview build remains separate and runs after browser checks.
- Two CI workers run independent tests, including tests within a file, in parallel. Each test retains Playwright's isolated browser context/storage. No retries or reduced assertions mask failures.

Timing comparisons belong in the PR with workflow links and job/step durations. Compare setup, browser execution and total job time separately; runner/network variance means one run is evidence, not a fixed performance guarantee.
