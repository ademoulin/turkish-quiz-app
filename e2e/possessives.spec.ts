import { test, expect } from "@playwright/test";
import { possessiveQuestions, possessiveConcepts } from "../src/possessives";
test.use({ hasTouch: true });
async function open(page: import("@playwright/test").Page) {
  await page.route("https://docs.google.com/**", (r) => r.abort());
  await page.goto("/");
  await page.getByRole("button", { name: "Open grammar practice" }).click();
  await page.getByLabel("Practice activity", {exact:true}).selectOption("possessives");
  return page.getByRole("region", { name: "Typed possessive practice" });
}
test("all six owners: 24 unique questions, explicit number, touch, keyboard and correction", async ({
  page,
}) => {
  const area = await open(page);
  const seen = new Set<string>();
  for (const owner of Object.keys(possessiveConcepts)) {
    await area
      .getByLabel("Required owner", { exact: true })
      .selectOption(owner);
    await area
      .getByRole("button", { name: "Start possessive practice" })
      .click();
    for (let i = 0; i < 4; i++) {
      const text = await area.innerText();
      const q = possessiveQuestions.find(
        (q) => q.conceptId === owner && text.includes(q.sentence),
      )!;
      expect(seen.has(q.id)).toBe(false);
      seen.add(q.id);
      await expect(area.getByText(q.explanation, { exact: true })).toHaveCount(
        0,
      );
      await expect(
        area.getByText(new RegExp("Noun number: " + q.nounNumber)),
      ).toBeVisible();
      const input = area.getByLabel("Complete inflected word");
      await expect(input).toBeFocused();
      if (seen.size === 1) {
        await area.getByRole("button", { name: "ğ", exact: true }).tap();
        await expect(input).toHaveValue("ğ");
        await input.fill("wrong");
        await input.press("Enter");
        await area
          .getByRole("button", { name: "My answer was correct" })
          .click();
      } else {
        await input.fill(q.answer);
        await area.getByRole("button", { name: "Check typed answer" }).click();
      }
      await expect(input).toBeDisabled();
      await expect(
        area.getByText(q.explanation, { exact: true }),
      ).toBeVisible();
      await expect(
        area.getByText(
          `${i + 1} / ${i + 1} typed answers correct / attempted`,
          { exact: true },
        ),
      ).toBeVisible();
      await area
        .getByRole("button", {
          name: i === 3 ? "See typed results" : "Next typed question",
        })
        .click();
    }
    await expect(area.getByText("Possessive session complete")).toBeVisible();
    await area.getByRole("button", { name: "Restart typed practice" }).click();
  }
  expect(seen.size).toBe(24);
  const data = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("quiz-my-turkish-v1")!),
  );
  expect(data.pilotAttempts).toHaveLength(24);
  expect(data.pilotAttempts.filter((a: any) => a.manual)).toHaveLength(1);
  expect(
    data.pilotAttempts.every(
      (a: any) =>
        a.owner && a.nounNumber && a.practiceMode === "single_possessive",
    ),
  ).toBe(true);
  await page.getByLabel("Practice activity", {exact:true}).selectOption("cases");
  const cases = page.getByRole("region", { name: "Case Forms" });
  await expect(
    cases.getByText(
      "0 saved typed attempts · 0 correct, including self-corrections",
      { exact: true },
    ),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("mixed possessives balance owners; review, persistence and backup preserve evidence", async ({
  page,
}) => {
  const area = await open(page);
  await area
    .getByLabel("Required owner", { exact: true })
    .selectOption("mixed");
  await area.getByRole("button", { name: "Start possessive practice" }).click();
  const counts: Record<string, number> = {};
  for (let i = 0; i < 12; i++) {
    const text = await area.innerText();
    const q = possessiveQuestions.find((q) => text.includes(q.sentence))!;
    counts[q.conceptId] = (counts[q.conceptId] || 0) + 1;
    await area
      .getByLabel("Complete inflected word")
      .fill(i === 0 ? "wrong" : q.answer);
    await area.getByLabel("Complete inflected word").press("Enter");
    await area
      .getByRole("button", {
        name: i === 11 ? "See typed results" : "Next typed question",
      })
      .click();
  }
  expect(Object.values(counts)).toEqual([2, 2, 2, 2, 2, 2]);
  await area.getByRole("button", { name: "Restart typed practice" }).click();
  await area
    .getByRole("button", {
      name: "Review possessive mistakes (1)",
      exact: true,
    })
    .click();
  const text = await area.innerText();
  const q = possessiveQuestions.find((q) => text.includes(q.sentence))!;
  await area.getByLabel("Complete inflected word").fill(q.answer);
  await area.getByLabel("Complete inflected word").press("Enter");
  await area.getByRole("button", { name: "See typed results" }).click();
  await area.getByRole("button", { name: "Restart typed practice" }).click();
  await expect(
    area.getByRole("button", {
      name: "Review possessive mistakes (0)",
      exact: true,
    }),
  ).toBeDisabled();
  await page.reload();
  await page.getByRole("button", { name: "Open grammar practice" }).click();
  await page.getByLabel("Practice activity", {exact:true}).selectOption("possessives");
  await expect(
    area.getByText(
      "13 saved typed attempts · 12 correct, including self-corrections",
      { exact: true },
    ),
  ).toBeVisible();
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
    page.getByText(/Imported 13 grammar results/),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("quiz-my-turkish-v1")!).pilotAttempts
          .length,
    ),
  ).toBe(13);
});
test("possessive checking works in a sandbox with no form permission on the Pages path", async ({
  page,
}) => {
  await page.route("https://docs.google.com/**", (r) => r.abort());
  await page.goto("/");
  await page.setContent(
    '<iframe sandbox="allow-scripts allow-same-origin" src="http://127.0.0.1:4173/turkish-quiz-app/"></iframe>',
  );
  const frame = page.frameLocator("iframe");
  await frame.getByRole("button", { name: "Open grammar practice" }).click();
  await frame.getByLabel("Practice activity", {exact:true}).selectOption("possessives");
  const area = frame.getByRole("region", { name: "Typed possessive practice" });
  await area.getByRole("button", { name: "Start possessive practice" }).click();
  await area.getByLabel("Complete inflected word").fill("wrong");
  await area.getByRole("button", { name: "Check typed answer" }).click();
  await expect(area.getByText("Incorrect.", { exact: true })).toBeVisible();
});
