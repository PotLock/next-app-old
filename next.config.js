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
      {
        protocol: "https",
        hostname: "dev-api-potlock.orasci.site",
      },
    ],
  },
};

https: module.exports = nextConfig;
