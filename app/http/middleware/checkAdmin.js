const middleware = require("./middleware");

class checkAdmin extends middleware {

    check(req, res, next) {

        if (req.isAuthenticated() && req.user.admin) next();
        else res.redirect('/');

    }

}

module.exports = new checkAdmin();