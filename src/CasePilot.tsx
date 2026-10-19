import React, { useEffect, useRef, useState } from "react";
import { shuffle } from "./yeniHitit";
import {
  caseQuestions,
  concepts,
  recordPilot,
  correctPilot,
  type Concept,
  type PilotAttempt,
} from "./casePilot";
type Props = {
  attempts: PilotAttempt[];
  updateAttempts: (update: (a: PilotAttempt[]) => PilotAttempt[]) => void;
};
export function CasePilot({ attempts, updateAttempts }: Props) {
  const [concept, setConcept] = useState<Concept>("locative");
  const [questions, setQuestions] = useState<typeof caseQuestions>([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
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
    <section className="panel" aria-label="Typed case pilot">
      <h3>Typed endings · Case pilot</h3>
      <p className="hint">
        30 newly authored draft questions. Mapped to Ödkem Rules 14–16;
        independent linguistic review pending. Type the complete word with
        Turkish spelling. Attempts are saved; no mastery rating yet.
      </p>
      {!questions.length ? (
        <>
          <label className="field" htmlFor="pilot-concept">
            Required case
          </label>
          <select
            id="pilot-concept"
            value={concept}
            onChange={(e) => setConcept(e.target.value as Concept)}
          >
            {Object.entries(concepts).map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
          <button
            className="primary"
            onClick={() => {
              sessionId.current = crypto.randomUUID();
              setIndex(0);
              setAnswer("");
              locked.current = false;
              setQuestions(
                shuffle(caseQuestions.filter((q) => q.conceptId === concept)),
              );
            }}
          >
            Start typed case practice
          </button>
          <p>
            {attempts.length} saved typed attempts ·{" "}
            {attempts.filter((a) => a.correct).length} correct, including
            self-corrections
          </p>
        </>
      ) : (
        <>
          <p role="status">
            {results.filter((a) => a.correct).length} / {results.length} typed
            answers correct / attempted
          </p>
          {q ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (feedback || locked.current || !answer.trim()) return;
                locked.current = true;
                updateAttempts((a) =>
                  recordPilot(a, q, answer, sessionId.current),
                );
              }}
            >
              <p>
                Question {index + 1} of {questions.length} · Required case:{" "}
                {concepts[q.conceptId]}
              </p>
              <p lang="tr">{q.sentence}</p>
              <p>
                Base word: <strong lang="tr">{q.base}</strong>
              </p>
              <label className="field" htmlFor="pilot-answer">
                Complete inflected word
              </label>
              <input
                ref={input}
                id="pilot-answer"
                className="answer"
                lang="tr"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={!!feedback}
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
              />
              {!feedback && (
                <div className="characters" aria-label="Turkish letters">
                  {"çğıöşü".split("").map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => insert(c)}
                    >
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
                  disabled={!answer.trim()}
                >
                  Check typed answer
                </button>
              )}
            </form>
          ) : (
            <h4>Typed case session complete</h4>
          )}
          <button className="text-button" onClick={() => setQuestions([])}>
            {q ? "End typed session" : "Restart typed practice"}
          </button>
        </>
      )}
    </section>
  );
}
