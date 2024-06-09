/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "efficient-caiman-220.convex.cloud",
      },
    ],
  },
};

module.exports = nextConfig;
