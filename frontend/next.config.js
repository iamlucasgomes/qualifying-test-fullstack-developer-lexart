// @type {import('next').NextConfig}
const createEnvFile = require('./builder/environment-builder');
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  createEnvFile,
  images: {
    domains: ["http2.mlstatic.com", "i.zst.com.br"],
  },
};
