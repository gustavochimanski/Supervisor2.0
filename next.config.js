/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development", // Desativa em dev
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  reactStrictMode: true,
});