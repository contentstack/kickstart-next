"use client"; // This directive indicates that the code is meant to run on the client side and the server side

import DOMPurify from "dompurify";
import Image from "next/image"; // Importing the Image component from Next.js for optimized image rendering
import { getPage, initLivePreview } from "@/lib/contentstack"; // Importing functions to get page data and initialize live preview from a local library
import { useEffect, useState } from "react"; // Importing React hooks for side effects and state management
import { Page } from "@/lib/types"; // Importing the Page type definition from a local types file
import ContentstackLivePreview, {
  VB_EmptyBlockParentClass,
} from "@contentstack/live-preview-utils"; // Importing live preview utilities from Contentstack

/**
 * The `Home` component is the main page component for the application.
 * It fetches and displays content from Contentstack, including the page title,
 * description, image, rich text, and blocks.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * This component uses the `useState` and `useEffect` hooks to manage state and side effects.
 * It initializes live preview functionality and listens for entry changes to update the content.
 */
export default function Home() {
  const [page, setPage] = useState<Page>(); // Declaring a state variable 'page' with its setter 'setPage', initially undefined

  const getContent = async () => {
    const page = await getPage("/"); // Asynchronously fetching page data for the root URL
    setPage(page); // Updating the state with the fetched page data
  };

  useEffect(() => {
    initLivePreview(); // Initializing live preview functionality
    ContentstackLivePreview.onEntryChange(getContent); // Setting up an event listener to fetch content on entry change
  }, []);

  return (
    <main className="max-w-(--breakpoint-md) mx-auto">
      {/* Main container with max width and centered alignment */}
      <section className="p-4">
        {/* Section with padding */}
        {page?.title ? (
          <h1
            className="text-4xl font-bold mb-4 text-center"
            {...(page?.$ && page?.$.title)} // Adding editable tags if available
          >
            {page?.title} with Next{/* Rendering the page title */}
          </h1>
        ) : null}
        {page?.description ? (
          <p className="mb-4 text-center" {...(page?.$ && page?.$.description)}>
            {/* Adding editable tags if available */}
            {page?.description} {/* Rendering the page description */}
          </p>
        ) : null}
        {page?.image ? (
          <Image
            className="mb-4"
            width={768}
            height={414}
            src={page?.image.url}
            alt={page?.image.title}
            {...(page?.image?.$ && page?.image?.$.url)} // Adding editable tags if available
          />
        ) : null}
        {page?.rich_text ? (
          <div
            {...(page?.$ && page?.$.rich_text)} // Adding editable tags if available
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(page?.rich_text),
            }} // Rendering rich text content as HTML
          />
        ) : null}
        <div
          className={`space-y-8 max-w-full mt-4 ${
            !page?.blocks || page.blocks.length === 0
              ? VB_EmptyBlockParentClass // Adding a class if no blocks are present
              : ""
          }`}
          {...(page?.$ && page?.$.blocks)} // Adding editable tags if available
        >
          {page?.blocks?.map((item, index) => {
            const { block } = item;
            const isImageLeft = block.layout === "image_left"; // Checking the layout of the block

            return (
              <div
                key={block._metadata.uid}
                {...(page?.$ && page?.$[`blocks__${index}`])} // Adding editable tags if available
                className={`flex flex-col md:flex-row items-center space-y-4 md:space-y-0 bg-white ${
                  isImageLeft ? "md:flex-row" : "md:flex-row-reverse" // Adjusting the layout based on the block's layout property
                }`}
              >
                <div className="w-full md:w-1/2">
                  {block.image ? (
                    <Image
                      key={`image-${block._metadata.uid}`}
                      src={block.image.url}
                      alt={block.image.title}
                      width={200}
                      height={112}
                      className="w-full"
                      {...(block?.$ && block?.$.image)} // Adding editable tags if available
                    />
                  ) : null}
                </div>
                <div className="w-full md:w-1/2 p-4">
                  {block.title ? (
                    <h2
                      className="text-2xl font-bold"
                      {...(block?.$ && block?.$.title)} // Adding editable tags if available
                    >
                      {block.title} {/* Rendering the block title */}
                    </h2>
                  ) : null}
                  {block.copy ? (
                    <div
                      {...(block?.$ && block?.$.copy)} // Adding editable tags if available
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(block.copy),
                      }} // Rendering block copy as HTML
                      className="prose"
                    />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
