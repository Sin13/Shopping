const express = require('express');
const router = express.Router();

// controllers
const homeController = require('app/http/controllers/homeController')
const loginController = require('app/http/controllers/auth/loginController')
const registerController = require('app/http/controllers/auth/registerController')

// middlewares
const hideAuthPages = require('app/http/middleware/hideAuthPages')

// home routes
router.get('/', homeController.index)

router.get('/login', hideAuthPages.check, loginController.showForm);
router.post('/login', hideAuthPages.check, loginController.login);

router.get('/register', hideAuthPages.check, registerController.showForm);
router.post('/register', hideAuthPages.check, registerController.register);

router.get('/logout', (req, res) => {
    req.logOut();
    res.clearCookie('remember_token');
    res.redirect('/');
})

module.exports = router;