/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Configure allowed hostnames for Next.js Image Optimization
    remotePatterns: [
      ...(process.env.NEXT_PUBLIC_CONTENTSTACK_IMAGE_HOSTNAME
        ? [{ hostname: process.env.NEXT_PUBLIC_CONTENTSTACK_IMAGE_HOSTNAME }]
        : [
            { hostname: "images.contentstack.io" },
            { hostname: "*-images.contentstack.com" },
          ]),
    ],
  },
};

export default nextConfig;
