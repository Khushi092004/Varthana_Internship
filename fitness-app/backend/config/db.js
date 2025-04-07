const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect()
  .then(() => console.log(" Connected to Database"))
  .catch(err => {
    console.error(" Database Connection Error:", err);
    process.exit(1); // Exit process on failure
  });

module.exports = pool;
