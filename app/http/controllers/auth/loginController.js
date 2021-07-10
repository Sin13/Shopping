const controller = require('app/http/controllers/controller')
const { check, validationResult } = require('express-validator');
const passport = require('passport');

class loginController extends controller {
    showForm(req, res) {
        const title = 'صفحه ورود';
        res.render('home/auth/login', {recaptcha: this.recaptcha.render(), title });
    }

    login(req, res, next) {
        this.recaptchaValidation(req, res)
            .then(() => this.validate(req))
            .then((result) => {
                if (!result) this.loginProcess(req, res, next);
                else {
                    req.flash('formData', req.body);
                    res.redirect('/login');
                }
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
        passport.authenticate('local-login', (err, user) => {
            // console.log(user);
            if (err) return next(err);
            if (!user) return res.redirect('/login');

            req.login(user, (err) => {
                if (err) return next(err);
                if (req.body.remember)
                    user.rememberLogin(res);
                return res.redirect('/');
            })
        })(req, res, next);
    }

}

module.exports = new loginController();