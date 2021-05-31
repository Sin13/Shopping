const autoBind = require('auto-bind');
const Recaptcha = require('express-recaptcha').RecaptchaV2;

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
}