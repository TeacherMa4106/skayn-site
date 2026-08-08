# AGENTS.md - Codex project entry

Codex is the implementation side of the Skayn website project. Keep changes within the user's named scope and use the project documents as the source of truth.

## Read before each task

1. The named task card under `docs/handoff/`, when one exists.
2. `docs/rules/PROJECT_RULES.md`.
3. `docs/status/PROJECT_STATUS.md`.
4. `docs/FEATURE_MAP.md`.
5. Every file named by the task.

## Working rules

- Direct small tasks may be implemented without a task card, but all project rules still apply.
- Do not edit generated `dist/` output.
- Do not expand a task into product, legal, tracking, or deployment decisions without explicit approval.
- Run `npm run precheck` before completion.
- User-facing visual acceptance belongs to the user. Browser automation is only allowed when a task explicitly requests it.
- For handoff work, record commands, results, changed files, and deviations in the task card's execution result.
