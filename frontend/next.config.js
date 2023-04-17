const createEnvFile = require('./builder/environment-builder');
const nextConfig = {
  reactStrictMode: true,
};

(async () => {
  await createEnvFile();
})();

module.exports = {
  nextConfig,
  images: {
    unoptimized: true,
    domains: ["http2.mlstatic.com", "i.zst.com.br"],
  },
};