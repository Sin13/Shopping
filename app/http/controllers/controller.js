const autoBind = require('auto-bind');
const Recaptcha = require('express-recaptcha').RecaptchaV2;

module.exports = class controller {
    constructor() {
        autoBind(this);
        this.recaptchaConfig();
    }

    recaptchaConfig() {
        this.recaptcha = new Recaptcha(
            '6LcN3e0aAAAAAPgRxnZFKdxhwTG4_LQRZ9799I8t',
            '6LcN3e0aAAAAAGvxyeTuxVAVGFI1_9PaIoT3BQvy',
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