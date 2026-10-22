# Grammar audit implementation: first pass

Implements the three highest-priority designs from the 2026-10-22 audit. No publication is authorized by this implementation request.

## Try it

Grammar practice → Verb nouns and clauses:

- Lesson 3 → Read the actor from the ending. Eight questions omit first/second-person genitive pronouns. E.g. `Gelmem önemli.` asks for the meaning; the ending supplies the actor. The separate typed track retains twelve explicit agreement targets, including all six persons. Mixed practice uses six interpretation and six production tasks from different models.
- Lesson 11H → Read the time connection. The complete Turkish sentence is visible; no intended English translation or requested timing appears. Four parallel relationship options assess the expressed connection. Typed practice still explicitly requests a connection, avoiding accidental rejection of alternative paraphrases.
- Lesson 12A → Unpack the structure. The full Turkish sentence is visible. Choices distinguish timing and the two actors; one distractor changes the connection and another reverses the actors. Guided assembly is unchanged.

All revised tasks use the same objects and cues in Mix of everything. Correct answers and reasoning remain behind checking; original manual-correction behavior is retained.

## Evidence compatibility

Eight revised Lesson 3 interpretations and 24 revised time/clause interpretations get new IDs. The 48 original interpretation tasks are retired from playable pools. Retired attempts remain in history/backups and display as earlier-version checks in grammar progress, excluded from current independent statistics and current mistake review. The saved-practice filter includes lessons with earlier checks. Unknown unrelated IDs retain the existing unlinked-history behavior. No existing attempts are rewritten.

There are 920 current lesson tasks instead of 936: Lesson 3 drops its redundant structure track and four third-person interpretation items. Third-person forms remain in production; interpretation of their referents needs richer discourse context and should not be manufactured by deleting pronouns. Newly authored draft status and pending independent linguistic review remain honest.

## Preserved

The 588 original MC questions, all 238 typed noun/form questions and all 74 case-choice questions remain byte-for-byte equivalent as question objects. Unaffected lesson objects and all typed/assembly targets also remain equivalent. Strict Turkish spelling, corrections, storage key, version-1 backup format, vocabulary, conjugation, routing and deployment configuration are unchanged.

## Next recommended implementation

Replace the generic action-chunk/main-verb/whole-sentence tasks in Lessons 1–2 with a brief unscored introduction or genuinely competing clause-boundary/role choices. Then revise relative-clause and converb distractors: avoid impossible book-as-reader choices and keep correct/wrong options parallel in length and detail. Apply availability, review, random and evidence-versioning infrastructure introduced here to those edits. Preserve the original MC bank for a separate item-level review.
