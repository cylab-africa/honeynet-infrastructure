const { dbPool } = require('../db/db_connection');

async function retrieveCount() {
    const sqlQuery = 'SELECT pi_id, COUNT(*) AS message_count, MAX(created_at) AS last_message_date \
                     FROM received GROUP BY pi_id';
    return await dbPool.query(sqlQuery);
};

module.exports = { retrieveCount };
