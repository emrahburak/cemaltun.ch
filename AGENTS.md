# cemaltun.ch — Portfolio site for Cem Altun (composer, Zürich)

## Stack

- **React 19** + **TypeScript 5.9** + **Vite 7**
- **Tailwind CSS 4** (via `@tailwindcss/vite` plugin, no PostCSS config)
- **GSAP** (`@gsap/react`, `gsap/Observer` plugin) + **framer-motion**
- **i18next** (EN / DE / TR), auto-detected via `i18next-browser-languagedetector`
- **react-router-dom** (HashLink-style nav via sidebar)
- **react-helmet-async** for per-page SEO meta
- **Swiper** (gallery), **Lucide React** (icons), **Yet Another React Lightbox**
- Deployed on **Vercel** with SPA rewrites (`vercel.json`)

## Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Vite dev server |
| `npm run build` | `tsc -b && vite build` (typecheck first!) |
| `npm run lint` | ESLint (flat config) |
| `npm run preview` | Vite preview of built output |
| `npm run optimizer` | Convert src/assets images to WebP (1280px, quality 75, EXIF-corrected) |

**Build order matters**: `npm run build` runs typecheck (`tsc -b`) before bundling. Run lint first to catch obvious issues:
```
npm run lint && npm run build
```

## Architecture

Single-page app with 6 full-screen sections navigated by **GSAP Observer** (custom scroll, not browser scroll):

1. **Hero** — Cinematic loading sequence (shutters, light beam, char stagger)
2. **About** — DesktopAbout / MobileAbout (responsive split)
3. **Works** — DesktopWorks / MobileWorks
4. **Videos** — Multi-video card stack (ConcertCardStack)
5. **Gallery** — Swiper carousel (desktop) / touch gallery (mobile)
6. **Contact** — Contact form/info

### Key patterns

- Every section has **Desktop** and **Mobile** component variants toggled via `lg:block hidden` / `lg:hidden block`
- Section transitions use `gsap.timeline` with `yPercent` slide (not scroll-based). The Observer captures wheel/touch/pointer events
- Sidebar navigation updates via URL hash (`#hero`, `#about`, etc.)
- **ThemeContext** controls navbar text color: `isDarkBackground` toggles white/black based on which section is visible
- `usePageTheme` hook uses ScrollTrigger to detect which section is in view and set the theme
- `npm run optimizer` converts images to WebP (sibling `webp/` directory), cleans up orphaned WebP files, and uses **Sharp** for processing. Edit `optimizer.config.ts` to change source globs

### Routing

- `/` → Home (scrollable sections)
- `/privacy` → Privacy policy (`noindex`)
- `*` → 404 page (`noindex`)
- Vercel rewrites all routes to `index.html` (SPA)

## Important quirks

- `.npmrc` has `legacy-peer-deps=true` — use `npm install`, not `pnpm`/`yarn`
- **No test suite** — no test runner, no test dependencies. Skip test-related workflows
- **No CI** — no `.github/` directory. Build is manual or Vercel auto-deploy
- **`path` package** in dependencies is unnecessary (legacy). Don't replicate this pattern
- **GSAP + framer-motion conflicts** have occurred before. If adding animation, pick one system per component
- **Mobile scroll** on gallery is manually locked/unlocked — see `MobileGallerySlide`
- Hero image uses `@/assets/images/piano/webp/cem-altun-piano-10.webp` via the `@` import alias (`src/`)
- All text content comes from `locales/{en,de,tr}.json` — never hardcode display strings
- Google Fonts loaded via `@import` in `index.css`, plus 5 local fonts declared via `@font-face`
- Tailwind v4: theme is configured via `@theme` directive in `index.css`, NOT a `tailwind.config.*` file

## OpenCode config

- `opencode.jsonc` at repo root configures providers and agent tool access
- Built-in command `/analyze-patterns` can search for code patterns across the repo
- Custom agents defined in `.opencode/agent/` (OpenAgent, OpenCoder, subagents)
