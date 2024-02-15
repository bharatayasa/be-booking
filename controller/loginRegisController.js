const connection = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.JWT_SECRET;

module.exports = {
    register: async (req, res) => {
        const saltRounds = 10;
        try {
            const { username, name, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const sql = "INSERT INTO users (username, name, email, password) VALUES (?, ?, ?, ?)";

            const data = await new Promise((resolve, reject) => {
                connection.query(sql, [username, name, email, hashedPassword], (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
            return res.status(200).json({
                message: "User registered successfully",
                data: data
            });
        } catch (error) {
            console.error("Error during user registration:", error);
            return res.status(500).json({
                message: "Internal server error",
                status: error
            });
        }
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const sql = "SELECT * FROM users WHERE username = ?";
            
            const data = await new Promise((resolve, reject) => {
                connection.query(sql, [username], (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
            
            if (data.length === 0) {
                return res.status(401).json({ 
                    status: 'error', 
                    message: 'Authentication failed. User not found.' 
                });
            }
            
            const user = data[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);
            
            if (!isPasswordValid) {
                return res.status(401).json({ 
                    message: 'Authentication failed. Incorrect password', 
                    status: "error",
                });
            }
            
            const payload = {
                userId  : user.id,
                username: user.username,
                email   : user.email,
                role    : user.role
            };
            
            const accessToken = jwt.sign(payload, secretKey, { expiresIn: '1h' });
            
            return res.status(200).json({
                status: 'success',
                message: 'User logged successfully',
                role: user.role,
                token: {
                    accessToken
                }
            });
        } catch (error) {
            console.error('Error during user login: ', error);
            res.status(500).json({
                status: 'error', 
                message: 'Internal Server Error' 
            });
        }
    }, 
    getMe: async (req, res) => {
        try {
            const id = req.user.id;
            const sql = "SELECT * FROM users WHERE id_users = ?";
            
            const data = await new Promise((resolve, reject) => {
                connection.query(sql, id, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
            
            if (data.length === 0) {
                return res.status(404).json({ 
                    status: 'error', 
                    message: 'Resource not found' 
                });
            }
            
            const user = data[0];
            return res.status(200).json({
                status: 'success',
                message: 'User retrieved',
                data: {
                    id: user.id,
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
            });
        } catch (error) {
            console.error('Error fetching user data: ', error);
            return res.status(500).json({
                status: 'error',
                message: 'Internal Server Error' 
            });
        }
    }
};
