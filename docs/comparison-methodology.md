# Page-by-Page Content Comparison Methodology

## Objective

Ensure 100% content and SEO parity between the original WordPress site (masduchanoine.com) and the migrated Astro site (local). No text, images, or internal links should be lost during migration.

## Scope

Every public-facing URL on the original WordPress site must be compared with its local Astro counterpart.

---

## Comparison Checklist (per page)

### 1. Header / Hero Section

- [ ] **Hero image**: Is the same image URL or equivalent image present?
- [ ] **Hero title/subtitle**: Is the same H1 and tagline/subtitle text present?
- [ ] **Breadcrumb**: Does the breadcrumb match the original navigation path?

### 2. Body Content

- [ ] **All paragraphs**: Every paragraph of text from the original must exist in the local version with identical wording (minor formatting changes allowed, content changes are NOT allowed).
- [ ] **Headings (H2, H3…)**: All subheadings must match.
- [ ] **Lists (ul/ol)**: All list items must be present.
- [ ] **Bold/italic/links**: Inline formatting and hyperlinks within body text must be preserved.

### 3. Images

- [ ] **Inline/body images**: All images within the body content must be present (same src or migrated equivalent).
- [ ] **Image alt text**: Alt attributes must match or be equivalent.
- [ ] **Image captions**: Any captions below images must be preserved.
- [ ] **Gallery sections**: If the original page has a gallery/slider, the local page must include the same images.

### 4. Internal Linking / Cross-Linking Sections

- [ ] **Related content blocks**: Sections like "Événements de la Côte d'azur", "D'autres idées de visites ou activités", "Articles récents" must be present.
- [ ] **Footer/sidebar links**: Any sidebar or footer cross-links present on the original page.
- [ ] **CTA buttons/links**: Call-to-action buttons with correct href and text.

### 5. Meta / SEO Elements (checked separately in SEO audit)

- [ ] **Page title (`<title>`)**: Must match or be equivalent.
- [ ] **Meta description**: Must match or be equivalent.
- [ ] **Canonical URL**: Must point to the correct URL.
- [ ] **Open Graph tags**: og:title, og:description, og:image should be present.

---

## Process

### Step A: Fetch Remote Page

1. Use `fetch_webpage` to retrieve the full content of the remote URL.
2. Extract: hero image URL, H1, all body text, all image URLs, all internal link sections.

### Step B: Read Local Page

1. Read the corresponding `.astro` file from `src/pages/`.
2. Extract the same elements: hero image, H1, body text, images, internal link sections.

### Step C: Compare

For each item in the checklist:

- **Match**: Content is equivalent → no action needed.
- **Missing**: Content exists on remote but not local → must be added.
- **Changed**: Content differs (rewritten, truncated, wrong facts) → must be corrected to match original.

### Step D: Fix

Apply all necessary changes to the local `.astro` file to achieve parity.

### Step E: Validate

Run `npx astro build` to ensure no build errors after changes.

---

## Output Format

For each page comparison, produce a brief report:

```
## [Page Name] — [Remote URL]
- Local file: src/pages/...
- Hero image: ✅ Match | ❌ Missing (action taken)
- H1/Title: ✅ Match | ❌ Differs (action taken)
- Body text: ✅ Match | ❌ Missing paragraphs (action taken)
- Images: ✅ Match | ❌ Missing N images (action taken)
- Internal links: ✅ Match | ❌ Missing sections (action taken)
- Status: ✅ Complete | ⚠️ Needs review
```
