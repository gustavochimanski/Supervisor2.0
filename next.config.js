/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development", // Desativa em dev
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,

  // 🚀 Rewrites para diferentes APIs
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Backend principal
        destination: "http://51.38.190.174:8087/:path*",
      },
      {
        source: "/api/mensura/:path*", // Mensura
        destination: "http://69.62.93.161:1000/:path*",
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
