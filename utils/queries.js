const pool= require("/..db")

const pool = require("../db");

// Check if user already exists
const getUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0]; // Return user object if exists
};

// Insert new user
const createUser = async (name, email, hashedPassword) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, hashedPassword]
  );
  return result.rows[0];
};

// Get user by ID
const getUserById = async (id) => {
  const result = await pool.query("SELECT id, name, email FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

module.exports = { getUserByEmail, createUser, getUserById };
