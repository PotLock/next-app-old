/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nftstorage.link",
      },
    ],
  },
};

module.exports = nextConfig;
