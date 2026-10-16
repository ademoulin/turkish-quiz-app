import Papa from "papaparse";
export const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1JrqWacx9e4RH7yhk7dlpPTLr68YwNS5n4L38mQHo8Yo/gviz/tq?tqx=out:csv&sheet=Sheet1";
export interface Entry {
  id: string;
  turkish: string;
  type: string;
  meaning: string;
  case: string;
  caseNotes: string;
  override: string;
}
export function parseVocab(csv: string): {
  entries: Entry[];
  warnings: string[];
} {
  const result = Papa.parse<string[]>(csv, { skipEmptyLines: "greedy" });
  const [headers, ...rows] = result.data;
  if (!headers) throw Error("The sheet is empty.");
  const h = headers.map((x) => x.trim().toLowerCase());
  const indexes = [
    h.indexOf("id"),
    ["word", "turkish", "verb"].map(name => h.indexOf(name)).find(index => index >= 0) ?? -1,
    h.indexOf("type"),
    h.indexOf("meaning"),
  ];
  if (indexes.some((i) => i < 0))
    throw Error("Expected columns: ID, Word (or Turkish/Verb), Type, Meaning.");
  const warnings = result.errors.map((e) => `CSV: ${e.message}`);
  const seen = new Set<string>();
  const entries: Entry[] = [];
  rows.forEach((row, i) => {
    if (row.every((x) => !x.trim())) return;
    const get = (n: number) => (row[n] || "").trim();
    const [id, turkish, type, meaning] = indexes.map(get);
    if (!id || !turkish || !type || !meaning || seen.has(id)) {
      warnings.push(
        `Row ${i + 2}: missing a required value or duplicate ID; skipped.`,
      );
      return;
    }
    seen.add(id);
    const entry = {
      id,
      turkish,
      type,
      meaning,
      case: get(h.indexOf("case")),
      caseNotes: get(h.indexOf("case notes")),
      override: get(
        h.indexOf("acceptable english") >= 0
          ? h.indexOf("acceptable english")
          : h.indexOf("accepted english"),
      ),
    };
    entries.push(entry);
    if (!entry.override && /[\w]\/|“|\[|\betc\./.test(meaning))
      warnings.push(
        `${turkish}: a complex definition may benefit from Acceptable English.`,
      );
  });
  if (!entries.length) throw Error("No valid vocabulary entries were found.");
  return { entries, warnings };
}
export const isVerb = (e: Entry) => ["vt", "vi", "vt/i"].includes(e.type);
export function normalize(s: string, language: "en" | "tr" = "en") {
  return s
    .normalize("NFC")
    .toLocaleLowerCase(language)
    .trim()
    .replace(/^[\s.,!?;:“”"'‘’…]+|[\s.,!?;:“”"'‘’…]+$/g, "")
    .replace(/\s+/g, " ");
}
export function englishAnswers(e: Entry): string[] {
  if (e.override)
    return e.override
      .split("|")
      .map((s) => normalize(s))
      .filter(Boolean);
  const options: string[] = [];
  let chunk = "",
    depth = 0;
  for (const c of e.meaning) {
    if (c === "(") depth++;
    if (c === ")") depth = Math.max(0, depth - 1);
    if (!depth && (c === "," || c === ";")) {
      options.push(chunk);
      chunk = "";
    } else chunk += c;
  }
  options.push(chunk);
  return [
    ...new Set(
      options
        .flatMap((s) => [s.replace(/[()]/g, ""), s.replace(/\([^)]*\)/g, "")])
        .map((s) => normalize(s))
        .filter(Boolean),
    ),
  ];
}
export function matchesEnglish(answer: string, e: Entry) {
  const norm = (s: string) => {
    let n = normalize(s);
    if (isVerb(e)) n = n.replace(/^to /, "");
    return n;
  };
  return englishAnswers(e).some((s) => norm(s) === norm(answer));
}
export function turkishAnswers(e: Entry) {
  return e.turkish.split(/\s*\/\s*/).map((s) => normalize(s, "tr"));
}
export function matchesTurkish(
  answer: string,
  target: Entry,
  entries: Entry[],
) {
  const accepted = new Set(turkishAnswers(target));
  const targetMeanings = englishAnswers(target).map((x) =>
    isVerb(target) ? x.replace(/^to /, "") : x,
  );
  for (const other of entries) {
    if (
      englishAnswers(other).some((x) =>
        targetMeanings.includes(isVerb(other) ? x.replace(/^to /, "") : x),
      )
    )
      turkishAnswers(other).forEach((x) => accepted.add(x));
  }
  return accepted.has(normalize(answer, "tr"));
}
