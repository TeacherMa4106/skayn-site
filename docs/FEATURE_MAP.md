# Skayn Website Feature Map

## Current surface

```text
src/pages/index.astro
|- home       Brand mark, wordmark, download entry
|- download   Release readiness and platform information
|- security   Product security and privacy principles
|- support    Product help, security report, installation support
`- footer     Published domain and copyright only
```

Navigation is a single-document dynamic view controlled by the URL hash:

| Hash                         | View                 |
| ---------------------------- | -------------------- |
| `#top` or no recognized hash | Home                 |
| `#download`                  | Download             |
| `#security`                  | Security and privacy |
| `#support`                   | Contact and support  |

## Build and quality flow

```text
npm run precheck
|- Prettier format check
|- Site structural validation
|- Node contract tests
`- Astro production build -> dist/
```

Astro owns route generation and static output. `scripts/validate-site.mjs` is the current publishing-contract gate; update it when an approved route or publishing contract changes.
