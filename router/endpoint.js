const express = require('express');
const router = express.Router(); 
const verifyAccessToken = require('../verifyAccessToken');

const server = require('../controller/server');
router.get('/', server.server);

const loginRegister = require('../controller/loginRegisController');
router.post('/register', loginRegister.register);
router.post('/login', loginRegister.login);

const userController = require('../controller/userController');
router.get('/user', verifyAccessToken, userController.getAllUsers);
router.get('/user/:id', verifyAccessToken, userController.getUserById);

module.exports = router;
