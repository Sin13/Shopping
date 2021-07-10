const controller = require('app/http/controllers/controller')
const passport = require('passport');

class registerController extends controller {
    showForm(req, res) {
        const title = 'صفحه عضویت';
        res.render('home/auth/register', {recaptcha: this.recaptcha.render(), title });
    }

    async register(req ,res , next) {
        // await this.recaptchaValidation(req , res);
        let result = await this.validationData(req)

        if(result) {
            return this.registerProcess(req , res , next)
        } 
        
        return this.back(req, res);
    }

    registerProcess(req, res, next) {
        passport.authenticate('local-register', {
            failureRedirect: '/register',
            successRedirect: '/',
            failureFlash: true
        })(req, res, next);
    }
}

module.exports = new registerController();