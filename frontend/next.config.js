// @type {import('next').NextConfig}

const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  env: {
    HOST
  },
  images: {
    domains: ["http2.mlstatic.com", "i.zst.com.br"],
  },
};
