import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'WebScrap Lexart',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
}

module.exports = config;