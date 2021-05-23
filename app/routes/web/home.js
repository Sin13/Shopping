const express = require('express');
const router = express.Router();

// controllers
const homeController = require('http/controllers/homeController')

// home routes
router.get('/', homeController.index)

module.exports = router;