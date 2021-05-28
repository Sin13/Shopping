const express = require('express');
const router = express.Router();

// controllers
const homeController = require('app/http/controllers/homeController')
const loginController = require('app/http/controllers/auth/loginController')
const registerController = require('app/http/controllers/auth/registerController')

// home routes
router.get('/', homeController.index)
router.get('/login', loginController.showForm);
router.get('/register', registerController.showForm);
router.post('/register', registerController.register);

module.exports = router;