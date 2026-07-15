# Portfolio Audit — Everything Wrong

## Critical Issues

### 1. `vercel.json` breaks all routing
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```
This catches every request and serves `index.html` instead of letting Next.js handle SSR/SSG. Blog slugs, projects page, sitemap — all broken in production.

### 2. Font is overridden — Outfit never renders
`globals.css:6` sets `font-family: Arial, Helvetica, sans-serif;` on `body`, which overrides the `outfit` font loaded via `next/font`. You load a Google Font for nothing.

### 3. No lock file committed
`.gitignore` ignores all lock files (`yarn.lock`, `package-lock.json`, etc.). Builds are non-reproducible — every install can pull different dependency versions.

### 4. `eslint-config-next@15.1.6` with `next@^16.1.6`
Major version mismatch. The ESLint config likely references APIs that changed in Next 16.

---

## Performance Issues

### 5. `transition: all 1s` on every `<a>`, `<span>`, `<li>`
`globals.css:126-130` — Applies expensive 1-second transitions to every link, span, and list item in the entire app. This hammers the compositor on every hover/interaction.

### 6. GSAP loaded eagerly for a cursor effect
`target-cursor.tsx` imports GSAP (~30KB gzipped) on every page. No `next/dynamic` with `{ ssr: false }` for `CursorLayer`.

### 7. Projects page is entirely `"use client"`
`src/app/projects/page.tsx:1` — Only needs client state for `useMobileDetection` and `TargetCursor`. The rest is static content that defeats SSG.

### 8. `getBlogPosts()` reads filesystem synchronously
`src/lib/blogs.ts:28-31` — Uses `readdirSync`/`readFileSync`. Blocks the event loop. No `async` APIs.

### 9. Hydration mismatch masked, not fixed
`footer.tsx:17-19` — `suppressHydrationWarning` hides the `new Date().getFullYear()` mismatch between server and client instead of rendering it client-only.

---

## SEO Issues

### 10. Hardcoded domain everywhere
`layout.tsx:38,42,54,69,89` — `https://pragnyanramtha.xyz/` is hardcoded instead of using `process.env.NEXT_PUBLIC_BASE_URL`.

### 11. Duplicate meta tags
`layout.tsx:87-90` — `<meta name="description">`, `<meta name="keywords">`, and `<meta name="author">` are all set twice: once via the `metadata` export and again as raw `<head>` tags.

### 12. No Twitter preview image
`layout.tsx:49-53` — `twitter` metadata is missing `images`. Twitter/X shares show no preview.

### 13. Canonical URL always points to `/`
`layout.tsx:89` — Hardcoded to root. Every page (blogs, projects) has the wrong canonical URL.

### 14. No `generateMetadata` for blog posts
`src/app/blogs/[slug]/page.tsx` — Blog posts have zero per-post SEO metadata (title, description, OG tags).

### 15. Sitemap includes phantom routes
`src/app/sitemap.ts:27-37` — `/index.md` and `/llms.txt` are in the sitemap but no route serves them.

### 16. Manual `<head>` in App Router layout
`layout.tsx:80-95` — Using `<head>` directly alongside `metadata` export. Next.js App Router should handle head via `metadata`/`generateMetadata` only.

---

## Accessibility Issues

### 17. No `aria-label` on icon-only social links
`contact.tsx:43-65` — GitHub, LinkedIn, and Mail icons have no accessible labels. Screen readers just say "link."

### 18. `<h2>` wrapping `<p>` elements (invalid HTML)
`header.tsx:22-27` — `<p>` tags inside `<h2>` is invalid nesting.

### 19. `<button>` used for navigation
`contact.tsx:25-38` — Buttons call `window.open()` to navigate. Should be `<a>` tags.

### 20. `href="#"` on social links
`contact.tsx:43,50,57` — Three links use `href="#"` with onClick. Keyboard users hit a dead link; screen readers announce "#".

### 21. No skip-to-content link
Across all pages — no keyboard navigation bypass for the navbar.

---

## Dead Code & Unused Dependencies

### 22. Unused functions/files
- `src/lib/utils.ts` — `extractDomain()` never imported
- `src/app/utils/calculate-years.ts` — entire file dead
- `src/components/shared/EmptyState.tsx` — never used
- `src/components/shared/YearButton.tsx` — never used
- `src/app/data/contribution-graph-theme.ts` — never imported

### 23. Unused image exports
`src/assets/index.ts` — `AirwatchImage`, `LibraryImage`, `SkygazeImage`, `TodoImage`, `VIPSImage`, `VueBitsImage` are exported but never imported.

### 24. Unused npm packages
- `react-icons` — never imported (all icons from `lucide-react`)
- `@radix-ui/react-tooltip` — replaced by `@base-ui/react`
- `tailwindcss-animate` — loaded as plugin but no `animate-*` classes used
- `prettier` — in `dependencies` instead of `devDependencies`

---

## Type Safety Issues

### 25. Duplicate `IProjectData` interface
Defined identically in `src/app/data.ts:10-17`, `src/components/sections/projects.tsx:5-12`, and `src/app/projects/page.tsx:12-20`.

### 26. Loose prop types
`about-me.tsx`, `contact.tsx`, `header.tsx` — Props typed as `Record<string, string>` allows any key, no compile-time field checking.

### 27. `isMobile` is `boolean | undefined`
`use-mobile.tsx:6` — Initial state is `undefined`, causing layout shift between server and first client render.

### 28. Missing `/placeholder.svg`
`projects/page.tsx:68,129` — Fallback `src={value.IMAGE || "/placeholder.svg"}` references a file that doesn't exist in `public/`.

---

## Architectural Issues

### 29. Layout pattern duplicated across 4 pages
Every page copies the same wrapper (`<div className="mx-auto px-4 pt-6..."><Navbar /><GridPattern /><main>...</main><CursorLayer /></div>`). Should be a shared layout component.

### 30. Component directories are disorganized
6 different component folders (`sections/`, `ui/`, `navbar/`, `base-ui/`, `shared/`, `kibo-ui/`) with no clear convention. `Navbar` is in `sections/` but delegates to `navbar/`.

### 31. `DATA.HEADER` passed to `Contact` (wrong data shape)
`page.tsx:43` — Contact receives the entire header object but only needs email, GitHub, LinkedIn.

### 32. ~60 lines of duplicated project rendering code
`projects/page.tsx:58-123` vs `124-183` — Near-identical blocks for projects with and without `LINK`.

---

## Security

### 33. CSP is just `frame-ancestors`
`next.config.ts:23` — No `default-src`, `script-src`, `style-src`, `img-src`. The header is effectively useless.

### 34. Missing security headers
No `Strict-Transport-Security`, `X-Frame-Options`, `Referrer-Policy`, or `X-XSS-Protection`.

### 35. Blog post pages lack `generateMetadata`
No per-post title/description means every blog post shares the same generic OG tags.

---

## Summary

| Category | Count |
|---|---|
| Critical | 4 |
| Performance | 5 |
| SEO | 7 |
| Accessibility | 5 |
| Dead Code/Unused | 3 |
| Type Safety | 4 |
| Architecture | 4 |
| Security | 3 |
| **Total** | **35** |
