# Quiz My Turkish — Project Playbook

**Purpose:** Single source of truth for product goals, verified status, known risks, and future work. Read this before proposing or implementing changes.

**Last reviewed:** 2026-10-26. **Baseline:** `main`; documentation records current understanding, not a fresh exhaustive audit.

## Product charter

Quiz My Turkish helps a Turkish learner build accurate, independent production through focused, challenging practice. Keep it calm, usable, linguistically sound, and maintainable.

Principles:
1. **Production over recognition:** Prefer creating or completing Turkish forms and sentences to identifying labels or paraphrasing an explanation. Contextual form-selection can still be valuable.
2. **Quality over quantity:** Add content only for an identified learning gap; don't optimize for question counts.
3. **Fair Turkish:** Natural, correct examples and unambiguous prompts; accept reasonable alternatives where supported. Don't pretend a finite string matcher understands all valid Turkish.
4. **Simple architecture:** Reuse established question formats and grading paths. Prefer small, tested refactors over rewrites.
5. **Preserve learner data:** Question IDs, retired content, progress snapshots, and imports/exports require compatibility review.
6. **Risk-based merges:** Use branches and PRs. The user authorizes autonomous merges of low-risk changes within previously approved scope, subject to tests and review. Significant changes require explicit approval.
7. **Finish before expanding:** One active implementation workstream; ideas may be discussed without becoming work.

## Merge authorization (user approved 2026-10-25)

Low-risk changes within an already approved workstream (scoped bug fixes, minor UI changes, and carefully reviewed existing answer corrections) may be merged without separate approval **only after** inspecting the diff, confirming scope and compatibility, passing relevant automated checks, and reviewing linguistic/pedagogical implications as appropriate. Passing CI alone does not establish Turkish correctness.

Ask the user before merging new question batches, new exercise types, substantial lesson or curriculum changes, learner-data migrations or progress-affecting changes, or anything with unresolved linguistic uncertainty. When risk or authorization is unclear, ask. Report autonomous merges and evidence afterward. This is merge delegation, not permission to expand scope.

## Status vocabulary

- **Closed:** Implemented, verified against explicit acceptance criteria, and agreed finished.
- **Implemented / verification pending:** Code exists, but a specific quality or scope check remains.
- **Open:** A defined issue or review is outstanding.
- **Paused:** Work started but deliberately stopped.
- **Wishlist:** Not approved for implementation.
- **Unknown:** Insufficient evidence; investigate rather than guess.

Never equate CI passing with linguistic review or pedagogical quality.

## Current ledger

| ID | Workstream | Status | Evidence / next closure criterion |
| --- | --- | --- | --- |
| OFFLINE | Flight-ready offline PWA | Merged / release verification pending | PR #125 merged after 430 unit checks and 149 browser tests passed. User approved publication October 29 and clarified laptop use. Publish runs exposed long-walkthrough timeouts and intermittent eager cache cleanup. Follow-up retains current + previous resource downloads and bounds older caches, verifies the new controlling worker explicitly, and gives exhaustive 48-question tests 120 seconds without changing per-assertion limits. No grading/history changes. Device offline acceptance remains pending. |
| CORE | Vocabulary and conjugation app | Implemented | Operational; no redesign requested. Revalidate only when affected. |
| CURR | Advanced grammar lessons, Sections 3–5 | Implemented | Curriculum and productive exercises exist on main. |
| CLEAN | Remove low-value recognition/interpretation drills | Implemented | PR #90 merged with 14 additional low-value exercises retired; automated checks passed. Broader instructional review remains under QUALITY. |
| QUALITY | Remaining exercise difficulty and instructional value | Implemented / verification pending | PR #90 retired the eight subject-recognition items and six isolated Yeni Hitit 1 items; CI passed. Remaining pedagogical review is not an exhaustive manual inspection or linguistic correctness certification. |
| ARCH | Maintainability and test-contract stabilization | Implemented / verification pending | PR #91 hardens grammar-wide test contracts, small-pool selection, and history round-trip coverage; CI passed before final documentation edits. No production code changes. Broader architecture redesign remains out of scope. |
| YH1-RISK | Yeni Hitit 1 linguistic risk reconciliation | Merged / independent review outstanding | PR #92 merged as `03c25e84e4237139ea0bb21e1e5de89057e68c7b` after passing CI; five historical flags already retired and three versioned revisions implemented. Independent native-speaker review remains separate from CI. |
| ADV-LING | Advanced grammar linguistic validation | Merged / independent review outstanding | PR #93 merged as `9a380bf4e36bfa4049a6f7512939734b3e12c278`; 60 authored models desk-reviewed, temporal distractor rotation corrected, regression tests and CI passed. No confirmed grammar defects in sampled models; independent native-speaker review remains outstanding. See `docs/adv-ling-audit.md`. |
| PILOT-88 | Six typed full-sentence questions in Lesson 5.9 | Implemented / verification pending | Six typed sentences are active on main, with dictionary-form vocabulary cues, curated alternatives and a second attempt; PR #88 closed as superseded. PR #101 merged after CI and desk review, accepting natural -ken word order and optional final punctuation. E2E retry and storage tests exist; end-to-end mistake-review coverage is being added. Native-speaker certification is not required for this personal app; desk review is accepted by the user. |
| MIXED | Cross-lesson advanced grammar choice | Wishlist | Consider only after stabilization and evidence of learner need. |
| MULTI | Multi-construction full-sentence production | Wishlist | Consider only after pilot validation and evidence of learner need. |

### Historical references

- PR #86: Lesson 5.8 expansion, merged.
- PR #87: Playwright CI worker adjustment, merged.
- PR #88: Full-sentence pilot, closed as superseded by the newer implementation on main. PR #101: pilot grading fixes merged. PRs #102–103: autonomy and handoff instructions merged.
- PR #90: Low-value exercise retirement and initial test hardening, merged; CI passed.
- Previous active advanced question count on main: 733; **not a permanent acceptance criterion**.
- Separate Yeni Hitit 1 staging bank: 588 draft questions across 196 skills; verify live integration and current versions before drawing conclusions.

## Current priority and scope

**Current priority: finish PILOT-88 verification and remaining QUALITY audit.** The six full-sentence questions are implemented on main and desk-reviewed; PR #101 corrected two grading gaps. The user accepts assistant desk review as sufficient for this personal project; external native-speaker certification is optional rather than a blocking requirement. Finish targeted UI, retry, storage, and mistake-review validation before considering any new question batch. MIXED and MULTI remain unapproved wishlist items.

## Workstream record template

For every substantive change, record:
- **Problem and learner impact:**
- **Scope / explicit non-goals:**
- **Baseline evidence** (files, IDs, reproducible examples):
- **Decision and approval:**
- **PR / commits:**
- **Tests and review evidence:**
- **Remaining risks:**
- **Closure decision / date:**

Update ledger statuses only when evidence warrants it. Link concrete issues rather than repeatedly writing new high-level audits.

## Development and review protocol

1. Read `AGENTS.md`, this playbook, relevant source, and existing open PRs.
2. Confirm the request's workstream, its status, and whether a similar change already exists.
3. For implementation, define acceptance criteria and smallest safe scope; ask approval before broadening.
4. Use a dedicated branch/PR. Follow the risk-based merge policy below.
5. Complete the implementation and corresponding tests before pushing. Run appropriate available local typecheck, unit, integration, and browser tests; inspect failures and resolve known breakage before publishing when feasible. If local execution is unavailable, disclose that limitation and rely on CI for verification.
   - Prefer one coherent commit/push per logical change (implementation + tests + related documentation). Avoid back-to-back pushes of a knowingly incomplete state solely to trigger CI twice.
   - CI remains the independent gate. Unexpected failures must stay visible and be diagnosed; do not skip checks, suppress failures, or assume a green run on a different SHA validates the current head.
6. Validate every new/changed question through display, grading, answer alternatives, persistence, and mistake review. Check backward compatibility.
7. Treat automated tests as code evidence, not native-speaker linguistic certification. Record uncertain Turkish explicitly.
8. Report exactly what was implemented, tested, linguistically reviewed, and still open.
9. Update this ledger in the same PR when status materially changes. Do not mark a task closed based only on intent or passing CI.

## Decision guardrails

- No new lessons, question banks, or exercise types while stabilization is the agreed priority.
- Don't silently replace old exercises with more of the same low-value recognition tasks.
- Avoid fragile hard-coded question counts unless a count is the behavior being tested.
- Historical staging files are not proof of current live defects.
- Preserve the distinction between **missing coverage**, **review risk**, and **confirmed bug**.
- If a requested change risks significant new complexity, surface alternatives and tradeoffs before coding.

## Autonomous execution and honest handoffs

- Within an explicitly approved workstream, continue through successive useful tasks without requiring a fresh user message after every commit, CI check, or progress update. A running CI job is not by itself a reason to stop if independent work remains.
- Before ending a development response, check whether the workstream is complete, explicit user authorization is needed, or a genuine blocker prevents **all** further useful work. Otherwise continue within the current response.
- Give progress updates without treating them as handoffs. At a real stopping point, report **What I'm waiting on** (name the precise approval, external result, or blocker; otherwise say Nothing) and **What I will do next**. Never imply work will run in the background after the response ends.
- Follow the risk-based merge policy; never silently expand implementation scope.

## Consistent development handoff

For approved work, carry out the next available safe step without waiting for a new user prompt. Complete implementation, review, tests, and eligible merges within the agreed scope. Preserve the existing approval boundaries and do not imply background work continues after a response.

End every substantive development response, including in a new chat, with this exact structure:

### SUMMARY:
- **What I'm waiting on:** Name the actual blocker or say Nothing.
- **What I will do next:** Name the next concrete action, or None — workstream complete.

## Resume previously committed next actions

When the user returns with a status update that resolves the last reported blocker (for example, "CI passed"), treat it as the signal to resume and execute the previously stated **What I will do next** action automatically. First independently verify the status and current repository state. Do not respond with only a status acknowledgement or ask for a redundant confirmation. Exceptions: the user says stop, changes scope, a new safety/merge-approval boundary applies, or verification reveals a genuine blocker. The same rule applies across chats when the previous plan can be established from the project ledger or conversation context.

### OFFLINE — October 29, 2026

User explicitly prioritized offline flight practice; existing curriculum work is
paused for this isolated infrastructure change. No exercise content, grading,
history schema or IDs change. The vocabulary snapshot is verbatim public CSV;
newer valid cached Sheet downloads retain priority. No learner-data migration,
cloud sync, background sync or unfinished-session persistence.

Acceptance: complete cached app opens at /turkish-quiz-app/ with no network, all
practice families remain available, answered results survive reopening, failed
installs never report ready, updates leave active answers alone. Real iPhone
Home Screen/airplane-mode verification remains a user-device acceptance check.

Release follow-up: retain two successful downloads to protect outgoing workers;
remove older versions only. This costs one additional app download in storage.
Keep all original browser assertions; increase only the total budget for two
48-question walkthroughs after repeated CI timeouts. No deployment check bypass.
