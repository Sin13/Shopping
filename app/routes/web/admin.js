const express = require('express');
const router = express.Router();

// controllers
const adminController = require('http/controllers/admin/adminController')


// admin routes
router.get('/', adminController.index);
router.get('/courses', adminController.courses);

module.exports = router;