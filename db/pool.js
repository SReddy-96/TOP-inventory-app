const { Pool } = require("pg");

const SECRET = process.env;

module.exports = new Pool({
  host: SECRET.HOST,
  user: SECRET.USER,
  database: SECRET.DATABASE,
  password: SECRET.DATABASE_PASSWORD,
  port: 5432,
  ssl: 'require',
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
});
