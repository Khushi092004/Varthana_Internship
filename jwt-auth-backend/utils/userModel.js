const pool= require("../db");
const { queries } = require("../queries/queries");

// Check if user already exists
const getUserByEmail = async (email) => {
  const result = await pool.query(queries.getUserByEmail, [email]);
  return result.rows[0]; // Return user object if exists
};

// Insert new user
const createUser = async (name, email, hashedPassword) => {
  const result = await pool.query(
    queries.createUser,
    [name, email, hashedPassword]
  );
  return result.rows[0];
};

// Get user by ID
const getUserById = async (id) => {
  const result = await pool.query(queries.getUserById, [id]);
  return result.rows[0];
};

module.exports = { getUserByEmail, createUser, getUserById };
