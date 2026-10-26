import { existsSync } from "node:fs";
import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./e2e",
  timeout: 45000,
  fullyParallel: true,
  workers: process.env.CI ? 4 : undefined,
  grepInvert: process.env.UI_FULL_BANK === "1" ? undefined : /@bank-walkthrough/,
  use: {
    baseURL: "http://127.0.0.1:5173",
    launchOptions: {
      channel: process.env.PLAYWRIGHT_CHANNEL,
      executablePath:
        process.env.CHROMIUM_PATH ||
        (process.env.PLAYWRIGHT_CHANNEL ? undefined :
        (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined)),
      args: ["--no-sandbox"],
      proxy: process.env.HTTPS_PROXY
        ? { server: process.env.HTTPS_PROXY, bypass: "127.0.0.1,localhost" }
        : undefined,
    },
    viewport: { width: 390, height: 844 },
  },
  webServer: [
    {
      command: "npm run dev -- --port 5173",
      url: "http://127.0.0.1:5173",
      reuseExistingServer: !process.env.CI,
    },
    {
      command: (process.env.PLAYWRIGHT_REUSE_BUILD === "1" ? "" : "npm run build && ") + "npm run preview -- --port 4173 --base /turkish-quiz-app/",
      url: "http://127.0.0.1:4173/turkish-quiz-app/",
      reuseExistingServer: !process.env.CI,
    },
  ],
  reporter: "list",
});
