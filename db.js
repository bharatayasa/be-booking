const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
    host    : process.env.DB_HOST,
    user    : process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const connectToDatabase = () => {
    return new Promise((resolve, reject) => {
        connection.connect((error) => {
            if (error) {
                console.error("Failed connecting to database");
                reject(error);
            }
            console.log("Connected to database");
            resolve();
        });
    });
};

const initializeDatabase = async () => {
    try {
        await connectToDatabase();
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
};

initializeDatabase();

module.exports = connection;
