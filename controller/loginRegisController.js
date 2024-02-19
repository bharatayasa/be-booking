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
                    status  : 'error', 
                    message : 'Authentication failed. User not found.' 
                });
            }
            
            const user = data[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);
            
            if (!isPasswordValid) {
                return res.status(401).json({ 
                    message : 'Authentication failed. Incorrect password', 
                    status  : "error",
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
                data: {
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
            const email = req.user.email;
            const sql = "SELECT * FROM users WHERE email = ?";

            const data = await new Promise((resolve, reject) => {
                connection.query(sql, [email], (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                })
            })
            const user = data[0];
            res.status(200).json({
                status: 'success',
                message: 'User retrieved',
                data: {
                    id_users: user.id_users,
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    created_at: user.created_at,
                    updated_at: user.updated_at,
                    status: user.status,
                    role: user.role,
                    email_verified: user.email_verified
                },
            });
        } catch (error) {
            console.error('Error fetching user data: ', error);
            return res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
            });
        }
    },
};
