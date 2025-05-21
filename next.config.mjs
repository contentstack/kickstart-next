/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.contentstack.io",
      },
      {
        protocol: "https",
        hostname: "*-images.contentstack.com",
      },
    ],
  },
};

export default nextConfig;
