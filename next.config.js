/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development", // Desativa em dev
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Permite usar <Image src="http://mensuraapi.com.br:1001/…" />
  images: {
    domains: ["mensuraapi.com.br"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "mensuraapi.com.br",
        port: "1001",
        pathname: "/**",
      },
    ],
  },

  // 🚀 Rewrites para diferentes APIs
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://mensuraapi.com.br/:path*",
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
