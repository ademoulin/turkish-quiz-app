import React, { useEffect, useRef, useState, useMemo } from "react";
import { createRoot } from "react-dom/client";
import {
  conjugate,
  persons,
  tenses,
  type Form,
  type Tense,
  type Conjugation,
} from "./grammar";
import {
  parseVocab,
  SHEET_URL,
  isVerb,
  normalize,
  matchesEnglish,
  matchesTurkish,
  englishAnswers,
  type Entry,
} from "./vocab";
import {
  readStore,
  writeStore,
  validateImport,
  type Store,
  type Settings,
  type Attempt,
} from "./storage";
import {
  familiarityIndex,
  familiarityFor,
  familiarityLevels,
} from "./familiarity";
import "./style.css";
type Question = {
  entry: Entry;
  kind: "meaning" | "conjugation";
  direction: "en" | "tr";
  form?: Form;
  result?: Conjugation;
};
const typeNames: Record<string, string> = {
  verbs: "Verbs",
  adv: "Adverbs",
  adj: "Adjectives",
  n: "Nouns",
  conj: "Conjunctions",
  interj: "Expressions",
  postp: "Postpositions",
  vt: "Transitive verbs",
  vi: "Intransitive verbs",
  "vt/i": "Both verb types",
  "adv/adj": "Adverb / adjective",
  "adv/n": "Adverb / noun",
};
const pick = <T,>(xs: T[]) => xs[Math.floor(Math.random() * xs.length)];
const shuffle = <T,>(xs: T[]) => {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const toggle = <T,>(a: T[], v: T) =>
  a.includes(v) ? a.filter((x) => x !== v) : [...a, v];
function App() {
  const [store, setStore] = useState<Store>(readStore);
  const settings = store.settings;
  const [entries, setEntries] = useState<Entry[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"live" | "cached" | "none">("none");
  const [notice, setNotice] = useState("");
  const [storageError, setStorageError] = useState(false);
  const [search, setSearch] = useState("");
  const [screen, setScreen] = useState<"setup" | "quiz" | "summary">("setup");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<Attempt | null>(null);
  const [session, setSession] = useState<Attempt[]>([]);
  const [activeTab, setActiveTab] = useState<"study" | "progress">("study");
  const [setupError, setSetupError] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const importInput = useRef<HTMLInputElement>(null);
  const submitting = useRef(false);
  const sessionId = useRef(crypto.randomUUID());
  const familiarity = useMemo(
    () => familiarityIndex(store.attempts),
    [store.attempts],
  );
  const wordLevel = (id: string) =>
    familiarityFor(familiarity, id, settings.direction);
  const matchesFamiliarity = (id: string) =>
    settings.mode === "conjugation" ||
    !settings.familiarities.length ||
    settings.familiarities.includes(wordLevel(id));
  const updateSettings = (patch: Partial<Settings>) =>
    setStore((s) => ({ ...s, settings: { ...s.settings, ...patch } }));
  useEffect(() => {
    setStorageError(!writeStore(store));
  }, [store]);
  async function refresh() {
    setLoading(true);
    setNotice("");
    try {
      const r = await fetch(SHEET_URL + "&_=" + Date.now(), {
        signal: AbortSignal.timeout(20000),
        credentials: "omit",
      });
      if (!r.ok) throw Error(`Google Sheets returned ${r.status}.`);
      const csv = await r.text();
      const parsed = parseVocab(csv);
      setEntries(parsed.entries);
      setWarnings(parsed.warnings);
      setSource("live");
      setStore((s) => ({
        ...s,
        cache: { csv, time: new Date().toISOString() },
      }));
    } catch (err) {
      const cached = readStore().cache || store.cache;
      if (cached) {
        try {
          const p = parseVocab(cached.csv);
          setEntries(p.entries);
          setWarnings(p.warnings);
          setSource("cached");
        } catch {
          setSource("none");
        }
      }
      setNotice(
        `Couldn’t refresh vocabulary. ${err instanceof Error ? err.message : "Check your connection."} ${readStore().cache || store.cache ? "Using your last saved download where available." : "Check your internet connection and that the sheet is publicly viewable, then try again."}`,
      );
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const cache = readStore().cache;
    if (cache) {
      try {
        const p = parseVocab(cache.csv);
        setEntries(p.entries);
        setWarnings(p.warnings);
        setSource("cached");
      } catch {
        /* Fetch can repair an invalid cache. */
      }
    }
    void refresh();
  }, []);
  useEffect(() => {
    if (screen === "quiz" && !feedback) {
      submitting.current = false;
      input.current?.focus();
    }
  }, [screen, index, feedback]);
  const allTypes = [
    ...new Set(
      entries.flatMap((e) => (isVerb(e) ? ["verbs"] : e.type.split("/"))),
    ),
  ];
  const filtered = entries.filter(
    (e) =>
      matchesFamiliarity(e.id) &&
      (!settings.types.length ||
        settings.types.some((savedType) => {
          const t = ["vt", "vi", "vt/i"].includes(savedType)
            ? "verbs"
            : savedType;
          return (
            (t === "verbs" && isVerb(e)) ||
            e.type === t ||
            e.type.split("/").includes(t) ||
            (e.type === "vt/i" && (t === "vt" || t === "vi"))
          );
        })) &&
      (!search ||
        `${e.turkish} ${e.meaning}`
          .toLocaleLowerCase("tr")
          .includes(search.toLocaleLowerCase("tr"))),
  );
  const chosen = entries.filter((e) => settings.selected.includes(e.id));
  const eligible = chosen.filter(
    (e) =>
      (settings.mode !== "conjugation" || isVerb(e)) &&
      matchesFamiliarity(e.id),
  );
  const unresolved = store.attempts.filter(
    (a) =>
      !a.correct &&
      !store.attempts.some(
        (later) =>
          later.entryId === a.entryId &&
          later.kind === a.kind &&
          later.direction === a.direction &&
          JSON.stringify(later.form) === JSON.stringify(a.form) &&
          later.correct &&
          later.time >= a.time,
      ),
  );
  const mistakes = [
    ...new Map(
      unresolved.map((a) => [
        JSON.stringify([a.entryId, a.kind, a.direction, a.form]),
        a,
      ]),
    ).values(),
  ];
  const latest = questions[index];
  function makeQuestion(
    e: Entry,
    kind: "meaning" | "conjugation",
    saved?: Attempt,
  ): Question {
    const direction =
      saved?.direction ||
      (settings.direction === "mixed"
        ? pick(["en", "tr"] as ("en" | "tr")[])
        : settings.direction);
    if (kind === "meaning") return { entry: e, kind, direction };
    const tense = saved?.form?.tense || pick(settings.tenses);
    const ability =
      saved?.form?.ability ??
      (!["conditional", "hypothetical"].includes(tense) &&
        (settings.ability === "on" ||
          (settings.ability === "mixed" && Math.random() < 0.5)));
    const form = saved?.form || {
      tense,
      person: pick(settings.persons),
      negative: pick(settings.polarities) === "negative",
      ability,
    };
    return {
      entry: e,
      kind,
      direction: "tr",
      form,
      result: conjugate(e.turkish, form),
    };
  }
  function start(review = false) {
    setSetupError("");
    const qs: Question[] = [];
    const skipped: string[] = [];
    if (
      !review &&
      settings.mode !== "meaning" &&
      (!settings.tenses.length ||
        !settings.persons.length ||
        !settings.polarities.length)
    ) {
      setSetupError(
        "Choose at least one tense, person, and affirmative/negative form.",
      );
      return;
    }
    if (
      !review &&
      settings.ability === "on" &&
      settings.mode !== "meaning" &&
      settings.tenses.every((t) => ["conditional", "hypothetical"].includes(t))
    ) {
      setSetupError(
        "Ability is available with the non-conditional tenses. Select one of those, or turn ability off.",
      );
      return;
    }
    if (review) {
      for (const a of shuffle(mistakes)) {
        const e = entries.find((e) => e.id === a.entryId);
        if (!e) continue;
        try {
          qs.push(makeQuestion(e, a.kind, a));
        } catch {
          skipped.push(e.turkish);
        }
      }
    } else
      for (const e of shuffle(eligible)) {
        const kind =
          settings.mode === "mixed"
            ? isVerb(e)
              ? pick(["meaning", "conjugation"] as (
                  | "meaning"
                  | "conjugation"
                )[])
              : "meaning"
            : settings.mode;
        try {
          qs.push(makeQuestion(e, kind));
        } catch {
          skipped.push(e.turkish);
        }
      }
    const count =
      settings.length === "all" ? qs.length : Number(settings.length);
    const next = qs.slice(0, count);
    if (!next.length) {
      setSetupError(
        review
          ? "No available mistakes to review."
          : "Select vocabulary that matches your filters first. If practicing conjugations, include verbs.",
      );
      return;
    }
    if (skipped.length)
      setNotice(
        `Skipped forms needing a checked rule: ${[...new Set(skipped)].join(", ")}.`,
      );
    sessionId.current = crypto.randomUUID();
    setQuestions(next);
    setIndex(0);
    setSession([]);
    setAnswer("");
    setFeedback(null);
    setScreen("quiz");
    submitting.current = false;
  }
  function submit() {
    if (feedback || submitting.current || !answer.trim()) return;
    submitting.current = true;
    const q = latest;
    const correct =
      q.kind === "conjugation"
        ? q.result!.accepted.some(
            (s) => normalize(s, "tr") === normalize(answer, "tr"),
          )
        : q.direction === "en"
          ? matchesEnglish(answer, q.entry)
          : matchesTurkish(answer, q.entry, entries);
    const expected =
      q.kind === "conjugation"
        ? q.result!.answer
        : q.direction === "en"
          ? englishAnswers(q.entry).join(" / ")
          : q.entry.turkish;
    const a: Attempt = {
      id: crypto.randomUUID(),
      sessionId: sessionId.current,
      entryId: q.entry.id,
      kind: q.kind,
      direction: q.direction,
      form: q.form,
      answer: answer.trim(),
      expected,
      correct,
      manual: false,
      time: new Date().toISOString(),
    };
    setFeedback(a);
    setSession((s) => [...s, a]);
    setStore((s) => ({ ...s, attempts: [...s.attempts, a] }));
  }
  function manual() {
    if (!feedback || feedback.correct) return;
    const corrected = { ...feedback, correct: true, manual: true };
    setFeedback(corrected);
    setSession((s) => s.map((a) => (a.id === corrected.id ? corrected : a)));
    setStore((s) => ({
      ...s,
      attempts: s.attempts.map((a) => (a.id === corrected.id ? corrected : a)),
    }));
  }
  function next() {
    if (index + 1 >= questions.length) {
      setScreen("summary");
      return;
    }
    setIndex((i) => i + 1);
    setAnswer("");
    setFeedback(null);
  }
  function insertChar(c: string) {
    const el = input.current;
    const start = el?.selectionStart ?? answer.length;
    const end = el?.selectionEnd ?? start;
    setAnswer(answer.slice(0, start) + c + answer.slice(end));
    requestAnimationFrame(() => {
      el?.focus();
      el?.setSelectionRange(start + 1, start + 1);
    });
  }
  function exportProgress() {
    const blob = new Blob(
      [JSON.stringify({ version: 1, attempts: store.attempts }, null, 2)],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `quiz-my-turkish-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async function importProgress(file?: File) {
    if (!file) return;
    try {
      if (file.size > 15000000)
        throw Error("Choose a progress file smaller than 15 MB.");
      const imported = validateImport(JSON.parse(await file.text()));
      setStore((s) => ({
        ...s,
        attempts: [
          ...new Map(
            [...s.attempts, ...imported].map((a) => [a.id, a]),
          ).values(),
        ],
      }));
      setNotice(
        `Imported ${imported.length} results. Existing results were kept; duplicate result IDs were merged.`,
      );
    } catch (e) {
      setNotice(
        e instanceof Error ? e.message : "Unable to read that progress file.",
      );
    }
    if (importInput.current) importInput.current.value = "";
  }
  return (
    <>
      <header>
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (screen === "quiz") {
              setNotice(
                "Use “End session” to return to setup; your answered questions are already saved.",
              );
              return;
            }
            setScreen("setup");
            setActiveTab("study");
          }}
        >
          <span className="brand-icon">q.</span>
          <span>
            Quiz My Turkish
            <small>A little practice, a little more fluent.</small>
          </span>
        </a>
        <span className="header-label">YOUR DAILY DOSE OF TÜRKÇE</span>
      </header>
      <main>
        {storageError && (
          <div className="alert" role="alert">
            Browser storage is unavailable or full. Your progress may not
            survive closing this page. Export a backup.
          </div>
        )}
        {notice && (
          <div className="alert" role="status">
            {notice}
            <button className="text-button" onClick={() => setNotice("")}>
              Dismiss
            </button>
          </div>
        )}
        {screen === "setup" && (
          <>
            <section className="intro">
              <p className="eyebrow">MERHABA, LET’S PRACTICE</p>
              <h1>
                Make it come
                <br />
                <em>naturally.</em>
              </h1>
              <p>
                Find the words. Remember the endings.
                <br />
                Build a little confidence, one question at a time.
              </p>
            </section>
            <section className="source-bar" aria-label="Vocabulary connection">
              <div>
                <span
                  className={"status-dot " + (source === "live" ? "live" : "")}
                />
                <strong>
                  {loading
                    ? "Refreshing vocabulary…"
                    : source === "live"
                      ? "Your vocabulary is up to date"
                      : source === "cached"
                        ? "Using saved vocabulary"
                        : "Vocabulary not loaded"}
                </strong>
                <small>
                  {entries.length} entries
                  {store.cache
                    ? ` · Last successful refresh: ${new Date(store.cache.time).toLocaleString()}`
                    : ""}
                </small>
              </div>
              <button
                className="secondary"
                onClick={() => void refresh()}
                disabled={loading}
              >
                {loading ? "Refreshing…" : "↻ Refresh vocabulary"}
              </button>
            </section>
            {!!warnings.length && (
              <details className="warnings">
                <summary>{warnings.length} vocabulary notes</summary>
                <ul>
                  {warnings.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </details>
            )}
            <nav className="tabs" aria-label="App sections">
              <button
                aria-pressed={activeTab === "study"}
                onClick={() => setActiveTab("study")}
              >
                Set up practice
              </button>
              <button
                aria-pressed={activeTab === "progress"}
                onClick={() => setActiveTab("progress")}
              >
                Your progress
              </button>
            </nav>
            {activeTab === "study" ? (
              <div className="setup-grid">
                <section className="panel">
                  <div className="section-title">
                    <span className="step">01</span>
                    <h2>Pick your practice</h2>
                  </div>
                  <div className="mode-grid">
                    {(
                      [
                        ["meaning", "Vocabulary", "Find the right word."],
                        [
                          "conjugation",
                          "Conjugation",
                          "Put the endings to work.",
                        ],
                        ["mixed", "Surprise me", "A little of both."],
                      ] as const
                    ).map(([value, title, sub]) => (
                      <button
                        className={
                          "mode " + (settings.mode === value ? "selected" : "")
                        }
                        key={value}
                        aria-pressed={settings.mode === value}
                        onClick={() => updateSettings({ mode: value })}
                      >
                        <strong>{title}</strong>
                        <small>{sub}</small>
                      </button>
                    ))}
                  </div>
                  {settings.mode !== "conjugation" && (
                    <label className="field">
                      Vocabulary direction
                      <select
                        value={settings.direction}
                        onChange={(e) =>
                          updateSettings({
                            direction: e.target.value as Settings["direction"],
                          })
                        }
                      >
                        <option value="tr">English → Turkish</option>
                        <option value="en">Turkish → English</option>
                        <option value="mixed">Mixed directions</option>
                      </select>
                    </label>
                  )}
                  {settings.mode !== "meaning" && (
                    <div className="grammar-settings">
                      <fieldset>
                        <legend>Tenses & patterns</legend>
                        <div className="check-grid">
                          {Object.entries(tenses).map(([key, label]) => (
                            <label key={key}>
                              <input
                                type="checkbox"
                                checked={settings.tenses.includes(key as Tense)}
                                onChange={() =>
                                  updateSettings({
                                    tenses: toggle(
                                      settings.tenses,
                                      key as Tense,
                                    ),
                                  })
                                }
                              />
                              {label}
                            </label>
                          ))}
                        </div>
                      </fieldset>
                      <fieldset>
                        <legend>Persons</legend>
                        <div className="chips">
                          {persons.map((p) => (
                            <button
                              key={p}
                              className={
                                settings.persons.includes(p)
                                  ? "chip active"
                                  : "chip"
                              }
                              aria-pressed={settings.persons.includes(p)}
                              onClick={() =>
                                updateSettings({
                                  persons: toggle(settings.persons, p),
                                })
                              }
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </fieldset>
                      <fieldset>
                        <legend>Forms</legend>
                        <div className="chips">
                          {["affirmative", "negative"].map((v) => (
                            <button
                              className={
                                settings.polarities.includes(v)
                                  ? "chip active"
                                  : "chip"
                              }
                              key={v}
                              aria-pressed={settings.polarities.includes(v)}
                              onClick={() =>
                                updateSettings({
                                  polarities: toggle(settings.polarities, v),
                                })
                              }
                            >
                              {v}
                            </button>
                          ))}
                        </div>
                      </fieldset>
                      <label className="field">
                        Ability · -(y)ebil
                        <select
                          value={settings.ability}
                          onChange={(e) =>
                            updateSettings({
                              ability: e.target.value as Settings["ability"],
                            })
                          }
                        >
                          <option value="off">Without ability</option>
                          <option value="on">Practice ability</option>
                          <option value="mixed">
                            Mix with and without ability
                          </option>
                        </select>
                      </label>
                      <p className="hint">
                        For general “can”, select Aorist. Ability isn’t combined
                        with conditionals yet; those questions use the ordinary
                        verb.
                      </p>
                    </div>
                  )}
                  <label className="field">
                    Session length
                    <select
                      value={settings.length}
                      onChange={(e) =>
                        updateSettings({ length: e.target.value })
                      }
                    >
                      <option value="10">10 questions · a little reset</option>
                      <option value="20">20 questions · a deeper dive</option>
                      <option value="all">All selected words</option>
                    </select>
                  </label>
                  <p className="hint">
                    One question per selected entry, up to your session length.
                    No timer. No rush.
                  </p>
                  {setupError && (
                    <p role="alert" className="error-text">
                      {setupError}
                    </p>
                  )}
                  <button
                    className="primary full"
                    onClick={() => start()}
                    disabled={!entries.length}
                  >
                    Let’s practice <span>→</span>
                  </button>
                  <button
                    className="text-button full"
                    disabled={!mistakes.length || !entries.length}
                    onClick={() => start(true)}
                  >
                    Review mistakes ({mistakes.length})
                  </button>
                </section>
                <section className="panel word-panel">
                  <div className="section-title">
                    <span className="step">02</span>
                    <h2>Choose your words</h2>
                    <span className="count">{eligible.length} selected</span>
                  </div>
                  <label className="field">
                    Word type
                    <select
                      aria-label="Word type"
                      value={
                        settings.types.some((t) =>
                          ["vt", "vi", "vt/i"].includes(t),
                        )
                          ? "verbs"
                          : settings.types[0] || ""
                      }
                      onChange={(e) =>
                        updateSettings({
                          types: e.target.value ? [e.target.value] : [],
                        })
                      }
                    >
                      <option value="">All word types</option>
                      {allTypes.map((t) => (
                        <option value={t} key={t}>
                          {typeNames[t] || t}
                        </option>
                      ))}
                    </select>
                  </label>
                  {settings.mode !== "conjugation" && (
                    <fieldset className="familiarity-filter">
                      <legend>Vocabulary familiarity</legend>
                      <div className="chips">
                        <button
                          className={
                            !settings.familiarities.length
                              ? "chip active"
                              : "chip"
                          }
                          aria-pressed={!settings.familiarities.length}
                          onClick={() => updateSettings({ familiarities: [] })}
                        >
                          All levels
                        </button>
                        {familiarityLevels.map((level) => (
                          <button
                            key={level}
                            className={
                              settings.familiarities.includes(level)
                                ? "chip active"
                                : "chip"
                            }
                            aria-pressed={settings.familiarities.includes(
                              level,
                            )}
                            onClick={() =>
                              updateSettings({
                                familiarities: toggle(
                                  settings.familiarities,
                                  level,
                                ),
                              })
                            }
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                      <p className="hint">
                        {settings.direction === "mixed"
                          ? "Mixed directions use the less familiar of your two levels."
                          : settings.direction === "tr"
                            ? "Levels for English → Turkish recall."
                            : "Levels for Turkish → English recognition."}{" "}
                        Only matching selected words enter a new session.
                      </p>
                      <details className="familiarity-help">
                        <summary>How familiarity works</summary>
                        <p>
                          New means no vocabulary answers yet in this direction.
                          Learning means you’re still building consistency.
                          Familiar needs at least 4 successful sessions across 2
                          days. Well known needs at least 12 across 3 days, with
                          strong recent results.
                        </p>
                        <p>
                          Recent mistakes lower confidence; one slip won’t erase
                          a strong history. Repeating a word in the same session
                          doesn’t earn extra credit. Manual corrections count as
                          correct. Older sessions are estimated from 30-minute
                          gaps. Conjugation results never affect these labels.
                        </p>
                      </details>
                    </fieldset>
                  )}
                  <label className="sr-only" htmlFor="word-search">
                    Search words or meanings
                  </label>
                  <input
                    id="word-search"
                    className="search"
                    placeholder="Search words or meanings…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div className="word-actions">
                    <button
                      className="text-button"
                      onClick={() =>
                        updateSettings({
                          selected: [
                            ...new Set([
                              ...settings.selected,
                              ...filtered
                                .filter(
                                  (e) =>
                                    settings.mode !== "conjugation" ||
                                    isVerb(e),
                                )
                                .map((e) => e.id),
                            ]),
                          ],
                        })
                      }
                    >
                      Select all matching
                    </button>
                    <button
                      className="text-button"
                      onClick={() =>
                        updateSettings({
                          selected: settings.selected.filter(
                            (id) => !filtered.some((e) => e.id === id),
                          ),
                        })
                      }
                    >
                      Clear matching
                    </button>
                  </div>
                  <div className="word-list">
                    {filtered
                      .filter(
                        (e) => settings.mode !== "conjugation" || isVerb(e),
                      )
                      .map((e) => (
                        <label className="word-row" key={e.id}>
                          <input
                            type="checkbox"
                            checked={settings.selected.includes(e.id)}
                            onChange={() =>
                              updateSettings({
                                selected: toggle(settings.selected, e.id),
                              })
                            }
                          />
                          <span>
                            <strong lang="tr">{e.turkish}</strong>
                            <small>{e.meaning}</small>
                            {settings.mode !== "conjugation" && (
                              <span className="familiarity-badges">
                                {(settings.direction === "mixed"
                                  ? (["tr", "en"] as const)
                                  : [settings.direction]
                                ).map((direction) => (
                                  <span
                                    className="familiarity-badge"
                                    key={direction}
                                  >
                                    {settings.direction === "mixed"
                                      ? direction === "tr"
                                        ? "EN → TR: "
                                        : "TR → EN: "
                                      : ""}
                                    {familiarityFor(
                                      familiarity,
                                      e.id,
                                      direction,
                                    )}
                                  </span>
                                ))}
                              </span>
                            )}
                          </span>
                          <span className="type-tag">{e.type}</span>
                        </label>
                      ))}
                    {!entries.length && (
                      <p className="empty">
                        {loading
                          ? "Fetching your words…"
                          : "Refresh vocabulary to get started."}
                      </p>
                    )}
                    {entries.length > 0 && !filtered.length && (
                      <p className="empty">
                        No words match these filters. Try another familiarity
                        level, word type, or search.
                      </p>
                    )}
                  </div>
                  <p className="hint">
                    Your selections stay saved. Progress follows each word’s
                    permanent ID, even when the sheet changes.
                  </p>
                </section>
              </div>
            ) : (
              <section className="panel progress-panel">
                <h2>A little progress adds up.</h2>
                <div className="stats">
                  <div>
                    <strong>{store.attempts.length}</strong>
                    <span>questions answered</span>
                  </div>
                  <div>
                    <strong>
                      {store.attempts.filter((a) => a.correct).length}
                    </strong>
                    <span>correct, including self-corrections</span>
                  </div>
                  <div>
                    <strong>{mistakes.length}</strong>
                    <span>patterns to revisit</span>
                  </div>
                </div>
                <button
                  className="primary"
                  disabled={!mistakes.length}
                  onClick={() => start(true)}
                >
                  Review mistakes →
                </button>
                <h3>Your recent practice</h3>
                <div className="history">
                  {store.attempts
                    .slice(-20)
                    .reverse()
                    .map((a) => (
                      <div key={a.id}>
                        <span>
                          {a.correct ? "✓" : "↺"}{" "}
                          <strong>
                            {entries.find((e) => e.id === a.entryId)?.turkish ||
                              a.entryId}
                          </strong>
                          <small>
                            {a.kind === "conjugation"
                              ? `${a.form?.person} · ${tenses[a.form!.tense]}`
                              : "Vocabulary"}
                            {a.manual ? " · marked correct by you" : ""}
                          </small>
                        </span>
                        <span>{a.answer}</span>
                      </div>
                    ))}
                  {!store.attempts.length && (
                    <p>Your first session starts your story here.</p>
                  )}
                </div>
                <h3>Keep a copy</h3>
                <p className="hint">
                  Progress is saved only in this browser on this device.
                  Clearing browser data removes it. Export a backup to keep it
                  safe or move it to another device.
                </p>
                <div className="button-row">
                  <button className="secondary" onClick={exportProgress}>
                    Export progress
                  </button>
                  <button
                    className="secondary"
                    onClick={() => importInput.current?.click()}
                  >
                    Import progress
                  </button>
                </div>
                <input
                  ref={importInput}
                  type="file"
                  accept="application/json,.json"
                  hidden
                  onChange={(e) => void importProgress(e.target.files?.[0])}
                />
              </section>
            )}
          </>
        )}
        {screen === "quiz" && latest && (
          <section className="quiz-wrap">
            <div className="quiz-top">
              <span>
                Question {index + 1} of {questions.length}
              </span>
              <button
                className="text-button"
                onClick={() => setScreen("summary")}
              >
                End session
              </button>
            </div>
            <progress
              max={questions.length}
              value={index + (feedback ? 1 : 0)}
              aria-label="Session progress"
            />
            <article className="panel quiz-card">
              <p className="eyebrow">
                {latest.kind === "conjugation"
                  ? "PUT THE ENDINGS TO WORK"
                  : latest.direction === "en"
                    ? "TURKISH → ENGLISH"
                    : "ENGLISH → TURKISH"}
              </p>
              <h1
                lang={
                  latest.kind === "conjugation" || latest.direction === "en"
                    ? "tr"
                    : "en"
                }
              >
                {latest.kind === "conjugation" || latest.direction === "en"
                  ? latest.entry.turkish
                  : latest.entry.meaning}
              </h1>
              <p className="question-sub">
                {latest.kind === "conjugation"
                  ? `${latest.entry.type}: ${latest.entry.meaning}`
                  : typeNames[latest.entry.type] || latest.entry.type}
              </p>
              {latest.form && (
                <>
                  <div className="question-tags">
                    <span>{tenses[latest.form.tense]}</span>
                    <span>{latest.form.person}</span>
                    <span>
                      {latest.form.negative ? "Negative" : "Affirmative"}
                    </span>
                    {latest.form.ability && <span>Ability</span>}
                  </div>
                  <p className="cue">{latest.result?.cue}</p>
                </>
              )}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (feedback) next();
                  else submit();
                }}
              >
                <label className="field" htmlFor="answer">
                  {latest.kind === "conjugation"
                    ? "Type the conjugated verb"
                    : latest.direction === "en"
                      ? "What does it mean?"
                      : "What is the Turkish word?"}
                </label>
                <input
                  id="answer"
                  ref={input}
                  className="answer"
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  value={answer}
                  readOnly={!!feedback}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Your answer…"
                  lang={latest.direction === "en" ? "en" : "tr"}
                />
                {!feedback && (
                  <div className="characters" aria-label="Turkish characters">
                    {[..."çğıİöşü"].map((c) => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => insertChar(c)}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
                {feedback && (
                  <div
                    className={
                      "feedback " + (feedback.correct ? "correct" : "incorrect")
                    }
                    role="status"
                  >
                    <strong>
                      {feedback.correct
                        ? feedback.manual
                          ? "Marked correct by you."
                          : "That’s right. Güzel!"
                        : "A little practice makes it stick."}
                    </strong>
                    <p
                      className="expected"
                      lang={latest.direction === "en" ? "en" : "tr"}
                    >
                      {feedback.expected}
                    </p>
                    {latest.result && (
                      <>
                        <p className="breakdown">
                          {latest.result.parts.join(" + ")}
                        </p>
                        <details>
                          <summary>Why this form?</summary>
                          <p>
                            Stem + {latest.form?.negative ? "negative + " : ""}
                            {latest.form?.ability ? "ability + " : ""}tense /
                            pattern + personal ending. Vowel harmony selects
                            vowels to match the preceding stem or suffix; -di
                            becomes -ti after a voiceless consonant.
                          </p>
                          {latest.result.notes.map((n, i) => (
                            <p key={i}>{n}</p>
                          ))}
                        </details>
                      </>
                    )}
                    {!feedback.correct && (
                      <button
                        type="button"
                        className="text-button"
                        onClick={manual}
                      >
                        My answer was correct
                      </button>
                    )}
                  </div>
                )}
                <button
                  type="submit"
                  className="primary full"
                  disabled={!feedback && !answer.trim()}
                >
                  {feedback
                    ? index + 1 === questions.length
                      ? "See my results"
                      : "Next question"
                    : "Check answer"}{" "}
                  <span>→</span>
                </button>
                <p className="hint centered">
                  {feedback
                    ? "Press Enter when you’re ready to continue."
                    : "Press Enter to check. Turkish letters count."}
                </p>
              </form>
            </article>
          </section>
        )}
        {screen === "summary" && (
          <section className="summary panel">
            <p className="eyebrow">PRACTICE, NOT PERFECTION</p>
            <h1>
              {session.length
                ? "Nice work showing up."
                : "A fresh start awaits."}
            </h1>
            <div className="score">
              {session.filter((a) => a.correct).length}
              <span> / {session.length}</span>
            </div>
            <p>
              correct answers · {session.filter((a) => a.manual).length}{" "}
              self-corrections
            </p>
            <p>
              {session.length < questions.length
                ? `${session.length} of ${questions.length} questions completed. Answered questions are saved.`
                : "Your session is saved. Every recall is another repetition."}
            </p>
            {session.some((a) => !a.correct) && (
              <>
                <h2>Worth another look</h2>
                <div className="history">
                  {session
                    .filter((a) => !a.correct)
                    .map((a) => (
                      <div key={a.id}>
                        <span>
                          <strong>
                            {entries.find((e) => e.id === a.entryId)?.turkish ||
                              a.entryId}
                          </strong>
                          <small>Your answer: {a.answer}</small>
                        </span>
                        <span>{a.expected}</span>
                      </div>
                    ))}
                </div>
              </>
            )}
            <div className="button-row">
              <button
                className="primary"
                onClick={() => {
                  setScreen("setup");
                  setActiveTab("study");
                }}
              >
                Back to practice
              </button>
              <button
                className="secondary"
                disabled={!mistakes.length}
                onClick={() => start(true)}
              >
                Review mistakes
              </button>
            </div>
          </section>
        )}
      </main>
      <footer>
        <span>Quiz My Turkish · little by little.</span>
        <a
          href="https://docs.google.com/spreadsheets/d/1JrqWacx9e4RH7yhk7dlpPTLr68YwNS5n4L38mQHo8Yo/edit"
          target="_blank"
          rel="noreferrer"
        >
          Open vocabulary sheet ↗
        </a>
      </footer>
    </>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
