import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const publicRoutes = [
  "/",
  "/about",
  "/contact",
  "/for-platforms",
  "/privacy",
  "/products/kubar-protocol",
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
        /^https:\/\/kubar\.tech\/media\/kubar-labs-og-b2add55b\.png(?:\?.*)?$/,
      );
      await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
        "content",
        /^https:\/\/kubar\.tech\/media\/kubar-labs-og-b2add55b\.png(?:\?.*)?$/,
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

test("the platform page omits the visual coming-soon badge and remains excluded from indexing", async ({ page }) => {
  await page.goto("/for-platforms");

  await expect(page.getByText("Coming soon", { exact: true })).toHaveCount(0);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
});

test("the privacy page omits the Legal overline", async ({ page }) => {
  await page.goto("/privacy");

  await expect(page.getByText("Legal", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Privacy Policy", exact: true })).toBeVisible();
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

test("Home preserves its source hero and credibility sections", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Commerce to Capital | Kubar Labs");
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Commerce to Capital | Kubar Labs",
  );
  await expect(page.getByRole("heading", { name: "Connect commerce to capital.", exact: true })).toBeVisible();
  await expect(page.getByText("We build financial infrastructure that connects business activity to regulated capital, through NavDhan for embedded business credit and Kubar Protocol for cross-border trade finance", { exact: true })).toBeVisible();
  await expect(page.locator(".glass-card, .glass-card-gold")).toHaveCount(3);
  await expect(page.getByRole("region", { name: "Awards, programmes and recognitions" })).toBeAttached();
  await expect(page.getByRole("region", { name: "Technology programmes, grants and infrastructure support" })).toBeAttached();
  await expect(page.getByRole("region", { name: "Responsible lending, data protection and institutional recognition" })).toBeAttached();
  await expect(page.locator(".trust-flip-card")).toHaveCount(5);
  await expect(page.getByText("New Bharat. New Credit Rails. New Possibilities.", { exact: true })).toBeAttached();
  await expect(page.getByText("KUBAR LABS · COMMERCE TO CAPITAL", { exact: true })).toHaveCount(0);
  await expect(page.locator(".approved-eyebrow, .approved-product-card__eyebrow, .approved-architecture__parent > span, .approved-footer__eyebrow")).toHaveCount(0);
  await expect(page.locator('main > #built-for-trust + .approved-tagline-wrap + section[aria-label="Technology programmes, grants and infrastructure support"]')).toHaveCount(1);
  await expect(page.locator("#story")).toHaveCount(0);
  await expect(page.getByText("One business context. Two financing paths", { exact: false })).toHaveCount(0);
});

test("legacy Home story bookmarks redirect to the relocated NavDhan journey", async ({ page }) => {
  await page.goto("/#story");
  await expect(page).toHaveURL(/\/products\/navdhan#story$/);
  await expect(page.locator("#story")).toHaveCount(1);
});

test("NavDhan renders the exact eight-stage source journey once", async ({ page }) => {
  const stages = [
    ["Order Received", "Sheetal receives a ₹10 lakh bulk order through a B2B platform."],
    ["Capital Need Identified", "She needs ₹4 lakh in working capital to fulfil it."],
    ["Credit Intent Captured", "NavDhan captures the credit request inside the platform workflow."],
    ["Permissioned Data Structured", "With consent, NavDhan retrieves and structures relevant platform and financial data."],
    ["Application Pre-Qualified", "Lender-configured rules and sector-specific signals pre-qualify the application."],
    ["Application Routed", "The lender-ready application is routed to eligible lenders."],
    ["Lender Decision & Disbursal", "The selected regulated lender completes underwriting, pricing and disbursal."],
    ["Order Fulfilled", "Sheetal fulfils the order without leaving the platform."],
  ];

  await page.goto("/products/navdhan");
  await expect(page.locator(".navdhan-hero__copy > .navdhan-kicker, .navdhan-roles__copy > .navdhan-kicker, .navdhan-responsibility-card > .navdhan-kicker, .navdhan-direct-card > .navdhan-kicker, .approved-footer__eyebrow")).toHaveCount(0);
  await expect(page.locator("#story")).toHaveCount(1);
  await expect(page.locator(".old-way-step")).toHaveCount(4);
  await expect(page.locator(".timeline-item")).toHaveCount(8);

  for (const [title, description] of stages) {
    await expect(page.locator(".timeline-step-title").getByText(title, { exact: true })).toHaveCount(1);
    await expect(page.locator(".timeline-step-desc").getByText(description, { exact: true })).toHaveCount(1);
  }

  await expect(page.getByText("NavDhan by Kubar Labs", { exact: true })).toHaveCount(1);
  await expect(page.getByRole("link", { name: "Request a Demo" })).toHaveAttribute("href", "/contact");
});

test("Protocol exposes the six approved stages and explicit maturity boundary", async ({ page }) => {
  const stageTitles = [
    "Begin with the trade commitment.",
    "Connect pre-shipment finance.",
    "Link shipment evidence.",
    "Identify the accepted receivable.",
    "Connect eligible financing.",
    "Settle through the bank.",
  ];

  await page.goto("/products/kubar-protocol");
  await expect(page.locator(".protocol-hero__copy > .protocol-kicker, .protocol-progress__intro > .protocol-kicker, .protocol-journey__context > p, .protocol-authority-card > .protocol-kicker, .approved-footer__eyebrow")).toHaveCount(0);
  await expect(page.locator(".protocol-stage")).toHaveCount(6);
  for (const title of stageTitles) {
    await expect(page.getByText(title, { exact: true })).toHaveCount(1);
  }
  await expect(page.getByText("DEMONSTRATED PROTOTYPE", { exact: true })).toBeVisible();
  await expect(page.getByText(/No external money moved and no live partner, bank, venue or regulator system was contacted\./)).toBeAttached();
  await expect(page.getByText("Kubar Protocol does not become the lender, custodian, regulated venue or settlement bank.", { exact: true })).toBeAttached();

  const sitemap = await page.request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain("https://kubar.tech/products/kubar-protocol");
});

test("About retains its source narrative and navigation outside the requested removal", async ({ page }) => {
  await page.goto("/about");

  await expect(page.getByText("Building the origination layer between fragmented B2B platforms and lenders", { exact: true })).toBeAttached();
  await expect(page.getByText(/Kubar Protocol is longer-term R&D focused on digital trade assets/)).toBeAttached();
  await expect(page.getByRole("heading", { name: "The path so far" })).toHaveCount(0);
  await expect(page.locator('div.w-16 img[alt="Kubar Labs"]')).toHaveCount(1);
  await expect(page.locator(".built-status-text", { hasText: "Live" })).toHaveCount(1);
  await expect(page.getByText("Launching", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Products" })).toBeVisible();
  await page.getByRole("button", { name: "Products" }).hover();
  const desktopMenu = page.locator("#desktop-products-menu");
  await expect(desktopMenu.getByRole("link", { name: /NavDhan/ })).toHaveAttribute("href", "/products/navdhan");
  await expect(desktopMenu.getByRole("link", { name: /Kubar Protocol/ })).toHaveAttribute("href", "/products/kubar-protocol");
  await expect(page.getByRole("button", { name: /Business Rules Engine/ })).toHaveCount(0);
});

test("Team renders only the approved current people, portraits, and profile links", async ({ page }) => {
  const names = [
    "Vaibhav Sharma",
    "Rayansh Srivastava",
    "Keshav Dudani",
    "Manchit Sanan",
    "Divyesh Reddy",
    "Kavish Mahajan",
    "Debayan Gupta",
    "Amit Sagar",
    "Shridhar Sethuram",
    "Tushar Jaruhar",
  ];

  await page.goto("/team");

  const founderCard = page.locator(".team-member-card-featured");
  await expect(founderCard.getByText("Founder", { exact: true })).toHaveCount(1);
  await expect(page.locator(".team-member-card")).toHaveCount(10);
  for (const name of names) {
    await expect(page.getByRole("heading", { name, exact: true })).toHaveCount(1);
    await expect(page.getByRole("img", { name, exact: true })).toHaveCount(1);
  }
  await expect(page.locator('.team-member-card[href^="https://www.linkedin.com/"]')).toHaveCount(6);
  await expect(page.locator(".team-member-description").first()).toHaveCSS("-webkit-line-clamp", "none");
});

test("approved desktop and mobile product menus link both sibling products", async ({ page }) => {
  const routes = [
    "/",
    "/about",
    "/contact",
    "/for-platforms",
    "/privacy",
    "/products/navdhan",
    "/products/kubar-protocol",
    "/team",
  ];

  for (const route of routes) {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(route);
    const productsButton = page.getByRole("button", { name: "Products" });
    await productsButton.hover();
    const desktopMenu = page.locator("#desktop-products-menu");
    await expect(desktopMenu.getByRole("link", { name: /NavDhan/ })).toHaveAttribute("href", "/products/navdhan");
    await expect(desktopMenu.getByRole("link", { name: /Kubar Protocol/ })).toHaveAttribute("href", "/products/kubar-protocol");
    await productsButton.press("Escape");
    await expect(desktopMenu).toHaveCount(0);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    const mobileMenu = page.getByRole("dialog", { name: "Mobile navigation" });
    await mobileMenu.getByRole("button", { name: "Products" }).click();
    await expect(mobileMenu.getByRole("link", { name: /NavDhan/ })).toHaveAttribute("href", "/products/navdhan");
    await expect(mobileMenu.getByRole("link", { name: /Kubar Protocol/ })).toHaveAttribute("href", "/products/kubar-protocol");
    await page.keyboard.press("Escape");
    await expect(mobileMenu).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Open navigation menu" })).toBeFocused();
  }
});

test("marquees and mobile trust details keep their interaction contracts", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const awards = page.getByRole("region", { name: "Awards, programmes and recognitions" });
  await expect(awards.getByRole("button")).toHaveCount(0);
  await expect(awards.locator(".marquee-track > span")).toHaveCount(8);
  await expect(awards.locator('.marquee-track > [aria-hidden="true"]')).toHaveCount(4);
  for (const item of [
    "FinVision 2026 Award at NIBM, Pune",
    "Popular Choice Award at Startup MahaKumbh",
    "Recognised in F6S FinTech rankings",
    "IFSCA Fintech Sandbox",
  ]) {
    await expect(awards.getByText(item, { exact: true })).toHaveCount(2);
  }
  for (const removedItem of [
    "GENESIS grant recipient",
    "Perplexity AI Business Fellowship participant",
    "ElevenLabs Grants recipient",
  ]) {
    await expect(awards.getByText(removedItem, { exact: true })).toHaveCount(0);
  }
  const logos = page.getByRole("region", { name: "Technology programmes, grants and infrastructure support" });
  await expect(logos.getByRole("button")).toHaveCount(0);
  await expect(logos.locator(".ecosystem-marquee__item")).toHaveCount(12);
  await expect(logos.locator('[aria-hidden="true"]')).toHaveCount(0);
  await expect(logos.getByRole("img", { name: "Sarvam", exact: true })).toHaveCount(1);
  await expect(logos.getByRole("img", { name: "Cloudflare", exact: true })).toHaveCount(1);

  const firstDetails = page.locator('button[aria-controls="trust-mobile-details-1"]');
  await firstDetails.scrollIntoViewIfNeeded();
  await firstDetails.click();
  await expect(firstDetails).toHaveAttribute("aria-expanded", "true");
  await expect(firstDetails).toHaveText("Hide Details");
});

async function fillContactForm(page: import("@playwright/test").Page) {
  await page.getByLabel("Full Name").fill("Ada Lovelace");
  await page.getByLabel("Email Address").fill("ada@example.com");
  await page.getByLabel("Phone Number (optional)").fill("+91 98765 43210");
  await page.getByLabel("Company Name").fill("Analytical Engines");
  await page.getByLabel("Which category best describes your organisation?").selectOption("fintech");
}

test("Contact keeps its exact fields and handles a mocked successful submission", async ({ page }) => {
  let finishRequest: (() => void) | undefined;
  await page.route("**/api/contact", async (route) => {
    await new Promise<void>((resolve) => {
      finishRequest = resolve;
    });
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true, message: "Message sent successfully" }),
    });
  });
  await page.goto("/contact");

  const fields = page.locator('form input:not([type="hidden"]), form select');
  await expect(fields).toHaveCount(6);
  const honeypot = page.locator('input[name="website"]');
  await expect(honeypot).toHaveAttribute("aria-hidden", "true");
  await expect(page.getByLabel("Which category best describes your organisation?").locator("option")).toHaveCount(8);
  await fillContactForm(page);

  const submit = page.getByRole("button", { name: "Send Message" });
  await submit.scrollIntoViewIfNeeded();
  await submit.click();
  await expect(page.getByRole("button", { name: "Sending..." })).toBeDisabled();
  finishRequest?.();
  const dialog = page.getByRole("dialog", { name: "Message sent successfully" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("Thank you, Ada.", { exact: false })).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await expect(dialog.getByRole("button", { name: "Close dialog" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(submit).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("Contact exposes a mocked server error without making a real delivery", async ({ page }) => {
  await page.route("**/api/contact", async (route) => {
    await route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({ error: "Local mocked failure" }),
    });
  });
  await page.goto("/contact");
  await fillContactForm(page);
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.locator(".contact-status-error")).toHaveText(/Something went wrong\. Please try again\./);
});
