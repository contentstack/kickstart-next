// Importing function to fetch page data and preview mode checker from Contentstack utilities
import { getPage, isPreview } from "@/lib/contentstack";
// Importing the Page component to render static content
import Page from "@/components/Page";
// Importing the Preview component to render live preview content
import Preview from "@/components/Preview";

// Home page component - serves as the main entry point for the application
// This is an async server component that can fetch data at build time or request time
export default async function Home() {
  // Fetch the entry on the server in both branches so the SSR'd HTML always
  // contains the real content. This is what makes browser Back navigation
  // restore the page correctly instead of a "Loading…" placeholder.
  const page = await getPage("/");

  // In preview mode, hand the entry to the client component so it can keep
  // syncing with the Visual Builder via the live-preview listener.
  if (isPreview) {
    return <Preview path="/" initialPage={page} />;
  }

  return <Page page={page} />;
}
