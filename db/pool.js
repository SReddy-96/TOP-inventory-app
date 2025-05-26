const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

module.exports = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
});
