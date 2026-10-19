/** Latest saved evidence per stable question ID. Unknown questions remain saved. */
export function latestMistakes<T extends { id: string; conceptId: string }>(
  questions: T[],
  attempts: {
    id: string;
    questionId: string;
    correct: boolean;
    time: string;
  }[],
  selection = "mixed",
): T[] {
  const latest = new Map<string, (typeof attempts)[number]>();
  for (const a of new Map(attempts.map((a) => [a.id, a])).values()) {
    if (!Number.isFinite(Date.parse(a.time))) continue;
    const previous = latest.get(a.questionId);
    if (!previous || Date.parse(a.time) >= Date.parse(previous.time))
      latest.set(a.questionId, a);
  }
  return questions.filter(
    (q) =>
      (selection === "mixed" || q.conceptId === selection) &&
      latest.get(q.id)?.correct === false,
  );
}
