import React, { useEffect, useRef, useState } from "react";
import { shuffle } from "./shuffle";
import {
  caseQuestions,
  concepts,
  recordPilot,
  correctPilot,
  pilotMistakes,
  selectPilotQuestions,
  type CaseSelection,
  type TypedQuestion,
  type PilotAttempt,
} from "./casePilot";
import {
  possessiveConcepts,
  possessiveQuestions,
  selectPossessiveQuestions,
  possessiveMistakes,
  type PossessiveSelection,
} from "./possessives";
type Props = {
  family?: "cases" | "possessives";
  attempts: PilotAttempt[];
  updateAttempts: (update: (a: PilotAttempt[]) => PilotAttempt[]) => void;
};
export function CasePilot({
  attempts,
  updateAttempts,
  family = "cases",
}: Props) {
  const possessive = family === "possessives";
  const prefix = possessive ? "possessive" : "pilot";
  const labels: Record<string, string> = possessive
    ? possessiveConcepts
    : concepts;
  const bank = possessive ? possessiveQuestions : caseQuestions;
  const knownIds = new Set(bank.map((q) => q.id));
  const familyAttempts = attempts.filter((a) => knownIds.has(a.questionId));
  const required = possessive ? "Required owner" : "Required case";
  const [concept, setConcept] = useState<CaseSelection | PossessiveSelection>(
    possessive ? "possessive_ben" : "locative",
  );
  const [questions, setQuestions] = useState<TypedQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [practiceMode, setPracticeMode] =
    useState<NonNullable<PilotAttempt["practiceMode"]>>("single_case");
  const mistakes = possessive
    ? possessiveMistakes(attempts, concept as PossessiveSelection)
    : pilotMistakes(attempts, concept as CaseSelection);
  const sessionId = useRef("");
  const input = useRef<HTMLInputElement>(null);
  const checkButton = useRef<HTMLButtonElement>(null);
  const locked = useRef(false);
  const q = questions[index];
  const results = attempts.filter((a) => a.sessionId === sessionId.current);
  const feedback = q && results.find((a) => a.questionId === q.id);
  useEffect(() => {
    if (q && !feedback) input.current?.focus();
    else if (feedback) checkButton.current?.focus();
  }, [q, feedback]);
  function start(review = false) {
    const pool = review
      ? shuffle<TypedQuestion>(mistakes)
      : possessive
        ? selectPossessiveQuestions(concept as PossessiveSelection)
        : selectPilotQuestions(concept as CaseSelection);
    if (!pool.length) return;
    sessionId.current = crypto.randomUUID();
    setPracticeMode(
      review
        ? "mistake_review"
        : concept === "mixed"
          ? possessive
            ? "mixed_possessives"
            : "mixed_cases"
          : possessive
            ? "single_possessive"
            : "single_case",
    );
    setIndex(0);
    setAnswer("");
    locked.current = false;
    setQuestions(pool);
  }
  function check() {
    if (!q || feedback || locked.current || !answer.trim()) return;
    locked.current = true;
    updateAttempts((a) =>
      recordPilot(a, q, answer, sessionId.current, practiceMode),
    );
  }
  function insert(c: string) {
    const el = input.current;
    const start = el?.selectionStart ?? answer.length;
    const end = el?.selectionEnd ?? start;
    setAnswer(answer.slice(0, start) + c + answer.slice(end));
    requestAnimationFrame(() => {
      el?.focus();
      el?.setSelectionRange(start + 1, start + 1);
    });
  }
  return (
    <section
      className="panel"
      aria-label={possessive ? "Typed possessive practice" : "Typed case pilot"}
    >
      <h3>
        {possessive
          ? "Typed endings · Possessive forms"
          : "Typed endings · Case pilot"}
      </h3>
      <p className="hint">
        {possessive
          ? "24 newly authored draft questions across six owners, mapped to Ödkem rule 20. Type only the possessed noun for the stated owner and noun number. Independent linguistic review pending. Attempts are saved; no mastery rating yet."
          : "50 newly authored draft questions across five cases; independent linguistic review pending. Type the complete word with Turkish spelling. Attempts are saved; no mastery rating yet."}
      </p>
      {!questions.length ? (
        <>
          <label className="field" htmlFor={prefix + "-concept"}>
            {required}
          </label>
          <select
            id={prefix + "-concept"}
            value={concept}
            onChange={(e) =>
              setConcept(e.target.value as CaseSelection | PossessiveSelection)
            }
          >
            <option value="mixed">
              {possessive
                ? "Mixed owners · 12 questions"
                : "Mixed cases · 12 questions"}
            </option>
            {Object.entries(labels).map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
          <button className="primary" onClick={() => start()}>
            {possessive
              ? "Start possessive practice"
              : "Start typed case practice"}
          </button>
          <p className="hint">
            {concept === "mixed"
              ? possessive
                ? "Mixed practice: two questions per owner, shuffled together. Each question names the owner and noun number."
                : "Mixed practice: two or three questions per case, shuffled together. Each question still names the required case."
              : possessive
                ? "Practice all four questions for this owner."
                : "Practice all 10 questions for this case."}
          </p>
          <button
            className="secondary"
            disabled={!mistakes.length}
            onClick={() => start(true)}
          >
            {possessive
              ? "Review possessive mistakes"
              : "Review grammar mistakes"}{" "}
            ({mistakes.length})
          </button>
          <p className="hint">
            {mistakes.length
              ? "Reviews the latest missed forms in your selection. A later correct answer or manual correction clears that question until you miss it again."
              : "No grammar mistakes to review in this selection. Missed answers will appear here."}
          </p>
          <p>
            {familyAttempts.length} saved typed attempts ·{" "}
            {familyAttempts.filter((a) => a.correct).length} correct, including
            self-corrections
          </p>
        </>
      ) : (
        <>
          <p>
            {practiceMode === "mistake_review"
              ? possessive
                ? "Reviewing possessive mistakes"
                : "Reviewing grammar mistakes"
              : practiceMode === "mixed_cases" ||
                  practiceMode === "mixed_possessives"
                ? possessive
                  ? "Mixed possessive practice"
                  : "Mixed case practice"
                : possessive
                  ? "Single owner practice"
                  : "Single case practice"}
          </p>
          <p role="status">
            {results.filter((a) => a.correct).length} / {results.length} typed
            answers correct / attempted
          </p>
          {q ? (
            <div>
              <p>
                Question {index + 1} of {questions.length} · {required}:{" "}
                {labels[q.conceptId]}
              </p>
              {"nounNumber" in q && (
                <p>
                  Noun number: <strong>{q.nounNumber}</strong>. Type only the
                  possessed noun, without the owner.
                </p>
              )}
              <p lang="tr">{q.sentence}</p>
              <p>
                Base word: <strong lang="tr">{q.base}</strong>
              </p>
              <label className="field" htmlFor={prefix + "-answer"}>
                Complete inflected word
              </label>
              <input
                ref={input}
                id={prefix + "-answer"}
                className="answer"
                lang="tr"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                    e.preventDefault();
                    check();
                  }
                }}
                disabled={!!feedback}
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
              />
              {!feedback && (
                <div className="characters" aria-label="Turkish letters">
                  {"çğıöşü".split("").map((c) => (
                    <button key={c} type="button" onClick={() => insert(c)}>
                      {c}
                    </button>
                  ))}
                </div>
              )}
              {feedback ? (
                <>
                  <div
                    role="status"
                    className={
                      "feedback " + (feedback.correct ? "correct" : "incorrect")
                    }
                  >
                    <strong>
                      {feedback.correct ? "Correct." : "Incorrect."}
                    </strong>
                    <p lang="tr">Correct answer: {q.answer}</p>
                    <p>{q.explanation}</p>
                    {feedback.manual && <p>Marked correct by you.</p>}
                  </div>
                  {!feedback.correct && (
                    <button
                      type="button"
                      className="secondary"
                      onClick={() =>
                        updateAttempts((a) => correctPilot(a, feedback.id))
                      }
                    >
                      My answer was correct
                    </button>
                  )}
                  <button
                    ref={checkButton}
                    type="button"
                    className="primary"
                    onClick={() => {
                      setIndex((i) => i + 1);
                      setAnswer("");
                      locked.current = false;
                    }}
                  >
                    {index + 1 === questions.length
                      ? "See typed results"
                      : "Next typed question"}
                  </button>
                </>
              ) : (
                <button
                  ref={checkButton}
                  className="primary"
                  type="button"
                  onClick={check}
                  disabled={!answer.trim()}
                >
                  Check typed answer
                </button>
              )}
            </div>
          ) : (
            <h4>
              {possessive
                ? "Possessive session complete"
                : "Typed case session complete"}
            </h4>
          )}
          <button className="text-button" onClick={() => setQuestions([])}>
            {q ? "End typed session" : "Restart typed practice"}
          </button>
        </>
      )}
    </section>
  );
}

export function PossessivePractice(props: Omit<Props, "family">) {
  return <CasePilot {...props} family="possessives" />;
}
