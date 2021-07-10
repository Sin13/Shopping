const autoBind = require('auto-bind');
const Recaptcha = require('express-recaptcha').RecaptchaV2;
const { validationResult } = require('express-validator');

module.exports = class controller {
    constructor() {
        autoBind(this);
        this.recaptchaConfig();
    }

    recaptchaConfig() {
        this.recaptcha = new Recaptcha(
            process.env.RECAPTCHA_SITE_KEY,
            process.env.RECAPTCHA_SECRET_KEY,
            {
                hl: 'fa', theme: 'light'
            });
    }

    recaptchaValidation(req, res) {
        return new Promise((resolve, reject) => {
            this.recaptcha.verify(req, (err, data) => {
                if (err) {
                    req.flash('errors', 'لطفا reCAPTCHA را کامل کنید');
                    res.redirect(req.url);
                } else resolve();
            })
        })

    }

    async validationData(req) {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            const errors = result.array();
            const messages = [];

            errors.forEach(err => messages.push(err.msg));

            req.flash('errors', messages)

            return false;
        }

        return true;
    }

    back(req, res) {
        req.flash('formData', req.body);
        return res.redirect(req.header('Referer') || '/');
    }
}