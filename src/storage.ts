export const STORAGE_KEY = "quiz-my-turkish-v1";
export interface Attempt {
  id: string;
  sessionId?: string;
  entryId: string;
  kind: "meaning" | "conjugation";
  direction: "en" | "tr";
  form?: import("./grammar").Form;
  answer: string;
  expected: string;
  correct: boolean;
  manual: boolean;
  time: string;
}
export interface Settings {
  mode: "meaning" | "conjugation" | "mixed";
  direction: "en" | "tr" | "mixed";
  length: string;
  types: string[];
  vocabSource: "all" | "DL";
  familiarities: import("./familiarity").Familiarity[];
  selected: string[];
  tenses: import("./grammar").Tense[];
  persons: import("./grammar").Person[];
  polarities: string[];
  ability: "off" | "on" | "mixed";
}
export const defaults: Settings = {
  mode: "meaning",
  direction: "tr",
  length: "10",
  types: [],
  vocabSource: "all",
  familiarities: [],
  selected: [],
  tenses: ["present", "past", "future"],
  persons: ["ben", "sen", "o", "biz", "siz", "onlar"],
  polarities: ["affirmative", "negative"],
  ability: "off",
};
export interface Store {
  settings: Settings;
  attempts: Attempt[];
  pilotAttempts?: import("./casePilot").PilotAttempt[];
  cache?: { csv: string; time: string };
}
export function readStore(): Store {
  try {
    const s = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return {
      settings: {
        ...defaults,
        ...s.settings,
        vocabSource: s.settings?.vocabSource === "DL" ? "DL" : "all",
        familiarities: Array.isArray(s.settings?.familiarities)
          ? s.settings.familiarities.filter((v: unknown) =>
              ["New", "Learning", "Familiar", "Well known"].includes(String(v)),
            )
          : [],
      },
      attempts: Array.isArray(s.attempts) ? s.attempts : [],
      pilotAttempts: Array.isArray(s.pilotAttempts) ? s.pilotAttempts : [],
      cache: s.cache,
    };
  } catch {
    return { settings: defaults, attempts: [] };
  }
}
export function writeStore(s: Store) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return true;
  } catch {
    return false;
  }
}
export function validateImport(value: unknown): Attempt[] {
  if (
    !value ||
    typeof value !== "object" ||
    !("version" in value) ||
    value.version !== 1 ||
    !("attempts" in value) ||
    !Array.isArray(value.attempts)
  )
    throw Error("Choose a Quiz My Turkish version 1 progress export.");
  if (value.attempts.length > 100000)
    throw Error("This file contains too many results.");
  return value.attempts.map((x: unknown) => {
    if (!x || typeof x !== "object")
      throw Error("Invalid result in this file.");
    const a = x as Attempt;
    if (
      typeof a.id !== "string" ||
      (a.sessionId !== undefined &&
        (typeof a.sessionId !== "string" || !a.sessionId)) ||
      typeof a.entryId !== "string" ||
      !["meaning", "conjugation"].includes(a.kind) ||
      !["en", "tr"].includes(a.direction) ||
      typeof a.correct !== "boolean" ||
      typeof a.manual !== "boolean" ||
      typeof a.answer !== "string" ||
      typeof a.expected !== "string" ||
      typeof a.time !== "string" ||
      !Number.isFinite(Date.parse(a.time))
    )
      throw Error("Invalid result in this file.");
    if (
      a.kind === "conjugation" &&
      (!a.form ||
        ![
          "present",
          "past",
          "future",
          "pastContinuous",
          "aorist",
          "conditional",
          "hypothetical",
        ].includes(a.form.tense) ||
        !["ben", "sen", "o", "biz", "siz", "onlar"].includes(a.form.person) ||
        typeof a.form.negative !== "boolean" ||
        typeof a.form.ability !== "boolean")
    )
      throw Error("Invalid grammar settings in this file.");
    return a;
  });
}
