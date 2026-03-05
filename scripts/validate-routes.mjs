#!/usr/bin/env node
/**
 * validate-routes.mjs
 *
 * Validates that all WordPress URLs from route-map.json
 * have corresponding HTML files in the Astro build output (dist/).
 *
 * Usage:
 *   node scripts/validate-routes.mjs          # validate build output
 *   node scripts/validate-routes.mjs --live    # also check live WordPress site
 */

import { existsSync, readFileSync } from "fs";
import { join, resolve } from "path";

const ROOT = resolve(import.meta.dirname, "..");
const DIST = join(ROOT, "dist");
const ROUTE_MAP = join(ROOT, "route-map.json");

// ANSI colors
const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";

function urlToFile(url) {
  // "/" -> "dist/index.html"
  // "/chambres-dhotes/" -> "dist/chambres-dhotes/index.html"
  // "/avis-des-hotes" -> "dist/avis-des-hotes/index.html"
  let cleaned = url.replace(/\/$/, "") || "";
  if (cleaned === "") return join(DIST, "index.html");
  return join(DIST, cleaned, "index.html");
}

async function checkLiveUrl(url) {
  const fullUrl = `https://masduchanoine.com${url}`;
  try {
    const res = await fetch(fullUrl, { method: "HEAD", redirect: "follow" });
    return { url: fullUrl, status: res.status, ok: res.ok };
  } catch (e) {
    return { url: fullUrl, status: 0, ok: false, error: e.message };
  }
}

async function main() {
  const isLive = process.argv.includes("--live");

  console.log(
    `\n${BOLD}${CYAN}══════════════════════════════════════════════${RESET}`,
  );
  console.log(`${BOLD}${CYAN}  Mas du Chanoine — Route Validation${RESET}`);
  console.log(
    `${BOLD}${CYAN}══════════════════════════════════════════════${RESET}\n`,
  );

  // Check dist exists
  if (!existsSync(DIST)) {
    console.error(
      `${RED}✗ dist/ directory not found. Run 'npm run build' first.${RESET}`,
    );
    process.exit(1);
  }

  // Load route map
  if (!existsSync(ROUTE_MAP)) {
    console.error(`${RED}✗ route-map.json not found.${RESET}`);
    process.exit(1);
  }

  const routeMap = JSON.parse(readFileSync(ROUTE_MAP, "utf-8"));
  const { mapping, notMigrated, newPages } = routeMap;

  let passed = 0;
  let failed = 0;
  const failures = [];

  // 1. Check all mapped routes
  console.log(
    `${BOLD}1. Checking mapped routes (${mapping.length} URLs)${RESET}\n`,
  );

  for (const route of mapping) {
    const filePath = urlToFile(route.newRoute);
    const exists = existsSync(filePath);
    if (exists) {
      console.log(`  ${GREEN}✓${RESET} ${route.newRoute}`);
      passed++;
    } else {
      console.log(`  ${RED}✗${RESET} ${route.newRoute} → missing: ${filePath}`);
      failures.push(route.newRoute);
      failed++;
    }
  }

  // 2. Check new pages
  if (newPages && newPages.length > 0) {
    console.log(
      `\n${BOLD}2. Checking new pages (${newPages.length} URLs)${RESET}\n`,
    );
    for (const page of newPages) {
      const filePath = urlToFile(page.newRoute);
      const exists = existsSync(filePath);
      if (exists) {
        console.log(`  ${GREEN}✓${RESET} ${page.newRoute} (new)`);
        passed++;
      } else {
        console.log(
          `  ${RED}✗${RESET} ${page.newRoute} → missing: ${filePath}`,
        );
        failures.push(page.newRoute);
        failed++;
      }
    }
  }

  // 3. Check critical files
  console.log(`\n${BOLD}3. Checking critical files${RESET}\n`);
  const criticalFiles = [
    "robots.txt",
    "favicon.svg",
    "sitemap-index.xml",
    "404.html",
  ];
  for (const file of criticalFiles) {
    const filePath = join(DIST, file);
    const exists = existsSync(filePath);
    if (exists) {
      console.log(`  ${GREEN}✓${RESET} ${file}`);
      passed++;
    } else {
      console.log(`  ${RED}✗${RESET} ${file} → missing`);
      failures.push(file);
      failed++;
    }
  }

  // 4. Check media files
  console.log(`\n${BOLD}4. Checking media assets${RESET}\n`);
  const mediaFiles = [
    "media/hero-mas-du-chanoine.jpg",
    "media/mas-du-chanoine-og.jpg",
    "media/piscine-mas-du-chanoine.jpg",
    "media/chambres/chambre-cannoise.jpg",
    "media/chambres/chambre-nicoise.jpg",
    "media/chambres/chambre-saint-pauloise.jpg",
    "media/chambres/chambre-petit-mas.jpg",
  ];
  for (const file of mediaFiles) {
    const filePath = join(DIST, file);
    const exists = existsSync(filePath);
    if (exists) {
      console.log(`  ${GREEN}✓${RESET} ${file}`);
      passed++;
    } else {
      console.log(`  ${YELLOW}⚠${RESET} ${file} → missing (non-critical)`);
    }
  }

  // 5. Live check (optional)
  if (isLive) {
    console.log(`\n${BOLD}5. Live URL check (WordPress)${RESET}\n`);
    for (const route of mapping) {
      const result = await checkLiveUrl(route.oldUrl);
      const icon = result.ok ? `${GREEN}✓` : `${YELLOW}⚠`;
      console.log(`  ${icon}${RESET} ${result.url} → ${result.status}`);
    }
  }

  // Summary
  console.log(
    `\n${BOLD}${CYAN}══════════════════════════════════════════════${RESET}`,
  );
  console.log(
    `${BOLD}  Results: ${GREEN}${passed} passed${RESET}, ${failed > 0 ? RED : GREEN}${failed} failed${RESET}`,
  );
  console.log(
    `${BOLD}${CYAN}══════════════════════════════════════════════${RESET}\n`,
  );

  if (failures.length > 0) {
    console.log(`${RED}Failed routes:${RESET}`);
    failures.forEach((f) => console.log(`  - ${f}`));
    console.log("");
    process.exit(1);
  }

  console.log(`${GREEN}All routes validated successfully!${RESET}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
