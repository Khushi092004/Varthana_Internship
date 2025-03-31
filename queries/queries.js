const { getUserById } = require("../utils/userModel")

const queries = {
    getUserByEmail : `SELECT * FROM users WHERE email = $1`,
    createUser : 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    getUserById :'SELECT id, name, email FROM users WHERE id = $1'
}

module.exports = { queries }