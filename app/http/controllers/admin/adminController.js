class adminController {
    index(req, res) {
        res.send('controlled dashboard');
    }

    courses(req, res) {
        res.send('controlled courses');
    }
}

module.exports = new adminController();