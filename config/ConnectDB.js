const mysql = require('mysql2');
const logger = require('./logger');

const connectDB = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'test',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

connectDB.getConnection((err, connection) => {
    if (err) {
        logger.error(`Error connecting to the database: ${err.message}`); 
    } else {
        logger.success('Successfully connected to the MySQL database.'); 
        connection.release();
    }
});

module.exports = connectDB;