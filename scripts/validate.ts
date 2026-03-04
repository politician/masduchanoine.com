/**
 * validate.ts — SEO post-build validator for Mas du Chanoine
 *
 * Validates all 10 expected URLs against a running local server.
 * Checks: HTTP 200, title, meta description, H1, canonical, no noindex, hreflang, schema.org
 *
 * Usage:
 *   npm run validate                          # against http://localhost:4321
 *   npm run validate -- --base-url http://localhost:4321
 */

import * as fs from "node:fs";
import * as path from "node:path";

const BASE_URL = process.argv.includes("--base-url")
  ? process.argv[process.argv.indexOf("--base-url") + 1].replace(/\/$/, "")
  : "http://localhost:4321";

const EXPECTED_ROUTES = [
  { path: "/", lang: "fr", expectHreflang: true, expectSchema: true },
  { path: "/chambres-dhotes/", lang: "fr", expectHreflang: true },
  { path: "/tarifs/", lang: "fr", expectHreflang: true },
  { path: "/photos/", lang: "fr" },
  { path: "/contactez-nous/", lang: "fr", expectHreflang: true },
  { path: "/politique-de-confidentialite/", lang: "fr" },
  { path: "/en/", lang: "en", expectHreflang: true },
  { path: "/en/bed-breakfast/", lang: "en", expectHreflang: true },
  { path: "/en/rates/", lang: "en", expectHreflang: true },
  { path: "/en/contact-us/", lang: "en", expectHreflang: true },
] as const;

interface Check {
  name: string;
  result: "pass" | "fail" | "warn";
  detail?: string;
}

interface ValidationResult {
  url: string;
  status: "pass" | "fail" | "warn";
  checks: Check[];
}

async function fetchPage(url: string): Promise<{ status: number; html: string }> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "MasDuChanoine-Validator/1.0" },
      redirect: "follow",
    });
    const html = await res.text();
    return { status: res.status, html };
  } finally {
    clearTimeout(timeout);
  }
}

function getAttr(html: string, pattern: RegExp): string | null {
  const m = html.match(pattern);
  return m ? m[1] : null;
}

async function validateRoute(route: (typeof EXPECTED_ROUTES)[number]): Promise<ValidationResult> {
  const url = BASE_URL + route.path;
  const checks: Check[] = [];
  let overall: "pass" | "fail" | "warn" = "pass";

  let html = "";
  let httpStatus = 0;

  try {
    const res = await fetchPage(url);
    httpStatus = res.status;
    html = res.html;
  } catch (err: any) {
    return { url, status: "fail", checks: [{ name: "HTTP fetch", result: "fail", detail: err.message }] };
  }

  const add = (name: string, ok: boolean, warn = false, detail?: string) => {
    const result = ok ? "pass" : warn ? "warn" : "fail";
    checks.push({ name, result, detail });
    if (result === "fail") overall = "fail";
    else if (result === "warn" && overall === "pass") overall = "warn";
  };

  // HTTP 200
  add("HTTP 200", httpStatus === 200, false, httpStatus !== 200 ? `Got ${httpStatus}` : undefined);

  // Title
  const title = getAttr(html, /<title>([^<]+)<\/title>/i);
  add("Title tag", !!title && title.length > 5, false, title ?? "(missing)");

  // Meta description
  const desc = getAttr(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)
    ?? getAttr(html, /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i);
  add("Meta description", !!desc && desc.length > 10, false, desc ?? "(missing)");

  // H1
  const h1 = getAttr(html, /<h1[^>]*>([^<]+)<\/h1>/i);
  add("H1 present", !!h1, true, h1 ?? "(missing)");

  // Canonical
  const canonical = getAttr(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)
    ?? getAttr(html, /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  add("Canonical", !!canonical, false, canonical ?? "(missing)");

  // No noindex
  const noindex = /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html);
  add("No unintended noindex", !noindex, false, noindex ? "Found noindex" : undefined);

  // Hreflang
  if (route.expectHreflang) {
    const hasHreflang = /<link[^>]+rel=["']alternate["'][^>]+hreflang/i.test(html);
    add("Hreflang", hasHreflang, true, hasHreflang ? undefined : "(no hreflang found)");
  }

  // Schema.org
  if (route.expectSchema) {
    const hasSchema = html.includes("application/ld+json");
    add("Schema.org JSON-LD", hasSchema, true, hasSchema ? undefined : "(no JSON-LD found)");
  }

  return { url, status: overall, checks };
}

async function main() {
  console.log(`\n🔍 Validating ${BASE_URL} ...\n`);

  const results: ValidationResult[] = [];
  for (const route of EXPECTED_ROUTES) {
    process.stdout.write(`  ${route.path.padEnd(45)}`);
    const result = await validateRoute(route);
    results.push(result);
    const icon = result.status === "pass" ? "✅" : result.status === "warn" ? "⚠️ " : "❌";
    console.log(icon);
  }

  console.log("\n--- Detailed Results ---\n");
  let totalPass = 0, totalFail = 0, totalWarn = 0;

  for (const r of results) {
    const icon = r.status === "pass" ? "✅" : r.status === "warn" ? "⚠️" : "❌";
    console.log(`${icon} ${r.url}`);
    for (const c of r.checks) {
      const ci = c.result === "pass" ? "  ✓" : c.result === "warn" ? "  ⚠" : "  ✗";
      const detail = c.detail ? ` (${c.detail})` : "";
      console.log(`${ci} ${c.name}${detail}`);
    }
    console.log();
    if (r.status === "pass") totalPass++;
    else if (r.status === "warn") totalWarn++;
    else totalFail++;
  }

  console.log(`\n📊 Summary: ${totalPass} passed, ${totalWarn} warnings, ${totalFail} failed`);

  // Write markdown report
  const reportPath = path.resolve(process.cwd(), "tmp", "validation-report.md");
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });

  const lines = [
    "# Rapport de validation SEO — Mas du Chanoine",
    "",
    `Date : ${new Date().toISOString()}`,
    `Base URL : ${BASE_URL}`,
    "",
    `## Résumé : ${totalPass} ✅  ${totalWarn} ⚠️  ${totalFail} ❌`,
    "",
    "## Détails",
    "",
  ];

  for (const r of results) {
    const icon = r.status === "pass" ? "✅" : r.status === "warn" ? "⚠️" : "❌";
    lines.push(`### ${icon} \`${r.url}\``, "");
    lines.push("| Check | Résultat | Détail |");
    lines.push("|-------|----------|--------|");
    for (const c of r.checks) {
      const ci = c.result === "pass" ? "✅" : c.result === "warn" ? "⚠️" : "❌";
      lines.push(`| ${c.name} | ${ci} | ${c.detail ?? ""} |`);
    }
    lines.push("");
  }

  fs.writeFileSync(reportPath, lines.join("\n"));
  console.log(`\n📄 Report: ${reportPath}\n`);
  if (totalFail > 0) process.exit(1);
}

main().catch(err => { console.error(err); process.exit(1); });
