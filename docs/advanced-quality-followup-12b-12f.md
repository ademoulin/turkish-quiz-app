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
