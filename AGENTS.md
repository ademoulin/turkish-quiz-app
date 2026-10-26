# Instructions for coding agents — Quiz My Turkish

**Read [PROJECT_PLAYBOOK.md](PROJECT_PLAYBOOK.md) before planning or editing this repository.** It is the authoritative project charter, ledger, and workflow. Recheck the current code and PR state; the ledger can become stale.

## Nonnegotiables

- Optimize for independent Turkish production, linguistic fairness, and maintainability—not raw feature/question counts.
- Do not introduce new exercise formats or content expansions while stabilization is prioritized unless the user explicitly authorizes a change of scope.
- Prefer existing question, grading, presentation, and history mechanisms; avoid unnecessary abstractions and broad rewrites.
- Treat draft linguistic content and historical review flags as **unverified**, not confirmed errors.
- Preserve stable question IDs, learner progress, history compatibility, and import/export behavior.
- Create focused branches and PRs. Follow the risk-based merge authorization in `PROJECT_PLAYBOOK.md`; obtain explicit approval for significant or uncertain changes.
- Run relevant tests and report failures honestly. CI green does not certify Turkish correctness.
- Keep implementation and its matching test updates in the same coherent push whenever practical. Validate locally before pushing when the environment permits; do not knowingly push an incomplete implementation that will fail existing tests.
- Update the playbook ledger and link PR/test evidence when workstream status changes.
- Do not start a second implementation workstream until the current one is closed or explicitly paused.
- Separate **implemented**, **tested**, **linguistically reviewed**, and **closed** in all reports.

## Before every implementation

1. Identify the ledger item and inspect relevant code, tests, and open PRs.
2. State the problem, smallest proposed fix, acceptance criteria, and non-goals.
3. Confirm the requested scope; do not turn a discussion into an unsolicited feature.
4. Implement on a branch; verify grading, rendering, saved history, and regression tests where relevant.
5. Review the PR and follow the playbook's risk-based merge policy; seek explicit approval when required.

For documentation-only work, keep changes documentation-only.

## Autonomous execution and honest handoffs

- Within an explicitly approved workstream, continue through successive useful tasks without requiring a fresh user message after every commit, CI check, or progress update. A running CI job is not by itself a reason to stop if independent work remains.
- Before ending a development response, check whether the workstream is complete, explicit user authorization is needed, or a genuine blocker prevents **all** further useful work. Otherwise continue within the current response.
- Give progress updates without treating them as handoffs. At a real stopping point, report **What I'm waiting on** (name the precise approval, external result, or blocker; otherwise say Nothing) and **What I will do next**. Never imply work will run in the background after the response ends.
- Follow the playbook's risk-based approval boundaries and never silently expand implementation scope.

## Consistent development handoff

For approved work, carry out the next available safe step without waiting for a new user prompt. Complete implementation, review, tests, and eligible merges within the agreed scope. Preserve the existing approval boundaries and do not imply background work continues after a response.

End every substantive development response, including in a new chat, with this exact structure:

### SUMMARY:
- **What I'm waiting on:** Name the actual blocker or say Nothing.
- **What I will do next:** Name the next concrete action, or None — workstream complete.
