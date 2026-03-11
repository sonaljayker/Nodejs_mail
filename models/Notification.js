const pool = require('../config/db');

const createNotification = async (userId, type, message, status) => {
    const result = await pool.query(
        `INSERT INTO notifications (user_id, type, message, status)
         VALUES ($1,$2,$3,$4)
         RETURNING *`,
        [userId, type, message, status]
    );

    return result.rows[0];
};

const getUserNotifications = async (userId) => {
    const result = await pool.query(
        `SELECT * FROM notifications
         WHERE user_id = $1
         ORDER BY created_at DESC`,
        [userId]
    );

    return result.rows;
};

module.exports = {
    createNotification,
    getUserNotifications
};