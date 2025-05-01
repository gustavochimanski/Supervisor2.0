/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: ['http://192.168.15.171:3000'], // IP do seu celular
};

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