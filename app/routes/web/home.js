const express = require('express');
const router = express.Router();

// controllers
const homeController = require('http/controllers/homeController')
const loginController = require('http/controllers/auth/loginController')
const registerController = require('http/controllers/auth/registerController')

// home routes
router.get('/', homeController.index)
router.get('/login', loginController.showForm);
router.get('/register', registerController.showForm);
router.post('/register', registerController.register);

module.exports = router;