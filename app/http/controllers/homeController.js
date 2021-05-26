const controller = require('http/controllers/controller');

class homeController extends controller {
    index(req, res) {
        res.render('home');
    }
}

module.exports = new homeController();