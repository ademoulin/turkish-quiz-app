import React, { useEffect, useRef, useState } from "react";
import {
  recordPilot,
  correctPilot,
  type PilotAttempt,
  type TypedQuestion,
} from "./casePilot";
import { shuffle } from "./shuffle";
export type PracticeProps = {
  attempts: PilotAttempt[];
  updateAttempts: (update: (a: PilotAttempt[]) => PilotAttempt[]) => void;
};
export type PracticeConfig = {
  id: string;
  region: string;
  title: string;
  description: string;
  bank: TypedQuestion[];
  initialSelection: string;
  selectionLabel?: string;
  selections?: { id: string; label: string }[];
  select: (selection: string) => TypedQuestion[];
  mistakes: (attempts: PilotAttempt[], selection: string) => TypedQuestion[];
  mode: (selection: string) => NonNullable<PilotAttempt["practiceMode"]>;
  startLabel: string;
  setupHint: (selection: string) => string;
  reviewLabel: string;
  sessionLabel: (mode: NonNullable<PilotAttempt["practiceMode"]>) => string;
  cue: (q: TypedQuestion) => React.ReactNode;
  detail?: (q: TypedQuestion) => React.ReactNode;
  sentenceLanguage?: string;
  sentenceLabel?: string;
  baseLabel?: string;
  answerLabel: string;
  completionLabel: string;
};
/** Shared interaction and scoring for typed words and noun phrases. No native form submission. */
export function TypedPractice({
  attempts,
  updateAttempts,
  config,
}: PracticeProps & { config: PracticeConfig }) {
  const [selection, setSelection] = useState(config.initialSelection);
  const [questions, setQuestions] = useState<TypedQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [mode, setMode] = useState<NonNullable<PilotAttempt["practiceMode"]>>(
    config.mode(config.initialSelection),
  );
  const sessionId = useRef("");
  const locked = useRef(false);
  const input = useRef<HTMLInputElement>(null);
  const nextButton = useRef<HTMLButtonElement>(null);
  const knownIds = new Set(config.bank.map((q) => q.id));
  const familyAttempts = attempts.filter((a) => knownIds.has(a.questionId));
  const mistakes = config.mistakes(attempts, selection);
  const q = questions[index];
  const results = attempts.filter((a) => a.sessionId === sessionId.current);
  const feedback = q && results.find((a) => a.questionId === q.id);
  useEffect(() => {
    if (q && !feedback) input.current?.focus();
    else if (feedback) nextButton.current?.focus();
  }, [q, feedback]);
  function start(review = false) {
    const pool = review ? shuffle(mistakes) : config.select(selection);
    if (!pool.length) return;
    sessionId.current = crypto.randomUUID();
    locked.current = false;
    setMode(review ? "mistake_review" : config.mode(selection));
    setIndex(0);
    setAnswer("");
    setQuestions(pool);
  }
  function check() {
    if (!q || feedback || locked.current || !answer.trim()) return;
    locked.current = true;
    updateAttempts((a) => recordPilot(a, q, answer, sessionId.current, mode));
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
    <section className="panel" aria-label={config.region}>
      <h3>{config.title}</h3>
      <p className="hint">{config.description}</p>
      {!questions.length ? (
        <>
          {config.selections && (
            <>
              <label className="field" htmlFor={config.id + "-concept"}>
                {config.selectionLabel}
              </label>
              <select
                id={config.id + "-concept"}
                value={selection}
                onChange={(e) => setSelection(e.target.value)}
              >
                {config.selections.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </>
          )}
          <button className="primary" onClick={() => start()}>
            {config.startLabel}
          </button>
          <p className="hint">{config.setupHint(selection)}</p>
          <button
            className="secondary"
            disabled={!mistakes.length}
            onClick={() => start(true)}
          >
            {config.reviewLabel} ({mistakes.length})
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
          <p>{config.sessionLabel(mode)}</p>
          <p role="status">
            {results.filter((a) => a.correct).length} / {results.length} typed
            answers correct / attempted
          </p>
          {q ? (
            <div>
              <p>
                Question {index + 1} of {questions.length} · {config.cue(q)}
              </p>
              {config.detail?.(q)}
              <p lang={config.sentenceLanguage || "tr"}>
                {config.sentenceLabel}
                {q.sentence}
              </p>
              <p>
                {config.baseLabel || "Base word"}:{" "}
                <strong lang="tr">{q.base}</strong>
              </p>
              <label className="field" htmlFor={config.id + "-answer"}>
                {config.answerLabel}
              </label>
              <input
                id={config.id + "-answer"}
                ref={input}
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
                    ref={nextButton}
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
                  ref={nextButton}
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
            <h4>{config.completionLabel}</h4>
          )}
          <button className="text-button" onClick={() => setQuestions([])}>
            {q ? "End typed session" : "Restart typed practice"}
          </button>
        </>
      )}
    </section>
  );
}
