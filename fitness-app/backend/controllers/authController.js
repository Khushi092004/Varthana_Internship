const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const queries = require("../queries/userQueries");

exports.register = async (req, res) => {
  const { username, email, password, age, mobileNo,  } = req.body;

  try {
    // Check if user already exists
    const existingUser = await pool.query(queries.FIND_USER_BY_EMAIL, [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: " Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(queries.CREATE_USER, [username, email, hashedPassword, age, mobileNo]);

    res.status(201).json({ 
      message: " User registered successfully", 
      user: { id: newUser.rows[0].id, username, email }  // Exclude password
    });
  }  catch (error) {
    console.error("Register Error:", error); // Full stack trace
    res.status(500).json({ 
      message: " Error registering user", 
      error: error.message || "Unknown error"
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query(queries.FIND_USER_BY_EMAIL, [email]);
    if (user.rows.length === 0) return res.status(400).json({ message: "User not found" });

    const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!isValidPassword) return res.status(400).json({ message: " Invalid password" });

    const token = jwt.sign(
      { id: user.rows[0].id, email }, 
      process.env.JWT_SECRET, 
      { expiresIn: "2h" } // Increased expiration time
    );

    res.json({
      message: " Login successful",
      token,
      user: {
        id: user.rows[0].id,
        username: user.rows[0].username,
        email: user.rows[0].email
        
      }
    });
    
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const result = await pool.query(queries.GET_USER_BY_ID, [userId]);
    const user = result.rows[0];

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });


  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
  console.log(req.user)
};
