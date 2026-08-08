# Skayn Website Project Rules

This file is the engineering source of truth for the standalone Skayn website.

## 1. Product boundary

- This repository owns the public website for `https://skayn.net/`.
- It does not own Occam application code, backend services, Electron code, or user data.
- Do not introduce analytics, cookies, forms, remote fonts, third-party scripts, or data collection without explicit product and privacy approval.
- Do not publish placeholder contact details, download URLs, legal claims, security claims, or availability statements as if they were live.

## 2. Source of truth

Read in this order:

1. The current task card under `docs/handoff/`, when present.
2. This file.
3. `docs/status/PROJECT_STATUS.md`.
4. `docs/FEATURE_MAP.md`.
5. The implementation files named by the task.

`src/pages/` owns website routes. The current home implementation is `src/pages/index.astro`. `dist/` is generated and must never be edited or committed.

## 3. Change risk

- **Protected:** CI, validation scripts, project rules, canonical domain, privacy/security language, and deployment configuration. Change only when the task explicitly names the concern.
- **Stable:** Logo assets, view IDs, hash navigation, history behavior, reduced-motion behavior, and the published footer identity contract. Preserve behavior unless explicitly changed.
- **Active:** Marketing copy, unfinished download/support content, responsive polish, and future page extraction.

Never broaden a visual task into legal wording, tracking, data collection, or deployment changes.

## 4. Visual direction

- The logo and its purple, raspberry, and lime colors are the primary brand signal.
- Do not restore color bands, decorative blobs, card grids, nested cards, or opaque footer overlays.
- Product navigation belongs in the header. Legal and operational links belong in the footer only after real destination pages exist.
- Use whitespace, typography, alignment, and restrained lines for hierarchy.
- Keep controls compact, responsive, keyboard accessible, and readable in dark and light themes.
- Respect `prefers-reduced-motion` and visible focus states.
- Do not perform visual acceptance on behalf of the user.

## 5. Engineering rules

- Use Node 22 as declared in `.nvmrc`; install with `npm ci` when a lockfile exists.
- Keep the dependency set small. New runtime dependencies require a concrete need and explicit scope.
- Use structured DOM APIs and modules when JavaScript is extracted from HTML.
- Avoid global mutable state, inline event handlers, `eval`, and unsafe HTML injection.
- New source modules should remain focused: JavaScript <= 300 lines, CSS <= 500 lines, HTML page <= 500 lines. Exceeding a limit requires a documented split or technical debt entry.
- The existing monolithic `src/pages/index.astro` is a recorded legacy exception. Do not materially grow it before the extraction task in `PROJECT_STATUS.md` is completed.
- Use ASCII in source unless user-facing content requires another character set.

## 6. Verification and delivery

Before completion, run:

```powershell
npm run precheck
```

This must pass formatting, structural validation, contract tests, and the Astro production build. Run `npm run audit:deps` when dependencies or the lockfile change.

Do not commit `node_modules/`, `dist/`, local environment files, logs, or screenshots.
