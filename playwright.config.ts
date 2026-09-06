import { defineConfig } from "@playwright/test";

export default defineConfig({
  timeout: 60_000,
  testDir: "./tests/browser",
  use: { baseURL: "http://127.0.0.1:3107", headless: true },
  workers: 2,
  webServer: {
    command: "pnpm start --port 3107",
    url: "http://127.0.0.1:3107/blocks",
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
