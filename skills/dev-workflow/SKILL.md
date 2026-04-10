---
name: dev-workflow
description: Local setup, Contentstack seeding, env vars, CI expectations, and PR ownership for kickstart-next.
---

# Dev workflow – kickstart-next

## When to use

- You are cloning the repo, running it locally, or opening a pull request.
- You need to know what runs in CI versus what you must run locally.

## Instructions

### Local setup

- Install dependencies with `npm install`.
- Copy `.env.example` to `.env` and fill in values from your Contentstack stack (see product [README.md](../../README.md)).
- Required variables use the `NEXT_PUBLIC_CONTENTSTACK_*` prefix; see `.env.example` for names.

### Contentstack stack

- Install the Contentstack CLI (`npm install -g @contentstack/cli`), configure region if prompted, and log in (`csdx auth:login`).
- Seed a compatible stack: `csdx cm:stacks:seed --repo "contentstack/kickstart-stack-seed" --org "<YOUR_ORG_ID>" -n "Kickstart Stack"` (details in [README.md](../../README.md)).
- Create a delivery token with preview scope and preview token enabled; enable Live Preview in the stack and point it at the Preview environment.

### Run the app

- Development: `npm run dev`, then open `http://localhost:3000`.
- Production build locally: `npm run build` then `npm run start`.

### Lint

- Run `npm run lint` before pushing; there is no GitHub Actions workflow that runs ESLint for this repo.

### CI (GitHub Actions)

- [.github/workflows/sca-scan.yml](../../.github/workflows/sca-scan.yml): Snyk and `contentstack/sca-policy` on pull requests.
- [.github/workflows/policy-scan.yml](../../.github/workflows/policy-scan.yml): checks for `SECURITY.md` and license/year for public repos.
- [.github/workflows/issues-jira.yml](../../.github/workflows/issues-jira.yml): issue integration.
- **There is no workflow that runs `npm run build` or `npm run lint` in CI**; treat those as developer responsibilities unless a workflow is added later.

### CODEOWNERS

- Default reviewers: `@contentstack/devex-pr-reviewers` (see [.github/CODEOWNERS](../../.github/CODEOWNERS)).
- Security workflows and related paths may require `@contentstack/security-admin`.

### Optional: Talisman

- A [`.talismanrc`](../../.talismanrc) file exists; follow your org’s guidance if Talisman is used locally for secret scanning.
