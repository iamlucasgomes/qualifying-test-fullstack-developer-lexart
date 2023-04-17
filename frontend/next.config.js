const createEnvFile = require('./builder/environment-builder');
// const enviroment = require('./environment');
const nextConfig = {
  reactStrictMode: true,
};

(async () => {
  await createEnvFile();
})();

module.exports = {
  nextConfig,
  // env: {
  //   HOST: enviroment.default.HOST
  // },
  images: {
    unoptimized: true,
    domains: ["http2.mlstatic.com", "i.zst.com.br"],
  },
};
