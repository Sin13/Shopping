const express = require('express');
const router = express.Router();

// admin router
router.use('/admin', require('./admin'));

// home router
router.use('/', require('./home'));

module.exports = router; 