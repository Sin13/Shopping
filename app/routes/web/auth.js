const express = require('express');
const router = express.Router();
const passport = require('passport');

// controllers
const loginController = require('app/http/controllers/auth/loginController')
const registerController = require('app/http/controllers/auth/registerController')

// routes

router.get('/login', loginController.showForm);
router.post('/login', loginController.login);

router.get('/register', registerController.showForm);
router.post('/register', registerController.register);

router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/cb',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

module.exports = router;