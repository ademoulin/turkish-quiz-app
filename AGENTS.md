# Instructions for coding agents — Quiz My Turkish

**Read [PROJECT_PLAYBOOK.md](PROJECT_PLAYBOOK.md) before planning or editing this repository.** It is the authoritative project charter, ledger, and workflow. Recheck the current code and PR state; the ledger can become stale.

## Nonnegotiables

- Optimize for independent Turkish production, linguistic fairness, and maintainability—not raw feature/question counts.
- Do not introduce new exercise formats or content expansions while stabilization is prioritized unless the user explicitly authorizes a change of scope.
- Prefer existing question, grading, presentation, and history mechanisms; avoid unnecessary abstractions and broad rewrites.
- Treat draft linguistic content and historical review flags as **unverified**, not confirmed errors.
- Preserve stable question IDs, learner progress, history compatibility, and import/export behavior.
- Create focused branches and PRs. **Never merge a PR without the user's explicit approval.**
- Run relevant tests and report failures honestly. CI green does not certify Turkish correctness.
- Update the playbook ledger and link PR/test evidence when workstream status changes.
- Do not start a second implementation workstream until the current one is closed or explicitly paused.
- Separate **implemented**, **tested**, **linguistically reviewed**, and **closed** in all reports.

## Before every implementation

1. Identify the ledger item and inspect relevant code, tests, and open PRs.
2. State the problem, smallest proposed fix, acceptance criteria, and non-goals.
3. Confirm the requested scope; do not turn a discussion into an unsolicited feature.
4. Implement on a branch; verify grading, rendering, saved history, and regression tests where relevant.
5. Return a PR for user review; do not merge.

For documentation-only work, keep changes documentation-only.
