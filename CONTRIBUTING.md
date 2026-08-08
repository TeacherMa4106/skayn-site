# Contributing

## Setup

```powershell
npm ci
npm run dev
```

## Before submitting a change

```powershell
npm run precheck
```

For dependency changes, also run:

```powershell
npm run audit:deps
```

Keep work within the named scope, update tests when publishing contracts change, and record architecture or legal-content gaps in `docs/status/PROJECT_STATUS.md`.
