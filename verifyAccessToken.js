const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.JWT_SECRET;

function verifyAccessToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({
            status: 'error', 
            message: 'Unauthorized' 
        });
    }
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ 
                status: 'error', 
                message: 'Access denied' 
            });
        }
        // Memeriksa peran pengguna yang disimpan dalam token JWT
        if (user.role !== 'admin') {
            return res.status(403).json({
                status: 'error',
                message: 'Access denied. Only admins are allowed.'
            });
        }
        req.user = user;
        next();
    });
}

module.exports = verifyAccessToken;
