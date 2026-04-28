# Contentstack Endpoint Resolution

The app resolves regional Contentstack hosts through `getContentstackEndpoint` from `@contentstack/utils`.

`lib/contentstack.ts` requests the `contentDelivery`, `preview`, and `application` services for `NEXT_PUBLIC_CONTENTSTACK_REGION` and omits the `https://` prefix because the Delivery SDK and Live Preview options expect hostnames.

Custom internal regions can still use the existing environment overrides:

- `NEXT_PUBLIC_CONTENTSTACK_CONTENT_DELIVERY`
- `NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST`
- `NEXT_PUBLIC_CONTENTSTACK_CONTENT_APPLICATION`
