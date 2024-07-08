const mariadb = require('mariadb');
const dotenv = require("dotenv");

dotenv.config();

const dbPool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5,
});

async function connectDB() {
    return new Promise(function (res, rej) {
        dbPool.getConnection()
            .then(function (conn) {
                res(conn);
                console.log("Successfully connected to MariaDB!");
            })
            .catch(function (error) {
                rej(error);
                console.log("Error connecting to MariaDB\n" + error);
            });
    });
};

module.exports = { dbPool, connectDB };
