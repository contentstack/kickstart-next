---
name: contentstack-kickstart
description: Contentstack Delivery SDK, live preview, getPage, env overrides, and content model alignment for kickstart-next.
---

# Contentstack kickstart – kickstart-next

## When to use

- You are changing how the app talks to Contentstack (delivery, preview, regions, hosts).
- You are extending or fixing assumptions about the `page` content type or Live Preview field bindings.

## Instructions

### Entry points

- All stack configuration and fetching live in [lib/contentstack.ts](../../lib/contentstack.ts).
- **`stack`**: created with `contentstack.stack()` from `@contentstack/delivery-sdk`, using API key, delivery token, environment, region, optional custom `host`, and `live_preview` options (preview token, preview host, enable flag).
- **`initLivePreview()`**: calls `ContentstackLivePreview.init()` from `@contentstack/live-preview-utils` with `ssr: false`, `mode: "builder"`, stack SDK/config, stack details, client URL params, and edit button settings.
- **`getPage(url)`**: queries the **`page`** content type, filters `url` with `QueryOperation.EQUALS`, and returns the first entry typed as `Page` from [lib/types.ts](../../lib/types.ts). When `isPreview` is true, adds editable tags via `contentstack.Utils.addEditableTags()`.

### Preview vs production routing

- [app/page.tsx](../../app/page.tsx): if `isPreview` (`NEXT_PUBLIC_CONTENTSTACK_PREVIEW === "true"`), render the client [components/Preview.tsx](../../components/Preview.tsx) with `path="/"`; otherwise fetch with `getPage("/")` on the server and render [components/Page.tsx](../../components/Page.tsx) (imported as `Page`).

### Regions and endpoints

- Region endpoint resolution uses `getContentstackEndpoint` from `@contentstack/utils`; the app asks for `contentDelivery`, `preview`, and `application` hosts with HTTPS omitted because the SDK host options expect hostnames.
- If region endpoint resolution fails, `NEXT_PUBLIC_CONTENTSTACK_REGION` is still passed to the SDK so custom/internal regions can work when the corresponding host override environment variables are set.

### Optional environment overrides (advanced)

- Delivery host: `NEXT_PUBLIC_CONTENTSTACK_CONTENT_DELIVERY` overrides the default from endpoints.
- Preview host: `NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST` overrides preview URL host.
- Application (Live Preview UI) host: `NEXT_PUBLIC_CONTENTSTACK_CONTENT_APPLICATION` overrides `clientUrlParams.host` in `initLivePreview`.
- Image hostname for `next/image`: `NEXT_PUBLIC_CONTENTSTACK_IMAGE_HOSTNAME` (see `next.config.mjs`).

### Types and Live Preview attributes

- Entry and field shapes for CSLP live in [lib/types.ts](../../lib/types.ts); `$` on entries/fields holds `data-cslp` / parent attributes. Keep these aligned with modular blocks and `page` fields expected from the seeded stack.

### Seed alignment

- The app assumes a stack seeded from `contentstack/kickstart-stack-seed` (“Kickstart Stack”) and tokens/scopes described in [README.md](../../README.md). Changing content type UIDs or field UIDs requires matching code and type updates.
