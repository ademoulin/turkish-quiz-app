import type { Attempt } from "./storage";
export const familiarityLevels = [
  "New",
  "Learning",
  "Familiar",
  "Well known",
] as const;
export type Familiarity = (typeof familiarityLevels)[number];
export type Direction = "en" | "tr";
export const familiarityKey = (id: string, direction: Direction) =>
  JSON.stringify([id, direction]);
/** One evidence point per entry, direction, and session. Old sessions use 30-minute gaps. */
export function familiarityIndex(
  attempts: Attempt[],
): Map<string, Familiarity> {
  const groups = new Map<
    string,
    Map<string, { correct: boolean; time: number; day: string }>
  >();
  const sorted = [...new Map(attempts.map((a) => [a.id, a])).values()]
    .filter((a) => Number.isFinite(Date.parse(a.time)))
    .sort((a, b) => Date.parse(a.time) - Date.parse(b.time));
  let previous = -Infinity,
    legacy = 0;
  for (const a of sorted) {
    const time = Date.parse(a.time);
    if (time - previous > 30 * 60 * 1000) legacy++;
    previous = time;
    if (a.kind !== "meaning") continue;
    const key = familiarityKey(a.entryId, a.direction);
    const sessions = groups.get(key) || new Map();
    const session = a.sessionId || `legacy-${legacy}`;
    const earlier = sessions.get(session);
    // Repeated guesses cannot earn extra credit, and a later success in the same session does not hide a mistake.
    sessions.set(session, {
      correct: (earlier?.correct ?? true) && a.correct,
      time,
      day: new Date(time).toISOString().slice(0, 10),
    });
    groups.set(key, sessions);
  }
  const levels = new Map<string, Familiarity>();
  for (const [key, groupsForWord] of groups) {
    const evidence = [...groupsForWord.values()].sort(
      (a, b) => a.time - b.time,
    );
    const successful = evidence.filter((e) => e.correct);
    const days = new Set(successful.map((e) => e.day)).size;
    const recent = evidence.slice(-12);
    let score = 0;
    for (const e of recent) score = Math.max(0, score + (e.correct ? 1 : -2));
    const lastFive = evidence.slice(-5);
    const accuracy = lastFive.filter((e) => e.correct).length / lastFive.length;
    const level: Familiarity =
      successful.length >= 12 && days >= 3 && score >= 8 && accuracy >= 0.8
        ? "Well known"
        : successful.length >= 4 && days >= 2 && score >= 3 && accuracy >= 0.6
          ? "Familiar"
          : "Learning";
    levels.set(key, level);
  }
  return levels;
}
export function familiarityFor(
  index: Map<string, Familiarity>,
  id: string,
  direction: Direction | "mixed",
): Familiarity {
  const get = (d: Direction) => index.get(familiarityKey(id, d)) || "New";
  if (direction !== "mixed") return get(direction);
  return familiarityLevels[
    Math.min(
      familiarityLevels.indexOf(get("en")),
      familiarityLevels.indexOf(get("tr")),
    )
  ];
}
