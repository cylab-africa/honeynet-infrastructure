const { dbPool } = require('../db/db_connection');

async function getLastOnline() {
    const sqlQuery = 'SELECT t.pi_id, t.online_time, t.pi_ip, t.online_id, t.num_of_modems, t.available_modems \
                      FROM last_online AS t INNER JOIN (SELECT pi_id, MAX(online_id) AS max_id FROM last_online \
                      GROUP BY pi_id) AS sub ON t.pi_id = sub.pi_id AND t.online_id = sub.max_id';

    return await dbPool.query(sqlQuery);
};

module.exports = { getLastOnline };
