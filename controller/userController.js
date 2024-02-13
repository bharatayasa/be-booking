const connection = require('../db');

module.exports = {
    getAllUsers: async (req, res) => {
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
    }
}