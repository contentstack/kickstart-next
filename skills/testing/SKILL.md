---
name: testing
description: Test layout and policy for kickstart-next—currently no automated tests; credentials and CI context.
---

# Testing – kickstart-next

## When to use

- You are considering adding tests or verifying whether CI runs unit or E2E suites.
- You need a reminder of how to handle credentials in local or future test setups.

## Instructions

### Current state

- [package.json](../../package.json) has **no** `test` script.
- The repo has no `__tests__` directories or `*.test.*` / `*.spec.*` files as part of this kickstart. Confirm with the codebase before assuming tests exist.

### Credentials

- Never commit real API keys, delivery tokens, or preview tokens. Use placeholders in docs and `.env.example`-style samples only; real values belong in local `.env` (gitignored).

### CI

- GitHub workflows for this repo focus on security and policy (Snyk/sca-policy, SECURITY/LICENSE checks, Jira integration). **No workflow runs unit or end-to-end tests.**

### Optional future direction

- If the team adds tests later, common fits for this stack: unit tests around `lib/` fetch helpers (e.g. Vitest or Jest) and optional Playwright flows for preview—but only document concrete commands and folders once they exist.
