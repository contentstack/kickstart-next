// Importing DOMPurify for sanitizing HTML content to prevent XSS attacks
import DOMPurify from "isomorphic-dompurify";
// Importing Next.js optimized Image component for better performance
import Image from "next/image";
// Importing the Page type definition from our types file
import { Page } from "@/lib/types";
// Importing Visual Builder class for empty block handling in Contentstack Live Preview
import { VB_EmptyBlockParentClass } from "@contentstack/live-preview-utils";

// Interface defining the props for the ContentDisplay component
interface ContentDisplayProps {
  page: Page | undefined; // Page data that may be undefined during loading
}

// Main component for displaying page content with Contentstack Live Preview support
export default function ContentDisplay({ page }: ContentDisplayProps) {
  return (
    <section className="p-4">
      {/* Display page title if it exists */}
      {page?.title ? (
        <h1
          className="text-4xl font-bold mb-4 text-center"
          // Spread live preview attributes for editing capability in Contentstack
          {...(page?.$ && page?.$.title)}
        >
          {page?.title} with Next
        </h1>
      ) : null}

      {/* Display page description if it exists */}
      {page?.description ? (
        <p className="mb-4 text-center" {...(page?.$ && page?.$.description)}>
          {page?.description}
        </p>
      ) : null}

      {/* Display hero image if it exists */}
      {page?.image ? (
        <Image
          className="mb-4"
          width={768}
          height={414}
          src={page?.image.url}
          alt={page?.image.title}
          // Spread live preview attributes for the image field
          {...(page?.image?.$ && page?.image?.$.url)}
        />
      ) : null}

      {/* Display rich text content if it exists, sanitized for security */}
      {page?.rich_text ? (
        <div
          {...(page?.$ && page?.$.rich_text)}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(page?.rich_text), // Sanitize HTML to prevent XSS attacks
          }}
        />
      ) : null}

      {/* 
        Container for modular blocks with Visual Builder support
        Adds empty block class when no blocks exist for better editing experience
      */}
      <div
        className={`space-y-8 max-w-full mt-4 ${
          !page?.blocks || page.blocks.length === 0
            ? VB_EmptyBlockParentClass // Special class for empty state in Visual Builder
            : ""
        }`}
        {...(page?.$ && page?.$.blocks)}
      >
        {/* Map through blocks array to render each modular content block */}
        {page?.blocks?.map((item, index) => {
          const { block } = item; // Extract block data from item
          const isImageLeft = block.layout === "image_left"; // Determine layout direction

          return (
            <div
              key={block._metadata?.uid || `block-${index}`} // Use unique identifier as key for React
              {...(page?.$ && page?.$[`blocks__${index}`])} // Live preview attributes for each block
              className={`flex flex-col md:flex-row items-center space-y-4 md:space-y-0 bg-white ${
                isImageLeft ? "md:flex-row" : "md:flex-row-reverse" // Conditional layout based on block settings
              }`}
            >
              {/* Image container - takes half width on medium screens and up */}
              <div className="w-full md:w-1/2">
                {block.image ? (
                  <Image
                    key={`image-${block._metadata?.uid || index}`} // Unique key for image
                    src={block.image.url}
                    alt={block.image.title}
                    width={200}
                    height={112}
                    className="w-full"
                    {...(block?.$ && block?.$.image)} // Live preview attributes for image
                  />
                ) : null}
              </div>

              {/* Content container - takes half width on medium screens and up */}
              <div className="w-full md:w-1/2 p-4">
                {/* Block title */}
                {block.title ? (
                  <h2
                    className="text-2xl font-bold"
                    {...(block?.$ && block?.$.title)} // Live preview attributes for title
                  >
                    {block.title}
                  </h2>
                ) : null}

                {/* Block rich text content, sanitized for security */}
                {block.copy ? (
                  <div
                    {...(block?.$ && block?.$.copy)} // Live preview attributes for copy
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(block.copy), // Sanitize HTML content
                    }}
                    className="prose" // Apply prose styling for better typography
                  />
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
