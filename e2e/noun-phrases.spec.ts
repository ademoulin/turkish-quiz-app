import { test, expect } from "@playwright/test";
import { phraseQuestions } from "../src/nounPhrases";
test.use({ hasTouch: true });
async function open(page: import("@playwright/test").Page) {
  await page.route("https://docs.google.com/**", (r) => r.abort());
  await page.goto("/");
  await page.getByRole("button", { name: "Open grammar practice" }).click();
  await page.getByLabel("Practice activity", {exact:true}).selectOption("phrases");
  return page.getByRole("region", { name: "Typed noun phrase practice" });
}
test("all 20 noun phrases: full phrase input, explicit relationship/number, touch, feedback and correction", async ({
  page,
}) => {
  const area = await open(page);
  await area
    .getByRole("button", { name: "Start noun phrase practice" })
    .click();
  const seen = new Set<string>();
  for (let i = 0; i < 20; i++) {
    const text = await area.innerText();
    const q = phraseQuestions.find((q) => text.includes(q.sentence))!;
    expect(seen.has(q.id)).toBe(false);
    seen.add(q.id);
    await expect(
      area.getByText(`Meaning: ${q.sentence}`, { exact: true }),
    ).toBeVisible();
    await expect(
      area.getByText("Possessor: singular · Possessed item: singular.", {
        exact: true,
      }),
    ).toBeVisible();
    await expect(area.getByText(q.explanation, { exact: true })).toHaveCount(0);
    const field = area.getByLabel("Complete Turkish noun phrase");
    await expect(field).toBeFocused();
    if (i === 0) {
      await area.getByRole("button", { name: "ş", exact: true }).tap();
      await expect(field).toHaveValue("ş");
      await field.fill("wrong");
      await area.getByRole("button", { name: "Check typed answer" }).click();
      await area.getByRole("button", { name: "My answer was correct" }).click();
    } else {
      await field.fill("  " + q.answer.replace(" ", "   ") + "  ");
      await field.press("Enter");
    }
    await expect(field).toBeDisabled();
    await expect(area.getByText(q.explanation, { exact: true })).toBeVisible();
    await expect(
      area.getByText(`${i + 1} / ${i + 1} correct`, {
        exact: true,
      }),
    ).toBeVisible();
    await area
      .getByRole("button", {
        name: i === 19 ? "See typed results" : "Next typed question",
      })
      .click();
  }
  await expect(area.getByText("Noun phrase session complete")).toBeVisible();
  const attempts = await page.evaluate(
    () => JSON.parse(localStorage.getItem("quiz-my-turkish-v1")!).pilotAttempts,
  );
  expect(attempts).toHaveLength(20);
  expect(attempts.filter((a: any) => a.manual)).toHaveLength(1);
  expect(
    attempts.every(
      (a: any) =>
        a.exerciseType === "typed_noun_phrase" &&
        a.possessor &&
        a.possessed &&
        a.possessorNumber === "singular" &&
        a.possessedNumber === "singular",
    ),
  ).toBe(true);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("phrase mistake review, reload and backup stay separate from word-form evidence", async ({
  page,
}) => {
  const area = await open(page);
  await expect(
    area.getByRole("button", {
      name: "Review noun phrase mistakes (0)",
      exact: true,
    }),
  ).toBeDisabled();
  await area
    .getByRole("button", { name: "Start noun phrase practice" })
    .click();
  const text = await area.innerText();
  const q = phraseQuestions.find((q) => text.includes(q.sentence))!;
  await area.getByLabel("Complete Turkish noun phrase").fill("wrong");
  await area.getByLabel("Complete Turkish noun phrase").press("Enter");
  await area.getByRole("button", { name: "End typed session" }).click();
  await area
    .getByRole("button", {
      name: "Review noun phrase mistakes (1)",
      exact: true,
    })
    .click();
  await expect(
    area.getByText(`Meaning: ${q.sentence}`, { exact: true }),
  ).toBeVisible();
  await area.getByLabel("Complete Turkish noun phrase").fill(q.answer);
  await area.getByRole("button", { name: "Check typed answer" }).click();
  await area.getByRole("button", { name: "See typed results" }).click();
  await area.getByRole("button", { name: "Restart typed practice" }).click();
  await expect(
    area.getByRole("button", {
      name: "Review noun phrase mistakes (0)",
      exact: true,
    }),
  ).toBeDisabled();
  await page.reload();
  await page.getByRole("button", { name: "Open grammar practice" }).click();
  await page.getByLabel("Practice activity", {exact:true}).selectOption("phrases");
  await expect(
    area.getByText(
      "2 saved typed attempts · 1 correct, including self-corrections",
      { exact: true },
    ),
  ).toBeVisible();
  for (const [name, activity] of [["Case Forms", "cases"], ["Typed possessive practice", "possessives"]]) {
    await page.getByLabel("Practice activity", {exact:true}).selectOption(activity);
    await expect(
      page
        .getByRole("region", { name, exact: true })
        .getByText(
          "0 saved typed attempts · 0 correct, including self-corrections",
          { exact: true },
        ),
    ).toBeVisible();
  }
  await page.getByLabel("Practice activity", {exact:true}).selectOption("phrases");
  await page
    .getByRole("button", { name: "Your progress", exact: true })
    .click();
  const download = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Export progress", exact: true })
    .click();
  await page
    .locator("input[type=file]")
    .setInputFiles((await (await download).path())!);
  await expect(
    page.getByText(/Imported 2 grammar results/),
  ).toBeVisible();
  await page
    .locator("input[type=file]")
    .setInputFiles({
      name: "legacy.json",
      mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify({ version: 1, attempts: [] })),
    });
  await expect(
    page.getByText(/Imported 0 grammar results/),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("quiz-my-turkish-v1")!).pilotAttempts
          .length,
    ),
  ).toBe(2);
});
test("phrase checking works in the embedded preview sandbox and on the Pages path", async ({
  page,
}) => {
  await page.route("https://docs.google.com/**", (r) => r.abort());
  await page.goto("/");
  await page.setContent(
    '<iframe sandbox="allow-scripts allow-same-origin" src="http://127.0.0.1:4173/turkish-quiz-app/"></iframe>',
  );
  const frame = page.frameLocator("iframe");
  await frame.getByRole("button", { name: "Open grammar practice" }).click();
  await frame.getByLabel("Practice activity", {exact:true}).selectOption("phrases");
  const area = frame.getByRole("region", {
    name: "Typed noun phrase practice",
  });
  await area
    .getByRole("button", { name: "Start noun phrase practice" })
    .click();
  await area.getByLabel("Complete Turkish noun phrase").fill("wrong");
  await area.getByRole("button", { name: "Check typed answer" }).click();
  await expect(area.getByText("Incorrect.", { exact: true })).toBeVisible();
});
