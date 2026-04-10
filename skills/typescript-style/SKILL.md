---
name: typescript-style
description: TypeScript compiler options, ESLint setup, and Contentstack entry typing conventions for kickstart-next.
---

# TypeScript style – kickstart-next

## When to use

- You are changing [tsconfig.json](../../tsconfig.json) or [eslint.config.mjs](../../eslint.config.mjs).
- You are adding or adjusting TypeScript types for Contentstack entries or Live Preview field metadata.

## Instructions

### Compiler options

- [tsconfig.json](../../tsconfig.json): `strict` is **true**, `noEmit` true, `moduleResolution` `bundler`, `jsx` `react-jsx`, `paths` includes `@/*` → `./*`.
- Include patterns cover `**/*.ts`, `**/*.tsx`, and Next-generated types under `.next`.

### ESLint

- [eslint.config.mjs](../../eslint.config.mjs) composes `eslint-config-next` **core-web-vitals** and **typescript** presets.
- `@typescript-eslint/no-explicit-any` is explicitly set to **off**; avoid introducing `any` without reason, but the project does not fail lint on it.

### Content models

- Prefer extending [lib/types.ts](../../lib/types.ts) for stack-backed shapes (`Page`, blocks, files, CSLP `$` mappings). When Live Preview needs new editable regions, add the corresponding `$` field shapes on interfaces.
