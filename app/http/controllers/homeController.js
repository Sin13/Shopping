const controller = require('./controller')

class homeController extends controller {
    index(req, res) {
        res.send(this.test());
    }

    test(){
        return 'testy :)'
    }
}

module.exports = new homeController();