const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres", 
  host: "localhost",
  database: "auth1_db",
  password: "12345678", 
});

module.exports = pool;
