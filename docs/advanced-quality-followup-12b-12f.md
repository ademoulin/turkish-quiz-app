# Advanced grammar quality follow-up — 12B–F

Status: targeted source-level design review (2026-10-26); **no question changes**.

## Scope and evidence

Read current authored model definitions in `src/verbNounNounClauseBuilding.ts`, `src/verbNounRelativeBuilding.ts`, `src/verbNounRelativeRoles.ts`, and `src/verbNounRelativeNegation.ts`, together with the previous `docs/grammar-exercise-audit.md` and `docs/grammar-audit-third-pass.md`. This pass is a **source sample**, not an exhaustive option-by-option or browser-rendered audit.

## Observations

1. **12B noun-clause building:** Authored examples contrast `-mA` complements of `istemek` with `-DIK/-AcAK` content complements of `bilmek`. The source's alternative phrases deliberately change the nominalization; that is a meaningful contrast. However, the authored `otherMeanings` often contrast both predicate and actor (for example, “I want you to read this book” vs. “You want me to read this book”). Check the *rendered* structure choices before judging whether actor recognition alone can solve them. No confirmed incorrect answer identified.
2. **12D relative building:** The source models explicitly cross relative construction (`-(y)An`, `-DIK`, `-(y)AcAK`) with the head noun's **outer** case. Example: `Şu anda kapıda bekleyen kadını` correctly distinguishes the woman doing the waiting from the accusative object of `tanıyoruz`. This is valuable nested-role practice. Some `otherMeaning` options change the relative actor or event; inspect their rendered balance and whether they are plausible, rather than assuming every role contrast is a giveaway.
3. **12E relative roles:** Source models explicitly distinguish **inner** role (`öğretmene telefon etmek`) from **outer** head case (`öğretmeni tanımak`). Preserve this high-value distinction. The `wrongHead` form in the teacher example is the inner dative (`öğretmene`), a plausible learner error rather than a random distractor. Avoid blanket shortening that removes the inner/outer contrast.
4. **12F relative negation:** Source models vary polarity in both relative and main clauses (e.g., `oynamayan ... evde`, `gelen ... tanımıyoruz`). The two-negation-scope distinction is instructionally meaningful. Some English alternatives simply flip one polarity; inspect rendered cues to ensure the task requires reading Turkish rather than locating an English keyword.

## Priority next check

Inspect the **actual generated structure options and pre-check presentation** for 12B–F, with special attention to whether correct answers are conspicuously longer, actor roles are overtly disclosed, or explanations appear before submission. Classify each confirmed issue as (a) pedagogical shortcut, (b) genuine ambiguity, or (c) harmless introductory scaffolding. Only then propose targeted, versioned replacements; preserve old question IDs and progress snapshots. This audit does not authorize new question batches or curriculum changes.

## Verification boundary

No live learner performance data or native-speaker review was used. User has accepted assistant desk review as sufficient for this personal app. This is not a certification of all generated options.

## Active-question pipeline verification (2026-10-26)

**Correction to the initial source-level concern:** the long, explanation-heavy `structureAnswer` and `structureDistractors` authored in `src/verbNounNounClauseBuilding.ts` **are not the live 12B structure choices**. `src/lessonRedesign.ts` calls `refineNounClauseBuilding` and later retires 12B meaning/structure tasks in its productive-only pass. Active 12B practice retains guided `build` questions (versioned `-v2`), not the source's verbose analysis MC. Do **not** file a defect against those retired choices.

Likewise, `refineRelativeBuilding` and `refineRelativeRoles` prepare shorter, parallel analysis choices, but `lessonRedesign.ts` then retires non-blanked relative `meaning` and `structure` tasks. Active 12D–F exercises instead include guided `build` and separately authored targeted completion items from `relativeBuildingCompletionExpansion.ts`, `relativeRoleCompletionExpansion.ts`, and `relativeNegationCompletionExpansion.ts`.

### Current live design, based on source flow

- **12B:** guided chunk assembly with stable versioned questions; long actor-analysis answers are historical only.
- **12D:** targeted modifier completion, alternating Turkish-choice and typed production; distractors contrast tense, relative actor, and polarity. 
- **12E:** typed relative modifier and Turkish head-case selection; distractors include the embedded-case form, the bare noun, and an alternate outer case, deduplicated when identical.
- **12F:** typed relative-description completion and Turkish predicate polarity choice; the latter is a binary contrast rather than a verbose grammatical analysis.

### Remaining audit risks

1. **12D distractor validity:** Some alternate participles can be grammatical in isolation; verify each *complete intended meaning + frame* rules them out. Do not assume that a string being different makes it invalid.
2. **12E case-choice uniqueness:** Verify case distractors against the full supplied predicate and clause context, not only their suffix shape. Preserve legitimate distinctions between inner and outer case.
3. **12F polarity difficulty:** Binary polarity selection may be easy when the English intended meaning explicitly includes “not.” This is potentially valid beginner scaffolding, not a confirmed defect; prioritize production questions when assessing mastery.
4. **UI and registry:** The source-flow inspection establishes which objects are active but does not replace a rendered browser inspection or live learner error data.

**Disposition:** No confirmed new live defect or authorized content change from this pass. Continue item-level and rendered-choice validation before editing questions. The initial 12B concern is resolved as an audit false positive, not a production bug.
