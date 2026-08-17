import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const publicRoutes = [
  "/",
  "/about",
  "/contact",
  "/for-platforms",
  "/privacy",
  "/products/navdhan",
  "/team",
] as const;

test.describe("public routes", () => {
  for (const path of publicRoutes) {
    test(`${path} renders its primary content and canonical URL`, async ({ page }) => {
      const response = await page.goto(path);

      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        path === "/" ? "https://kubar.tech" : new URL(path, "https://kubar.tech").href,
      );
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        "content",
        /^https:\/\/kubar\.tech\/opengraph-image(?:\?.*)?$/,
      );
      await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
        "content",
        /^https:\/\/kubar\.tech\/opengraph-image(?:\?.*)?$/,
      );
    });

    test(`${path} has no automated WCAG A or AA violations`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path);
      await page.waitForTimeout(1_000);

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();

      expect(results.violations).toEqual([]);
    });
  }
});

test("the coming-soon platform page is excluded from indexing", async ({ page }) => {
  await page.goto("/for-platforms");

  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
});

test("skip link moves keyboard focus to the primary content", async ({ page }) => {
  await page.goto("/");

  const skipLink = page.getByRole("link", { name: /skip to (main )?content/i });
  await skipLink.focus();
  await expect(skipLink).toBeVisible();
  await skipLink.press("Enter");

  await expect(page.locator("#main-content")).toBeFocused();
});

test("footer email CTA exposes its label and mail destination", async ({ page }) => {
  await page.goto("/");

  const emailCta = page.getByRole("link", { name: "partnerships@kubar.tech", exact: true });
  await expect(emailCta).toHaveAttribute("href", "mailto:partnerships@kubar.tech");
});

test("contact form enforces required fields before making a request", async ({ page }) => {
  let contactRequests = 0;
  page.on("request", (request) => {
    if (request.method() === "POST" && request.url().endsWith("/api/contact")) {
      contactRequests += 1;
    }
  });

  await page.goto("/contact");
  await page.getByRole("button", { name: "Send Message" }).click();

  const fullName = page.getByLabel("Full Name");
  await expect(fullName).toBeFocused();
  expect(await fullName.evaluate((input: HTMLInputElement) => input.validity.valueMissing)).toBe(true);
  expect(contactRequests).toBe(0);
});
