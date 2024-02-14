const connection = require('../db');
const bcrypt = require('bcrypt');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const role = req.user.role; 
            if (role !== 'admin') {
                return res.status(401).json({
                    message: "Access denied. Only admins are allowed to access this resource"
                })
            }
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
            if (data === 0) {
                return res.status(404).json({
                    message: "data not found", 
                    data: data
                })
            }
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
    },
    getUserById: async (req, res) => {
        try {
            const role = req.user.role; 
            if (role !== 'admin') {
                return res.status(401).json({
                    message: "Access denied. Only admins are allowed to access this resource"
                })
            }

            const id = req.params.id;
            const sql = "SELECT * FROM users WHERE id_users = ?";

            const data = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                })
            })
            if (data.length === 0) {
                return res.status(404).json({
                    message: "data not found"
                })
            }
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
    },
    addUser: async (req, res) => {
        const saltRounds = 10; 
        try {
            const id = req.params.id;
            const role = req.user.role;
            if (role !== 'admin') {
                return res.status(401).json({
                    message: "Access denied. Only admins are allowed to access this resource"
                })
            }
            const {username, name, email, password} = req.body;
            const hasedPassword = await bcrypt.hash(password, saltRounds); 
            const sql = "INSERT INTO users (username, name, email, password) VALUES (?, ?, ?, ?)";

            const data = await new Promise ((resolve, reject) => {
                connection.query(sql, [username, name, email, hasedPassword, id], (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                })
            })
            return res.status(200).json({
                message: "sucess to add data", 
                data: data
            })
        } catch (error) {
            return res.status(500).json({
                message: "internal server error", 
                status: error
            })
        }
    }, 
    updateUser: async (req, res) => {
        const saltRounds = 10; 
        try {
            const id = req.params.id;
            const role = req.user.role; 
            if (role !== 'admin') {
                return res.status(401).json({
                    message: "Access denied. Only admins are allowed to access this resource"
                });
            }
            const {username, name, email, password} = req.body; 
            
            const hashedPassword = await bcrypt.hash(password, saltRounds); 
            
            const sql = "UPDATE users SET username = ?, name = ?, email = ?, password = ? WHERE id_users = ?"; 
            
            const data = await new Promise((resolve, reject) => {
                connection.query(sql, [username, name, email, hashedPassword, id], (error, result) => {
                    if (error) {
                        reject(error); 
                    } else {
                        resolve(result);
                    }
                });
            });
            
            return res.status(200).json({
                message: "Success to update data", 
                data: data
            });
        } catch (error) {
            console.error("Error during user update:", error);
            return res.status(500).json({
                message: "Internal server error", 
                status: error
            });
        }
    }, 
    deleteUser: async (req, res) => {
        const role = req.user.role; 
        if (role !== 'admin') {
            return res.status(401).json({
                message: "Access denied. Only admins are allowed to access this resource"
            })
        }
        try {
            const id = req.params.id; 
            const sql = "DELETE FROM users WHERE id_users = ?"; 

            const data = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                })
            })
            return res.status(200).json({
                message: "success to delete data", 
                data: data
            })
        } catch (error) {
            return res.status(500).json({
                message: "internal server error", 
                status: error
            })
        }
    }
}
