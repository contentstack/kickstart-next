---
name: code-review
description: PR checklist and severity guidance for kickstart-next contributions.
---

# Code review – kickstart-next

## When to use

- Before you open a PR or when reviewing someone else’s changes.

## Instructions

### Checklist

- Run `npm run lint` and `npm run build` locally (CI does not run these automatically).
- Preview mode: confirm `components/Preview.tsx` and `initLivePreview` still behave; production path: confirm server `getPage` + `Page` render correctly for `/`.
- If you add or rename environment variables, update `.env.example` and user-facing docs where needed.
- No secrets in the repo; scan diffs for accidental tokens.
- Rich text paths still sanitize HTML (`isomorphic-dompurify`) before `dangerouslySetInnerHTML`.
- If new image hosts or CDNs appear, update `next.config.mjs` `remotePatterns` (and env-driven hostname if used).
- Content/schema changes should be reflected in [lib/types.ts](../../lib/types.ts) and any Live Preview `$` bindings in components.
- Dependency changes: consider impact on Snyk / SCA workflows (see `.github/workflows`).

### Severity (optional labels)

- **Blocker:** security regression (XSS, token leak), broken preview or production home route, build or lint failure.
- **Major:** incorrect Contentstack behavior, missing env documentation, type/schema drift that can break preview editing.
- **Minor:** style, copy, non-user-facing refactors, small UX nits.
