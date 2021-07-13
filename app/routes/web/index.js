const express = require('express');
const router = express.Router();

// middlewares
const hideAuthPages = require('app/http/middleware/hideAuthPages');
const adminCheck = require('app/http/middleware/checkAdmin');

// admin router
router.use('/admin', adminCheck.check, require('./admin'));

// home router
router.use('/', require('./home'));

// auth router
router.use('/auth', hideAuthPages.check, require('./auth'));

module.exports = router; 