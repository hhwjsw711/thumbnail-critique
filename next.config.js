/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "efficient-caiman-220.convex.cloud",
      },
      {
        hostname: "studio.fizzdragon.com",
      },
    ],
  },
};

module.exports = nextConfig;
