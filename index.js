const express = require('express');
const dotenv = require('dotenv');
const connection = require('./db');

const app = express();
dotenv.config(); 

app.get('/', async (req, res) => {
    try {
        return res.status(200).json({
            message: "server up and running"
        })
    } catch (error) {
        return res.status(500).json({
            message: "internal server error", 
            status: error
        })
    }
})

app.get('/users', async (req, res) => {
    try {
        const sql = "SELECT * FROM users"; 

        const data = await new Promise((resolve, reject) => {
            connection.query(sql, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            })
        })
        return res.status(200).json({
            message: "success to get data", 
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            message: "internal server error", 
            status: error
        })
    }
})

const port = process.env.PORT || 3000;
const host = process.env.HOST; 

app.listen(port, host, () => {
    console.log(`server up and running at http://${host}:${port}`);
})
