const pool = require('../config/db');
const queries = require('../queries/userQueries');

exports.getRandomUsers = async (req, res) => {
  const userId = req.user.id;
  console.log("👤 Logged-in user ID:", userId);

  try {
    const result = await pool.query(queries.GET_RANDOM_USERS, [userId]);
    console.log("📦 Random users from DB:", result.rows); 
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching random users:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
