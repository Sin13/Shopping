const controller = require('app/http/controllers/controller')
const { check, validationResult } = require('express-validator');
const passport = require('passport');

class loginController extends controller {
    showForm(req, res) {
        res.render('auth/login', { errors: req.flash('errors'), recaptcha: this.recaptcha.render() });
    }

    login(req, res, next) {
        this.recaptchaValidation(req, res)
            .then(() => this.validate(req))
            .then((result) => {
                if (!result) this.loginProcess(req, res, next);
                else res.redirect('/login');
            })
    }

    async validate(req) {
        await check('email', 'فیلد ایمیل نمیتواند خالی بماند').notEmpty().run(req);
        await check('email', 'فیلد ایمیل معتبر نیست').isEmail().run(req);
        await check('password', 'فیلد پسورد نمیتواند کمتر از 8 کاراکتر باشد').isLength({ min: 8 }).run(req);


        const errors = validationResult(req).errors;
        const messages = [];
        errors.forEach(err => messages.push(err.msg));
        if (errors.length == 0) {
            return false;
        }
        else {
            req.flash('errors', messages);
            return true;
        }
    }

    loginProcess(req, res, next) {
        passport.authenticate('local-login', {
            failureRedirect: '/login',
            successRedirect: '/',
            failureFlash: true
        })(req, res, next);
    }

}

module.exports = new loginController();