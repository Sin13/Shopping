class coursesController {

    index(req, res) {
        res.render('admin/courses/index');
    }

    create(req, res) {
        res.render('admin/courses/create');
    }
}

module.exports = new coursesController();