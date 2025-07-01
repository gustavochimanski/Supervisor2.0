/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development", // Desativa em dev
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,

  // 🚀 Aqui definimos o rewrite
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://51.38.190.174:8087/:path*", // ou https://seu-dominio.com se tiver
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
