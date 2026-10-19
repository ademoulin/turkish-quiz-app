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
  await page
    .locator("input[type=file]")
    .setInputFiles({
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
