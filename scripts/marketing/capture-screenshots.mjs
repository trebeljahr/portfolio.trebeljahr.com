// Captures the README and social-preview screenshots of portfolio.trebeljahr.com.
//
//   npx -y -p playwright@1.64.0 -c 'node scripts/marketing/capture-screenshots.mjs'
//
// BASE_URL defaults to the live site (read-only GET requests). Point it at a
// local build to capture unreleased work: BASE_URL=http://127.0.0.1:<port>.
// Output: docs/marketing/screenshots/*.jpg (desktop 1600x1000 and mobile
// 390x844, both at device scale factor 2).
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadChromium } from "./load-playwright.mjs";
import { baseUrl, shots } from "./shots.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "..", "..", "docs", "marketing", "screenshots");
const only = process.argv
  .find((a) => a.startsWith("--only="))
  ?.slice(7)
  .split(",");

const chromium = await loadChromium();
const browser = await chromium.launch();
await mkdir(outDir, { recursive: true });

try {
  for (const shot of shots) {
    if (only && !only.includes(shot.name)) continue;
    const context = await browser.newContext({
      viewport: shot.viewport,
      deviceScaleFactor: 2,
      isMobile: Boolean(shot.mobile),
      hasTouch: Boolean(shot.mobile),
      colorScheme: shot.theme,
      reducedMotion: "reduce",
    });
    await context.addInitScript((theme) => {
      try {
        localStorage.setItem("theme", theme);
      } catch {
        // storage blocked: the page falls back to its default theme
      }
    }, shot.theme);
    const page = await context.newPage();
    await page.goto(`${baseUrl}${shot.path}`, { waitUntil: "networkidle", timeout: 60_000 });
    // Let lazy images above the fold decode and fades settle.
    await page.evaluate(() => document.fonts.ready);
    if (shot.css) await page.addStyleTag({ content: shot.css });
    if (shot.scrollTo) {
      await page
        .locator(shot.scrollTo)
        .first()
        .evaluate((el) => {
          window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 96);
        });
    }
    // Framer Motion fades the sections in; give them time to finish.
    await page.waitForTimeout(shot.waitMs ?? 3000);
    const file = join(outDir, `${shot.name}.jpg`);
    await page.screenshot({ path: file, type: "jpeg", quality: 80 });
    console.log(`${shot.name}: ${baseUrl}${shot.path} -> ${file}`);
    await context.close();
  }
} finally {
  await browser.close();
}
