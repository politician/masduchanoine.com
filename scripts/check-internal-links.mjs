#!/usr/bin/env node
/**
 * check-internal-links.mjs
 *
 * Scans generated HTML files in dist/ and fails if a local href/src target
 * does not resolve to an existing file/route in dist/.
 *
 * Usage:
 *   node scripts/check-internal-links.mjs
 */

import { existsSync, readFileSync, readdirSync } from "fs";
import { join, relative, resolve, extname, dirname } from "path";

const ROOT = resolve(import.meta.dirname, "..");
const DIST = join(ROOT, "dist");

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const CYAN = "\x1b[36m";
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";

function walk(dir) {
  let out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out = out.concat(walk(full));
    else if (entry.isFile()) out.push(full);
  }
  return out;
}

function isExternal(target) {
  return (
    target.startsWith("http://") ||
    target.startsWith("https://") ||
    target.startsWith("mailto:") ||
    target.startsWith("tel:") ||
    target.startsWith("javascript:")
  );
}

function normalizeTarget(raw, fromFile) {
  const clean = raw.split("#")[0].split("?")[0];
  if (!clean || isExternal(clean)) return null;

  if (clean.startsWith("/")) return clean;

  const fromDir = "/" + relative(DIST, dirname(fromFile)).replaceAll("\\", "/");
  const joined = new URL(clean, `https://example.org${fromDir}/`).pathname;
  return joined;
}

function targetExists(webPath) {
  const noTrailing = webPath.replace(/\/+$/, "");
  if (noTrailing === "") return existsSync(join(DIST, "index.html"));

  const relPath = noTrailing.replace(/^\/+/, "");
  const direct = join(DIST, relPath);
  if (existsSync(direct)) return true;
  if (existsSync(join(DIST, relPath, "index.html"))) return true;
  if (!extname(relPath) && existsSync(join(DIST, `${relPath}.html`))) return true;
  return false;
}

function main() {
  console.log(
    `\n${BOLD}${CYAN}══════════════════════════════════════════════${RESET}`,
  );
  console.log(`${BOLD}${CYAN}  Mas du Chanoine — Internal Link Check${RESET}`);
  console.log(
    `${BOLD}${CYAN}══════════════════════════════════════════════${RESET}\n`,
  );

  if (!existsSync(DIST)) {
    console.error(
      `${RED}✗ dist/ directory not found. Run 'npm run build' first.${RESET}`,
    );
    process.exit(1);
  }

  const htmlFiles = walk(DIST).filter((f) => f.endsWith(".html"));
  const failures = [];

  for (const file of htmlFiles) {
    const html = readFileSync(file, "utf-8");
    const attrs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map(
      (m) => m[1],
    );

    for (const attr of attrs) {
      const target = normalizeTarget(attr, file);
      if (!target) continue;
      if (!targetExists(target)) {
        failures.push({
          from: `/${relative(DIST, file).replaceAll("\\", "/")}`,
          target,
        });
      }
    }
  }

  const uniqueFailures = [];
  const seen = new Set();
  for (const f of failures) {
    const key = `${f.target}|${f.from}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueFailures.push(f);
    }
  }

  if (uniqueFailures.length > 0) {
    console.error(`${RED}✗ Broken internal links found:${RESET}\n`);
    uniqueFailures.forEach((f) => {
      console.error(`  ${RED}•${RESET} ${f.target} (from ${f.from})`);
    });
    console.error(`\n${RED}${uniqueFailures.length} broken link(s).${RESET}\n`);
    process.exit(1);
  }

  console.log(`${GREEN}✓ No broken internal links found.${RESET}\n`);
}

main();
