/**
 * Spectra9 Compose — Automated Screenshot Generator
 *
 * Captures all hero variants at 3 viewports (desktop, tablet, mobile).
 * Run: npx tsx scripts/screenshots.ts
 * Requires: dev server running on port 3028
 *
 * Output: public/screenshots/hero-{variant}-{viewport}.png
 * Total: 5 variants × 3 viewports = 15 screenshots
 */

import { chromium } from "playwright";
import path from "path";

const BASE_URL = "http://localhost:3028";
const OUTPUT_DIR = path.resolve(__dirname, "../public/screenshots");

const variants = [
  "hero-statement",
  "hero-product",
  "hero-split",
  "hero-video",
  "hero-immersive",
];

const viewports = ["desktop", "tablet", "mobile"] as const;

async function run() {
  console.log("Starting screenshot capture...\n");

  const browser = await chromium.launch({ headless: true });

  // Use a wide viewport so all controls are visible
  const context = await browser.newContext({
    viewport: { width: 1600, height: 1000 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  let count = 0;

  for (const vp of viewports) {
    // Navigate fresh for each viewport
    await page.goto(BASE_URL, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    // Click viewport button
    await page.click(`[data-viewport="${vp}"]`);
    await page.waitForTimeout(800);

    for (let i = 0; i < variants.length; i++) {
      const variantName = variants[i];

      if (i > 0) {
        await page.click('button[aria-label="Next variant"]');
      }

      // Wait for animations to complete
      await page.waitForTimeout(2000);

      const filename = `${variantName}-${vp}.png`;
      const filepath = path.join(OUTPUT_DIR, filename);

      if (vp === "desktop") {
        // Desktop: screenshot full page
        await page.screenshot({ path: filepath, fullPage: true });
      } else {
        // Tablet/Mobile: screenshot the viewport frame element
        const frame = page.locator('[data-viewport-frame]');
        const isVisible = await frame.isVisible().catch(() => false);

        if (isVisible) {
          await frame.screenshot({ path: filepath });
        } else {
          // Fallback: full page
          await page.screenshot({ path: filepath, fullPage: true });
        }
      }

      count++;
      console.log(`  [ok] ${filename}`);
    }
  }

  await browser.close();
  console.log(`\nDone! ${count} screenshots saved to public/screenshots/`);
}

run().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
