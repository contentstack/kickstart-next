/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Configure allowed hostnames for Next.js Image Optimization
    remotePatterns: [
      { hostname: "images.contentstack.io" },
      { hostname: "*-images.contentstack.com" },
      // Optionally add additional hostname from environment variable
      // This allows for internal testing at Contentstack or additional CDN configurations
      // Feel free to remove this if not needed
      ...(process.env.NEXT_PUBLIC_ADDITIONAL_IMAGE_HOSTNAME
        ? [{ hostname: process.env.NEXT_PUBLIC_ADDITIONAL_IMAGE_HOSTNAME }]
        : []),
    ],
  },
};

export default nextConfig;
