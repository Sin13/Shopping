const express = require('express');
const router = express.Router();
const passport = require('passport');

// controllers
const loginController = require('app/http/controllers/auth/loginController')
const registerController = require('app/http/controllers/auth/registerController')

// validators 
const registerValidator = require('app/http/validators/registerValidator');
const loginValidator = require('app/http/validators/loginValidator');

// routes
router.get('/login', loginController.showForm);
router.post('/login',loginValidator.handle(), loginController.login);

router.get('/register', registerController.showForm);
router.post('/register',registerValidator.handle(), registerController.register);

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/cb',
    passport.authenticate('google', { failureRedirect: '/auth/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

module.exports = router;