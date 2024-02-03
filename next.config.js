/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nftstorage.link",
      },
      {
        protocol: "https",
        hostname: "ipfs.near.social",
        pathname: "/ipfs/**",
      },
      {
        protocol: "https",
        hostname: "byzantion.mypinata.cloud",
      },
    ],
  },
};

module.exports = nextConfig;
