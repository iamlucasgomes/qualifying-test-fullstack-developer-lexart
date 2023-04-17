// @type {import('next').NextConfig}

const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  env: {
    DB_HOST: 'http://localhost:3001'
  },
  images: {
    domains: ["http2.mlstatic.com", "i.zst.com.br"],
  },
};
