// this middleware will redirect authenticated users when they try to access the authentication pages

const middleware = require("./middleware");

class hideAuthPages extends middleware {
    check(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect('/');
        }
        next();
    }

}

module.exports = new hideAuthPages();