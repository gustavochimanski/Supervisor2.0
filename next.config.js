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
        source: "/api/mensura/:path*", // Coloque esse primeiro!
        destination: "http://69.62.93.161:1000/:path*",
      },
      {
        source: "/api/:path*", // Esse vem depois
        destination: "http://51.38.190.174:8087/:path*",
      },
      {
        source: "/imagens/:path*", // Novo caminho público
        destination: "http://69.62.93.161:1001/:path*", // Origem real
      },
    ];
  }

};

module.exports = withPWA(nextConfig);
