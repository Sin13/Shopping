const controller = require('app/http/controllers/controller')
const passport = require('passport');

class loginController extends controller {
    showForm(req, res) {
        const title = 'صفحه ورود';
        res.render('home/auth/login', {recaptcha: this.recaptcha.render(), title });
    }

    async login(req  ,res , next) {
        await this.recaptchaValidation(req , res);
        let result = await this.validationData(req)
        console.log(result);
        if(result) {
            return this.loginProcess(req, res , next)
        } 
        
        this.back(req,res);
    }

    loginProcess(req, res, next) {
        passport.authenticate('local-login', (err, user) => {
            
            if (err) return next(err);
            if (!user) return res.redirect('/auth/login');

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