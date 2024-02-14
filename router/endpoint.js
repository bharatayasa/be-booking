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
router.post('/user', verifyAccessToken, userController.addUser);
router.put('/user/:id', verifyAccessToken, userController.updateUser);
router.delete('/user/:id', verifyAccessToken, userController.deleteUser);



module.exports = router;
