import { expect, test } from "@playwright/test";

for (const style of ["css-modules", "tailwind"]) {
  test(`${style}: description fades in and out, including an interrupted close`, async ({ page }) => {
    await page.addInitScript((value) => localStorage.setItem("preferred-style", value), style);
    await page.goto("/blocks/expandable-card-spread");
    const trigger = page.getByRole("button", { name: "Expand Accessible Interfaces" });
    await expect(trigger).toBeVisible();
    await expect
      .poll(() =>
        trigger.evaluate((element) => {
          for (let current: Element | null = element; current; current = current.parentElement) {
            if (getComputedStyle(current).transform !== "none") {
              return false;
            }
          }
          return true;
        })
      )
      .toBe(true);
    const sampling = page.evaluate(async () => {
      const opacities: number[] = [];
      let maxBlur = 0;
      let maxOffset = 0;
      let expectedOffset = 0;
      const start = performance.now();
      while (performance.now() - start < 700) {
        const description = document.querySelector('[role="dialog"] p');
        if (description) {
          const computed = getComputedStyle(description);
          opacities.push(Number(computed.opacity));
          maxBlur = Math.max(maxBlur, Number.parseFloat(computed.filter.replace("blur(", "")) || 0);
          maxOffset = Math.max(maxOffset, new DOMMatrixReadOnly(computed.transform).f);
          expectedOffset = Number.parseFloat(computed.height) + 24;
        }
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      }
      return { opacities, maxBlur, maxOffset, expectedOffset };
    });
    await trigger.click();
    const entrance = await sampling;
    expect(entrance.maxBlur).toBeCloseTo(4, 1);
    expect(entrance.maxOffset).toBeCloseTo(entrance.expectedOffset, 0);
    await expect(page.getByRole("dialog")).toHaveCSS("overflow", "hidden");
    expect(entrance.opacities.some((opacity) => opacity < 0.1)).toBe(true);
    expect(entrance.opacities.some((opacity) => opacity > 0.1 && opacity < 0.9)).toBe(true);
    expect(entrance.opacities.at(-1)).toBe(1);
    await expect(page.getByRole("dialog").locator("p")).toHaveCSS("filter", "blur(0px)");
    const exiting = page.evaluate(async () => {
      const samples: number[] = [];
      let maxDistortion = 0;
      let backgroundGap = false;
      const start = performance.now();
      while (performance.now() - start < 400) {
        const popup = document.querySelector('[role="dialog"]');
        const card = document.querySelector('[aria-label^="Expand Accessible"]');
        if (card?.getAttribute("aria-expanded") === "false" && Number(getComputedStyle(card).opacity) < 0.99) {
          backgroundGap ||= !popup || popup.getBoundingClientRect().width === 0;
        }
        const description = document.querySelector('[role="dialog"] p');
        if (description) {
          samples.push(Number(getComputedStyle(description).opacity));
          let scaleX = 1;
          let scaleY = 1;
          for (let element: Element | null = description; element; element = element.parentElement) {
            const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform);
            scaleX *= Math.hypot(matrix.a, matrix.b);
            scaleY *= Math.hypot(matrix.c, matrix.d);
          }
          maxDistortion = Math.max(maxDistortion, Math.abs(scaleX / scaleY - 1));
        }
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      }
      return { samples, maxDistortion, backgroundGap };
    });
    await page.keyboard.press("Escape");
    const exit = await exiting;
    expect(exit.samples.some((opacity) => opacity > 0.1 && opacity < 0.9)).toBe(true);
    expect(exit.maxDistortion).toBeLessThan(0.02);
    expect(exit.backgroundGap).toBe(false);
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await trigger.click();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.getByText("Techniques for building interfaces", { exact: false })).toHaveCount(0);
    await trigger.focus();
    await page.keyboard.press("Enter");
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByRole("dialog").locator("p")).toHaveCSS("filter", "blur(0px)");
    await expect(page.getByRole("dialog").locator("p")).toHaveCSS("opacity", "1");
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test(`${style}: reduced-motion card spread closes without moving its contents`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.addInitScript((value) => localStorage.setItem("preferred-style", value), style);
    await page.goto("/blocks/expandable-card-spread");
    const trigger = page.getByRole("button", { name: "Expand Accessible Interfaces" });
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    const movingContents = await page.evaluate(async () => {
      await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      return Array.from(document.querySelectorAll('[aria-label^="Expand "] *')).filter((element) => {
        const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform);
        return (
          Math.abs(matrix.a - 1) > 0.01 ||
          Math.abs(matrix.d - 1) > 0.01 ||
          Math.abs(matrix.e) > 1 ||
          Math.abs(matrix.f) > 1
        );
      }).length;
    });
    expect(movingContents).toBe(0);
    await expect(trigger).toBeFocused();
  });

  test(`${style}: card spread titles morph without stretching or snapping`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.addInitScript((value) => localStorage.setItem("preferred-style", value), style);
    await page.goto("/blocks/expandable-card-spread");
    await expect(page.getByRole("combobox", { name: "Select style framework" })).toHaveText(
      style === "tailwind" ? "Tailwind CSS" : "CSS Modules"
    );
    const trigger = page.getByRole("button", { name: "Expand Accessible Interfaces" });
    const popup = page.getByRole("dialog");
    await expect.poll(() => trigger.evaluate((element) => getComputedStyle(element).transform)).toBe("none");

    for (const action of ["open", "escape", "open", "click"]) {
      // Observe actual rendered glyphs in both directions, including the parent card's scale correction.
      const sampling = page.evaluate(async () => {
        const start = performance.now();
        let frames = 0;
        let maxDistortion = 0;
        let maxHeightStep = 0;
        let maxTextOverflow = 0;
        let previousHeight = 0;
        let sawCardMotion = false;
        while (performance.now() - start < 1000) {
          const activeTitle =
            document.querySelector('[role="dialog"] h2') ??
            document.querySelector('[aria-label^="Expand Accessible"] h3');
          const activeLine = activeTitle?.querySelector("span") ?? activeTitle;
          const height = activeLine?.getBoundingClientRect().height ?? 0;
          if (previousHeight && height) {
            maxHeightStep = Math.max(maxHeightStep, Math.abs(height / previousHeight - 1));
          }
          previousHeight = height;
          for (const title of document.querySelectorAll('h3, [role="dialog"] h2, [role="dialog"] p')) {
            const lines = title.querySelectorAll("span");
            for (const line of lines.length ? lines : [title]) {
              let scaleX = 1;
              let scaleY = 1;
              let opacity = 1;
              for (let element: Element | null = line; element; element = element.parentElement) {
                const computed = getComputedStyle(element);
                opacity *= Number(computed.opacity);
                const matrix = new DOMMatrixReadOnly(computed.transform);
                scaleX *= Math.hypot(matrix.a, matrix.b);
                scaleY *= Math.hypot(matrix.c, matrix.d);
                sawCardMotion ||= Math.abs(matrix.a - 1) > 0.01 || Math.abs(matrix.e) > 1;
              }
              maxDistortion = Math.max(maxDistortion, Math.abs(scaleX / scaleY - 1));
              const card = line.closest('[role="dialog"], [role="button"]');
              if (card && opacity > 0.05 && title.tagName !== "P") {
                const textBox = line.getBoundingClientRect();
                const cardBox = card.getBoundingClientRect();
                maxTextOverflow = Math.max(
                  maxTextOverflow,
                  cardBox.left - textBox.left,
                  textBox.right - cardBox.right,
                  cardBox.top - textBox.top,
                  textBox.bottom - cardBox.bottom
                );
              }
            }
          }
          frames += 1;
          await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
        }
        return { frames, maxDistortion, maxHeightStep, maxTextOverflow, sawCardMotion };
      });
      if (action === "open") {
        await trigger.click();
      } else if (action === "escape") {
        await page.keyboard.press("Escape");
      } else {
        await popup.click();
      }
      const result = await sampling;
      expect(result.frames).toBeGreaterThan(10);
      expect(result.sawCardMotion).toBe(true);
      expect(result.maxDistortion).toBeLessThan(0.02);
      // Catch an immediate font-size jump, even when position-only layout avoids stretching.
      expect(result.maxHeightStep).toBeLessThan(0.2);
      expect(result.maxTextOverflow).toBeLessThan(1);
      if (action === "open") {
        await expect(popup).toBeVisible();
      } else {
        await expect(popup).toHaveCount(0);
        await expect(trigger).toBeFocused();
      }
    }
  });
}
