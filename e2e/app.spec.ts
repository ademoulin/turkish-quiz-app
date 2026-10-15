import { test, expect } from "@playwright/test";
test("live browser vocabulary fetch, mobile study and persistent manual correction", async ({
  page,
}) => {
  page.on("pageerror", (e) => {
    throw e;
  });
  await page.goto("/");
  await expect(page.getByText("Your vocabulary is up to date")).toBeVisible({
    timeout: 30000,
  });
  await expect(page.locator(".word-row")).toHaveCount(152);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Select all matching" }).click();
  await page.getByRole("button", { name: "Let’s practise" }).click();
  await page.getByLabel("What is the Turkish word?").fill("definitely wrong");
  await page.getByLabel("What is the Turkish word?").press("Enter");
  await expect(
    page.getByText("A little practice makes it stick."),
  ).toBeVisible();
  await expect(page.getByText("Question 1 of 10")).toBeVisible();
  await page.getByRole("button", { name: "My answer was correct" }).click();
  await expect(page.getByText("Marked correct by you.")).toBeVisible();
  await page.locator("#answer").press("Enter");
  await expect(page.getByText("Question 2 of 10")).toBeVisible();
  await page.getByRole("button", { name: "End session" }).click();
  await expect(
    page.getByText("correct answers · 1 self-corrections"),
  ).toBeVisible();
  await page.reload();
  await page
    .getByRole("button", { name: "Your progress", exact: true })
    .click();
  await expect(
    page.getByText("marked correct by you", { exact: false }),
  ).toBeVisible();
  await page.screenshot({
    path: "/tmp/quiz-my-turkish-mobile.png",
    fullPage: true,
  });
});
const csv =
  'ID,Verb,Type,Meaning,Case,Case Notes,Acceptable English\nv001,gelmek,vi,"come, arrive",,,\nv002,bina,n,building,,,';
async function fixture(page: import("@playwright/test").Page) {
  await page.route("https://docs.google.com/**", (route) =>
    route.fulfill({ status: 200, contentType: "text/csv", body: csv }),
  );
  await page.goto("/");
  await expect(page.getByText("Your vocabulary is up to date")).toBeVisible();
}
test("conjugation grading, feedback, ending and mistake review", async ({
  page,
}) => {
  await fixture(page);
  await page
    .getByRole("button", { name: "Conjugation Put the endings to work." })
    .click();
  for (const label of ["Definite past · -di", "Future · -ecek"])
    await page.getByLabel(label, { exact: true }).uncheck();
  for (const person of ["sen", "o", "biz", "siz", "onlar"])
    await page.getByRole("button", { name: person, exact: true }).click();
  await page.getByRole("button", { name: "negative", exact: true }).click();
  await page.getByRole("button", { name: "Select all matching" }).click();
  await page.getByRole("button", { name: "Let’s practise" }).click();
  await expect(page.getByText("Question 1 of 1")).toBeVisible();
  await page.locator("#answer").fill("wrong");
  await page.getByRole("button", { name: "Check answer" }).click();
  await expect(page.locator(".expected")).toHaveText("geliyorum");
  await expect(page.locator(".breakdown")).toHaveText("gel + iyor + um");
  await page.getByRole("button", { name: "See my results" }).click();
  await page
    .getByRole("button", { name: "Review mistakes", exact: true })
    .click();
  await page.locator("#answer").fill("GELİYORUM!");
  await page.locator("#answer").press("Enter");
  await expect(page.getByText("That’s right. Güzel!")).toBeVisible();
  await page.locator("#answer").press("Enter");
  await expect(
    page.getByRole("button", { name: "Review mistakes", exact: true }),
  ).toBeDisabled();
});
test("failed refresh uses cache and a later edit keeps progress by ID", async ({
  page,
}) => {
  await fixture(page);
  await page.getByRole("button", { name: "Select all matching" }).click();
  await page.getByRole("button", { name: "Let’s practise" }).click();
  await page.locator("#answer").fill("wrong");
  await page.locator("#answer").press("Enter");
  await page.getByRole("button", { name: "End session" }).click();
  const before = await page.evaluate(
    () => JSON.parse(localStorage.getItem("quiz-my-turkish-v1")!).attempts,
  );
  await page.unroute("https://docs.google.com/**");
  await page.route("https://docs.google.com/**", (r) => r.abort());
  await page.reload();
  await expect(page.getByText("Using saved vocabulary")).toBeVisible();
  await expect(page.locator(".word-row")).toHaveCount(2);
  await page.unroute("https://docs.google.com/**");
  await page.route("https://docs.google.com/**", (r) =>
    r.fulfill({
      contentType: "text/csv",
      body: csv.replace("come, arrive", "come, arrive, get here"),
    }),
  );
  await page.getByRole("button", { name: "Refresh vocabulary" }).click();
  await expect(page.getByText("Your vocabulary is up to date")).toBeVisible();
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("quiz-my-turkish-v1")!).attempts,
    ),
  ).toEqual(before);
  await expect(
    page.getByText("come, arrive, get here", { exact: true }),
  ).toBeVisible();
});
test("invalid and duplicate rows are flagged; sheet HTML renders as text", async ({
  page,
}) => {
  await page.route("https://docs.google.com/**", (r) =>
    r.fulfill({
      contentType: "text/csv",
      body:
        csv +
        "\nv002,duplicate,n,duplicate,,,\nv003,,n,missing,,,\nv004,test,n,<img src=x onerror=alert(1)>,,,",
    }),
  );
  let dialog = false;
  page.on("dialog", () => {
    dialog = true;
  });
  await page.goto("/");
  await expect(page.locator(".word-row")).toHaveCount(3);
  await expect(
    page.getByText("<img src=x onerror=alert(1)>", { exact: true }),
  ).toBeVisible();
  expect(dialog).toBe(false);
  await page.getByText("2 vocabulary notes").click();
  await expect(
    page.getByText("Row 4: missing a required value or duplicate ID; skipped."),
  ).toBeVisible();
});
test("export/import round trip merges results and rejects invalid imports", async ({
  page,
}) => {
  await fixture(page);
  await page.getByRole("button", { name: "Select all matching" }).click();
  await page.getByRole("button", { name: "Let’s practise" }).click();
  await page.locator("#answer").fill("no");
  await page.locator("#answer").press("Enter");
  await page.getByRole("button", { name: "End session" }).click();
  await page.getByRole("button", { name: "Back to practice" }).click();
  await page
    .getByRole("button", { name: "Your progress", exact: true })
    .click();
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export progress" }).click();
  const file = await download;
  const path = await file.path();
  expect(path).toBeTruthy();
  await page.locator("input[type=file]").setInputFiles(path!);
  await expect(
    page.getByText("Imported 1 results.", { exact: false }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("quiz-my-turkish-v1")!).attempts.length,
    ),
  ).toBe(1);
  await page.locator("input[type=file]").setInputFiles({
    name: "bad.json",
    mimeType: "application/json",
    buffer: Buffer.from('{"version":1,"attempts":[{}]}'),
  });
  await expect(
    page.getByText("Invalid result in this file.", { exact: false }),
  ).toBeVisible();
});
test("packaged standalone HTML served normally fetches the real sheet", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4173/quiz-my-turkish.html");
  await expect(page.getByText("Your vocabulary is up to date")).toBeVisible({
    timeout: 30000,
  });
  await expect(page.locator(".word-row")).toHaveCount(152);
  await page.getByRole("button", { name: "Select all matching" }).click();
  await page.getByRole("button", { name: "Let’s practise" }).click();
  await page.locator("#answer").fill("test");
  await page.locator("#answer").press("Enter");
  await expect(page.locator(".feedback")).toBeVisible();
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("quiz-my-turkish-v1")!).attempts.length,
    ),
  ).toBe(1);
});

test('combined word types appear under each relevant filter', async ({page}) => {
 await page.route('https://docs.google.com/**', r=>r.fulfill({contentType:'text/csv',body:csv+'\nv003,konuşmak,vt/i,speak,,,\nv004,bugün,adv/n,today,,,'}));
 await page.goto('/');await expect(page.getByText('Your vocabulary is up to date')).toBeVisible();
 await page.getByLabel('Word type',{exact:true}).selectOption('vi');await expect(page.locator('.word-row')).toHaveCount(2);
 await page.getByLabel('Word type',{exact:true}).selectOption('n');await expect(page.locator('.word-row')).toHaveCount(2);
 await page.getByLabel('Word type',{exact:true}).selectOption('adv');await expect(page.locator('.word-row')).toHaveCount(1);
});
