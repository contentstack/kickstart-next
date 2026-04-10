---
name: framework
description: Next.js, Tailwind v4, PostCSS, package scripts, and image optimization configuration for kickstart-next.
---

# Framework – kickstart-next

## When to use

- You are changing Next.js configuration, Tailwind/PostCSS pipeline, or root dependency versions.
- You need to allow new remote image hostnames for `next/image`.
- You are adjusting npm scripts or verifying how production builds are produced.

## Instructions

### Package scripts and dependencies

- [package.json](../../package.json) defines:
  - `dev`: `next dev`
  - `build`: `next build`
  - `start`: `next start`
  - `lint`: `eslint .`
- Major runtime deps: Next.js 16, React 19, `@contentstack/delivery-sdk`, `@contentstack/live-preview-utils`, `@timbenniks/contentstack-endpoints`, `isomorphic-dompurify`.
- Styling/tooling: Tailwind CSS 4, `@tailwindcss/postcss`, TypeScript 5, ESLint 9, `eslint-config-next` 16.

### Next.js config

- [next.config.mjs](../../next.config.mjs) sets `images.remotePatterns`:
  - If `NEXT_PUBLIC_CONTENTSTACK_IMAGE_HOSTNAME` is set, a single pattern uses that hostname.
  - Otherwise: `images.contentstack.io` and `*-images.contentstack.com` (wildcard subdomain).
- Any new CDN or asset hostname used with `next/image` must be added here (or supplied via the env hostname above).

### PostCSS and Tailwind

- [postcss.config.mjs](../../postcss.config.mjs) registers the `@tailwindcss/postcss` plugin (Tailwind v4 pipeline).
- [app/globals.css](../../app/globals.css) uses `@import "tailwindcss"` and an `@layer base` block documenting Tailwind v4 border defaults and global `body` / `a` rules. New global styles should stay consistent with this setup.

### Build and runtime

- Standard Node/Next: `npm run build` produces the Next production bundle; `npm run start` serves it. There are no custom native binaries or non-npm packaging steps in this repo.
