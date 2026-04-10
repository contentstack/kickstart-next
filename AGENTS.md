# Contentstack Kickstart: Next.js – Agent guide

**Universal entry point** for contributors and AI agents. Detailed conventions live in **`skills/*/SKILL.md`**.

## What this repo is

| Field | Detail |
| --- | --- |
| **Name:** | https://github.com/contentstack/kickstart-next |
| **Purpose:** | Contentstack Kickstarts are the minimum amount of code needed to connect to Contentstack. This repo is a Next.js starter with SDK initialization, live preview, and Visual Builder setup. |
| **Out of scope (if any):** | Not a general-purpose SDK—it is a **starter app**. Production hardening, multi-page routing, and automated tests are left to consumers unless added here. |

## Tech stack (at a glance)

| Area | Details |
| --- | --- |
| Language | TypeScript 5 (`strict` in [tsconfig.json](tsconfig.json)) |
| Build | npm, Next.js 16 ([package.json](package.json), [next.config.mjs](next.config.mjs)) |
| Tests | **None in-repo** (no `test` script; no test files). Optional runners only if the team adds them. |
| Lint / coverage | ESLint 9, flat config ([eslint.config.mjs](eslint.config.mjs)); `eslint-config-next` (core-web-vitals + typescript). No coverage tooling configured. |
| Other | React 19, Tailwind CSS 4 ([postcss.config.mjs](postcss.config.mjs), [app/globals.css](app/globals.css)); Contentstack Delivery SDK and Live Preview utilities. |

## Commands (quick reference)

| Command Type | Command |
| --- | --- |
| Install | `npm install` |
| Build | `npm run build` |
| Dev | `npm run dev` |
| Start (production) | `npm run start` |
| Test | *(not defined)* |
| Lint | `npm run lint` |

**CI:** This repository runs security and policy workflows on pull requests; there is no GitHub Actions job that runs `npm run build` or `npm run lint`. See [.github/workflows/sca-scan.yml](.github/workflows/sca-scan.yml), [.github/workflows/policy-scan.yml](.github/workflows/policy-scan.yml), and [.github/workflows/issues-jira.yml](.github/workflows/issues-jira.yml).

## Where the documentation lives: skills

| Skill | Path | What it covers |
| --- | --- | --- |
| Dev workflow | [skills/dev-workflow/SKILL.md](skills/dev-workflow/SKILL.md) | Local setup, env, seed stack, CI expectations, CODEOWNERS |
| Contentstack kickstart | [skills/contentstack-kickstart/SKILL.md](skills/contentstack-kickstart/SKILL.md) | Delivery stack, live preview, `getPage`, env and content model alignment |
| Framework | [skills/framework/SKILL.md](skills/framework/SKILL.md) | Next.js/Tailwind/PostCSS config, `package.json` scripts and deps, image hosts |
| Next.js app | [skills/next-app/SKILL.md](skills/next-app/SKILL.md) | App Router, components, client vs server, rendering patterns |
| TypeScript style | [skills/typescript-style/SKILL.md](skills/typescript-style/SKILL.md) | `tsconfig`, ESLint rules, typing content models |
| Testing | [skills/testing/SKILL.md](skills/testing/SKILL.md) | Current test state (none), credentials policy, CI vs tests |
| Code review | [skills/code-review/SKILL.md](skills/code-review/SKILL.md) | PR checklist and severity hints |

The [skills/](skills/) directory layout is described in [skills/README.md](skills/README.md).

## Using Cursor (optional)

If you use **Cursor**, [.cursor/rules/README.md](.cursor/rules/README.md) only points to **AGENTS.md**—the same docs as everyone else.
