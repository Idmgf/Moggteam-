import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

async function captureScreens() {
  const outDir = path.resolve("public/screens");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  const routes = [
    { url: "http://localhost:3000/?intro=0", name: "screen_1_home.png" },
    { url: "http://localhost:3000/register", name: "screen_2_register.png" },
    { url: "http://localhost:3000/code", name: "screen_3_code.png" },
    { url: "http://localhost:3000/rewards", name: "screen_4_rewards.png" },
    { url: "http://localhost:3000/rules", name: "screen_5_rules.png" }
  ];

  for (const r of routes) {
    try {
      console.log(`Navigating to ${r.url}...`);
      await page.goto(r.url, { waitUntil: "domcontentloaded", timeout: 20000 });
      await page.waitForTimeout(2000);
      const outPath = path.join(outDir, r.name);
      await page.screenshot({ path: outPath });
      console.log(`Saved screenshot: ${outPath}`);
    } catch (e) {
      console.error(`Error capturing ${r.url}:`, e);
    }
  }

  await browser.close();
  console.log("Screenshots captured successfully!");
}

captureScreens().catch(err => {
  console.error("Screenshot error:", err);
  process.exit(1);
});
