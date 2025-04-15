module.exports = {
  CREATE_USER: "INSERT INTO users (username, email, password, age, mobile_no) VALUES ($1, $2, $3, $4, $5) RETURNING id",
  FIND_USER_BY_EMAIL: "SELECT * FROM users WHERE email = $1",
  FIND_USER_BY_ID: "SELECT id, username, email FROM users WHERE id = $1",
  GET_USER_BY_ID: "SELECT id, username, email, age, mobile_no FROM users WHERE id = $1",
  GET_RANDOM_USERS: `
    SELECT id, username, email FROM users
    WHERE id != $1
    AND id NOT IN (
      SELECT CASE
        WHEN requester_id = $1 THEN receiver_id
        ELSE requester_id
      END
      FROM friendships
      WHERE requester_id = $1 OR receiver_id = $1
    )
    ORDER BY RANDOM()
    LIMIT 10;
  `
};

