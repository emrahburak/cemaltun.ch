# Plan: is-agentic Improvements for cemaltun.ch

Branch: `feat/is-agentic-improvements`
Source: https://is-agentic.com/scan/www.cemaltun.ch (Score 54/100)

## Goal
Raise the site's "agentic" score by addressing the 6 failed checks, prioritizing the 3 ESSENTIAL blockers first.

## Scope (in order of priority)

### Phase 1 — ESSENTIAL blockers (must fix)

#### 1.1 Agent-friendly 404s
- **Problem:** `vercel.json` rewrites all paths to `/index.html`, so unknown URLs return HTTP 200 with the app shell (soft-404). Agents conclude every path exists.
- **Approach:** Configure Vercel so unknown (non-asset) routes return a real HTTP 404 with a Markdown body.
  - Option A: Add a catch-all 404 page served with status 404 via Vercel `routes`/`headers` + a fallback function.
  - Option B: Use Vercel Edge Middleware to detect unknown paths and return 404 + `text/markdown`.
- **Deliverables:** Updated `vercel.json`, a 404 component/page (`src/pages/NotFound.tsx` already may exist — check), Markdown 404 body with ≥20 chars pointing to docs/sitemap/llms.txt.
- **Acceptance:** `curl -sS -L -i -H 'Accept: text/markdown' https://cemaltun.ch/some-path-that-does-not-exist` → final status 404/410 + `Content-Type: text/markdown` + body ≥20 chars.

#### 1.2 Content without JavaScript
- **Problem:** Raw HTML has ~46 chars of text; crawlers/agents see nothing.
- **Approach:** Prerender the SPA shell with meaningful static content in `index.html` (noscript + initial render), OR add a prerender step.
  - Minimal viable: inject a meaningful `<noscript>` block + a static `<main>`/`<h1>` fallback in `index.html` with ≥500 chars (composer bio, headings, links).
  - Better: use Vite SSR/prerender or `react-snap`/`vite-plugin-ssr` to emit static HTML per route.
- **Deliverables:** `index.html` updated with ≥500 chars of meaningful content in raw HTML; `/privacy` page content available without JS.
- **Acceptance:** Raw HTML of homepage contains ≥500 chars of meaningful text and a clear H1; `/privacy` main text in raw HTML.

#### 1.3 Markdown content negotiation
- **Problem:** `Accept: text/markdown` returns HTML; `Vary` header missing `Accept`.
- **Approach:** Serve a Markdown version of pages when `Accept: text/markdown` is present; add `Vary: Accept`.
  - Implement via Vercel Edge Middleware (or a serverless function) that rewrites/returns markdown for markdown accept.
  - Create `/llms.txt` and markdown mirrors of key pages.
- **Deliverables:** Edge middleware (`middleware.ts` or `api/`), markdown content for homepage, `Vary: Accept` header.
- **Acceptance:** `curl -i -H 'Accept: text/markdown' https://cemaltun.ch/` → Markdown body + `Content-Type: text/markdown` + `Vary: Accept`; HTML request still returns HTML.

### Phase 2 — RECOMMENDED

#### 2.1 llms.txt with "when to use" section
- **Problem:** No agent instruction file with when-to-use guidance.
- **Approach:** Create `public/llms.txt` describing the site, best-fit use cases, and how an agent should use it (when to reach for Cem Altun's music/composition services).
- **Deliverables:** `public/llms.txt`.

#### 2.2 Trust anchor pages (/about, /contact, /privacy) with ≥500 chars each
- **Problem:** No trust anchor pages with sufficient content.
- **Approach:** Ensure `/about`, `/contact`, `/privacy` routes exist with ≥500 chars of real content each. Currently only `/privacy` route exists (per AGENTS.md). Add `/about` and `/contact` (or map existing sections) with enough text.
- **Deliverables:** Routes + page components with sufficient content; update sitemap.

#### 2.3 Brand name discoverability
- **Problem:** "Cem Altun composer" doesn't rank top 10.
- **Approach:** SEO improvements — title/H1 clarity, structured data (already has Person schema), earn press mentions. Lower priority; mostly off-site. In-repo: refine homepage title/headings, ensure canonical, add more descriptive H1.
- **Deliverables:** Minor SEO copy tweaks in `index.html` and hero section.

### Phase 3 — Bonus / verification
- Re-run `npx is-agentic www.cemaltun.ch` after deploy.
- Verify curl commands from the scan report.
- Update sitemap.xml if new routes added.

## Out of scope
- No test suite exists (per AGENTS.md) — skip tests.
- Off-site SEO (press mentions) cannot be done in-repo.

## Open questions
1. Should we use Vercel Edge Middleware (requires Vercel project config) or keep it static-only?
2. Is prerendering worth the complexity, or is a static `<noscript>` fallback acceptable for the scan?
3. Do we add `/about` and `/contact` as separate routes, or reuse existing sections?

## Suggested execution order
1.1 → 1.3 → 1.2 → 2.1 → 2.2 → 2.3 → verify
