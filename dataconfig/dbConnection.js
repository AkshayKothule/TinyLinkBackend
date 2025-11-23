require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
    idleTimeoutMillis: 30000,  // close idle clients
  connectionTimeoutMillis: 5000, // fail fast instead of timeout
});

module.exports = pool;
