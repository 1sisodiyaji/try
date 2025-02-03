const mysql = require('mysql2');
const logger = require('./logger');
const dotenv = require('dotenv');
const { exec } = require('child_process');
dotenv.config();

const initialConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

initialConnection.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``,
    (err) => {
        if (err) {
            logger.error(`Error creating database: ${err.message}`);
            process.exit(1);
        } else {
            logger.success(`Database "${process.env.DB_NAME}" is ready.`);

            exec('npx prisma db push', (error, stdout, stderr) => {
                if (error) {
                    logger.error(`Prisma sync error: ${stderr}`);
                    process.exit(1);
                }
                logger.success(`Prisma schema sync complete: ${stdout}`);

                const connectDB = mysql.createPool({
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                    waitForConnections: true,
                    connectionLimit: 10,
                    queueLimit: 0,
                });

                connectDB.getConnection((err, connection) => {
                    if (err) {
                        logger.error(`Error connecting to the database: ${err.message}`);
                        process.exit(1);
                    } else {
                        logger.success('Successfully connected to the MySQL database.');
                        connection.release();
                    }
                });

                module.exports = connectDB;
            });
        }
    }
);
