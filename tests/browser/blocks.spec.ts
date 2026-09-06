import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

const DEMO_NOTICE = /Demo only|Demo composer|Demo message|Demo changes|not connected|locally/i;

for (const style of ["css-modules", "tailwind"]) {
  test(`${style}: login, composer and task interactions have no demo notices`, async ({ page }) => {
    await page.addInitScript((value) => localStorage.setItem("preferred-style", value), style);
    const logs: string[] = [];
    page.on("console", (message) => logs.push(message.text()));
    await page.goto("/blocks/card-login");
    await expect(page.getByRole("combobox", { name: "Select style framework" })).toHaveText(
      style === "tailwind" ? "Tailwind CSS" : "CSS Modules"
    );
    await expect(page.locator("html")).toHaveAttribute("data-style", style);
    await expect(page.getByText(DEMO_NOTICE)).toHaveCount(0);
    await page.getByRole("textbox", { name: "Email", exact: true }).fill("demo@example.com");
    await page.getByLabel("Password", { exact: true }).fill("do-not-log-this-password");
    await page.getByRole("button", { name: "Sign In", exact: true }).click();
    await expect(page.getByText(DEMO_NOTICE)).toHaveCount(0);
    expect(logs.join("\n")).not.toContain("do-not-log-this-password");
    expect(logs.join("\n")).not.toContain("hydrated");
    await expect(page.getByRole("button", { name: "Forgot password?" })).toBeDisabled();

    await page.goto("/blocks/ai-chat");
    await expect(page.getByRole("button", { name: "Send message" })).toBeDisabled();
    await expect(page.getByText(DEMO_NOTICE)).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Attach file" })).toHaveCount(0);
    await page.getByRole("textbox", { name: "Message" }).fill("  ");
    await expect(page.getByRole("button", { name: "Send message" })).toBeDisabled();
    await page.getByRole("textbox", { name: "Message" }).fill("Explain this component");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByText(DEMO_NOTICE)).toHaveCount(0);
    await expect(page.getByRole("textbox", { name: "Message" })).toHaveValue("");

    await page.goto("/blocks/card-task");
    await page.getByRole("button", { name: "Task options" }).click();
    await expect(page.getByText(DEMO_NOTICE)).toHaveCount(0);
    await page.getByRole("menuitem", { name: "Add collaborator" }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.getByLabel("2 collaborators")).toBeVisible();
    await page.getByRole("button", { name: "Task options" }).click();
    await page.getByRole("menuitem", { name: "Change due date" }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.getByText("1d", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Task options" }).click();
    await page.getByRole("menuitem", { name: "Delete task" }).click();
    await expect(page.getByText(DEMO_NOTICE)).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Restore task" })).toHaveCount(0);
    await expect(page.getByText("Update Documentation", { exact: true })).toBeVisible();
  });
}

test("viewer defers code, retries, preserves files across styles and supports keyboard navigation", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  const requests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("/api/blocks/")) {
      requests.push(request.url());
    }
  });
  const response = await page.goto("/blocks/card-traffic");
  expect(await response?.text()).not.toContain("highlightedContent");
  await expect(page.getByText("Website Traffic", { exact: true })).toBeVisible();
  expect(requests).toHaveLength(0);
  let fail = true;
  await page.route("**/api/blocks/**", async (route) => {
    if (fail) {
      fail = false;
      await route.fulfill({ status: 500, body: "failed" });
    } else {
      await route.continue();
    }
  });
  await page.getByRole("tab", { name: "Code", exact: true }).click();
  await page.getByRole("button", { name: "Retry", exact: true }).click();
  await expect(page.locator("pre")).toContainText("CardTraffic");
  await expect(page.getByText("page.tsx · Usage example · not installed", { exact: true })).toBeVisible();
  const navigation = page.getByRole("navigation", { name: "Source files" });
  const file = navigation.getByRole("button", { name: "data.json", exact: true });
  await file.focus();
  await page.keyboard.press("Enter");
  await expect(file).toHaveAttribute("aria-current", "true");
  await expect(page.getByText("data.json · Installed source", { exact: true })).toBeVisible();
  await expect(page.locator("pre")).toContainText("2025-07-14");
  await page.getByRole("combobox", { name: "Select style framework" }).click();
  await page.getByRole("option", { name: "Tailwind CSS", exact: true }).click();
  await expect(file).toHaveAttribute("aria-current", "true");
  await expect(page.getByText("data.json · Installed source", { exact: true })).toBeVisible();
  await expect(page.locator("pre")).toContainText("2025-07-14");
  await page.getByRole("button", { name: "Copy code to clipboard", exact: true }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('"2025-07-14"');
  const folder = navigation.getByRole("button", { name: "components", exact: true }).first();
  await folder.focus();
  await page.keyboard.press("Space");
  await expect(folder).toHaveAttribute("aria-expanded", "false");
  await page.keyboard.press("Enter");
  await expect(folder).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await expect(navigation.getByRole("button", { name: "blocks", exact: true })).toBeFocused();
});

test("code endpoint rejects unknown blocks, styles and paths", async ({ request }) => {
  for (const url of [
    "/api/blocks/missing/code?style=css-modules&path=page.tsx",
    "/api/blocks/card-task/code?style=unknown&path=page.tsx",
    "/api/blocks/card-task/code?style=css-modules&path=../../package.json",
  ]) {
    expect((await request.get(url)).status()).toBe(404);
  }
  expect((await request.get("/blocks/kanban-board")).status()).toBe(404);
  expect((await request.get("/blocks/card-task-tailwind")).status()).toBe(404);
});

test("mobile code selection and late responses keep the selected file", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/blocks/card-traffic");
  let release: () => void = () => {
    throw new Error("Response gate was not initialized");
  };
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  let intercepted = false;
  await page.route("**/api/blocks/**", async (route) => {
    if (new URL(route.request().url()).searchParams.get("path")?.endsWith("page.tsx")) {
      intercepted = true;
      await gate;
      await route
        .fulfill({ json: { content: "STALE FILE", highlightedContent: "<pre>STALE FILE</pre>" } })
        .catch(() => {
          /* Switching files aborts the held request. */
        });
    } else {
      await route.continue();
    }
  });
  await page.getByRole("tab", { name: "Code", exact: true }).click();
  await expect.poll(() => intercepted).toBe(true);
  await page
    .getByRole("combobox", { name: "Select file", exact: true })
    .selectOption("components/blocks/card-traffic/data.json");
  await expect(page.locator("pre")).toContainText("2025-07-14");
  release();
  await expect(page.locator("pre")).not.toContainText("STALE FILE");
  await expect(page.getByRole("combobox", { name: "Select file", exact: true })).toHaveValue(
    "components/blocks/card-traffic/data.json"
  );
});

test("traffic summaries match the shared fixture in both styles", async ({ page }) => {
  const data: { mobile: number; desktop: number }[] = JSON.parse(
    readFileSync("registry/brook/blocks-shared-files/card-traffic/data.json", "utf8")
  );
  const mobile = data.reduce((sum, point) => sum + point.mobile, 0).toLocaleString("en-US");
  const desktop = data.reduce((sum, point) => sum + point.desktop, 0).toLocaleString("en-US");
  await page.goto("/blocks/card-traffic");
  for (const label of ["CSS Modules", "Tailwind CSS"]) {
    await page.getByRole("combobox", { name: "Select style framework" }).click();
    await page.getByRole("option", { name: label, exact: true }).click();
    await expect(page.getByText(mobile, { exact: true })).toBeVisible();
    await expect(page.getByText(desktop, { exact: true })).toBeVisible();
  }
});

test("affected previews expose a loading status while other previews keep server rendering", async ({
  browser,
  request,
}) => {
  const page = await browser.newPage({ javaScriptEnabled: false });
  await page.goto("/blocks/card-traffic");
  await expect(page.getByRole("status")).toHaveText("Loading preview…");
  await page.close();
  const response = await request.get("/blocks/pricing-section");
  expect(await response.text()).toContain('data-slot="card"');
});
