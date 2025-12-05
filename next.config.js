/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
    ppr: false,
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
