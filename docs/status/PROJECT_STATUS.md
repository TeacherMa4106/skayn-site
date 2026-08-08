# Skayn Website Status

Last updated: 2026-08-09

## Milestones

- **Phase 1 website shell complete (2026-08-09):** standalone Git project bootstrapped, Astro static routing boundary added, TypeScript diagnostics and CI quality gates enabled, and the v1 visual contract preserved.

## Protected infrastructure

| Area         | Files                                                       | Contract                                                                                                    |
| ------------ | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Quality gate | `scripts/validate-site.mjs`, `tests/site-contract.test.mjs` | Canonical domain, metadata, anchors, local assets, inline script syntax, and footer ownership remain valid. |
| CI           | `.github/workflows/ci.yml`                                  | Every branch runs format, validation, tests, build, and dependency audit.                                   |
| Governance   | `AGENTS.md`, `CLAUDE.md`, `docs/rules/PROJECT_RULES.md`     | Design, implementation, review, and scope boundaries remain explicit.                                       |

## Stable product contracts

| Area       | Files                                                  | Contract                                                                                                    |
| ---------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| Brand      | `public/skayn-logo.svg`, `public/occam-triad-logo.svg` | Preserve the approved Skayn mark geometry and three brand colors.                                           |
| Navigation | `src/pages/index.astro`                                | `home`, `download`, `security`, and `support` views use hash/history navigation and support returning home. |
| Identity   | `src/pages/index.astro`                                | Canonical domain and published footer identity use `skayn.net`; `skayn.com` must not appear.                |

## Active work

- Download release details and signed artifact links.
- Real privacy policy, terms, service status, and support destinations.
- Deployment configuration for `skayn.net` after a hosting provider is selected.
- Content and responsive refinement based on user visual review.

## Technical debt

| ID                 | Priority | Description                                                                                                                                        | Exit condition                                                                                                                                                 |
| ------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SITE-STRUCTURE-001 | P1       | `src/pages/index.astro` has entered the Astro routing boundary but still contains HTML, CSS, and JavaScript from the legacy prototype in one file. | Extract the document shell, styles, shared chrome, and runtime behavior into focused Astro components/modules without changing visuals or navigation behavior. |
| SITE-LEGAL-001     | P1       | Formal privacy policy, terms, security reporting, and support channels are not yet published.                                                      | Add reviewed content and real routes; only then expose footer links.                                                                                           |
| SITE-DEPLOY-001    | P2       | Hosting, DNS, cache headers, CSP, and release promotion are not configured.                                                                        | Select a provider and add reviewed deployment configuration for `skayn.net`.                                                                                   |
