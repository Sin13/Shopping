const controller = require('http/controllers/controller')

class loginController extends controller {
    showForm(req, res) {
        res.render('auth/login');
    }
    
}

module.exports = new loginController();