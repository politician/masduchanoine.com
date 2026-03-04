/**
 * crawl.ts — SEO audit crawler for masduchanoine.com
 *
 * Crawls the site and produces:
 *   tmp/urls.json            - all pages with SEO data
 *   tmp/assets.json          - images with alt text and source pages
 *   tmp/seo.json             - global SEO rules and patterns
 *   tmp/redirects_detected.json - detected redirects
 *   tmp/policies.json        - trailing slash / www / https policy
 *
 * Usage:
 *   npm run crawl
 *   npm run crawl -- --base-url http://localhost:4321
 */

import * as fs from "node:fs";
import * as path from "node:path";
import * as cheerio from "cheerio";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const BASE_URL = process.argv.includes("--base-url")
  ? process.argv[process.argv.indexOf("--base-url") + 1].replace(/\/$/, "")
  : "https://masduchanoine.com";
const CANONICAL_BASE = "https://masduchanoine.com";
const USER_AGENT = "MasDuChanoine-Crawler/1.0 (+https://masduchanoine.com)";
const THROTTLE_MS = 500;
const TIMEOUT_MS = 10_000;
const MAX_URLS = 200;
const TMP_DIR = path.resolve(process.cwd(), "tmp");

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface PageRecord {
  url: string;
  statusCode: number | null;
  canonical: string | null;
  title: string | null;
  metaDescription: string | null;
  h1: string | null;
  h2s: string[];
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  schemaOrg: object[];
  internalLinks: string[];
  externalLinks: string[];
  depth: number;
  lastmod: string | null;
  error?: string;
}

interface ImageRecord {
  src: string;
  alt: string;
  width: string | null;
  height: string | null;
  pages: string[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function normalizeUrl(href: string, base: string): string | null {
  try {
    const url = new URL(href, base);
    if (!["http:", "https:"].includes(url.protocol)) return null;
    url.hash = "";
    return url.toString();
  } catch {
    return null;
  }
}

function isInternal(url: string): boolean {
  try {
    const parsed = new URL(url);
    const baseParsed = new URL(BASE_URL);
    return parsed.hostname === baseParsed.hostname;
  } catch {
    return false;
  }
}

function shouldSkip(url: string): boolean {
  const skipPatterns = [
    /\/wp-(admin|content|includes|json|login|cron|signup|trackback)/,
    /[?&]s=/,
    /\/feed\//,
    /\/page\/\d+\//,
    /\/tag\//,
    /\/category\//,
    /\/author\//,
  ];
  return skipPatterns.some(p => p.test(url));
}

async function fetchPage(url: string): Promise<{ status: number; finalUrl: string; html: string }> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": USER_AGENT },
      redirect: "follow",
    });
    const html = res.headers.get("content-type")?.includes("text/html")
      ? await res.text()
      : "";
    return { status: res.status, finalUrl: res.url, html };
  } finally {
    clearTimeout(timeout);
  }
}

function extractPageData(url: string, html: string, depth: number): PageRecord {
  const $ = cheerio.load(html);

  const schemaOrg: object[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    try { schemaOrg.push(JSON.parse($(el).html() ?? "")); } catch {}
  });

  const internalLinks: string[] = [];
  const externalLinks: string[] = [];
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href") ?? "";
    const norm = normalizeUrl(href, url);
    if (!norm) return;
    if (isInternal(norm)) internalLinks.push(norm);
    else externalLinks.push(norm);
  });

  return {
    url,
    statusCode: null,
    canonical: $('link[rel="canonical"]').attr("href") ?? null,
    title: $("title").first().text().trim() || null,
    metaDescription: $('meta[name="description"]').attr("content") ?? null,
    h1: $("h1").first().text().replace(/\s+/g, " ").trim() || null,
    h2s: $("h2").map((_, el) => $(el).text().replace(/\s+/g, " ").trim()).get().filter(Boolean),
    ogTitle: $('meta[property="og:title"]').attr("content") ?? null,
    ogDescription: $('meta[property="og:description"]').attr("content") ?? null,
    ogImage: $('meta[property="og:image"]').attr("content") ?? null,
    schemaOrg,
    internalLinks: [...new Set(internalLinks)],
    externalLinks: [...new Set(externalLinks)],
    depth,
    lastmod: null,
  };
}

function extractImages(url: string, html: string): ImageRecord[] {
  const $ = cheerio.load(html);
  const images: ImageRecord[] = [];
  $("img").each((_, el) => {
    const src = $(el).attr("src") ?? "";
    const resolved = normalizeUrl(src, url);
    if (!resolved) return;
    images.push({
      src: resolved,
      alt: $(el).attr("alt") ?? "",
      width: $(el).attr("width") ?? null,
      height: $(el).attr("height") ?? null,
      pages: [url],
    });
  });
  return images;
}

function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms));
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  fs.mkdirSync(TMP_DIR, { recursive: true });

  // Read robots.txt
  console.log("📖 Reading robots.txt...");
  try {
    const robots = await fetchPage(`${BASE_URL}/robots.txt`);
    console.log(robots.html.slice(0, 500));
  } catch (e: any) {
    console.warn("robots.txt not accessible:", e.message);
  }

  // Crawl
  const visited = new Set<string>();
  const queue: Array<{ url: string; depth: number }> = [{ url: BASE_URL + "/", depth: 0 }];
  const pages: PageRecord[] = [];
  const imageMap = new Map<string, ImageRecord>();
  const redirects: Array<{ from: string; to: string; status: number }> = [];

  let wwwPolicy: string | null = null;
  let trailingSlashPolicy: string | null = null;
  let httpsPolicy: string | null = null;

  while (queue.length > 0 && visited.size < MAX_URLS) {
    const item = queue.shift();
    if (!item) break;
    const { url, depth } = item;

    const normalized = url.split("?")[0].split("#")[0];
    if (visited.has(normalized) || shouldSkip(normalized)) continue;
    visited.add(normalized);

    process.stdout.write(`  [${visited.size}/${MAX_URLS}] ${normalized} ... `);

    let result: { status: number; finalUrl: string; html: string };
    try {
      result = await fetchPage(normalized);
    } catch (err: any) {
      console.log("❌ ERROR:", err.message);
      pages.push({ url: normalized, statusCode: null, canonical: null, title: null, metaDescription: null, h1: null, h2s: [], ogTitle: null, ogDescription: null, ogImage: null, schemaOrg: [], internalLinks: [], externalLinks: [], depth, lastmod: null, error: err.message });
      await sleep(THROTTLE_MS);
      continue;
    }

    // Detect redirects
    if (result.finalUrl !== normalized) {
      redirects.push({ from: normalized, to: result.finalUrl, status: result.status });
      console.log(`→ ${result.finalUrl} (${result.status})`);

      // Detect policies from first redirect
      if (!wwwPolicy) {
        const fromParsed = new URL(normalized);
        const toParsed = new URL(result.finalUrl);
        if (fromParsed.hostname.startsWith("www.") && !toParsed.hostname.startsWith("www.")) wwwPolicy = "non-www";
        if (!fromParsed.hostname.startsWith("www.") && toParsed.hostname.startsWith("www.")) wwwPolicy = "www";
        if (fromParsed.protocol === "http:" && toParsed.protocol === "https:") httpsPolicy = "http→https";
        if (!normalized.endsWith("/") && result.finalUrl.endsWith("/")) trailingSlashPolicy = "trailing slash enforced";
      }
    } else {
      console.log(`${result.status}`);
    }

    if (!result.html) {
      await sleep(THROTTLE_MS);
      continue;
    }

    const pageData = extractPageData(result.finalUrl, result.html, depth);
    pageData.statusCode = result.status;
    pages.push(pageData);

    // Detect trailing slash from canonical
    if (!trailingSlashPolicy && pageData.canonical) {
      trailingSlashPolicy = pageData.canonical.endsWith("/") ? "trailing slash" : "no trailing slash";
    }

    // Extract images
    for (const img of extractImages(result.finalUrl, result.html)) {
      const existing = imageMap.get(img.src);
      if (existing) {
        if (!existing.pages.includes(result.finalUrl)) existing.pages.push(result.finalUrl);
      } else {
        imageMap.set(img.src, img);
      }
    }

    // Enqueue internal links
    for (const link of pageData.internalLinks) {
      const norm = link.split("?")[0].split("#")[0];
      if (!visited.has(norm) && !shouldSkip(norm)) {
        queue.push({ url: norm, depth: depth + 1 });
      }
    }

    await sleep(THROTTLE_MS);
  }

  // SEO summary
  const seoSummary = {
    totalPages: pages.length,
    pagesWithTitle: pages.filter(p => p.title).length,
    pagesWithDescription: pages.filter(p => p.metaDescription).length,
    pagesWithCanonical: pages.filter(p => p.canonical).length,
    pagesWithH1: pages.filter(p => p.h1).length,
    pagesWithSchema: pages.filter(p => p.schemaOrg.length > 0).length,
    pagesWithOgImage: pages.filter(p => p.ogImage).length,
    policies: {
      trailingSlash: trailingSlashPolicy ?? "unknown",
      www: wwwPolicy ?? "unknown",
      https: httpsPolicy ?? "unknown",
    },
  };

  // Write outputs
  fs.writeFileSync(path.join(TMP_DIR, "urls.json"), JSON.stringify(pages, null, 2));
  fs.writeFileSync(path.join(TMP_DIR, "assets.json"), JSON.stringify([...imageMap.values()], null, 2));
  fs.writeFileSync(path.join(TMP_DIR, "seo.json"), JSON.stringify(seoSummary, null, 2));
  fs.writeFileSync(path.join(TMP_DIR, "redirects_detected.json"), JSON.stringify(redirects, null, 2));
  fs.writeFileSync(path.join(TMP_DIR, "policies.json"), JSON.stringify({ trailingSlashPolicy, wwwPolicy, httpsPolicy }, null, 2));

  console.log("\n✅ Crawl complete!");
  console.log(`   Pages: ${pages.length} | Images: ${imageMap.size} | Redirects: ${redirects.length}`);
  console.log(`   Output: ${TMP_DIR}/`);
  console.log(JSON.stringify(seoSummary, null, 2));
}

main().catch(err => { console.error(err); process.exit(1); });
