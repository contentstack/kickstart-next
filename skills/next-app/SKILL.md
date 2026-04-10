---
name: next-app
description: App Router structure, React components, client vs server, and rendering patterns in kickstart-next.
---

# Next.js app – kickstart-next

## When to use

- You are adding or changing routes, layouts, or UI components.
- You are deciding client vs server components or how preview mode loads data.

## Instructions

### App Router

- [app/layout.tsx](../../app/layout.tsx) is the root layout; [app/page.tsx](../../app/page.tsx) is the home route.
- [app/page.tsx](../../app/page.tsx) is an async Server Component when not in preview: it calls `getPage("/")` and passes the result to the default import from `@/components/Page`.

### Preview path (client)

- [components/Preview.tsx](../../components/Preview.tsx) is a Client Component (`"use client"`). It initializes live preview in `useEffect`, subscribes to `ContentstackLivePreview.onEntryChange`, and refetches via `getPage(path)` when the URL path changes.

### Page UI component

- [components/Page.tsx](../../components/Page.tsx) default export is imported elsewhere as **`Page`** (`import Page from "@/components/Page"`). The function implementing it is named `ContentDisplay` inside the file; treat the public name as `Page` when wiring props.
- It renders title, description, `next/image` for assets, sanitized rich HTML via `isomorphic-dompurify` and `dangerouslySetInnerHTML`, and modular blocks with `VB_EmptyBlockParentClass` for empty Visual Builder state.
- Spread `page?.$` / block `$` attributes onto DOM nodes so Live Preview can bind fields.

### Images

- Use `next/image` for remote images. Remote hostnames must stay allowed in [next.config.mjs](../../next.config.mjs) (`images.remotePatterns` and optional env hostname).

### Imports

- Path alias `@/*` maps to the repo root per [tsconfig.json](../../tsconfig.json) (e.g. `@/lib/contentstack`, `@/components/Page`).
