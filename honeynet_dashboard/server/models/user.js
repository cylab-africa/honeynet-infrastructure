const { dbPool } = require('../db/db_connection');

async function getUser(email) {
    const sqlQuery = "SELECT * FROM user WHERE email = ?";
    return await dbPool.query(sqlQuery, [email]);
};

async function saveUser(userId, email, hashedPassword, institution, joinDate) {
    const sqlQuery = "INSERT INTO user (user_id, email, password, institution, joinDate) VALUES (?, ?, ?, ?, ?)";
    return await dbPool.query(sqlQuery, [userId, email, hashedPassword, institution, joinDate]);
};

module.exports = { getUser, saveUser };
