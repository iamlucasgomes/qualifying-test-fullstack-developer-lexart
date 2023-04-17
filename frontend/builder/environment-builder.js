const fs = require('fs');
const activeEnv = process.env.ACTIVE_ENV || 'env';

const env = require('dotenv').config({
  path: `.env.${activeEnv}`,
});

const createEnvFile = () => {
  return new Promise((resolve, reject) => {
    fs.writeFile('environment.js', `export default ${JSON.stringify(env.parsed ? env.parsed : {BACKEND: 'localhost'})}`, 'utf8', (error) => {
      return error ? reject(error) : resolve();
    });
  });
};

module.exports = createEnvFile;