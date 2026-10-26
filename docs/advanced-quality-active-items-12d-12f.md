# Active 12D–F item-level desk audit — 2026-10-26

## Source and scope

Reviewed all 24 authored 12D relative-building completion rows in `src/relativeBuildingCompletionExpansion.ts`, and the full 12E/12F completion generator logic in `src/relativeRoleCompletionExpansion.ts` and `src/relativeNegationCompletionExpansion.ts`. Compared the intended English meanings, Turkish blank frames, answer keys, alternate choices, and task parity. The 12E/12F generators derive their content from 12 source models each; this pass inspected their **construction logic**, not all 48 rendered question objects. No browser render or external native-speaker certification is claimed.

## 12D: 24 authored completion rows

- All 24 provide an intended English meaning and Turkish sentence with one missing relative modifier. Twelve even-indexed rows offer Turkish MC choices; twelve odd-indexed rows request typed completion. Each MC row has one keyed modifier and three alternate modifiers.
- The authored distractors contrast relative actor, time reference, or polarity, e.g. `arayan` versus `aradığım / arayacak / aramayan`, and `okuyacağımız` versus `okuduğumuz / okuyacağımı / okumayacağımız`. In the reviewed examples, the intended meaning disambiguates the key; a different participle may still be grammatically possible as a standalone sentence, but expresses a different message.
- The intended English translation is displayed before the answer, so these questions test **form selection for a specified meaning**, not inference of meaning from Turkish alone. This is deliberate and should not be counted as a giveaway unless the stated learning objective changes.
- Editorial watchpoint: examples such as `Yarın burada ___ doktora soru sordum` combine a past main event with a future relative event. This is grammatically interpretable (asking a question of a doctor who will work there tomorrow), but may be cognitively distracting; not a confirmed invalid key.

## 12E: relative roles generator

- For each of 12 source models, one typed modifier and one MC head-case question are generated (24 total). MC distractors are deduplicated from wrong-case, bare-head and inner-case forms. This appropriately tests the **outer** head case rather than just copying the embedded case.
- **Watchpoint, not a proven defect:** when inner and outer cases match, deduplication can yield fewer choices. Verify rendered choice counts and the predicate-specific uniqueness of each surviving option before rewriting any questions. Never add a grammatically valid extra distractor merely to force a fixed option count.

## 12F: relative negation generator

- For each of 12 source models, one typed relative modifier and one binary MC main-predicate choice are generated (24 total). The MC choice contrasts the intended main-predicate polarity with its authored opposite.
- Binary polarity is a low-complexity recognition task compared with typed modifier production, but it is not automatically defective. Consider it supportive scaffolding; assess mastery primarily through typed relative-clause production and guided assembly.

## Disposition and next check

No confirmed wrong answer or unfair rejection from this source inspection. **No learner-facing changes justified yet.** Next validate the complete 12E/12F generated options for duplicate/degenerate choices, then run browser checks for option counts, prompt clarity, and retry/progress behavior. If an actual flaw is found, version materially changed assessments and preserve historical IDs. Existing question content and learner history are unchanged by this review.
