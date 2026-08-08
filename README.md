# Skayn Website

The standalone source project for the official Skayn website at `https://skayn.net/`.

## Requirements

- Node.js 22.12+ (`.nvmrc`)
- npm with lockfile-based installs
- Package installation uses the configured domestic mirror in `.npmrc`; dependency auditing uses the npm advisory endpoint because the mirror does not implement audit APIs.

## Development

```powershell
npm ci
npm run dev
```

Astro prints the local development URL after startup.

## Quality gate

```powershell
npm run precheck
```

The precheck runs formatting verification, structural validation, Astro type checking, contract tests, and a production build. Dependency changes also require `npm run audit:deps`.

## Project map

| Path                            | Purpose                                                              |
| ------------------------------- | -------------------------------------------------------------------- |
| `src/pages/index.astro`         | Current website route and legacy visual implementation.              |
| `public/skayn-logo.svg`         | Published Skayn logo and favicon.                                    |
| `astro.config.mjs`              | Static output and canonical site configuration.                      |
| `scripts/validate-site.mjs`     | Metadata, navigation, asset, script, and footer contract validation. |
| `tests/`                        | Node-based contract tests.                                           |
| `docs/rules/PROJECT_RULES.md`   | Engineering and product boundaries.                                  |
| `docs/status/PROJECT_STATUS.md` | Stable contracts, active work, and technical debt.                   |
| `docs/handoff/`                 | Design-to-implementation task cards and reviews.                     |

Production output is generated in `dist/` and is not committed.

## GitHub Pages deployment

1. Create a GitHub repository named `skayn-site` without adding a second README or `.gitignore`.
2. Push this project to the repository's `main` branch.
3. In repository settings, open **Pages** and set the source to **GitHub Actions**.
4. Point the DNS for `skayn.net` to GitHub Pages and keep `public/CNAME` committed.

The workflow in `.github/workflows/deploy-pages.yml` builds Astro and publishes `dist/` automatically after every push to `main`.
