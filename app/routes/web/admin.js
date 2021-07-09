const express = require('express');
const router = express.Router();

// controllers
const adminController = require('app/http/controllers/admin/adminController');
const coursesController = require('app/http/controllers/admin/coursesController');

router.use((req, res, next) => {
    res.locals.layout = 'admin/master';
    next();
})


// admin routes
router.get('/', adminController.index);
router.get('/courses', coursesController.index);
router.get('/courses/create', coursesController.create);

module.exports = router;