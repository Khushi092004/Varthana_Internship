module.exports = {
  CREATE_USER: "INSERT INTO users (username, email, password, age, mobile_no) VALUES ($1, $2, $3, $4, $5) RETURNING id",
  FIND_USER_BY_EMAIL: "SELECT * FROM users WHERE email = $1",
  FIND_USER_BY_ID: "SELECT id, username, email FROM users WHERE id = $1",
  GET_USER_BY_ID: "SELECT id, username, email, age, mobile_no FROM users WHERE id = $1"

};
