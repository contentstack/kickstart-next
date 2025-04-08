/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "eu-images.contentstack.com",
      },
    ],
  },
};

export default nextConfig;
