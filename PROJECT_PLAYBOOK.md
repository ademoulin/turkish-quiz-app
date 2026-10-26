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
6. **No unauthorized merges:** Changes belong in a branch and PR. The user explicitly approves merges.
7. **Finish before expanding:** One active implementation workstream; ideas may be discussed without becoming work.

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
| CORE | Vocabulary and conjugation app | Implemented | Operational; no redesign requested. Revalidate only when affected. |
| CURR | Advanced grammar lessons, Sections 3–5 | Implemented | Curriculum and productive exercises exist on main. |
| CLEAN | Remove low-value recognition/interpretation drills | Implemented | PR #90 merged with 14 additional low-value exercises retired; automated checks passed. Broader instructional review remains under QUALITY. |
| QUALITY | Remaining exercise difficulty and instructional value | Implemented / verification pending | PR #90 retired the eight subject-recognition items and six isolated Yeni Hitit 1 items; CI passed. Remaining pedagogical review is not an exhaustive manual inspection or linguistic correctness certification. |
| ARCH | Maintainability and test-contract stabilization | Implemented / verification pending | PR #91 hardens grammar-wide test contracts, small-pool selection, and history round-trip coverage; CI passed before final documentation edits. No production code changes. Broader architecture redesign remains out of scope. |
| YH1-RISK | Yeni Hitit 1 linguistic risk reconciliation | Implemented / verification pending | PR #92 reconciles 34 historical flags: five already retired, 29 potentially active reviewed, three versioned editorial revisions with history tests. CI and independent naturalness review remain gates; not a certification of the full bank. |
| ADV-LING | Advanced grammar linguistic validation | Open | Authored questions carry `draft_needs_independent_review`. Prioritize subject reference in temporal clauses, relative roles/cases, nominalization/agreement, and alternative valid answers; distinguish suspected risks from confirmed errors. |
| PILOT-88 | Six typed full-sentence questions in Lesson 5.9 | Paused | Draft PR #88 has failing unit tests (11 in initial run). Do not merge or resume without explicit decision. |
| MIXED | Cross-lesson advanced grammar choice | Wishlist | Consider only after stabilization and evidence of learner need. |
| MULTI | Multi-construction full-sentence production | Wishlist | Consider only after pilot validation and evidence of learner need. |

### Historical references

- PR #86: Lesson 5.8 expansion, merged.
- PR #87: Playwright CI worker adjustment, merged.
- PR #88: Full-sentence pilot, draft/paused.
- PR #90: Low-value exercise retirement and initial test hardening, merged; CI passed.
- Previous active advanced question count on main: 733; **not a permanent acceptance criterion**.
- Separate Yeni Hitit 1 staging bank: 588 draft questions across 196 skills; verify live integration and current versions before drawing conclusions.

## Current priority and scope

**Current active task: YH1-RISK PR #92.** PR #91 is merged. Review and verify the three versioned editorial changes and the historical 34-flag reconciliation, preserve old results, and finish CI before requesting merge approval. Next: ADV-LING, a separate advanced grammar linguistic review.

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
4. Use a dedicated branch/PR. Do not merge without explicit user permission.
5. Run appropriate typecheck, unit, integration, and browser tests; inspect logs, not just the status badge.
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
