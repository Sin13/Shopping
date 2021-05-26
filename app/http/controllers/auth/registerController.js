const controller = require('http/controllers/controller')
const { check, validationResult } = require('express-validator');

class registerController extends controller {
    showForm(req, res) {
        res.render('auth/register', { messages: req.flash('errors'), recaptcha: this.recaptcha.render() });
    }

    register(req, res, next) {
        this.recaptchaValidation(req, res)
            .then(() => this.validate(req))
            .then(result => {
                if (!result) res.json('register proccess')
                else res.redirect('/register');
            });
    }

    async validate(req) {
        await check('name', 'فیلد نام نمیتواند خالی بماند').notEmpty().run(req);
        await check('name', 'فیلد نام نمیتواند کمتر از 5 کاراکتر باشد').isLength({ min: 5 }).run(req);
        await check('email', 'فیلد ایمیل نمیتواند خالی بماند').notEmpty().run(req);
        await check('email', 'فیلد ایمیل معتبر نیست').isEmail().run(req);
        await check('password', 'فیلد پسورد نمیتواند خالی بماند').notEmpty().run(req);
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
}

module.exports = new registerController();