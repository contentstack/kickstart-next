// Importing Contentstack SDK and specific types for region and query operations
import contentstack, { QueryOperation } from "@contentstack/delivery-sdk";

// Importing Contentstack Live Preview utilities and stack SDK 
import ContentstackLivePreview, { IStackSdk } from "@contentstack/live-preview-utils";

// Importing the Page type definition 
import { Page } from "./types";

// Importing Contentstack endpoint helper
import { getContentstackEndpoint } from "@contentstack/utils";
import { ContentstackRegionEndpoints } from "./types";

export const isPreview = process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === "true";

// Region is optional. When it is not set, Contentstack defaults to the US region.
const region = process.env.NEXT_PUBLIC_CONTENTSTACK_REGION || undefined;

let endpoints: ContentstackRegionEndpoints = {};

try {
  // Get all default hosts for the selected region.
  // The third argument removes "https://" because the SDK expects hostnames.
  const regionEndpoints = getContentstackEndpoint(region, undefined, true);

  if (typeof regionEndpoints !== "string") {
    endpoints = regionEndpoints as ContentstackRegionEndpoints;
  }
} catch {
  // Unknown custom/internal regions can still work when the host env vars below are set.
}

export const stack = contentstack.stack({
  // Setting the API key from environment variables
  apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string,

  // Setting the delivery token from environment variables
  deliveryToken: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN as string,

  // Setting the environment based on environment variables
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string,

  // Setting the region
  // if the region doesnt exist, fall back to a custom region given by the env vars
  // for internal testing purposes at Contentstack we look for a custom region in the env vars, you do not have to do this.
  region,

  // Setting the host for content delivery based on the region or environment variables
  // This is done for internal testing purposes at Contentstack, you can omit this if you have set a region above.
  host: process.env.NEXT_PUBLIC_CONTENTSTACK_CONTENT_DELIVERY || endpoints?.contentDelivery,

  live_preview: {
    // Enabling live preview if specified in environment variables
    enable: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === 'true',

    // Setting the preview token from environment variables
    preview_token: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN,

    // Setting the host for live preview based on the region
    // for internal testing purposes at Contentstack we look for a custom host in the env vars, you do not have to do this.
    host: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST || endpoints?.preview
  }
});

// Initialize live preview functionality
export function initLivePreview() {
  ContentstackLivePreview.init({
    ssr: false, // Disabling server-side rendering for live preview
    enable: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === 'true', // Enabling live preview if specified in environment variables
    mode: "builder", // Setting the mode to "builder" for visual builder
    stackSdk: stack.config as IStackSdk, // Passing the stack configuration
    stackDetails: {
      apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string, // Setting the API key from environment variables
      environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string, // Setting the environment from environment variables
    },
    clientUrlParams: {
      // Setting the client URL parameters for live preview
      // for internal testing purposes at Contentstack we look for a custom host in the env vars, you do not have to do this.
      host: process.env.NEXT_PUBLIC_CONTENTSTACK_CONTENT_APPLICATION || endpoints?.application
    },
    editButton: {
      enable: true, // Enabling the edit button for live preview
      exclude: ["outsideLivePreviewPortal"] // Excluding the edit button from the live preview portal
    },
  });
}
// Function to fetch page data based on the URL
export async function getPage(url: string) {
  const result = await stack
    .contentType("page") // Specifying the content type as "page"
    .entry() // Accessing the entry
    .query() // Creating a query
    .where("url", QueryOperation.EQUALS, url) // Filtering entries by URL
    .find<Page>(); // Executing the query and expecting a result of type Page

  if (result.entries) {
    const entry = result.entries[0]; // Getting the first entry from the result

    if (isPreview) {
      contentstack.Utils.addEditableTags(entry, 'page', true); // Adding editable tags for live preview if enabled
    }

    return entry; // Returning the fetched entry
  }
}
