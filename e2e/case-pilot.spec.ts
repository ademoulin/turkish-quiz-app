import { test, expect } from "@playwright/test";
import { caseQuestions } from "../src/casePilot";
test("typed pilot: keyboard, touch, correction, persistence and backup round trip", async ({
  page,
}) => {
  await page.route("https://docs.google.com/**", (r) =>
    r.fulfill({
      status: 200,
      body: "ID,Verb,Type,Meaning\nv001,gelmek,vi,come",
    }),
  );
  await page.goto("/");
  await page.getByRole("button", { name: "Open grammar practice" }).click();
  const pilot = page.getByRole("region", { name: "Typed case pilot" });
  await pilot
    .getByLabel("Required case", { exact: true })
    .selectOption("dative");
  await pilot
    .getByRole("button", { name: "Start typed case practice" })
    .click();
  const seen = new Set<string>();
  for (let i = 0; i < 10; i++) {
    // Find the rendered sentence without relying on shuffled order.
    const text = await pilot.innerText();
    const current = caseQuestions.find((q) => text.includes(q.sentence))!;
    expect(seen.has(current.id)).toBe(false);
    seen.add(current.id);
    await expect(
      pilot.getByText(current.explanation, { exact: true }),
    ).toHaveCount(0);
    const field = pilot.getByLabel("Complete inflected word");
    await expect(field).toBeFocused();
    if (i === 0) {
      await field.fill("wrong");
      await page.keyboard.press("Enter");
      await expect(field).toBeDisabled();
      await pilot
        .getByRole("button", { name: "My answer was correct" })
        .click();
      await expect(pilot.getByText("Marked correct by you.")).toBeVisible();
    } else {
      await field.fill(current.answer);
      await pilot.getByRole("button", { name: "Check typed answer" }).click();
    }
    await expect(
      pilot.getByText(current.explanation, { exact: true }),
    ).toBeVisible();
    await expect(
      pilot.getByText(`${i + 1} / ${i + 1} typed answers correct / attempted`, {
        exact: true,
      }),
    ).toBeVisible();
    await pilot
      .getByRole("button", {
        name: i === 9 ? "See typed results" : "Next typed question",
      })
      .click();
  }
  await expect(pilot.getByText("Typed case session complete")).toBeVisible();
  const stored = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("quiz-my-turkish-v1")!),
  );
  expect(stored.pilotAttempts).toHaveLength(10);
  expect(stored.pilotAttempts.filter((a: any) => a.manual)).toHaveLength(1);
  expect(new Set(stored.pilotAttempts.map((a: any) => a.sessionId)).size).toBe(
    1,
  );
  expect(stored.attempts).toHaveLength(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.reload();
  await page.getByRole("button", { name: "Open grammar practice" }).click();
  await expect(
    pilot.getByText(
      "10 saved typed attempts · 10 correct, including self-corrections",
    ),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Your progress", exact: true })
    .click();
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: /Export/ }).click();
  const file = await download;
  const path = await file.path();
  await page.locator("input[type=file]").setInputFiles(path!);
  await expect(
    page.getByText(/Imported 10 typed grammar results/),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("quiz-my-turkish-v1")!).pilotAttempts
          .length,
    ),
  ).toBe(10);
  await page.locator("input[type=file]").setInputFiles({
    name: "legacy.json",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify({ version: 1, attempts: [] })),
  });
  await expect(
    page.getByText(/Imported 0 typed grammar results/),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("quiz-my-turkish-v1")!).pilotAttempts
          .length,
    ),
  ).toBe(10);
});

test("all case pools use strict spelling and touch letters; production project path", async ({
  page,
}) => {
  await page.route("https://docs.google.com/**", (r) => r.abort());
  await page.goto("http://127.0.0.1:4173/turkish-quiz-app/");
  await page.getByRole("button", { name: "Open grammar practice" }).click();
  const pilot = page.getByRole("region", { name: "Typed case pilot" });
  for (const concept of ["locative", "dative", "ablative"]) {
    await pilot
      .getByLabel("Required case", { exact: true })
      .selectOption(concept);
    await pilot
      .getByRole("button", { name: "Start typed case practice" })
      .click();
    const text = await pilot.innerText();
    const q = caseQuestions.find(
      (q) => q.conceptId === concept && text.includes(q.sentence),
    )!;
    const input = pilot.getByLabel("Complete inflected word");
    await pilot.getByRole("button", { name: "ğ", exact: true }).click();
    await expect(input).toHaveValue("ğ");
    await input.fill("wrong");
    await input.press("Enter");
    await expect(pilot.getByText("Incorrect.", { exact: true })).toBeVisible();
    await expect(
      pilot.getByText(`Correct answer: ${q.answer}`, { exact: true }),
    ).toBeVisible();
    await expect(
      pilot.getByText("0 / 1 typed answers correct / attempted", {
        exact: true,
      }),
    ).toBeVisible();
    await pilot.getByRole("button", { name: "End typed session" }).click();
  }
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("quiz-my-turkish-v1")!).pilotAttempts
          .length,
    ),
  ).toBe(3);
});

test("typed checking works inside a preview sandbox without form permission", async ({
  page,
}) => {
  await page.route("https://docs.google.com/**", (r) => r.abort());
  await page.goto("/");
  await page.setContent(
    '<iframe title="Preview" sandbox="allow-scripts allow-same-origin" src="http://127.0.0.1:4173/turkish-quiz-app/"></iframe>',
  );
  const frame = page.frameLocator("iframe");
  await frame.getByRole("button", { name: "Open grammar practice" }).click();
  const pilot = frame.getByRole("region", { name: "Typed case pilot" });
  await pilot
    .getByRole("button", { name: "Start typed case practice" })
    .click();
  await pilot.getByLabel("Complete inflected word").fill("wrong");
  await pilot.getByRole("button", { name: "Check typed answer" }).click();
  await expect(pilot.getByText("Incorrect.", { exact: true })).toBeVisible();
  await pilot.getByRole("button", { name: "Next typed question" }).click();
  await pilot.getByLabel("Complete inflected word").fill("wrong");
  await pilot.getByLabel("Complete inflected word").press("Enter");
  await expect(
    pilot.getByText("0 / 2 typed answers correct / attempted", { exact: true }),
  ).toBeVisible();
});

test("mixed sessions balance cases and mistake review resolves only corrected questions", async ({
  page,
}) => {
  await page.route("https://docs.google.com/**", (r) => r.abort());
  await page.goto("/");
  await page.getByRole("button", { name: "Open grammar practice" }).click();
  const pilot = page.getByRole("region", { name: "Typed case pilot" });
  await expect(
    pilot.getByRole("button", {
      name: "Review grammar mistakes (0)",
      exact: true,
    }),
  ).toBeDisabled();
  await pilot
    .getByRole("button", { name: "Start typed case practice" })
    .click();
  const firstText = await pilot.innerText();
  const missed = caseQuestions.find((q) => firstText.includes(q.sentence))!;
  await pilot.getByLabel("Complete inflected word").fill("wrong");
  await pilot.getByRole("button", { name: "Check typed answer" }).click();
  await pilot.getByRole("button", { name: "End typed session" }).click();
  await pilot
    .getByLabel("Required case", { exact: true })
    .selectOption("dative");
  await expect(
    pilot.getByRole("button", {
      name: "Review grammar mistakes (0)",
      exact: true,
    }),
  ).toBeDisabled();
  await pilot
    .getByLabel("Required case", { exact: true })
    .selectOption("mixed");
  await pilot
    .getByRole("button", { name: "Review grammar mistakes (1)", exact: true })
    .click();
  await expect(
    pilot.getByText("Reviewing grammar mistakes", { exact: true }),
  ).toBeVisible();
  await expect(pilot.getByText(missed.sentence, { exact: true })).toBeVisible();
  await pilot.getByLabel("Complete inflected word").fill("wrong");
  await pilot.getByLabel("Complete inflected word").press("Enter");
  await pilot.getByRole("button", { name: "My answer was correct" }).click();
  await pilot.getByRole("button", { name: "See typed results" }).click();
  await pilot.getByRole("button", { name: "Restart typed practice" }).click();
  await expect(
    pilot.getByRole("button", {
      name: "Review grammar mistakes (0)",
      exact: true,
    }),
  ).toBeDisabled();
  await page.reload();
  await page.getByRole("button", { name: "Open grammar practice" }).click();
  await pilot
    .getByLabel("Required case", { exact: true })
    .selectOption("mixed");
  await pilot
    .getByRole("button", { name: "Start typed case practice" })
    .click();
  const counts: Record<string, number> = {};
  const seen = new Set<string>();
  for (let i = 0; i < 12; i++) {
    const text = await pilot.innerText();
    const q = caseQuestions.find((q) => text.includes(q.sentence))!;
    expect(seen.has(q.id)).toBe(false);
    seen.add(q.id);
    counts[q.conceptId] = (counts[q.conceptId] || 0) + 1;
    await expect(
      pilot.getByText(new RegExp("Required case: " + q.conceptId, "i")),
    ).toBeVisible();
    await pilot.getByLabel("Complete inflected word").fill(q.answer);
    await pilot.getByRole("button", { name: "Check typed answer" }).click();
    await pilot
      .getByRole("button", {
        name: i === 11 ? "See typed results" : "Next typed question",
      })
      .click();
  }
  expect(counts).toEqual({ locative: 4, dative: 4, ablative: 4 });
  await expect(
    pilot.getByText("12 / 12 typed answers correct / attempted", {
      exact: true,
    }),
  ).toBeVisible();
  const attempts = await page.evaluate(
    () => JSON.parse(localStorage.getItem("quiz-my-turkish-v1")!).pilotAttempts,
  );
  expect(
    attempts.filter((a: any) => a.practiceMode === "mixed_cases"),
  ).toHaveLength(12);
  expect(
    attempts.filter((a: any) => a.practiceMode === "mistake_review"),
  ).toHaveLength(1);
  expect(attempts.filter((a: any) => a.manual)).toHaveLength(1);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
