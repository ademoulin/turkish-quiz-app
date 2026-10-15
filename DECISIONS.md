# Decisions made for version one

These are minor implementation defaults, recorded so they can be changed after using the app.

- Accept either Turkish entry when its accepted English meanings overlap with the prompt's entry (for example, demek/söylemek for “say”). This is intentionally lenient; no fuzzy spelling matching or guessed external synonyms. The displayed English definition can contain more detail than the overlapping meaning.
- Treat `de / da` as two accepted Turkish variants. Do not split slash characters in English definitions automatically: “get off/out of” needs a deliberate override rather than treating “out of” as a complete meaning.
- Explicit Acceptable English overrides use only the pipe separator. Otherwise split commas/semicolons outside parentheses, and accept forms with parenthetical words included or omitted. Ignore leading “to” for verb meanings.
- Keep Turkish letter distinctions using Turkish-aware lowercase and Unicode normalization; ignore surrounding common sentence punctuation and repeated whitespace. Extra subject pronouns are not required or accepted in a conjugation answer: the field asks for the conjugated verb.
- Keep combined word-type codes and include them under matching simple-type filters. vt/i is a verb. Case information remains separate metadata for future exercises.
- A fixed-length session is capped at the selected entry count, with one question per entry. Each new conjugation session chooses fresh random forms; this avoids unexpectedly repeating vocabulary within a session.
- Retain hidden selections when filtering. “Select all matching” adds visible matches; “Clear matching” removes only visible matches.
- Ability + conditional combinations are deferred. If selected with other tenses, conditionals use ordinary forms and show no Ability badge. If ability-only settings select exclusively conditionals, explain the conflict before starting.
- The pattern English cue always uses “come”, labeled as an example. This avoids unreliable automatic English conjugation or translation of dictionary explanations.
- With an explicit onlar, accept the standard plural and singular-form predicates. For past continuous accept geliyorlardı, geliyordular, and geliyordu; for open conditionals accept gelirseler, gelirlerse, and gelirse.
- A manual correction changes the existing attempt's correctness and is counted once in both progress and the score. Its manual marker remains visible.
- Review mistakes by entry ID, direction, and grammatical combination. A later correct result resolves that combination; other difficult forms stay in the review pool.
- Preserve progress for deleted sheet IDs. Do not silently transfer it to a new ID. Imported attempts with matching attempt IDs replace those same attempts; other existing results remain.
- The source was uploaded to GitHub on your explicit instruction. GitHub Pages hosting was subsequently authorized. The gh-pages branch contains the compiled public site; GitHub repository Pages settings control publication. No analytics, paid services, or app accounts have been introduced.

- The word-type menu groups vt, vi, and vt/i under Verbs. Previously saved verb-type filters now show all verbs; sheet metadata stays unchanged.

- Interface and project documentation use American English, as requested; the user’s current location does not determine spelling preferences.

- Vocabulary familiarity uses four labels and a multi-select filter, with separate histories by direction. Mixed uses the weaker direction; conjugation does not contribute. Existing history contributes through conservative 30-minute-gap session estimates.
- Familiar requires 4 successful sessions over 2 days; Well known requires 12 over 3 days. Recent session evidence controls confidence and can demote a word after repeated misses. Repeated guesses in one session do not create extra positive evidence; manual corrections update original evidence. No time decay or automatic prioritization is introduced.
- Familiarity filters restrict the selected entries eligible for a new session, even if other entries were selected earlier. Hidden selections remain saved. Review mistakes intentionally retains its existing separate behavior.
