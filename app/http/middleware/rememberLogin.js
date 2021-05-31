const middleware = require("./middleware");
const User = require('app/models/user.js');

class rememberLogin extends middleware {
    check(req, res, next) {
        if (!req.isAuthenticated()) {
            const rememberToken = req.signedCookies.remember_token;
            if (rememberToken) return this.findUser(req, next, rememberToken);
        }
        next();
    }

    findUser(req, next, rememberToken) {
        User.findOne({ rememberToken }).then(
            user => {
                if (user) {
                    req.login(user, err => {
                        (err) ? next(err) : next();
                    })
                } else next();
            }
        ).catch(err => next(err));
    }
}

module.exports = new rememberLogin();