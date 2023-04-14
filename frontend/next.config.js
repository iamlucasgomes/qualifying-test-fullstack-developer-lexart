/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  images: {
    domains: ["static.netshoes.com.br", "http2.mlstatic.com", "i.zst.com.br"],
  },
};
